const u = "16 / 9", f = "360px 0px", v = [
  "src",
  "aspect-ratio",
  "preload-margin",
  "controls",
  "disable-autoplay",
  "pause-on-overlay-click",
  "enable-volume",
  "disable-volume",
  "disable-volume-slider",
  "enable-picture-in-picture",
  "disable-picture-in-picture",
  "enable-fullscreen",
  "disable-fullscreen",
  "show-time",
  "no-autoplay",
  "no-volume",
  "no-volume-slider",
  "no-picture-in-picture",
  "no-fullscreen"
];
function b(o) {
  const t = document;
  return o.fullscreenElement || document.fullscreenElement || t.webkitFullscreenElement || t.mozFullScreenElement || t.msFullscreenElement || null;
}
function y(o, t, s) {
  const e = document, i = t, r = s, n = !!((document.fullscreenEnabled ?? e.webkitFullscreenEnabled ?? e.mozFullScreenEnabled ?? e.msFullscreenEnabled ?? !1) && (i.requestFullscreen || i.webkitRequestFullscreen || i.mozRequestFullScreen || i.msRequestFullscreen)), l = !!(r.webkitSupportsFullscreen || r.webkitEnterFullscreen || r.webkitEnterFullScreen);
  return !!(o && (n || l));
}
function g(o) {
  const t = o, s = t.requestFullscreen || t.webkitRequestFullscreen || t.mozRequestFullScreen || t.msRequestFullscreen;
  return Promise.resolve(s?.call(t));
}
function w(o) {
  const t = o;
  return typeof t.requestFullscreen == "function" || typeof t.webkitRequestFullscreen == "function" || typeof t.mozRequestFullScreen == "function" || typeof t.msRequestFullscreen == "function";
}
function k(o) {
  const t = o;
  (t.webkitEnterFullscreen || t.webkitEnterFullScreen)?.call(t);
}
function x() {
  const o = document, t = document.exitFullscreen || o.webkitExitFullscreen || o.mozCancelFullScreen || o.msExitFullscreen;
  return Promise.resolve(t?.call(o));
}
function a(o) {
  if (!Number.isFinite(o) || o < 0) return "0:00";
  const t = Math.floor(o), s = t % 60, e = Math.floor(t / 60), i = e % 60, r = Math.floor(e / 60);
  return r > 0 ? r + ":" + String(i).padStart(2, "0") + ":" + String(s).padStart(2, "0") : i + ":" + String(s).padStart(2, "0");
}
function P(o) {
  const t = o, s = o, e = typeof s.webkitAudioDecodedByteCount == "number";
  if (t.audioTracks && typeof t.audioTracks.length == "number") {
    if (t.audioTracks.length > 0) return "available";
    if (o.readyState >= HTMLMediaElement.HAVE_METADATA && !e) return "unavailable";
  }
  const i = o;
  if (typeof i.mozHasAudio == "boolean")
    return i.mozHasAudio ? "available" : "unavailable";
  const r = o, n = r.captureStream ?? r.mozCaptureStream;
  if (n && o.readyState >= HTMLMediaElement.HAVE_METADATA)
    try {
      if (n.call(o).getAudioTracks().length > 0) return "available";
    } catch {
    }
  if (e && o.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && o.currentTime > 0.25) {
    if (s.webkitAudioDecodedByteCount > 0) return "available";
    if (!o.muted) return "unavailable";
  }
  return "unknown";
}
function T(o) {
  return typeof o.webkitAudioDecodedByteCount != "number" ? !1 : o.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ? !0 : o.currentTime <= 0.25;
}
function p(o) {
  const t = Math.min(2, Math.max(0, o.width / 2)), s = Math.max(1, o.width - t * 2);
  return { rect: o, sideInset: t, innerWidth: s };
}
function E(o, t) {
  const { sideInset: s, innerWidth: e } = p(t), i = Math.min(1, Math.max(0, o));
  return s + i * e;
}
function A(o, t) {
  const { sideInset: s, innerWidth: e } = p(t);
  return Math.min(1, Math.max(0, (o - t.left - s) / e));
}
const C = `
  :host {
    --simple-player-aspect-ratio: ${u};
    --space: 4px;
    --white: #fff;
    --black: #000;
    --white-rgb: 255 255 255;
    --overlay-soft: rgb(0 0 0 / 0.42);
    --overlay-blur: 0px;
    --sp-glass-surface: rgb(255 255 255 / 0.04);
    --sp-glass-opacity: 0.28;
    --sp-control-glass-surface: rgb(255 255 255 / 0.12);
    --sp-control-glass-opacity: 0.62;
    --sp-control-hover-surface: rgb(255 255 255 / 0.14);
    --sp-glass-filter: invert(1) grayscale(1);
    --sp-shimmer-highlight: rgb(255 255 255 / 0.42);
    --sp-control-tray-display: block;
    --sp-enabled-controls-count: 3;
    --sp-control-tray-width: 0px;
    --sp-control-tray-expanded-width: calc((var(--sp-control-slot-size) * var(--sp-enabled-controls-count)) + (var(--sp-control-tray-padding) * 2));
    --sp-control-tray-gap: 0px;
    --sp-control-icon-size: 20px;
    --sp-control-icon-render-size: 20px;
    --sp-control-icon-opacity: 0.82;
    --sp-control-icon-hidden-opacity: 0;
    --sp-control-icon-hidden-transform: translateY(2px) scale(0.84);
    --sp-control-icon-hover-opacity: 0.96;
    --sp-control-icon-stroke-width: 1.6;
    --sp-control-icon-delay-1: 30ms;
    --sp-control-icon-delay-2: 55ms;
    --sp-control-icon-delay-3: 80ms;
    --sp-control-hover-opacity: 1;
    --sp-control-slot-hover-surface: transparent;
    --sp-control-tray-padding: 2px;
    --sp-control-slot-size: calc(var(--sp-control-icon-size) + 4px);
    --sp-touch-control-hover-offset: -9999px;
    --sp-volume-level: 100%;

    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: var(--simple-player-aspect-ratio);
    isolation: isolate;
    overflow: hidden;
    contain: paint;
    background: #1E1E1E;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .sp-video {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    object-fit: cover;
  }

  .sp-asset {
    pointer-events: none;
    opacity: 0;
    transition: opacity 160ms ease;
    user-select: none;
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
  }

  .sp-player.has-visible-frame .sp-asset {
    opacity: 1;
  }

  .sp-player {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
    overflow: hidden;
    --sp-progress-inset: 100%;
    --sp-hover-fill-inset: 100%;
    --sp-scrub-preview-left: 0px;
    --sp-return-marker-left: 0px;
    --sp-return-marker-base-opacity: 1;
    --sp-return-marker-hole-left: -9999px;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    font-variant-numeric: tabular-nums;
  }

  .sp-player:fullscreen {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    min-width: 100vw;
    min-height: 100vh;
    background: #1E1E1E;
  }

  .sp-player:-webkit-full-screen {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    min-width: 100vw;
    min-height: 100vh;
    background: #1E1E1E;
  }

  .sp-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: var(--overlay-soft);
    backdrop-filter: blur(var(--overlay-blur));
    -webkit-backdrop-filter: blur(var(--overlay-blur));
    opacity: 0;
    transition: opacity 260ms ease;
    transform: translateZ(0);
  }

  @media (hover: hover) and (pointer: fine) {
    :host([pause-on-overlay-click]) .sp-overlay {
      pointer-events: auto;
      cursor: pointer;
    }
  }

  .sp-player.is-pointer-active .sp-overlay,
  .sp-player.is-controls-visible .sp-overlay {
    opacity: 1;
  }

  .sp-player.is-loading:not(.has-loaded-once).is-pointer-active .sp-overlay,
  .sp-player.is-loading:not(.has-loaded-once).is-controls-visible .sp-overlay {
    opacity: 0;
  }

  .sp-player.is-loading:not(.has-loaded-once) .sp-button {
    opacity: 0;
    pointer-events: none;
  }

  .sp-button {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    display: grid;
    place-items: center;
    width: 60px;
    height: 60px;
    padding: 0;
    border: 0;
    border-radius: 0;
    color: var(--white);
    background: transparent;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, -50%) scale(0.96);
    transition: opacity 260ms ease, transform 260ms cubic-bezier(0.23, 1, 0.32, 1);
    -webkit-tap-highlight-color: transparent;
  }

  .sp-player.is-pointer-active .sp-button,
  .sp-player.is-controls-visible .sp-button,
  .sp-player.is-playback-pulsing .sp-button {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, -50%) scale(1);
  }

  .sp-player.is-playback-pulsing .sp-button {
    pointer-events: none;
  }

  .sp-player.is-scrubbing .sp-button,
  .sp-player.is-loading:not(.has-loaded-once).is-pointer-active .sp-button,
  .sp-player.is-loading:not(.has-loaded-once).is-controls-visible .sp-button {
    opacity: 0;
    pointer-events: none;
  }

  .sp-button:focus {
    outline: 0;
  }

  .sp-player:focus {
    outline: 0;
  }

  .sp-icon {
    grid-area: 1 / 1;
    position: relative;
    z-index: 1;
    display: block;
    overflow: visible;
    transition: opacity 160ms ease, transform 220ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .sp-icon--play {
    width: 54px;
    height: 60px;
    opacity: 1;
    transform: translate(4px, 0) rotate(0deg) scale(1);
  }

  .sp-icon--pause {
    width: 54px;
    height: 60px;
    opacity: 0;
    transform: translate(0, 0) rotate(-70deg) scale(0.72);
  }

  .sp-player.is-playing .sp-icon--play {
    opacity: 0;
    transform: translate(4px, 0) rotate(70deg) scale(0.72);
  }

  .sp-player.is-playing .sp-icon--pause {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }

  .sp-progress-cluster {
    position: absolute;
    top: calc(100% - 28px);
    left: 50%;
    z-index: 4;
    display: block;
    width: calc(100% - (var(--space) * 8));
    height: 28px;
    --sp-progress-height: 4px;
    transform: translateX(-50%);
    transition:
      top 360ms cubic-bezier(0.23, 1, 0.32, 1),
      width 360ms cubic-bezier(0.23, 1, 0.32, 1),
      height 360ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 360ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .sp-progress {
    position: relative;
    flex: 1 1 auto;
    min-width: 0;
    height: 28px;
    cursor: pointer;
    touch-action: none;
  }

  .sp-player.is-loading:not(.has-loaded-once) .sp-progress-cluster {
    top: 50%;
    left: 50%;
    width: min(148px, calc(100% - (var(--space) * 12)));
    height: 20px;
    --sp-progress-height: 4px;
    transform: translate(-50%, -50%);
  }

  .sp-progress-surface,
  .sp-progress-fill {
    position: absolute;
    bottom: calc(var(--space) * 2);
    left: 0;
    height: var(--sp-progress-height);
    border-radius: 3px;
    transition: height 180ms ease, opacity 120ms ease;
  }

  .sp-progress-surface {
    right: 0;
    bottom: calc((var(--space) * 2) - 2px);
    z-index: 0;
    height: calc(var(--sp-progress-height) + 4px);
    border-radius: 5px;
    background: var(--sp-glass-surface);
    opacity: var(--sp-glass-opacity);
    overflow: hidden;
    backdrop-filter: var(--sp-glass-filter);
    -webkit-backdrop-filter: var(--sp-glass-filter);
    transform: translateZ(0);
  }

  .sp-progress-surface::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    border-radius: inherit;
    background: linear-gradient(90deg, transparent 0%, var(--sp-shimmer-highlight) 46%, transparent 100%);
    transform: translateX(-120%);
  }

  .sp-player.is-loading .sp-progress-surface::after {
    opacity: 1;
    animation: sp-progress-shimmer 1.35s ease-in-out infinite;
  }

  .sp-player.is-loading.has-loaded-once .sp-progress-surface {
    opacity: 0.48;
  }

  .sp-player.is-loading:not(.has-loaded-once) .sp-progress-surface {
    background: rgb(255 255 255 / 0.08);
    opacity: 1;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .sp-player.is-loading:not(.has-loaded-once) .sp-progress-fill,
  .sp-player.is-progress-settling .sp-progress-fill {
    opacity: 0;
  }

  .sp-progress-cluster:has(.sp-progress:hover),
  .sp-player.is-scrubbing .sp-progress-cluster {
    --sp-progress-height: 14px;
  }

  .sp-player.is-loading:not(.has-loaded-once) .sp-progress-cluster:has(.sp-progress:hover) {
    --sp-progress-height: 4px;
  }

  .sp-control-tray {
    position: absolute;
    display: var(--sp-control-tray-display);
    right: 0;
    bottom: calc(((var(--space) * 2) - 2px) + var(--sp-progress-height) + 8px);
    z-index: 3;
    width: var(--sp-control-tray-expanded-width);
    height: calc(var(--sp-control-slot-size) + (var(--sp-control-tray-padding) * 2));
    opacity: 0;
    pointer-events: none;
    filter: blur(0.8px);
    transform: translateY(4px) scale(0.96);
    transform-origin: right bottom;
    transition:
      bottom 180ms ease,
      width 360ms cubic-bezier(0.23, 1, 0.32, 1),
      height 360ms cubic-bezier(0.23, 1, 0.32, 1),
      opacity 220ms ease,
      filter 260ms ease,
      transform 300ms cubic-bezier(0.18, 0.9, 0.22, 1);
  }

  .sp-player.is-pointer-active .sp-control-tray,
  .sp-player.is-controls-visible .sp-control-tray {
    opacity: 1;
    pointer-events: auto;
    filter: blur(0);
    transform: translateY(0) scale(1);
  }

  .sp-control-tray::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 5px;
    background: var(--sp-control-glass-surface);
    opacity: var(--sp-control-glass-opacity);
    overflow: hidden;
    backdrop-filter: var(--sp-glass-filter);
    -webkit-backdrop-filter: var(--sp-glass-filter);
    box-shadow: inset 0 0 0 1px rgb(var(--white-rgb) / 0.08);
    transform: translateZ(0);
    transition: height 180ms ease, opacity 120ms ease;
  }

  .sp-control-tray-slots {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 0;
    height: 100%;
    box-sizing: border-box;
    padding: var(--sp-control-tray-padding);
    border-radius: 5px;
    overflow: visible;
    opacity: 1;
    transition: height 180ms ease;
  }

  .sp-control-tray-slots::before {
    content: '';
    position: absolute;
    top: var(--sp-control-tray-padding);
    left: var(--sp-control-tray-padding);
    z-index: 0;
    width: var(--sp-control-slot-size);
    height: var(--sp-control-slot-size);
    border-radius: 3px;
    background: var(--sp-control-hover-surface);
    opacity: 0;
    pointer-events: none;
    transform: translateX(var(--sp-control-hover-offset, 0px));
    transition:
      opacity 120ms ease,
      transform 240ms cubic-bezier(0.18, 0.9, 0.22, 1);
  }

  @media (hover: hover) and (pointer: fine) {
  .sp-player:not(.is-hover-disabled) .sp-control-tray-slots:has(.sp-control-button:hover)::before {
      opacity: var(--sp-control-hover-opacity);
      transition:
        opacity 80ms ease 120ms,
        transform 160ms cubic-bezier(0.18, 0.9, 0.22, 1);
    }
}

  .sp-control-tray-slots:has(.sp-control-button.is-control-tap-active)::before {
    opacity: var(--sp-control-hover-opacity);
    transform: translateX(var(--sp-touch-control-hover-offset));
    transition:
      opacity 80ms ease,
      transform 160ms cubic-bezier(0.18, 0.9, 0.22, 1);
  }

  @media (hover: hover) and (pointer: fine) {
  .sp-control-tray-slots:not(:has(.sp-control-button:hover))::before {
      transition:
        opacity 100ms ease,
        transform 0ms linear 100ms;
    }
}

  .sp-control-button {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    aspect-ratio: 1 / 1;
    width: var(--sp-control-slot-size);
    min-width: 0;
    height: var(--sp-control-slot-size);
    border: 0;
    border-radius: 3px;
    color: var(--white);
    background: transparent;
    padding: 0;
    cursor: pointer;
    transition: background-color 150ms ease, color 150ms ease;
  }

  .sp-control-button:focus {
    outline: 0;
  }

  .sp-control-button:disabled {
    opacity: 1;
  }

  @media (hover: hover) and (pointer: fine) {
  .sp-player:not(.is-hover-disabled) .sp-control-button:hover {
      background: var(--sp-control-slot-hover-surface);
    }
}

  .sp-player:not(.has-volume-control) [data-sp-volume-control],
  .sp-player:not(.has-picture-in-picture-control) [data-sp-picture-in-picture-control],
  .sp-player:not(.has-fullscreen-control) [data-sp-fullscreen-control] {
    display: none;
  }

  .sp-player.is-volume-unavailable [data-sp-volume-control] {
    cursor: default;
    pointer-events: auto;
  }

  .sp-player.is-volume-unavailable .sp-volume-icon {
    transition: none;
  }

  .sp-player.is-volume-unavailable [data-sp-volume-control]:hover {
    background: transparent;
  }

  .sp-player.is-volume-unavailable [data-sp-volume-control]:hover .sp-control-icon,
  .sp-player.is-volume-unavailable [data-sp-volume-control].is-control-tap-active .sp-control-icon {
    opacity: var(--sp-control-icon-opacity);
    transform: translateY(0) scale(1);
  }

  .sp-player.is-volume-unavailable .sp-control-tray-slots:has([data-sp-volume-control]:hover)::before,
  .sp-player.is-volume-unavailable .sp-control-tray-slots:has([data-sp-volume-control].is-control-tap-active)::before {
    opacity: 0;
  }

  @media (hover: hover) and (pointer: fine) {
  .sp-player:not(.is-hover-disabled) .sp-control-button:hover .sp-control-icon {
      opacity: var(--sp-control-icon-hover-opacity);
      transform: translateY(0) scale(1);
    }
}

  .sp-control-button.is-control-tap-active .sp-control-icon {
    opacity: var(--sp-control-icon-hover-opacity);
    transform: translateY(0) scale(1);
  }

  .sp-control-icon {
    display: block;
    width: var(--sp-control-icon-render-size);
    height: var(--sp-control-icon-render-size);
    color: currentColor;
    overflow: visible;
    opacity: var(--sp-control-icon-hidden-opacity);
    transform: var(--sp-control-icon-hidden-transform);
    transition:
      opacity 180ms ease,
      transform 280ms cubic-bezier(0.18, 0.9, 0.22, 1);
    transition-delay: 0ms;
  }

  .sp-control-icon [stroke] {
    stroke-width: var(--sp-control-icon-stroke-width);
  }

  .sp-volume-icon,
  .sp-player.is-volume-muted .sp-volume-icon--muted {
    display: none;
  }

  .sp-player.is-volume-sound .sp-volume-icon--sound,
  .sp-player.is-volume-muted .sp-volume-icon--muted {
    display: block;
  }

  .sp-player.is-volume-icon-animating .sp-volume-icon {
    animation: sp-volume-icon-swap 240ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .sp-volume-popover {
    position: absolute;
    left: 0;
    bottom: calc(var(--sp-control-slot-size) + var(--sp-control-tray-padding) + 4px);
    z-index: -1;
    display: grid;
    place-items: center;
    width: var(--sp-control-slot-size);
    height: 76px;
    border-radius: 5px;
    opacity: 0;
    pointer-events: none;
    filter: blur(0.8px);
    transform: translateY(8px) scale(0.98);
    transform-origin: center bottom;
    transition:
      opacity 140ms ease,
      filter 180ms ease,
      transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .sp-volume-slot::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 100%;
    left: 0;
    height: calc(var(--sp-control-tray-padding) + 4px);
    z-index: 5;
    pointer-events: auto;
  }

  .sp-volume-slot.is-volume-open .sp-volume-popover,
  .sp-volume-popover.is-scrubbing-volume {
    z-index: 4;
    opacity: 1;
    pointer-events: auto;
    filter: blur(0);
    transform: translateY(0) scale(1);
    transition:
      opacity 150ms ease,
      filter 220ms ease,
      transform 260ms cubic-bezier(0.18, 0.9, 0.22, 1);
  }

  .sp-player.is-volume-unavailable .sp-volume-slot.is-volume-open .sp-volume-popover,
  .sp-player:not(.has-volume-slider-control) .sp-volume-slot.is-volume-open .sp-volume-popover,
  .sp-player.is-volume-unavailable .sp-volume-popover.is-scrubbing-volume {
    opacity: 0;
    pointer-events: none;
  }

  .sp-volume-track {
    position: relative;
    z-index: 1;
    width: var(--sp-control-slot-size);
    height: 76px;
    border-radius: 5px;
    background: var(--sp-control-glass-surface);
    overflow: hidden;
    touch-action: none;
    cursor: ns-resize;
    backdrop-filter: var(--sp-glass-filter);
    -webkit-backdrop-filter: var(--sp-glass-filter);
    box-shadow: inset 0 0 0 1px rgb(var(--white-rgb) / 0.08);
    transform: translateZ(0);
  }

  .sp-volume-fill {
    position: absolute;
    right: 2px;
    bottom: 2px;
    left: 2px;
    height: max(0px, calc(var(--sp-volume-level) - 4px));
    min-height: 0;
    border-radius: 3px;
    background: var(--white);
    opacity: 1;
    transition: height 220ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .sp-fullscreen-icon,
  .sp-player.is-fullscreen .sp-fullscreen-icon--enter,
  .sp-player:not(.is-fullscreen) .sp-fullscreen-icon--exit {
    display: none;
  }

  .sp-player:not(.is-fullscreen) .sp-fullscreen-icon--enter,
  .sp-player.is-fullscreen .sp-fullscreen-icon--exit {
    display: block;
  }

  .sp-player.is-pointer-active .sp-control-icon,
  .sp-player.is-controls-visible .sp-control-icon {
    opacity: var(--sp-control-icon-opacity);
    transform: translateY(0) scale(1);
  }

  .sp-player.is-pointer-active .sp-control-button:nth-child(1) .sp-control-icon,
  .sp-player.is-controls-visible .sp-control-button:nth-child(1) .sp-control-icon {
    transition-delay: var(--sp-control-icon-delay-1);
  }

  .sp-player.is-pointer-active .sp-control-button:nth-child(2) .sp-control-icon,
  .sp-player.is-controls-visible .sp-control-button:nth-child(2) .sp-control-icon {
    transition-delay: var(--sp-control-icon-delay-2);
  }

  .sp-player.is-pointer-active .sp-control-button:nth-child(3) .sp-control-icon,
  .sp-player.is-controls-visible .sp-control-button:nth-child(3) .sp-control-icon {
    transition-delay: var(--sp-control-icon-delay-3);
  }

  .sp-player.is-loading:not(.has-loaded-once) .sp-control-tray,
  .sp-player.is-progress-settling .sp-control-tray {
    opacity: 0;
    pointer-events: none;
    filter: blur(0.8px);
    transform: translateY(4px) scale(0.96);
  }

  .sp-player.has-controls-collision .sp-control-tray {
    opacity: 0;
    pointer-events: none;
    filter: blur(1.4px);
    transform: translateY(-2px) scale(0.985);
  }

  .sp-progress-fill {
    display: block;
    z-index: 1;
    left: 2px;
    right: 2px;
    background: var(--white);
    border-radius: 3px;
    clip-path: inset(0 var(--sp-progress-inset) 0 0 round 3px);
    -webkit-mask:
      linear-gradient(var(--black) 0 0),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 14' preserveAspectRatio='none'%3E%3Crect width='2' height='14' rx='1' fill='black'/%3E%3C/svg%3E") var(--sp-return-marker-hole-left) 50% / 2px max(1px, calc(var(--sp-progress-height) - 3px)) no-repeat;
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(var(--black) 0 0),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 14' preserveAspectRatio='none'%3E%3Crect width='2' height='14' rx='1' fill='black'/%3E%3C/svg%3E") var(--sp-return-marker-hole-left) 50% / 2px max(1px, calc(var(--sp-progress-height) - 3px)) no-repeat;
    mask-composite: exclude;
    transform: translateZ(0);
    will-change: clip-path;
  }

  .sp-progress-hover-fill {
    position: absolute;
    bottom: calc(var(--space) * 2);
    left: 2px;
    right: 2px;
    z-index: 0;
    height: var(--sp-progress-height);
    border-radius: 3px;
    background: var(--white);
    opacity: 0;
    pointer-events: none;
    clip-path: inset(0 var(--sp-hover-fill-inset) 0 0 round 3px);
    transform: translateZ(0);
    transition: height 180ms ease, opacity 120ms ease;
  }

  .sp-progress:hover .sp-progress-hover-fill,
  .sp-player.is-progress-hovering .sp-progress-hover-fill,
  .sp-player.is-scrubbing .sp-progress-hover-fill {
    opacity: 0.2;
  }

  .sp-progress-marker {
    position: absolute;
    bottom: calc((var(--space) * 2) + 1.5px);
    left: clamp(1px, var(--sp-return-marker-left), calc(100% - 1px));
    z-index: 2;
    width: 2px;
    height: max(1px, calc(var(--sp-progress-height) - 3px));
    border-radius: 2px;
    background: rgb(var(--white-rgb) / calc(var(--sp-return-marker-base-opacity) * 0.58));
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
    transform: translateX(-50%) translateZ(0);
    transition: height 180ms ease, opacity 120ms ease;
  }

  .sp-player.is-scrubbing.has-return-marker .sp-progress-marker {
    opacity: 1;
  }

  .sp-time {
    position: absolute;
    display: block;
    bottom: calc(100% + var(--space));
    left: var(--sp-scrub-preview-left);
    z-index: 2;
    padding: 2px calc(var(--space) * 1.5);
    color: var(--white);
    background: transparent;
    border-radius: 4px;
    isolation: isolate;
    overflow: hidden;
    pointer-events: none;
    opacity: 0;
    transition: transform 120ms ease;
    transform: translateX(-50%) translateY(2px);
    white-space: nowrap;
    font: 500 12px/1.35 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-variant-numeric: tabular-nums;
  }

  .sp-time-surface {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    background: var(--sp-glass-surface);
    opacity: var(--sp-glass-opacity);
    backdrop-filter: var(--sp-glass-filter);
    -webkit-backdrop-filter: var(--sp-glass-filter);
    transform: translateZ(0);
    will-change: backdrop-filter, opacity;
  }

  .sp-time-text {
    position: relative;
    z-index: 1;
  }

  .sp-progress:hover .sp-time,
  .sp-player.is-progress-hovering .sp-time,
  .sp-player.is-scrubbing .sp-time {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .sp-player.has-pinned-time .sp-time {
    display: none !important;
  }

  .sp-player.is-loading:not(.has-loaded-once) .sp-time,
  .sp-player.is-loading:not(.has-loaded-once) .sp-progress-hover-fill {
    display: none;
  }

  .sp-tray-time {
    position: absolute;
    display: none;
    bottom: calc(((var(--space) * 2) - 2px) + var(--sp-progress-height) + 8px);
    left: 0;
    z-index: 3;
    color: var(--white);
    isolation: isolate;
    overflow: visible;
    pointer-events: none;
    white-space: nowrap;
    opacity: 0;
    filter: blur(0.8px);
    transform: translateY(4px) scale(0.96);
    transform-origin: left bottom;
    transition:
      bottom 180ms ease,
      opacity 220ms ease,
      filter 260ms ease,
      transform 300ms cubic-bezier(0.18, 0.9, 0.22, 1);
  }

  .sp-player.has-pinned-time .sp-tray-time {
    display: block;
  }

  .sp-player.has-pinned-time.is-pointer-active .sp-tray-time,
  .sp-player.has-pinned-time.is-controls-visible .sp-tray-time {
    opacity: 1;
    pointer-events: auto;
    filter: blur(0);
    transform: translateY(0) scale(1);
  }

  .sp-tray-time-holder {
    position: relative;
    right: auto;
    bottom: auto;
    width: calc(var(--sp-tray-time-width, max-content) + (var(--sp-control-tray-padding) * 2));
    height: calc(var(--sp-control-slot-size) + (var(--sp-control-tray-padding) * 2));
    transition: width 240ms cubic-bezier(0.23, 1, 0.32, 1);
    overflow: hidden;
  }

  .sp-tray-time-holder .sp-control-tray-slots {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .sp-tray-time-holder .sp-control-tray-slots::before {
    width: calc(100% - (var(--sp-control-tray-padding) * 2));
  }

  .sp-tray-time-holder .sp-tray-time-text {
    aspect-ratio: auto;
    width: 100%;
    height: var(--sp-control-slot-size);
    max-height: var(--sp-control-slot-size);
    padding: 0 8px;
    font: 600 13px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-variant-numeric: tabular-nums;
    color: var(--white);
    border-radius: 3px;
  }

  .sp-tray-time-text {
    pointer-events: auto;
    cursor: pointer;
  }

  .sp-tray-time-text.is-time-animating {
    animation: sp-volume-icon-swap 240ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .sp-player.is-loading:not(.has-loaded-once) .sp-tray-time {
    opacity: 0;
  }

  .sp-progress:focus-visible,
  .sp-control-button:focus-visible,
  .sp-volume-track:focus-visible {
    outline: 2px solid rgb(255 255 255 / 0.92);
    outline-offset: 3px;
    box-shadow: 0 0 0 5px rgb(0 0 0 / 0.32);
  }

  @media (max-width: 768px) and (hover: none) and (pointer: coarse) {
    .sp-overlay,
    .sp-button {
      transition-duration: 340ms;
    }

    .sp-player.is-pointer-active .sp-overlay,
    .sp-player.is-loading:not(.has-loaded-once).is-pointer-active .sp-overlay,
    .sp-player.is-pointer-active .sp-button,
    .sp-player.is-loading:not(.has-loaded-once).is-pointer-active .sp-button,
    .sp-player.is-pointer-active .sp-control-tray,
    .sp-player.has-pinned-time.is-pointer-active .sp-tray-time {
      opacity: 0;
    }

    .sp-player.is-pointer-active .sp-button,
    .sp-player.is-loading:not(.has-loaded-once).is-pointer-active .sp-button {
      transform: translate(-50%, -50%) scale(0.96);
    }

    .sp-player.is-controls-visible .sp-overlay {
      opacity: 1;
    }

    .sp-player.is-controls-visible .sp-button {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    .sp-player.is-loading:not(.has-loaded-once).is-controls-visible .sp-overlay,
    .sp-player.is-loading:not(.has-loaded-once).is-controls-visible .sp-button,
    .sp-player.is-scrubbing .sp-button {
      opacity: 0;
      pointer-events: none;
    }

    .sp-progress-cluster:has(.sp-progress:hover) {
      --sp-progress-height: 4px;
    }

    .sp-player.has-pinned-time.is-controls-visible .sp-tray-time {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0) scale(1);
    }

    .sp-player.is-scrubbing .sp-progress-cluster {
      --sp-progress-height: 14px;
    }


    .sp-player.is-controls-visible .sp-overlay,
    .sp-player.is-controls-visible .sp-button,
    .sp-player.is-controls-visible .sp-control-tray {
      opacity: 1;
    }

    .sp-player.is-controls-visible .sp-button,
    .sp-player.is-controls-visible .sp-control-tray {
      pointer-events: auto;
    }

    .sp-player.is-controls-visible .sp-control-icon {
      opacity: var(--sp-control-icon-opacity);
      transform: translateY(0) scale(1);
    }

    .sp-control-tray-slots:has(.sp-control-button:hover)::before {
      opacity: 0;
    }

    .sp-control-button:hover .sp-control-icon {
      opacity: var(--sp-control-icon-opacity);
      transform: translateY(0) scale(1);
    }

    .sp-control-tray-slots:has(.sp-control-button.is-control-tap-active)::before {
      opacity: var(--sp-control-hover-opacity);
    }

    .sp-control-button.is-control-tap-active .sp-control-icon {
      opacity: var(--sp-control-icon-hover-opacity);
      transform: translateY(0) scale(1);
    }
  }

  @keyframes sp-progress-shimmer {
    0% {
      transform: translateX(-120%);
    }

    58%,
    100% {
      transform: translateX(120%);
    }
  }

  @keyframes sp-volume-icon-swap {
    0% {
      filter: blur(0);
      transform: translateY(0) scale(1);
    }

    42% {
      filter: blur(1.2px);
      transform: translateY(0) scale(0.9);
    }

    100% {
      filter: blur(0);
      transform: translateY(0) scale(1);
    }
  }
`, d = document.createElement("template");
d.innerHTML = `
  <style>${C}</style>
  <div class="sp-player is-loading" tabindex="0" role="group" aria-label="Video player" data-sp-player>
    <video
      class="sp-video sp-asset"
      autoplay
      muted
      playsinline
      loop
      preload="none"
      controlslist="nodownload nofullscreen noremoteplayback"
      disableRemotePlayback
      data-sp-video>
    </video>
    <span class="sp-overlay" aria-hidden="true" data-sp-overlay></span>
    <button class="sp-button" type="button" aria-label="Play video" data-sp-button>
      <svg class="sp-icon sp-icon--play" viewBox="0 0 18 20" aria-hidden="true">
        <path d="M3 3.5L15 10L3 16.5Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
      </svg>
      <svg class="sp-icon sp-icon--pause" viewBox="0 0 18 20" aria-hidden="true">
        <rect x="3" y="3" width="5" height="14" rx="1.5" fill="currentColor"></rect>
        <rect x="10" y="3" width="5" height="14" rx="1.5" fill="currentColor"></rect>
      </svg>
    </button>
    <div class="sp-progress-cluster">
      <div class="sp-progress" aria-label="Video progress" role="slider" tabindex="0" data-sp-progress-track>
        <span class="sp-progress-surface" aria-hidden="true"></span>
        <span class="sp-time" data-sp-time>
          <span class="sp-time-surface" aria-hidden="true"></span>
          <span class="sp-time-text" data-sp-time-text>0:00</span>
        </span>
        <span class="sp-progress-fill" data-sp-progress></span>
        <span class="sp-progress-hover-fill" aria-hidden="true"></span>
        <span class="sp-progress-marker" aria-hidden="true"></span>
      </div>
      <span class="sp-tray-time" data-sp-tray-time>
        <span class="sp-control-tray sp-tray-time-holder">
          <span class="sp-control-tray-slots">
            <button class="sp-control-button sp-tray-time-text" type="button" tabindex="-1" data-sp-tray-time-text>0:00</button>
          </span>
        </span>
      </span>
      <span class="sp-control-tray" data-sp-control-tray>
        <span class="sp-control-tray-slots" data-sp-control-tray-slots>
          <button class="sp-control-button sp-volume-slot" type="button" aria-label="Toggle sound" data-sp-volume-control>
            <svg class="sp-control-icon sp-volume-icon sp-volume-icon--sound" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M8 7.00002H5C3.8954 7.00002 3 7.89542 3 9.00002V11C3 12.1046 3.8954 13 5 13H8L12.5227 16.7689C13.1093 17.2578 14 16.8406 14 16.077V3.92302C14 3.15942 13.1094 2.74222 12.5227 3.23112L8 7.00002Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M17.4141 8.58582C18.1951 9.36682 18.1951 10.6332 17.4141 11.4142" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <svg class="sp-control-icon sp-volume-icon sp-volume-icon--muted" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3 17L17 3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M15 16.0773C14.9998 17.6883 13.1207 18.5686 11.8828 17.5372L9.8333 15.8303C9.38114 15.4538 9.35003 14.7702 9.76611 14.3541C10.132 13.9882 10.7165 13.9617 11.114 14.2929L13 15.8644V11.5354C13 11.2702 13.1054 11.0158 13.2929 10.8283C13.9229 10.1983 15 10.6445 15 11.5354V16.0773Z" fill="currentColor"></path>
              <path d="M12 2.37218C13.2358 1.48685 15 2.36173 15 3.92296V4.87902L13 6.87902V4.13488L8.64062 7.76867C8.46092 7.91841 8.23392 8.00011 8 8.00011H5C4.44768 8.00011 4 8.4478 4 9.00011V11.0001C4.00009 11.5524 4.44774 12.0001 5 12.0001H7.87891L5.87891 14.0001H5C3.34317 14.0001 2.00009 12.6569 2 11.0001V9.00011C2 7.34323 3.34312 6.00011 5 6.00011H7.63672L11.8828 2.463L12 2.37218Z" fill="currentColor"></path>
            </svg>
            <span class="sp-volume-popover" data-sp-volume-popover>
              <span class="sp-volume-track" role="slider" aria-label="Volume" aria-valuemin="0" aria-valuemax="100" tabindex="0" data-sp-volume-track>
                <span class="sp-volume-fill" data-sp-volume-fill></span>
              </span>
            </span>
          </button>
          <button class="sp-control-button" type="button" aria-label="Picture in picture" data-sp-picture-in-picture-control>
            <svg class="sp-control-icon" viewBox="0 0 20 20" aria-hidden="true">
              <path d="m5.5,13c-1.381,0-2.5-1.119-2.5-2.5v-5c0-1.381,1.119-2.5,2.5-2.5h7c1.381,0,2.5,1.119,2.5,2.5v2.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"></path>
              <rect x="9" y="12" width="8" height="5" rx="1.5" ry="1.5" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"></rect>
              <line x1="8" y1="8" x2="6" y2="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"></line>
              <polygon points="9 6 9 9 6 9 9 6" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"></polygon>
            </svg>
          </button>
          <button class="sp-control-button" type="button" aria-label="Enter fullscreen" data-sp-fullscreen-control>
            <svg class="sp-control-icon sp-fullscreen-icon sp-fullscreen-icon--enter" viewBox="0 0 20 20" aria-hidden="true">
              <polyline points="12.5 16 16 16 16 12.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></polyline>
              <line x1="16" y1="16" x2="12" y2="12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></line>
              <polyline points="7.5 4 4 4 4 7.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></polyline>
              <line x1="4" y1="4" x2="8" y2="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></line>
            </svg>
            <svg class="sp-control-icon sp-fullscreen-icon sp-fullscreen-icon--exit" viewBox="0 0 20 20" aria-hidden="true">
              <polyline points="16 12.5 12.5 12.5 12.5 16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></polyline>
              <line x1="12" y1="12" x2="16" y2="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></line>
              <polyline points="4 7.5 7.5 7.5 7.5 4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></polyline>
              <line x1="8" y1="8" x2="4" y2="4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></line>
            </svg>
          </button>
        </span>
      </span>
    </div>
  </div>
`;
class h extends HTMLElement {
  static observedAttributes = v;
  static #Dt = null;
  #r;
  #Ht = [];
  #T = null;
  #qt = !1;
  #E = !1;
  #s;
  #t;
  #Bt;
  #A;
  #i;
  #I;
  #Z;
  #ye;
  #p;
  #ms;
  #Hs;
  #a;
  #R;
  #m;
  #K;
  #G;
  #J = [];
  #ht = 0;
  #l = !1;
  #k = !1;
  #Q = !1;
  #v = 0;
  #Ut = 0;
  #tt = 0;
  #$t = !1;
  #D = !1;
  #ct = !1;
  #fs = 0;
  #Nt = 0;
  #c = null;
  #b = null;
  #vs = 0;
  #st = 0;
  #pt = 0;
  #ut = 0;
  #et = 0;
  #qs = 0;
  #bs = 0;
  #dt = !1;
  #Yt = !1;
  #Xt = 0;
  #Ot = 0;
  #Wt = null;
  #C = !1;
  #L = !1;
  #B = !1;
  #U = !1;
  #$ = 0;
  #_t = 0;
  #mt = !1;
  #Bs = 0;
  #jt = !0;
  #Us = 0;
  #$s = performance.now();
  #ft = 0;
  #x = null;
  #it = null;
  #Zt = !1;
  #y = !1;
  #rt = !1;
  #S = !1;
  #N = !1;
  #ys = null;
  #gs = null;
  #Kt = !1;
  #F = !1;
  #Y = !1;
  #o = null;
  #vt = 0;
  #bt = 0;
  #yt = 0;
  #gt = 0;
  #ws = null;
  #ks = !1;
  #wt = 0;
  #ge = 4;
  #we = 3.5;
  #xs = 6;
  #ke = 0.08;
  #xe = 240;
  #Ps = 1200;
  #kt = 1600;
  #Pe = 140;
  #Te = 380;
  #Ee = 650;
  #Ae = 2e3;
  #Ce = 3;
  #Le = 10;
  #Gt = 0.18;
  #Se = 8;
  #Fe = 18;
  #Me = 620;
  #Ns = 260;
  constructor() {
    super(), this.#r = this.attachShadow({ mode: "open" }), this.#r.append(d.content.cloneNode(!0));
  }
  get src() {
    return this.getAttribute("src") ?? "";
  }
  set src(t) {
    this.#Ts("src", t);
  }
  get aspectRatio() {
    return this.getAttribute("aspect-ratio") || u;
  }
  set aspectRatio(t) {
    this.#Ts("aspect-ratio", t);
  }
  get preloadMargin() {
    return this.getAttribute("preload-margin") || f;
  }
  set preloadMargin(t) {
    this.#Ts("preload-margin", t);
  }
  get autoplayEnabled() {
    return !this.hasAttribute("disable-autoplay") && !this.hasAttribute("no-autoplay");
  }
  set autoplayEnabled(t) {
    if (t) {
      this.removeAttribute("disable-autoplay"), this.removeAttribute("no-autoplay");
      return;
    }
    this.setAttribute("disable-autoplay", "");
  }
  get pauseOnOverlayClick() {
    return this.hasAttribute("pause-on-overlay-click");
  }
  set pauseOnOverlayClick(t) {
    if (t) {
      this.setAttribute("pause-on-overlay-click", "");
      return;
    }
    this.removeAttribute("pause-on-overlay-click");
  }
  get controlsEnabled() {
    return this.hasAttribute("controls");
  }
  set controlsEnabled(t) {
    if (t) {
      this.setAttribute("controls", "");
      return;
    }
    this.removeAttribute("controls");
  }
  get timeVisible() {
    return this.hasAttribute("show-time");
  }
  set timeVisible(t) {
    if (t) {
      this.setAttribute("show-time", "");
      return;
    }
    this.removeAttribute("show-time");
  }
  get volumeEnabled() {
    return this.controlsEnabled && !this.hasAttribute("disable-volume") && !this.hasAttribute("no-volume");
  }
  set volumeEnabled(t) {
    this.#Es("volume", t);
  }
  get volumeSliderEnabled() {
    return !this.hasAttribute("disable-volume-slider") && !this.hasAttribute("no-volume-slider");
  }
  set volumeSliderEnabled(t) {
    if (t) {
      this.removeAttribute("disable-volume-slider"), this.removeAttribute("no-volume-slider");
      return;
    }
    this.setAttribute("disable-volume-slider", "");
  }
  get pictureInPictureEnabled() {
    return this.controlsEnabled && !this.hasAttribute("disable-picture-in-picture") && !this.hasAttribute("no-picture-in-picture");
  }
  set pictureInPictureEnabled(t) {
    this.#Es("picture-in-picture", t);
  }
  get fullscreenEnabled() {
    return this.controlsEnabled && !this.hasAttribute("disable-fullscreen") && !this.hasAttribute("no-fullscreen");
  }
  set fullscreenEnabled(t) {
    this.#Es("fullscreen", t);
  }
  connectedCallback() {
    this.#s = this.#r.querySelector("[data-sp-player]"), this.#t = this.#r.querySelector("[data-sp-video]"), this.#Bt = this.#r.querySelector("[data-sp-overlay]"), this.#A = this.#r.querySelector("[data-sp-button]"), this.#i = this.#r.querySelector("[data-sp-progress-track]"), this.#I = this.#r.querySelector("[data-sp-control-tray]"), this.#Z = this.#r.querySelector("[data-sp-control-tray-slots]"), this.#ye = this.#r.querySelector("[data-sp-tray-time]"), this.#p = this.#r.querySelector("[data-sp-tray-time-text]"), this.#ms = this.#r.querySelector("[data-sp-time]"), this.#Hs = this.#r.querySelector("[data-sp-time-text]"), this.#a = this.#r.querySelector("[data-sp-volume-control]"), this.#R = this.#r.querySelector("[data-sp-volume-popover]"), this.#m = this.#r.querySelector("[data-sp-volume-track]"), this.#K = this.#r.querySelector("[data-sp-picture-in-picture-control]"), this.#G = this.#r.querySelector("[data-sp-fullscreen-control]"), this.#J = [this.#a, this.#K, this.#G], this.#Ys(), this.#qt || (this.#Ve(), this.#qt = !0), this.#Jt(), this.#Cs(), this.#xt(), this.#As(), this.#w(), this.#f(), this.#Vt(), this.#us(), this.#d();
  }
  disconnectedCallback() {
    this.#T?.disconnect(), this.#T = null, this.#Ht.forEach((t) => t()), this.#Ht = [], this.#qt = !1, this.#P(), this.#Gs(), this.#ns(), this.#Fs(), this.#lt(), this.#as(), this.#Rt(), this.#Js(), this.#Ss(), this.#Qs(), this.#s.classList.remove("is-volume-icon-animating"), this.#s.classList.remove("is-playback-pulsing"), this.#Z.style.removeProperty("--sp-control-hover-offset"), this.style.removeProperty("--sp-touch-control-hover-offset"), this.#St(), this.#y = !1, this.#s.classList.remove("is-progress-hovering"), this.#F = !1, this.#Y = !1, this.#N = !1, this.#dt = !1, this.#Yt = !1, this.#Xt = 0, this.#Ot = 0, this.#o = null, this.#a.classList.remove("is-volume-open"), this.#J.forEach((t) => t.classList.remove("is-control-tap-active")), this.#s.classList.remove("is-pointer-active"), this.#qe(), this.#Ft();
  }
  attributeChangedCallback(t, s, e) {
    if (s !== e) {
      if (t === "aspect-ratio") {
        this.#Ys();
        return;
      }
      if (this.#qt) {
        if (t === "preload-margin" && this.isConnected) {
          this.#T?.disconnect(), this.#Cs();
          return;
        }
        if (t === "src" && this.isConnected) {
          this.#Ni(), this.#Cs();
          return;
        }
        if ((t === "disable-autoplay" || t === "no-autoplay") && this.isConnected) {
          this.#Jt(), this.#f(), this.#d();
          return;
        }
        if (t === "show-time" && this.isConnected) {
          this.#As();
          return;
        }
        (t === "controls" || t.startsWith("enable-") || t.startsWith("disable-") || t.startsWith("no-")) && this.isConnected && (this.#xt(), this.#f(), this.#Vt(), this.#us(), this.#As());
      }
    }
  }
  #Ts(t, s) {
    if (s === "") {
      this.removeAttribute(t);
      return;
    }
    this.setAttribute(t, s);
  }
  #Es(t, s) {
    if (s) {
      this.setAttribute(`enable-${t}`, ""), this.removeAttribute(`disable-${t}`), this.removeAttribute(`no-${t}`);
      return;
    }
    this.removeAttribute(`enable-${t}`), this.setAttribute(`disable-${t}`, "");
  }
  #Ys() {
    this.style.setProperty("--simple-player-aspect-ratio", this.aspectRatio);
  }
  #Jt() {
    if (!this.#t) return;
    const t = this.autoplayEnabled;
    if (this.#t.autoplay = t, t) {
      this.#t.muted = !0, this.#t.setAttribute("autoplay", ""), this.#t.setAttribute("muted", "");
      return;
    }
    this.#t.removeAttribute("autoplay"), this.#E || (this.#t.muted = !1, this.#t.removeAttribute("muted"));
  }
  #xt() {
    if (!this.#s) return;
    const t = this.volumeEnabled && (!this.#S || this.#rt), s = [
      { button: this.#a, enabled: t, className: "has-volume-control" },
      { button: this.#K, enabled: this.pictureInPictureEnabled, className: "has-picture-in-picture-control" },
      { button: this.#G, enabled: this.fullscreenEnabled, className: "has-fullscreen-control" }
    ];
    let e = 0;
    for (const i of s)
      this.#s.classList.toggle(i.className, i.enabled), i.button.hidden = !i.enabled, i.enabled ? (i.button.dataset.spControlIndex = `${e}`, e += 1) : delete i.button.dataset.spControlIndex;
    this.style.setProperty("--sp-enabled-controls-count", `${e}`), this.style.setProperty("--sp-control-tray-display", e > 0 ? "block" : "none"), this.#s.classList.toggle("has-volume-slider-control", t && this.volumeSliderEnabled), (!t || !this.volumeSliderEnabled) && (this.#Rs(), this.#ps(this.#o), this.#F = !1, this.#Y = !1, this.#R.classList.remove("is-scrubbing-volume")), this.#Z.style.removeProperty("--sp-control-hover-offset");
  }
  get #Pt() {
    return this.timeVisible && this.controlsEnabled;
  }
  #As() {
    this.#s && (this.#s.classList.toggle("has-pinned-time", this.#Pt), this.#Pt && this.#Lt());
  }
  #Ve() {
    this.#e(this.#Bt, "pointerdown", this.#ci), this.#e(this.#Bt, "pointerup", this.#pi), this.#e(this.#Bt, "pointercancel", this.#ds), this.#e(this.#A, "click", this.#It), this.#e(this, "pointerenter", this.#is), this.#e(this, "pointermove", this.#rs), this.#e(this, "pointerleave", this.#os), this.#e(this, "mouseenter", this.#is), this.#e(this, "mousemove", this.#rs), this.#e(this, "mouseleave", this.#os), this.#e(this.#s, "pointerenter", this.#is), this.#e(this.#s, "pointermove", this.#rs), this.#e(this.#s, "pointerleave", this.#os), this.#e(this.#s, "mouseenter", this.#is), this.#e(this.#s, "mousemove", this.#rs), this.#e(this.#s, "mouseleave", this.#os), this.#e(this.#A, "pointerenter", this.#ot), this.#e(this.#A, "pointerleave", this.#nt), this.#e(this.#A, "mouseenter", this.#ot), this.#e(this.#A, "mouseleave", this.#nt), this.#e(this.#i, "pointerenter", this.#ot), this.#e(this.#i, "pointerleave", this.#nt), this.#e(this.#i, "mouseenter", this.#ot), this.#e(this.#i, "mouseleave", this.#nt), this.#e(this.#i, "pointerenter", this.#ve), this.#e(this.#i, "pointerleave", this.#be), this.#e(this.#i, "mouseenter", this.#ve), this.#e(this.#i, "mouseleave", this.#be), this.#e(this.#I, "pointerenter", this.#ot), this.#e(this.#I, "pointerleave", this.#nt), this.#e(this.#I, "mouseenter", this.#ot), this.#e(this.#I, "mouseleave", this.#nt), this.#e(this.#r, "focusin", this.#js), this.#e(this.#r, "focusout", this.#De), this.#e(this.#s, "pointerdown", this.#di), this.#e(this.#s, "keydown", this.#ui), this.#e(this.#s, "dragstart", this.#ts), this.#e(this.#s, "selectstart", this.#ts), this.#e(this.#t, "dragstart", this.#ts), this.#e(this.#t, "selectstart", this.#ts), this.#e(this.#i, "pointerdown", this.#Pi), this.#e(this.#i, "pointermove", this.#Ei), this.#e(this.#i, "pointerup", this.#Ai), this.#e(this.#i, "pointercancel", this.#Ci), this.#e(this.#i, "keydown", this.#Ti), this.#e(this.#a, "pointerenter", this.#me), this.#e(this.#a, "pointerleave", this.#fe), this.#e(this.#a, "click", this.#fi), this.#e(this.#R, "pointerenter", this.#me), this.#e(this.#R, "pointerleave", this.#fe), this.#e(this.#m, "pointerdown", this.#vi), this.#e(this.#m, "pointermove", this.#bi), this.#e(this.#m, "pointerup", this.#yi), this.#e(this.#m, "pointercancel", this.#gi), this.#e(this.#m, "click", this.#mi), this.#e(this.#m, "keydown", this.#wi), this.#e(this.#K, "click", this.#ki), this.#e(this.#G, "click", this.#xi), this.#e(this.#p, "click", this.#hi);
    for (const s of this.#J)
      this.#e(s, "pointerenter", this.#Zs), this.#e(s, "mouseenter", this.#Zs), this.#e(s, "pointerdown", this.#He);
    const t = this.#t.audioTracks;
    t && typeof t.addEventListener == "function" && this.#e(t, "addtrack", this.#ei), "ResizeObserver" in window && (this.#Wt = new ResizeObserver(() => {
      this.#Qt();
    }), this.#Wt.observe(this.#p), this.#Ht.push(() => {
      this.#Wt?.disconnect(), this.#Wt = null;
    })), this.#e(document, "pointerup", this.#Li), this.#e(document, "pointercancel", this.#Si), this.#e(document, "pointermove", this.#_s), this.#e(document, "mousemove", this.#_s), this.#e(document, "fullscreenchange", this.#zt), this.#e(document, "webkitfullscreenchange", this.#zt), this.#e(document, "mozfullscreenchange", this.#zt), this.#e(document, "MSFullscreenChange", this.#zt), this.#e(this.#r, "fullscreenchange", this.#zt), this.#e(window, "blur", this.#Fi), this.#e(window, "focus", this.#Mi), this.#e(this.#t, "play", this.#Vi), this.#e(this.#t, "pause", this.#zi), this.#e(this.#t, "ended", this.#Ii), this.#e(this.#t, "loadstart", this.#Ri), this.#e(this.#t, "waiting", this.#Ds), this.#e(this.#t, "stalled", this.#Ds), this.#e(this.#t, "seeking", this.#Ds), this.#e(this.#t, "loadeddata", this.#hs), this.#e(this.#t, "loadedmetadata", this.#Di), this.#e(this.#t, "canplay", this.#hs), this.#e(this.#t, "canplaythrough", this.#hs), this.#e(this.#t, "playing", this.#Hi), this.#e(this.#t, "seeked", this.#qi), this.#e(this.#t, "error", this.#Bi), this.#e(this.#t, "progress", this.#w), this.#e(this.#t, "suspend", this.#w), this.#e(this.#t, "timeupdate", this.#Ui), this.#e(this.#t, "volumechange", this.#$i), this.#e(this.#t, "enterpictureinpicture", this.#Vt), this.#e(this.#t, "leavepictureinpicture", this.#Vt);
  }
  #Qt() {
    if (!this.#s || !this.#p) return;
    this.#p.style.width = "fit-content";
    const t = Math.ceil(this.#p.scrollWidth);
    this.#p.style.width = "", this.#s.style.setProperty("--sp-tray-time-width", `${t}px`);
  }
  #e(t, s, e) {
    t.addEventListener(s, e), this.#Ht.push(() => t.removeEventListener(s, e));
  }
  #Cs() {
    if (!(!this.src || this.#E)) {
      if (this.#T?.disconnect(), this.#t.dataset.src = this.src, "IntersectionObserver" in window) {
        this.#T = new IntersectionObserver((t, s) => {
          t.some((e) => e.isIntersecting) && (s.disconnect(), this.#T = null, this.#O());
        }, { rootMargin: this.preloadMargin }), this.#T.observe(this.#s);
        return;
      }
      this.#O();
    }
  }
  #ts = (t) => {
    t.preventDefault();
  };
  #P() {
    this.#pt && (window.clearTimeout(this.#pt), this.#pt = 0);
  }
  #ze = () => {
    if (this.#pt = 0, !(this.#k || this.#l || this.#F)) {
      if (this.#n()) {
        this.#s.classList.remove("is-controls-visible");
        return;
      }
      this.#N || this.#s.classList.remove("is-pointer-active");
    }
  };
  #Tt(t = this.#n() ? this.#Ps : this.#kt) {
    this.#P(), this.#pt = window.setTimeout(this.#ze, t);
  }
  #H() {
    this.#n() && this.#Tt(this.#Ps);
  }
  #M() {
    if (!this.#n()) return !1;
    const t = this.#s.classList.contains("is-controls-visible");
    return this.#s.classList.add("is-controls-visible"), this.#H(), !t;
  }
  #ss(t = !1) {
    !t && this.#n() || performance.now() < this.#Ot || (this.#s.classList.contains("is-pointer-active") || (this.#Xt = performance.now()), this.#s.classList.add("is-pointer-active"), this.#N ? this.#P() : this.#Tt(t ? this.#kt : void 0));
  }
  #Et() {
    this.#N = !1, this.#Xt = 0, this.#P(), this.#s.classList.remove("is-pointer-active");
  }
  #X(t) {
    return this.#n() ? !1 : typeof PointerEvent < "u" && t instanceof PointerEvent ? (this.#Kt = t.pointerType === "touch" || t.pointerType === "pen", this.#Kt ? !1 : (this.#ys = t.clientX, this.#gs = t.clientY, !0)) : t instanceof MouseEvent ? this.#Kt ? !1 : (this.#ys = t.clientX, this.#gs = t.clientY, !0) : !1;
  }
  #Ie(t, s) {
    if (t === null || s === null || t < 0 || s < 0 || t > window.innerWidth || s > window.innerHeight) return !1;
    const e = this.#s.getBoundingClientRect();
    return e.width <= 0 || e.height <= 0 ? !1 : t >= e.left && t <= e.right && s >= e.top && s <= e.bottom;
  }
  #Xs(t, s, e) {
    if (!t) return !1;
    const i = t.getBoundingClientRect();
    return i.width <= 0 || i.height <= 0 ? !1 : s >= i.left && s <= i.right && e >= i.top && e <= i.bottom;
  }
  #Os() {
    this.#y && (this.#y = !1, this.#s.classList.remove("is-progress-hovering"), this.#s.style.setProperty("--sp-hover-fill-inset", "100%"), this.#St(), this.#Lt());
  }
  #Ws(t, s) {
    if (this.#n()) return;
    !this.#u() && this.#Xs(this.#i, t, s) ? (this.#y = !0, this.#s.classList.add("is-progress-hovering"), this.#j(t, !1, !1)) : this.#u() || this.#Os();
    const e = this.#J.find((r) => !r.hidden && !this.#Ls(r) && this.#Xs(r, t, s)) ?? null;
    if (!e) return;
    const i = Number(e.dataset.spControlIndex ?? 0);
    this.#Z.style.setProperty("--sp-control-hover-offset", `calc(var(--sp-control-slot-size) * ${i})`);
  }
  #At() {
    return this.#s.classList.contains("is-controls-visible") || this.#s.classList.contains("is-pointer-active") || this.#r.activeElement instanceof HTMLElement;
  }
  #es() {
    return this.#n() && performance.now() < this.#bs;
  }
  #Ls(t) {
    return t instanceof HTMLButtonElement && (t.disabled || t === this.#a && !this.#V());
  }
  #Re() {
    if (!this.#Kt && this.#Ie(this.#ys, this.#gs)) {
      this.#ss(!0);
      return;
    }
    this.#Et();
  }
  #is = (t) => {
    this.#X(t) && this.#ss(!0);
  };
  #rs = (t) => {
    this.#X(t) && ((t instanceof PointerEvent || t instanceof MouseEvent) && this.#Ws(t.clientX, t.clientY), this.#ss(!0));
  };
  #_s = (t) => {
    this.#X(t) && (this.#s.classList.remove("is-hover-disabled"), (t instanceof PointerEvent || t instanceof MouseEvent) && this.#Ws(t.clientX, t.clientY), this.#Re());
  };
  #os = (t) => {
    this.#X(t) && (this.#Ot = 0, this.#Et());
  };
  #ot = (t) => {
    this.#X(t) && (this.#N = !0, this.#s.classList.add("is-pointer-active"), this.#P());
  };
  #nt = (t) => {
    this.#X(t) && (this.#N = !1, this.#Tt(this.#kt));
  };
  #js = (t) => {
    if (t?.target !== this.#s) {
      if (this.#n()) {
        this.#s.classList.add("is-controls-visible");
        return;
      }
      this.#s.classList.add("is-pointer-active"), this.#P();
    }
  };
  #De = () => {
    this.#n() || this.#Tt(this.#kt);
  };
  #Zs = (t) => {
    const s = t.currentTarget;
    if (this.#Ls(s)) return;
    const i = Number(s.dataset.spControlIndex ?? 0);
    this.#Z.style.setProperty("--sp-control-hover-offset", `calc(var(--sp-control-slot-size) * ${i})`);
  };
  #Ss() {
    this.#yt && (window.clearTimeout(this.#yt), this.#yt = 0);
  }
  #Ks = () => {
    this.#yt = 0, this.#J.forEach((t) => t.classList.remove("is-control-tap-active")), this.style.removeProperty("--sp-touch-control-hover-offset");
  };
  #He = (t) => {
    if (!(t instanceof PointerEvent) || t.pointerType !== "touch") return;
    const s = t.currentTarget;
    if (!s || !this.#At() || this.#Ls(s)) return;
    const e = Number(s.dataset.spControlIndex ?? 0);
    this.#Ss(), this.#J.forEach((i) => i.classList.toggle("is-control-tap-active", i === s)), this.style.setProperty("--sp-touch-control-hover-offset", `calc(var(--sp-control-slot-size) * ${e})`), this.#yt = window.setTimeout(this.#Ks, 280);
  };
  #Gs() {
    this.#ut && (window.clearTimeout(this.#ut), this.#ut = 0);
  }
  #ns() {
    this.#st && (window.clearTimeout(this.#st), this.#st = 0);
  }
  #Fs() {
    this.#et && (window.clearTimeout(this.#et), this.#et = 0);
  }
  #as() {
    this.#_t && (window.clearTimeout(this.#_t), this.#_t = 0);
  }
  #Js() {
    this.#bt && (window.clearTimeout(this.#bt), this.#bt = 0);
  }
  #Qs() {
    this.#gt && (window.clearTimeout(this.#gt), this.#gt = 0);
  }
  #ls() {
    this.#Qs(), this.#s.classList.remove("is-playback-pulsing"), this.#A.offsetWidth, this.#s.classList.add("is-playback-pulsing"), this.#gt = window.setTimeout(() => {
      this.#gt = 0, this.#s.classList.remove("is-playback-pulsing");
    }, this.#Me);
  }
  #te() {
    if ("mediaSession" in navigator) {
      h.#Dt = this;
      try {
        navigator.mediaSession.setActionHandler("play", this.#Be), navigator.mediaSession.setActionHandler("pause", this.#Ue);
      } catch {
      }
      this.#at();
    }
  }
  #qe() {
    if (!(!("mediaSession" in navigator) || h.#Dt !== this)) {
      try {
        navigator.mediaSession.setActionHandler("play", null), navigator.mediaSession.setActionHandler("pause", null), navigator.mediaSession.playbackState = "none";
      } catch {
      }
      h.#Dt = null;
    }
  }
  #at() {
    if (!(!("mediaSession" in navigator) || h.#Dt !== this))
      try {
        navigator.mediaSession.playbackState = this.#t.paused || this.#t.ended ? "paused" : "playing";
      } catch {
      }
  }
  #Be = () => {
    if (!this.#t.paused && !this.#t.ended) {
      this.#at();
      return;
    }
    this.#ls(), this.#It();
  };
  #Ue = () => {
    if (this.#t.paused || this.#t.ended) {
      this.#at();
      return;
    }
    this.#ls(), this.#It();
  };
  #$e() {
    this.#Js(), this.#s.classList.remove("is-volume-icon-animating"), this.#a.offsetWidth, this.#s.classList.add("is-volume-icon-animating"), this.#bt = window.setTimeout(() => {
      this.#bt = 0, this.#s.classList.remove("is-volume-icon-animating");
    }, 240);
  }
  #se = () => {
    if (this.#et || this.#s.classList.contains("is-progress-settling")) {
      if (this.#Fs(), this.#mt) {
        this.#s.classList.remove("is-progress-settling");
        return;
      }
      this.#mt = !0, this.#Bs = performance.now() + this.#Ee, this.#u() || this.#h(), this.#g(), this.#s.classList.remove("is-progress-settling"), this.#d();
    }
  };
  #Ne() {
    this.#mt || this.#et || (this.#s.classList.add("is-progress-settling"), this.#_(0), this.#et = window.setTimeout(this.#se, this.#Te));
  }
  async #O() {
    if (this.#E) return;
    const t = this.#t.dataset.src || this.src;
    t && (this.#ns(), this.#as(), this.#vs += 1, this.#E = !0, this.#C = !1, this.#L = !1, this.#B = !1, this.#U = !1, this.#$ += 1, this.#s.classList.remove("has-visible-frame"), this.#Jt(), this.#t.src = t, this.#t.preload = "auto", this.#t.load(), this.#t.autoplay && this.#t.muted && await this.#t.play().catch(() => {
    }));
  }
  #ee() {
    return !this.#t.loop || this.#t.paused || !Number.isFinite(this.#t.duration) || this.#t.duration <= 0 ? !1 : this.#t.currentTime < 0.28 || this.#t.duration - this.#t.currentTime < 0.28;
  }
  #Ye(t = this.#t.currentTime) {
    if (!Number.isFinite(t)) return 0;
    const s = Math.max(0, t);
    try {
      for (let e = 0; e < this.#t.buffered.length; e += 1) {
        const i = this.#t.buffered.start(e), r = this.#t.buffered.end(e);
        if (s + this.#Gt >= i && s <= r + this.#Gt)
          return Math.max(0, r - s);
      }
    } catch {
      return 0;
    }
    return 0;
  }
  #ie(t = this.#Le) {
    if (!this.#E || this.#t.error || !this.#s.classList.contains("has-loaded-once") || !Number.isFinite(this.#t.duration) || this.#t.duration <= 0) return !1;
    const s = Math.max(0, this.#t.duration - this.#t.currentTime), e = Math.min(t, s);
    return e <= this.#Gt || this.#Ye() + this.#Gt >= e;
  }
  #Ct(t, s = !1) {
    this.#Gs();
    const e = t && !this.#ee() && !this.#ie(), r = t && !this.#L || e;
    if (this.#jt = r, !r) {
      this.#s.classList.remove("is-loading");
      return;
    }
    if (s) {
      this.#s.classList.add("is-loading");
      return;
    }
    this.#ut = window.setTimeout(() => {
      if (this.#ut = 0, !this.#L || !this.#ee() && !this.#ie()) {
        this.#jt = !0, this.#s.classList.add("is-loading");
        return;
      }
      this.#jt = !1, this.#s.classList.remove("is-loading");
    }, this.#Pe);
  }
  #w = () => {
    if (this.#t.error) {
      this.#Ct(!0, !0);
      return;
    }
    this.#Ct(
      !this.#E || !this.#L || this.#t.readyState < HTMLMediaElement.HAVE_FUTURE_DATA
    );
  };
  #Xe() {
    return this.#E && !this.#t.error && this.#C && (this.#t.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA || this.#t.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !this.#s.classList.contains("is-loading"));
  }
  #u() {
    return this.#k || this.#l || this.#D;
  }
  #Oe() {
    this.#vs >= this.#Ce || this.#st || (this.#st = window.setTimeout(() => {
      this.#st = 0, this.#as(), this.#E = !1, this.#C = !1, this.#L = !1, this.#B = !1, this.#U = !1, this.#$ += 1, this.#s.classList.remove("has-visible-frame"), this.#s.classList.contains("has-loaded-once") || this.#_(0), this.#t.removeAttribute("src"), this.#t.load(), this.#O();
    }, this.#Ae));
  }
  #re() {
    return this.#D ? (this.#D = !1, this.#ct = !1, this.#h(), this.#g(), !0) : !1;
  }
  #oe() {
    return this.#ns(), !this.#s.classList.contains("has-loaded-once") && this.#Ne(), this.#s.classList.add("has-loaded-once"), this.#s.classList.add("has-visible-frame"), this.#w(), this.#b = null, this.#D ? (this.#re(), !0) : (this.#u() || this.#h(), this.#g(), !0);
  }
  #We() {
    if (this.#C || this.#B || this.#t.error) return;
    this.#B = !0;
    const t = this.#$, s = () => {
      if (t === this.#$) {
        if (this.#as(), this.#B = !1, this.#C = !this.#t.error && this.#t.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && this.#t.videoWidth > 0 && this.#t.videoHeight > 0, this.#C) {
          if (this.#U || this.#L) return;
          this.#U = !0, window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              t === this.#$ && (this.#U = !1, this.#L = !0, this.#oe(), this.#d());
            });
          }), this.#d();
          return;
        }
        this.#w();
      }
    };
    if ("requestVideoFrameCallback" in this.#t) {
      this.#t.requestVideoFrameCallback(s), this.#_t = window.setTimeout(s, 180);
      return;
    }
    window.requestAnimationFrame(s);
  }
  #hs = () => {
    if (this.#t.error || this.#t.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || this.#t.videoWidth <= 0 || this.#t.videoHeight <= 0)
      return this.#w(), !1;
    if (!this.#C)
      return this.#We(), this.#w(), !1;
    const t = this.#oe();
    return this.#f(), t;
  };
  #ne() {
    return !this.#t.paused && (!this.#t.ended || this.#t.loop) && this.#t.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
  }
  #h(t = this.#t.currentTime) {
    this.#Us = Number.isFinite(t) ? Math.max(0, t) : 0, this.#$s = performance.now();
  }
  #q() {
    this.#x = null, this.#it = null;
  }
  #ae() {
    if (!Number.isFinite(this.#t.duration) || this.#t.duration <= 0) {
      this.#x = null;
      return;
    }
    const t = Number.isFinite(this.#t.currentTime) ? Math.max(0, this.#t.currentTime) : 0, s = Number.isFinite(this.#ft) ? this.#ft : t;
    this.#x = Math.min(this.#t.duration, Math.max(t, s)), this.#h(this.#x);
  }
  #_e() {
    if (!Number.isFinite(this.#t.duration) || this.#t.duration <= 0) {
      this.#it = null, this.#ae();
      return;
    }
    const t = this.#s.style.getPropertyValue("--sp-progress-inset"), s = Number.parseFloat(t), e = Number.isFinite(s) ? Math.min(1, Math.max(0, 1 - s / 100)) : null, i = this.#W(), r = Math.min(1, Math.max(0, i / this.#t.duration)), n = Math.max(e ?? 0, r);
    this.#it = n, this.#x = n * this.#t.duration, this.#h(this.#x), this.#_(n), this.#i.setAttribute("aria-valuenow", `${this.#x}`), this.#i.setAttribute(
      "aria-valuetext",
      `${a(this.#x)} of ${a(this.#t.duration)}`
    );
  }
  #W() {
    if (!Number.isFinite(this.#t.duration) || this.#t.duration <= 0) return this.#t.currentTime || 0;
    if (this.#u()) return this.#v;
    if (this.#x !== null) return this.#x;
    if (!this.#ne()) return this.#t.currentTime || 0;
    if (this.#jt || !this.#mt || performance.now() < this.#Bs)
      return this.#h(), this.#t.currentTime || 0;
    if (this.#s.classList.contains("is-loading") && this.#t.readyState < HTMLMediaElement.HAVE_FUTURE_DATA)
      return this.#h(), this.#t.currentTime || 0;
    const t = (performance.now() - this.#$s) / 1e3, s = this.#Us + t, e = this.#t.loop ? s % this.#t.duration : Math.min(s, this.#t.duration);
    return !this.#t.loop && this.#t.currentTime - e > 0.45 ? (this.#h(), this.#t.currentTime) : e;
  }
  #_(t) {
    const s = Math.min(1, Math.max(0, t)), e = (1 - s) * 100, { innerWidth: i } = this.#Ze(), r = 1 / i, n = this.#l && this.#$t && this.#tt + r < s;
    if (this.#s.style.setProperty("--sp-progress-inset", `${e}%`), this.#s.style.setProperty("--sp-return-marker-base-opacity", n ? "0" : "1"), n) {
      const l = this.#cs(this.#tt), c = Math.max(0, i - 2), m = Math.min(c, Math.max(0, l - 3));
      this.#s.style.setProperty("--sp-return-marker-hole-left", `${m}px`);
    } else
      this.#s.style.setProperty("--sp-return-marker-hole-left", "-9999px");
  }
  #je(t) {
    return !Number.isFinite(this.#t.duration) || this.#t.duration <= 0 ? 0 : Math.min(1, Math.max(0, t / this.#t.duration));
  }
  #Ze(t = this.#i.getBoundingClientRect()) {
    return p(t);
  }
  #cs(t, s = this.#i.getBoundingClientRect()) {
    return E(t, s);
  }
  #Ke(t, s) {
    return A(t, s);
  }
  #Ge(t) {
    this.#Ut = Number.isFinite(t) ? Math.max(0, t) : 0, this.#tt = this.#je(this.#Ut);
    const s = this.#i.getBoundingClientRect(), e = this.#cs(this.#tt, s), i = e >= this.#xs && e <= Math.max(this.#xs, s.width - this.#xs);
    this.#$t = this.#Ut > this.#ke && i, this.#s.classList.toggle("has-return-marker", this.#$t), this.#s.style.setProperty("--sp-return-marker-left", `${e}px`);
  }
  #Je(t, s, e, i = this.#l) {
    const r = e * this.#t.duration;
    if (!i || !this.#$t)
      return { percent: e, targetTime: r };
    const n = s.left + this.#cs(this.#tt, s);
    return Math.abs(t - n) <= this.#we ? {
      percent: this.#tt,
      targetTime: this.#Ut
    } : { percent: e, targetTime: r };
  }
  #Lt(t = this.#W()) {
    !this.#Pt || this.#y || this.#u() || (this.#p.textContent = this.#Is(t), this.#Qt());
  }
  #g(t = this.#W()) {
    const s = Number.isFinite(this.#t.duration) && this.#t.duration > 0;
    if (s && this.#it !== null) {
      const r = this.#it * this.#t.duration;
      this.#ft = r, this.#_(this.#it), this.#i.setAttribute("aria-valuemin", "0"), this.#i.setAttribute("aria-valuemax", `${this.#t.duration}`), this.#i.setAttribute("aria-valuenow", `${r}`), this.#i.setAttribute(
        "aria-valuetext",
        `${a(r)} of ${a(this.#t.duration)}`
      ), this.#Lt(r);
      return;
    }
    const e = s ? Math.min(this.#t.duration, Math.max(0, t)) : t, i = s ? e / this.#t.duration : 0;
    this.#ft = Number.isFinite(e) ? Math.max(0, e) : 0, this.#_(i), this.#i.setAttribute("aria-valuemin", "0"), this.#i.setAttribute("aria-valuemax", s ? `${this.#t.duration}` : "0"), this.#i.setAttribute("aria-valuenow", s ? `${e}` : "0"), this.#i.setAttribute(
      "aria-valuetext",
      s ? `${a(e)} of ${a(this.#t.duration)}` : "Loading video"
    ), this.#Lt(e);
  }
  #j(t, s = this.#l, e = !0) {
    if (!Number.isFinite(this.#t.duration) || this.#t.duration <= 0) return this.#t.currentTime;
    const i = this.#i.getBoundingClientRect(), r = this.#Ke(t, i), n = this.#Je(t, i, r, s);
    return this.#s.style.setProperty("--sp-hover-fill-inset", `${(1 - r) * 100}%`), e && this.#_(n.percent), this.#Pt || this.#s.style.setProperty("--sp-scrub-preview-left", `${this.#cs(n.percent, i)}px`), this.#Hs.textContent = a(n.targetTime), this.#p.textContent = this.#Is(n.targetTime), this.#Qt(), e && (this.#i.setAttribute("aria-valuenow", `${n.targetTime}`), this.#i.setAttribute(
      "aria-valuetext",
      `${a(n.targetTime)} of ${a(this.#t.duration)}`
    )), this.#Qe(), n.targetTime;
  }
  #St() {
    this.#Zt = !1, this.#s?.classList.remove("has-controls-collision");
  }
  #Qe() {
    if (!this.#l && !this.#y || !this.#I || !this.#ms || this.#Pt) {
      this.#St();
      return;
    }
    const t = this.#I.getBoundingClientRect(), s = this.#ms.getBoundingClientRect(), e = t.width > 0 && t.height > 0, i = this.#Zt ? this.#Fe : this.#Se, r = e && s.right >= t.left - i && s.left <= t.right + i && s.bottom >= t.top - i && s.top <= t.bottom + i;
    this.#Zt = r, this.#s.classList.toggle("has-controls-collision", this.#Zt);
  }
  #Ft() {
    this.#ht && (window.cancelAnimationFrame(this.#ht), this.#ht = 0);
  }
  #ti() {
    this.#Ft(), this.#h();
    const t = () => {
      this.#g(this.#W()), this.#ne() && (this.#ht = window.requestAnimationFrame(t));
    };
    this.#ht = window.requestAnimationFrame(t);
  }
  #d() {
    const t = !this.#t.paused && (!this.#t.ended || this.#t.loop) || this.#l && this.#Q, s = this.#b ? this.#b === "playing" : t;
    if (this.#s.classList.toggle("is-playing", s), this.#A.setAttribute("aria-label", s ? "Pause video" : "Play video"), this.#l) {
      this.#Ft();
      return;
    }
    t && this.#s.classList.contains("has-loaded-once") && !this.#s.classList.contains("is-progress-settling") ? this.#ti() : (this.#Ft(), this.#g());
  }
  #lt() {
    this.#Nt && (window.clearTimeout(this.#Nt), this.#Nt = 0);
  }
  #si() {
    return P(this.#t);
  }
  #V() {
    return this.volumeEnabled && this.#S && this.#rt;
  }
  #z() {
    this.#Rt(), this.#ps(this.#o), this.#F = !1, this.#Y = !1, this.#o = null, this.#a.classList.remove("is-volume-open", "is-control-tap-active"), this.#R.classList.remove("is-scrubbing-volume");
  }
  #ei = () => {
    this.#S = !0, this.#rt = !0, this.#xt(), this.#f();
  };
  #f = () => {
    if (!this.volumeEnabled) {
      this.#s.classList.remove("is-volume-unavailable", "is-volume-muted", "is-volume-sound", "is-volume-icon-animating"), this.#z(), this.#a.disabled = !0, this.#a.setAttribute("aria-disabled", "true");
      return;
    }
    const t = this.#S;
    if (!this.#S) {
      const l = this.#si();
      l !== "unknown" ? (this.#S = !0, this.#rt = l === "available") : this.#t.readyState >= HTMLMediaElement.HAVE_METADATA && !T(this.#t) && (this.#S = !0, this.#rt = !0);
    }
    !t && this.#S && this.#xt();
    const s = this.#V(), e = !s || this.#t.muted || this.#t.volume <= 0, i = s && !this.#t.muted ? this.#t.volume : 0, r = Math.round(i * 100), n = e ? "muted" : "sound";
    this.#ws && this.#ws !== n && this.#$e(), this.#ws = n, this.#s.classList.toggle("is-volume-unavailable", !s), this.#s.classList.toggle("is-volume-muted", e), this.#s.classList.toggle("is-volume-sound", !e), this.#s.style.setProperty("--sp-volume-level", `${r}%`), this.#a.disabled = !s, this.#a.setAttribute("aria-disabled", `${!s}`), this.#a.setAttribute(
      "aria-label",
      s ? e ? "Unmute video" : "Mute video" : "Video has no audio"
    ), this.#m.setAttribute("aria-valuenow", `${r}`), this.#m.setAttribute("aria-valuetext", `${r}%`), s || this.#z();
  };
  #le(t) {
    if (!this.#V()) return;
    const s = this.#m.getBoundingClientRect(), e = Math.min(1, Math.max(0, 1 - (t - s.top) / s.height)), i = Math.round(e * 100) / 100;
    this.#t.volume = i, this.#t.muted = i <= 0, this.#f();
  }
  #ps(t) {
    t !== null && this.#m.hasPointerCapture(t) && this.#m.releasePointerCapture(t);
  }
  #Mt(t) {
    this.#F = !1, this.#o = null, this.#R.classList.remove("is-scrubbing-volume"), this.#m.blur(), this.#ps(t), this.#de(260);
  }
  #Vt = () => {
    const t = document.pictureInPictureElement === this.#t, s = this.#t, e = !!(this.pictureInPictureEnabled && document.pictureInPictureEnabled && s.requestPictureInPicture);
    this.#s.classList.toggle("is-picture-in-picture", t), this.#K.disabled = !e, this.#K.setAttribute("aria-label", t ? "Exit picture in picture" : "Enter picture in picture");
  };
  #Ms() {
    return b(this.#r);
  }
  #he() {
    return y(this.fullscreenEnabled, this.#s, this.#t);
  }
  #ii() {
    return g(this.#s);
  }
  #ri() {
    k(this.#t);
  }
  #oi() {
    return x();
  }
  #us = () => {
    const t = this.#Ms(), s = t === this.#s || t === this, e = this.#he();
    return this.#s.classList.toggle("is-fullscreen", s), this.#G.disabled = !e, this.#G.setAttribute("aria-label", s ? "Exit fullscreen" : "Enter fullscreen"), s;
  };
  #zt = () => {
    const t = this.#us();
    this.#ni(t);
  };
  #ni(t) {
    this.#P(), this.#Rt(), this.#Vs(this.#c), this.#ps(this.#o), this.#lt(), this.#k = !1, this.#l = !1, this.#y = !1, this.#s.classList.remove("is-progress-hovering"), this.#c = null, this.#N = !1, this.#Y = !1, this.#F = !1, this.#o = null, this.#Ss(), this.#Ks(), this.#Z.style.removeProperty("--sp-control-hover-offset"), this.#a.classList.remove("is-volume-open"), this.#R.classList.remove("is-scrubbing-volume"), this.#s.classList.remove("is-scrubbing"), this.#s.classList.remove("is-pointer-active"), this.#s.classList.add("is-hover-disabled");
    const s = this.#r.activeElement;
    s instanceof HTMLElement && s.blur(), t ? (this.#n() ? this.#M() : this.#ss(!0), this.#Tt(this.#n() ? this.#Ps : this.#kt)) : this.#Et();
  }
  #ce = () => {
    !this.#k || this.#l || (this.#q(), this.#P(), this.#lt(), this.#l = !0, this.#s.classList.add("is-scrubbing"), this.#v = this.#j(this.#fs, !0), this.#Q && this.#t.pause(), this.#t.currentTime = this.#v, this.#h(this.#v), this.#g(this.#v), this.#Ft(), this.#d());
  };
  #Vs(t) {
    t !== null && this.#i.hasPointerCapture(t) && this.#i.releasePointerCapture(t);
  }
  async #pe(t, s, e) {
    if (!this.#k && !this.#l) return;
    const i = this.#l;
    this.#lt(), this.#k = !1, this.#l = !1, this.#y = !1, this.#s.classList.remove("is-progress-hovering"), this.#s.style.setProperty("--sp-hover-fill-inset", "100%"), this.#c = null, this.#s.classList.remove("is-scrubbing"), this.#St(), this.#Vs(s), e && t !== null && (this.#q(), this.#v = this.#j(t, i), this.#D = !0, this.#ct = this.#Q, this.#t.currentTime = this.#v, this.#h(this.#v)), this.#g(this.#v), i && this.#Q && await this.#t.play(), this.#H();
  }
  #zs(t) {
    !this.#k && !this.#l || (this.#lt(), this.#k = !1, this.#l = !1, this.#y = !1, this.#s.classList.remove("is-progress-hovering"), this.#s.style.setProperty("--sp-hover-fill-inset", "100%"), this.#c = null, this.#s.classList.remove("is-scrubbing"), this.#St(), this.#Vs(t), this.#h(), this.#g(), this.#Q && this.#t.play(), this.#H());
  }
  #Is(t) {
    if (!this.#ks) return a(t);
    const s = Number.isFinite(this.#t.duration) ? this.#t.duration : 0;
    return s <= 0 ? a(t) : `-${a(Math.max(0, s - t))}`;
  }
  #ai() {
    this.#wt && (window.clearTimeout(this.#wt), this.#wt = 0);
  }
  #li() {
    this.#ai(), this.#p.classList.remove("is-time-animating"), this.#p.offsetWidth, this.#p.classList.add("is-time-animating"), this.#wt = window.setTimeout(() => {
      this.#wt = 0, this.#p.classList.remove("is-time-animating");
    }, 240);
  }
  #hi = (t) => {
    t.stopPropagation(), this.#ks = !this.#ks, this.#li(), this.#u() || this.#y ? this.#p && (this.#p.textContent = this.#Is(this.#v), this.#Qt()) : this.#Lt(this.#W());
  };
  #It = async () => {
    if (performance.now() < this.#qs)
      return;
    this.#te();
    const t = this.#b ? this.#b !== "playing" : this.#t.paused || this.#t.ended, s = !t || this.#Xe();
    this.#M(), s && (this.#b = t ? "playing" : "paused", this.#d()), t ? (this.#q(), await this.#O(), await this.#t.play().catch(() => {
      this.#b = null;
    })) : (this.#_e(), this.#t.pause()), this.#d(), this.#H();
  };
  #ci = (t) => {
    this.#dt = t instanceof PointerEvent && t.pointerType === "mouse" && t.button === 0 && this.pauseOnOverlayClick && !this.#n(), this.#Yt = this.#dt && (!this.#s.classList.contains("is-pointer-active") || performance.now() - this.#Xt < this.#Ns);
  };
  #ds = () => {
    this.#dt = !1, this.#Yt = !1;
  };
  #pi = (t) => {
    const s = this.#Yt, e = t instanceof PointerEvent && t.pointerType === "mouse" && t.button === 0 && this.#dt;
    this.#ds(), e && (s && (this.#Ot = performance.now() + this.#Ns, this.#Et()), this.#ls(), this.#It());
  };
  #ui = (t) => {
    if (!(t instanceof KeyboardEvent) || t.target !== this.#s || t.repeat) return;
    const s = t.key.toLowerCase(), e = s === " " || s === "spacebar" || s === "enter" || s === "k" || s === "mediaplaypause", i = s === "mediaplay", r = s === "mediapause";
    !e && !i && !r || (t.preventDefault(), t.stopPropagation(), !(i && !this.#t.paused && !this.#t.ended) && (r && (this.#t.paused || this.#t.ended) || (this.#ls(), this.#It())));
  };
  #di = (t) => {
    if (!(t instanceof PointerEvent)) return;
    const s = this.#A.getBoundingClientRect(), e = t.clientX >= s.left && t.clientX <= s.right && t.clientY >= s.top && t.clientY <= s.bottom, i = this.#I.getBoundingClientRect(), r = t.clientX >= i.left && t.clientX <= i.right && t.clientY >= i.top && t.clientY <= i.bottom, n = this.#i.getBoundingClientRect(), l = t.clientX >= n.left && t.clientX <= n.right && t.clientY >= n.top && t.clientY <= n.bottom, c = this.#M();
    c && e && (this.#qs = performance.now() + 260), c && (r || l) && (this.#bs = performance.now() + 260), this.#O();
  };
  #mi = (t) => {
    t.stopPropagation();
  };
  #Rt() {
    this.#vt && (window.clearTimeout(this.#vt), this.#vt = 0);
  }
  #ue() {
    if (!this.#V() || !this.volumeSliderEnabled) {
      this.#z();
      return;
    }
    this.#Rt(), this.#a.classList.add("is-volume-open");
  }
  #Rs = () => {
    this.#vt = 0, !(this.#Y || this.#F) && this.#a.classList.remove("is-volume-open");
  };
  #de(t = 150) {
    this.#Rt(), this.#vt = window.setTimeout(this.#Rs, t);
  }
  #me = () => {
    if (!this.#n()) {
      if (!this.#V() || !this.volumeSliderEnabled) {
        this.#z();
        return;
      }
      this.#Y = !0, this.#ue();
    }
  };
  #fe = () => {
    if (!this.#n()) {
      if (!this.#V() || !this.volumeSliderEnabled) {
        this.#z();
        return;
      }
      this.#Y = !1, this.#de();
    }
  };
  #fi = (t) => {
    if (t.preventDefault(), t.stopPropagation(), !this.#V()) {
      this.#z();
      return;
    }
    !this.#At() || this.#es() || (this.#M(), this.#Rs(), this.#t.muted || this.#t.volume <= 0 ? (this.#t.volume <= 0 && (this.#t.volume = 0.7), this.#t.muted = !1) : this.#t.muted = !0, this.#f(), this.#H());
  };
  #vi = (t) => {
    if (t instanceof PointerEvent) {
      if (t.preventDefault(), t.stopPropagation(), !this.#V() || !this.volumeSliderEnabled || this.#n()) {
        this.#z();
        return;
      }
      this.#M(), this.#P(), this.#ue(), this.#F = !0, this.#o = t.pointerId, this.#R.classList.add("is-scrubbing-volume"), this.#m.setPointerCapture(t.pointerId), this.#le(t.clientY);
    }
  };
  #bi = (t) => {
    t instanceof PointerEvent && this.#F && (this.#o !== null && t.pointerId !== this.#o || (t.preventDefault(), t.stopPropagation(), this.#le(t.clientY)));
  };
  #yi = (t) => {
    t instanceof PointerEvent && (this.#o !== null && t.pointerId !== this.#o || (t.stopPropagation(), this.#Mt(t.pointerId), this.#H()));
  };
  #gi = (t) => {
    t instanceof PointerEvent && (this.#o !== null && t.pointerId !== this.#o || (t.stopPropagation(), this.#Mt(t.pointerId)));
  };
  #wi = (t) => {
    if (!(t instanceof KeyboardEvent)) return;
    if (!this.#V()) {
      t.preventDefault(), t.stopPropagation(), this.#z();
      return;
    }
    if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(t.key)) return;
    t.preventDefault(), t.stopPropagation();
    const s = t.shiftKey ? 0.1 : 0.05, e = t.key === "Home" ? 0 : t.key === "End" ? 1 : this.#t.volume + (t.key === "ArrowUp" ? s : -s);
    this.#t.volume = Math.min(1, Math.max(0, e)), this.#t.muted = this.#t.volume <= 0, this.#f();
  };
  #ki = async () => {
    const t = this.#t;
    if (!(!this.pictureInPictureEnabled || !document.pictureInPictureEnabled || !t.requestPictureInPicture) && !(!this.#At() || this.#es())) {
      this.#M();
      try {
        await this.#O(), document.pictureInPictureElement === this.#t ? await document.exitPictureInPicture() : await t.requestPictureInPicture();
      } catch {
      } finally {
        this.#Vt(), this.#H();
      }
    }
  };
  #xi = async (t) => {
    if (this.#he() && (t.preventDefault(), t.stopPropagation(), !(!this.#At() || this.#es()))) {
      this.#X(t), this.#M();
      try {
        const s = this.#Ms();
        s === this.#s || s === this ? await this.#oi() : (await this.#O(), w(this.#s) ? await this.#ii() : this.#ri());
      } catch {
      } finally {
        this.#us(), this.#H();
      }
    }
  };
  #ve = (t) => {
    this.#n() || this.#u() || !(t instanceof PointerEvent) && !(t instanceof MouseEvent) || (this.#y = !0, this.#s.classList.add("is-progress-hovering"), this.#j(t.clientX, !1, !1));
  };
  #be = () => {
    this.#u() || this.#Os();
  };
  #Pi = (t) => {
    if (t instanceof PointerEvent) {
      if (t.preventDefault(), !this.#At() || this.#es()) {
        this.#M(), this.#n() && (this.#bs = performance.now() + 260);
        return;
      }
      this.#M(), this.#P(), this.#se(), this.#D = !1, this.#ct = !1, this.#Ge(this.#W()), this.#k = !0, this.#c = t.pointerId, this.#fs = t.clientX, this.#Q = !this.#t.paused && !this.#t.ended, this.#i.setPointerCapture(t.pointerId), this.#v = this.#j(t.clientX, !1), this.#lt(), this.#Nt = window.setTimeout(this.#ce, this.#xe);
    }
  };
  #Ti = (t) => {
    if (!(t instanceof KeyboardEvent) || !Number.isFinite(this.#t.duration) || this.#t.duration <= 0 || !["ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"].includes(t.key)) return;
    t.preventDefault(), t.stopPropagation(), this.#js();
    const s = this.#W(), e = t.shiftKey ? 10 : 5, i = Math.max(10, this.#t.duration * 0.1), r = t.key === "Home" ? 0 : t.key === "End" ? this.#t.duration : t.key === "PageUp" ? s + i : t.key === "PageDown" ? s - i : s + (t.key === "ArrowRight" ? e : -e);
    this.#t.currentTime = Math.min(this.#t.duration, Math.max(0, r)), this.#h(this.#t.currentTime), this.#g(this.#t.currentTime);
  };
  #Ei = (t) => {
    if (t instanceof PointerEvent) {
      if (!this.#k) {
        this.#n() || (this.#y = !0, this.#s.classList.add("is-progress-hovering"), this.#j(t.clientX, !1, !1));
        return;
      }
      this.#c !== null && t.pointerId !== this.#c || (!this.#l && Math.abs(t.clientX - this.#fs) >= this.#ge && this.#ce(), this.#l && (this.#v = this.#j(t.clientX)));
    }
  };
  #Ai = (t) => {
    t instanceof PointerEvent && (this.#c !== null && t.pointerId !== this.#c || this.#pe(t.clientX, t.pointerId, !0));
  };
  #Ci = (t) => {
    t instanceof PointerEvent && (this.#c !== null && t.pointerId !== this.#c || this.#zs(t.pointerId));
  };
  #Li = (t) => {
    if (t instanceof PointerEvent) {
      if (this.#ds(), this.#o !== null && t.pointerId === this.#o) {
        this.#Mt(t.pointerId);
        return;
      }
      this.#c === null || t.pointerId !== this.#c || this.#pe(t.clientX, t.pointerId, !0);
    }
  };
  #Si = (t) => {
    if (t instanceof PointerEvent) {
      if (this.#ds(), this.#o !== null && t.pointerId === this.#o) {
        this.#Mt(t.pointerId);
        return;
      }
      this.#c === null || t.pointerId !== this.#c || this.#zs(t.pointerId);
    }
  };
  #Fi = () => {
    this.#Mt(this.#o), this.#zs(this.#c);
  };
  #Mi = () => {
    this.#Ms() || this.#Et();
  };
  #Vi = () => {
    this.#te(), this.#b = null, this.#q(), this.#u() || this.#h(), this.#d(), this.#at();
  };
  #zi = () => {
    this.#b = null, this.#u() || this.#ae(), this.#w(), this.#d(), this.#at();
  };
  #Ii = () => {
    this.#b = null, this.#q(), this.#u() || this.#h(), this.#d(), this.#at();
  };
  #Ri = () => {
    this.#Ct(!0, !0);
  };
  #Ds = () => {
    this.#Ct(!0);
  };
  #Di = () => {
    this.#q(), this.#f(), this.#u() || this.#h(), this.#w(), this.#g();
  };
  #Hi = () => {
    const t = this.#hs();
    this.#f(), t && !this.#u() && this.#h(), this.#d();
  };
  #qi = () => {
    if (this.#q(), this.#w(), this.#D && (!this.#ct || this.#t.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA)) {
      this.#re(), this.#d();
      return;
    }
    this.#u() || this.#h(), this.#g();
  };
  #Bi = () => {
    this.#b = null, this.#C = !1, this.#L = !1, this.#B = !1, this.#U = !1, this.#$ += 1, this.#s.classList.remove("has-visible-frame"), this.#Ct(!0, !0), this.#d(), this.#Oe();
  };
  #Ui = () => {
    this.#f(), this.#g();
  };
  #$i = () => {
    this.#f();
  };
  #n() {
    return window.matchMedia("(max-width: 768px)").matches && window.matchMedia("(hover: none), (pointer: coarse)").matches;
  }
  #Ni() {
    this.#t && (this.#T?.disconnect(), this.#T = null, this.#ns(), this.#Fs(), this.#E = !1, this.#vs = 0, this.#C = !1, this.#L = !1, this.#B = !1, this.#U = !1, this.#$ += 1, this.#mt = !1, this.#ft = 0, this.#q(), this.#rt = !1, this.#S = !1, this.#xt(), this.#z(), this.#D = !1, this.#ct = !1, this.#b = null, this.#s.classList.remove("has-loaded-once", "has-visible-frame", "is-progress-settling"), this.#t.dataset.src = this.src, this.#t.pause(), this.#t.removeAttribute("src"), this.#t.preload = "none", this.#Jt(), this.#t.load(), this.#_(0), this.#f(), this.#w(), this.#d());
  }
}
customElements.get("simple-player") || customElements.define("simple-player", h);
export {
  h as SimplePlayer
};
//# sourceMappingURL=simple-player.js.map
