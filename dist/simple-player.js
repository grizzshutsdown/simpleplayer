const u = "16 / 9", f = "360px 0px", b = [
  "src",
  "aspect-ratio",
  "preload-margin",
  "controls",
  "disable-autoplay",
  "pause-on-overlay-click",
  "enable-volume",
  "disable-volume",
  "disable-volume-slider",
  "enable-speed",
  "disable-speed",
  "enable-picture-in-picture",
  "disable-picture-in-picture",
  "enable-fullscreen",
  "disable-fullscreen",
  "show-time",
  "no-autoplay",
  "no-volume",
  "no-volume-slider",
  "no-speed",
  "no-picture-in-picture",
  "no-fullscreen"
];
function v(o) {
  const t = document;
  return o.fullscreenElement || document.fullscreenElement || t.webkitFullscreenElement || t.mozFullScreenElement || t.msFullscreenElement || null;
}
function y(o, t, s) {
  const e = document, i = t, r = s, n = !!((document.fullscreenEnabled ?? e.webkitFullscreenEnabled ?? e.mozFullScreenEnabled ?? e.msFullscreenEnabled ?? !1) && (i.requestFullscreen || i.webkitRequestFullscreen || i.mozRequestFullScreen || i.msRequestFullscreen)), a = !!(r.webkitSupportsFullscreen || r.webkitEnterFullscreen || r.webkitEnterFullScreen);
  return !!(o && (n || a));
}
function g(o) {
  const t = o, s = t.requestFullscreen || t.webkitRequestFullscreen || t.mozRequestFullScreen || t.msRequestFullscreen;
  return Promise.resolve(s?.call(t));
}
function w(o) {
  const t = o;
  return typeof t.requestFullscreen == "function" || typeof t.webkitRequestFullscreen == "function" || typeof t.mozRequestFullScreen == "function" || typeof t.msRequestFullscreen == "function";
}
function x(o) {
  const t = o;
  (t.webkitEnterFullscreen || t.webkitEnterFullScreen)?.call(t);
}
function k() {
  const o = document, t = document.exitFullscreen || o.webkitExitFullscreen || o.mozCancelFullScreen || o.msExitFullscreen;
  return Promise.resolve(t?.call(o));
}
function l(o) {
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
function c(o) {
  const t = Math.min(2, Math.max(0, o.width / 2)), s = Math.max(1, o.width - t * 2);
  return { rect: o, sideInset: t, innerWidth: s };
}
function E(o, t) {
  const { sideInset: s, innerWidth: e } = c(t), i = Math.min(1, Math.max(0, o));
  return s + i * e;
}
function C(o, t) {
  const { sideInset: s, innerWidth: e } = c(t);
  return Math.min(1, Math.max(0, (o - t.left - s) / e));
}
const A = `
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
    --sp-control-tray-expanded-width: calc((var(--sp-control-slot-size) * var(--sp-enabled-controls-count)) + var(--sp-speed-slot-extra-width, 0px) + (var(--sp-control-tray-padding) * 2));
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
    --sp-time-font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

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

  .sp-button:focus-visible {
    z-index: 31;
    outline: 0;
  }

  .sp-button:focus-visible::after {
    content: '';
    position: absolute;
    inset: 3px;
    z-index: 2;
    border: 2px solid rgb(255 255 255 / 0.92);
    border-radius: 12px;
    box-shadow: 0 0 0 3px rgb(0 0 0 / 0.55);
    pointer-events: none;
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

  .sp-progress:focus-visible {
    outline: 0;
  }

  .sp-progress:focus-visible::after {
    content: '';
    position: absolute;
    right: -3px;
    bottom: calc((var(--space) * 2) - 5px);
    left: -3px;
    z-index: 31;
    height: calc(var(--sp-progress-height) + 10px);
    border: 2px solid rgb(255 255 255 / 0.92);
    border-radius: 8px;
    box-shadow: 0 0 0 3px rgb(0 0 0 / 0.55);
    pointer-events: none;
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
    width: var(--sp-control-hover-width, var(--sp-control-slot-size));
    height: var(--sp-control-slot-size);
    border-radius: 3px;
    background: var(--sp-control-hover-surface);
    opacity: 0;
    pointer-events: none;
    transform: translateX(var(--sp-control-hover-offset, 0px));
    transition:
      opacity 120ms ease,
      width 160ms cubic-bezier(0.18, 0.9, 0.22, 1),
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

  .sp-player:not(.has-volume-control) [data-sp-volume-slot],
  .sp-player:not(.has-speed-control) [data-sp-speed-slot],
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

  .sp-speed-icon [stroke] {
    stroke-width: 2;
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

  .sp-volume-slot {
    position: relative;
    display: block;
    flex: 0 0 auto;
    width: var(--sp-control-slot-size);
    height: var(--sp-control-slot-size);
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

  .sp-speed-slot {
    position: relative;
    display: block;
    flex: 0 0 auto;
    width: var(--sp-speed-slot-width, var(--sp-control-slot-size));
    height: var(--sp-control-slot-size);
  }

  .sp-speed-control {
    width: 100%;
    padding: 0;
  }

  .sp-speed-popover {
    position: absolute;
    left: 50%;
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
    backdrop-filter: var(--sp-glass-filter);
    -webkit-backdrop-filter: var(--sp-glass-filter);
    box-shadow: inset 0 0 0 1px rgb(var(--white-rgb) / 0.08);
    transform: translate(-50%, 8px) scale(0.96);
    transform-origin: center bottom;
    transition:
      opacity 140ms ease,
      filter 180ms ease,
      transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .sp-speed-control.is-speed-open + .sp-speed-popover {
    z-index: 4;
    opacity: 1;
    pointer-events: auto;
    filter: blur(0);
    transform: translate(-50%, 0) scale(1);
  }

  .sp-speed-popover.is-scrubbing-speed {
    z-index: 4;
    opacity: 1;
    pointer-events: auto;
    filter: blur(0);
    transform: translate(-50%, 0) scale(1);
  }

  .sp-speed-preview {
    position: absolute;
    left: 50%;
    bottom: calc(100% + var(--space));
    z-index: 5;
    padding: 2px 6px;
    border-radius: 4px;
    color: var(--white);
    isolation: isolate;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transform: translateX(-50%) translateY(2px);
    transition: opacity 140ms ease, transform 180ms cubic-bezier(0.18, 0.9, 0.22, 1);
    font: 500 12px/1.35 var(--sp-time-font-family);
    font-variant-numeric: tabular-nums;
  }

  .sp-speed-preview::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    background: var(--sp-glass-surface);
    opacity: var(--sp-glass-opacity);
    backdrop-filter: var(--sp-glass-filter);
    -webkit-backdrop-filter: var(--sp-glass-filter);
  }

  .sp-speed-popover.is-scrubbing-speed .sp-speed-preview,
  .sp-speed-popover.is-speed-value-visible .sp-speed-preview {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .sp-speed-preview-text {
    display: inline-block;
  }

  .sp-speed-preview-text.is-speed-value-animating {
    animation: sp-speed-value-swap 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .sp-speed-slot::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 100%;
    left: 0;
    height: calc(var(--sp-control-tray-padding) + 4px);
    z-index: 5;
    pointer-events: auto;
  }

  .sp-speed-track {
    position: relative;
    z-index: 1;
    display: block;
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

  .sp-speed-thumb {
    position: absolute;
    z-index: 1;
    right: 2px;
    bottom: clamp(2px, calc(var(--sp-speed-position, 50%) - 2px), calc(100% - 6px));
    left: 2px;
    height: 4px;
    border-radius: 3px;
    background: var(--white);
    transition: bottom 220ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .sp-speed-center {
    position: absolute;
    right: 5px;
    bottom: calc(50% - 1px);
    left: 5px;
    height: 2px;
    border-radius: 2px;
    background: var(--white);
    opacity: 0.38;
    pointer-events: none;
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
    font: 500 12px/1.35 var(--sp-time-font-family);
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

  .sp-tray-time-holder:focus-within {
    overflow: visible;
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
    font: 600 13px/1 var(--sp-time-font-family);
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

  .sp-progress-cluster:focus-within,
  .sp-tray-time:focus-within,
  .sp-control-tray:focus-within {
    z-index: 30;
  }

  .sp-control-button:focus-visible,
  .sp-volume-track:focus-visible,
  .sp-speed-track:focus-visible {
    z-index: 31;
    outline: 2px solid rgb(255 255 255 / 0.92);
    outline-offset: 3px;
    box-shadow: 0 0 0 5px rgb(0 0 0 / 0.42);
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

  @keyframes sp-speed-value-swap {
    0% {
      filter: blur(0);
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    42% {
      filter: blur(0.8px);
      opacity: 0.72;
      transform: translateY(-0.5px) scale(0.94);
    }

    100% {
      filter: blur(0);
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`, d = document.createElement("template");
d.innerHTML = `
  <style>${A}</style>
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
            <button class="sp-control-button sp-tray-time-text" type="button" aria-label="Show remaining time" aria-pressed="false" data-sp-tray-time-text>0:00</button>
          </span>
        </span>
      </span>
      <span class="sp-control-tray" data-sp-control-tray>
        <span class="sp-control-tray-slots" data-sp-control-tray-slots>
          <span class="sp-volume-slot" data-sp-volume-slot>
            <button class="sp-control-button" type="button" aria-label="Toggle sound" aria-controls="sp-volume-popover" aria-expanded="false" data-sp-volume-control>
              <svg class="sp-control-icon sp-volume-icon sp-volume-icon--sound" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M8 7.00002H5C3.8954 7.00002 3 7.89542 3 9.00002V11C3 12.1046 3.8954 13 5 13H8L12.5227 16.7689C13.1093 17.2578 14 16.8406 14 16.077V3.92302C14 3.15942 13.1094 2.74222 12.5227 3.23112L8 7.00002Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M17.4141 8.58582C18.1951 9.36682 18.1951 10.6332 17.4141 11.4142" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <svg class="sp-control-icon sp-volume-icon sp-volume-icon--muted" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M3 17L17 3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M15 16.0773C14.9998 17.6883 13.1207 18.5686 11.8828 17.5372L9.8333 15.8303C9.38114 15.4538 9.35003 14.7702 9.76611 14.3541C10.132 13.9882 10.7165 13.9617 11.114 14.2929L13 15.8644V11.5354C13 11.2702 13.1054 11.0158 13.2929 10.8283C13.9229 10.1983 15 10.6445 15 11.5354V16.0773Z" fill="currentColor"></path>
                <path d="M12 2.37218C13.2358 1.48685 15 2.36173 15 3.92296V4.87902L13 6.87902V4.13488L8.64062 7.76867C8.46092 7.91841 8.23392 8.00011 8 8.00011H5C4.44768 8.00011 4 8.4478 4 9.00011V11.0001C4.00009 11.5524 4.44774 12.0001 5 12.0001H7.87891L5.87891 14.0001H5C3.34317 14.0001 2.00009 12.6569 2 11.0001V9.00011C2 7.34323 3.34312 6.00011 5 6.00011H7.63672L11.8828 2.463L12 2.37218Z" fill="currentColor"></path>
              </svg>
            </button>
            <span class="sp-volume-popover" id="sp-volume-popover" inert data-sp-volume-popover>
              <span class="sp-volume-track" role="slider" aria-label="Volume" aria-valuemin="0" aria-valuemax="100" tabindex="0" data-sp-volume-track>
                <span class="sp-volume-fill" data-sp-volume-fill></span>
              </span>
            </span>
          </span>
          <span class="sp-speed-slot" data-sp-speed-slot>
            <button class="sp-control-button sp-speed-control" type="button" aria-label="Playback speed: 1x" aria-controls="sp-speed-popover" aria-expanded="false" data-sp-speed-control>
              <svg class="sp-control-icon sp-speed-icon" viewBox="0 0 20 20" aria-hidden="true">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 10.76L7.72 7.72"></path>
                  <path d="M10 2.78C5.5928 2.78 2.02 6.3528 2.02 10.76C2.02 13.4163 3.3179 15.7695 5.3141 17.22H14.6859C16.6821 15.7695 17.98 13.4163 17.98 10.76C17.98 6.3528 14.4072 2.78 10 2.78Z"></path>
                </g>
              </svg>
            </button>
            <span class="sp-speed-popover" id="sp-speed-popover" inert data-sp-speed-popover>
              <span class="sp-speed-preview" aria-hidden="true">
                <span class="sp-speed-preview-text" data-sp-speed-value>1x</span>
              </span>
              <span class="sp-speed-track" role="slider" aria-label="Playback speed" aria-valuemin="0.25" aria-valuemax="4" aria-valuenow="1" aria-valuetext="1x" tabindex="0" data-sp-speed-track>
                <span class="sp-speed-center" aria-hidden="true"></span>
                <span class="sp-speed-thumb" aria-hidden="true"></span>
              </span>
            </span>
          </span>
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
  static observedAttributes = b;
  static #ts = null;
  #r;
  #ss = [];
  #M = null;
  #es = !1;
  #V = !1;
  #e;
  #t;
  #is;
  #z;
  #i;
  #U;
  #C;
  #gt;
  #c;
  #Ds;
  #le;
  #R;
  #n;
  #y;
  #b;
  #a;
  #rs;
  #N;
  #w;
  #v;
  #at;
  #lt;
  #O = [];
  #wt = 0;
  #h = !1;
  #L = !1;
  #ht = !1;
  #x = 0;
  #os = 0;
  #pt = 0;
  #ns = !1;
  #X = !1;
  #xt = !1;
  #Hs = 0;
  #as = 0;
  #d = null;
  #k = null;
  #qs = 0;
  #ct = 0;
  #kt = 0;
  #Pt = 0;
  #ut = 0;
  #he = 0;
  #Bs = 0;
  #Tt = !1;
  #ls = !1;
  #hs = 0;
  #ps = 0;
  #cs = null;
  #I = !1;
  #D = !1;
  #J = !1;
  #Q = !1;
  #tt = 0;
  #us = 0;
  #Et = !1;
  #pe = 0;
  #ds = !0;
  #ce = 0;
  #ue = performance.now();
  #Ct = 0;
  #F = null;
  #dt = null;
  #ms = !1;
  #P = !1;
  #mt = !1;
  #H = !1;
  #st = !1;
  #$s = null;
  #Ys = null;
  #fs = !1;
  #q = !1;
  #W = !1;
  #l = null;
  #At = 0;
  #_ = !1;
  #ft = !1;
  #u = null;
  #St = 0;
  #Lt = 0;
  #Ft = 0;
  #Mt = 0;
  #Vt = 0;
  #zt = 0;
  #Us = null;
  #Rt = !1;
  #It = 0;
  #Ze = 4;
  #Ke = 3.5;
  #Ns = 6;
  #Ge = 0.08;
  #Je = 240;
  #Os = 1200;
  #Dt = 1600;
  #Qe = 140;
  #ti = 380;
  #si = 650;
  #ei = 2e3;
  #ii = 3;
  #ri = 10;
  #bs = 0.18;
  #oi = 8;
  #ni = 18;
  #ai = 620;
  #de = 260;
  constructor() {
    super(), this.#r = this.attachShadow({ mode: "open" }), this.#r.append(d.content.cloneNode(!0));
  }
  get src() {
    return this.getAttribute("src") ?? "";
  }
  set src(t) {
    this.#Xs("src", t);
  }
  get aspectRatio() {
    return this.getAttribute("aspect-ratio") || u;
  }
  set aspectRatio(t) {
    this.#Xs("aspect-ratio", t);
  }
  get preloadMargin() {
    return this.getAttribute("preload-margin") || f;
  }
  set preloadMargin(t) {
    this.#Xs("preload-margin", t);
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
    this.#vs("volume", t);
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
  get speedEnabled() {
    return this.controlsEnabled && !this.hasAttribute("disable-speed") && !this.hasAttribute("no-speed");
  }
  set speedEnabled(t) {
    this.#vs("speed", t);
  }
  get pictureInPictureEnabled() {
    return this.controlsEnabled && !this.hasAttribute("disable-picture-in-picture") && !this.hasAttribute("no-picture-in-picture");
  }
  set pictureInPictureEnabled(t) {
    this.#vs("picture-in-picture", t);
  }
  get fullscreenEnabled() {
    return this.controlsEnabled && !this.hasAttribute("disable-fullscreen") && !this.hasAttribute("no-fullscreen");
  }
  set fullscreenEnabled(t) {
    this.#vs("fullscreen", t);
  }
  connectedCallback() {
    this.#e = this.#r.querySelector("[data-sp-player]"), this.#t = this.#r.querySelector("[data-sp-video]"), this.#is = this.#r.querySelector("[data-sp-overlay]"), this.#z = this.#r.querySelector("[data-sp-button]"), this.#i = this.#r.querySelector("[data-sp-progress-track]"), this.#U = this.#r.querySelector("[data-sp-control-tray]"), this.#C = this.#r.querySelector("[data-sp-control-tray-slots]"), this.#gt = this.#r.querySelector("[data-sp-tray-time]"), this.#c = this.#r.querySelector("[data-sp-tray-time-text]"), this.#Ds = this.#r.querySelector("[data-sp-time]"), this.#le = this.#r.querySelector("[data-sp-time-text]"), this.#R = this.#r.querySelector("[data-sp-volume-slot]"), this.#n = this.#r.querySelector("[data-sp-volume-control]"), this.#y = this.#r.querySelector("[data-sp-volume-popover]"), this.#b = this.#r.querySelector("[data-sp-volume-track]"), this.#a = this.#r.querySelector("[data-sp-speed-control]"), this.#rs = this.#r.querySelector("[data-sp-speed-slot]"), this.#N = this.#r.querySelector("[data-sp-speed-value]"), this.#w = this.#r.querySelector("[data-sp-speed-popover]"), this.#v = this.#r.querySelector("[data-sp-speed-track]"), this.#at = this.#r.querySelector("[data-sp-picture-in-picture-control]"), this.#lt = this.#r.querySelector("[data-sp-fullscreen-control]"), this.#O = [this.#n, this.#a, this.#at, this.#lt], this.#me(), this.#es || (this.#hi(), this.#es = !0), this.#ys(), this.#_s(), this.#Ht(), this.#Ws(), this.#S(), this.#g(), this.#re(), this.#_t(), this.#Ms(), this.#f();
  }
  disconnectedCallback() {
    this.#M?.disconnect(), this.#M = null, this.#ss.forEach((t) => t()), this.#ss = [], this.#es = !1, this.#T(), this.#ke(), this.#Es(), this.#Gs(), this.#yt(), this.#Cs(), this.#Kt(), this.#Jt(), this.#Rs(), this.#Ye(), this.#Pe(), this.#Ks(), this.#Te(), this.#e.classList.remove("is-volume-icon-animating"), this.#e.classList.remove("is-playback-pulsing"), this.#C.style.removeProperty("--sp-control-hover-offset"), this.#C.style.removeProperty("--sp-control-hover-width"), this.style.removeProperty("--sp-touch-control-hover-offset"), this.#Ot(), this.#P = !1, this.#e.classList.remove("is-progress-hovering"), this.#q = !1, this.#W = !1, this.#_ = !1, this.#ft = !1, this.#st = !1, this.#Tt = !1, this.#ls = !1, this.#hs = 0, this.#ps = 0, this.#ne(this.#u), this.#l = null, this.#u = null, this.#R.classList.remove("is-volume-open"), this.#n.setAttribute("aria-expanded", "false"), this.#y.setAttribute("inert", ""), this.#G(), this.#O.forEach((t) => t.classList.remove("is-control-tap-active")), this.#e.classList.remove("is-pointer-active"), this.#fi(), this.#Xt();
  }
  attributeChangedCallback(t, s, e) {
    if (s !== e) {
      if (t === "aspect-ratio") {
        this.#me();
        return;
      }
      if (this.#es) {
        if (t === "preload-margin" && this.isConnected) {
          this.#M?.disconnect(), this.#_s();
          return;
        }
        if (t === "src" && this.isConnected) {
          this.#Mr(), this.#_s();
          return;
        }
        if ((t === "disable-autoplay" || t === "no-autoplay") && this.isConnected) {
          this.#ys(), this.#g(), this.#f();
          return;
        }
        if (t === "show-time" && this.isConnected) {
          this.#Ws();
          return;
        }
        (t === "controls" || t.startsWith("enable-") || t.startsWith("disable-") || t.startsWith("no-")) && this.isConnected && (this.#Ht(), this.#g(), this.#_t(), this.#Ms(), this.#Ws());
      }
    }
  }
  #Xs(t, s) {
    if (s === "") {
      this.removeAttribute(t);
      return;
    }
    this.setAttribute(t, s);
  }
  #vs(t, s) {
    if (s) {
      this.setAttribute(`enable-${t}`, ""), this.removeAttribute(`disable-${t}`), this.removeAttribute(`no-${t}`);
      return;
    }
    this.removeAttribute(`enable-${t}`), this.setAttribute(`disable-${t}`, "");
  }
  #me() {
    this.style.setProperty("--simple-player-aspect-ratio", this.aspectRatio);
  }
  #ys() {
    if (!this.#t) return;
    const t = this.autoplayEnabled;
    if (this.#t.autoplay = t, t) {
      this.#t.muted = !0, this.#t.setAttribute("autoplay", ""), this.#t.setAttribute("muted", "");
      return;
    }
    this.#t.removeAttribute("autoplay"), this.#V || (this.#t.muted = !1, this.#t.removeAttribute("muted"));
  }
  #Ht() {
    if (!this.#e) return;
    const t = this.volumeEnabled && (!this.#H || this.#mt), s = [
      { button: this.#n, enabled: t, className: "has-volume-control" },
      { button: this.#a, enabled: this.speedEnabled, className: "has-speed-control" },
      { button: this.#at, enabled: this.pictureInPictureEnabled, className: "has-picture-in-picture-control" },
      { button: this.#lt, enabled: this.fullscreenEnabled, className: "has-fullscreen-control" }
    ];
    let e = 0;
    for (const i of s)
      this.#e.classList.toggle(i.className, i.enabled), i.button.hidden = !i.enabled, i.enabled ? (i.button.dataset.spControlIndex = `${e}`, e += 1) : delete i.button.dataset.spControlIndex;
    this.style.setProperty("--sp-enabled-controls-count", `${e}`), this.style.setProperty("--sp-control-tray-display", e > 0 ? "block" : "none"), this.#li(), this.#e.classList.toggle("has-volume-slider-control", t && this.volumeSliderEnabled), (!t || !this.volumeSliderEnabled) && (this.#Gt(), this.#Fs(this.#l), this.#q = !1, this.#W = !1, this.#y.classList.remove("is-scrubbing-volume")), this.speedEnabled || this.#G(), this.#C.style.removeProperty("--sp-control-hover-offset"), this.#C.style.removeProperty("--sp-control-hover-width");
  }
  #li() {
    if (!this.#C || !this.#N) return;
    const t = this.#O.find((n) => n !== this.#a && !n.hidden && n.getBoundingClientRect().width > 0), s = t ? Number.parseFloat(getComputedStyle(t).width) : 0, e = Number.isFinite(s) && s > 0 ? s : 24, i = this.speedEnabled ? e : 0;
    let r = 0;
    this.style.setProperty("--sp-speed-slot-width", `${i || e}px`), this.style.setProperty("--sp-speed-slot-extra-width", `${Math.max(0, i - e)}px`);
    for (const n of this.#O) {
      if (n.hidden) {
        delete n.dataset.spControlOffset, delete n.dataset.spControlWidth;
        continue;
      }
      const a = n === this.#a ? i : e;
      n.dataset.spControlOffset = `${r}px`, n.dataset.spControlWidth = `${a}px`, r += a;
    }
  }
  get #qt() {
    return this.timeVisible && this.controlsEnabled;
  }
  #Ws() {
    this.#e && (this.#e.classList.toggle("has-pinned-time", this.#qt), this.#qt && this.#Nt());
  }
  #hi() {
    this.#s(this.#is, "pointerdown", this.#Yi), this.#s(this.#is, "pointerup", this.#Ui), this.#s(this.#is, "pointercancel", this.#Vs), this.#s(this.#z, "click", this.#Zt), this.#s(this, "pointerenter", this.#ks), this.#s(this, "pointermove", this.#Ps), this.#s(this, "pointerleave", this.#Ts), this.#s(this, "mouseenter", this.#ks), this.#s(this, "mousemove", this.#Ps), this.#s(this, "mouseleave", this.#Ts), this.#s(this.#e, "pointerenter", this.#ks), this.#s(this.#e, "pointermove", this.#Ps), this.#s(this.#e, "pointerleave", this.#Ts), this.#s(this.#e, "mouseenter", this.#ks), this.#s(this.#e, "mousemove", this.#Ps), this.#s(this.#e, "mouseleave", this.#Ts), this.#s(this.#z, "pointerenter", this.#j), this.#s(this.#z, "pointerleave", this.#Z), this.#s(this.#z, "mouseenter", this.#j), this.#s(this.#z, "mouseleave", this.#Z), this.#s(this.#i, "pointerenter", this.#j), this.#s(this.#i, "pointerleave", this.#Z), this.#s(this.#i, "mouseenter", this.#j), this.#s(this.#i, "mouseleave", this.#Z), this.#s(this.#i, "pointerenter", this.#_e), this.#s(this.#i, "pointerleave", this.#je), this.#s(this.#i, "mouseenter", this.#_e), this.#s(this.#i, "mouseleave", this.#je), this.#s(this.#U, "pointerenter", this.#j), this.#s(this.#U, "pointerleave", this.#Z), this.#s(this.#U, "mouseenter", this.#j), this.#s(this.#U, "mouseleave", this.#Z), this.#s(this.#gt, "pointerenter", this.#j), this.#s(this.#gt, "pointerleave", this.#Z), this.#s(this.#gt, "mouseenter", this.#j), this.#s(this.#gt, "mouseleave", this.#Z), this.#s(this.#r, "focusin", this.#ge), this.#s(this.#r, "focusout", this.#di), this.#s(this.#e, "pointerdown", this.#Oi), this.#s(this.#e, "keydown", this.#Ni), this.#s(this.#e, "dragstart", this.#ws), this.#s(this.#e, "selectstart", this.#ws), this.#s(this.#t, "dragstart", this.#ws), this.#s(this.#t, "selectstart", this.#ws), this.#s(this.#i, "pointerdown", this.#ur), this.#s(this.#i, "pointermove", this.#mr), this.#s(this.#i, "pointerup", this.#fr), this.#s(this.#i, "pointercancel", this.#br), this.#s(this.#i, "keydown", this.#dr), this.#s(this.#n, "pointerenter", this.#He), this.#s(this.#n, "pointerleave", this.#qe), this.#s(this.#n, "click", this.#ji), this.#s(this.#n, "keydown", this.#Be), this.#s(this.#y, "pointerenter", this.#He), this.#s(this.#y, "pointerleave", this.#qe), this.#s(this.#b, "pointerdown", this.#Zi), this.#s(this.#b, "pointermove", this.#Ki), this.#s(this.#b, "pointerup", this.#Gi), this.#s(this.#b, "pointercancel", this.#Ji), this.#s(this.#b, "click", this.#Xi), this.#s(this.#b, "keydown", this.#Be), this.#s(this.#R, "focusin", this.#Wi), this.#s(this.#R, "focusout", this.#_i), this.#s(this.#a, "pointerenter", this.#Oe), this.#s(this.#a, "pointerleave", this.#Xe), this.#s(this.#a, "click", this.#ir), this.#s(this.#a, "keydown", this.#We), this.#s(this.#w, "pointerenter", this.#Oe), this.#s(this.#w, "pointerleave", this.#Xe), this.#s(this.#v, "pointerdown", this.#or), this.#s(this.#v, "pointermove", this.#nr), this.#s(this.#v, "pointerup", this.#ar), this.#s(this.#v, "pointercancel", this.#lr), this.#s(this.#v, "click", this.#rr), this.#s(this.#v, "keydown", this.#We), this.#s(this.#rs, "focusin", this.#sr), this.#s(this.#rs, "focusout", this.#er), this.#s(this.#at, "click", this.#pr), this.#s(this.#lt, "click", this.#cr), this.#s(this.#c, "click", this.#$i);
    for (const s of this.#O)
      this.#s(s, "pointerenter", this.#we), this.#s(s, "mouseenter", this.#we), this.#s(s, "pointerdown", this.#mi);
    const t = this.#t.audioTracks;
    t && typeof t.addEventListener == "function" && this.#s(t, "addtrack", this.#zi), "ResizeObserver" in window && (this.#cs = new ResizeObserver(() => {
      this.#gs();
    }), this.#cs.observe(this.#c), this.#ss.push(() => {
      this.#cs?.disconnect(), this.#cs = null;
    })), this.#s(document, "pointerdown", this.#hr), this.#s(document, "pointerup", this.#vr), this.#s(document, "pointercancel", this.#yr), this.#s(document, "pointermove", this.#ye), this.#s(document, "mousemove", this.#ye), this.#s(document, "fullscreenchange", this.#jt), this.#s(document, "webkitfullscreenchange", this.#jt), this.#s(document, "mozfullscreenchange", this.#jt), this.#s(document, "MSFullscreenChange", this.#jt), this.#s(this.#r, "fullscreenchange", this.#jt), this.#s(window, "blur", this.#gr), this.#s(window, "focus", this.#wr), this.#s(this.#t, "play", this.#xr), this.#s(this.#t, "pause", this.#kr), this.#s(this.#t, "ended", this.#Pr), this.#s(this.#t, "loadstart", this.#Tr), this.#s(this.#t, "waiting", this.#ae), this.#s(this.#t, "stalled", this.#ae), this.#s(this.#t, "seeking", this.#ae), this.#s(this.#t, "loadeddata", this.#Ss), this.#s(this.#t, "loadedmetadata", this.#Er), this.#s(this.#t, "canplay", this.#Ss), this.#s(this.#t, "canplaythrough", this.#Ss), this.#s(this.#t, "playing", this.#Cr), this.#s(this.#t, "seeked", this.#Ar), this.#s(this.#t, "error", this.#Sr), this.#s(this.#t, "progress", this.#S), this.#s(this.#t, "suspend", this.#S), this.#s(this.#t, "timeupdate", this.#Lr), this.#s(this.#t, "volumechange", this.#Fr), this.#s(this.#t, "ratechange", this.#re), this.#s(this.#t, "enterpictureinpicture", this.#_t), this.#s(this.#t, "leavepictureinpicture", this.#_t);
  }
  #gs() {
    if (!this.#e || !this.#c) return;
    this.#c.style.width = "fit-content";
    const t = Math.ceil(this.#c.scrollWidth);
    this.#c.style.width = "", this.#e.style.setProperty("--sp-tray-time-width", `${t}px`);
  }
  #s(t, s, e) {
    t.addEventListener(s, e), this.#ss.push(() => t.removeEventListener(s, e));
  }
  #_s() {
    if (!(!this.src || this.#V)) {
      if (this.#M?.disconnect(), this.#t.dataset.src = this.src, "IntersectionObserver" in window) {
        this.#M = new IntersectionObserver((t, s) => {
          t.some((e) => e.isIntersecting) && (s.disconnect(), this.#M = null, this.#it());
        }, { rootMargin: this.preloadMargin }), this.#M.observe(this.#e);
        return;
      }
      this.#it();
    }
  }
  #ws = (t) => {
    t.preventDefault();
  };
  #T() {
    this.#kt && (window.clearTimeout(this.#kt), this.#kt = 0);
  }
  #pi = () => {
    if (this.#kt = 0, !(this.#L || this.#h || this.#q)) {
      if (this.#o()) {
        this.#e.classList.remove("is-controls-visible");
        return;
      }
      this.#st || this.#e.classList.remove("is-pointer-active");
    }
  };
  #Bt(t = this.#o() ? this.#Os : this.#Dt) {
    this.#T(), this.#kt = window.setTimeout(this.#pi, t);
  }
  #B() {
    this.#o() && this.#Bt(this.#Os);
  }
  #A() {
    if (!this.#o()) return !1;
    const t = this.#e.classList.contains("is-controls-visible");
    return this.#e.classList.add("is-controls-visible"), this.#B(), !t;
  }
  #xs(t = !1) {
    !t && this.#o() || performance.now() < this.#ps || (this.#e.classList.contains("is-pointer-active") || (this.#hs = performance.now()), this.#e.classList.add("is-pointer-active"), this.#st ? this.#T() : this.#Bt(t ? this.#Dt : void 0));
  }
  #$t() {
    this.#st = !1, this.#hs = 0, this.#T(), this.#e.classList.remove("is-pointer-active");
  }
  #et(t) {
    return this.#o() ? !1 : typeof PointerEvent < "u" && t instanceof PointerEvent ? (this.#fs = t.pointerType === "touch" || t.pointerType === "pen", this.#fs ? !1 : (this.#$s = t.clientX, this.#Ys = t.clientY, !0)) : t instanceof MouseEvent ? this.#fs ? !1 : (this.#$s = t.clientX, this.#Ys = t.clientY, !0) : !1;
  }
  #ci(t, s) {
    if (t === null || s === null || t < 0 || s < 0 || t > window.innerWidth || s > window.innerHeight) return !1;
    const e = this.#e.getBoundingClientRect();
    return e.width <= 0 || e.height <= 0 ? !1 : t >= e.left && t <= e.right && s >= e.top && s <= e.bottom;
  }
  #fe(t, s, e) {
    if (!t) return !1;
    const i = t.getBoundingClientRect();
    return i.width <= 0 || i.height <= 0 ? !1 : s >= i.left && s <= i.right && e >= i.top && e <= i.bottom;
  }
  #be() {
    this.#P && (this.#P = !1, this.#e.classList.remove("is-progress-hovering"), this.#e.style.setProperty("--sp-hover-fill-inset", "100%"), this.#Ot(), this.#Nt());
  }
  #ve(t, s) {
    if (this.#o()) return;
    !this.#m() && this.#fe(this.#i, t, s) ? (this.#P = !0, this.#e.classList.add("is-progress-hovering"), this.#nt(t, !1, !1)) : this.#m() || this.#be();
    const e = this.#O.find((i) => !i.hidden && !this.#Zs(i) && this.#fe(i, t, s)) ?? null;
    e && this.#js(e);
  }
  #js(t, s = !1) {
    const e = t.dataset.spControlOffset || "0px", i = t.dataset.spControlWidth || "var(--sp-control-slot-size)";
    if (this.#C.style.setProperty("--sp-control-hover-width", i), s) {
      this.style.setProperty("--sp-touch-control-hover-offset", e);
      return;
    }
    this.#C.style.setProperty("--sp-control-hover-offset", e);
  }
  #bt() {
    return this.#e.classList.contains("is-controls-visible") || this.#e.classList.contains("is-pointer-active") || this.#r.activeElement instanceof HTMLElement;
  }
  #Yt() {
    return this.#o() && performance.now() < this.#Bs;
  }
  #Zs(t) {
    return t instanceof HTMLButtonElement && (t.disabled || t === this.#n && !this.#$());
  }
  #ui() {
    if (!this.#fs && this.#ci(this.#$s, this.#Ys)) {
      this.#xs(!0);
      return;
    }
    this.#$t();
  }
  #ks = (t) => {
    this.#et(t) && this.#xs(!0);
  };
  #Ps = (t) => {
    this.#et(t) && ((t instanceof PointerEvent || t instanceof MouseEvent) && this.#ve(t.clientX, t.clientY), this.#xs(!0));
  };
  #ye = (t) => {
    this.#et(t) && (this.#e.classList.remove("is-hover-disabled"), (t instanceof PointerEvent || t instanceof MouseEvent) && this.#ve(t.clientX, t.clientY), this.#ui());
  };
  #Ts = (t) => {
    this.#et(t) && (this.#ps = 0, this.#$t());
  };
  #j = (t) => {
    this.#et(t) && (this.#st = !0, this.#e.classList.add("is-pointer-active"), this.#T());
  };
  #Z = (t) => {
    this.#et(t) && (this.#st = !1, this.#Bt(this.#Dt));
  };
  #ge = (t) => {
    if (t?.target !== this.#e) {
      if (this.#o()) {
        this.#e.classList.add("is-controls-visible");
        return;
      }
      this.#e.classList.add("is-pointer-active"), this.#T();
    }
  };
  #di = () => {
    this.#o() || this.#Bt(this.#Dt);
  };
  #we = (t) => {
    const s = t.currentTarget;
    if (this.#Zs(s)) return;
    const e = s;
    this.#js(e);
  };
  #Ks() {
    this.#Vt && (window.clearTimeout(this.#Vt), this.#Vt = 0);
  }
  #xe = () => {
    this.#Vt = 0, this.#O.forEach((t) => t.classList.remove("is-control-tap-active")), this.style.removeProperty("--sp-touch-control-hover-offset"), this.#C.style.removeProperty("--sp-control-hover-width");
  };
  #mi = (t) => {
    if (!(t instanceof PointerEvent) || t.pointerType !== "touch") return;
    const s = t.currentTarget;
    !s || !this.#bt() || this.#Zs(s) || (this.#Ks(), this.#O.forEach((e) => e.classList.toggle("is-control-tap-active", e === s)), this.#js(s, !0), this.#Vt = window.setTimeout(this.#xe, 280));
  };
  #ke() {
    this.#Pt && (window.clearTimeout(this.#Pt), this.#Pt = 0);
  }
  #Es() {
    this.#ct && (window.clearTimeout(this.#ct), this.#ct = 0);
  }
  #Gs() {
    this.#ut && (window.clearTimeout(this.#ut), this.#ut = 0);
  }
  #Cs() {
    this.#us && (window.clearTimeout(this.#us), this.#us = 0);
  }
  #Pe() {
    this.#Mt && (window.clearTimeout(this.#Mt), this.#Mt = 0);
  }
  #Te() {
    this.#zt && (window.clearTimeout(this.#zt), this.#zt = 0);
  }
  #As() {
    this.#Te(), this.#e.classList.remove("is-playback-pulsing"), this.#z.offsetWidth, this.#e.classList.add("is-playback-pulsing"), this.#zt = window.setTimeout(() => {
      this.#zt = 0, this.#e.classList.remove("is-playback-pulsing");
    }, this.#ai);
  }
  #Ee() {
    if ("mediaSession" in navigator) {
      h.#ts = this;
      try {
        navigator.mediaSession.setActionHandler("play", this.#bi), navigator.mediaSession.setActionHandler("pause", this.#vi);
      } catch {
      }
      this.#vt();
    }
  }
  #fi() {
    if (!(!("mediaSession" in navigator) || h.#ts !== this)) {
      try {
        navigator.mediaSession.setActionHandler("play", null), navigator.mediaSession.setActionHandler("pause", null), navigator.mediaSession.playbackState = "none";
      } catch {
      }
      h.#ts = null;
    }
  }
  #vt() {
    if (!(!("mediaSession" in navigator) || h.#ts !== this))
      try {
        navigator.mediaSession.playbackState = this.#t.paused || this.#t.ended ? "paused" : "playing";
      } catch {
      }
  }
  #bi = () => {
    if (!this.#t.paused && !this.#t.ended) {
      this.#vt();
      return;
    }
    this.#As(), this.#Zt();
  };
  #vi = () => {
    if (this.#t.paused || this.#t.ended) {
      this.#vt();
      return;
    }
    this.#As(), this.#Zt();
  };
  #yi() {
    this.#Pe(), this.#e.classList.remove("is-volume-icon-animating"), this.#n.offsetWidth, this.#e.classList.add("is-volume-icon-animating"), this.#Mt = window.setTimeout(() => {
      this.#Mt = 0, this.#e.classList.remove("is-volume-icon-animating");
    }, 240);
  }
  #Ce = () => {
    if (this.#ut || this.#e.classList.contains("is-progress-settling")) {
      if (this.#Gs(), this.#Et) {
        this.#e.classList.remove("is-progress-settling");
        return;
      }
      this.#Et = !0, this.#pe = performance.now() + this.#si, this.#m() || this.#p(), this.#E(), this.#e.classList.remove("is-progress-settling"), this.#f();
    }
  };
  #gi() {
    this.#Et || this.#ut || (this.#e.classList.add("is-progress-settling"), this.#ot(0), this.#ut = window.setTimeout(this.#Ce, this.#ti));
  }
  async #it() {
    if (this.#V) return;
    const t = this.#t.dataset.src || this.src;
    t && (this.#Es(), this.#Cs(), this.#qs += 1, this.#V = !0, this.#I = !1, this.#D = !1, this.#J = !1, this.#Q = !1, this.#tt += 1, this.#e.classList.remove("has-visible-frame"), this.#ys(), this.#t.src = t, this.#t.preload = "auto", this.#t.load(), this.#t.autoplay && this.#t.muted && await this.#t.play().catch(() => {
    }));
  }
  #Ae() {
    return !this.#t.loop || this.#t.paused || !Number.isFinite(this.#t.duration) || this.#t.duration <= 0 ? !1 : this.#t.currentTime < 0.28 || this.#t.duration - this.#t.currentTime < 0.28;
  }
  #wi(t = this.#t.currentTime) {
    if (!Number.isFinite(t)) return 0;
    const s = Math.max(0, t);
    try {
      for (let e = 0; e < this.#t.buffered.length; e += 1) {
        const i = this.#t.buffered.start(e), r = this.#t.buffered.end(e);
        if (s + this.#bs >= i && s <= r + this.#bs)
          return Math.max(0, r - s);
      }
    } catch {
      return 0;
    }
    return 0;
  }
  #Se(t = this.#ri) {
    if (!this.#V || this.#t.error || !this.#e.classList.contains("has-loaded-once") || !Number.isFinite(this.#t.duration) || this.#t.duration <= 0) return !1;
    const s = Math.max(0, this.#t.duration - this.#t.currentTime), e = Math.min(t, s);
    return e <= this.#bs || this.#wi() + this.#bs >= e;
  }
  #Ut(t, s = !1) {
    this.#ke();
    const e = t && !this.#Ae() && !this.#Se(), r = t && !this.#D || e;
    if (this.#ds = r, !r) {
      this.#e.classList.remove("is-loading");
      return;
    }
    if (s) {
      this.#e.classList.add("is-loading");
      return;
    }
    this.#Pt = window.setTimeout(() => {
      if (this.#Pt = 0, !this.#D || !this.#Ae() && !this.#Se()) {
        this.#ds = !0, this.#e.classList.add("is-loading");
        return;
      }
      this.#ds = !1, this.#e.classList.remove("is-loading");
    }, this.#Qe);
  }
  #S = () => {
    if (this.#t.error) {
      this.#Ut(!0, !0);
      return;
    }
    this.#Ut(
      !this.#V || !this.#D || this.#t.readyState < HTMLMediaElement.HAVE_FUTURE_DATA
    );
  };
  #xi() {
    return this.#V && !this.#t.error && this.#I && (this.#t.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA || this.#t.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !this.#e.classList.contains("is-loading"));
  }
  #m() {
    return this.#L || this.#h || this.#X;
  }
  #ki() {
    this.#qs >= this.#ii || this.#ct || (this.#ct = window.setTimeout(() => {
      this.#ct = 0, this.#Cs(), this.#V = !1, this.#I = !1, this.#D = !1, this.#J = !1, this.#Q = !1, this.#tt += 1, this.#e.classList.remove("has-visible-frame"), this.#e.classList.contains("has-loaded-once") || this.#ot(0), this.#t.removeAttribute("src"), this.#t.load(), this.#it();
    }, this.#ei));
  }
  #Le() {
    return this.#X ? (this.#X = !1, this.#xt = !1, this.#p(), this.#E(), !0) : !1;
  }
  #Fe() {
    return this.#Es(), !this.#e.classList.contains("has-loaded-once") && this.#gi(), this.#e.classList.add("has-loaded-once"), this.#e.classList.add("has-visible-frame"), this.#S(), this.#k = null, this.#X ? (this.#Le(), !0) : (this.#m() || this.#p(), this.#E(), !0);
  }
  #Pi() {
    if (this.#I || this.#J || this.#t.error) return;
    this.#J = !0;
    const t = this.#tt, s = () => {
      if (t === this.#tt) {
        if (this.#Cs(), this.#J = !1, this.#I = !this.#t.error && this.#t.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && this.#t.videoWidth > 0 && this.#t.videoHeight > 0, this.#I) {
          if (this.#Q || this.#D) return;
          this.#Q = !0, window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              t === this.#tt && (this.#Q = !1, this.#D = !0, this.#Fe(), this.#f());
            });
          }), this.#f();
          return;
        }
        this.#S();
      }
    };
    if ("requestVideoFrameCallback" in this.#t) {
      this.#t.requestVideoFrameCallback(s), this.#us = window.setTimeout(s, 180);
      return;
    }
    window.requestAnimationFrame(s);
  }
  #Ss = () => {
    if (this.#t.error || this.#t.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || this.#t.videoWidth <= 0 || this.#t.videoHeight <= 0)
      return this.#S(), !1;
    if (!this.#I)
      return this.#Pi(), this.#S(), !1;
    const t = this.#Fe();
    return this.#g(), t;
  };
  #Me() {
    return !this.#t.paused && (!this.#t.ended || this.#t.loop) && this.#t.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
  }
  #p(t = this.#t.currentTime) {
    this.#ce = Number.isFinite(t) ? Math.max(0, t) : 0, this.#ue = performance.now();
  }
  #K() {
    this.#F = null, this.#dt = null;
  }
  #Ve() {
    if (!Number.isFinite(this.#t.duration) || this.#t.duration <= 0) {
      this.#F = null;
      return;
    }
    const t = Number.isFinite(this.#t.currentTime) ? Math.max(0, this.#t.currentTime) : 0, s = Number.isFinite(this.#Ct) ? this.#Ct : t;
    this.#F = Math.min(this.#t.duration, Math.max(t, s)), this.#p(this.#F);
  }
  #Ti() {
    if (!Number.isFinite(this.#t.duration) || this.#t.duration <= 0) {
      this.#dt = null, this.#Ve();
      return;
    }
    const t = this.#e.style.getPropertyValue("--sp-progress-inset"), s = Number.parseFloat(t), e = Number.isFinite(s) ? Math.min(1, Math.max(0, 1 - s / 100)) : null, i = this.#rt(), r = Math.min(1, Math.max(0, i / this.#t.duration)), n = Math.max(e ?? 0, r);
    this.#dt = n, this.#F = n * this.#t.duration, this.#p(this.#F), this.#ot(n), this.#i.setAttribute("aria-valuenow", `${this.#F}`), this.#i.setAttribute(
      "aria-valuetext",
      `${l(this.#F)} of ${l(this.#t.duration)}`
    );
  }
  #rt() {
    if (!Number.isFinite(this.#t.duration) || this.#t.duration <= 0) return this.#t.currentTime || 0;
    if (this.#m()) return this.#x;
    if (this.#F !== null) return this.#F;
    if (!this.#Me()) return this.#t.currentTime || 0;
    if (this.#ds || !this.#Et || performance.now() < this.#pe)
      return this.#p(), this.#t.currentTime || 0;
    if (this.#e.classList.contains("is-loading") && this.#t.readyState < HTMLMediaElement.HAVE_FUTURE_DATA)
      return this.#p(), this.#t.currentTime || 0;
    const t = (performance.now() - this.#ue) / 1e3, s = this.#ce + t, e = this.#t.loop ? s % this.#t.duration : Math.min(s, this.#t.duration);
    return !this.#t.loop && this.#t.currentTime - e > 0.45 ? (this.#p(), this.#t.currentTime) : e;
  }
  #ot(t) {
    const s = Math.min(1, Math.max(0, t)), e = (1 - s) * 100, { innerWidth: i } = this.#Ci(), r = 1 / i, n = this.#h && this.#ns && this.#pt + r < s;
    if (this.#e.style.setProperty("--sp-progress-inset", `${e}%`), this.#e.style.setProperty("--sp-return-marker-base-opacity", n ? "0" : "1"), n) {
      const a = this.#Ls(this.#pt), p = Math.max(0, i - 2), m = Math.min(p, Math.max(0, a - 3));
      this.#e.style.setProperty("--sp-return-marker-hole-left", `${m}px`);
    } else
      this.#e.style.setProperty("--sp-return-marker-hole-left", "-9999px");
  }
  #Ei(t) {
    return !Number.isFinite(this.#t.duration) || this.#t.duration <= 0 ? 0 : Math.min(1, Math.max(0, t / this.#t.duration));
  }
  #Ci(t = this.#i.getBoundingClientRect()) {
    return c(t);
  }
  #Ls(t, s = this.#i.getBoundingClientRect()) {
    return E(t, s);
  }
  #Ai(t, s) {
    return C(t, s);
  }
  #Si(t) {
    this.#os = Number.isFinite(t) ? Math.max(0, t) : 0, this.#pt = this.#Ei(this.#os);
    const s = this.#i.getBoundingClientRect(), e = this.#Ls(this.#pt, s), i = e >= this.#Ns && e <= Math.max(this.#Ns, s.width - this.#Ns);
    this.#ns = this.#os > this.#Ge && i, this.#e.classList.toggle("has-return-marker", this.#ns), this.#e.style.setProperty("--sp-return-marker-left", `${e}px`);
  }
  #Li(t, s, e, i = this.#h) {
    const r = e * this.#t.duration;
    if (!i || !this.#ns)
      return { percent: e, targetTime: r };
    const n = s.left + this.#Ls(this.#pt, s);
    return Math.abs(t - n) <= this.#Ke ? {
      percent: this.#pt,
      targetTime: this.#os
    } : { percent: e, targetTime: r };
  }
  #Nt(t = this.#rt()) {
    !this.#qt || this.#P || this.#m() || (this.#c.textContent = this.#se(t), this.#gs());
  }
  #E(t = this.#rt()) {
    const s = Number.isFinite(this.#t.duration) && this.#t.duration > 0;
    if (s && this.#dt !== null) {
      const r = this.#dt * this.#t.duration;
      this.#Ct = r, this.#ot(this.#dt), this.#i.setAttribute("aria-valuemin", "0"), this.#i.setAttribute("aria-valuemax", `${this.#t.duration}`), this.#i.setAttribute("aria-valuenow", `${r}`), this.#i.setAttribute(
        "aria-valuetext",
        `${l(r)} of ${l(this.#t.duration)}`
      ), this.#Nt(r);
      return;
    }
    const e = s ? Math.min(this.#t.duration, Math.max(0, t)) : t, i = s ? e / this.#t.duration : 0;
    this.#Ct = Number.isFinite(e) ? Math.max(0, e) : 0, this.#ot(i), this.#i.setAttribute("aria-valuemin", "0"), this.#i.setAttribute("aria-valuemax", s ? `${this.#t.duration}` : "0"), this.#i.setAttribute("aria-valuenow", s ? `${e}` : "0"), this.#i.setAttribute(
      "aria-valuetext",
      s ? `${l(e)} of ${l(this.#t.duration)}` : "Loading video"
    ), this.#Nt(e);
  }
  #nt(t, s = this.#h, e = !0) {
    if (!Number.isFinite(this.#t.duration) || this.#t.duration <= 0) return this.#t.currentTime;
    const i = this.#i.getBoundingClientRect(), r = this.#Ai(t, i), n = this.#Li(t, i, r, s);
    return this.#e.style.setProperty("--sp-hover-fill-inset", `${(1 - r) * 100}%`), e && this.#ot(n.percent), this.#qt || this.#e.style.setProperty("--sp-scrub-preview-left", `${this.#Ls(n.percent, i)}px`), this.#le.textContent = l(n.targetTime), this.#c.textContent = this.#se(n.targetTime), this.#gs(), e && (this.#i.setAttribute("aria-valuenow", `${n.targetTime}`), this.#i.setAttribute(
      "aria-valuetext",
      `${l(n.targetTime)} of ${l(this.#t.duration)}`
    )), this.#Fi(), n.targetTime;
  }
  #Ot() {
    this.#ms = !1, this.#e?.classList.remove("has-controls-collision");
  }
  #Fi() {
    if (!this.#h && !this.#P || !this.#U || !this.#Ds || this.#qt) {
      this.#Ot();
      return;
    }
    const t = this.#U.getBoundingClientRect(), s = this.#Ds.getBoundingClientRect(), e = t.width > 0 && t.height > 0, i = this.#ms ? this.#ni : this.#oi, r = e && s.right >= t.left - i && s.left <= t.right + i && s.bottom >= t.top - i && s.top <= t.bottom + i;
    this.#ms = r, this.#e.classList.toggle("has-controls-collision", this.#ms);
  }
  #Xt() {
    this.#wt && (window.cancelAnimationFrame(this.#wt), this.#wt = 0);
  }
  #Mi() {
    this.#Xt(), this.#p();
    const t = () => {
      this.#E(this.#rt()), this.#Me() && (this.#wt = window.requestAnimationFrame(t));
    };
    this.#wt = window.requestAnimationFrame(t);
  }
  #f() {
    const t = !this.#t.paused && (!this.#t.ended || this.#t.loop) || this.#h && this.#ht, s = this.#k ? this.#k === "playing" : t;
    if (this.#e.classList.toggle("is-playing", s), this.#z.setAttribute("aria-label", s ? "Pause video" : "Play video"), this.#h) {
      this.#Xt();
      return;
    }
    t && this.#e.classList.contains("has-loaded-once") && !this.#e.classList.contains("is-progress-settling") ? this.#Mi() : (this.#Xt(), this.#E());
  }
  #yt() {
    this.#as && (window.clearTimeout(this.#as), this.#as = 0);
  }
  #Vi() {
    return P(this.#t);
  }
  #$() {
    return this.volumeEnabled && this.#H && this.#mt;
  }
  #Y() {
    this.#Kt(), this.#Fs(this.#l), this.#q = !1, this.#W = !1, this.#l = null, this.#R.classList.remove("is-volume-open"), this.#n.classList.remove("is-control-tap-active"), this.#n.setAttribute("aria-expanded", "false"), this.#y.classList.remove("is-scrubbing-volume"), this.#y.setAttribute("inert", "");
  }
  #zi = () => {
    this.#H = !0, this.#mt = !0, this.#Ht(), this.#g();
  };
  #g = () => {
    if (!this.volumeEnabled) {
      this.#e.classList.remove("is-volume-unavailable", "is-volume-muted", "is-volume-sound", "is-volume-icon-animating"), this.#Y(), this.#n.disabled = !0, this.#n.setAttribute("aria-disabled", "true");
      return;
    }
    const t = this.#H;
    if (!this.#H) {
      const a = this.#Vi();
      a !== "unknown" ? (this.#H = !0, this.#mt = a === "available") : this.#t.readyState >= HTMLMediaElement.HAVE_METADATA && !T(this.#t) && (this.#H = !0, this.#mt = !0);
    }
    !t && this.#H && this.#Ht();
    const s = this.#$(), e = !s || this.#t.muted || this.#t.volume <= 0, i = s && !this.#t.muted ? this.#t.volume : 0, r = Math.round(i * 100), n = e ? "muted" : "sound";
    this.#Us && this.#Us !== n && this.#yi(), this.#Us = n, this.#e.classList.toggle("is-volume-unavailable", !s), this.#e.classList.toggle("is-volume-muted", e), this.#e.classList.toggle("is-volume-sound", !e), this.#e.style.setProperty("--sp-volume-level", `${r}%`), this.#n.disabled = !s, this.#n.setAttribute("aria-disabled", `${!s}`), this.#n.setAttribute(
      "aria-label",
      s ? e ? "Unmute video" : "Mute video" : "Video has no audio"
    ), this.#b.setAttribute("aria-valuenow", `${r}`), this.#b.setAttribute("aria-valuetext", `${r}%`), s || this.#Y();
  };
  #ze(t) {
    if (!this.#$()) return;
    const s = this.#b.getBoundingClientRect(), e = Math.min(1, Math.max(0, 1 - (t - s.top) / s.height)), i = Math.round(e * 100) / 100;
    this.#t.volume = i, this.#t.muted = i <= 0, this.#g();
  }
  #Fs(t) {
    t !== null && this.#b.hasPointerCapture(t) && this.#b.releasePointerCapture(t);
  }
  #Wt(t) {
    this.#q = !1, this.#l = null, this.#y.classList.remove("is-scrubbing-volume"), this.#b.blur(), this.#Fs(t), this.#ie(260);
  }
  #_t = () => {
    const t = document.pictureInPictureElement === this.#t, s = this.#t, e = !!(this.pictureInPictureEnabled && document.pictureInPictureEnabled && s.requestPictureInPicture);
    this.#e.classList.toggle("is-picture-in-picture", t), this.#at.disabled = !e, this.#at.setAttribute("aria-label", t ? "Exit picture in picture" : "Enter picture in picture");
  };
  #Js() {
    return v(this.#r);
  }
  #Re() {
    return y(this.fullscreenEnabled, this.#e, this.#t);
  }
  #Ri() {
    return g(this.#e);
  }
  #Ii() {
    x(this.#t);
  }
  #Di() {
    return k();
  }
  #Ms = () => {
    const t = this.#Js(), s = t === this.#e || t === this, e = this.#Re();
    return this.#e.classList.toggle("is-fullscreen", s), this.#lt.disabled = !e, this.#lt.setAttribute("aria-label", s ? "Exit fullscreen" : "Enter fullscreen"), s;
  };
  #jt = () => {
    const t = this.#Ms();
    this.#Hi(t);
  };
  #Hi(t) {
    this.#T(), this.#Kt(), this.#Jt(), this.#Qs(this.#d), this.#Fs(this.#l), this.#ne(this.#u), this.#yt(), this.#L = !1, this.#h = !1, this.#P = !1, this.#e.classList.remove("is-progress-hovering"), this.#d = null, this.#st = !1, this.#W = !1, this.#q = !1, this.#ft = !1, this.#_ = !1, this.#l = null, this.#u = null, this.#Ks(), this.#xe(), this.#C.style.removeProperty("--sp-control-hover-offset"), this.#C.style.removeProperty("--sp-control-hover-width"), this.#R.classList.remove("is-volume-open"), this.#n.setAttribute("aria-expanded", "false"), this.#y.setAttribute("inert", ""), this.#G(), this.#y.classList.remove("is-scrubbing-volume"), this.#e.classList.remove("is-scrubbing"), this.#e.classList.remove("is-pointer-active"), this.#e.classList.add("is-hover-disabled");
    const s = this.#r.activeElement;
    s instanceof HTMLElement && s.blur(), t ? (this.#o() ? this.#A() : this.#xs(!0), this.#Bt(this.#o() ? this.#Os : this.#Dt)) : this.#$t();
  }
  #Ie = () => {
    !this.#L || this.#h || (this.#K(), this.#T(), this.#yt(), this.#h = !0, this.#e.classList.add("is-scrubbing"), this.#x = this.#nt(this.#Hs, !0), this.#ht && this.#t.pause(), this.#t.currentTime = this.#x, this.#p(this.#x), this.#E(this.#x), this.#Xt(), this.#f());
  };
  #Qs(t) {
    t !== null && this.#i.hasPointerCapture(t) && this.#i.releasePointerCapture(t);
  }
  async #De(t, s, e) {
    if (!this.#L && !this.#h) return;
    const i = this.#h;
    this.#yt(), this.#L = !1, this.#h = !1, this.#P = !1, this.#e.classList.remove("is-progress-hovering"), this.#e.style.setProperty("--sp-hover-fill-inset", "100%"), this.#d = null, this.#e.classList.remove("is-scrubbing"), this.#Ot(), this.#Qs(s), e && t !== null && (this.#K(), this.#x = this.#nt(t, i), this.#X = !0, this.#xt = this.#ht, this.#t.currentTime = this.#x, this.#p(this.#x)), this.#E(this.#x), i && this.#ht && await this.#t.play(), this.#B();
  }
  #te(t) {
    !this.#L && !this.#h || (this.#yt(), this.#L = !1, this.#h = !1, this.#P = !1, this.#e.classList.remove("is-progress-hovering"), this.#e.style.setProperty("--sp-hover-fill-inset", "100%"), this.#d = null, this.#e.classList.remove("is-scrubbing"), this.#Ot(), this.#Qs(t), this.#p(), this.#E(), this.#ht && this.#t.play(), this.#B());
  }
  #se(t) {
    if (!this.#Rt) return l(t);
    const s = Number.isFinite(this.#t.duration) ? this.#t.duration : 0;
    return s <= 0 ? l(t) : `-${l(Math.max(0, s - t))}`;
  }
  #qi() {
    this.#It && (window.clearTimeout(this.#It), this.#It = 0);
  }
  #Bi() {
    this.#qi(), this.#c.classList.remove("is-time-animating"), this.#c.offsetWidth, this.#c.classList.add("is-time-animating"), this.#It = window.setTimeout(() => {
      this.#It = 0, this.#c.classList.remove("is-time-animating");
    }, 240);
  }
  #$i = (t) => {
    t.stopPropagation(), this.#Rt = !this.#Rt, this.#c.setAttribute("aria-pressed", `${this.#Rt}`), this.#c.setAttribute(
      "aria-label",
      this.#Rt ? "Show elapsed time" : "Show remaining time"
    ), this.#Bi(), this.#m() || this.#P ? this.#c && (this.#c.textContent = this.#se(this.#x), this.#gs()) : this.#Nt(this.#rt());
  };
  #Zt = async () => {
    if (performance.now() < this.#he)
      return;
    this.#Ee();
    const t = this.#k ? this.#k !== "playing" : this.#t.paused || this.#t.ended, s = !t || this.#xi();
    this.#A(), s && (this.#k = t ? "playing" : "paused", this.#f()), t ? (this.#K(), await this.#it(), await this.#t.play().catch(() => {
      this.#k = null;
    })) : (this.#Ti(), this.#t.pause()), this.#f(), this.#B();
  };
  #Yi = (t) => {
    this.#Tt = t instanceof PointerEvent && t.pointerType === "mouse" && t.button === 0 && this.pauseOnOverlayClick && !this.#o(), this.#ls = this.#Tt && (!this.#e.classList.contains("is-pointer-active") || performance.now() - this.#hs < this.#de);
  };
  #Vs = () => {
    this.#Tt = !1, this.#ls = !1;
  };
  #Ui = (t) => {
    const s = this.#ls, e = t instanceof PointerEvent && t.pointerType === "mouse" && t.button === 0 && this.#Tt;
    this.#Vs(), e && (s && (this.#ps = performance.now() + this.#de, this.#$t()), this.#As(), this.#Zt());
  };
  #Ni = (t) => {
    if (!(t instanceof KeyboardEvent) || t.target !== this.#e || t.repeat) return;
    const s = t.key.toLowerCase(), e = s === " " || s === "spacebar" || s === "enter" || s === "k" || s === "mediaplaypause", i = s === "mediaplay", r = s === "mediapause";
    !e && !i && !r || (t.preventDefault(), t.stopPropagation(), !(i && !this.#t.paused && !this.#t.ended) && (r && (this.#t.paused || this.#t.ended) || (this.#As(), this.#Zt())));
  };
  #Oi = (t) => {
    if (!(t instanceof PointerEvent)) return;
    const s = this.#z.getBoundingClientRect(), e = t.clientX >= s.left && t.clientX <= s.right && t.clientY >= s.top && t.clientY <= s.bottom, i = this.#U.getBoundingClientRect(), r = t.clientX >= i.left && t.clientX <= i.right && t.clientY >= i.top && t.clientY <= i.bottom, n = this.#i.getBoundingClientRect(), a = t.clientX >= n.left && t.clientX <= n.right && t.clientY >= n.top && t.clientY <= n.bottom, p = this.#A();
    p && e && (this.#he = performance.now() + 260), p && (r || a) && (this.#Bs = performance.now() + 260), this.#it();
  };
  #Xi = (t) => {
    t.stopPropagation();
  };
  #Kt() {
    this.#At && (window.clearTimeout(this.#At), this.#At = 0);
  }
  #ee() {
    if (!this.#$() || !this.volumeSliderEnabled) {
      this.#Y();
      return;
    }
    this.#G(), this.#Kt(), this.#R.classList.add("is-volume-open"), this.#n.setAttribute("aria-expanded", "true"), this.#y.removeAttribute("inert");
  }
  #Gt = () => {
    this.#At = 0, !(this.#W || this.#q) && (this.#R.classList.remove("is-volume-open"), this.#n.setAttribute("aria-expanded", "false"), this.#y.setAttribute("inert", ""));
  };
  #Wi = () => {
    this.#ee();
  };
  #_i = (t) => {
    const s = t instanceof FocusEvent ? t.relatedTarget : null;
    s instanceof Node && this.#R.contains(s) || this.#ie(0);
  };
  #ie(t = 150) {
    this.#Kt(), this.#At = window.setTimeout(this.#Gt, t);
  }
  #He = () => {
    if (!this.#o()) {
      if (!this.#$() || !this.volumeSliderEnabled) {
        this.#Y();
        return;
      }
      this.#W = !0, this.#ee();
    }
  };
  #qe = () => {
    if (!this.#o()) {
      if (!this.#$() || !this.volumeSliderEnabled) {
        this.#Y();
        return;
      }
      this.#W = !1, this.#ie();
    }
  };
  #ji = (t) => {
    if (t.preventDefault(), t.stopPropagation(), !this.#$()) {
      this.#Y();
      return;
    }
    !this.#bt() || this.#Yt() || (this.#A(), this.#Gt(), this.#t.muted || this.#t.volume <= 0 ? (this.#t.volume <= 0 && (this.#t.volume = 0.7), this.#t.muted = !1) : this.#t.muted = !0, this.#g(), this.#B());
  };
  #Zi = (t) => {
    if (t instanceof PointerEvent) {
      if (t.preventDefault(), t.stopPropagation(), !this.#$() || !this.volumeSliderEnabled || this.#o()) {
        this.#Y();
        return;
      }
      this.#A(), this.#T(), this.#ee(), this.#q = !0, this.#l = t.pointerId, this.#y.classList.add("is-scrubbing-volume"), this.#b.setPointerCapture(t.pointerId), this.#ze(t.clientY);
    }
  };
  #Ki = (t) => {
    t instanceof PointerEvent && this.#q && (this.#l !== null && t.pointerId !== this.#l || (t.preventDefault(), t.stopPropagation(), this.#ze(t.clientY)));
  };
  #Gi = (t) => {
    t instanceof PointerEvent && (this.#l !== null && t.pointerId !== this.#l || (t.stopPropagation(), this.#Wt(t.pointerId), this.#B()));
  };
  #Ji = (t) => {
    t instanceof PointerEvent && (this.#l !== null && t.pointerId !== this.#l || (t.stopPropagation(), this.#Wt(t.pointerId)));
  };
  #Be = (t) => {
    if (!(t instanceof KeyboardEvent)) return;
    if (t.key === "Escape") {
      t.preventDefault(), t.stopPropagation(), this.#W = !1, this.#n.focus(), this.#Gt();
      return;
    }
    if (!this.#$()) {
      t.preventDefault(), t.stopPropagation(), this.#Y();
      return;
    }
    if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(t.key)) return;
    t.preventDefault(), t.stopPropagation();
    const s = t.shiftKey ? 0.1 : 0.05, e = t.key === "Home" ? 0 : t.key === "End" ? 1 : this.#t.volume + (t.key === "ArrowUp" ? s : -s);
    this.#t.volume = Math.min(1, Math.max(0, e)), this.#t.muted = this.#t.volume <= 0, this.#g();
  };
  #Qi(t) {
    return `${Number(t.toFixed(2))}x`;
  }
  #re = () => {
    if (!this.#t || !this.#a) return;
    const t = Number.isFinite(this.#t.playbackRate) ? Math.min(4, Math.max(0.25, this.#t.playbackRate)) : 1, s = this.#Qi(t), e = t >= 1 ? 50 + (t - 1) / 3 * 50 : (t - 0.25) / 0.75 * 50, i = this.#N.textContent;
    this.#N.textContent = s, i && i !== s && (this.#_ || this.#a.classList.contains("is-speed-open")) && this.#tr(), this.#a.setAttribute("aria-label", `Playback speed: ${s}`), this.#v.setAttribute("aria-valuenow", `${t}`), this.#v.setAttribute("aria-valuetext", s), this.#e.style.setProperty("--sp-speed-position", `${e}%`);
  };
  #$e(t) {
    const s = Math.round(Math.min(4, Math.max(0.25, t)) * 20) / 20;
    this.#t.playbackRate = s, this.#re(), this.#Ue(), this.#Ne();
  }
  #zs(t) {
    const s = this.#v.getBoundingClientRect(), e = Math.min(1, Math.max(0, 1 - (t - s.top) / s.height)), i = e >= 0.5 ? 1 + (e - 0.5) / 0.5 * 3 : 0.25 + e / 0.5 * 0.75;
    this.#$e(i);
  }
  #Jt() {
    this.#St && (window.clearTimeout(this.#St), this.#St = 0);
  }
  #Rs() {
    this.#Lt && (window.clearTimeout(this.#Lt), this.#Lt = 0);
  }
  #Ye() {
    this.#Ft && (window.clearTimeout(this.#Ft), this.#Ft = 0);
  }
  #tr() {
    this.#N.classList.contains("is-speed-value-animating") || (this.#N.classList.add("is-speed-value-animating"), this.#Ft = window.setTimeout(() => {
      this.#Ft = 0, this.#N.classList.remove("is-speed-value-animating");
    }, 180));
  }
  #Ue() {
    this.#Rs(), this.#w.classList.add("is-speed-value-visible");
  }
  #Ne(t = 700) {
    this.#Rs(), this.#Lt = window.setTimeout(() => {
      this.#Lt = 0, !this.#_ && this.#w.classList.remove("is-speed-value-visible");
    }, t);
  }
  #Is() {
    this.speedEnabled && (this.#Jt(), this.#a.classList.add("is-speed-open"), this.#a.setAttribute("aria-expanded", "true"), this.#w.removeAttribute("inert"), this.#T());
  }
  #G = () => {
    this.#a && (this.#Jt(), this.#Rs(), this.#Ye(), this.#a.classList.remove("is-speed-open"), this.#a.setAttribute("aria-expanded", "false"), this.#w.classList.remove("is-scrubbing-speed"), this.#w.classList.remove("is-speed-value-visible"), this.#N.classList.remove("is-speed-value-animating"), this.#w?.setAttribute("inert", ""));
  };
  #oe(t = 150) {
    this.#Jt(), this.#St = window.setTimeout(() => {
      this.#St = 0, !(this.#ft || this.#_) && this.#G();
    }, t);
  }
  #Oe = () => {
    this.#o() || (this.#ft = !0, this.#Is());
  };
  #Xe = () => {
    this.#o() || (this.#ft = !1, this.#oe());
  };
  #sr = () => {
    this.#Is();
  };
  #er = (t) => {
    const s = t instanceof FocusEvent ? t.relatedTarget : null;
    s instanceof Node && this.#rs.contains(s) || this.#oe(0);
  };
  #ir = (t) => {
    if (t.preventDefault(), t.stopPropagation(), !this.speedEnabled || !this.#bt() || this.#Yt()) return;
    this.#A();
    const s = !this.#a.classList.contains("is-speed-open");
    this.#Gt(), this.#o() && !s ? this.#G() : this.#Is();
  };
  #rr = (t) => {
    t.stopPropagation();
  };
  #ne(t) {
    t !== null && this.#v.hasPointerCapture(t) && this.#v.releasePointerCapture(t);
  }
  #Qt(t) {
    this.#_ = !1, this.#u = null, this.#w.classList.remove("is-scrubbing-speed"), this.#Ue(), this.#Ne(), this.#v.blur(), this.#ne(t), this.#oe(850), this.#B();
  }
  #or = (t) => {
    t instanceof PointerEvent && (t.preventDefault(), t.stopPropagation(), this.speedEnabled && (this.#A(), this.#T(), this.#Is(), this.#_ = !0, this.#u = t.pointerId, this.#w.classList.add("is-scrubbing-speed"), this.#v.setPointerCapture(t.pointerId), this.#zs(t.clientY)));
  };
  #nr = (t) => {
    !(t instanceof PointerEvent) || !this.#_ || this.#u !== null && t.pointerId !== this.#u || (t.preventDefault(), t.stopPropagation(), this.#zs(t.clientY));
  };
  #ar = (t) => {
    t instanceof PointerEvent && (this.#u !== null && t.pointerId !== this.#u || (t.stopPropagation(), this.#zs(t.clientY), this.#Qt(t.pointerId)));
  };
  #lr = (t) => {
    t instanceof PointerEvent && (this.#u !== null && t.pointerId !== this.#u || (t.stopPropagation(), this.#Qt(t.pointerId)));
  };
  #We = (t) => {
    if (!(t instanceof KeyboardEvent)) return;
    if (t.key === "Escape") {
      t.preventDefault(), t.stopPropagation(), this.#ft = !1, this.#a.focus(), this.#G();
      return;
    }
    if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(t.key)) return;
    t.preventDefault(), t.stopPropagation();
    const s = t.shiftKey ? 0.25 : 0.05, e = t.key === "Home" ? 0.25 : t.key === "End" ? 4 : this.#t.playbackRate + (t.key === "ArrowUp" ? s : -s);
    this.#$e(e);
  };
  #hr = (t) => {
    if (!this.#a?.classList.contains("is-speed-open")) return;
    const s = t.composedPath();
    s.includes(this.#a) || s.includes(this.#w) || this.#G();
  };
  #pr = async () => {
    const t = this.#t;
    if (!(!this.pictureInPictureEnabled || !document.pictureInPictureEnabled || !t.requestPictureInPicture) && !(!this.#bt() || this.#Yt())) {
      this.#A();
      try {
        await this.#it(), document.pictureInPictureElement === this.#t ? await document.exitPictureInPicture() : await t.requestPictureInPicture();
      } catch {
      } finally {
        this.#_t(), this.#B();
      }
    }
  };
  #cr = async (t) => {
    if (this.#Re() && (t.preventDefault(), t.stopPropagation(), !(!this.#bt() || this.#Yt()))) {
      this.#et(t), this.#A();
      try {
        const s = this.#Js();
        s === this.#e || s === this ? await this.#Di() : (await this.#it(), w(this.#e) ? await this.#Ri() : this.#Ii());
      } catch {
      } finally {
        this.#Ms(), this.#B();
      }
    }
  };
  #_e = (t) => {
    this.#o() || this.#m() || !(t instanceof PointerEvent) && !(t instanceof MouseEvent) || (this.#P = !0, this.#e.classList.add("is-progress-hovering"), this.#nt(t.clientX, !1, !1));
  };
  #je = () => {
    this.#m() || this.#be();
  };
  #ur = (t) => {
    if (t instanceof PointerEvent) {
      if (t.preventDefault(), !this.#bt() || this.#Yt()) {
        this.#A(), this.#o() && (this.#Bs = performance.now() + 260);
        return;
      }
      this.#A(), this.#T(), this.#Ce(), this.#X = !1, this.#xt = !1, this.#Si(this.#rt()), this.#L = !0, this.#d = t.pointerId, this.#Hs = t.clientX, this.#ht = !this.#t.paused && !this.#t.ended, this.#i.setPointerCapture(t.pointerId), this.#x = this.#nt(t.clientX, !1), this.#yt(), this.#as = window.setTimeout(this.#Ie, this.#Je);
    }
  };
  #dr = (t) => {
    if (!(t instanceof KeyboardEvent) || !Number.isFinite(this.#t.duration) || this.#t.duration <= 0 || !["ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"].includes(t.key)) return;
    t.preventDefault(), t.stopPropagation(), this.#ge();
    const s = this.#rt(), e = t.shiftKey ? 10 : 5, i = Math.max(10, this.#t.duration * 0.1), r = t.key === "Home" ? 0 : t.key === "End" ? this.#t.duration : t.key === "PageUp" ? s + i : t.key === "PageDown" ? s - i : s + (t.key === "ArrowRight" ? e : -e);
    this.#t.currentTime = Math.min(this.#t.duration, Math.max(0, r)), this.#p(this.#t.currentTime), this.#E(this.#t.currentTime);
  };
  #mr = (t) => {
    if (t instanceof PointerEvent) {
      if (!this.#L) {
        this.#o() || (this.#P = !0, this.#e.classList.add("is-progress-hovering"), this.#nt(t.clientX, !1, !1));
        return;
      }
      this.#d !== null && t.pointerId !== this.#d || (!this.#h && Math.abs(t.clientX - this.#Hs) >= this.#Ze && this.#Ie(), this.#h && (this.#x = this.#nt(t.clientX)));
    }
  };
  #fr = (t) => {
    t instanceof PointerEvent && (this.#d !== null && t.pointerId !== this.#d || this.#De(t.clientX, t.pointerId, !0));
  };
  #br = (t) => {
    t instanceof PointerEvent && (this.#d !== null && t.pointerId !== this.#d || this.#te(t.pointerId));
  };
  #vr = (t) => {
    if (t instanceof PointerEvent) {
      if (this.#Vs(), this.#l !== null && t.pointerId === this.#l) {
        this.#Wt(t.pointerId);
        return;
      }
      if (this.#u !== null && t.pointerId === this.#u) {
        this.#zs(t.clientY), this.#Qt(t.pointerId);
        return;
      }
      this.#d === null || t.pointerId !== this.#d || this.#De(t.clientX, t.pointerId, !0);
    }
  };
  #yr = (t) => {
    if (t instanceof PointerEvent) {
      if (this.#Vs(), this.#l !== null && t.pointerId === this.#l) {
        this.#Wt(t.pointerId);
        return;
      }
      if (this.#u !== null && t.pointerId === this.#u) {
        this.#Qt(t.pointerId);
        return;
      }
      this.#d === null || t.pointerId !== this.#d || this.#te(t.pointerId);
    }
  };
  #gr = () => {
    this.#Wt(this.#l), this.#Qt(this.#u), this.#te(this.#d);
  };
  #wr = () => {
    this.#Js() || this.#$t();
  };
  #xr = () => {
    this.#Ee(), this.#k = null, this.#K(), this.#m() || this.#p(), this.#f(), this.#vt();
  };
  #kr = () => {
    this.#k = null, this.#m() || this.#Ve(), this.#S(), this.#f(), this.#vt();
  };
  #Pr = () => {
    this.#k = null, this.#K(), this.#m() || this.#p(), this.#f(), this.#vt();
  };
  #Tr = () => {
    this.#Ut(!0, !0);
  };
  #ae = () => {
    this.#Ut(!0);
  };
  #Er = () => {
    this.#K(), this.#g(), this.#m() || this.#p(), this.#S(), this.#E();
  };
  #Cr = () => {
    const t = this.#Ss();
    this.#g(), t && !this.#m() && this.#p(), this.#f();
  };
  #Ar = () => {
    if (this.#K(), this.#S(), this.#X && (!this.#xt || this.#t.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA)) {
      this.#Le(), this.#f();
      return;
    }
    this.#m() || this.#p(), this.#E();
  };
  #Sr = () => {
    this.#k = null, this.#I = !1, this.#D = !1, this.#J = !1, this.#Q = !1, this.#tt += 1, this.#e.classList.remove("has-visible-frame"), this.#Ut(!0, !0), this.#f(), this.#ki();
  };
  #Lr = () => {
    this.#g(), this.#E();
  };
  #Fr = () => {
    this.#g();
  };
  #o() {
    return window.matchMedia("(max-width: 768px)").matches && window.matchMedia("(hover: none), (pointer: coarse)").matches;
  }
  #Mr() {
    this.#t && (this.#M?.disconnect(), this.#M = null, this.#Es(), this.#Gs(), this.#V = !1, this.#qs = 0, this.#I = !1, this.#D = !1, this.#J = !1, this.#Q = !1, this.#tt += 1, this.#Et = !1, this.#Ct = 0, this.#K(), this.#mt = !1, this.#H = !1, this.#Ht(), this.#Y(), this.#X = !1, this.#xt = !1, this.#k = null, this.#e.classList.remove("has-loaded-once", "has-visible-frame", "is-progress-settling"), this.#t.dataset.src = this.src, this.#t.pause(), this.#t.removeAttribute("src"), this.#t.preload = "none", this.#ys(), this.#t.load(), this.#ot(0), this.#g(), this.#S(), this.#f());
  }
}
customElements.get("simple-player") || customElements.define("simple-player", h);
export {
  h as SimplePlayer
};
//# sourceMappingURL=simple-player.js.map
