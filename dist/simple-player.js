const u = "16 / 9", m = "360px 0px", f = [
  "src",
  "aspect-ratio",
  "preload-margin",
  "controls",
  "disable-autoplay",
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
function v(o, t, s) {
  const e = document, i = t, r = s, n = !!((document.fullscreenEnabled ?? e.webkitFullscreenEnabled ?? e.mozFullScreenEnabled ?? e.msFullscreenEnabled ?? !1) && (i.requestFullscreen || i.webkitRequestFullscreen || i.mozRequestFullScreen || i.msRequestFullscreen)), l = !!(r.webkitSupportsFullscreen || r.webkitEnterFullscreen || r.webkitEnterFullScreen);
  return !!(o && (n || l));
}
function y(o) {
  const t = o, s = t.requestFullscreen || t.webkitRequestFullscreen || t.mozRequestFullScreen || t.msRequestFullscreen;
  return Promise.resolve(s?.call(t));
}
function g(o) {
  const t = o;
  return typeof t.requestFullscreen == "function" || typeof t.webkitRequestFullscreen == "function" || typeof t.mozRequestFullScreen == "function" || typeof t.msRequestFullscreen == "function";
}
function w(o) {
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
function k(o) {
  const t = o;
  if (t.audioTracks && typeof t.audioTracks.length == "number")
    return t.audioTracks.length > 0 ? "available" : "unavailable";
  const s = o;
  if (typeof s.mozHasAudio == "boolean")
    return s.mozHasAudio ? "available" : "unavailable";
  const e = o, i = e.captureStream ?? e.mozCaptureStream;
  if (i && o.readyState >= HTMLMediaElement.HAVE_METADATA)
    try {
      return i.call(o).getAudioTracks().length > 0 ? "available" : "unavailable";
    } catch {
    }
  const r = o;
  return typeof r.webkitAudioDecodedByteCount == "number" && o.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && o.currentTime > 0.25 ? r.webkitAudioDecodedByteCount > 0 ? "available" : "unavailable" : "unknown";
}
function P(o) {
  return typeof o.webkitAudioDecodedByteCount == "number" && o.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && o.currentTime <= 0.25;
}
function c(o) {
  const t = Math.min(2, Math.max(0, o.width / 2)), s = Math.max(1, o.width - t * 2);
  return { rect: o, sideInset: t, innerWidth: s };
}
function T(o, t) {
  const { sideInset: s, innerWidth: e } = c(t), i = Math.min(1, Math.max(0, o));
  return s + i * e;
}
function E(o, t) {
  const { sideInset: s, innerWidth: e } = c(t);
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

  .sp-player.is-pointer-active .sp-overlay,
  .sp-player.is-controls-visible .sp-overlay,
  :host(:hover) .sp-overlay {
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
  :host(:hover) .sp-button {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, -50%) scale(1);
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
  .sp-player.is-controls-visible .sp-control-tray,
  :host(:hover) .sp-control-tray {
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

  .sp-control-tray-slots:has(.sp-control-button:hover)::before {
    opacity: var(--sp-control-hover-opacity);
    transition:
      opacity 80ms ease 120ms,
      transform 160ms cubic-bezier(0.18, 0.9, 0.22, 1);
  }

  .sp-control-tray-slots:has(.sp-control-button.is-control-tap-active)::before {
    opacity: var(--sp-control-hover-opacity);
    transform: translateX(var(--sp-touch-control-hover-offset));
    transition:
      opacity 80ms ease,
      transform 160ms cubic-bezier(0.18, 0.9, 0.22, 1);
  }

  .sp-control-tray-slots:not(:has(.sp-control-button:hover))::before {
    transition:
      opacity 100ms ease,
      transform 0ms linear 100ms;
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

  .sp-control-button:hover {
    background: var(--sp-control-slot-hover-surface);
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
    opacity: var(--sp-control-icon-hidden-opacity);
    transform: var(--sp-control-icon-hidden-transform);
  }

  .sp-player.is-volume-unavailable .sp-control-tray-slots:has([data-sp-volume-control]:hover)::before,
  .sp-player.is-volume-unavailable .sp-control-tray-slots:has([data-sp-volume-control].is-control-tap-active)::before {
    opacity: 0;
  }

  .sp-control-button:hover .sp-control-icon {
    opacity: var(--sp-control-icon-hover-opacity);
    transform: translateY(0) scale(1);
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
  .sp-player.is-controls-visible .sp-control-icon,
  :host(:hover) .sp-control-icon {
    opacity: var(--sp-control-icon-opacity);
    transform: translateY(0) scale(1);
  }

  .sp-player.is-pointer-active .sp-control-button:nth-child(1) .sp-control-icon,
  .sp-player.is-controls-visible .sp-control-button:nth-child(1) .sp-control-icon,
  :host(:hover) .sp-control-button:nth-child(1) .sp-control-icon {
    transition-delay: var(--sp-control-icon-delay-1);
  }

  .sp-player.is-pointer-active .sp-control-button:nth-child(2) .sp-control-icon,
  .sp-player.is-controls-visible .sp-control-button:nth-child(2) .sp-control-icon,
  :host(:hover) .sp-control-button:nth-child(2) .sp-control-icon {
    transition-delay: var(--sp-control-icon-delay-2);
  }

  .sp-player.is-pointer-active .sp-control-button:nth-child(3) .sp-control-icon,
  .sp-player.is-controls-visible .sp-control-button:nth-child(3) .sp-control-icon,
  :host(:hover) .sp-control-button:nth-child(3) .sp-control-icon {
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
  .sp-player.has-pinned-time.is-controls-visible .sp-tray-time,
  :host(:hover) .sp-player.has-pinned-time .sp-tray-time {
    opacity: 1;
    pointer-events: auto;
    filter: blur(0);
    transform: translateY(0) scale(1);
  }

  .sp-tray-time-holder {
    position: relative;
    right: auto;
    bottom: auto;
    width: calc(var(--sp-tray-time-width, 40px) + (var(--sp-control-tray-padding) * 2));
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
    opacity: var(--sp-control-hover-opacity);
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

  .sp-button:focus-visible,
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
    .sp-player.is-loading:not(.has-loaded-once).is-pointer-active .sp-button {
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

    :host(:hover) .sp-overlay,
    :host(:hover) .sp-button,
    :host(:hover) .sp-control-tray {
      opacity: 0;
      pointer-events: none;
    }

    :host(:hover) .sp-control-icon {
      opacity: var(--sp-control-icon-hidden-opacity);
      transform: var(--sp-control-icon-hidden-transform);
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
`, p = document.createElement("template");
p.innerHTML = `
  <style>${C}</style>
  <div class="sp-player is-loading" data-sp-player>
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
    <span class="sp-overlay" aria-hidden="true"></span>
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
class A extends HTMLElement {
  static observedAttributes = f;
  #r;
  #At = [];
  #T = null;
  #ts = !1;
  #E = !1;
  #s;
  #t;
  #M;
  #i;
  #V;
  #z;
  #oe;
  #m;
  #ss;
  #Ts;
  #n;
  #I;
  #p;
  #O;
  #Z;
  #K = [];
  #ot = 0;
  #a = !1;
  #x = !1;
  #G = !1;
  #f = 0;
  #Lt = 0;
  #J = 0;
  #Ft = !1;
  #R = !1;
  #nt = !1;
  #es = 0;
  #St = 0;
  #h = null;
  #b = null;
  #is = 0;
  #Q = 0;
  #at = 0;
  #lt = 0;
  #tt = 0;
  #Es = 0;
  #rs = 0;
  #Mt = null;
  #C = !1;
  #A = !1;
  #B = !1;
  #$ = !1;
  #U = 0;
  #Vt = 0;
  #ht = !1;
  #Cs = 0;
  #zt = !0;
  #As = 0;
  #Ls = performance.now();
  #ct = 0;
  #k = null;
  #st = null;
  #It = !1;
  #v = !1;
  #Rt = !1;
  #ut = !1;
  #N = !1;
  #os = null;
  #ns = null;
  #Dt = !1;
  #L = !1;
  #Y = !1;
  #o = null;
  #pt = 0;
  #dt = 0;
  #mt = 0;
  #as = null;
  #ls = !1;
  #ft = 0;
  #ne = 4;
  #ae = 3.5;
  #hs = 6;
  #le = 0.08;
  #he = 240;
  #Fs = 1200;
  #Ht = 1600;
  #ce = 140;
  #ue = 380;
  #pe = 650;
  #de = 2e3;
  #me = 3;
  #fe = 10;
  #qt = 0.18;
  #be = 8;
  #ve = 18;
  constructor() {
    super(), this.#r = this.attachShadow({ mode: "open" }), this.#r.append(p.content.cloneNode(!0));
  }
  get src() {
    return this.getAttribute("src") ?? "";
  }
  set src(t) {
    this.#cs("src", t);
  }
  get aspectRatio() {
    return this.getAttribute("aspect-ratio") || u;
  }
  set aspectRatio(t) {
    this.#cs("aspect-ratio", t);
  }
  get preloadMargin() {
    return this.getAttribute("preload-margin") || m;
  }
  set preloadMargin(t) {
    this.#cs("preload-margin", t);
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
    this.#us("volume", t);
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
    this.#us("picture-in-picture", t);
  }
  get fullscreenEnabled() {
    return this.controlsEnabled && !this.hasAttribute("disable-fullscreen") && !this.hasAttribute("no-fullscreen");
  }
  set fullscreenEnabled(t) {
    this.#us("fullscreen", t);
  }
  connectedCallback() {
    this.#s = this.#r.querySelector("[data-sp-player]"), this.#t = this.#r.querySelector("[data-sp-video]"), this.#M = this.#r.querySelector("[data-sp-button]"), this.#i = this.#r.querySelector("[data-sp-progress-track]"), this.#V = this.#r.querySelector("[data-sp-control-tray]"), this.#z = this.#r.querySelector("[data-sp-control-tray-slots]"), this.#oe = this.#r.querySelector("[data-sp-tray-time]"), this.#m = this.#r.querySelector("[data-sp-tray-time-text]"), this.#ss = this.#r.querySelector("[data-sp-time]"), this.#Ts = this.#r.querySelector("[data-sp-time-text]"), this.#n = this.#r.querySelector("[data-sp-volume-control]"), this.#I = this.#r.querySelector("[data-sp-volume-popover]"), this.#p = this.#r.querySelector("[data-sp-volume-track]"), this.#O = this.#r.querySelector("[data-sp-picture-in-picture-control]"), this.#Z = this.#r.querySelector("[data-sp-fullscreen-control]"), this.#K = [this.#n, this.#O, this.#Z], this.#Ss(), this.#ts || (this.#ye(), this.#ts = !0), this.#Bt(), this.#ds(), this.#Ms(), this.#ps(), this.#w(), this.#g(), this.#Tt(), this.#Qt(), this.#u();
  }
  disconnectedCallback() {
    this.#T?.disconnect(), this.#T = null, this.#At.forEach((t) => t()), this.#At = [], this.#ts = !1, this.#P(), this.#$s(), this.#Ot(), this.#vs(), this.#rt(), this.#Zt(), this.#Ct(), this.#Us(), this.#bs(), this.#s.classList.remove("is-volume-icon-animating"), this.#z.style.removeProperty("--sp-control-hover-offset"), this.style.removeProperty("--sp-touch-control-hover-offset"), this.#xt(), this.#v = !1, this.#s.classList.remove("is-progress-hovering"), this.#L = !1, this.#Y = !1, this.#N = !1, this.#o = null, this.#n.classList.remove("is-volume-open"), this.#K.forEach((t) => t.classList.remove("is-control-tap-active")), this.#s.classList.remove("is-pointer-active"), this.#kt();
  }
  attributeChangedCallback(t, s, e) {
    if (s !== e) {
      if (t === "aspect-ratio") {
        this.#Ss();
        return;
      }
      if (t === "preload-margin" && this.isConnected) {
        this.#T?.disconnect(), this.#ds();
        return;
      }
      if (t === "src" && this.isConnected) {
        this.#xi(), this.#ds();
        return;
      }
      if ((t === "disable-autoplay" || t === "no-autoplay") && this.isConnected) {
        this.#Bt(), this.#g(), this.#u();
        return;
      }
      if (t === "show-time" && this.isConnected) {
        this.#ps();
        return;
      }
      (t === "controls" || t.startsWith("enable-") || t.startsWith("disable-") || t.startsWith("no-")) && this.isConnected && (this.#Ms(), this.#g(), this.#Tt(), this.#Qt(), this.#ps());
    }
  }
  #cs(t, s) {
    if (s === "") {
      this.removeAttribute(t);
      return;
    }
    this.setAttribute(t, s);
  }
  #us(t, s) {
    if (s) {
      this.setAttribute(`enable-${t}`, ""), this.removeAttribute(`disable-${t}`), this.removeAttribute(`no-${t}`);
      return;
    }
    this.removeAttribute(`enable-${t}`), this.setAttribute(`disable-${t}`, "");
  }
  #Ss() {
    this.style.setProperty("--simple-player-aspect-ratio", this.aspectRatio);
  }
  #Bt() {
    if (!this.#t) return;
    const t = this.autoplayEnabled;
    if (this.#t.autoplay = t, t) {
      this.#t.muted = !0, this.#t.setAttribute("autoplay", ""), this.#t.setAttribute("muted", "");
      return;
    }
    this.#t.removeAttribute("autoplay"), this.#E || (this.#t.muted = !1, this.#t.removeAttribute("muted"));
  }
  #Ms() {
    if (!this.#s) return;
    const t = [
      { button: this.#n, enabled: this.volumeEnabled, className: "has-volume-control" },
      { button: this.#O, enabled: this.pictureInPictureEnabled, className: "has-picture-in-picture-control" },
      { button: this.#Z, enabled: this.fullscreenEnabled, className: "has-fullscreen-control" }
    ];
    let s = 0;
    for (const e of t)
      this.#s.classList.toggle(e.className, e.enabled), e.button.hidden = !e.enabled, e.enabled ? (e.button.dataset.spControlIndex = `${s}`, s += 1) : delete e.button.dataset.spControlIndex;
    this.style.setProperty("--sp-enabled-controls-count", `${s}`), this.style.setProperty("--sp-control-tray-display", s > 0 ? "block" : "none"), this.#s.classList.toggle("has-volume-slider-control", this.volumeEnabled && this.volumeSliderEnabled), (!this.volumeEnabled || !this.volumeSliderEnabled) && (this.#ks(), this.#Jt(this.#o), this.#L = !1, this.#Y = !1, this.#I.classList.remove("is-scrubbing-volume")), this.#z.style.removeProperty("--sp-control-hover-offset");
  }
  get #bt() {
    return this.timeVisible && this.controlsEnabled;
  }
  #ps() {
    this.#s && (this.#s.classList.toggle("has-pinned-time", this.#bt), this.#bt && this.#wt());
  }
  #ye() {
    this.#e(this.#M, "click", this.#_e), this.#e(this, "pointerenter", this.#_t), this.#e(this, "pointermove", this.#Wt), this.#e(this, "pointerleave", this.#jt), this.#e(this, "mouseenter", this.#_t), this.#e(this, "mousemove", this.#Wt), this.#e(this, "mouseleave", this.#jt), this.#e(this.#s, "pointerenter", this.#_t), this.#e(this.#s, "pointermove", this.#Wt), this.#e(this.#s, "pointerleave", this.#jt), this.#e(this.#s, "mouseenter", this.#_t), this.#e(this.#s, "mousemove", this.#Wt), this.#e(this.#s, "mouseleave", this.#jt), this.#e(this.#M, "pointerenter", this.#et), this.#e(this.#M, "pointerleave", this.#it), this.#e(this.#M, "mouseenter", this.#et), this.#e(this.#M, "mouseleave", this.#it), this.#e(this.#i, "pointerenter", this.#et), this.#e(this.#i, "pointerleave", this.#it), this.#e(this.#i, "mouseenter", this.#et), this.#e(this.#i, "mouseleave", this.#it), this.#e(this.#i, "pointerenter", this.#ie), this.#e(this.#i, "pointerleave", this.#re), this.#e(this.#i, "mouseenter", this.#ie), this.#e(this.#i, "mouseleave", this.#re), this.#e(this.#V, "pointerenter", this.#et), this.#e(this.#V, "pointerleave", this.#it), this.#e(this.#V, "mouseenter", this.#et), this.#e(this.#V, "mouseleave", this.#it), this.#e(this.#r, "focusin", this.#Hs), this.#e(this.#r, "focusout", this.#xe), this.#e(this.#s, "pointerdown", this.#We), this.#e(this.#s, "dragstart", this.#Ut), this.#e(this.#s, "selectstart", this.#Ut), this.#e(this.#t, "dragstart", this.#Ut), this.#e(this.#t, "selectstart", this.#Ut), this.#e(this.#i, "pointerdown", this.#ei), this.#e(this.#i, "pointermove", this.#ri), this.#e(this.#i, "pointerup", this.#oi), this.#e(this.#i, "pointercancel", this.#ni), this.#e(this.#i, "keydown", this.#ii), this.#e(this.#n, "pointerenter", this.#se), this.#e(this.#n, "pointerleave", this.#ee), this.#e(this.#n, "click", this.#Oe), this.#e(this.#I, "pointerenter", this.#se), this.#e(this.#I, "pointerleave", this.#ee), this.#e(this.#p, "pointerdown", this.#Ze), this.#e(this.#p, "pointermove", this.#Ke), this.#e(this.#p, "pointerup", this.#Ge), this.#e(this.#p, "pointercancel", this.#Je), this.#e(this.#p, "click", this.#je), this.#e(this.#p, "keydown", this.#Qe), this.#e(this.#O, "click", this.#ti), this.#e(this.#Z, "click", this.#si), this.#e(this.#m, "click", this.#Xe);
    for (const t of this.#K)
      this.#e(t, "pointerenter", this.#qs), this.#e(t, "mouseenter", this.#qs), this.#e(t, "pointerdown", this.#ke);
    "ResizeObserver" in window && (this.#Mt = new ResizeObserver(() => {
      this.#$t();
    }), this.#Mt.observe(this.#m), this.#At.push(() => {
      this.#Mt?.disconnect(), this.#Mt = null;
    })), this.#e(document, "pointerup", this.#ai), this.#e(document, "pointercancel", this.#li), this.#e(document, "pointermove", this.#Ds), this.#e(document, "mousemove", this.#Ds), this.#e(document, "fullscreenchange", this.#Et), this.#e(document, "webkitfullscreenchange", this.#Et), this.#e(document, "mozfullscreenchange", this.#Et), this.#e(document, "MSFullscreenChange", this.#Et), this.#e(this.#r, "fullscreenchange", this.#Et), this.#e(window, "blur", this.#hi), this.#e(window, "focus", this.#ci), this.#e(this.#t, "play", this.#ui), this.#e(this.#t, "pause", this.#pi), this.#e(this.#t, "ended", this.#di), this.#e(this.#t, "loadstart", this.#mi), this.#e(this.#t, "waiting", this.#Ps), this.#e(this.#t, "stalled", this.#Ps), this.#e(this.#t, "seeking", this.#Ps), this.#e(this.#t, "loadeddata", this.#Kt), this.#e(this.#t, "loadedmetadata", this.#fi), this.#e(this.#t, "canplay", this.#Kt), this.#e(this.#t, "canplaythrough", this.#Kt), this.#e(this.#t, "playing", this.#bi), this.#e(this.#t, "seeked", this.#vi), this.#e(this.#t, "error", this.#yi), this.#e(this.#t, "progress", this.#w), this.#e(this.#t, "suspend", this.#w), this.#e(this.#t, "timeupdate", this.#gi), this.#e(this.#t, "volumechange", this.#wi), this.#e(this.#t, "enterpictureinpicture", this.#Tt), this.#e(this.#t, "leavepictureinpicture", this.#Tt);
  }
  #$t() {
    !this.#s || !this.#m || this.#s.style.setProperty("--sp-tray-time-width", `${Math.ceil(this.#m.scrollWidth)}px`);
  }
  #e(t, s, e) {
    t.addEventListener(s, e), this.#At.push(() => t.removeEventListener(s, e));
  }
  #ds() {
    if (!(!this.src || this.#E)) {
      if (this.#T?.disconnect(), this.#t.dataset.src = this.src, "IntersectionObserver" in window) {
        this.#T = new IntersectionObserver((t, s) => {
          t.some((e) => e.isIntersecting) && (s.disconnect(), this.#T = null, this.#X());
        }, { rootMargin: this.preloadMargin }), this.#T.observe(this.#s);
        return;
      }
      this.#X();
    }
  }
  #Ut = (t) => {
    t.preventDefault();
  };
  #P() {
    this.#at && (window.clearTimeout(this.#at), this.#at = 0);
  }
  #ge = () => {
    if (this.#at = 0, !(this.#x || this.#a || this.#L)) {
      if (this.#d()) {
        this.#s.classList.remove("is-controls-visible");
        return;
      }
      this.#N || this.#s.classList.remove("is-pointer-active");
    }
  };
  #Nt(t = this.#d() ? this.#Fs : this.#Ht) {
    this.#P(), this.#at = window.setTimeout(this.#ge, t);
  }
  #D() {
    this.#d() && this.#Nt(this.#Fs);
  }
  #H() {
    if (!this.#d()) return !1;
    const t = this.#s.classList.contains("is-controls-visible");
    return this.#s.classList.add("is-controls-visible"), this.#D(), !t;
  }
  #ms(t = !1) {
    !t && this.#d() || (this.#s.classList.add("is-pointer-active"), this.#N ? this.#P() : this.#Nt(t ? this.#Ht : void 0));
  }
  #Yt() {
    this.#N = !1, this.#P(), this.#s.classList.remove("is-pointer-active");
  }
  #vt(t) {
    return t instanceof PointerEvent ? (this.#Dt = t.pointerType === "touch", this.#Dt ? !1 : (this.#os = t.clientX, this.#ns = t.clientY, !0)) : t instanceof MouseEvent ? (this.#Dt = !1, this.#os = t.clientX, this.#ns = t.clientY, !0) : !1;
  }
  #we(t, s) {
    if (t === null || s === null || t < 0 || s < 0 || t > window.innerWidth || s > window.innerHeight) return !1;
    const e = this.getBoundingClientRect();
    return e.width <= 0 || e.height <= 0 ? !1 : t >= e.left && t <= e.right && s >= e.top && s <= e.bottom;
  }
  #Vs(t, s, e) {
    if (!t) return !1;
    const i = t.getBoundingClientRect();
    return i.width <= 0 || i.height <= 0 ? !1 : s >= i.left && s <= i.right && e >= i.top && e <= i.bottom;
  }
  #zs() {
    this.#v && (this.#v = !1, this.#s.classList.remove("is-progress-hovering"), this.#xt(), this.#wt());
  }
  #Is(t, s) {
    if (this.#d()) return;
    !this.#c() && this.#Vs(this.#i, t, s) ? (this.#v = !0, this.#s.classList.add("is-progress-hovering"), this.#j(t, !1, !1)) : this.#c() || this.#zs();
    const e = this.#K.find((r) => !r.hidden && !this.#fs(r) && this.#Vs(r, t, s)) ?? null;
    if (!e) return;
    const i = Number(e.dataset.spControlIndex ?? 0);
    this.#z.style.setProperty("--sp-control-hover-offset", `calc(var(--sp-control-slot-size) * ${i})`);
  }
  #yt() {
    return this.#s.classList.contains("is-controls-visible") || this.#s.classList.contains("is-pointer-active") || this.#r.activeElement instanceof HTMLElement;
  }
  #Xt() {
    return this.#d() && performance.now() < this.#rs;
  }
  #fs(t) {
    return t instanceof HTMLButtonElement && (t.disabled || t === this.#n && !this.#F());
  }
  #Rs() {
    if (!this.#Dt && this.#we(this.#os, this.#ns)) {
      this.#ms(!0);
      return;
    }
    this.#Yt();
  }
  #_t = (t) => {
    this.#vt(t) && this.#ms(!0);
  };
  #Wt = (t) => {
    this.#vt(t) && ((t instanceof PointerEvent || t instanceof MouseEvent) && this.#Is(t.clientX, t.clientY), this.#ms(!0));
  };
  #Ds = (t) => {
    this.#vt(t) && ((t instanceof PointerEvent || t instanceof MouseEvent) && this.#Is(t.clientX, t.clientY), this.#Rs());
  };
  #jt = () => {
    this.#Yt();
  };
  #et = (t) => {
    this.#vt(t) && (this.#N = !0, this.#s.classList.add("is-pointer-active"), this.#P());
  };
  #it = () => {
    this.#N = !1, this.#Nt(this.#Ht);
  };
  #Hs = () => {
    this.#d() ? this.#s.classList.add("is-controls-visible") : this.#s.classList.add("is-pointer-active"), this.#P();
  };
  #xe = () => {
    this.#Nt(this.#Ht);
  };
  #qs = (t) => {
    const s = t.currentTarget;
    if (this.#fs(s)) {
      this.#z.style.removeProperty("--sp-control-hover-offset");
      return;
    }
    const i = Number(s.dataset.spControlIndex ?? 0);
    this.#z.style.setProperty("--sp-control-hover-offset", `calc(var(--sp-control-slot-size) * ${i})`);
  };
  #bs() {
    this.#mt && (window.clearTimeout(this.#mt), this.#mt = 0);
  }
  #Bs = () => {
    this.#mt = 0, this.#K.forEach((t) => t.classList.remove("is-control-tap-active")), this.style.removeProperty("--sp-touch-control-hover-offset");
  };
  #ke = (t) => {
    if (!(t instanceof PointerEvent) || t.pointerType !== "touch") return;
    const s = t.currentTarget;
    if (!s || !this.#yt() || this.#fs(s)) return;
    const e = Number(s.dataset.spControlIndex ?? 0);
    this.#bs(), this.#K.forEach((i) => i.classList.toggle("is-control-tap-active", i === s)), this.style.setProperty("--sp-touch-control-hover-offset", `calc(var(--sp-control-slot-size) * ${e})`), this.#mt = window.setTimeout(this.#Bs, 280);
  };
  #$s() {
    this.#lt && (window.clearTimeout(this.#lt), this.#lt = 0);
  }
  #Ot() {
    this.#Q && (window.clearTimeout(this.#Q), this.#Q = 0);
  }
  #vs() {
    this.#tt && (window.clearTimeout(this.#tt), this.#tt = 0);
  }
  #Zt() {
    this.#Vt && (window.clearTimeout(this.#Vt), this.#Vt = 0);
  }
  #Us() {
    this.#dt && (window.clearTimeout(this.#dt), this.#dt = 0);
  }
  #Pe() {
    this.#Us(), this.#s.classList.remove("is-volume-icon-animating"), this.#n.offsetWidth, this.#s.classList.add("is-volume-icon-animating"), this.#dt = window.setTimeout(() => {
      this.#dt = 0, this.#s.classList.remove("is-volume-icon-animating");
    }, 240);
  }
  #Ns = () => {
    if (this.#tt || this.#s.classList.contains("is-progress-settling")) {
      if (this.#vs(), this.#ht) {
        this.#s.classList.remove("is-progress-settling");
        return;
      }
      this.#ht = !0, this.#Cs = performance.now() + this.#pe, this.#c() || this.#l(), this.#y(), this.#s.classList.remove("is-progress-settling"), this.#u();
    }
  };
  #Te() {
    this.#ht || this.#tt || (this.#s.classList.add("is-progress-settling"), this.#W(0), this.#tt = window.setTimeout(this.#Ns, this.#ue));
  }
  async #X() {
    if (this.#E) return;
    const t = this.#t.dataset.src || this.src;
    t && (this.#Ot(), this.#Zt(), this.#is += 1, this.#E = !0, this.#C = !1, this.#A = !1, this.#B = !1, this.#$ = !1, this.#U += 1, this.#s.classList.remove("has-visible-frame"), this.#Bt(), this.#t.src = t, this.#t.preload = "auto", this.#t.load(), this.#t.autoplay && this.#t.muted && await this.#t.play().catch(() => {
    }));
  }
  #Ys() {
    return !this.#t.loop || this.#t.paused || !Number.isFinite(this.#t.duration) || this.#t.duration <= 0 ? !1 : this.#t.currentTime < 0.28 || this.#t.duration - this.#t.currentTime < 0.28;
  }
  #Ee(t = this.#t.currentTime) {
    if (!Number.isFinite(t)) return 0;
    const s = Math.max(0, t);
    try {
      for (let e = 0; e < this.#t.buffered.length; e += 1) {
        const i = this.#t.buffered.start(e), r = this.#t.buffered.end(e);
        if (s + this.#qt >= i && s <= r + this.#qt)
          return Math.max(0, r - s);
      }
    } catch {
      return 0;
    }
    return 0;
  }
  #Xs(t = this.#fe) {
    if (!this.#E || this.#t.error || !this.#s.classList.contains("has-loaded-once") || !Number.isFinite(this.#t.duration) || this.#t.duration <= 0) return !1;
    const s = Math.max(0, this.#t.duration - this.#t.currentTime), e = Math.min(t, s);
    return e <= this.#qt || this.#Ee() + this.#qt >= e;
  }
  #gt(t, s = !1) {
    this.#$s();
    const e = t && !this.#Ys() && !this.#Xs(), r = t && !this.#A || e;
    if (this.#zt = r, !r) {
      this.#s.classList.remove("is-loading");
      return;
    }
    if (s) {
      this.#s.classList.add("is-loading");
      return;
    }
    this.#lt = window.setTimeout(() => {
      if (this.#lt = 0, !this.#A || !this.#Ys() && !this.#Xs()) {
        this.#zt = !0, this.#s.classList.add("is-loading");
        return;
      }
      this.#zt = !1, this.#s.classList.remove("is-loading");
    }, this.#ce);
  }
  #w = () => {
    if (this.#t.error) {
      this.#gt(!0, !0);
      return;
    }
    this.#gt(
      !this.#E || !this.#A || this.#t.readyState < HTMLMediaElement.HAVE_FUTURE_DATA
    );
  };
  #Ce() {
    return this.#E && !this.#t.error && this.#C && (this.#t.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA || this.#t.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !this.#s.classList.contains("is-loading"));
  }
  #c() {
    return this.#x || this.#a || this.#R;
  }
  #Ae() {
    this.#is >= this.#me || this.#Q || (this.#Q = window.setTimeout(() => {
      this.#Q = 0, this.#Zt(), this.#E = !1, this.#C = !1, this.#A = !1, this.#B = !1, this.#$ = !1, this.#U += 1, this.#s.classList.remove("has-visible-frame"), this.#s.classList.contains("has-loaded-once") || this.#W(0), this.#t.removeAttribute("src"), this.#t.load(), this.#X();
    }, this.#de));
  }
  #_s() {
    return this.#R ? (this.#R = !1, this.#nt = !1, this.#l(), this.#y(), !0) : !1;
  }
  #Ws() {
    return this.#Ot(), !this.#s.classList.contains("has-loaded-once") && this.#Te(), this.#s.classList.add("has-loaded-once"), this.#s.classList.add("has-visible-frame"), this.#w(), this.#b = null, this.#R ? (this.#_s(), !0) : (this.#c() || this.#l(), this.#y(), !0);
  }
  #Le() {
    if (this.#C || this.#B || this.#t.error) return;
    this.#B = !0;
    const t = this.#U, s = () => {
      if (t === this.#U) {
        if (this.#Zt(), this.#B = !1, this.#C = !this.#t.error && this.#t.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && this.#t.videoWidth > 0 && this.#t.videoHeight > 0, this.#C) {
          if (this.#$ || this.#A) return;
          this.#$ = !0, window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              t === this.#U && (this.#$ = !1, this.#A = !0, this.#Ws(), this.#u());
            });
          }), this.#u();
          return;
        }
        this.#w();
      }
    };
    if ("requestVideoFrameCallback" in this.#t) {
      this.#t.requestVideoFrameCallback(s), this.#Vt = window.setTimeout(s, 180);
      return;
    }
    window.requestAnimationFrame(s);
  }
  #Kt = () => {
    if (this.#t.error || this.#t.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || this.#t.videoWidth <= 0 || this.#t.videoHeight <= 0)
      return this.#w(), !1;
    if (!this.#C)
      return this.#Le(), this.#w(), !1;
    const t = this.#Ws();
    return this.#g(), t;
  };
  #js() {
    return !this.#t.paused && (!this.#t.ended || this.#t.loop) && this.#t.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
  }
  #l(t = this.#t.currentTime) {
    this.#As = Number.isFinite(t) ? Math.max(0, t) : 0, this.#Ls = performance.now();
  }
  #q() {
    this.#k = null, this.#st = null;
  }
  #Os() {
    if (!Number.isFinite(this.#t.duration) || this.#t.duration <= 0) {
      this.#k = null;
      return;
    }
    const t = Number.isFinite(this.#t.currentTime) ? Math.max(0, this.#t.currentTime) : 0, s = Number.isFinite(this.#ct) ? this.#ct : t;
    this.#k = Math.min(this.#t.duration, Math.max(t, s)), this.#l(this.#k);
  }
  #Fe() {
    if (!Number.isFinite(this.#t.duration) || this.#t.duration <= 0) {
      this.#st = null, this.#Os();
      return;
    }
    const t = this.#s.style.getPropertyValue("--sp-progress-inset"), s = Number.parseFloat(t), e = Number.isFinite(s) ? Math.min(1, Math.max(0, 1 - s / 100)) : null, i = this.#_(), r = Math.min(1, Math.max(0, i / this.#t.duration)), n = Math.max(e ?? 0, r);
    this.#st = n, this.#k = n * this.#t.duration, this.#l(this.#k), this.#W(n), this.#i.setAttribute("aria-valuenow", `${this.#k}`), this.#i.setAttribute(
      "aria-valuetext",
      `${a(this.#k)} of ${a(this.#t.duration)}`
    );
  }
  #_() {
    if (!Number.isFinite(this.#t.duration) || this.#t.duration <= 0) return this.#t.currentTime || 0;
    if (this.#c()) return this.#f;
    if (this.#k !== null) return this.#k;
    if (!this.#js()) return this.#t.currentTime || 0;
    if (this.#zt || !this.#ht || performance.now() < this.#Cs)
      return this.#l(), this.#t.currentTime || 0;
    if (this.#s.classList.contains("is-loading") && this.#t.readyState < HTMLMediaElement.HAVE_FUTURE_DATA)
      return this.#l(), this.#t.currentTime || 0;
    const t = (performance.now() - this.#Ls) / 1e3, s = this.#As + t, e = this.#t.loop ? s % this.#t.duration : Math.min(s, this.#t.duration);
    return !this.#t.loop && this.#t.currentTime - e > 0.45 ? (this.#l(), this.#t.currentTime) : e;
  }
  #W(t) {
    const s = Math.min(1, Math.max(0, t)), e = (1 - s) * 100, { innerWidth: i } = this.#Me(), r = 1 / i, n = this.#a && this.#Ft && this.#J + r < s;
    if (this.#s.style.setProperty("--sp-progress-inset", `${e}%`), this.#s.style.setProperty("--sp-return-marker-base-opacity", n ? "0" : "1"), n) {
      const l = this.#Gt(this.#J), h = Math.max(0, i - 2), d = Math.min(h, Math.max(0, l - 3));
      this.#s.style.setProperty("--sp-return-marker-hole-left", `${d}px`);
    } else
      this.#s.style.setProperty("--sp-return-marker-hole-left", "-9999px");
  }
  #Se(t) {
    return !Number.isFinite(this.#t.duration) || this.#t.duration <= 0 ? 0 : Math.min(1, Math.max(0, t / this.#t.duration));
  }
  #Me(t = this.#i.getBoundingClientRect()) {
    return c(t);
  }
  #Gt(t, s = this.#i.getBoundingClientRect()) {
    return T(t, s);
  }
  #Ve(t, s) {
    return E(t, s);
  }
  #ze(t) {
    this.#Lt = Number.isFinite(t) ? Math.max(0, t) : 0, this.#J = this.#Se(this.#Lt);
    const s = this.#i.getBoundingClientRect(), e = this.#Gt(this.#J, s), i = e >= this.#hs && e <= Math.max(this.#hs, s.width - this.#hs);
    this.#Ft = this.#Lt > this.#le && i, this.#s.classList.toggle("has-return-marker", this.#Ft), this.#s.style.setProperty("--sp-return-marker-left", `${e}px`);
  }
  #Ie(t, s, e, i = this.#a) {
    const r = e * this.#t.duration;
    if (!i || !this.#Ft)
      return { percent: e, targetTime: r };
    const n = s.left + this.#Gt(this.#J, s);
    return Math.abs(t - n) <= this.#ae ? {
      percent: this.#J,
      targetTime: this.#Lt
    } : { percent: e, targetTime: r };
  }
  #wt(t = this.#_()) {
    !this.#bt || this.#v || this.#c() || (this.#m.textContent = this.#xs(t), this.#$t());
  }
  #y(t = this.#_()) {
    const s = Number.isFinite(this.#t.duration) && this.#t.duration > 0;
    if (s && this.#st !== null) {
      const r = this.#st * this.#t.duration;
      this.#ct = r, this.#W(this.#st), this.#i.setAttribute("aria-valuemin", "0"), this.#i.setAttribute("aria-valuemax", `${this.#t.duration}`), this.#i.setAttribute("aria-valuenow", `${r}`), this.#i.setAttribute(
        "aria-valuetext",
        `${a(r)} of ${a(this.#t.duration)}`
      ), this.#wt(r);
      return;
    }
    const e = s ? Math.min(this.#t.duration, Math.max(0, t)) : t, i = s ? e / this.#t.duration : 0;
    this.#ct = Number.isFinite(e) ? Math.max(0, e) : 0, this.#W(i), this.#i.setAttribute("aria-valuemin", "0"), this.#i.setAttribute("aria-valuemax", s ? `${this.#t.duration}` : "0"), this.#i.setAttribute("aria-valuenow", s ? `${e}` : "0"), this.#i.setAttribute(
      "aria-valuetext",
      s ? `${a(e)} of ${a(this.#t.duration)}` : "Loading video"
    ), this.#wt(e);
  }
  #j(t, s = this.#a, e = !0) {
    if (!Number.isFinite(this.#t.duration) || this.#t.duration <= 0) return this.#t.currentTime;
    const i = this.#i.getBoundingClientRect(), r = this.#Ve(t, i), n = this.#Ie(t, i, r, s);
    return e && this.#W(n.percent), this.#bt || this.#s.style.setProperty("--sp-scrub-preview-left", `${this.#Gt(n.percent, i)}px`), this.#Ts.textContent = a(n.targetTime), this.#m.textContent = this.#xs(n.targetTime), this.#$t(), e && (this.#i.setAttribute("aria-valuenow", `${n.targetTime}`), this.#i.setAttribute(
      "aria-valuetext",
      `${a(n.targetTime)} of ${a(this.#t.duration)}`
    )), this.#Re(), n.targetTime;
  }
  #xt() {
    this.#It = !1, this.#s?.classList.remove("has-controls-collision");
  }
  #Re() {
    if (!this.#a && !this.#v || !this.#V || !this.#ss || this.#bt) {
      this.#xt();
      return;
    }
    const t = this.#V.getBoundingClientRect(), s = this.#ss.getBoundingClientRect(), e = t.width > 0 && t.height > 0, i = this.#It ? this.#ve : this.#be, r = e && s.right >= t.left - i && s.left <= t.right + i && s.bottom >= t.top - i && s.top <= t.bottom + i;
    this.#It = r, this.#s.classList.toggle("has-controls-collision", this.#It);
  }
  #kt() {
    this.#ot && (window.cancelAnimationFrame(this.#ot), this.#ot = 0);
  }
  #De() {
    this.#kt(), this.#l();
    const t = () => {
      this.#y(this.#_()), this.#js() && (this.#ot = window.requestAnimationFrame(t));
    };
    this.#ot = window.requestAnimationFrame(t);
  }
  #u() {
    const t = !this.#t.paused && (!this.#t.ended || this.#t.loop) || this.#a && this.#G, s = this.#b ? this.#b === "playing" : t;
    if (this.#s.classList.toggle("is-playing", s), this.#M.setAttribute("aria-label", s ? "Pause video" : "Play video"), this.#a) {
      this.#kt();
      return;
    }
    t && this.#s.classList.contains("has-loaded-once") && !this.#s.classList.contains("is-progress-settling") ? this.#De() : (this.#kt(), this.#y());
  }
  #rt() {
    this.#St && (window.clearTimeout(this.#St), this.#St = 0);
  }
  #He() {
    return k(this.#t);
  }
  #F() {
    return this.volumeEnabled && this.#ut && this.#Rt;
  }
  #S() {
    this.#Ct(), this.#Jt(this.#o), this.#L = !1, this.#Y = !1, this.#o = null, this.#n.classList.remove("is-volume-open", "is-control-tap-active"), this.#I.classList.remove("is-scrubbing-volume"), this.#z.style.removeProperty("--sp-control-hover-offset");
  }
  #g = () => {
    if (!this.volumeEnabled) {
      this.#s.classList.remove("is-volume-unavailable", "is-volume-muted", "is-volume-sound", "is-volume-icon-animating"), this.#S(), this.#n.disabled = !0, this.#n.setAttribute("aria-disabled", "true");
      return;
    }
    if (!this.#ut) {
      const n = this.#He();
      n !== "unknown" ? (this.#ut = !0, this.#Rt = n === "available") : this.#t.readyState >= HTMLMediaElement.HAVE_METADATA && !P(this.#t) && (this.#ut = !0, this.#Rt = !0);
    }
    const t = this.#F(), s = !t || this.#t.muted || this.#t.volume <= 0, e = t && !this.#t.muted ? this.#t.volume : 0, i = Math.round(e * 100), r = s ? "muted" : "sound";
    this.#as && this.#as !== r && this.#Pe(), this.#as = r, this.#s.classList.toggle("is-volume-unavailable", !t), this.#s.classList.toggle("is-volume-muted", s), this.#s.classList.toggle("is-volume-sound", !s), this.#s.style.setProperty("--sp-volume-level", `${i}%`), this.#n.disabled = !t, this.#n.setAttribute("aria-disabled", `${!t}`), this.#n.setAttribute(
      "aria-label",
      t ? s ? "Unmute video" : "Mute video" : "Video has no audio"
    ), this.#p.setAttribute("aria-valuenow", `${i}`), this.#p.setAttribute("aria-valuetext", `${i}%`), t || this.#S();
  };
  #Zs(t) {
    if (!this.#F()) return;
    const s = this.#p.getBoundingClientRect(), e = Math.min(1, Math.max(0, 1 - (t - s.top) / s.height)), i = Math.round(e * 100) / 100;
    this.#t.volume = i, this.#t.muted = i <= 0, this.#g();
  }
  #Jt(t) {
    t !== null && this.#p.hasPointerCapture(t) && this.#p.releasePointerCapture(t);
  }
  #Pt(t) {
    this.#L = !1, this.#o = null, this.#I.classList.remove("is-scrubbing-volume"), this.#p.blur(), this.#Jt(t), this.#te(260);
  }
  #Tt = () => {
    const t = document.pictureInPictureElement === this.#t, s = this.#t, e = !!(this.pictureInPictureEnabled && document.pictureInPictureEnabled && s.requestPictureInPicture);
    this.#s.classList.toggle("is-picture-in-picture", t), this.#O.disabled = !e, this.#O.setAttribute("aria-label", t ? "Exit picture in picture" : "Enter picture in picture");
  };
  #ys() {
    return b(this.#r);
  }
  #Ks() {
    return v(this.fullscreenEnabled, this.#s, this.#t);
  }
  #qe() {
    return y(this.#s);
  }
  #Be() {
    w(this.#t);
  }
  #$e() {
    return x();
  }
  #Qt = () => {
    const t = this.#ys(), s = t === this.#s || t === this, e = this.#Ks();
    return this.#s.classList.toggle("is-fullscreen", s), this.#Z.disabled = !e, this.#Z.setAttribute("aria-label", s ? "Exit fullscreen" : "Enter fullscreen"), s;
  };
  #Et = () => {
    const t = this.#Qt();
    this.#Ue(t);
  };
  #Ue(t) {
    this.#P(), this.#Ct(), this.#gs(this.#h), this.#Jt(this.#o), this.#rt(), this.#x = !1, this.#a = !1, this.#v = !1, this.#s.classList.remove("is-progress-hovering"), this.#h = null, this.#N = !1, this.#Y = !1, this.#L = !1, this.#o = null, this.#bs(), this.#Bs(), this.#z.style.removeProperty("--sp-control-hover-offset"), this.#n.classList.remove("is-volume-open"), this.#I.classList.remove("is-scrubbing-volume"), this.#s.classList.remove("is-scrubbing"), this.#s.classList.remove("is-pointer-active");
    const s = this.#r.activeElement;
    s instanceof HTMLElement && s.blur(), t ? this.#Rs() : this.#Yt();
  }
  #Gs = () => {
    !this.#x || this.#a || (this.#q(), this.#P(), this.#rt(), this.#a = !0, this.#s.classList.add("is-scrubbing"), this.#f = this.#j(this.#es, !0), this.#G && this.#t.pause(), this.#t.currentTime = this.#f, this.#l(this.#f), this.#y(this.#f), this.#kt(), this.#u());
  };
  #gs(t) {
    t !== null && this.#i.hasPointerCapture(t) && this.#i.releasePointerCapture(t);
  }
  async #Js(t, s, e) {
    if (!this.#x && !this.#a) return;
    const i = this.#a;
    this.#rt(), this.#x = !1, this.#a = !1, this.#v = !1, this.#s.classList.remove("is-progress-hovering"), this.#h = null, this.#s.classList.remove("is-scrubbing"), this.#xt(), this.#gs(s), e && t !== null && (this.#q(), this.#f = this.#j(t, i), this.#R = !0, this.#nt = this.#G, this.#t.currentTime = this.#f, this.#l(this.#f)), this.#y(this.#f), i && this.#G && await this.#t.play(), this.#D();
  }
  #ws(t) {
    !this.#x && !this.#a || (this.#rt(), this.#x = !1, this.#a = !1, this.#v = !1, this.#s.classList.remove("is-progress-hovering"), this.#h = null, this.#s.classList.remove("is-scrubbing"), this.#xt(), this.#gs(t), this.#l(), this.#y(), this.#G && this.#t.play(), this.#D());
  }
  #xs(t) {
    if (!this.#ls) return a(t);
    const s = Number.isFinite(this.#t.duration) ? this.#t.duration : 0;
    return s <= 0 ? a(t) : `-${a(Math.max(0, s - t))}`;
  }
  #Ne() {
    this.#ft && (window.clearTimeout(this.#ft), this.#ft = 0);
  }
  #Ye() {
    this.#Ne(), this.#m.classList.remove("is-time-animating"), this.#m.offsetWidth, this.#m.classList.add("is-time-animating"), this.#ft = window.setTimeout(() => {
      this.#ft = 0, this.#m.classList.remove("is-time-animating");
    }, 240);
  }
  #Xe = (t) => {
    t.stopPropagation(), this.#ls = !this.#ls, this.#Ye(), this.#c() || this.#v ? this.#m && (this.#m.textContent = this.#xs(this.#f), this.#$t()) : this.#wt(this.#_());
  };
  #_e = async () => {
    if (performance.now() < this.#Es)
      return;
    const t = this.#b ? this.#b !== "playing" : this.#t.paused || this.#t.ended, s = !t || this.#Ce();
    this.#H(), s && (this.#b = t ? "playing" : "paused", this.#u()), t ? (this.#q(), await this.#X(), await this.#t.play().catch(() => {
      this.#b = null;
    })) : (this.#Fe(), this.#t.pause()), this.#u(), this.#D();
  };
  #We = (t) => {
    if (!(t instanceof PointerEvent)) return;
    const s = this.#M.getBoundingClientRect(), e = t.clientX >= s.left && t.clientX <= s.right && t.clientY >= s.top && t.clientY <= s.bottom, i = this.#V.getBoundingClientRect(), r = t.clientX >= i.left && t.clientX <= i.right && t.clientY >= i.top && t.clientY <= i.bottom, n = this.#i.getBoundingClientRect(), l = t.clientX >= n.left && t.clientX <= n.right && t.clientY >= n.top && t.clientY <= n.bottom, h = this.#H();
    h && e && (this.#Es = performance.now() + 260), h && (r || l) && (this.#rs = performance.now() + 260), this.#X();
  };
  #je = (t) => {
    t.stopPropagation();
  };
  #Ct() {
    this.#pt && (window.clearTimeout(this.#pt), this.#pt = 0);
  }
  #Qs() {
    if (!this.#F() || !this.volumeSliderEnabled) {
      this.#S();
      return;
    }
    this.#Ct(), this.#n.classList.add("is-volume-open");
  }
  #ks = () => {
    this.#pt = 0, !(this.#Y || this.#L) && this.#n.classList.remove("is-volume-open");
  };
  #te(t = 150) {
    this.#Ct(), this.#pt = window.setTimeout(this.#ks, t);
  }
  #se = () => {
    if (!this.#d()) {
      if (!this.#F() || !this.volumeSliderEnabled) {
        this.#S();
        return;
      }
      this.#Y = !0, this.#Qs();
    }
  };
  #ee = () => {
    if (!this.#d()) {
      if (!this.#F() || !this.volumeSliderEnabled) {
        this.#S();
        return;
      }
      this.#Y = !1, this.#te();
    }
  };
  #Oe = (t) => {
    if (t.preventDefault(), t.stopPropagation(), !this.#F()) {
      this.#S();
      return;
    }
    !this.#yt() || this.#Xt() || (this.#H(), this.#ks(), this.#t.muted || this.#t.volume <= 0 ? (this.#t.volume <= 0 && (this.#t.volume = 0.7), this.#t.muted = !1) : this.#t.muted = !0, this.#g(), this.#D());
  };
  #Ze = (t) => {
    if (t instanceof PointerEvent) {
      if (t.preventDefault(), t.stopPropagation(), !this.#F() || !this.volumeSliderEnabled || this.#d()) {
        this.#S();
        return;
      }
      this.#H(), this.#P(), this.#Qs(), this.#L = !0, this.#o = t.pointerId, this.#I.classList.add("is-scrubbing-volume"), this.#p.setPointerCapture(t.pointerId), this.#Zs(t.clientY);
    }
  };
  #Ke = (t) => {
    t instanceof PointerEvent && this.#L && (this.#o !== null && t.pointerId !== this.#o || (t.preventDefault(), t.stopPropagation(), this.#Zs(t.clientY)));
  };
  #Ge = (t) => {
    t instanceof PointerEvent && (this.#o !== null && t.pointerId !== this.#o || (t.stopPropagation(), this.#Pt(t.pointerId), this.#D()));
  };
  #Je = (t) => {
    t instanceof PointerEvent && (this.#o !== null && t.pointerId !== this.#o || (t.stopPropagation(), this.#Pt(t.pointerId)));
  };
  #Qe = (t) => {
    if (!(t instanceof KeyboardEvent)) return;
    if (!this.#F()) {
      t.preventDefault(), t.stopPropagation(), this.#S();
      return;
    }
    if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(t.key)) return;
    t.preventDefault(), t.stopPropagation();
    const s = t.shiftKey ? 0.1 : 0.05, e = t.key === "Home" ? 0 : t.key === "End" ? 1 : this.#t.volume + (t.key === "ArrowUp" ? s : -s);
    this.#t.volume = Math.min(1, Math.max(0, e)), this.#t.muted = this.#t.volume <= 0, this.#g();
  };
  #ti = async () => {
    const t = this.#t;
    if (!(!this.pictureInPictureEnabled || !document.pictureInPictureEnabled || !t.requestPictureInPicture) && !(!this.#yt() || this.#Xt())) {
      this.#H();
      try {
        await this.#X(), document.pictureInPictureElement === this.#t ? await document.exitPictureInPicture() : await t.requestPictureInPicture();
      } catch {
      } finally {
        this.#Tt(), this.#D();
      }
    }
  };
  #si = async (t) => {
    if (this.#Ks() && (t.preventDefault(), t.stopPropagation(), !(!this.#yt() || this.#Xt()))) {
      this.#vt(t), this.#H();
      try {
        const s = this.#ys();
        s === this.#s || s === this ? await this.#$e() : (await this.#X(), g(this.#s) ? await this.#qe() : this.#Be());
      } catch {
      } finally {
        this.#Qt(), this.#D();
      }
    }
  };
  #ie = (t) => {
    this.#d() || this.#c() || !(t instanceof PointerEvent) && !(t instanceof MouseEvent) || (this.#v = !0, this.#s.classList.add("is-progress-hovering"), this.#j(t.clientX, !1, !1));
  };
  #re = () => {
    this.#c() || this.#zs();
  };
  #ei = (t) => {
    if (t instanceof PointerEvent) {
      if (t.preventDefault(), !this.#yt() || this.#Xt()) {
        this.#H(), this.#d() && (this.#rs = performance.now() + 260);
        return;
      }
      this.#H(), this.#P(), this.#Ns(), this.#R = !1, this.#nt = !1, this.#ze(this.#_()), this.#x = !0, this.#h = t.pointerId, this.#es = t.clientX, this.#G = !this.#t.paused && !this.#t.ended, this.#i.setPointerCapture(t.pointerId), this.#f = this.#j(t.clientX, !1), this.#rt(), this.#St = window.setTimeout(this.#Gs, this.#he);
    }
  };
  #ii = (t) => {
    if (!(t instanceof KeyboardEvent) || !Number.isFinite(this.#t.duration) || this.#t.duration <= 0 || !["ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"].includes(t.key)) return;
    t.preventDefault(), t.stopPropagation(), this.#Hs();
    const s = this.#_(), e = t.shiftKey ? 10 : 5, i = Math.max(10, this.#t.duration * 0.1), r = t.key === "Home" ? 0 : t.key === "End" ? this.#t.duration : t.key === "PageUp" ? s + i : t.key === "PageDown" ? s - i : s + (t.key === "ArrowRight" ? e : -e);
    this.#t.currentTime = Math.min(this.#t.duration, Math.max(0, r)), this.#l(this.#t.currentTime), this.#y(this.#t.currentTime);
  };
  #ri = (t) => {
    if (t instanceof PointerEvent) {
      if (!this.#x) {
        this.#d() || (this.#v = !0, this.#s.classList.add("is-progress-hovering"), this.#j(t.clientX, !1, !1));
        return;
      }
      this.#h !== null && t.pointerId !== this.#h || (!this.#a && Math.abs(t.clientX - this.#es) >= this.#ne && this.#Gs(), this.#a && (this.#f = this.#j(t.clientX)));
    }
  };
  #oi = (t) => {
    t instanceof PointerEvent && (this.#h !== null && t.pointerId !== this.#h || this.#Js(t.clientX, t.pointerId, !0));
  };
  #ni = (t) => {
    t instanceof PointerEvent && (this.#h !== null && t.pointerId !== this.#h || this.#ws(t.pointerId));
  };
  #ai = (t) => {
    if (t instanceof PointerEvent) {
      if (this.#o !== null && t.pointerId === this.#o) {
        this.#Pt(t.pointerId);
        return;
      }
      this.#h === null || t.pointerId !== this.#h || this.#Js(t.clientX, t.pointerId, !0);
    }
  };
  #li = (t) => {
    if (t instanceof PointerEvent) {
      if (this.#o !== null && t.pointerId === this.#o) {
        this.#Pt(t.pointerId);
        return;
      }
      this.#h === null || t.pointerId !== this.#h || this.#ws(t.pointerId);
    }
  };
  #hi = () => {
    this.#Pt(this.#o), this.#ws(this.#h);
  };
  #ci = () => {
    this.#ys() || this.#Yt();
  };
  #ui = () => {
    this.#b = null, this.#q(), this.#c() || this.#l(), this.#u();
  };
  #pi = () => {
    this.#b = null, this.#c() || this.#Os(), this.#w(), this.#u();
  };
  #di = () => {
    this.#b = null, this.#q(), this.#c() || this.#l(), this.#u();
  };
  #mi = () => {
    this.#gt(!0, !0);
  };
  #Ps = () => {
    this.#gt(!0);
  };
  #fi = () => {
    this.#q(), this.#g(), this.#c() || this.#l(), this.#w(), this.#y();
  };
  #bi = () => {
    const t = this.#Kt();
    this.#g(), t && !this.#c() && this.#l(), this.#u();
  };
  #vi = () => {
    if (this.#q(), this.#w(), this.#R && (!this.#nt || this.#t.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA)) {
      this.#_s(), this.#u();
      return;
    }
    this.#c() || this.#l(), this.#y();
  };
  #yi = () => {
    this.#b = null, this.#C = !1, this.#A = !1, this.#B = !1, this.#$ = !1, this.#U += 1, this.#s.classList.remove("has-visible-frame"), this.#gt(!0, !0), this.#u(), this.#Ae();
  };
  #gi = () => {
    this.#g(), this.#y();
  };
  #wi = () => {
    this.#g();
  };
  #d() {
    return window.matchMedia("(max-width: 768px)").matches && window.matchMedia("(hover: none), (pointer: coarse)").matches;
  }
  #xi() {
    this.#t && (this.#T?.disconnect(), this.#T = null, this.#Ot(), this.#vs(), this.#E = !1, this.#is = 0, this.#C = !1, this.#A = !1, this.#B = !1, this.#$ = !1, this.#U += 1, this.#ht = !1, this.#ct = 0, this.#q(), this.#Rt = !1, this.#ut = !1, this.#S(), this.#R = !1, this.#nt = !1, this.#b = null, this.#s.classList.remove("has-loaded-once", "has-visible-frame", "is-progress-settling"), this.#t.dataset.src = this.src, this.#t.pause(), this.#t.removeAttribute("src"), this.#t.preload = "none", this.#Bt(), this.#t.load(), this.#W(0), this.#g(), this.#w(), this.#u());
  }
}
customElements.get("simple-player") || customElements.define("simple-player", A);
export {
  A as SimplePlayer
};
//# sourceMappingURL=simple-player.js.map
