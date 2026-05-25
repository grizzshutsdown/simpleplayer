var Ni = Object.defineProperty;
var ui = (d) => {
  throw TypeError(d);
};
var Ui = (d, p, i) => p in d ? Ni(d, p, { enumerable: !0, configurable: !0, writable: !0, value: i }) : d[p] = i;
var pi = (d, p, i) => Ui(d, typeof p != "symbol" ? p + "" : p, i), Xe = (d, p, i) => p.has(d) || ui("Cannot " + i);
var t = (d, p, i) => (Xe(d, p, "read from private field"), i ? i.call(d) : p.get(d)), n = (d, p, i) => p.has(d) ? ui("Cannot add the same private member more than once") : p instanceof WeakSet ? p.add(d) : p.set(d, i), r = (d, p, i, a) => (Xe(d, p, "write to private field"), a ? a.call(d, i) : p.set(d, i), i), e = (d, p, i) => (Xe(d, p, "access private method"), i);
const di = "16 / 9", Yi = "360px 0px", Xi = [
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
function _i(d) {
  const p = document;
  return d.fullscreenElement || document.fullscreenElement || p.webkitFullscreenElement || p.mozFullScreenElement || p.msFullscreenElement || null;
}
function Wi(d, p, i) {
  const a = document, l = p, u = i, f = !!((document.fullscreenEnabled ?? a.webkitFullscreenEnabled ?? a.mozFullScreenEnabled ?? a.msFullscreenEnabled ?? !1) && (l.requestFullscreen || l.webkitRequestFullscreen || l.mozRequestFullScreen || l.msRequestFullscreen)), v = !!(u.webkitSupportsFullscreen || u.webkitEnterFullscreen || u.webkitEnterFullScreen);
  return !!(d && (f || v));
}
function ji(d) {
  const p = d, i = p.requestFullscreen || p.webkitRequestFullscreen || p.mozRequestFullScreen || p.msRequestFullscreen;
  return Promise.resolve(i?.call(p));
}
function Zi(d) {
  const p = d;
  return typeof p.requestFullscreen == "function" || typeof p.webkitRequestFullscreen == "function" || typeof p.mozRequestFullScreen == "function" || typeof p.msRequestFullscreen == "function";
}
function Oi(d) {
  const p = d;
  (p.webkitEnterFullscreen || p.webkitEnterFullScreen)?.call(p);
}
function Ki() {
  const d = document, p = document.exitFullscreen || d.webkitExitFullscreen || d.mozCancelFullScreen || d.msExitFullscreen;
  return Promise.resolve(p?.call(d));
}
function q(d) {
  if (!Number.isFinite(d) || d < 0) return "0:00";
  const p = Math.floor(d), i = p % 60, a = Math.floor(p / 60), l = a % 60, u = Math.floor(a / 60);
  return u > 0 ? u + ":" + String(l).padStart(2, "0") + ":" + String(i).padStart(2, "0") : l + ":" + String(i).padStart(2, "0");
}
function Gi(d, p) {
  const i = d;
  if (i.audioTracks && typeof i.audioTracks.length == "number")
    return i.audioTracks.length > 0;
  const a = d;
  if (typeof a.mozHasAudio == "boolean")
    return a.mozHasAudio;
  const l = d;
  return typeof l.webkitAudioDecodedByteCount == "number" && d.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !d.muted && d.currentTime > 0.25 ? l.webkitAudioDecodedByteCount > 0 : p;
}
function ci(d) {
  const p = Math.min(2, Math.max(0, d.width / 2)), i = Math.max(1, d.width - p * 2);
  return { rect: d, sideInset: p, innerWidth: i };
}
function Ji(d, p) {
  const { sideInset: i, innerWidth: a } = ci(p), l = Math.min(1, Math.max(0, d));
  return i + l * a;
}
function Qi(d, p) {
  const { sideInset: i, innerWidth: a } = ci(p);
  return Math.min(1, Math.max(0, (d - p.left - i) / a));
}
const tr = `
  :host {
    --simple-player-aspect-ratio: ${di};
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
    pointer-events: none;
  }

  .sp-player.is-volume-unavailable .sp-volume-icon {
    transition: none;
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
    width: max-content;
    transition: width 240ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .sp-tray-time-holder .sp-control-tray-slots {
    position: relative;
    width: max-content;
  }

  .sp-tray-time-holder .sp-control-tray-slots::before {
    width: calc(100% - (var(--sp-control-tray-padding) * 2));
  }

  .sp-tray-time-holder .sp-tray-time-text {
    aspect-ratio: auto;
    min-width: max-content;
    width: auto;
    padding: 0 8px;
    font: 600 12px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
`, mi = document.createElement("template");
mi.innerHTML = `
  <style>${tr}</style>
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
var b, Qt, H, ts, B, h, o, Y, m, X, j, Gs, z, ss, xs, w, Z, T, et, it, rt, vt, g, R, ot, L, St, nt, Mt, _, gt, es, Vt, P, F, is, at, yt, wt, lt, ks, rs, $, N, O, K, G, It, xt, Ps, zt, Ts, Es, kt, D, ht, Rt, S, y, J, os, ns, Dt, W, ct, x, Pt, Tt, Et, as, ls, Ct, Js, Qs, hs, te, se, Cs, qt, ee, ie, re, oe, ne, ae, Ht, le, he, s, Hs, Bs, _e, ds, We, _t, $s, bi, c, Ns, Bt, U, ce, ms, Q, tt, Us, fs, Wt, vi, je, Ze, Oe, jt, bs, Ys, Ke, $t, Nt, As, Ut, ut, pt, Ls, ue, Fs, Xs, Ss, pe, Ge, vs, _s, gs, Je, gi, Ms, yi, dt, Qe, wi, ti, Zt, V, xi, E, ki, si, ei, Pi, Yt, ii, k, st, ri, Ti, mt, ft, Ei, Ci, ys, Ai, Li, Fi, Ot, I, bt, Kt, Si, Gt, Mi, C, Ft, Vi, M, oi, Ws, Jt, At, js, ni, Ii, zi, Ri, Xt, Lt, Di, Vs, Zs, ai, Os, Ks, qi, Hi, de, me, fe, be, ws, li, cs, hi, Is, zs, ve, ge, ye, we, xe, ke, Pe, Te, Rs, Ds, Ee, Ce, Ae, Le, Fe, Se, Me, Ve, Ie, ze, Re, De, qe, us, He, Be, $e, Ne, Ue, Ye, A, Bi;
class fi extends HTMLElement {
  constructor() {
    super();
    n(this, s);
    n(this, b);
    n(this, Qt, []);
    n(this, H, null);
    n(this, ts, !1);
    n(this, B, !1);
    n(this, h);
    n(this, o);
    n(this, Y);
    n(this, m);
    n(this, X);
    n(this, j);
    n(this, Gs);
    n(this, z);
    n(this, ss);
    n(this, xs);
    n(this, w);
    n(this, Z);
    n(this, T);
    n(this, et);
    n(this, it);
    n(this, rt, []);
    n(this, vt, 0);
    n(this, g, !1);
    n(this, R, !1);
    n(this, ot, !1);
    n(this, L, 0);
    n(this, St, 0);
    n(this, nt, 0);
    n(this, Mt, !1);
    n(this, _, !1);
    n(this, gt, !1);
    n(this, es, 0);
    n(this, Vt, 0);
    n(this, P, null);
    n(this, F, null);
    n(this, is, 0);
    n(this, at, 0);
    n(this, yt, 0);
    n(this, wt, 0);
    n(this, lt, 0);
    n(this, ks, 0);
    n(this, rs, 0);
    n(this, $, !1);
    n(this, N, !1);
    n(this, O, !1);
    n(this, K, !1);
    n(this, G, 0);
    n(this, It, 0);
    n(this, xt, !1);
    n(this, Ps, 0);
    n(this, zt, !0);
    n(this, Ts, 0);
    n(this, Es, performance.now());
    n(this, kt, 0);
    n(this, D, null);
    n(this, ht, null);
    n(this, Rt, !1);
    n(this, S, !1);
    n(this, y, !0);
    n(this, J, !1);
    n(this, os, null);
    n(this, ns, null);
    n(this, Dt, !1);
    n(this, W, !1);
    n(this, ct, !1);
    n(this, x, null);
    n(this, Pt, 0);
    n(this, Tt, 0);
    n(this, Et, 0);
    n(this, as, null);
    n(this, ls, !1);
    n(this, Ct, 0);
    n(this, Js, 4);
    n(this, Qs, 3.5);
    n(this, hs, 6);
    n(this, te, 0.08);
    n(this, se, 240);
    n(this, Cs, 1200);
    n(this, qt, 1600);
    n(this, ee, 140);
    n(this, ie, 380);
    n(this, re, 650);
    n(this, oe, 2e3);
    n(this, ne, 3);
    n(this, ae, 10);
    n(this, Ht, 0.18);
    n(this, le, 8);
    n(this, he, 18);
    n(this, Bt, (i) => {
      i.preventDefault();
    });
    n(this, ce, () => {
      if (r(this, yt, 0), !(t(this, R) || t(this, g) || t(this, W))) {
        if (e(this, s, A).call(this)) {
          t(this, h).classList.remove("is-controls-visible");
          return;
        }
        t(this, J) || t(this, h).classList.remove("is-pointer-active");
      }
    });
    n(this, $t, (i) => {
      e(this, s, Wt).call(this, i) && e(this, s, Us).call(this, !0);
    });
    n(this, Nt, (i) => {
      e(this, s, Wt).call(this, i) && ((i instanceof PointerEvent || i instanceof MouseEvent) && e(this, s, Oe).call(this, i.clientX, i.clientY), e(this, s, Us).call(this, !0));
    });
    n(this, As, (i) => {
      e(this, s, Wt).call(this, i) && ((i instanceof PointerEvent || i instanceof MouseEvent) && e(this, s, Oe).call(this, i.clientX, i.clientY), e(this, s, Ke).call(this));
    });
    n(this, Ut, () => {
      e(this, s, fs).call(this);
    });
    n(this, ut, (i) => {
      e(this, s, Wt).call(this, i) && (r(this, J, !0), t(this, h).classList.add("is-pointer-active"), e(this, s, U).call(this));
    });
    n(this, pt, () => {
      r(this, J, !1), e(this, s, ms).call(this, t(this, qt));
    });
    n(this, Ls, () => {
      e(this, s, A).call(this) ? t(this, h).classList.add("is-controls-visible") : t(this, h).classList.add("is-pointer-active"), e(this, s, U).call(this);
    });
    n(this, ue, () => {
      e(this, s, ms).call(this, t(this, qt));
    });
    n(this, Fs, (i) => {
      const a = i.currentTarget;
      if (e(this, s, Ys).call(this, a)) {
        t(this, j).style.removeProperty("--sp-control-hover-offset");
        return;
      }
      const u = Number(a.dataset.spControlIndex ?? 0);
      t(this, j).style.setProperty("--sp-control-hover-offset", `calc(var(--sp-control-slot-size) * ${u})`);
    });
    n(this, Ss, () => {
      r(this, Et, 0), t(this, rt).forEach((i) => i.classList.remove("is-control-tap-active")), this.style.removeProperty("--sp-touch-control-hover-offset");
    });
    n(this, pe, (i) => {
      if (!(i instanceof PointerEvent) || i.pointerType !== "touch") return;
      const a = i.currentTarget;
      if (!a || !e(this, s, jt).call(this) || e(this, s, Ys).call(this, a)) return;
      const l = Number(a.dataset.spControlIndex ?? 0);
      e(this, s, Xs).call(this), t(this, rt).forEach((u) => u.classList.toggle("is-control-tap-active", u === a)), this.style.setProperty("--sp-touch-control-hover-offset", `calc(var(--sp-control-slot-size) * ${l})`), r(this, Et, window.setTimeout(t(this, Ss), 280));
    });
    n(this, Ms, () => {
      if (t(this, lt) || t(this, h).classList.contains("is-progress-settling")) {
        if (e(this, s, _s).call(this), t(this, xt)) {
          t(this, h).classList.remove("is-progress-settling");
          return;
        }
        r(this, xt, !0), r(this, Ps, performance.now() + t(this, re)), e(this, s, E).call(this) || e(this, s, k).call(this), e(this, s, I).call(this), t(this, h).classList.remove("is-progress-settling"), e(this, s, C).call(this);
      }
    });
    n(this, V, () => {
      if (t(this, o).error) {
        e(this, s, Zt).call(this, !0, !0);
        return;
      }
      e(this, s, Zt).call(this, !t(this, B) || !t(this, N) || t(this, o).readyState < HTMLMediaElement.HAVE_FUTURE_DATA);
    });
    n(this, Yt, () => {
      if (t(this, o).error || t(this, o).readyState < HTMLMediaElement.HAVE_CURRENT_DATA || t(this, o).videoWidth <= 0 || t(this, o).videoHeight <= 0)
        return t(this, V).call(this), !1;
      if (!t(this, $))
        return e(this, s, Pi).call(this), t(this, V).call(this), !1;
      const i = e(this, s, ei).call(this);
      return t(this, M).call(this), i;
    });
    n(this, M, () => {
      if (!this.volumeEnabled) {
        t(this, h).classList.remove("is-volume-unavailable", "is-volume-muted", "is-volume-sound", "is-volume-icon-animating"), t(this, w).disabled = !0, t(this, w).setAttribute("aria-disabled", "true");
        return;
      }
      r(this, y, e(this, s, Vi).call(this));
      const i = !t(this, y) || t(this, o).muted || t(this, o).volume <= 0, a = t(this, y) && !t(this, o).muted ? t(this, o).volume : 0, l = Math.round(a * 100), u = i ? "muted" : "sound";
      t(this, as) && t(this, as) !== u && e(this, s, gi).call(this), r(this, as, u), t(this, h).classList.toggle("is-volume-unavailable", !t(this, y)), t(this, h).classList.toggle("is-volume-muted", i), t(this, h).classList.toggle("is-volume-sound", !i), t(this, h).style.setProperty("--sp-volume-level", `${l}%`), t(this, w).disabled = !t(this, y), t(this, w).setAttribute("aria-disabled", `${!t(this, y)}`), t(this, w).setAttribute(
        "aria-label",
        t(this, y) ? i ? "Unmute video" : "Mute video" : "Video has no audio"
      ), t(this, T).setAttribute("aria-valuenow", `${l}`), t(this, T).setAttribute("aria-valuetext", `${l}%`);
    });
    n(this, At, () => {
      const i = document.pictureInPictureElement === t(this, o), a = t(this, o), l = !!(this.pictureInPictureEnabled && document.pictureInPictureEnabled && a.requestPictureInPicture);
      t(this, h).classList.toggle("is-picture-in-picture", i), t(this, et).disabled = !l, t(this, et).setAttribute("aria-label", i ? "Exit picture in picture" : "Enter picture in picture");
    });
    n(this, Xt, () => {
      const i = e(this, s, js).call(this), a = i === t(this, h) || i === this, l = e(this, s, ni).call(this);
      return t(this, h).classList.toggle("is-fullscreen", a), t(this, it).disabled = !l, t(this, it).setAttribute("aria-label", a ? "Exit fullscreen" : "Enter fullscreen"), a;
    });
    n(this, Lt, () => {
      const i = t(this, Xt).call(this);
      e(this, s, Di).call(this, i);
    });
    n(this, Vs, () => {
      !t(this, R) || t(this, g) || (e(this, s, st).call(this), e(this, s, U).call(this), e(this, s, Ft).call(this), r(this, g, !0), t(this, h).classList.add("is-scrubbing"), r(this, L, e(this, s, bt).call(this, t(this, es), !0)), t(this, ot) && t(this, o).pause(), t(this, o).currentTime = t(this, L), e(this, s, k).call(this, t(this, L)), e(this, s, I).call(this, t(this, L)), e(this, s, Gt).call(this), e(this, s, C).call(this));
    });
    n(this, de, (i) => {
      i.stopPropagation(), r(this, ls, !t(this, ls)), e(this, s, Hi).call(this), e(this, s, E).call(this) || t(this, S) ? t(this, z) && (t(this, z).textContent = e(this, s, Ks).call(this, t(this, L))) : e(this, s, Ot).call(this, e(this, s, mt).call(this));
    });
    n(this, me, async () => {
      if (performance.now() < t(this, ks))
        return;
      const i = t(this, F) ? t(this, F) !== "playing" : t(this, o).paused || t(this, o).ended, a = !i || e(this, s, xi).call(this);
      e(this, s, tt).call(this), a && (r(this, F, i ? "playing" : "paused"), e(this, s, C).call(this)), i ? (e(this, s, st).call(this), await e(this, s, dt).call(this), await t(this, o).play().catch(() => {
        r(this, F, null);
      })) : (e(this, s, Ti).call(this), t(this, o).pause()), e(this, s, C).call(this), e(this, s, Q).call(this);
    });
    n(this, fe, (i) => {
      if (!(i instanceof PointerEvent)) return;
      const a = t(this, Y).getBoundingClientRect(), l = i.clientX >= a.left && i.clientX <= a.right && i.clientY >= a.top && i.clientY <= a.bottom, u = t(this, X).getBoundingClientRect(), f = i.clientX >= u.left && i.clientX <= u.right && i.clientY >= u.top && i.clientY <= u.bottom, v = t(this, m).getBoundingClientRect(), qs = i.clientX >= v.left && i.clientX <= v.right && i.clientY >= v.top && i.clientY <= v.bottom, ps = e(this, s, tt).call(this);
      ps && l && r(this, ks, performance.now() + 260), ps && (f || qs) && r(this, rs, performance.now() + 260), e(this, s, dt).call(this);
    });
    n(this, be, (i) => {
      i.stopPropagation();
    });
    n(this, cs, () => {
      r(this, Pt, 0), !(t(this, ct) || t(this, W)) && t(this, w).classList.remove("is-volume-open");
    });
    n(this, Is, () => {
      e(this, s, A).call(this) || !this.volumeSliderEnabled || !t(this, y) || (r(this, ct, !0), e(this, s, li).call(this));
    });
    n(this, zs, () => {
      e(this, s, A).call(this) || !this.volumeSliderEnabled || !t(this, y) || (r(this, ct, !1), e(this, s, hi).call(this));
    });
    n(this, ve, (i) => {
      !this.volumeEnabled || !t(this, y) || (i.preventDefault(), i.stopPropagation(), !(!e(this, s, jt).call(this) || e(this, s, bs).call(this)) && (e(this, s, tt).call(this), t(this, cs).call(this), t(this, o).muted || t(this, o).volume <= 0 ? (t(this, o).volume <= 0 && (t(this, o).volume = 0.7), t(this, o).muted = !1) : t(this, o).muted = !0, t(this, M).call(this), e(this, s, Q).call(this)));
    });
    n(this, ge, (i) => {
      i instanceof PointerEvent && (!this.volumeEnabled || !this.volumeSliderEnabled || !t(this, y) || e(this, s, A).call(this) || (i.preventDefault(), i.stopPropagation(), e(this, s, tt).call(this), e(this, s, U).call(this), e(this, s, li).call(this), r(this, W, !0), r(this, x, i.pointerId), t(this, Z).classList.add("is-scrubbing-volume"), t(this, T).setPointerCapture(i.pointerId), e(this, s, oi).call(this, i.clientY)));
    });
    n(this, ye, (i) => {
      i instanceof PointerEvent && t(this, W) && (t(this, x) !== null && i.pointerId !== t(this, x) || (i.preventDefault(), i.stopPropagation(), e(this, s, oi).call(this, i.clientY)));
    });
    n(this, we, (i) => {
      i instanceof PointerEvent && (t(this, x) !== null && i.pointerId !== t(this, x) || (i.stopPropagation(), e(this, s, Jt).call(this, i.pointerId), e(this, s, Q).call(this)));
    });
    n(this, xe, (i) => {
      i instanceof PointerEvent && (t(this, x) !== null && i.pointerId !== t(this, x) || (i.stopPropagation(), e(this, s, Jt).call(this, i.pointerId)));
    });
    n(this, ke, (i) => {
      if (!(i instanceof KeyboardEvent) || !this.volumeEnabled || !t(this, y) || !["ArrowUp", "ArrowDown", "Home", "End"].includes(i.key)) return;
      i.preventDefault(), i.stopPropagation();
      const a = i.shiftKey ? 0.1 : 0.05, l = i.key === "Home" ? 0 : i.key === "End" ? 1 : t(this, o).volume + (i.key === "ArrowUp" ? a : -a);
      t(this, o).volume = Math.min(1, Math.max(0, l)), t(this, o).muted = t(this, o).volume <= 0, t(this, M).call(this);
    });
    n(this, Pe, async () => {
      const i = t(this, o);
      if (!(!this.pictureInPictureEnabled || !document.pictureInPictureEnabled || !i.requestPictureInPicture) && !(!e(this, s, jt).call(this) || e(this, s, bs).call(this))) {
        e(this, s, tt).call(this);
        try {
          await e(this, s, dt).call(this), document.pictureInPictureElement === t(this, o) ? await document.exitPictureInPicture() : await i.requestPictureInPicture();
        } catch {
        } finally {
          t(this, At).call(this), e(this, s, Q).call(this);
        }
      }
    });
    n(this, Te, async (i) => {
      if (e(this, s, ni).call(this) && (i.preventDefault(), i.stopPropagation(), !(!e(this, s, jt).call(this) || e(this, s, bs).call(this)))) {
        e(this, s, Wt).call(this, i), e(this, s, tt).call(this);
        try {
          const a = e(this, s, js).call(this);
          a === t(this, h) || a === this ? await e(this, s, Ri).call(this) : (await e(this, s, dt).call(this), Zi(t(this, h)) ? await e(this, s, Ii).call(this) : e(this, s, zi).call(this));
        } catch {
        } finally {
          t(this, Xt).call(this), e(this, s, Q).call(this);
        }
      }
    });
    n(this, Rs, (i) => {
      e(this, s, A).call(this) || e(this, s, E).call(this) || !(i instanceof PointerEvent) && !(i instanceof MouseEvent) || (r(this, S, !0), t(this, h).classList.add("is-progress-hovering"), e(this, s, bt).call(this, i.clientX, !1, !1));
    });
    n(this, Ds, () => {
      e(this, s, E).call(this) || e(this, s, Ze).call(this);
    });
    n(this, Ee, (i) => {
      if (i instanceof PointerEvent) {
        if (i.preventDefault(), !e(this, s, jt).call(this) || e(this, s, bs).call(this)) {
          e(this, s, tt).call(this), e(this, s, A).call(this) && r(this, rs, performance.now() + 260);
          return;
        }
        e(this, s, tt).call(this), e(this, s, U).call(this), t(this, Ms).call(this), r(this, _, !1), r(this, gt, !1), e(this, s, Li).call(this, e(this, s, mt).call(this)), r(this, R, !0), r(this, P, i.pointerId), r(this, es, i.clientX), r(this, ot, !t(this, o).paused && !t(this, o).ended), t(this, m).setPointerCapture(i.pointerId), r(this, L, e(this, s, bt).call(this, i.clientX, !1)), e(this, s, Ft).call(this), r(this, Vt, window.setTimeout(t(this, Vs), t(this, se)));
      }
    });
    n(this, Ce, (i) => {
      if (!(i instanceof KeyboardEvent) || !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0 || !["ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"].includes(i.key)) return;
      i.preventDefault(), i.stopPropagation(), t(this, Ls).call(this);
      const a = e(this, s, mt).call(this), l = i.shiftKey ? 10 : 5, u = Math.max(10, t(this, o).duration * 0.1), f = i.key === "Home" ? 0 : i.key === "End" ? t(this, o).duration : i.key === "PageUp" ? a + u : i.key === "PageDown" ? a - u : a + (i.key === "ArrowRight" ? l : -l);
      t(this, o).currentTime = Math.min(t(this, o).duration, Math.max(0, f)), e(this, s, k).call(this, t(this, o).currentTime), e(this, s, I).call(this, t(this, o).currentTime);
    });
    n(this, Ae, (i) => {
      if (i instanceof PointerEvent) {
        if (!t(this, R)) {
          e(this, s, A).call(this) || (r(this, S, !0), t(this, h).classList.add("is-progress-hovering"), e(this, s, bt).call(this, i.clientX, !1, !1));
          return;
        }
        t(this, P) !== null && i.pointerId !== t(this, P) || (!t(this, g) && Math.abs(i.clientX - t(this, es)) >= t(this, Js) && t(this, Vs).call(this), t(this, g) && r(this, L, e(this, s, bt).call(this, i.clientX)));
      }
    });
    n(this, Le, (i) => {
      i instanceof PointerEvent && (t(this, P) !== null && i.pointerId !== t(this, P) || e(this, s, ai).call(this, i.clientX, i.pointerId, !0));
    });
    n(this, Fe, (i) => {
      i instanceof PointerEvent && (t(this, P) !== null && i.pointerId !== t(this, P) || e(this, s, Os).call(this, i.pointerId));
    });
    n(this, Se, (i) => {
      if (i instanceof PointerEvent) {
        if (t(this, x) !== null && i.pointerId === t(this, x)) {
          e(this, s, Jt).call(this, i.pointerId);
          return;
        }
        t(this, P) === null || i.pointerId !== t(this, P) || e(this, s, ai).call(this, i.clientX, i.pointerId, !0);
      }
    });
    n(this, Me, (i) => {
      if (i instanceof PointerEvent) {
        if (t(this, x) !== null && i.pointerId === t(this, x)) {
          e(this, s, Jt).call(this, i.pointerId);
          return;
        }
        t(this, P) === null || i.pointerId !== t(this, P) || e(this, s, Os).call(this, i.pointerId);
      }
    });
    n(this, Ve, () => {
      e(this, s, Jt).call(this, t(this, x)), e(this, s, Os).call(this, t(this, P));
    });
    n(this, Ie, () => {
      e(this, s, js).call(this) || e(this, s, fs).call(this);
    });
    n(this, ze, () => {
      r(this, F, null), e(this, s, st).call(this), e(this, s, E).call(this) || e(this, s, k).call(this), e(this, s, C).call(this);
    });
    n(this, Re, () => {
      r(this, F, null), e(this, s, E).call(this) || e(this, s, ri).call(this), t(this, V).call(this), e(this, s, C).call(this);
    });
    n(this, De, () => {
      r(this, F, null), e(this, s, st).call(this), e(this, s, E).call(this) || e(this, s, k).call(this), e(this, s, C).call(this);
    });
    n(this, qe, () => {
      e(this, s, Zt).call(this, !0, !0);
    });
    n(this, us, () => {
      e(this, s, Zt).call(this, !0);
    });
    n(this, He, () => {
      e(this, s, st).call(this), r(this, y, !0), t(this, M).call(this), e(this, s, E).call(this) || e(this, s, k).call(this), t(this, V).call(this), e(this, s, I).call(this);
    });
    n(this, Be, () => {
      const i = t(this, Yt).call(this);
      t(this, M).call(this), i && !e(this, s, E).call(this) && e(this, s, k).call(this), e(this, s, C).call(this);
    });
    n(this, $e, () => {
      if (e(this, s, st).call(this), t(this, V).call(this), t(this, _) && (!t(this, gt) || t(this, o).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA)) {
        e(this, s, si).call(this), e(this, s, C).call(this);
        return;
      }
      e(this, s, E).call(this) || e(this, s, k).call(this), e(this, s, I).call(this);
    });
    n(this, Ne, () => {
      r(this, F, null), r(this, $, !1), r(this, N, !1), r(this, O, !1), r(this, K, !1), r(this, G, t(this, G) + 1), t(this, h).classList.remove("has-visible-frame"), e(this, s, Zt).call(this, !0, !0), e(this, s, C).call(this), e(this, s, ki).call(this);
    });
    n(this, Ue, () => {
      t(this, M).call(this), e(this, s, I).call(this);
    });
    n(this, Ye, () => {
      t(this, M).call(this);
    });
    r(this, b, this.attachShadow({ mode: "open" })), t(this, b).append(mi.content.cloneNode(!0));
  }
  get src() {
    return this.getAttribute("src") ?? "";
  }
  set src(i) {
    e(this, s, Hs).call(this, "src", i);
  }
  get aspectRatio() {
    return this.getAttribute("aspect-ratio") || di;
  }
  set aspectRatio(i) {
    e(this, s, Hs).call(this, "aspect-ratio", i);
  }
  get preloadMargin() {
    return this.getAttribute("preload-margin") || Yi;
  }
  set preloadMargin(i) {
    e(this, s, Hs).call(this, "preload-margin", i);
  }
  get autoplayEnabled() {
    return !this.hasAttribute("disable-autoplay") && !this.hasAttribute("no-autoplay");
  }
  set autoplayEnabled(i) {
    if (i) {
      this.removeAttribute("disable-autoplay"), this.removeAttribute("no-autoplay");
      return;
    }
    this.setAttribute("disable-autoplay", "");
  }
  get controlsEnabled() {
    return this.hasAttribute("controls");
  }
  set controlsEnabled(i) {
    if (i) {
      this.setAttribute("controls", "");
      return;
    }
    this.removeAttribute("controls");
  }
  get timeVisible() {
    return this.hasAttribute("show-time");
  }
  set timeVisible(i) {
    if (i) {
      this.setAttribute("show-time", "");
      return;
    }
    this.removeAttribute("show-time");
  }
  get volumeEnabled() {
    return this.controlsEnabled && !this.hasAttribute("disable-volume") && !this.hasAttribute("no-volume");
  }
  set volumeEnabled(i) {
    e(this, s, Bs).call(this, "volume", i);
  }
  get volumeSliderEnabled() {
    return !this.hasAttribute("disable-volume-slider") && !this.hasAttribute("no-volume-slider");
  }
  set volumeSliderEnabled(i) {
    if (i) {
      this.removeAttribute("disable-volume-slider"), this.removeAttribute("no-volume-slider");
      return;
    }
    this.setAttribute("disable-volume-slider", "");
  }
  get pictureInPictureEnabled() {
    return this.controlsEnabled && !this.hasAttribute("disable-picture-in-picture") && !this.hasAttribute("no-picture-in-picture");
  }
  set pictureInPictureEnabled(i) {
    e(this, s, Bs).call(this, "picture-in-picture", i);
  }
  get fullscreenEnabled() {
    return this.controlsEnabled && !this.hasAttribute("disable-fullscreen") && !this.hasAttribute("no-fullscreen");
  }
  set fullscreenEnabled(i) {
    e(this, s, Bs).call(this, "fullscreen", i);
  }
  connectedCallback() {
    r(this, h, t(this, b).querySelector("[data-sp-player]")), r(this, o, t(this, b).querySelector("[data-sp-video]")), r(this, Y, t(this, b).querySelector("[data-sp-button]")), r(this, m, t(this, b).querySelector("[data-sp-progress-track]")), r(this, X, t(this, b).querySelector("[data-sp-control-tray]")), r(this, j, t(this, b).querySelector("[data-sp-control-tray-slots]")), r(this, Gs, t(this, b).querySelector("[data-sp-tray-time]")), r(this, z, t(this, b).querySelector("[data-sp-tray-time-text]")), r(this, ss, t(this, b).querySelector("[data-sp-time]")), r(this, xs, t(this, b).querySelector("[data-sp-time-text]")), r(this, w, t(this, b).querySelector("[data-sp-volume-control]")), r(this, Z, t(this, b).querySelector("[data-sp-volume-popover]")), r(this, T, t(this, b).querySelector("[data-sp-volume-track]")), r(this, et, t(this, b).querySelector("[data-sp-picture-in-picture-control]")), r(this, it, t(this, b).querySelector("[data-sp-fullscreen-control]")), r(this, rt, [t(this, w), t(this, et), t(this, it)]), e(this, s, _e).call(this), t(this, ts) || (e(this, s, bi).call(this), r(this, ts, !0)), e(this, s, ds).call(this), e(this, s, Ns).call(this), e(this, s, We).call(this), e(this, s, $s).call(this), t(this, V).call(this), t(this, M).call(this), t(this, At).call(this), t(this, Xt).call(this), e(this, s, C).call(this);
  }
  disconnectedCallback() {
    t(this, H)?.disconnect(), r(this, H, null), t(this, Qt).forEach((i) => i()), r(this, Qt, []), r(this, ts, !1), e(this, s, U).call(this), e(this, s, Ge).call(this), e(this, s, vs).call(this), e(this, s, _s).call(this), e(this, s, Ft).call(this), e(this, s, gs).call(this), e(this, s, ws).call(this), e(this, s, Je).call(this), e(this, s, Xs).call(this), t(this, h).classList.remove("is-volume-icon-animating"), t(this, j).style.removeProperty("--sp-control-hover-offset"), this.style.removeProperty("--sp-touch-control-hover-offset"), e(this, s, Kt).call(this), r(this, S, !1), t(this, h).classList.remove("is-progress-hovering"), r(this, W, !1), r(this, ct, !1), r(this, J, !1), r(this, x, null), t(this, w).classList.remove("is-volume-open"), t(this, rt).forEach((i) => i.classList.remove("is-control-tap-active")), t(this, h).classList.remove("is-pointer-active"), e(this, s, Gt).call(this);
  }
  attributeChangedCallback(i, a, l) {
    if (a !== l) {
      if (i === "aspect-ratio") {
        e(this, s, _e).call(this);
        return;
      }
      if (i === "preload-margin" && this.isConnected) {
        t(this, H)?.disconnect(), e(this, s, Ns).call(this);
        return;
      }
      if (i === "src" && this.isConnected) {
        e(this, s, Bi).call(this), e(this, s, Ns).call(this);
        return;
      }
      if ((i === "disable-autoplay" || i === "no-autoplay") && this.isConnected) {
        e(this, s, ds).call(this), t(this, M).call(this), e(this, s, C).call(this);
        return;
      }
      if (i === "show-time" && this.isConnected) {
        e(this, s, $s).call(this);
        return;
      }
      (i === "controls" || i.startsWith("enable-") || i.startsWith("disable-") || i.startsWith("no-")) && this.isConnected && (e(this, s, We).call(this), t(this, M).call(this), t(this, At).call(this), t(this, Xt).call(this), e(this, s, $s).call(this));
    }
  }
}
b = new WeakMap(), Qt = new WeakMap(), H = new WeakMap(), ts = new WeakMap(), B = new WeakMap(), h = new WeakMap(), o = new WeakMap(), Y = new WeakMap(), m = new WeakMap(), X = new WeakMap(), j = new WeakMap(), Gs = new WeakMap(), z = new WeakMap(), ss = new WeakMap(), xs = new WeakMap(), w = new WeakMap(), Z = new WeakMap(), T = new WeakMap(), et = new WeakMap(), it = new WeakMap(), rt = new WeakMap(), vt = new WeakMap(), g = new WeakMap(), R = new WeakMap(), ot = new WeakMap(), L = new WeakMap(), St = new WeakMap(), nt = new WeakMap(), Mt = new WeakMap(), _ = new WeakMap(), gt = new WeakMap(), es = new WeakMap(), Vt = new WeakMap(), P = new WeakMap(), F = new WeakMap(), is = new WeakMap(), at = new WeakMap(), yt = new WeakMap(), wt = new WeakMap(), lt = new WeakMap(), ks = new WeakMap(), rs = new WeakMap(), $ = new WeakMap(), N = new WeakMap(), O = new WeakMap(), K = new WeakMap(), G = new WeakMap(), It = new WeakMap(), xt = new WeakMap(), Ps = new WeakMap(), zt = new WeakMap(), Ts = new WeakMap(), Es = new WeakMap(), kt = new WeakMap(), D = new WeakMap(), ht = new WeakMap(), Rt = new WeakMap(), S = new WeakMap(), y = new WeakMap(), J = new WeakMap(), os = new WeakMap(), ns = new WeakMap(), Dt = new WeakMap(), W = new WeakMap(), ct = new WeakMap(), x = new WeakMap(), Pt = new WeakMap(), Tt = new WeakMap(), Et = new WeakMap(), as = new WeakMap(), ls = new WeakMap(), Ct = new WeakMap(), Js = new WeakMap(), Qs = new WeakMap(), hs = new WeakMap(), te = new WeakMap(), se = new WeakMap(), Cs = new WeakMap(), qt = new WeakMap(), ee = new WeakMap(), ie = new WeakMap(), re = new WeakMap(), oe = new WeakMap(), ne = new WeakMap(), ae = new WeakMap(), Ht = new WeakMap(), le = new WeakMap(), he = new WeakMap(), s = new WeakSet(), Hs = function(i, a) {
  if (a === "") {
    this.removeAttribute(i);
    return;
  }
  this.setAttribute(i, a);
}, Bs = function(i, a) {
  if (a) {
    this.setAttribute(`enable-${i}`, ""), this.removeAttribute(`disable-${i}`), this.removeAttribute(`no-${i}`);
    return;
  }
  this.removeAttribute(`enable-${i}`), this.setAttribute(`disable-${i}`, "");
}, _e = function() {
  this.style.setProperty("--simple-player-aspect-ratio", this.aspectRatio);
}, ds = function() {
  if (!t(this, o)) return;
  const i = this.autoplayEnabled;
  if (t(this, o).autoplay = i, i) {
    t(this, o).muted = !0, t(this, o).setAttribute("autoplay", ""), t(this, o).setAttribute("muted", "");
    return;
  }
  t(this, o).removeAttribute("autoplay"), t(this, B) || (t(this, o).muted = !1, t(this, o).removeAttribute("muted"));
}, We = function() {
  if (!t(this, h)) return;
  const i = [
    { button: t(this, w), enabled: this.volumeEnabled, className: "has-volume-control" },
    { button: t(this, et), enabled: this.pictureInPictureEnabled, className: "has-picture-in-picture-control" },
    { button: t(this, it), enabled: this.fullscreenEnabled, className: "has-fullscreen-control" }
  ];
  let a = 0;
  for (const l of i)
    t(this, h).classList.toggle(l.className, l.enabled), l.button.hidden = !l.enabled, l.enabled ? (l.button.dataset.spControlIndex = `${a}`, a += 1) : delete l.button.dataset.spControlIndex;
  this.style.setProperty("--sp-enabled-controls-count", `${a}`), this.style.setProperty("--sp-control-tray-display", a > 0 ? "block" : "none"), t(this, h).classList.toggle("has-volume-slider-control", this.volumeEnabled && this.volumeSliderEnabled), (!this.volumeEnabled || !this.volumeSliderEnabled) && (t(this, cs).call(this), e(this, s, Ws).call(this, t(this, x)), r(this, W, !1), r(this, ct, !1), t(this, Z).classList.remove("is-scrubbing-volume")), t(this, j).style.removeProperty("--sp-control-hover-offset");
}, _t = function() {
  return this.timeVisible && this.controlsEnabled;
}, $s = function() {
  t(this, h) && (t(this, h).classList.toggle("has-pinned-time", t(this, s, _t)), t(this, s, _t) && e(this, s, Ot).call(this));
}, bi = function() {
  e(this, s, c).call(this, t(this, Y), "click", t(this, me)), e(this, s, c).call(this, this, "pointerenter", t(this, $t)), e(this, s, c).call(this, this, "pointermove", t(this, Nt)), e(this, s, c).call(this, this, "pointerleave", t(this, Ut)), e(this, s, c).call(this, this, "mouseenter", t(this, $t)), e(this, s, c).call(this, this, "mousemove", t(this, Nt)), e(this, s, c).call(this, this, "mouseleave", t(this, Ut)), e(this, s, c).call(this, t(this, h), "pointerenter", t(this, $t)), e(this, s, c).call(this, t(this, h), "pointermove", t(this, Nt)), e(this, s, c).call(this, t(this, h), "pointerleave", t(this, Ut)), e(this, s, c).call(this, t(this, h), "mouseenter", t(this, $t)), e(this, s, c).call(this, t(this, h), "mousemove", t(this, Nt)), e(this, s, c).call(this, t(this, h), "mouseleave", t(this, Ut)), e(this, s, c).call(this, t(this, Y), "pointerenter", t(this, ut)), e(this, s, c).call(this, t(this, Y), "pointerleave", t(this, pt)), e(this, s, c).call(this, t(this, Y), "mouseenter", t(this, ut)), e(this, s, c).call(this, t(this, Y), "mouseleave", t(this, pt)), e(this, s, c).call(this, t(this, m), "pointerenter", t(this, ut)), e(this, s, c).call(this, t(this, m), "pointerleave", t(this, pt)), e(this, s, c).call(this, t(this, m), "mouseenter", t(this, ut)), e(this, s, c).call(this, t(this, m), "mouseleave", t(this, pt)), e(this, s, c).call(this, t(this, m), "pointerenter", t(this, Rs)), e(this, s, c).call(this, t(this, m), "pointerleave", t(this, Ds)), e(this, s, c).call(this, t(this, m), "mouseenter", t(this, Rs)), e(this, s, c).call(this, t(this, m), "mouseleave", t(this, Ds)), e(this, s, c).call(this, t(this, X), "pointerenter", t(this, ut)), e(this, s, c).call(this, t(this, X), "pointerleave", t(this, pt)), e(this, s, c).call(this, t(this, X), "mouseenter", t(this, ut)), e(this, s, c).call(this, t(this, X), "mouseleave", t(this, pt)), e(this, s, c).call(this, t(this, b), "focusin", t(this, Ls)), e(this, s, c).call(this, t(this, b), "focusout", t(this, ue)), e(this, s, c).call(this, t(this, h), "pointerdown", t(this, fe)), e(this, s, c).call(this, t(this, h), "dragstart", t(this, Bt)), e(this, s, c).call(this, t(this, h), "selectstart", t(this, Bt)), e(this, s, c).call(this, t(this, o), "dragstart", t(this, Bt)), e(this, s, c).call(this, t(this, o), "selectstart", t(this, Bt)), e(this, s, c).call(this, t(this, m), "pointerdown", t(this, Ee)), e(this, s, c).call(this, t(this, m), "pointermove", t(this, Ae)), e(this, s, c).call(this, t(this, m), "pointerup", t(this, Le)), e(this, s, c).call(this, t(this, m), "pointercancel", t(this, Fe)), e(this, s, c).call(this, t(this, m), "keydown", t(this, Ce)), e(this, s, c).call(this, t(this, w), "pointerenter", t(this, Is)), e(this, s, c).call(this, t(this, w), "pointerleave", t(this, zs)), e(this, s, c).call(this, t(this, w), "click", t(this, ve)), e(this, s, c).call(this, t(this, Z), "pointerenter", t(this, Is)), e(this, s, c).call(this, t(this, Z), "pointerleave", t(this, zs)), e(this, s, c).call(this, t(this, T), "pointerdown", t(this, ge)), e(this, s, c).call(this, t(this, T), "pointermove", t(this, ye)), e(this, s, c).call(this, t(this, T), "pointerup", t(this, we)), e(this, s, c).call(this, t(this, T), "pointercancel", t(this, xe)), e(this, s, c).call(this, t(this, T), "click", t(this, be)), e(this, s, c).call(this, t(this, T), "keydown", t(this, ke)), e(this, s, c).call(this, t(this, et), "click", t(this, Pe)), e(this, s, c).call(this, t(this, it), "click", t(this, Te)), e(this, s, c).call(this, t(this, z), "click", t(this, de));
  for (const i of t(this, rt))
    e(this, s, c).call(this, i, "pointerenter", t(this, Fs)), e(this, s, c).call(this, i, "mouseenter", t(this, Fs)), e(this, s, c).call(this, i, "pointerdown", t(this, pe));
  e(this, s, c).call(this, document, "pointerup", t(this, Se)), e(this, s, c).call(this, document, "pointercancel", t(this, Me)), e(this, s, c).call(this, document, "pointermove", t(this, As)), e(this, s, c).call(this, document, "mousemove", t(this, As)), e(this, s, c).call(this, document, "fullscreenchange", t(this, Lt)), e(this, s, c).call(this, document, "webkitfullscreenchange", t(this, Lt)), e(this, s, c).call(this, document, "mozfullscreenchange", t(this, Lt)), e(this, s, c).call(this, document, "MSFullscreenChange", t(this, Lt)), e(this, s, c).call(this, t(this, b), "fullscreenchange", t(this, Lt)), e(this, s, c).call(this, window, "blur", t(this, Ve)), e(this, s, c).call(this, window, "focus", t(this, Ie)), e(this, s, c).call(this, t(this, o), "play", t(this, ze)), e(this, s, c).call(this, t(this, o), "pause", t(this, Re)), e(this, s, c).call(this, t(this, o), "ended", t(this, De)), e(this, s, c).call(this, t(this, o), "loadstart", t(this, qe)), e(this, s, c).call(this, t(this, o), "waiting", t(this, us)), e(this, s, c).call(this, t(this, o), "stalled", t(this, us)), e(this, s, c).call(this, t(this, o), "seeking", t(this, us)), e(this, s, c).call(this, t(this, o), "loadeddata", t(this, Yt)), e(this, s, c).call(this, t(this, o), "loadedmetadata", t(this, He)), e(this, s, c).call(this, t(this, o), "canplay", t(this, Yt)), e(this, s, c).call(this, t(this, o), "canplaythrough", t(this, Yt)), e(this, s, c).call(this, t(this, o), "playing", t(this, Be)), e(this, s, c).call(this, t(this, o), "seeked", t(this, $e)), e(this, s, c).call(this, t(this, o), "error", t(this, Ne)), e(this, s, c).call(this, t(this, o), "progress", t(this, V)), e(this, s, c).call(this, t(this, o), "suspend", t(this, V)), e(this, s, c).call(this, t(this, o), "timeupdate", t(this, Ue)), e(this, s, c).call(this, t(this, o), "volumechange", t(this, Ye)), e(this, s, c).call(this, t(this, o), "enterpictureinpicture", t(this, At)), e(this, s, c).call(this, t(this, o), "leavepictureinpicture", t(this, At));
}, c = function(i, a, l) {
  i.addEventListener(a, l), t(this, Qt).push(() => i.removeEventListener(a, l));
}, Ns = function() {
  if (!(!this.src || t(this, B))) {
    if (t(this, H)?.disconnect(), t(this, o).dataset.src = this.src, "IntersectionObserver" in window) {
      r(this, H, new IntersectionObserver((i, a) => {
        i.some((l) => l.isIntersecting) && (a.disconnect(), r(this, H, null), e(this, s, dt).call(this));
      }, { rootMargin: this.preloadMargin })), t(this, H).observe(t(this, h));
      return;
    }
    e(this, s, dt).call(this);
  }
}, Bt = new WeakMap(), U = function() {
  t(this, yt) && (window.clearTimeout(t(this, yt)), r(this, yt, 0));
}, ce = new WeakMap(), ms = function(i = e(this, s, A).call(this) ? t(this, Cs) : t(this, qt)) {
  e(this, s, U).call(this), r(this, yt, window.setTimeout(t(this, ce), i));
}, Q = function() {
  e(this, s, A).call(this) && e(this, s, ms).call(this, t(this, Cs));
}, tt = function() {
  if (!e(this, s, A).call(this)) return !1;
  const i = t(this, h).classList.contains("is-controls-visible");
  return t(this, h).classList.add("is-controls-visible"), e(this, s, Q).call(this), !i;
}, Us = function(i = !1) {
  !i && e(this, s, A).call(this) || (t(this, h).classList.add("is-pointer-active"), t(this, J) ? e(this, s, U).call(this) : e(this, s, ms).call(this, i ? t(this, qt) : void 0));
}, fs = function() {
  r(this, J, !1), e(this, s, U).call(this), t(this, h).classList.remove("is-pointer-active");
}, Wt = function(i) {
  return i instanceof PointerEvent ? (r(this, Dt, i.pointerType === "touch"), t(this, Dt) ? !1 : (r(this, os, i.clientX), r(this, ns, i.clientY), !0)) : i instanceof MouseEvent ? (r(this, Dt, !1), r(this, os, i.clientX), r(this, ns, i.clientY), !0) : !1;
}, vi = function(i, a) {
  if (i === null || a === null || i < 0 || a < 0 || i > window.innerWidth || a > window.innerHeight) return !1;
  const l = this.getBoundingClientRect();
  return l.width <= 0 || l.height <= 0 ? !1 : i >= l.left && i <= l.right && a >= l.top && a <= l.bottom;
}, je = function(i, a, l) {
  if (!i) return !1;
  const u = i.getBoundingClientRect();
  return u.width <= 0 || u.height <= 0 ? !1 : a >= u.left && a <= u.right && l >= u.top && l <= u.bottom;
}, Ze = function() {
  t(this, S) && (r(this, S, !1), t(this, h).classList.remove("is-progress-hovering"), e(this, s, Kt).call(this), e(this, s, Ot).call(this));
}, Oe = function(i, a) {
  if (e(this, s, A).call(this)) return;
  !e(this, s, E).call(this) && e(this, s, je).call(this, t(this, m), i, a) ? (r(this, S, !0), t(this, h).classList.add("is-progress-hovering"), e(this, s, bt).call(this, i, !1, !1)) : e(this, s, E).call(this) || e(this, s, Ze).call(this);
  const l = t(this, rt).find((f) => !f.hidden && !e(this, s, Ys).call(this, f) && e(this, s, je).call(this, f, i, a)) ?? null;
  if (!l) return;
  const u = Number(l.dataset.spControlIndex ?? 0);
  t(this, j).style.setProperty("--sp-control-hover-offset", `calc(var(--sp-control-slot-size) * ${u})`);
}, jt = function() {
  return t(this, h).classList.contains("is-controls-visible") || t(this, h).classList.contains("is-pointer-active") || t(this, b).activeElement instanceof HTMLElement;
}, bs = function() {
  return e(this, s, A).call(this) && performance.now() < t(this, rs);
}, Ys = function(i) {
  return i instanceof HTMLButtonElement && (i.disabled || i === t(this, w) && (!this.volumeEnabled || !t(this, y)));
}, Ke = function() {
  if (!t(this, Dt) && e(this, s, vi).call(this, t(this, os), t(this, ns))) {
    e(this, s, Us).call(this, !0);
    return;
  }
  e(this, s, fs).call(this);
}, $t = new WeakMap(), Nt = new WeakMap(), As = new WeakMap(), Ut = new WeakMap(), ut = new WeakMap(), pt = new WeakMap(), Ls = new WeakMap(), ue = new WeakMap(), Fs = new WeakMap(), Xs = function() {
  t(this, Et) && (window.clearTimeout(t(this, Et)), r(this, Et, 0));
}, Ss = new WeakMap(), pe = new WeakMap(), Ge = function() {
  t(this, wt) && (window.clearTimeout(t(this, wt)), r(this, wt, 0));
}, vs = function() {
  t(this, at) && (window.clearTimeout(t(this, at)), r(this, at, 0));
}, _s = function() {
  t(this, lt) && (window.clearTimeout(t(this, lt)), r(this, lt, 0));
}, gs = function() {
  t(this, It) && (window.clearTimeout(t(this, It)), r(this, It, 0));
}, Je = function() {
  t(this, Tt) && (window.clearTimeout(t(this, Tt)), r(this, Tt, 0));
}, gi = function() {
  e(this, s, Je).call(this), t(this, h).classList.remove("is-volume-icon-animating"), t(this, w).offsetWidth, t(this, h).classList.add("is-volume-icon-animating"), r(this, Tt, window.setTimeout(() => {
    r(this, Tt, 0), t(this, h).classList.remove("is-volume-icon-animating");
  }, 240));
}, Ms = new WeakMap(), yi = function() {
  t(this, xt) || t(this, lt) || (t(this, h).classList.add("is-progress-settling"), e(this, s, ft).call(this, 0), r(this, lt, window.setTimeout(t(this, Ms), t(this, ie))));
}, dt = async function() {
  if (t(this, B)) return;
  const i = t(this, o).dataset.src || this.src;
  i && (e(this, s, vs).call(this), e(this, s, gs).call(this), r(this, is, t(this, is) + 1), r(this, B, !0), r(this, $, !1), r(this, N, !1), r(this, O, !1), r(this, K, !1), r(this, G, t(this, G) + 1), t(this, h).classList.remove("has-visible-frame"), e(this, s, ds).call(this), t(this, o).src = i, t(this, o).preload = "auto", t(this, o).load(), t(this, o).autoplay && t(this, o).muted && await t(this, o).play().catch(() => {
  }));
}, Qe = function() {
  return !t(this, o).loop || t(this, o).paused || !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0 ? !1 : t(this, o).currentTime < 0.28 || t(this, o).duration - t(this, o).currentTime < 0.28;
}, wi = function(i = t(this, o).currentTime) {
  if (!Number.isFinite(i)) return 0;
  const a = Math.max(0, i);
  try {
    for (let l = 0; l < t(this, o).buffered.length; l += 1) {
      const u = t(this, o).buffered.start(l), f = t(this, o).buffered.end(l);
      if (a + t(this, Ht) >= u && a <= f + t(this, Ht))
        return Math.max(0, f - a);
    }
  } catch {
    return 0;
  }
  return 0;
}, ti = function(i = t(this, ae)) {
  if (!t(this, B) || t(this, o).error || !t(this, h).classList.contains("has-loaded-once") || !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) return !1;
  const a = Math.max(0, t(this, o).duration - t(this, o).currentTime), l = Math.min(i, a);
  return l <= t(this, Ht) || e(this, s, wi).call(this) + t(this, Ht) >= l;
}, Zt = function(i, a = !1) {
  e(this, s, Ge).call(this);
  const l = i && !e(this, s, Qe).call(this) && !e(this, s, ti).call(this), f = i && !t(this, N) || l;
  if (r(this, zt, f), !f) {
    t(this, h).classList.remove("is-loading");
    return;
  }
  if (a) {
    t(this, h).classList.add("is-loading");
    return;
  }
  r(this, wt, window.setTimeout(() => {
    if (r(this, wt, 0), !t(this, N) || !e(this, s, Qe).call(this) && !e(this, s, ti).call(this)) {
      r(this, zt, !0), t(this, h).classList.add("is-loading");
      return;
    }
    r(this, zt, !1), t(this, h).classList.remove("is-loading");
  }, t(this, ee)));
}, V = new WeakMap(), xi = function() {
  return t(this, B) && !t(this, o).error && t(this, $) && (t(this, o).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA || t(this, o).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !t(this, h).classList.contains("is-loading"));
}, E = function() {
  return t(this, R) || t(this, g) || t(this, _);
}, ki = function() {
  t(this, is) >= t(this, ne) || t(this, at) || r(this, at, window.setTimeout(() => {
    r(this, at, 0), e(this, s, gs).call(this), r(this, B, !1), r(this, $, !1), r(this, N, !1), r(this, O, !1), r(this, K, !1), r(this, G, t(this, G) + 1), t(this, h).classList.remove("has-visible-frame"), t(this, h).classList.contains("has-loaded-once") || e(this, s, ft).call(this, 0), t(this, o).removeAttribute("src"), t(this, o).load(), e(this, s, dt).call(this);
  }, t(this, oe)));
}, si = function() {
  return t(this, _) ? (r(this, _, !1), r(this, gt, !1), e(this, s, k).call(this), e(this, s, I).call(this), !0) : !1;
}, ei = function() {
  return e(this, s, vs).call(this), !t(this, h).classList.contains("has-loaded-once") && e(this, s, yi).call(this), t(this, h).classList.add("has-loaded-once"), t(this, h).classList.add("has-visible-frame"), t(this, V).call(this), r(this, F, null), t(this, _) ? (e(this, s, si).call(this), !0) : (e(this, s, E).call(this) || e(this, s, k).call(this), e(this, s, I).call(this), !0);
}, Pi = function() {
  if (t(this, $) || t(this, O) || t(this, o).error) return;
  r(this, O, !0);
  const i = t(this, G), a = () => {
    if (i === t(this, G)) {
      if (e(this, s, gs).call(this), r(this, O, !1), r(this, $, !t(this, o).error && t(this, o).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && t(this, o).videoWidth > 0 && t(this, o).videoHeight > 0), t(this, $)) {
        if (t(this, K) || t(this, N)) return;
        r(this, K, !0), window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            i === t(this, G) && (r(this, K, !1), r(this, N, !0), e(this, s, ei).call(this), e(this, s, C).call(this));
          });
        }), e(this, s, C).call(this);
        return;
      }
      t(this, V).call(this);
    }
  };
  if ("requestVideoFrameCallback" in t(this, o)) {
    t(this, o).requestVideoFrameCallback(a), r(this, It, window.setTimeout(a, 180));
    return;
  }
  window.requestAnimationFrame(a);
}, Yt = new WeakMap(), ii = function() {
  return !t(this, o).paused && (!t(this, o).ended || t(this, o).loop) && t(this, o).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
}, k = function(i = t(this, o).currentTime) {
  r(this, Ts, Number.isFinite(i) ? Math.max(0, i) : 0), r(this, Es, performance.now());
}, st = function() {
  r(this, D, null), r(this, ht, null);
}, ri = function() {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) {
    r(this, D, null);
    return;
  }
  const i = Number.isFinite(t(this, o).currentTime) ? Math.max(0, t(this, o).currentTime) : 0, a = Number.isFinite(t(this, kt)) ? t(this, kt) : i;
  r(this, D, Math.min(t(this, o).duration, Math.max(i, a))), e(this, s, k).call(this, t(this, D));
}, Ti = function() {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) {
    r(this, ht, null), e(this, s, ri).call(this);
    return;
  }
  const i = t(this, h).style.getPropertyValue("--sp-progress-inset"), a = Number.parseFloat(i), l = Number.isFinite(a) ? Math.min(1, Math.max(0, 1 - a / 100)) : null, u = e(this, s, mt).call(this), f = Math.min(1, Math.max(0, u / t(this, o).duration)), v = Math.max(l ?? 0, f);
  r(this, ht, v), r(this, D, v * t(this, o).duration), e(this, s, k).call(this, t(this, D)), e(this, s, ft).call(this, v), t(this, m).setAttribute("aria-valuenow", `${t(this, D)}`), t(this, m).setAttribute(
    "aria-valuetext",
    `${q(t(this, D))} of ${q(t(this, o).duration)}`
  );
}, mt = function() {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) return t(this, o).currentTime || 0;
  if (e(this, s, E).call(this)) return t(this, L);
  if (t(this, D) !== null) return t(this, D);
  if (!e(this, s, ii).call(this)) return t(this, o).currentTime || 0;
  if (t(this, zt) || !t(this, xt) || performance.now() < t(this, Ps))
    return e(this, s, k).call(this), t(this, o).currentTime || 0;
  if (t(this, h).classList.contains("is-loading") && t(this, o).readyState < HTMLMediaElement.HAVE_FUTURE_DATA)
    return e(this, s, k).call(this), t(this, o).currentTime || 0;
  const i = (performance.now() - t(this, Es)) / 1e3, a = t(this, Ts) + i, l = t(this, o).loop ? a % t(this, o).duration : Math.min(a, t(this, o).duration);
  return !t(this, o).loop && t(this, o).currentTime - l > 0.45 ? (e(this, s, k).call(this), t(this, o).currentTime) : l;
}, ft = function(i) {
  const a = Math.min(1, Math.max(0, i)), l = (1 - a) * 100, { innerWidth: u } = e(this, s, Ci).call(this), f = 1 / u, v = t(this, g) && t(this, Mt) && t(this, nt) + f < a;
  if (t(this, h).style.setProperty("--sp-progress-inset", `${l}%`), t(this, h).style.setProperty("--sp-return-marker-base-opacity", v ? "0" : "1"), v) {
    const qs = e(this, s, ys).call(this, t(this, nt)), ps = Math.max(0, u - 2), $i = Math.min(ps, Math.max(0, qs - 3));
    t(this, h).style.setProperty("--sp-return-marker-hole-left", `${$i}px`);
  } else
    t(this, h).style.setProperty("--sp-return-marker-hole-left", "-9999px");
}, Ei = function(i) {
  return !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0 ? 0 : Math.min(1, Math.max(0, i / t(this, o).duration));
}, Ci = function(i = t(this, m).getBoundingClientRect()) {
  return ci(i);
}, ys = function(i, a = t(this, m).getBoundingClientRect()) {
  return Ji(i, a);
}, Ai = function(i, a) {
  return Qi(i, a);
}, Li = function(i) {
  r(this, St, Number.isFinite(i) ? Math.max(0, i) : 0), r(this, nt, e(this, s, Ei).call(this, t(this, St)));
  const a = t(this, m).getBoundingClientRect(), l = e(this, s, ys).call(this, t(this, nt), a), u = l >= t(this, hs) && l <= Math.max(t(this, hs), a.width - t(this, hs));
  r(this, Mt, t(this, St) > t(this, te) && u), t(this, h).classList.toggle("has-return-marker", t(this, Mt)), t(this, h).style.setProperty("--sp-return-marker-left", `${l}px`);
}, Fi = function(i, a, l, u = t(this, g)) {
  const f = l * t(this, o).duration;
  if (!u || !t(this, Mt))
    return { percent: l, targetTime: f };
  const v = a.left + e(this, s, ys).call(this, t(this, nt), a);
  return Math.abs(i - v) <= t(this, Qs) ? {
    percent: t(this, nt),
    targetTime: t(this, St)
  } : { percent: l, targetTime: f };
}, Ot = function(i = e(this, s, mt).call(this)) {
  !t(this, s, _t) || t(this, S) || e(this, s, E).call(this) || (t(this, z).textContent = e(this, s, Ks).call(this, i));
}, I = function(i = e(this, s, mt).call(this)) {
  const a = Number.isFinite(t(this, o).duration) && t(this, o).duration > 0;
  if (a && t(this, ht) !== null) {
    const f = t(this, ht) * t(this, o).duration;
    r(this, kt, f), e(this, s, ft).call(this, t(this, ht)), t(this, m).setAttribute("aria-valuemin", "0"), t(this, m).setAttribute("aria-valuemax", `${t(this, o).duration}`), t(this, m).setAttribute("aria-valuenow", `${f}`), t(this, m).setAttribute(
      "aria-valuetext",
      `${q(f)} of ${q(t(this, o).duration)}`
    ), e(this, s, Ot).call(this, f);
    return;
  }
  const l = a ? Math.min(t(this, o).duration, Math.max(0, i)) : i, u = a ? l / t(this, o).duration : 0;
  r(this, kt, Number.isFinite(l) ? Math.max(0, l) : 0), e(this, s, ft).call(this, u), t(this, m).setAttribute("aria-valuemin", "0"), t(this, m).setAttribute("aria-valuemax", a ? `${t(this, o).duration}` : "0"), t(this, m).setAttribute("aria-valuenow", a ? `${l}` : "0"), t(this, m).setAttribute(
    "aria-valuetext",
    a ? `${q(l)} of ${q(t(this, o).duration)}` : "Loading video"
  ), e(this, s, Ot).call(this, l);
}, bt = function(i, a = t(this, g), l = !0) {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) return t(this, o).currentTime;
  const u = t(this, m).getBoundingClientRect(), f = e(this, s, Ai).call(this, i, u), v = e(this, s, Fi).call(this, i, u, f, a);
  return l && e(this, s, ft).call(this, v.percent), t(this, s, _t) || t(this, h).style.setProperty("--sp-scrub-preview-left", `${e(this, s, ys).call(this, v.percent, u)}px`), t(this, xs).textContent = q(v.targetTime), t(this, z).textContent = e(this, s, Ks).call(this, v.targetTime), l && (t(this, m).setAttribute("aria-valuenow", `${v.targetTime}`), t(this, m).setAttribute(
    "aria-valuetext",
    `${q(v.targetTime)} of ${q(t(this, o).duration)}`
  )), e(this, s, Si).call(this), v.targetTime;
}, Kt = function() {
  r(this, Rt, !1), t(this, h)?.classList.remove("has-controls-collision");
}, Si = function() {
  if (!t(this, g) && !t(this, S) || !t(this, X) || !t(this, ss) || t(this, s, _t)) {
    e(this, s, Kt).call(this);
    return;
  }
  const i = t(this, X).getBoundingClientRect(), a = t(this, ss).getBoundingClientRect(), l = i.width > 0 && i.height > 0, u = t(this, Rt) ? t(this, he) : t(this, le), f = l && a.right >= i.left - u && a.left <= i.right + u && a.bottom >= i.top - u && a.top <= i.bottom + u;
  r(this, Rt, f), t(this, h).classList.toggle("has-controls-collision", t(this, Rt));
}, Gt = function() {
  t(this, vt) && (window.cancelAnimationFrame(t(this, vt)), r(this, vt, 0));
}, Mi = function() {
  e(this, s, Gt).call(this), e(this, s, k).call(this);
  const i = () => {
    e(this, s, I).call(this, e(this, s, mt).call(this)), e(this, s, ii).call(this) && r(this, vt, window.requestAnimationFrame(i));
  };
  r(this, vt, window.requestAnimationFrame(i));
}, C = function() {
  const i = !t(this, o).paused && (!t(this, o).ended || t(this, o).loop) || t(this, g) && t(this, ot), a = t(this, F) ? t(this, F) === "playing" : i;
  if (t(this, h).classList.toggle("is-playing", a), t(this, Y).setAttribute("aria-label", a ? "Pause video" : "Play video"), t(this, g)) {
    e(this, s, Gt).call(this);
    return;
  }
  i && t(this, h).classList.contains("has-loaded-once") && !t(this, h).classList.contains("is-progress-settling") ? e(this, s, Mi).call(this) : (e(this, s, Gt).call(this), e(this, s, I).call(this));
}, Ft = function() {
  t(this, Vt) && (window.clearTimeout(t(this, Vt)), r(this, Vt, 0));
}, Vi = function() {
  return Gi(t(this, o), t(this, y));
}, M = new WeakMap(), oi = function(i) {
  if (!t(this, y)) return;
  const a = t(this, T).getBoundingClientRect(), l = Math.min(1, Math.max(0, 1 - (i - a.top) / a.height)), u = Math.round(l * 100) / 100;
  t(this, o).volume = u, t(this, o).muted = u <= 0, t(this, M).call(this);
}, Ws = function(i) {
  i !== null && t(this, T).hasPointerCapture(i) && t(this, T).releasePointerCapture(i);
}, Jt = function(i) {
  r(this, W, !1), r(this, x, null), t(this, Z).classList.remove("is-scrubbing-volume"), t(this, T).blur(), e(this, s, Ws).call(this, i), e(this, s, hi).call(this, 260);
}, At = new WeakMap(), js = function() {
  return _i(t(this, b));
}, ni = function() {
  return Wi(this.fullscreenEnabled, t(this, h), t(this, o));
}, Ii = function() {
  return ji(t(this, h));
}, zi = function() {
  Oi(t(this, o));
}, Ri = function() {
  return Ki();
}, Xt = new WeakMap(), Lt = new WeakMap(), Di = function(i) {
  e(this, s, U).call(this), e(this, s, ws).call(this), e(this, s, Zs).call(this, t(this, P)), e(this, s, Ws).call(this, t(this, x)), e(this, s, Ft).call(this), r(this, R, !1), r(this, g, !1), r(this, S, !1), t(this, h).classList.remove("is-progress-hovering"), r(this, P, null), r(this, J, !1), r(this, ct, !1), r(this, W, !1), r(this, x, null), e(this, s, Xs).call(this), t(this, Ss).call(this), t(this, j).style.removeProperty("--sp-control-hover-offset"), t(this, w).classList.remove("is-volume-open"), t(this, Z).classList.remove("is-scrubbing-volume"), t(this, h).classList.remove("is-scrubbing"), t(this, h).classList.remove("is-pointer-active");
  const a = t(this, b).activeElement;
  a instanceof HTMLElement && a.blur(), i ? e(this, s, Ke).call(this) : e(this, s, fs).call(this);
}, Vs = new WeakMap(), Zs = function(i) {
  i !== null && t(this, m).hasPointerCapture(i) && t(this, m).releasePointerCapture(i);
}, ai = async function(i, a, l) {
  if (!t(this, R) && !t(this, g)) return;
  const u = t(this, g);
  e(this, s, Ft).call(this), r(this, R, !1), r(this, g, !1), r(this, S, !1), t(this, h).classList.remove("is-progress-hovering"), r(this, P, null), t(this, h).classList.remove("is-scrubbing"), e(this, s, Kt).call(this), e(this, s, Zs).call(this, a), l && i !== null && (e(this, s, st).call(this), r(this, L, e(this, s, bt).call(this, i, u)), r(this, _, !0), r(this, gt, t(this, ot)), t(this, o).currentTime = t(this, L), e(this, s, k).call(this, t(this, L))), e(this, s, I).call(this, t(this, L)), u && t(this, ot) && await t(this, o).play(), e(this, s, Q).call(this);
}, Os = function(i) {
  !t(this, R) && !t(this, g) || (e(this, s, Ft).call(this), r(this, R, !1), r(this, g, !1), r(this, S, !1), t(this, h).classList.remove("is-progress-hovering"), r(this, P, null), t(this, h).classList.remove("is-scrubbing"), e(this, s, Kt).call(this), e(this, s, Zs).call(this, i), e(this, s, k).call(this), e(this, s, I).call(this), t(this, ot) && t(this, o).play(), e(this, s, Q).call(this));
}, Ks = function(i) {
  if (!t(this, ls)) return q(i);
  const a = Number.isFinite(t(this, o).duration) ? t(this, o).duration : 0;
  return a <= 0 ? q(i) : `-${q(Math.max(0, a - i))}`;
}, qi = function() {
  t(this, Ct) && (window.clearTimeout(t(this, Ct)), r(this, Ct, 0));
}, Hi = function() {
  e(this, s, qi).call(this), t(this, z).classList.remove("is-time-animating"), t(this, z).offsetWidth, t(this, z).classList.add("is-time-animating"), r(this, Ct, window.setTimeout(() => {
    r(this, Ct, 0), t(this, z).classList.remove("is-time-animating");
  }, 240));
}, de = new WeakMap(), me = new WeakMap(), fe = new WeakMap(), be = new WeakMap(), ws = function() {
  t(this, Pt) && (window.clearTimeout(t(this, Pt)), r(this, Pt, 0));
}, li = function() {
  !this.volumeEnabled || !this.volumeSliderEnabled || !t(this, y) || (e(this, s, ws).call(this), t(this, w).classList.add("is-volume-open"));
}, cs = new WeakMap(), hi = function(i = 150) {
  e(this, s, ws).call(this), r(this, Pt, window.setTimeout(t(this, cs), i));
}, Is = new WeakMap(), zs = new WeakMap(), ve = new WeakMap(), ge = new WeakMap(), ye = new WeakMap(), we = new WeakMap(), xe = new WeakMap(), ke = new WeakMap(), Pe = new WeakMap(), Te = new WeakMap(), Rs = new WeakMap(), Ds = new WeakMap(), Ee = new WeakMap(), Ce = new WeakMap(), Ae = new WeakMap(), Le = new WeakMap(), Fe = new WeakMap(), Se = new WeakMap(), Me = new WeakMap(), Ve = new WeakMap(), Ie = new WeakMap(), ze = new WeakMap(), Re = new WeakMap(), De = new WeakMap(), qe = new WeakMap(), us = new WeakMap(), He = new WeakMap(), Be = new WeakMap(), $e = new WeakMap(), Ne = new WeakMap(), Ue = new WeakMap(), Ye = new WeakMap(), A = function() {
  return window.matchMedia("(max-width: 768px)").matches && window.matchMedia("(hover: none), (pointer: coarse)").matches;
}, Bi = function() {
  t(this, o) && (t(this, H)?.disconnect(), r(this, H, null), e(this, s, vs).call(this), e(this, s, _s).call(this), r(this, B, !1), r(this, is, 0), r(this, $, !1), r(this, N, !1), r(this, O, !1), r(this, K, !1), r(this, G, t(this, G) + 1), r(this, xt, !1), r(this, kt, 0), e(this, s, st).call(this), r(this, y, !0), r(this, _, !1), r(this, gt, !1), r(this, F, null), t(this, h).classList.remove("has-loaded-once", "has-visible-frame", "is-progress-settling"), t(this, o).dataset.src = this.src, t(this, o).pause(), t(this, o).removeAttribute("src"), t(this, o).preload = "none", e(this, s, ds).call(this), t(this, o).load(), e(this, s, ft).call(this, 0), t(this, M).call(this), t(this, V).call(this), e(this, s, C).call(this));
}, pi(fi, "observedAttributes", Xi);
customElements.get("simple-player") || customElements.define("simple-player", fi);
export {
  fi as SimplePlayer
};
//# sourceMappingURL=simple-player.js.map
