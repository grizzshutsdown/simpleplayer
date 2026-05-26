import { DEFAULT_ASPECT_RATIO, DEFAULT_PRELOAD_MARGIN, OBSERVED_ATTRIBUTES } from './constants';
import {
  canRequestPlayerFullscreen,
  exitFullscreen,
  getFullscreenElement,
  isFullscreenSupported,
  requestPlayerFullscreen,
  requestVideoFullscreen,
} from './fullscreen';
import { detectAudioAvailability, formatVideoTime, isAudioAvailabilityPending } from './media';
import { getProgressMetrics, getProgressPercentFromClientX, getProgressXFromPercent } from './progress';
import { template } from './template';
import type { Cleanup, PlaybackState } from './types';

export class SimplePlayer extends HTMLElement {
  static observedAttributes = OBSERVED_ATTRIBUTES;

  #root: ShadowRoot;
  #cleanup: Cleanup[] = [];
  #observer: IntersectionObserver | null = null;
  #initialized = false;
  #videoSourceLoaded = false;
  #player!: HTMLElement;
  #video!: HTMLVideoElement;
  #button!: HTMLButtonElement;
  #progressTrack!: HTMLElement;
  #controlTray!: HTMLElement;
  #controlTraySlots!: HTMLElement;
  #trayTime!: HTMLElement;
  #trayTimeText!: HTMLElement;
  #scrubTime!: HTMLElement;
  #scrubTimeText!: HTMLElement;
  #volumeControl!: HTMLButtonElement;
  #volumePopover!: HTMLElement;
  #volumeTrack!: HTMLElement;
  #pictureInPictureControl!: HTMLButtonElement;
  #fullscreenControl!: HTMLButtonElement;
  #controlButtons: HTMLButtonElement[] = [];

  #progressFrame = 0;
  #isScrubbing = false;
  #isTrackingScrub = false;
  #scrubWasPlaying = false;
  #scrubTargetTime = 0;
  #scrubReturnTime = 0;
  #scrubReturnPercent = 0;
  #hasScrubReturnMarker = false;
  #isCommittedScrubPending = false;
  #committedScrubWasPlaying = false;
  #scrubStartX = 0;
  #scrubLongPressTimer = 0;
  #activeScrubPointerId: number | null = null;
  #optimisticPlaybackState: PlaybackState = null;
  #videoLoadAttempt = 0;
  #videoRetryTimer = 0;
  #controlsHideTimer = 0;
  #loadingStateTimer = 0;
  #initialProgressSettleTimer = 0;
  #suppressTouchButtonClickUntil = 0;
  #suppressTouchControlClickUntil = 0;
  #timeWidthObserver: ResizeObserver | null = null;
  #hasDecodedFirstFrame = false;
  #hasPresentedFirstFrame = false;
  #firstFrameRequestPending = false;
  #firstFramePresentationPending = false;
  #firstFrameRequestToken = 0;
  #firstFrameFallbackTimer = 0;
  #hasInitialProgressSettled = false;
  #initialProgressEstimateUnlockAt = 0;
  #isPlaybackBuffering = true;
  #visualProgressTime = 0;
  #visualProgressUpdatedAt = performance.now();
  #lastRenderedProgressTime = 0;
  #pausedVisualProgressTime: number | null = null;
  #pauseFrozenProgressPercent: number | null = null;
  #hasControlsCollision = false;
  #isProgressHoverPreviewing = false;
  #hasAudioTrack = false;
  #hasCheckedAudioTrack = false;
  #isPointerOverControlSurface = false;
  #lastPointerClientX: number | null = null;
  #lastPointerClientY: number | null = null;
  #lastPointerWasTouch = false;
  #isVolumeScrubbing = false;
  #isVolumeHovering = false;
  #activeVolumePointerId: number | null = null;
  #volumeCloseTimer = 0;
  #volumeIconAnimationTimer = 0;
  #controlTapTimer = 0;
  #volumeIconState: 'sound' | 'muted' | null = null;
  #showRemainingTime = false;
  #timeAnimationTimer = 0;

  readonly #scrubDragThreshold = 4;
  readonly #scrubSnapDistance = 3.5;
  readonly #scrubReturnMarkerBodyInset = 6;
  readonly #scrubReturnMarkerMinTime = 0.08;
  readonly #scrubLongPressDelay = 240;
  readonly #controlsAutoHideDelay = 1200;
  readonly #pointerControlsIdleDelay = 1600;
  readonly #loadingStateDelay = 140;
  readonly #initialProgressSettleDelay = 380;
  readonly #initialProgressEstimateHold = 650;
  readonly #videoRetryDelay = 2000;
  readonly #maxVideoLoadAttempts = 3;
  readonly #bufferedAheadTarget = 10;
  readonly #bufferedRangeFuzz = 0.18;
  readonly #controlsCollisionEnterMargin = 8;
  readonly #controlsCollisionExitMargin = 18;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: 'open' });
    this.#root.append(template.content.cloneNode(true));
  }

  get src() {
    return this.getAttribute('src') ?? '';
  }

  set src(value: string) {
    this.#setStringAttribute('src', value);
  }

  get aspectRatio() {
    return this.getAttribute('aspect-ratio') || DEFAULT_ASPECT_RATIO;
  }

  set aspectRatio(value: string) {
    this.#setStringAttribute('aspect-ratio', value);
  }

  get preloadMargin() {
    return this.getAttribute('preload-margin') || DEFAULT_PRELOAD_MARGIN;
  }

  set preloadMargin(value: string) {
    this.#setStringAttribute('preload-margin', value);
  }

  get autoplayEnabled() {
    return !this.hasAttribute('disable-autoplay') && !this.hasAttribute('no-autoplay');
  }

  set autoplayEnabled(value: boolean) {
    if (value) {
      this.removeAttribute('disable-autoplay');
      this.removeAttribute('no-autoplay');
      return;
    }

    this.setAttribute('disable-autoplay', '');
  }

  get controlsEnabled() {
    return this.hasAttribute('controls');
  }

  set controlsEnabled(value: boolean) {
    if (value) {
      this.setAttribute('controls', '');
      return;
    }

    this.removeAttribute('controls');
  }

  get timeVisible() {
    return this.hasAttribute('show-time');
  }

  set timeVisible(value: boolean) {
    if (value) {
      this.setAttribute('show-time', '');
      return;
    }

    this.removeAttribute('show-time');
  }

  get volumeEnabled() {
    return (
      this.controlsEnabled &&
      !this.hasAttribute('disable-volume') &&
      !this.hasAttribute('no-volume')
    );
  }

  set volumeEnabled(value: boolean) {
    this.#setOptionalControlAttributes('volume', value);
  }

  get volumeSliderEnabled() {
    return !this.hasAttribute('disable-volume-slider') && !this.hasAttribute('no-volume-slider');
  }

  set volumeSliderEnabled(value: boolean) {
    if (value) {
      this.removeAttribute('disable-volume-slider');
      this.removeAttribute('no-volume-slider');
      return;
    }

    this.setAttribute('disable-volume-slider', '');
  }

  get pictureInPictureEnabled() {
    return (
      this.controlsEnabled &&
      !this.hasAttribute('disable-picture-in-picture') &&
      !this.hasAttribute('no-picture-in-picture')
    );
  }

  set pictureInPictureEnabled(value: boolean) {
    this.#setOptionalControlAttributes('picture-in-picture', value);
  }

  get fullscreenEnabled() {
    return (
      this.controlsEnabled &&
      !this.hasAttribute('disable-fullscreen') &&
      !this.hasAttribute('no-fullscreen')
    );
  }

  set fullscreenEnabled(value: boolean) {
    this.#setOptionalControlAttributes('fullscreen', value);
  }

  connectedCallback() {
    this.#player = this.#root.querySelector('[data-sp-player]')!;
    this.#video = this.#root.querySelector('[data-sp-video]')!;
    this.#button = this.#root.querySelector('[data-sp-button]')!;
    this.#progressTrack = this.#root.querySelector('[data-sp-progress-track]')!;
    this.#controlTray = this.#root.querySelector('[data-sp-control-tray]')!;
    this.#controlTraySlots = this.#root.querySelector('[data-sp-control-tray-slots]')!;
    this.#trayTime = this.#root.querySelector('[data-sp-tray-time]')!;
    this.#trayTimeText = this.#root.querySelector('[data-sp-tray-time-text]')!;
    this.#scrubTime = this.#root.querySelector('[data-sp-time]')!;
    this.#scrubTimeText = this.#root.querySelector('[data-sp-time-text]')!;
    this.#volumeControl = this.#root.querySelector('[data-sp-volume-control]')!;
    this.#volumePopover = this.#root.querySelector('[data-sp-volume-popover]')!;
    this.#volumeTrack = this.#root.querySelector('[data-sp-volume-track]')!;
    this.#pictureInPictureControl = this.#root.querySelector('[data-sp-picture-in-picture-control]')!;
    this.#fullscreenControl = this.#root.querySelector('[data-sp-fullscreen-control]')!;
    this.#controlButtons = [this.#volumeControl, this.#pictureInPictureControl, this.#fullscreenControl];
    this.#syncAspectRatio();

    if (!this.#initialized) {
      this.#bindEvents();
      this.#initialized = true;
    }

    this.#syncAutoplayState();
    this.#setupLazyLoading();
    this.#syncOptionalControls();
    this.#syncTimeVisibility();
    this.#syncVideoLoading();
    this.#syncAudioControlState();
    this.#syncPictureInPictureState();
    this.#syncFullscreenState();
    this.#syncVideoState();
  }

  disconnectedCallback() {
    this.#observer?.disconnect();
    this.#observer = null;
    this.#cleanup.forEach((cleanup) => cleanup());
    this.#cleanup = [];
    this.#initialized = false;
    this.#clearControlsHideTimer();
    this.#clearLoadingStateTimer();
    this.#clearVideoRetryTimer();
    this.#clearInitialProgressSettleTimer();
    this.#clearScrubLongPressTimer();
    this.#clearFirstFrameFallbackTimer();
    this.#clearVolumeCloseTimer();
    this.#clearVolumeIconAnimationTimer();
    this.#clearControlTapTimer();
    this.#player.classList.remove('is-volume-icon-animating');
    this.#controlTraySlots.style.removeProperty('--sp-control-hover-offset');
    this.style.removeProperty('--sp-touch-control-hover-offset');
    this.#clearControlsCollision();
    this.#isProgressHoverPreviewing = false;
    this.#player.classList.remove('is-progress-hovering');
    this.#isVolumeScrubbing = false;
    this.#isVolumeHovering = false;
    this.#isPointerOverControlSurface = false;
    this.#activeVolumePointerId = null;
    this.#volumeControl.classList.remove('is-volume-open');
    this.#controlButtons.forEach((button) => button.classList.remove('is-control-tap-active'));
    this.#player.classList.remove('is-pointer-active');
    this.#stopProgressLoop();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    if (name === 'aspect-ratio') {
      this.#syncAspectRatio();
      return;
    }

    if (name === 'preload-margin' && this.isConnected) {
      this.#observer?.disconnect();
      this.#setupLazyLoading();
      return;
    }

    if (name === 'src' && this.isConnected) {
      this.#resetSource();
      this.#setupLazyLoading();
      return;
    }

    if ((name === 'disable-autoplay' || name === 'no-autoplay') && this.isConnected) {
      this.#syncAutoplayState();
      this.#syncAudioControlState();
      this.#syncVideoState();
      return;
    }

    if (name === 'show-time' && this.isConnected) {
      this.#syncTimeVisibility();
      return;
    }

    if (
      (
        name === 'controls' ||
        name.startsWith('enable-') ||
        name.startsWith('disable-') ||
        name.startsWith('no-')
      ) &&
      this.isConnected
    ) {
      this.#syncOptionalControls();
      this.#syncAudioControlState();
      this.#syncPictureInPictureState();
      this.#syncFullscreenState();
      this.#syncTimeVisibility();
    }
  }

  #setStringAttribute(name: string, value: string) {
    if (value === '') {
      this.removeAttribute(name);
      return;
    }

    this.setAttribute(name, value);
  }

  #setOptionalControlAttributes(name: 'volume' | 'picture-in-picture' | 'fullscreen', enabled: boolean) {
    if (enabled) {
      this.setAttribute(`enable-${name}`, '');
      this.removeAttribute(`disable-${name}`);
      this.removeAttribute(`no-${name}`);
      return;
    }

    this.removeAttribute(`enable-${name}`);
    this.setAttribute(`disable-${name}`, '');
  }

  #syncAspectRatio() {
    this.style.setProperty('--simple-player-aspect-ratio', this.aspectRatio);
  }

  #syncAutoplayState() {
    if (!this.#video) return;

    const isEnabled = this.autoplayEnabled;
    this.#video.autoplay = isEnabled;

    if (isEnabled) {
      this.#video.muted = true;
      this.#video.setAttribute('autoplay', '');
      this.#video.setAttribute('muted', '');
      return;
    }

    this.#video.removeAttribute('autoplay');

    if (!this.#videoSourceLoaded) {
      this.#video.muted = false;
      this.#video.removeAttribute('muted');
    }
  }

  #syncOptionalControls() {
    if (!this.#player) return;

    const showVolumeControl = this.volumeEnabled && (!this.#hasCheckedAudioTrack || this.#hasAudioTrack);
    const controls = [
      { button: this.#volumeControl, enabled: showVolumeControl, className: 'has-volume-control' },
      { button: this.#pictureInPictureControl, enabled: this.pictureInPictureEnabled, className: 'has-picture-in-picture-control' },
      { button: this.#fullscreenControl, enabled: this.fullscreenEnabled, className: 'has-fullscreen-control' },
    ];

    let index = 0;
    for (const control of controls) {
      this.#player.classList.toggle(control.className, control.enabled);
      control.button.hidden = !control.enabled;

      if (control.enabled) {
        control.button.dataset.spControlIndex = `${index}`;
        index += 1;
      } else {
        delete control.button.dataset.spControlIndex;
      }
    }

    this.style.setProperty('--sp-enabled-controls-count', `${index}`);
    this.style.setProperty('--sp-control-tray-display', index > 0 ? 'block' : 'none');
    this.#player.classList.toggle('has-volume-slider-control', showVolumeControl && this.volumeSliderEnabled);

    if (!showVolumeControl || !this.volumeSliderEnabled) {
      this.#closeVolumePopover();
      this.#releaseVolumePointer(this.#activeVolumePointerId);
      this.#isVolumeScrubbing = false;
      this.#isVolumeHovering = false;
      this.#volumePopover.classList.remove('is-scrubbing-volume');
    }

    this.#controlTraySlots.style.removeProperty('--sp-control-hover-offset');
  }

  get #hasPinnedTime() {
    return this.timeVisible && this.controlsEnabled;
  }

  #syncTimeVisibility() {
    if (!this.#player) return;

    this.#player.classList.toggle('has-pinned-time', this.#hasPinnedTime);
    if (this.#hasPinnedTime) {
      this.#syncPinnedTimeText();
    }
  }

  #bindEvents() {
    this.#listen(this.#button, 'click', this.#handleButtonClick);
    this.#listen(this, 'pointerenter', this.#handlePlayerPointerEnter);
    this.#listen(this, 'pointermove', this.#handlePlayerPointerMove);
    this.#listen(this, 'pointerleave', this.#handlePlayerPointerLeave);
    this.#listen(this, 'mouseenter', this.#handlePlayerPointerEnter);
    this.#listen(this, 'mousemove', this.#handlePlayerPointerMove);
    this.#listen(this, 'mouseleave', this.#handlePlayerPointerLeave);
    this.#listen(this.#player, 'pointerenter', this.#handlePlayerPointerEnter);
    this.#listen(this.#player, 'pointermove', this.#handlePlayerPointerMove);
    this.#listen(this.#player, 'pointerleave', this.#handlePlayerPointerLeave);
    this.#listen(this.#player, 'mouseenter', this.#handlePlayerPointerEnter);
    this.#listen(this.#player, 'mousemove', this.#handlePlayerPointerMove);
    this.#listen(this.#player, 'mouseleave', this.#handlePlayerPointerLeave);
    this.#listen(this.#button, 'pointerenter', this.#handleControlSurfacePointerEnter);
    this.#listen(this.#button, 'pointerleave', this.#handleControlSurfacePointerLeave);
    this.#listen(this.#button, 'mouseenter', this.#handleControlSurfacePointerEnter);
    this.#listen(this.#button, 'mouseleave', this.#handleControlSurfacePointerLeave);
    this.#listen(this.#progressTrack, 'pointerenter', this.#handleControlSurfacePointerEnter);
    this.#listen(this.#progressTrack, 'pointerleave', this.#handleControlSurfacePointerLeave);
    this.#listen(this.#progressTrack, 'mouseenter', this.#handleControlSurfacePointerEnter);
    this.#listen(this.#progressTrack, 'mouseleave', this.#handleControlSurfacePointerLeave);
    this.#listen(this.#progressTrack, 'pointerenter', this.#handleProgressPointerEnter);
    this.#listen(this.#progressTrack, 'pointerleave', this.#handleProgressPointerLeave);
    this.#listen(this.#progressTrack, 'mouseenter', this.#handleProgressPointerEnter);
    this.#listen(this.#progressTrack, 'mouseleave', this.#handleProgressPointerLeave);
    this.#listen(this.#controlTray, 'pointerenter', this.#handleControlSurfacePointerEnter);
    this.#listen(this.#controlTray, 'pointerleave', this.#handleControlSurfacePointerLeave);
    this.#listen(this.#controlTray, 'mouseenter', this.#handleControlSurfacePointerEnter);
    this.#listen(this.#controlTray, 'mouseleave', this.#handleControlSurfacePointerLeave);
    this.#listen(this.#root, 'focusin', this.#handleControlSurfaceFocusIn);
    this.#listen(this.#root, 'focusout', this.#handleControlSurfaceFocusOut);
    this.#listen(this.#player, 'pointerdown', this.#handlePlayerPointerDown);
    this.#listen(this.#player, 'dragstart', this.#preventNativeVideoAction);
    this.#listen(this.#player, 'selectstart', this.#preventNativeVideoAction);
    this.#listen(this.#video, 'dragstart', this.#preventNativeVideoAction);
    this.#listen(this.#video, 'selectstart', this.#preventNativeVideoAction);
    this.#listen(this.#progressTrack, 'pointerdown', this.#handleProgressPointerDown);
    this.#listen(this.#progressTrack, 'pointermove', this.#handleProgressPointerMove);
    this.#listen(this.#progressTrack, 'pointerup', this.#handleProgressPointerUp);
    this.#listen(this.#progressTrack, 'pointercancel', this.#handleProgressPointerCancel);
    this.#listen(this.#progressTrack, 'keydown', this.#handleProgressKeyDown);
    this.#listen(this.#volumeControl, 'pointerenter', this.#handleVolumePointerEnter);
    this.#listen(this.#volumeControl, 'pointerleave', this.#handleVolumePointerLeave);
    this.#listen(this.#volumeControl, 'click', this.#handleVolumeControlClick);
    this.#listen(this.#volumePopover, 'pointerenter', this.#handleVolumePointerEnter);
    this.#listen(this.#volumePopover, 'pointerleave', this.#handleVolumePointerLeave);
    this.#listen(this.#volumeTrack, 'pointerdown', this.#handleVolumePointerDown);
    this.#listen(this.#volumeTrack, 'pointermove', this.#handleVolumePointerMove);
    this.#listen(this.#volumeTrack, 'pointerup', this.#handleVolumePointerUp);
    this.#listen(this.#volumeTrack, 'pointercancel', this.#handleVolumePointerCancel);
    this.#listen(this.#volumeTrack, 'click', this.#preventVolumeTrackClick);
    this.#listen(this.#volumeTrack, 'keydown', this.#handleVolumeKeyDown);
    this.#listen(this.#pictureInPictureControl, 'click', this.#handlePictureInPictureClick);
    this.#listen(this.#fullscreenControl, 'click', this.#handleFullscreenClick);
    this.#listen(this.#trayTimeText, 'click', this.#handleTimeToggleClick);
    for (const control of this.#controlButtons) {
      this.#listen(control, 'pointerenter', this.#handleControlButtonPointerEnter);
      this.#listen(control, 'mouseenter', this.#handleControlButtonPointerEnter);
      this.#listen(control, 'pointerdown', this.#handleControlButtonPointerDown);
    }

    const audioTracks = (this.#video as HTMLVideoElement & { audioTracks?: EventTarget }).audioTracks;
    if (audioTracks && typeof audioTracks.addEventListener === 'function') {
      this.#listen(audioTracks, 'addtrack', this.#handleAudioTrackAdded);
    }

    if ('ResizeObserver' in window) {
      this.#timeWidthObserver = new ResizeObserver(() => {
        this.#syncTrayTimeWidth();
      });
      this.#timeWidthObserver.observe(this.#trayTimeText);
      this.#cleanup.push(() => {
        this.#timeWidthObserver?.disconnect();
        this.#timeWidthObserver = null;
      });
    }

    this.#listen(document, 'pointerup', this.#handleDocumentPointerUp);
    this.#listen(document, 'pointercancel', this.#handleDocumentPointerCancel);
    this.#listen(document, 'pointermove', this.#handleDocumentPointerMove);
    this.#listen(document, 'mousemove', this.#handleDocumentPointerMove);
    this.#listen(document, 'fullscreenchange', this.#handleFullscreenChange);
    this.#listen(document, 'webkitfullscreenchange', this.#handleFullscreenChange);
    this.#listen(document, 'mozfullscreenchange', this.#handleFullscreenChange);
    this.#listen(document, 'MSFullscreenChange', this.#handleFullscreenChange);
    this.#listen(this.#root, 'fullscreenchange', this.#handleFullscreenChange);
    this.#listen(window, 'blur', this.#handleWindowBlur);
    this.#listen(window, 'focus', this.#handleWindowFocus);

    this.#listen(this.#video, 'play', this.#handleVideoPlay);
    this.#listen(this.#video, 'pause', this.#handleVideoPause);
    this.#listen(this.#video, 'ended', this.#handleVideoEnded);
    this.#listen(this.#video, 'loadstart', this.#handleVideoLoadStart);
    this.#listen(this.#video, 'waiting', this.#handleVideoWaiting);
    this.#listen(this.#video, 'stalled', this.#handleVideoWaiting);
    this.#listen(this.#video, 'seeking', this.#handleVideoWaiting);
    this.#listen(this.#video, 'loadeddata', this.#markVideoReady);
    this.#listen(this.#video, 'loadedmetadata', this.#handleVideoLoadedMetadata);
    this.#listen(this.#video, 'canplay', this.#markVideoReady);
    this.#listen(this.#video, 'canplaythrough', this.#markVideoReady);
    this.#listen(this.#video, 'playing', this.#handleVideoPlaying);
    this.#listen(this.#video, 'seeked', this.#handleVideoSeeked);
    this.#listen(this.#video, 'error', this.#handleVideoError);
    this.#listen(this.#video, 'progress', this.#syncVideoLoading);
    this.#listen(this.#video, 'suspend', this.#syncVideoLoading);
    this.#listen(this.#video, 'timeupdate', this.#handleVideoTimeUpdate);
    this.#listen(this.#video, 'volumechange', this.#handleVideoVolumeChange);
    this.#listen(this.#video, 'enterpictureinpicture', this.#syncPictureInPictureState);
    this.#listen(this.#video, 'leavepictureinpicture', this.#syncPictureInPictureState);
  }

  #syncTrayTimeWidth() {
    if (!this.#player || !this.#trayTimeText) return;
    this.#trayTimeText.style.width = 'fit-content';
    const width = Math.ceil(this.#trayTimeText.scrollWidth);
    this.#trayTimeText.style.width = '';
    this.#player.style.setProperty('--sp-tray-time-width', `${width}px`);
  }

  #listen(target: EventTarget, type: string, listener: EventListenerOrEventListenerObject) {
    target.addEventListener(type, listener);
    this.#cleanup.push(() => target.removeEventListener(type, listener));
  }

  #setupLazyLoading() {
    if (!this.src || this.#videoSourceLoaded) return;

    this.#observer?.disconnect();
    this.#video.dataset.src = this.src;

    if ('IntersectionObserver' in window) {
      this.#observer = new IntersectionObserver((entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        this.#observer = null;
        void this.#hydrateVideoSource();
      }, { rootMargin: this.preloadMargin });

      this.#observer.observe(this.#player);
      return;
    }

    void this.#hydrateVideoSource();
  }

  #preventNativeVideoAction = (event: Event) => {
    event.preventDefault();
  };

  #clearControlsHideTimer() {
    if (!this.#controlsHideTimer) return;
    window.clearTimeout(this.#controlsHideTimer);
    this.#controlsHideTimer = 0;
  }

  #hideControls = () => {
    this.#controlsHideTimer = 0;
    if (this.#isTrackingScrub || this.#isScrubbing || this.#isVolumeScrubbing) return;

    if (this.#isTouchControls()) {
      this.#player.classList.remove('is-controls-visible');
      return;
    }

    if (this.#isPointerOverControlSurface) return;
    this.#player.classList.remove('is-pointer-active');
  };

  #scheduleControlsHide(delay = this.#isTouchControls() ? this.#controlsAutoHideDelay : this.#pointerControlsIdleDelay) {
    this.#clearControlsHideTimer();
    this.#controlsHideTimer = window.setTimeout(this.#hideControls, delay);
  }

  #scheduleTouchControlsHide() {
    if (!this.#isTouchControls()) return;
    this.#scheduleControlsHide(this.#controlsAutoHideDelay);
  }

  #showTouchControls() {
    if (!this.#isTouchControls()) return false;
    const wasVisible = this.#player.classList.contains('is-controls-visible');
    this.#player.classList.add('is-controls-visible');
    this.#scheduleTouchControlsHide();
    return !wasVisible;
  }

  #showPointerControls(forcePointer = false) {
    if (!forcePointer && this.#isTouchControls()) return;
    this.#player.classList.add('is-pointer-active');
    if (!this.#isPointerOverControlSurface) {
      this.#scheduleControlsHide(forcePointer ? this.#pointerControlsIdleDelay : undefined);
    } else {
      this.#clearControlsHideTimer();
    }
  }

  #hidePointerControls() {
    this.#isPointerOverControlSurface = false;
    this.#clearControlsHideTimer();
    this.#player.classList.remove('is-pointer-active');
  }

  #trackPointerPosition(event: Event) {
    if (event instanceof PointerEvent) {
      this.#lastPointerWasTouch = event.pointerType === 'touch';
      if (this.#lastPointerWasTouch) return false;
      this.#lastPointerClientX = event.clientX;
      this.#lastPointerClientY = event.clientY;
      return true;
    }

    if (event instanceof MouseEvent) {
      this.#lastPointerWasTouch = false;
      this.#lastPointerClientX = event.clientX;
      this.#lastPointerClientY = event.clientY;
      return true;
    }

    return false;
  }

  #isPointInsidePlayer(clientX: number | null, clientY: number | null) {
    if (clientX === null || clientY === null) return false;
    if (clientX < 0 || clientY < 0 || clientX > window.innerWidth || clientY > window.innerHeight) return false;

    const rect = this.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;

    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  }

  #isPointInsideElement(element: Element | null, clientX: number, clientY: number) {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;

    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  }

  #clearProgressHoverPreview() {
    if (!this.#isProgressHoverPreviewing) return;

    this.#isProgressHoverPreviewing = false;
    this.#player.classList.remove('is-progress-hovering');
    this.#player.style.setProperty('--sp-hover-fill-inset', '100%');
    this.#clearControlsCollision();
    this.#syncPinnedTimeText();
  }

  #syncHoverTargetsFromPointer(clientX: number, clientY: number) {
    if (this.#isTouchControls()) return;

    if (!this.#isScrubPreviewLocked() && this.#isPointInsideElement(this.#progressTrack, clientX, clientY)) {
      this.#isProgressHoverPreviewing = true;
      this.#player.classList.add('is-progress-hovering');
      this.#previewSeekFromClientX(clientX, false, false);
    } else if (!this.#isScrubPreviewLocked()) {
      this.#clearProgressHoverPreview();
    }

    const hoveredControl = this.#controlButtons.find((button) => {
      return !button.hidden && !this.#isUnavailableControlButton(button) && this.#isPointInsideElement(button, clientX, clientY);
    }) ?? null;

    if (!hoveredControl) return;

    const index = Number(hoveredControl.dataset.spControlIndex ?? 0);
    this.#controlTraySlots.style.setProperty('--sp-control-hover-offset', `calc(var(--sp-control-slot-size) * ${index})`);
  }

  #areControlsVisible() {
    return (
      this.#player.classList.contains('is-controls-visible') ||
      this.#player.classList.contains('is-pointer-active') ||
      this.#root.activeElement instanceof HTMLElement
    );
  }

  #shouldSuppressControlAction() {
    return this.#isTouchControls() && performance.now() < this.#suppressTouchControlClickUntil;
  }

  #isUnavailableControlButton(button: HTMLElement | null) {
    return (
      button instanceof HTMLButtonElement &&
      (button.disabled || (button === this.#volumeControl && !this.#isVolumeAvailable()))
    );
  }

  #syncPointerControlsFromLastPosition() {
    if (!this.#lastPointerWasTouch && this.#isPointInsidePlayer(this.#lastPointerClientX, this.#lastPointerClientY)) {
      this.#showPointerControls(true);
      return;
    }

    this.#hidePointerControls();
  }

  #handlePlayerPointerEnter = (event: Event) => {
    if (!this.#trackPointerPosition(event)) return;
    this.#showPointerControls(true);
  };

  #handlePlayerPointerMove = (event: Event) => {
    if (!this.#trackPointerPosition(event)) return;
    if (event instanceof PointerEvent || event instanceof MouseEvent) {
      this.#syncHoverTargetsFromPointer(event.clientX, event.clientY);
    }
    this.#showPointerControls(true);
  };

  #handleDocumentPointerMove = (event: Event) => {
    if (!this.#trackPointerPosition(event)) return;
    if (event instanceof PointerEvent || event instanceof MouseEvent) {
      this.#syncHoverTargetsFromPointer(event.clientX, event.clientY);
    }
    this.#syncPointerControlsFromLastPosition();
  };

  #handlePlayerPointerLeave = () => {
    this.#hidePointerControls();
  };

  #handleControlSurfacePointerEnter = (event: Event) => {
    if (!this.#trackPointerPosition(event)) return;
    this.#isPointerOverControlSurface = true;
    this.#player.classList.add('is-pointer-active');
    this.#clearControlsHideTimer();
  };

  #handleControlSurfacePointerLeave = () => {
    this.#isPointerOverControlSurface = false;
    this.#scheduleControlsHide(this.#pointerControlsIdleDelay);
  };

  #handleControlSurfaceFocusIn = () => {
    if (this.#isTouchControls()) {
      this.#player.classList.add('is-controls-visible');
    } else {
      this.#player.classList.add('is-pointer-active');
    }

    this.#clearControlsHideTimer();
  };

  #handleControlSurfaceFocusOut = () => {
    this.#scheduleControlsHide(this.#pointerControlsIdleDelay);
  };

  #handleControlButtonPointerEnter = (event: Event) => {
    const target = event.currentTarget as HTMLElement | null;
    if (this.#isUnavailableControlButton(target)) return;

    const button = target as HTMLButtonElement;
    const index = Number(button.dataset.spControlIndex ?? 0);
    this.#controlTraySlots.style.setProperty('--sp-control-hover-offset', `calc(var(--sp-control-slot-size) * ${index})`);
  };

  #clearControlTapTimer() {
    if (!this.#controlTapTimer) return;
    window.clearTimeout(this.#controlTapTimer);
    this.#controlTapTimer = 0;
  }

  #clearControlTapActive = () => {
    this.#controlTapTimer = 0;
    this.#controlButtons.forEach((button) => button.classList.remove('is-control-tap-active'));
    this.style.removeProperty('--sp-touch-control-hover-offset');
  };

  #handleControlButtonPointerDown = (event: Event) => {
    if (!(event instanceof PointerEvent) || event.pointerType !== 'touch') return;

    const target = event.currentTarget as HTMLButtonElement | null;
    if (!target || !this.#areControlsVisible() || this.#isUnavailableControlButton(target)) return;

    const index = Number(target.dataset.spControlIndex ?? 0);
    this.#clearControlTapTimer();
    this.#controlButtons.forEach((button) => button.classList.toggle('is-control-tap-active', button === target));
    this.style.setProperty('--sp-touch-control-hover-offset', `calc(var(--sp-control-slot-size) * ${index})`);
    this.#controlTapTimer = window.setTimeout(this.#clearControlTapActive, 280);
  };

  #clearLoadingStateTimer() {
    if (!this.#loadingStateTimer) return;
    window.clearTimeout(this.#loadingStateTimer);
    this.#loadingStateTimer = 0;
  }

  #clearVideoRetryTimer() {
    if (!this.#videoRetryTimer) return;
    window.clearTimeout(this.#videoRetryTimer);
    this.#videoRetryTimer = 0;
  }

  #clearInitialProgressSettleTimer() {
    if (!this.#initialProgressSettleTimer) return;
    window.clearTimeout(this.#initialProgressSettleTimer);
    this.#initialProgressSettleTimer = 0;
  }

  #clearFirstFrameFallbackTimer() {
    if (!this.#firstFrameFallbackTimer) return;
    window.clearTimeout(this.#firstFrameFallbackTimer);
    this.#firstFrameFallbackTimer = 0;
  }

  #clearVolumeIconAnimationTimer() {
    if (!this.#volumeIconAnimationTimer) return;
    window.clearTimeout(this.#volumeIconAnimationTimer);
    this.#volumeIconAnimationTimer = 0;
  }

  #animateVolumeIconSwap() {
    this.#clearVolumeIconAnimationTimer();
    this.#player.classList.remove('is-volume-icon-animating');
    void this.#volumeControl.offsetWidth;
    this.#player.classList.add('is-volume-icon-animating');
    this.#volumeIconAnimationTimer = window.setTimeout(() => {
      this.#volumeIconAnimationTimer = 0;
      this.#player.classList.remove('is-volume-icon-animating');
    }, 240);
  }

  #finishInitialProgressSettle = () => {
    const wasSettling = Boolean(this.#initialProgressSettleTimer) || this.#player.classList.contains('is-progress-settling');
    if (!wasSettling) return;

    this.#clearInitialProgressSettleTimer();
    if (this.#hasInitialProgressSettled) {
      this.#player.classList.remove('is-progress-settling');
      return;
    }

    this.#hasInitialProgressSettled = true;
    this.#initialProgressEstimateUnlockAt = performance.now() + this.#initialProgressEstimateHold;
    if (!this.#isScrubPreviewLocked()) this.#syncVisualProgressClock();
    this.#updateProgress();
    this.#player.classList.remove('is-progress-settling');
    this.#syncVideoState();
  };

  #queueInitialProgressSettle() {
    if (this.#hasInitialProgressSettled || this.#initialProgressSettleTimer) return;

    this.#player.classList.add('is-progress-settling');
    this.#setProgressVisual(0);
    this.#initialProgressSettleTimer = window.setTimeout(this.#finishInitialProgressSettle, this.#initialProgressSettleDelay);
  }

  async #hydrateVideoSource() {
    if (this.#videoSourceLoaded) return;

    const source = this.#video.dataset.src || this.src;
    if (!source) return;

    this.#clearVideoRetryTimer();
    this.#clearFirstFrameFallbackTimer();
    this.#videoLoadAttempt += 1;
    this.#videoSourceLoaded = true;
    this.#hasDecodedFirstFrame = false;
    this.#hasPresentedFirstFrame = false;
    this.#firstFrameRequestPending = false;
    this.#firstFramePresentationPending = false;
    this.#firstFrameRequestToken += 1;
    this.#player.classList.remove('has-visible-frame');
    this.#syncAutoplayState();
    this.#video.src = source;
    this.#video.preload = 'auto';
    this.#video.load();

    if (this.#video.autoplay && this.#video.muted) {
      await this.#video.play().catch(() => undefined);
    }
  }

  #isLoopBoundaryBlip() {
    if (!this.#video.loop || this.#video.paused || !Number.isFinite(this.#video.duration) || this.#video.duration <= 0) return false;
    return this.#video.currentTime < 0.28 || (this.#video.duration - this.#video.currentTime) < 0.28;
  }

  #getBufferedAhead(time = this.#video.currentTime) {
    if (!Number.isFinite(time)) return 0;

    const currentTime = Math.max(0, time);

    try {
      for (let index = 0; index < this.#video.buffered.length; index += 1) {
        const start = this.#video.buffered.start(index);
        const end = this.#video.buffered.end(index);

        if (currentTime + this.#bufferedRangeFuzz >= start && currentTime <= end + this.#bufferedRangeFuzz) {
          return Math.max(0, end - currentTime);
        }
      }
    } catch {
      return 0;
    }

    return 0;
  }

  #hasBufferedAhead(seconds = this.#bufferedAheadTarget) {
    if (
      !this.#videoSourceLoaded ||
      this.#video.error ||
      !this.#player.classList.contains('has-loaded-once') ||
      !Number.isFinite(this.#video.duration) ||
      this.#video.duration <= 0
    ) return false;

    const remainingDuration = Math.max(0, this.#video.duration - this.#video.currentTime);
    const requiredBuffer = Math.min(seconds, remainingDuration);

    return requiredBuffer <= this.#bufferedRangeFuzz || this.#getBufferedAhead() + this.#bufferedRangeFuzz >= requiredBuffer;
  }

  #setVideoLoading(isLoading: boolean, immediate = false) {
    this.#clearLoadingStateTimer();
    const shouldLoad = isLoading && !this.#isLoopBoundaryBlip() && !this.#hasBufferedAhead();
    const shouldWaitForFirstFrame = isLoading && !this.#hasPresentedFirstFrame;
    const shouldShowLoading = shouldWaitForFirstFrame || shouldLoad;
    this.#isPlaybackBuffering = shouldShowLoading;

    if (!shouldShowLoading) {
      this.#player.classList.remove('is-loading');
      return;
    }

    if (immediate) {
      this.#player.classList.add('is-loading');
      return;
    }

    this.#loadingStateTimer = window.setTimeout(() => {
      this.#loadingStateTimer = 0;
      if (!this.#hasPresentedFirstFrame || (!this.#isLoopBoundaryBlip() && !this.#hasBufferedAhead())) {
        this.#isPlaybackBuffering = true;
        this.#player.classList.add('is-loading');
        return;
      }

      this.#isPlaybackBuffering = false;
      this.#player.classList.remove('is-loading');
    }, this.#loadingStateDelay);
  }

  #syncVideoLoading = () => {
    if (this.#video.error) {
      this.#setVideoLoading(true, true);
      return;
    }

    this.#setVideoLoading(
      (
        !this.#videoSourceLoaded ||
        !this.#hasPresentedFirstFrame ||
        this.#video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA
      ),
    );
  };

  #canStartImmediately() {
    return (
      this.#videoSourceLoaded &&
      !this.#video.error &&
      this.#hasDecodedFirstFrame &&
      (
        this.#video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA ||
        (
          this.#video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
          !this.#player.classList.contains('is-loading')
        )
      )
    );
  }

  #isScrubPreviewLocked() {
    return this.#isTrackingScrub || this.#isScrubbing || this.#isCommittedScrubPending;
  }

  #retryVideoLoad() {
    if (this.#videoLoadAttempt >= this.#maxVideoLoadAttempts || this.#videoRetryTimer) return;

    this.#videoRetryTimer = window.setTimeout(() => {
      this.#videoRetryTimer = 0;
      this.#clearFirstFrameFallbackTimer();
      this.#videoSourceLoaded = false;
      this.#hasDecodedFirstFrame = false;
      this.#hasPresentedFirstFrame = false;
      this.#firstFrameRequestPending = false;
      this.#firstFramePresentationPending = false;
      this.#firstFrameRequestToken += 1;
      this.#player.classList.remove('has-visible-frame');

      if (!this.#player.classList.contains('has-loaded-once')) {
        this.#setProgressVisual(0);
      }

      this.#video.removeAttribute('src');
      this.#video.load();
      void this.#hydrateVideoSource();
    }, this.#videoRetryDelay);
  }

  #clearCommittedScrubPreview() {
    if (!this.#isCommittedScrubPending) return false;

    this.#isCommittedScrubPending = false;
    this.#committedScrubWasPlaying = false;
    this.#syncVisualProgressClock();
    this.#updateProgress();
    return true;
  }

  #commitVideoReady() {
    this.#clearVideoRetryTimer();
    const isFirstReady = !this.#player.classList.contains('has-loaded-once');

    if (isFirstReady) this.#queueInitialProgressSettle();

    this.#player.classList.add('has-loaded-once');
    this.#player.classList.add('has-visible-frame');
    this.#syncVideoLoading();
    this.#optimisticPlaybackState = null;
    if (this.#isCommittedScrubPending) {
      this.#clearCommittedScrubPreview();
      return true;
    }

    if (!this.#isScrubPreviewLocked()) this.#syncVisualProgressClock();
    this.#updateProgress();
    return true;
  }

  #requestFirstVideoFrame() {
    if (this.#hasDecodedFirstFrame || this.#firstFrameRequestPending || this.#video.error) return;

    this.#firstFrameRequestPending = true;
    const requestToken = this.#firstFrameRequestToken;
    const confirmFirstFrame = () => {
      if (requestToken !== this.#firstFrameRequestToken) return;

      this.#clearFirstFrameFallbackTimer();
      this.#firstFrameRequestPending = false;
      this.#hasDecodedFirstFrame =
        !this.#video.error &&
        this.#video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        this.#video.videoWidth > 0 &&
        this.#video.videoHeight > 0;

      if (this.#hasDecodedFirstFrame) {
        if (this.#firstFramePresentationPending || this.#hasPresentedFirstFrame) return;

        this.#firstFramePresentationPending = true;
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            if (requestToken !== this.#firstFrameRequestToken) return;

            this.#firstFramePresentationPending = false;
            this.#hasPresentedFirstFrame = true;
            this.#commitVideoReady();
            this.#syncVideoState();
          });
        });
        this.#syncVideoState();
        return;
      }

      this.#syncVideoLoading();
    };

    if ('requestVideoFrameCallback' in this.#video) {
      this.#video.requestVideoFrameCallback(confirmFirstFrame);
      this.#firstFrameFallbackTimer = window.setTimeout(confirmFirstFrame, 180);
      return;
    }

    window.requestAnimationFrame(confirmFirstFrame);
  }

  #markVideoReady = () => {
    if (
      this.#video.error ||
      this.#video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ||
      this.#video.videoWidth <= 0 ||
      this.#video.videoHeight <= 0
    ) {
      this.#syncVideoLoading();
      return false;
    }

    if (!this.#hasDecodedFirstFrame) {
      this.#requestFirstVideoFrame();
      this.#syncVideoLoading();
      return false;
    }

    const isReady = this.#commitVideoReady();
    this.#syncAudioControlState();
    return isReady;
  };

  #isVideoAdvancing() {
    return (
      !this.#video.paused &&
      (!this.#video.ended || this.#video.loop) &&
      this.#video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA
    );
  }

  #syncVisualProgressClock(time = this.#video.currentTime) {
    this.#visualProgressTime = Number.isFinite(time) ? Math.max(0, time) : 0;
    this.#visualProgressUpdatedAt = performance.now();
  }

  #clearPausedVisualProgress() {
    this.#pausedVisualProgressTime = null;
    this.#pauseFrozenProgressPercent = null;
  }

  #holdPausedVisualProgress() {
    if (!Number.isFinite(this.#video.duration) || this.#video.duration <= 0) {
      this.#pausedVisualProgressTime = null;
      return;
    }

    const currentTime = Number.isFinite(this.#video.currentTime) ? Math.max(0, this.#video.currentTime) : 0;
    const renderedTime = Number.isFinite(this.#lastRenderedProgressTime) ? this.#lastRenderedProgressTime : currentTime;
    this.#pausedVisualProgressTime = Math.min(this.#video.duration, Math.max(currentTime, renderedTime));
    this.#syncVisualProgressClock(this.#pausedVisualProgressTime);
  }

  #freezeRenderedProgressForPause() {
    if (!Number.isFinite(this.#video.duration) || this.#video.duration <= 0) {
      this.#pauseFrozenProgressPercent = null;
      this.#holdPausedVisualProgress();
      return;
    }

    const rawInset = this.#player.style.getPropertyValue('--sp-progress-inset');
    const inset = Number.parseFloat(rawInset);
    const progressFromFill = Number.isFinite(inset) ? Math.min(1, Math.max(0, 1 - (inset / 100))) : null;
    const visualTime = this.#getVisualProgressTime();
    const progressFromTime = Math.min(1, Math.max(0, visualTime / this.#video.duration));
    const frozenProgress = Math.max(progressFromFill ?? 0, progressFromTime);

    this.#pauseFrozenProgressPercent = frozenProgress;
    this.#pausedVisualProgressTime = frozenProgress * this.#video.duration;
    this.#syncVisualProgressClock(this.#pausedVisualProgressTime);
    this.#setProgressVisual(frozenProgress);
    this.#progressTrack.setAttribute('aria-valuenow', `${this.#pausedVisualProgressTime}`);
    this.#progressTrack.setAttribute(
      'aria-valuetext',
      `${formatVideoTime(this.#pausedVisualProgressTime)} of ${formatVideoTime(this.#video.duration)}`,
    );
  }

  #getVisualProgressTime() {
    if (!Number.isFinite(this.#video.duration) || this.#video.duration <= 0) return this.#video.currentTime || 0;
    if (this.#isScrubPreviewLocked()) return this.#scrubTargetTime;
    if (this.#pausedVisualProgressTime !== null) return this.#pausedVisualProgressTime;
    if (!this.#isVideoAdvancing()) return this.#video.currentTime || 0;

    if (this.#isPlaybackBuffering || !this.#hasInitialProgressSettled || performance.now() < this.#initialProgressEstimateUnlockAt) {
      this.#syncVisualProgressClock();
      return this.#video.currentTime || 0;
    }

    if (this.#player.classList.contains('is-loading') && this.#video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
      this.#syncVisualProgressClock();
      return this.#video.currentTime || 0;
    }

    const elapsed = (performance.now() - this.#visualProgressUpdatedAt) / 1000;
    const estimatedTime = this.#visualProgressTime + elapsed;
    const visualTime = this.#video.loop
      ? estimatedTime % this.#video.duration
      : Math.min(estimatedTime, this.#video.duration);

    if (!this.#video.loop && this.#video.currentTime - visualTime > 0.45) {
      this.#syncVisualProgressClock();
      return this.#video.currentTime;
    }

    return visualTime;
  }

  #setProgressVisual(percent: number) {
    const clampedPercent = Math.min(1, Math.max(0, percent));
    const remainingPercent = (1 - clampedPercent) * 100;
    const { innerWidth } = this.#getProgressMetrics();
    const markerEdgePercent = 1 / innerWidth;
    const markerIsFullyOnFill =
      this.#isScrubbing &&
      this.#hasScrubReturnMarker &&
      this.#scrubReturnPercent + markerEdgePercent < clampedPercent;

    this.#player.style.setProperty('--sp-progress-inset', `${remainingPercent}%`);
    this.#player.style.setProperty('--sp-return-marker-base-opacity', markerIsFullyOnFill ? '0' : '1');

    if (markerIsFullyOnFill) {
      const markerX = this.#getProgressXFromPercent(this.#scrubReturnPercent);
      const maxHoleLeft = Math.max(0, innerWidth - 2);
      const holeLeft = Math.min(maxHoleLeft, Math.max(0, markerX - 3));

      this.#player.style.setProperty('--sp-return-marker-hole-left', `${holeLeft}px`);
    } else {
      this.#player.style.setProperty('--sp-return-marker-hole-left', '-9999px');
    }
  }

  #getProgressPercentFromTime(time: number) {
    if (!Number.isFinite(this.#video.duration) || this.#video.duration <= 0) return 0;

    return Math.min(1, Math.max(0, time / this.#video.duration));
  }

  #getProgressMetrics(rect = this.#progressTrack.getBoundingClientRect()) {
    return getProgressMetrics(rect);
  }

  #getProgressXFromPercent(percent: number, rect = this.#progressTrack.getBoundingClientRect()) {
    return getProgressXFromPercent(percent, rect);
  }

  #getProgressPercentFromClientX(clientX: number, rect: DOMRect) {
    return getProgressPercentFromClientX(clientX, rect);
  }

  #setScrubReturnMarker(time: number) {
    this.#scrubReturnTime = Number.isFinite(time) ? Math.max(0, time) : 0;
    this.#scrubReturnPercent = this.#getProgressPercentFromTime(this.#scrubReturnTime);
    const rect = this.#progressTrack.getBoundingClientRect();
    const markerX = this.#getProgressXFromPercent(this.#scrubReturnPercent, rect);
    const markerIsInTrackBody =
      markerX >= this.#scrubReturnMarkerBodyInset &&
      markerX <= Math.max(this.#scrubReturnMarkerBodyInset, rect.width - this.#scrubReturnMarkerBodyInset);

    this.#hasScrubReturnMarker = this.#scrubReturnTime > this.#scrubReturnMarkerMinTime && markerIsInTrackBody;
    this.#player.classList.toggle('has-return-marker', this.#hasScrubReturnMarker);
    this.#player.style.setProperty('--sp-return-marker-left', `${markerX}px`);
  }

  #getScrubPoint(clientX: number, rect: DOMRect, percent: number, shouldSnap = this.#isScrubbing) {
    const targetTime = percent * this.#video.duration;

    if (!shouldSnap || !this.#hasScrubReturnMarker) {
      return { percent, targetTime };
    }

    const markerX = rect.left + this.#getProgressXFromPercent(this.#scrubReturnPercent, rect);
    const markerDistance = Math.abs(clientX - markerX);
    const isInSnapZone = markerDistance <= this.#scrubSnapDistance;

    if (!isInSnapZone) {
      return { percent, targetTime };
    }

    return {
      percent: this.#scrubReturnPercent,
      targetTime: this.#scrubReturnTime,
    };
  }

  #syncPinnedTimeText(time = this.#getVisualProgressTime()) {
    if (!this.#hasPinnedTime || this.#isProgressHoverPreviewing || this.#isScrubPreviewLocked()) return;

    this.#trayTimeText.textContent = this.#formatTimeForDisplay(time);
    this.#syncTrayTimeWidth();
  }

  #updateProgress(time = this.#getVisualProgressTime()) {
    const hasDuration = Number.isFinite(this.#video.duration) && this.#video.duration > 0;
    if (hasDuration && this.#pauseFrozenProgressPercent !== null) {
      const frozenTime = this.#pauseFrozenProgressPercent * this.#video.duration;
      this.#lastRenderedProgressTime = frozenTime;
      this.#setProgressVisual(this.#pauseFrozenProgressPercent);
      this.#progressTrack.setAttribute('aria-valuemin', '0');
      this.#progressTrack.setAttribute('aria-valuemax', `${this.#video.duration}`);
      this.#progressTrack.setAttribute('aria-valuenow', `${frozenTime}`);
      this.#progressTrack.setAttribute(
        'aria-valuetext',
        `${formatVideoTime(frozenTime)} of ${formatVideoTime(this.#video.duration)}`,
      );
      this.#syncPinnedTimeText(frozenTime);
      return;
    }

    const renderedTime = hasDuration ? Math.min(this.#video.duration, Math.max(0, time)) : time;
    const progressValue = hasDuration ? renderedTime / this.#video.duration : 0;
    this.#lastRenderedProgressTime = Number.isFinite(renderedTime) ? Math.max(0, renderedTime) : 0;
    this.#setProgressVisual(progressValue);
    this.#progressTrack.setAttribute('aria-valuemin', '0');
    this.#progressTrack.setAttribute('aria-valuemax', hasDuration ? `${this.#video.duration}` : '0');
    this.#progressTrack.setAttribute('aria-valuenow', hasDuration ? `${renderedTime}` : '0');
    this.#progressTrack.setAttribute(
      'aria-valuetext',
      hasDuration ? `${formatVideoTime(renderedTime)} of ${formatVideoTime(this.#video.duration)}` : 'Loading video',
    );
    this.#syncPinnedTimeText(renderedTime);
  }

  #previewSeekFromClientX(clientX: number, shouldSnap = this.#isScrubbing, updateVisual = true) {
    if (!Number.isFinite(this.#video.duration) || this.#video.duration <= 0) return this.#video.currentTime;

    const rect = this.#progressTrack.getBoundingClientRect();
    const percent = this.#getProgressPercentFromClientX(clientX, rect);
    const scrubPoint = this.#getScrubPoint(clientX, rect, percent, shouldSnap);

    this.#player.style.setProperty('--sp-hover-fill-inset', `${(1 - percent) * 100}%`);

    if (updateVisual) {
      this.#setProgressVisual(scrubPoint.percent);
    }

    if (!this.#hasPinnedTime) {
      this.#player.style.setProperty('--sp-scrub-preview-left', `${this.#getProgressXFromPercent(scrubPoint.percent, rect)}px`);
    }

    this.#scrubTimeText.textContent = formatVideoTime(scrubPoint.targetTime);
    this.#trayTimeText.textContent = this.#formatTimeForDisplay(scrubPoint.targetTime);
    this.#syncTrayTimeWidth();

    if (updateVisual) {
      this.#progressTrack.setAttribute('aria-valuenow', `${scrubPoint.targetTime}`);
      this.#progressTrack.setAttribute(
        'aria-valuetext',
        `${formatVideoTime(scrubPoint.targetTime)} of ${formatVideoTime(this.#video.duration)}`,
      );
    }

    this.#syncControlsCollision();
    return scrubPoint.targetTime;
  }

  #clearControlsCollision() {
    this.#hasControlsCollision = false;
    this.#player?.classList.remove('has-controls-collision');
  }

  #syncControlsCollision() {
    if ((!this.#isScrubbing && !this.#isProgressHoverPreviewing) || !this.#controlTray || !this.#scrubTime || this.#hasPinnedTime) {
      this.#clearControlsCollision();
      return;
    }

    const holderRect = this.#controlTray.getBoundingClientRect();
    const timeRect = this.#scrubTime.getBoundingClientRect();
    const holderIsVisible = holderRect.width > 0 && holderRect.height > 0;
    const margin = this.#hasControlsCollision ? this.#controlsCollisionExitMargin : this.#controlsCollisionEnterMargin;
    const timeTouchesHolder =
      holderIsVisible &&
      timeRect.right >= holderRect.left - margin &&
      timeRect.left <= holderRect.right + margin &&
      timeRect.bottom >= holderRect.top - margin &&
      timeRect.top <= holderRect.bottom + margin;

    this.#hasControlsCollision = timeTouchesHolder;
    this.#player.classList.toggle('has-controls-collision', this.#hasControlsCollision);
  }

  #stopProgressLoop() {
    if (!this.#progressFrame) return;
    window.cancelAnimationFrame(this.#progressFrame);
    this.#progressFrame = 0;
  }

  #startProgressLoop() {
    this.#stopProgressLoop();
    this.#syncVisualProgressClock();

    const tick = () => {
      this.#updateProgress(this.#getVisualProgressTime());
      if (this.#isVideoAdvancing()) {
        this.#progressFrame = window.requestAnimationFrame(tick);
      }
    };

    this.#progressFrame = window.requestAnimationFrame(tick);
  }

  #syncVideoState() {
    const realIsPlaying = (!this.#video.paused && (!this.#video.ended || this.#video.loop)) || (this.#isScrubbing && this.#scrubWasPlaying);
    const isPlaying = this.#optimisticPlaybackState ? this.#optimisticPlaybackState === 'playing' : realIsPlaying;
    this.#player.classList.toggle('is-playing', isPlaying);
    this.#button.setAttribute('aria-label', isPlaying ? 'Pause video' : 'Play video');

    if (this.#isScrubbing) {
      this.#stopProgressLoop();
      return;
    }

    if (
      realIsPlaying &&
      this.#player.classList.contains('has-loaded-once') &&
      !this.#player.classList.contains('is-progress-settling')
    ) {
      this.#startProgressLoop();
    } else {
      this.#stopProgressLoop();
      this.#updateProgress();
    }
  }

  #clearScrubLongPressTimer() {
    if (!this.#scrubLongPressTimer) return;
    window.clearTimeout(this.#scrubLongPressTimer);
    this.#scrubLongPressTimer = 0;
  }

  #detectAudioAvailability() {
    return detectAudioAvailability(this.#video);
  }

  #isVolumeAvailable() {
    return this.volumeEnabled && this.#hasCheckedAudioTrack && this.#hasAudioTrack;
  }

  #clearVolumeInteractionState() {
    this.#clearVolumeCloseTimer();
    this.#releaseVolumePointer(this.#activeVolumePointerId);
    this.#isVolumeScrubbing = false;
    this.#isVolumeHovering = false;
    this.#activeVolumePointerId = null;
    this.#volumeControl.classList.remove('is-volume-open', 'is-control-tap-active');
    this.#volumePopover.classList.remove('is-scrubbing-volume');
  }

  #handleAudioTrackAdded = () => {
    this.#hasCheckedAudioTrack = true;
    this.#hasAudioTrack = true;
    this.#syncOptionalControls();
    this.#syncAudioControlState();
  };

  #syncAudioControlState = () => {
    if (!this.volumeEnabled) {
      this.#player.classList.remove('is-volume-unavailable', 'is-volume-muted', 'is-volume-sound', 'is-volume-icon-animating');
      this.#clearVolumeInteractionState();
      this.#volumeControl.disabled = true;
      this.#volumeControl.setAttribute('aria-disabled', 'true');
      return;
    }

    const wasChecked = this.#hasCheckedAudioTrack;

    if (!this.#hasCheckedAudioTrack) {
      const audioAvailability = this.#detectAudioAvailability();
      if (audioAvailability !== 'unknown') {
        this.#hasCheckedAudioTrack = true;
        this.#hasAudioTrack = audioAvailability === 'available';
      } else if (
        this.#video.readyState >= HTMLMediaElement.HAVE_METADATA &&
        !isAudioAvailabilityPending(this.#video)
      ) {
        this.#hasCheckedAudioTrack = true;
        this.#hasAudioTrack = true;
      }
    }

    if (!wasChecked && this.#hasCheckedAudioTrack) {
      this.#syncOptionalControls();
    }

    const hasUsableAudio = this.#isVolumeAvailable();
    const isMuted = !hasUsableAudio || this.#video.muted || this.#video.volume <= 0;
    const visualVolume = hasUsableAudio && !this.#video.muted ? this.#video.volume : 0;
    const volumePercent = Math.round(visualVolume * 100);
    const nextIconState = isMuted ? 'muted' : 'sound';

    if (this.#volumeIconState && this.#volumeIconState !== nextIconState) {
      this.#animateVolumeIconSwap();
    }

    this.#volumeIconState = nextIconState;

    this.#player.classList.toggle('is-volume-unavailable', !hasUsableAudio);
    this.#player.classList.toggle('is-volume-muted', isMuted);
    this.#player.classList.toggle('is-volume-sound', !isMuted);
    this.#player.style.setProperty('--sp-volume-level', `${volumePercent}%`);
    this.#volumeControl.disabled = !hasUsableAudio;
    this.#volumeControl.setAttribute('aria-disabled', `${!hasUsableAudio}`);
    this.#volumeControl.setAttribute(
      'aria-label',
      !hasUsableAudio ? 'Video has no audio' : isMuted ? 'Unmute video' : 'Mute video',
    );
    this.#volumeTrack.setAttribute('aria-valuenow', `${volumePercent}`);
    this.#volumeTrack.setAttribute('aria-valuetext', `${volumePercent}%`);

    if (!hasUsableAudio) {
      this.#clearVolumeInteractionState();
    }
  };

  #setVolumeFromClientY(clientY: number) {
    if (!this.#isVolumeAvailable()) return;
    const rect = this.#volumeTrack.getBoundingClientRect();
    const percent = Math.min(1, Math.max(0, 1 - ((clientY - rect.top) / rect.height)));
    const rounded = Math.round(percent * 100) / 100;
    this.#video.volume = rounded;
    this.#video.muted = rounded <= 0;
    this.#syncAudioControlState();
  }

  #releaseVolumePointer(pointerId: number | null) {
    if (pointerId === null) return;
    if (this.#volumeTrack.hasPointerCapture(pointerId)) {
      this.#volumeTrack.releasePointerCapture(pointerId);
    }
  }

  #finishVolumeScrub(pointerId: number | null) {
    this.#isVolumeScrubbing = false;
    this.#activeVolumePointerId = null;
    this.#volumePopover.classList.remove('is-scrubbing-volume');
    this.#volumeTrack.blur();
    this.#releaseVolumePointer(pointerId);
    this.#scheduleVolumePopoverClose(260);
  }

  #syncPictureInPictureState = () => {
    const isActive = document.pictureInPictureElement === this.#video;
    const video = this.#video as HTMLVideoElement & { requestPictureInPicture?: () => Promise<PictureInPictureWindow> };
    const isSupported = Boolean(this.pictureInPictureEnabled && document.pictureInPictureEnabled && video.requestPictureInPicture);
    this.#player.classList.toggle('is-picture-in-picture', isActive);
    this.#pictureInPictureControl.disabled = !isSupported;
    this.#pictureInPictureControl.setAttribute('aria-label', isActive ? 'Exit picture in picture' : 'Enter picture in picture');
  };

  #getFullscreenElement() {
    return getFullscreenElement(this.#root);
  }

  #isFullscreenSupported() {
    return isFullscreenSupported(this.fullscreenEnabled, this.#player, this.#video);
  }

  #requestPlayerFullscreen() {
    return requestPlayerFullscreen(this.#player);
  }

  #requestVideoFullscreen() {
    requestVideoFullscreen(this.#video);
  }

  #exitFullscreen() {
    return exitFullscreen();
  }

  #syncFullscreenState = () => {
    const fullscreenElement = this.#getFullscreenElement();
    const isActive = fullscreenElement === this.#player || fullscreenElement === this;
    const isSupported = this.#isFullscreenSupported();
    this.#player.classList.toggle('is-fullscreen', isActive);
    this.#fullscreenControl.disabled = !isSupported;
    this.#fullscreenControl.setAttribute('aria-label', isActive ? 'Exit fullscreen' : 'Enter fullscreen');
    return isActive;
  };

  #handleFullscreenChange = () => {
    const isFullscreenActive = this.#syncFullscreenState();
    this.#resetFullscreenPointerState(isFullscreenActive);
  };

  #resetFullscreenPointerState(isFullscreenActive: boolean) {
    this.#clearControlsHideTimer();
    this.#clearVolumeCloseTimer();
    this.#releaseScrubPointer(this.#activeScrubPointerId);
    this.#releaseVolumePointer(this.#activeVolumePointerId);
    this.#clearScrubLongPressTimer();
    this.#isTrackingScrub = false;
    this.#isScrubbing = false;
    this.#isProgressHoverPreviewing = false;
    this.#player.classList.remove('is-progress-hovering');
    this.#activeScrubPointerId = null;
    this.#isPointerOverControlSurface = false;
    this.#isVolumeHovering = false;
    this.#isVolumeScrubbing = false;
    this.#activeVolumePointerId = null;
    this.#clearControlTapTimer();
    this.#clearControlTapActive();
    this.#controlTraySlots.style.removeProperty('--sp-control-hover-offset');
    this.#volumeControl.classList.remove('is-volume-open');
    this.#volumePopover.classList.remove('is-scrubbing-volume');
    this.#player.classList.remove('is-scrubbing');
    this.#player.classList.remove('is-pointer-active');

    const activeElement = this.#root.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }

    if (isFullscreenActive) {
      this.#syncPointerControlsFromLastPosition();
    } else {
      this.#hidePointerControls();
    }
  }

  #enterScrubMode = () => {
    if (!this.#isTrackingScrub || this.#isScrubbing) return;

    this.#clearPausedVisualProgress();
    this.#clearControlsHideTimer();
    this.#clearScrubLongPressTimer();
    this.#isScrubbing = true;
    this.#player.classList.add('is-scrubbing');
    this.#scrubTargetTime = this.#previewSeekFromClientX(this.#scrubStartX, true);
    if (this.#scrubWasPlaying) this.#video.pause();
    this.#video.currentTime = this.#scrubTargetTime;
    this.#syncVisualProgressClock(this.#scrubTargetTime);
    this.#updateProgress(this.#scrubTargetTime);
    this.#stopProgressLoop();
    this.#syncVideoState();
  };

  #releaseScrubPointer(pointerId: number | null) {
    if (pointerId === null) return;
    if (this.#progressTrack.hasPointerCapture(pointerId)) {
      this.#progressTrack.releasePointerCapture(pointerId);
    }
  }

  async #finishScrub(clientX: number | null, pointerId: number | null, shouldCommit: boolean) {
    if (!this.#isTrackingScrub && !this.#isScrubbing) return;

    const wasDragging = this.#isScrubbing;
    this.#clearScrubLongPressTimer();
    this.#isTrackingScrub = false;
    this.#isScrubbing = false;
    this.#isProgressHoverPreviewing = false;
    this.#player.classList.remove('is-progress-hovering');
    this.#player.style.setProperty('--sp-hover-fill-inset', '100%');
    this.#activeScrubPointerId = null;
    this.#player.classList.remove('is-scrubbing');
    this.#clearControlsCollision();
    this.#releaseScrubPointer(pointerId);

    if (shouldCommit && clientX !== null) {
      this.#clearPausedVisualProgress();
      this.#scrubTargetTime = this.#previewSeekFromClientX(clientX, wasDragging);
      this.#isCommittedScrubPending = true;
      this.#committedScrubWasPlaying = this.#scrubWasPlaying;
      this.#video.currentTime = this.#scrubTargetTime;
      this.#syncVisualProgressClock(this.#scrubTargetTime);
    }

    this.#updateProgress(this.#scrubTargetTime);

    if (wasDragging && this.#scrubWasPlaying) {
      await this.#video.play();
    }

    this.#scheduleTouchControlsHide();
  }

  #cancelScrub(pointerId: number | null) {
    if (!this.#isTrackingScrub && !this.#isScrubbing) return;

    this.#clearScrubLongPressTimer();
    this.#isTrackingScrub = false;
    this.#isScrubbing = false;
    this.#isProgressHoverPreviewing = false;
    this.#player.classList.remove('is-progress-hovering');
    this.#player.style.setProperty('--sp-hover-fill-inset', '100%');
    this.#activeScrubPointerId = null;
    this.#player.classList.remove('is-scrubbing');
    this.#clearControlsCollision();
    this.#releaseScrubPointer(pointerId);
    this.#syncVisualProgressClock();
    this.#updateProgress();

    if (this.#scrubWasPlaying) {
      void this.#video.play();
    }

    this.#scheduleTouchControlsHide();
  }

  #formatTimeForDisplay(time: number) {
    if (!this.#showRemainingTime) return formatVideoTime(time);
    const duration = Number.isFinite(this.#video.duration) ? this.#video.duration : 0;
    if (duration <= 0) return formatVideoTime(time);
    return `-${formatVideoTime(Math.max(0, duration - time))}`;
  }

  #clearTimeAnimationTimer() {
    if (!this.#timeAnimationTimer) return;
    window.clearTimeout(this.#timeAnimationTimer);
    this.#timeAnimationTimer = 0;
  }

  #animateTimeSwap() {
    this.#clearTimeAnimationTimer();
    this.#trayTimeText.classList.remove('is-time-animating');
    void this.#trayTimeText.offsetWidth;
    this.#trayTimeText.classList.add('is-time-animating');
    this.#timeAnimationTimer = window.setTimeout(() => {
      this.#timeAnimationTimer = 0;
      this.#trayTimeText.classList.remove('is-time-animating');
    }, 240);
  }

  #handleTimeToggleClick = (event: Event) => {
    event.stopPropagation();
    this.#showRemainingTime = !this.#showRemainingTime;
    this.#animateTimeSwap();
    if (this.#isScrubPreviewLocked() || this.#isProgressHoverPreviewing) {
      if (this.#trayTimeText) {
         this.#trayTimeText.textContent = this.#formatTimeForDisplay(this.#scrubTargetTime);
         this.#syncTrayTimeWidth();
      }
    } else {
      this.#syncPinnedTimeText(this.#getVisualProgressTime());
    }
  };

  #handleButtonClick = async () => {
    if (performance.now() < this.#suppressTouchButtonClickUntil) {
      return;
    }

    const shouldPlay = this.#optimisticPlaybackState
      ? this.#optimisticPlaybackState !== 'playing'
      : this.#video.paused || this.#video.ended;
    const shouldFlipImmediately = !shouldPlay || this.#canStartImmediately();

    this.#showTouchControls();

    if (shouldFlipImmediately) {
      this.#optimisticPlaybackState = shouldPlay ? 'playing' : 'paused';
      this.#syncVideoState();
    }

    if (shouldPlay) {
      this.#clearPausedVisualProgress();
      await this.#hydrateVideoSource();
      await this.#video.play().catch(() => {
        this.#optimisticPlaybackState = null;
      });
    } else {
      this.#freezeRenderedProgressForPause();
      this.#video.pause();
    }

    this.#syncVideoState();
    this.#scheduleTouchControlsHide();
  };

  #handlePlayerPointerDown = (event: Event) => {
    if (!(event instanceof PointerEvent)) return;

    const buttonRect = this.#button.getBoundingClientRect();
    const isInsideButton =
      event.clientX >= buttonRect.left &&
      event.clientX <= buttonRect.right &&
      event.clientY >= buttonRect.top &&
      event.clientY <= buttonRect.bottom;
    const controlTrayRect = this.#controlTray.getBoundingClientRect();
    const isInsideControlTray =
      event.clientX >= controlTrayRect.left &&
      event.clientX <= controlTrayRect.right &&
      event.clientY >= controlTrayRect.top &&
      event.clientY <= controlTrayRect.bottom;
    const progressRect = this.#progressTrack.getBoundingClientRect();
    const isInsideProgress =
      event.clientX >= progressRect.left &&
      event.clientX <= progressRect.right &&
      event.clientY >= progressRect.top &&
      event.clientY <= progressRect.bottom;
    const didRevealControls = this.#showTouchControls();

    if (didRevealControls && isInsideButton) {
      this.#suppressTouchButtonClickUntil = performance.now() + 260;
    }

    if (didRevealControls && (isInsideControlTray || isInsideProgress)) {
      this.#suppressTouchControlClickUntil = performance.now() + 260;
    }

    void this.#hydrateVideoSource();
  };

  #preventVolumeTrackClick = (event: Event) => {
    event.stopPropagation();
  };

  #clearVolumeCloseTimer() {
    if (!this.#volumeCloseTimer) return;
    window.clearTimeout(this.#volumeCloseTimer);
    this.#volumeCloseTimer = 0;
  }

  #openVolumePopover() {
    if (!this.#isVolumeAvailable() || !this.volumeSliderEnabled) {
      this.#clearVolumeInteractionState();
      return;
    }
    this.#clearVolumeCloseTimer();
    this.#volumeControl.classList.add('is-volume-open');
  }

  #closeVolumePopover = () => {
    this.#volumeCloseTimer = 0;
    if (this.#isVolumeHovering || this.#isVolumeScrubbing) return;
    this.#volumeControl.classList.remove('is-volume-open');
  };

  #scheduleVolumePopoverClose(delay = 150) {
    this.#clearVolumeCloseTimer();
    this.#volumeCloseTimer = window.setTimeout(this.#closeVolumePopover, delay);
  }

  #handleVolumePointerEnter = () => {
    if (this.#isTouchControls()) return;
    if (!this.#isVolumeAvailable() || !this.volumeSliderEnabled) {
      this.#clearVolumeInteractionState();
      return;
    }
    this.#isVolumeHovering = true;
    this.#openVolumePopover();
  };

  #handleVolumePointerLeave = () => {
    if (this.#isTouchControls()) return;
    if (!this.#isVolumeAvailable() || !this.volumeSliderEnabled) {
      this.#clearVolumeInteractionState();
      return;
    }
    this.#isVolumeHovering = false;
    this.#scheduleVolumePopoverClose();
  };

  #handleVolumeControlClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!this.#isVolumeAvailable()) {
      this.#clearVolumeInteractionState();
      return;
    }
    if (!this.#areControlsVisible() || this.#shouldSuppressControlAction()) return;
    this.#showTouchControls();
    this.#closeVolumePopover();
    if (this.#video.muted || this.#video.volume <= 0) {
      if (this.#video.volume <= 0) this.#video.volume = 0.7;
      this.#video.muted = false;
    } else {
      this.#video.muted = true;
    }

    this.#syncAudioControlState();
    this.#scheduleTouchControlsHide();
  };

  #handleVolumePointerDown = (event: Event) => {
    if (!(event instanceof PointerEvent)) return;
    event.preventDefault();
    event.stopPropagation();
    if (!this.#isVolumeAvailable() || !this.volumeSliderEnabled || this.#isTouchControls()) {
      this.#clearVolumeInteractionState();
      return;
    }
    this.#showTouchControls();
    this.#clearControlsHideTimer();
    this.#openVolumePopover();
    this.#isVolumeScrubbing = true;
    this.#activeVolumePointerId = event.pointerId;
    this.#volumePopover.classList.add('is-scrubbing-volume');
    this.#volumeTrack.setPointerCapture(event.pointerId);
    this.#setVolumeFromClientY(event.clientY);
  };

  #handleVolumePointerMove = (event: Event) => {
    if (!(event instanceof PointerEvent)) return;
    if (!this.#isVolumeScrubbing) return;
    if (this.#activeVolumePointerId !== null && event.pointerId !== this.#activeVolumePointerId) return;
    event.preventDefault();
    event.stopPropagation();
    this.#setVolumeFromClientY(event.clientY);
  };

  #handleVolumePointerUp = (event: Event) => {
    if (!(event instanceof PointerEvent)) return;
    if (this.#activeVolumePointerId !== null && event.pointerId !== this.#activeVolumePointerId) return;
    event.stopPropagation();
    this.#finishVolumeScrub(event.pointerId);
    this.#scheduleTouchControlsHide();
  };

  #handleVolumePointerCancel = (event: Event) => {
    if (!(event instanceof PointerEvent)) return;
    if (this.#activeVolumePointerId !== null && event.pointerId !== this.#activeVolumePointerId) return;
    event.stopPropagation();
    this.#finishVolumeScrub(event.pointerId);
  };

  #handleVolumeKeyDown = (event: Event) => {
    if (!(event instanceof KeyboardEvent)) return;
    if (!this.#isVolumeAvailable()) {
      event.preventDefault();
      event.stopPropagation();
      this.#clearVolumeInteractionState();
      return;
    }
    if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    event.stopPropagation();
    const step = event.shiftKey ? 0.1 : 0.05;
    const nextVolume =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? 1
          : this.#video.volume + (event.key === 'ArrowUp' ? step : -step);
    this.#video.volume = Math.min(1, Math.max(0, nextVolume));
    this.#video.muted = this.#video.volume <= 0;
    this.#syncAudioControlState();
  };

  #handlePictureInPictureClick = async () => {
    const video = this.#video as HTMLVideoElement & {
      requestPictureInPicture?: () => Promise<PictureInPictureWindow>;
    };

    if (!this.pictureInPictureEnabled || !document.pictureInPictureEnabled || !video.requestPictureInPicture) return;
    if (!this.#areControlsVisible() || this.#shouldSuppressControlAction()) return;
    this.#showTouchControls();

    try {
      await this.#hydrateVideoSource();
      if (document.pictureInPictureElement === this.#video) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch {
      // Picture-in-Picture can be blocked by browser policy or missing user activation.
    } finally {
      this.#syncPictureInPictureState();
      this.#scheduleTouchControlsHide();
    }
  };

  #handleFullscreenClick = async (event: Event) => {
    if (!this.#isFullscreenSupported()) return;
    event.preventDefault();
    event.stopPropagation();
    if (!this.#areControlsVisible() || this.#shouldSuppressControlAction()) return;
    this.#trackPointerPosition(event);
    this.#showTouchControls();

    try {
      const fullscreenElement = this.#getFullscreenElement();
      if (fullscreenElement === this.#player || fullscreenElement === this) {
        await this.#exitFullscreen();
      } else {
        await this.#hydrateVideoSource();
        if (canRequestPlayerFullscreen(this.#player)) {
          await this.#requestPlayerFullscreen();
        } else {
          this.#requestVideoFullscreen();
        }
      }
    } catch {
      // Fullscreen can be blocked by browser policy or missing user activation.
    } finally {
      this.#syncFullscreenState();
      this.#scheduleTouchControlsHide();
    }
  };

  #handleProgressPointerEnter = (event: Event) => {
    if (this.#isTouchControls() || this.#isScrubPreviewLocked()) return;
    if (!(event instanceof PointerEvent) && !(event instanceof MouseEvent)) return;

    this.#isProgressHoverPreviewing = true;
    this.#player.classList.add('is-progress-hovering');
    this.#previewSeekFromClientX(event.clientX, false, false);
  };

  #handleProgressPointerLeave = () => {
    if (this.#isScrubPreviewLocked()) return;

    this.#clearProgressHoverPreview();
  };

  #handleProgressPointerDown = (event: Event) => {
    if (!(event instanceof PointerEvent)) return;
    event.preventDefault();

    if (!this.#areControlsVisible() || this.#shouldSuppressControlAction()) {
      this.#showTouchControls();
      if (this.#isTouchControls()) {
        this.#suppressTouchControlClickUntil = performance.now() + 260;
      }
      return;
    }

    this.#showTouchControls();
    this.#clearControlsHideTimer();
    this.#finishInitialProgressSettle();
    this.#isCommittedScrubPending = false;
    this.#committedScrubWasPlaying = false;
    this.#setScrubReturnMarker(this.#getVisualProgressTime());
    this.#isTrackingScrub = true;
    this.#activeScrubPointerId = event.pointerId;
    this.#scrubStartX = event.clientX;
    this.#scrubWasPlaying = !this.#video.paused && !this.#video.ended;
    this.#progressTrack.setPointerCapture(event.pointerId);
    this.#scrubTargetTime = this.#previewSeekFromClientX(event.clientX, false);
    this.#clearScrubLongPressTimer();
    this.#scrubLongPressTimer = window.setTimeout(this.#enterScrubMode, this.#scrubLongPressDelay);
  };

  #handleProgressKeyDown = (event: Event) => {
    if (!(event instanceof KeyboardEvent)) return;
    if (!Number.isFinite(this.#video.duration) || this.#video.duration <= 0) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) return;

    event.preventDefault();
    event.stopPropagation();
    this.#handleControlSurfaceFocusIn();

    const baseTime = this.#getVisualProgressTime();
    const smallStep = event.shiftKey ? 10 : 5;
    const largeStep = Math.max(10, this.#video.duration * 0.1);
    const nextTime =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? this.#video.duration
          : event.key === 'PageUp'
            ? baseTime + largeStep
            : event.key === 'PageDown'
              ? baseTime - largeStep
              : baseTime + (event.key === 'ArrowRight' ? smallStep : -smallStep);

    this.#video.currentTime = Math.min(this.#video.duration, Math.max(0, nextTime));
    this.#syncVisualProgressClock(this.#video.currentTime);
    this.#updateProgress(this.#video.currentTime);
  };

  #handleProgressPointerMove = (event: Event) => {
    if (!(event instanceof PointerEvent)) return;
    if (!this.#isTrackingScrub) {
      if (!this.#isTouchControls()) {
        this.#isProgressHoverPreviewing = true;
        this.#player.classList.add('is-progress-hovering');
        this.#previewSeekFromClientX(event.clientX, false, false);
      }
      return;
    }
    if (this.#activeScrubPointerId !== null && event.pointerId !== this.#activeScrubPointerId) return;

    if (!this.#isScrubbing && Math.abs(event.clientX - this.#scrubStartX) >= this.#scrubDragThreshold) {
      this.#enterScrubMode();
    }

    if (!this.#isScrubbing) return;
    this.#scrubTargetTime = this.#previewSeekFromClientX(event.clientX);
  };

  #handleProgressPointerUp = (event: Event) => {
    if (!(event instanceof PointerEvent)) return;
    if (this.#activeScrubPointerId !== null && event.pointerId !== this.#activeScrubPointerId) return;
    void this.#finishScrub(event.clientX, event.pointerId, true);
  };

  #handleProgressPointerCancel = (event: Event) => {
    if (!(event instanceof PointerEvent)) return;
    if (this.#activeScrubPointerId !== null && event.pointerId !== this.#activeScrubPointerId) return;
    this.#cancelScrub(event.pointerId);
  };

  #handleDocumentPointerUp = (event: Event) => {
    if (!(event instanceof PointerEvent)) return;
    if (this.#activeVolumePointerId !== null && event.pointerId === this.#activeVolumePointerId) {
      this.#finishVolumeScrub(event.pointerId);
      return;
    }
    if (this.#activeScrubPointerId === null || event.pointerId !== this.#activeScrubPointerId) return;
    void this.#finishScrub(event.clientX, event.pointerId, true);
  };

  #handleDocumentPointerCancel = (event: Event) => {
    if (!(event instanceof PointerEvent)) return;
    if (this.#activeVolumePointerId !== null && event.pointerId === this.#activeVolumePointerId) {
      this.#finishVolumeScrub(event.pointerId);
      return;
    }
    if (this.#activeScrubPointerId === null || event.pointerId !== this.#activeScrubPointerId) return;
    this.#cancelScrub(event.pointerId);
  };

  #handleWindowBlur = () => {
    this.#finishVolumeScrub(this.#activeVolumePointerId);
    this.#cancelScrub(this.#activeScrubPointerId);
  };

  #handleWindowFocus = () => {
    if (this.#getFullscreenElement()) return;
    this.#hidePointerControls();
  };

  #handleVideoPlay = () => {
    this.#optimisticPlaybackState = null;
    this.#clearPausedVisualProgress();
    if (!this.#isScrubPreviewLocked()) this.#syncVisualProgressClock();
    this.#syncVideoState();
  };

  #handleVideoPause = () => {
    this.#optimisticPlaybackState = null;
    if (!this.#isScrubPreviewLocked()) this.#holdPausedVisualProgress();
    this.#syncVideoLoading();
    this.#syncVideoState();
  };

  #handleVideoEnded = () => {
    this.#optimisticPlaybackState = null;
    this.#clearPausedVisualProgress();
    if (!this.#isScrubPreviewLocked()) this.#syncVisualProgressClock();
    this.#syncVideoState();
  };

  #handleVideoLoadStart = () => {
    this.#setVideoLoading(true, true);
  };

  #handleVideoWaiting = () => {
    this.#setVideoLoading(true);
  };

  #handleVideoLoadedMetadata = () => {
    this.#clearPausedVisualProgress();
    this.#syncAudioControlState();
    if (!this.#isScrubPreviewLocked()) this.#syncVisualProgressClock();
    this.#syncVideoLoading();
    this.#updateProgress();
  };

  #handleVideoPlaying = () => {
    const isReady = this.#markVideoReady();
    this.#syncAudioControlState();
    if (isReady && !this.#isScrubPreviewLocked()) this.#syncVisualProgressClock();
    this.#syncVideoState();
  };

  #handleVideoSeeked = () => {
    this.#clearPausedVisualProgress();
    this.#syncVideoLoading();
    if (
      this.#isCommittedScrubPending &&
      (!this.#committedScrubWasPlaying || this.#video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA)
    ) {
      this.#clearCommittedScrubPreview();
      this.#syncVideoState();
      return;
    }

    if (!this.#isScrubPreviewLocked()) this.#syncVisualProgressClock();
    this.#updateProgress();
  };

  #handleVideoError = () => {
    this.#optimisticPlaybackState = null;
    this.#hasDecodedFirstFrame = false;
    this.#hasPresentedFirstFrame = false;
    this.#firstFrameRequestPending = false;
    this.#firstFramePresentationPending = false;
    this.#firstFrameRequestToken += 1;
    this.#player.classList.remove('has-visible-frame');
    this.#setVideoLoading(true, true);
    this.#syncVideoState();
    this.#retryVideoLoad();
  };

  #handleVideoTimeUpdate = () => {
    this.#syncAudioControlState();
    this.#updateProgress();
  };

  #handleVideoVolumeChange = () => {
    this.#syncAudioControlState();
  };

  #isTouchControls() {
    return (
      window.matchMedia('(max-width: 768px)').matches &&
      window.matchMedia('(hover: none), (pointer: coarse)').matches
    );
  }

  #resetSource() {
    if (!this.#video) return;
    this.#observer?.disconnect();
    this.#observer = null;
    this.#clearVideoRetryTimer();
    this.#clearInitialProgressSettleTimer();
    this.#videoSourceLoaded = false;
    this.#videoLoadAttempt = 0;
    this.#hasDecodedFirstFrame = false;
    this.#hasPresentedFirstFrame = false;
    this.#firstFrameRequestPending = false;
    this.#firstFramePresentationPending = false;
    this.#firstFrameRequestToken += 1;
    this.#hasInitialProgressSettled = false;
    this.#lastRenderedProgressTime = 0;
    this.#clearPausedVisualProgress();
    this.#hasAudioTrack = false;
    this.#hasCheckedAudioTrack = false;
    this.#syncOptionalControls();
    this.#clearVolumeInteractionState();
    this.#isCommittedScrubPending = false;
    this.#committedScrubWasPlaying = false;
    this.#optimisticPlaybackState = null;
    this.#player.classList.remove('has-loaded-once', 'has-visible-frame', 'is-progress-settling');
    this.#video.dataset.src = this.src;
    this.#video.pause();
    this.#video.removeAttribute('src');
    this.#video.preload = 'none';
    this.#syncAutoplayState();
    this.#video.load();
    this.#setProgressVisual(0);
    this.#syncAudioControlState();
    this.#syncVideoLoading();
    this.#syncVideoState();
  }
}
