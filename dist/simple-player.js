var Vi = Object.defineProperty;
var ri = (d) => {
  throw TypeError(d);
};
var Ii = (d, p, i) => p in d ? Vi(d, p, { enumerable: !0, configurable: !0, writable: !0, value: i }) : d[p] = i;
var oi = (d, p, i) => Ii(d, typeof p != "symbol" ? p + "" : p, i), He = (d, p, i) => p.has(d) || ri("Cannot " + i);
var t = (d, p, i) => (He(d, p, "read from private field"), i ? i.call(d) : p.get(d)), n = (d, p, i) => p.has(d) ? ri("Cannot add the same private member more than once") : p instanceof WeakSet ? p.add(d) : p.set(d, i), r = (d, p, i, a) => (He(d, p, "write to private field"), a ? a.call(d, i) : p.set(d, i), i), e = (d, p, i) => (He(d, p, "access private method"), i);
const ni = "16 / 9", zi = "360px 0px", Ri = [
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
function Di(d) {
  const p = document;
  return d.fullscreenElement || document.fullscreenElement || p.webkitFullscreenElement || p.mozFullScreenElement || p.msFullscreenElement || null;
}
function Hi(d, p, i) {
  const a = document, l = p, u = i, f = !!((document.fullscreenEnabled ?? a.webkitFullscreenEnabled ?? a.mozFullScreenEnabled ?? a.msFullscreenEnabled ?? !1) && (l.requestFullscreen || l.webkitRequestFullscreen || l.mozRequestFullScreen || l.msRequestFullscreen)), v = !!(u.webkitSupportsFullscreen || u.webkitEnterFullscreen || u.webkitEnterFullScreen);
  return !!(d && (f || v));
}
function qi(d) {
  const p = d, i = p.requestFullscreen || p.webkitRequestFullscreen || p.mozRequestFullScreen || p.msRequestFullscreen;
  return Promise.resolve(i?.call(p));
}
function Bi(d) {
  const p = d;
  return typeof p.requestFullscreen == "function" || typeof p.webkitRequestFullscreen == "function" || typeof p.mozRequestFullScreen == "function" || typeof p.msRequestFullscreen == "function";
}
function $i(d) {
  const p = d;
  (p.webkitEnterFullscreen || p.webkitEnterFullScreen)?.call(p);
}
function Ui() {
  const d = document, p = document.exitFullscreen || d.webkitExitFullscreen || d.mozCancelFullScreen || d.msExitFullscreen;
  return Promise.resolve(p?.call(d));
}
function _(d) {
  if (!Number.isFinite(d) || d < 0) return "0:00";
  const p = Math.floor(d), i = p % 60, a = Math.floor(p / 60), l = a % 60, u = Math.floor(a / 60);
  return u > 0 ? u + ":" + String(l).padStart(2, "0") + ":" + String(i).padStart(2, "0") : l + ":" + String(i).padStart(2, "0");
}
function Xi(d, p) {
  const i = d;
  if (i.audioTracks && typeof i.audioTracks.length == "number")
    return i.audioTracks.length > 0;
  const a = d;
  if (typeof a.mozHasAudio == "boolean")
    return a.mozHasAudio;
  const l = d;
  return typeof l.webkitAudioDecodedByteCount == "number" && d.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !d.muted && d.currentTime > 0.25 ? l.webkitAudioDecodedByteCount > 0 : p;
}
function ii(d) {
  const p = Math.min(2, Math.max(0, d.width / 2)), i = Math.max(1, d.width - p * 2);
  return { rect: d, sideInset: p, innerWidth: i };
}
function Ni(d, p) {
  const { sideInset: i, innerWidth: a } = ii(p), l = Math.min(1, Math.max(0, d));
  return i + l * a;
}
function Yi(d, p) {
  const { sideInset: i, innerWidth: a } = ii(p);
  return Math.min(1, Math.max(0, (d - p.left - i) / a));
}
const _i = `
  :host {
    --simple-player-aspect-ratio: ${ni};
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
    padding: 2px calc(var(--space) * 1.5);
    color: var(--white);
    background: transparent;
    border-radius: 4px;
    isolation: isolate;
    overflow: hidden;
    pointer-events: none;
    opacity: 0;
    transition: transform 120ms ease;
    white-space: nowrap;
    font: 500 12px/1.35 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .sp-time {
    bottom: calc(100% + var(--space));
    left: var(--sp-scrub-preview-left);
    z-index: 2;
    transform: translateX(-50%) translateY(2px);
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
  .sp-player.is-scrubbing .sp-time,
  .sp-player.has-pinned-time .sp-time {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .sp-player.has-pinned-time .sp-time {
    box-sizing: border-box;
    display: grid;
    place-items: center;
    min-width: calc((var(--sp-control-slot-size) * 1.65) + (var(--sp-control-tray-padding) * 2));
    height: calc(var(--sp-control-slot-size) + (var(--sp-control-tray-padding) * 2));
    padding: 0 calc(var(--space) * 2);
    bottom: calc(((var(--space) * 2) - 2px) + var(--sp-progress-height) + 8px);
    left: 0;
    border-radius: 5px;
    color: rgb(var(--white-rgb) / var(--sp-control-icon-opacity));
    font: 600 12px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    transform: translateX(0) translateY(0);
  }

  .sp-player.has-pinned-time .sp-time .sp-time-surface {
    background: var(--sp-control-glass-surface);
    opacity: var(--sp-control-glass-opacity);
    box-shadow: inset 0 0 0 1px rgb(var(--white-rgb) / 0.08);
  }

  .sp-player.is-loading:not(.has-loaded-once) .sp-time {
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

    .sp-progress:hover .sp-time,
    .sp-player.is-progress-hovering .sp-time {
      opacity: 0;
      transform: translateX(-50%) translateY(2px);
    }

    .sp-player.has-pinned-time .sp-time {
      opacity: 1;
      transform: translateX(0) translateY(0);
    }

    .sp-player.is-scrubbing .sp-time {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    .sp-player.has-pinned-time.is-scrubbing .sp-time {
      transform: translateX(0) translateY(0);
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
`, ai = document.createElement("template");
ai.innerHTML = `
  <style>${_i}</style>
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
var b, Ot, D, Kt, H, h, o, U, m, X, W, Gt, Jt, w, j, E, st, et, it, ft, g, z, rt, S, Lt, ot, Ft, N, bt, Qt, St, P, L, ts, nt, vt, gt, at, gs, ss, q, B, Z, O, K, Mt, yt, ys, Vt, ws, xs, wt, R, lt, It, M, y, G, es, is, zt, Y, ht, x, xt, kt, Pt, rs, Ws, js, os, Zs, Os, ks, Rt, Ks, Gs, Js, Qs, te, se, Dt, ee, ie, s, zs, Rs, qe, hs, Be, Ds, hi, c, Hs, Ht, $, re, cs, J, Q, qs, us, Nt, ci, $e, Ue, Xe, Yt, ps, Bs, Ne, qt, Bt, Ps, $t, ct, ut, Es, oe, Ts, $s, Cs, ne, Ye, ds, Us, ms, _e, ui, As, pi, pt, We, di, je, _t, V, mi, C, fi, Ze, Oe, bi, Ut, Ke, k, tt, Ge, vi, Ct, dt, gi, yi, fs, wi, xi, ki, bs, I, mt, Wt, Pi, jt, Ei, T, At, Ti, F, Je, Xs, Zt, Et, Ns, Qe, Ci, Ai, Li, Xt, Tt, Fi, Ls, Ys, ti, _s, ae, le, he, vs, si, ns, ei, Fs, Ss, ce, ue, pe, de, me, fe, be, ve, Ms, Vs, ge, ye, we, xe, ke, Pe, Ee, Te, Ce, Ae, Le, Fe, Se, as, Me, Ve, Ie, ze, Re, De, A, Si;
class li extends HTMLElement {
  constructor() {
    super();
    n(this, s);
    n(this, b);
    n(this, Ot, []);
    n(this, D, null);
    n(this, Kt, !1);
    n(this, H, !1);
    n(this, h);
    n(this, o);
    n(this, U);
    n(this, m);
    n(this, X);
    n(this, W);
    n(this, Gt);
    n(this, Jt);
    n(this, w);
    n(this, j);
    n(this, E);
    n(this, st);
    n(this, et);
    n(this, it, []);
    n(this, ft, 0);
    n(this, g, !1);
    n(this, z, !1);
    n(this, rt, !1);
    n(this, S, 0);
    n(this, Lt, 0);
    n(this, ot, 0);
    n(this, Ft, !1);
    n(this, N, !1);
    n(this, bt, !1);
    n(this, Qt, 0);
    n(this, St, 0);
    n(this, P, null);
    n(this, L, null);
    n(this, ts, 0);
    n(this, nt, 0);
    n(this, vt, 0);
    n(this, gt, 0);
    n(this, at, 0);
    n(this, gs, 0);
    n(this, ss, 0);
    n(this, q, !1);
    n(this, B, !1);
    n(this, Z, !1);
    n(this, O, !1);
    n(this, K, 0);
    n(this, Mt, 0);
    n(this, yt, !1);
    n(this, ys, 0);
    n(this, Vt, !0);
    n(this, ws, 0);
    n(this, xs, performance.now());
    n(this, wt, 0);
    n(this, R, null);
    n(this, lt, null);
    n(this, It, !1);
    n(this, M, !1);
    n(this, y, !0);
    n(this, G, !1);
    n(this, es, null);
    n(this, is, null);
    n(this, zt, !1);
    n(this, Y, !1);
    n(this, ht, !1);
    n(this, x, null);
    n(this, xt, 0);
    n(this, kt, 0);
    n(this, Pt, 0);
    n(this, rs, null);
    n(this, Ws, 4);
    n(this, js, 3.5);
    n(this, os, 6);
    n(this, Zs, 0.08);
    n(this, Os, 240);
    n(this, ks, 1200);
    n(this, Rt, 1600);
    n(this, Ks, 140);
    n(this, Gs, 380);
    n(this, Js, 650);
    n(this, Qs, 2e3);
    n(this, te, 3);
    n(this, se, 10);
    n(this, Dt, 0.18);
    n(this, ee, 8);
    n(this, ie, 18);
    n(this, Ht, (i) => {
      i.preventDefault();
    });
    n(this, re, () => {
      if (r(this, vt, 0), !(t(this, z) || t(this, g) || t(this, Y))) {
        if (e(this, s, A).call(this)) {
          t(this, h).classList.remove("is-controls-visible");
          return;
        }
        t(this, G) || t(this, h).classList.remove("is-pointer-active");
      }
    });
    n(this, qt, (i) => {
      e(this, s, Nt).call(this, i) && e(this, s, qs).call(this, !0);
    });
    n(this, Bt, (i) => {
      e(this, s, Nt).call(this, i) && ((i instanceof PointerEvent || i instanceof MouseEvent) && e(this, s, Xe).call(this, i.clientX, i.clientY), e(this, s, qs).call(this, !0));
    });
    n(this, Ps, (i) => {
      e(this, s, Nt).call(this, i) && ((i instanceof PointerEvent || i instanceof MouseEvent) && e(this, s, Xe).call(this, i.clientX, i.clientY), e(this, s, Ne).call(this));
    });
    n(this, $t, () => {
      e(this, s, us).call(this);
    });
    n(this, ct, (i) => {
      e(this, s, Nt).call(this, i) && (r(this, G, !0), t(this, h).classList.add("is-pointer-active"), e(this, s, $).call(this));
    });
    n(this, ut, () => {
      r(this, G, !1), e(this, s, cs).call(this, t(this, Rt));
    });
    n(this, Es, () => {
      e(this, s, A).call(this) ? t(this, h).classList.add("is-controls-visible") : t(this, h).classList.add("is-pointer-active"), e(this, s, $).call(this);
    });
    n(this, oe, () => {
      e(this, s, cs).call(this, t(this, Rt));
    });
    n(this, Ts, (i) => {
      const a = i.currentTarget;
      if (e(this, s, Bs).call(this, a)) {
        t(this, W).style.removeProperty("--sp-control-hover-offset");
        return;
      }
      const u = Number(a.dataset.spControlIndex ?? 0);
      t(this, W).style.setProperty("--sp-control-hover-offset", `calc(var(--sp-control-slot-size) * ${u})`);
    });
    n(this, Cs, () => {
      r(this, Pt, 0), t(this, it).forEach((i) => i.classList.remove("is-control-tap-active")), this.style.removeProperty("--sp-touch-control-hover-offset");
    });
    n(this, ne, (i) => {
      if (!(i instanceof PointerEvent) || i.pointerType !== "touch") return;
      const a = i.currentTarget;
      if (!a || !e(this, s, Yt).call(this) || e(this, s, Bs).call(this, a)) return;
      const l = Number(a.dataset.spControlIndex ?? 0);
      e(this, s, $s).call(this), t(this, it).forEach((u) => u.classList.toggle("is-control-tap-active", u === a)), this.style.setProperty("--sp-touch-control-hover-offset", `calc(var(--sp-control-slot-size) * ${l})`), r(this, Pt, window.setTimeout(t(this, Cs), 280));
    });
    n(this, As, () => {
      if (t(this, at) || t(this, h).classList.contains("is-progress-settling")) {
        if (e(this, s, Us).call(this), t(this, yt)) {
          t(this, h).classList.remove("is-progress-settling");
          return;
        }
        r(this, yt, !0), r(this, ys, performance.now() + t(this, Js)), e(this, s, C).call(this) || e(this, s, k).call(this), e(this, s, I).call(this), t(this, h).classList.remove("is-progress-settling"), e(this, s, T).call(this);
      }
    });
    n(this, V, () => {
      if (t(this, o).error) {
        e(this, s, _t).call(this, !0, !0);
        return;
      }
      e(this, s, _t).call(this, !t(this, H) || !t(this, B) || t(this, o).readyState < HTMLMediaElement.HAVE_FUTURE_DATA);
    });
    n(this, Ut, () => {
      if (t(this, o).error || t(this, o).readyState < HTMLMediaElement.HAVE_CURRENT_DATA || t(this, o).videoWidth <= 0 || t(this, o).videoHeight <= 0)
        return t(this, V).call(this), !1;
      if (!t(this, q))
        return e(this, s, bi).call(this), t(this, V).call(this), !1;
      const i = e(this, s, Oe).call(this);
      return t(this, F).call(this), i;
    });
    n(this, F, () => {
      if (!this.volumeEnabled) {
        t(this, h).classList.remove("is-volume-unavailable", "is-volume-muted", "is-volume-sound", "is-volume-icon-animating"), t(this, w).disabled = !0, t(this, w).setAttribute("aria-disabled", "true");
        return;
      }
      r(this, y, e(this, s, Ti).call(this));
      const i = !t(this, y) || t(this, o).muted || t(this, o).volume <= 0, a = t(this, y) && !t(this, o).muted ? t(this, o).volume : 0, l = Math.round(a * 100), u = i ? "muted" : "sound";
      t(this, rs) && t(this, rs) !== u && e(this, s, ui).call(this), r(this, rs, u), t(this, h).classList.toggle("is-volume-unavailable", !t(this, y)), t(this, h).classList.toggle("is-volume-muted", i), t(this, h).classList.toggle("is-volume-sound", !i), t(this, h).style.setProperty("--sp-volume-level", `${l}%`), t(this, w).disabled = !t(this, y), t(this, w).setAttribute("aria-disabled", `${!t(this, y)}`), t(this, w).setAttribute(
        "aria-label",
        t(this, y) ? i ? "Unmute video" : "Mute video" : "Video has no audio"
      ), t(this, E).setAttribute("aria-valuenow", `${l}`), t(this, E).setAttribute("aria-valuetext", `${l}%`);
    });
    n(this, Et, () => {
      const i = document.pictureInPictureElement === t(this, o), a = t(this, o), l = !!(this.pictureInPictureEnabled && document.pictureInPictureEnabled && a.requestPictureInPicture);
      t(this, h).classList.toggle("is-picture-in-picture", i), t(this, st).disabled = !l, t(this, st).setAttribute("aria-label", i ? "Exit picture in picture" : "Enter picture in picture");
    });
    n(this, Xt, () => {
      const i = e(this, s, Ns).call(this), a = i === t(this, h) || i === this, l = e(this, s, Qe).call(this);
      return t(this, h).classList.toggle("is-fullscreen", a), t(this, et).disabled = !l, t(this, et).setAttribute("aria-label", a ? "Exit fullscreen" : "Enter fullscreen"), a;
    });
    n(this, Tt, () => {
      const i = t(this, Xt).call(this);
      e(this, s, Fi).call(this, i);
    });
    n(this, Ls, () => {
      !t(this, z) || t(this, g) || (e(this, s, tt).call(this), e(this, s, $).call(this), e(this, s, At).call(this), r(this, g, !0), t(this, h).classList.add("is-scrubbing"), r(this, S, e(this, s, mt).call(this, t(this, Qt), !0)), t(this, rt) && t(this, o).pause(), t(this, o).currentTime = t(this, S), e(this, s, k).call(this, t(this, S)), e(this, s, I).call(this, t(this, S)), e(this, s, jt).call(this), e(this, s, T).call(this));
    });
    n(this, ae, async () => {
      if (performance.now() < t(this, gs))
        return;
      const i = t(this, L) ? t(this, L) !== "playing" : t(this, o).paused || t(this, o).ended, a = !i || e(this, s, mi).call(this);
      e(this, s, Q).call(this), a && (r(this, L, i ? "playing" : "paused"), e(this, s, T).call(this)), i ? (e(this, s, tt).call(this), await e(this, s, pt).call(this), await t(this, o).play().catch(() => {
        r(this, L, null);
      })) : (e(this, s, vi).call(this), t(this, o).pause()), e(this, s, T).call(this), e(this, s, J).call(this);
    });
    n(this, le, (i) => {
      if (!(i instanceof PointerEvent)) return;
      const a = t(this, U).getBoundingClientRect(), l = i.clientX >= a.left && i.clientX <= a.right && i.clientY >= a.top && i.clientY <= a.bottom, u = t(this, X).getBoundingClientRect(), f = i.clientX >= u.left && i.clientX <= u.right && i.clientY >= u.top && i.clientY <= u.bottom, v = t(this, m).getBoundingClientRect(), Is = i.clientX >= v.left && i.clientX <= v.right && i.clientY >= v.top && i.clientY <= v.bottom, ls = e(this, s, Q).call(this);
      ls && l && r(this, gs, performance.now() + 260), ls && (f || Is) && r(this, ss, performance.now() + 260), e(this, s, pt).call(this);
    });
    n(this, he, (i) => {
      i.stopPropagation();
    });
    n(this, ns, () => {
      r(this, xt, 0), !(t(this, ht) || t(this, Y)) && t(this, w).classList.remove("is-volume-open");
    });
    n(this, Fs, () => {
      e(this, s, A).call(this) || !this.volumeSliderEnabled || !t(this, y) || (r(this, ht, !0), e(this, s, si).call(this));
    });
    n(this, Ss, () => {
      e(this, s, A).call(this) || !this.volumeSliderEnabled || !t(this, y) || (r(this, ht, !1), e(this, s, ei).call(this));
    });
    n(this, ce, (i) => {
      !this.volumeEnabled || !t(this, y) || (i.preventDefault(), i.stopPropagation(), !(!e(this, s, Yt).call(this) || e(this, s, ps).call(this)) && (e(this, s, Q).call(this), t(this, ns).call(this), t(this, o).muted || t(this, o).volume <= 0 ? (t(this, o).volume <= 0 && (t(this, o).volume = 0.7), t(this, o).muted = !1) : t(this, o).muted = !0, t(this, F).call(this), e(this, s, J).call(this)));
    });
    n(this, ue, (i) => {
      i instanceof PointerEvent && (!this.volumeEnabled || !this.volumeSliderEnabled || !t(this, y) || e(this, s, A).call(this) || (i.preventDefault(), i.stopPropagation(), e(this, s, Q).call(this), e(this, s, $).call(this), e(this, s, si).call(this), r(this, Y, !0), r(this, x, i.pointerId), t(this, j).classList.add("is-scrubbing-volume"), t(this, E).setPointerCapture(i.pointerId), e(this, s, Je).call(this, i.clientY)));
    });
    n(this, pe, (i) => {
      i instanceof PointerEvent && t(this, Y) && (t(this, x) !== null && i.pointerId !== t(this, x) || (i.preventDefault(), i.stopPropagation(), e(this, s, Je).call(this, i.clientY)));
    });
    n(this, de, (i) => {
      i instanceof PointerEvent && (t(this, x) !== null && i.pointerId !== t(this, x) || (i.stopPropagation(), e(this, s, Zt).call(this, i.pointerId), e(this, s, J).call(this)));
    });
    n(this, me, (i) => {
      i instanceof PointerEvent && (t(this, x) !== null && i.pointerId !== t(this, x) || (i.stopPropagation(), e(this, s, Zt).call(this, i.pointerId)));
    });
    n(this, fe, (i) => {
      if (!(i instanceof KeyboardEvent) || !this.volumeEnabled || !t(this, y) || !["ArrowUp", "ArrowDown", "Home", "End"].includes(i.key)) return;
      i.preventDefault(), i.stopPropagation();
      const a = i.shiftKey ? 0.1 : 0.05, l = i.key === "Home" ? 0 : i.key === "End" ? 1 : t(this, o).volume + (i.key === "ArrowUp" ? a : -a);
      t(this, o).volume = Math.min(1, Math.max(0, l)), t(this, o).muted = t(this, o).volume <= 0, t(this, F).call(this);
    });
    n(this, be, async () => {
      const i = t(this, o);
      if (!(!this.pictureInPictureEnabled || !document.pictureInPictureEnabled || !i.requestPictureInPicture) && !(!e(this, s, Yt).call(this) || e(this, s, ps).call(this))) {
        e(this, s, Q).call(this);
        try {
          await e(this, s, pt).call(this), document.pictureInPictureElement === t(this, o) ? await document.exitPictureInPicture() : await i.requestPictureInPicture();
        } catch {
        } finally {
          t(this, Et).call(this), e(this, s, J).call(this);
        }
      }
    });
    n(this, ve, async (i) => {
      if (e(this, s, Qe).call(this) && (i.preventDefault(), i.stopPropagation(), !(!e(this, s, Yt).call(this) || e(this, s, ps).call(this)))) {
        e(this, s, Nt).call(this, i), e(this, s, Q).call(this);
        try {
          const a = e(this, s, Ns).call(this);
          a === t(this, h) || a === this ? await e(this, s, Li).call(this) : (await e(this, s, pt).call(this), Bi(t(this, h)) ? await e(this, s, Ci).call(this) : e(this, s, Ai).call(this));
        } catch {
        } finally {
          t(this, Xt).call(this), e(this, s, J).call(this);
        }
      }
    });
    n(this, Ms, (i) => {
      e(this, s, A).call(this) || e(this, s, C).call(this) || !(i instanceof PointerEvent) && !(i instanceof MouseEvent) || (r(this, M, !0), t(this, h).classList.add("is-progress-hovering"), e(this, s, mt).call(this, i.clientX, !1, !1));
    });
    n(this, Vs, () => {
      e(this, s, C).call(this) || e(this, s, Ue).call(this);
    });
    n(this, ge, (i) => {
      if (i instanceof PointerEvent) {
        if (i.preventDefault(), !e(this, s, Yt).call(this) || e(this, s, ps).call(this)) {
          e(this, s, Q).call(this), e(this, s, A).call(this) && r(this, ss, performance.now() + 260);
          return;
        }
        e(this, s, Q).call(this), e(this, s, $).call(this), t(this, As).call(this), r(this, N, !1), r(this, bt, !1), e(this, s, xi).call(this, e(this, s, Ct).call(this)), r(this, z, !0), r(this, P, i.pointerId), r(this, Qt, i.clientX), r(this, rt, !t(this, o).paused && !t(this, o).ended), t(this, m).setPointerCapture(i.pointerId), r(this, S, e(this, s, mt).call(this, i.clientX, !1)), e(this, s, At).call(this), r(this, St, window.setTimeout(t(this, Ls), t(this, Os)));
      }
    });
    n(this, ye, (i) => {
      if (!(i instanceof KeyboardEvent) || !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0 || !["ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"].includes(i.key)) return;
      i.preventDefault(), i.stopPropagation(), t(this, Es).call(this);
      const a = e(this, s, Ct).call(this), l = i.shiftKey ? 10 : 5, u = Math.max(10, t(this, o).duration * 0.1), f = i.key === "Home" ? 0 : i.key === "End" ? t(this, o).duration : i.key === "PageUp" ? a + u : i.key === "PageDown" ? a - u : a + (i.key === "ArrowRight" ? l : -l);
      t(this, o).currentTime = Math.min(t(this, o).duration, Math.max(0, f)), e(this, s, k).call(this, t(this, o).currentTime), e(this, s, I).call(this, t(this, o).currentTime);
    });
    n(this, we, (i) => {
      if (i instanceof PointerEvent) {
        if (!t(this, z)) {
          e(this, s, A).call(this) || (r(this, M, !0), t(this, h).classList.add("is-progress-hovering"), e(this, s, mt).call(this, i.clientX, !1, !1));
          return;
        }
        t(this, P) !== null && i.pointerId !== t(this, P) || (!t(this, g) && Math.abs(i.clientX - t(this, Qt)) >= t(this, Ws) && t(this, Ls).call(this), t(this, g) && r(this, S, e(this, s, mt).call(this, i.clientX)));
      }
    });
    n(this, xe, (i) => {
      i instanceof PointerEvent && (t(this, P) !== null && i.pointerId !== t(this, P) || e(this, s, ti).call(this, i.clientX, i.pointerId, !0));
    });
    n(this, ke, (i) => {
      i instanceof PointerEvent && (t(this, P) !== null && i.pointerId !== t(this, P) || e(this, s, _s).call(this, i.pointerId));
    });
    n(this, Pe, (i) => {
      if (i instanceof PointerEvent) {
        if (t(this, x) !== null && i.pointerId === t(this, x)) {
          e(this, s, Zt).call(this, i.pointerId);
          return;
        }
        t(this, P) === null || i.pointerId !== t(this, P) || e(this, s, ti).call(this, i.clientX, i.pointerId, !0);
      }
    });
    n(this, Ee, (i) => {
      if (i instanceof PointerEvent) {
        if (t(this, x) !== null && i.pointerId === t(this, x)) {
          e(this, s, Zt).call(this, i.pointerId);
          return;
        }
        t(this, P) === null || i.pointerId !== t(this, P) || e(this, s, _s).call(this, i.pointerId);
      }
    });
    n(this, Te, () => {
      e(this, s, Zt).call(this, t(this, x)), e(this, s, _s).call(this, t(this, P));
    });
    n(this, Ce, () => {
      e(this, s, Ns).call(this) || e(this, s, us).call(this);
    });
    n(this, Ae, () => {
      r(this, L, null), e(this, s, tt).call(this), e(this, s, C).call(this) || e(this, s, k).call(this), e(this, s, T).call(this);
    });
    n(this, Le, () => {
      r(this, L, null), e(this, s, C).call(this) || e(this, s, Ge).call(this), t(this, V).call(this), e(this, s, T).call(this);
    });
    n(this, Fe, () => {
      r(this, L, null), e(this, s, tt).call(this), e(this, s, C).call(this) || e(this, s, k).call(this), e(this, s, T).call(this);
    });
    n(this, Se, () => {
      e(this, s, _t).call(this, !0, !0);
    });
    n(this, as, () => {
      e(this, s, _t).call(this, !0);
    });
    n(this, Me, () => {
      e(this, s, tt).call(this), r(this, y, !0), t(this, F).call(this), e(this, s, C).call(this) || e(this, s, k).call(this), t(this, V).call(this), e(this, s, I).call(this);
    });
    n(this, Ve, () => {
      const i = t(this, Ut).call(this);
      t(this, F).call(this), i && !e(this, s, C).call(this) && e(this, s, k).call(this), e(this, s, T).call(this);
    });
    n(this, Ie, () => {
      if (e(this, s, tt).call(this), t(this, V).call(this), t(this, N) && (!t(this, bt) || t(this, o).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA)) {
        e(this, s, Ze).call(this), e(this, s, T).call(this);
        return;
      }
      e(this, s, C).call(this) || e(this, s, k).call(this), e(this, s, I).call(this);
    });
    n(this, ze, () => {
      r(this, L, null), r(this, q, !1), r(this, B, !1), r(this, Z, !1), r(this, O, !1), r(this, K, t(this, K) + 1), t(this, h).classList.remove("has-visible-frame"), e(this, s, _t).call(this, !0, !0), e(this, s, T).call(this), e(this, s, fi).call(this);
    });
    n(this, Re, () => {
      t(this, F).call(this), e(this, s, I).call(this);
    });
    n(this, De, () => {
      t(this, F).call(this);
    });
    r(this, b, this.attachShadow({ mode: "open" })), t(this, b).append(ai.content.cloneNode(!0));
  }
  get src() {
    return this.getAttribute("src") ?? "";
  }
  set src(i) {
    e(this, s, zs).call(this, "src", i);
  }
  get aspectRatio() {
    return this.getAttribute("aspect-ratio") || ni;
  }
  set aspectRatio(i) {
    e(this, s, zs).call(this, "aspect-ratio", i);
  }
  get preloadMargin() {
    return this.getAttribute("preload-margin") || zi;
  }
  set preloadMargin(i) {
    e(this, s, zs).call(this, "preload-margin", i);
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
    e(this, s, Rs).call(this, "volume", i);
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
    e(this, s, Rs).call(this, "picture-in-picture", i);
  }
  get fullscreenEnabled() {
    return this.controlsEnabled && !this.hasAttribute("disable-fullscreen") && !this.hasAttribute("no-fullscreen");
  }
  set fullscreenEnabled(i) {
    e(this, s, Rs).call(this, "fullscreen", i);
  }
  connectedCallback() {
    r(this, h, t(this, b).querySelector("[data-sp-player]")), r(this, o, t(this, b).querySelector("[data-sp-video]")), r(this, U, t(this, b).querySelector("[data-sp-button]")), r(this, m, t(this, b).querySelector("[data-sp-progress-track]")), r(this, X, t(this, b).querySelector("[data-sp-control-tray]")), r(this, W, t(this, b).querySelector("[data-sp-control-tray-slots]")), r(this, Gt, t(this, b).querySelector("[data-sp-time]")), r(this, Jt, t(this, b).querySelector("[data-sp-time-text]")), r(this, w, t(this, b).querySelector("[data-sp-volume-control]")), r(this, j, t(this, b).querySelector("[data-sp-volume-popover]")), r(this, E, t(this, b).querySelector("[data-sp-volume-track]")), r(this, st, t(this, b).querySelector("[data-sp-picture-in-picture-control]")), r(this, et, t(this, b).querySelector("[data-sp-fullscreen-control]")), r(this, it, [t(this, w), t(this, st), t(this, et)]), e(this, s, qe).call(this), t(this, Kt) || (e(this, s, hi).call(this), r(this, Kt, !0)), e(this, s, hs).call(this), e(this, s, Hs).call(this), e(this, s, Be).call(this), e(this, s, Ds).call(this), t(this, V).call(this), t(this, F).call(this), t(this, Et).call(this), t(this, Xt).call(this), e(this, s, T).call(this);
  }
  disconnectedCallback() {
    t(this, D)?.disconnect(), r(this, D, null), t(this, Ot).forEach((i) => i()), r(this, Ot, []), r(this, Kt, !1), e(this, s, $).call(this), e(this, s, Ye).call(this), e(this, s, ds).call(this), e(this, s, Us).call(this), e(this, s, At).call(this), e(this, s, ms).call(this), e(this, s, vs).call(this), e(this, s, _e).call(this), e(this, s, $s).call(this), t(this, h).classList.remove("is-volume-icon-animating"), t(this, W).style.removeProperty("--sp-control-hover-offset"), this.style.removeProperty("--sp-touch-control-hover-offset"), e(this, s, Wt).call(this), r(this, M, !1), t(this, h).classList.remove("is-progress-hovering"), r(this, Y, !1), r(this, ht, !1), r(this, G, !1), r(this, x, null), t(this, w).classList.remove("is-volume-open"), t(this, it).forEach((i) => i.classList.remove("is-control-tap-active")), t(this, h).classList.remove("is-pointer-active"), e(this, s, jt).call(this);
  }
  attributeChangedCallback(i, a, l) {
    if (a !== l) {
      if (i === "aspect-ratio") {
        e(this, s, qe).call(this);
        return;
      }
      if (i === "preload-margin" && this.isConnected) {
        t(this, D)?.disconnect(), e(this, s, Hs).call(this);
        return;
      }
      if (i === "src" && this.isConnected) {
        e(this, s, Si).call(this), e(this, s, Hs).call(this);
        return;
      }
      if ((i === "disable-autoplay" || i === "no-autoplay") && this.isConnected) {
        e(this, s, hs).call(this), t(this, F).call(this), e(this, s, T).call(this);
        return;
      }
      if (i === "show-time" && this.isConnected) {
        e(this, s, Ds).call(this);
        return;
      }
      (i === "controls" || i.startsWith("enable-") || i.startsWith("disable-") || i.startsWith("no-")) && this.isConnected && (e(this, s, Be).call(this), t(this, F).call(this), t(this, Et).call(this), t(this, Xt).call(this), e(this, s, Ds).call(this));
    }
  }
}
b = new WeakMap(), Ot = new WeakMap(), D = new WeakMap(), Kt = new WeakMap(), H = new WeakMap(), h = new WeakMap(), o = new WeakMap(), U = new WeakMap(), m = new WeakMap(), X = new WeakMap(), W = new WeakMap(), Gt = new WeakMap(), Jt = new WeakMap(), w = new WeakMap(), j = new WeakMap(), E = new WeakMap(), st = new WeakMap(), et = new WeakMap(), it = new WeakMap(), ft = new WeakMap(), g = new WeakMap(), z = new WeakMap(), rt = new WeakMap(), S = new WeakMap(), Lt = new WeakMap(), ot = new WeakMap(), Ft = new WeakMap(), N = new WeakMap(), bt = new WeakMap(), Qt = new WeakMap(), St = new WeakMap(), P = new WeakMap(), L = new WeakMap(), ts = new WeakMap(), nt = new WeakMap(), vt = new WeakMap(), gt = new WeakMap(), at = new WeakMap(), gs = new WeakMap(), ss = new WeakMap(), q = new WeakMap(), B = new WeakMap(), Z = new WeakMap(), O = new WeakMap(), K = new WeakMap(), Mt = new WeakMap(), yt = new WeakMap(), ys = new WeakMap(), Vt = new WeakMap(), ws = new WeakMap(), xs = new WeakMap(), wt = new WeakMap(), R = new WeakMap(), lt = new WeakMap(), It = new WeakMap(), M = new WeakMap(), y = new WeakMap(), G = new WeakMap(), es = new WeakMap(), is = new WeakMap(), zt = new WeakMap(), Y = new WeakMap(), ht = new WeakMap(), x = new WeakMap(), xt = new WeakMap(), kt = new WeakMap(), Pt = new WeakMap(), rs = new WeakMap(), Ws = new WeakMap(), js = new WeakMap(), os = new WeakMap(), Zs = new WeakMap(), Os = new WeakMap(), ks = new WeakMap(), Rt = new WeakMap(), Ks = new WeakMap(), Gs = new WeakMap(), Js = new WeakMap(), Qs = new WeakMap(), te = new WeakMap(), se = new WeakMap(), Dt = new WeakMap(), ee = new WeakMap(), ie = new WeakMap(), s = new WeakSet(), zs = function(i, a) {
  if (a === "") {
    this.removeAttribute(i);
    return;
  }
  this.setAttribute(i, a);
}, Rs = function(i, a) {
  if (a) {
    this.setAttribute(`enable-${i}`, ""), this.removeAttribute(`disable-${i}`), this.removeAttribute(`no-${i}`);
    return;
  }
  this.removeAttribute(`enable-${i}`), this.setAttribute(`disable-${i}`, "");
}, qe = function() {
  this.style.setProperty("--simple-player-aspect-ratio", this.aspectRatio);
}, hs = function() {
  if (!t(this, o)) return;
  const i = this.autoplayEnabled;
  if (t(this, o).autoplay = i, i) {
    t(this, o).muted = !0, t(this, o).setAttribute("autoplay", ""), t(this, o).setAttribute("muted", "");
    return;
  }
  t(this, o).removeAttribute("autoplay"), t(this, H) || (t(this, o).muted = !1, t(this, o).removeAttribute("muted"));
}, Be = function() {
  if (!t(this, h)) return;
  const i = [
    { button: t(this, w), enabled: this.volumeEnabled, className: "has-volume-control" },
    { button: t(this, st), enabled: this.pictureInPictureEnabled, className: "has-picture-in-picture-control" },
    { button: t(this, et), enabled: this.fullscreenEnabled, className: "has-fullscreen-control" }
  ];
  let a = 0;
  for (const l of i)
    t(this, h).classList.toggle(l.className, l.enabled), l.button.hidden = !l.enabled, l.enabled ? (l.button.dataset.spControlIndex = `${a}`, a += 1) : delete l.button.dataset.spControlIndex;
  this.style.setProperty("--sp-enabled-controls-count", `${a}`), this.style.setProperty("--sp-control-tray-display", a > 0 ? "block" : "none"), t(this, h).classList.toggle("has-volume-slider-control", this.volumeEnabled && this.volumeSliderEnabled), (!this.volumeEnabled || !this.volumeSliderEnabled) && (t(this, ns).call(this), e(this, s, Xs).call(this, t(this, x)), r(this, Y, !1), r(this, ht, !1), t(this, j).classList.remove("is-scrubbing-volume")), t(this, W).style.removeProperty("--sp-control-hover-offset");
}, Ds = function() {
  if (!t(this, h)) return;
  const i = this.timeVisible && this.controlsEnabled;
  t(this, h).classList.toggle("has-pinned-time", i), i && e(this, s, bs).call(this);
}, hi = function() {
  e(this, s, c).call(this, t(this, U), "click", t(this, ae)), e(this, s, c).call(this, this, "pointerenter", t(this, qt)), e(this, s, c).call(this, this, "pointermove", t(this, Bt)), e(this, s, c).call(this, this, "pointerleave", t(this, $t)), e(this, s, c).call(this, this, "mouseenter", t(this, qt)), e(this, s, c).call(this, this, "mousemove", t(this, Bt)), e(this, s, c).call(this, this, "mouseleave", t(this, $t)), e(this, s, c).call(this, t(this, h), "pointerenter", t(this, qt)), e(this, s, c).call(this, t(this, h), "pointermove", t(this, Bt)), e(this, s, c).call(this, t(this, h), "pointerleave", t(this, $t)), e(this, s, c).call(this, t(this, h), "mouseenter", t(this, qt)), e(this, s, c).call(this, t(this, h), "mousemove", t(this, Bt)), e(this, s, c).call(this, t(this, h), "mouseleave", t(this, $t)), e(this, s, c).call(this, t(this, U), "pointerenter", t(this, ct)), e(this, s, c).call(this, t(this, U), "pointerleave", t(this, ut)), e(this, s, c).call(this, t(this, U), "mouseenter", t(this, ct)), e(this, s, c).call(this, t(this, U), "mouseleave", t(this, ut)), e(this, s, c).call(this, t(this, m), "pointerenter", t(this, ct)), e(this, s, c).call(this, t(this, m), "pointerleave", t(this, ut)), e(this, s, c).call(this, t(this, m), "mouseenter", t(this, ct)), e(this, s, c).call(this, t(this, m), "mouseleave", t(this, ut)), e(this, s, c).call(this, t(this, m), "pointerenter", t(this, Ms)), e(this, s, c).call(this, t(this, m), "pointerleave", t(this, Vs)), e(this, s, c).call(this, t(this, m), "mouseenter", t(this, Ms)), e(this, s, c).call(this, t(this, m), "mouseleave", t(this, Vs)), e(this, s, c).call(this, t(this, X), "pointerenter", t(this, ct)), e(this, s, c).call(this, t(this, X), "pointerleave", t(this, ut)), e(this, s, c).call(this, t(this, X), "mouseenter", t(this, ct)), e(this, s, c).call(this, t(this, X), "mouseleave", t(this, ut)), e(this, s, c).call(this, t(this, b), "focusin", t(this, Es)), e(this, s, c).call(this, t(this, b), "focusout", t(this, oe)), e(this, s, c).call(this, t(this, h), "pointerdown", t(this, le)), e(this, s, c).call(this, t(this, h), "dragstart", t(this, Ht)), e(this, s, c).call(this, t(this, h), "selectstart", t(this, Ht)), e(this, s, c).call(this, t(this, o), "dragstart", t(this, Ht)), e(this, s, c).call(this, t(this, o), "selectstart", t(this, Ht)), e(this, s, c).call(this, t(this, m), "pointerdown", t(this, ge)), e(this, s, c).call(this, t(this, m), "pointermove", t(this, we)), e(this, s, c).call(this, t(this, m), "pointerup", t(this, xe)), e(this, s, c).call(this, t(this, m), "pointercancel", t(this, ke)), e(this, s, c).call(this, t(this, m), "keydown", t(this, ye)), e(this, s, c).call(this, t(this, w), "pointerenter", t(this, Fs)), e(this, s, c).call(this, t(this, w), "pointerleave", t(this, Ss)), e(this, s, c).call(this, t(this, w), "click", t(this, ce)), e(this, s, c).call(this, t(this, j), "pointerenter", t(this, Fs)), e(this, s, c).call(this, t(this, j), "pointerleave", t(this, Ss)), e(this, s, c).call(this, t(this, E), "pointerdown", t(this, ue)), e(this, s, c).call(this, t(this, E), "pointermove", t(this, pe)), e(this, s, c).call(this, t(this, E), "pointerup", t(this, de)), e(this, s, c).call(this, t(this, E), "pointercancel", t(this, me)), e(this, s, c).call(this, t(this, E), "click", t(this, he)), e(this, s, c).call(this, t(this, E), "keydown", t(this, fe)), e(this, s, c).call(this, t(this, st), "click", t(this, be)), e(this, s, c).call(this, t(this, et), "click", t(this, ve));
  for (const i of t(this, it))
    e(this, s, c).call(this, i, "pointerenter", t(this, Ts)), e(this, s, c).call(this, i, "mouseenter", t(this, Ts)), e(this, s, c).call(this, i, "pointerdown", t(this, ne));
  e(this, s, c).call(this, document, "pointerup", t(this, Pe)), e(this, s, c).call(this, document, "pointercancel", t(this, Ee)), e(this, s, c).call(this, document, "pointermove", t(this, Ps)), e(this, s, c).call(this, document, "mousemove", t(this, Ps)), e(this, s, c).call(this, document, "fullscreenchange", t(this, Tt)), e(this, s, c).call(this, document, "webkitfullscreenchange", t(this, Tt)), e(this, s, c).call(this, document, "mozfullscreenchange", t(this, Tt)), e(this, s, c).call(this, document, "MSFullscreenChange", t(this, Tt)), e(this, s, c).call(this, t(this, b), "fullscreenchange", t(this, Tt)), e(this, s, c).call(this, window, "blur", t(this, Te)), e(this, s, c).call(this, window, "focus", t(this, Ce)), e(this, s, c).call(this, t(this, o), "play", t(this, Ae)), e(this, s, c).call(this, t(this, o), "pause", t(this, Le)), e(this, s, c).call(this, t(this, o), "ended", t(this, Fe)), e(this, s, c).call(this, t(this, o), "loadstart", t(this, Se)), e(this, s, c).call(this, t(this, o), "waiting", t(this, as)), e(this, s, c).call(this, t(this, o), "stalled", t(this, as)), e(this, s, c).call(this, t(this, o), "seeking", t(this, as)), e(this, s, c).call(this, t(this, o), "loadeddata", t(this, Ut)), e(this, s, c).call(this, t(this, o), "loadedmetadata", t(this, Me)), e(this, s, c).call(this, t(this, o), "canplay", t(this, Ut)), e(this, s, c).call(this, t(this, o), "canplaythrough", t(this, Ut)), e(this, s, c).call(this, t(this, o), "playing", t(this, Ve)), e(this, s, c).call(this, t(this, o), "seeked", t(this, Ie)), e(this, s, c).call(this, t(this, o), "error", t(this, ze)), e(this, s, c).call(this, t(this, o), "progress", t(this, V)), e(this, s, c).call(this, t(this, o), "suspend", t(this, V)), e(this, s, c).call(this, t(this, o), "timeupdate", t(this, Re)), e(this, s, c).call(this, t(this, o), "volumechange", t(this, De)), e(this, s, c).call(this, t(this, o), "enterpictureinpicture", t(this, Et)), e(this, s, c).call(this, t(this, o), "leavepictureinpicture", t(this, Et));
}, c = function(i, a, l) {
  i.addEventListener(a, l), t(this, Ot).push(() => i.removeEventListener(a, l));
}, Hs = function() {
  if (!(!this.src || t(this, H))) {
    if (t(this, D)?.disconnect(), t(this, o).dataset.src = this.src, "IntersectionObserver" in window) {
      r(this, D, new IntersectionObserver((i, a) => {
        i.some((l) => l.isIntersecting) && (a.disconnect(), r(this, D, null), e(this, s, pt).call(this));
      }, { rootMargin: this.preloadMargin })), t(this, D).observe(t(this, h));
      return;
    }
    e(this, s, pt).call(this);
  }
}, Ht = new WeakMap(), $ = function() {
  t(this, vt) && (window.clearTimeout(t(this, vt)), r(this, vt, 0));
}, re = new WeakMap(), cs = function(i = e(this, s, A).call(this) ? t(this, ks) : t(this, Rt)) {
  e(this, s, $).call(this), r(this, vt, window.setTimeout(t(this, re), i));
}, J = function() {
  e(this, s, A).call(this) && e(this, s, cs).call(this, t(this, ks));
}, Q = function() {
  if (!e(this, s, A).call(this)) return !1;
  const i = t(this, h).classList.contains("is-controls-visible");
  return t(this, h).classList.add("is-controls-visible"), e(this, s, J).call(this), !i;
}, qs = function(i = !1) {
  !i && e(this, s, A).call(this) || (t(this, h).classList.add("is-pointer-active"), t(this, G) ? e(this, s, $).call(this) : e(this, s, cs).call(this, i ? t(this, Rt) : void 0));
}, us = function() {
  r(this, G, !1), e(this, s, $).call(this), t(this, h).classList.remove("is-pointer-active");
}, Nt = function(i) {
  return i instanceof PointerEvent ? (r(this, zt, i.pointerType === "touch"), t(this, zt) ? !1 : (r(this, es, i.clientX), r(this, is, i.clientY), !0)) : i instanceof MouseEvent ? (r(this, zt, !1), r(this, es, i.clientX), r(this, is, i.clientY), !0) : !1;
}, ci = function(i, a) {
  if (i === null || a === null || i < 0 || a < 0 || i > window.innerWidth || a > window.innerHeight) return !1;
  const l = this.getBoundingClientRect();
  return l.width <= 0 || l.height <= 0 ? !1 : i >= l.left && i <= l.right && a >= l.top && a <= l.bottom;
}, $e = function(i, a, l) {
  if (!i) return !1;
  const u = i.getBoundingClientRect();
  return u.width <= 0 || u.height <= 0 ? !1 : a >= u.left && a <= u.right && l >= u.top && l <= u.bottom;
}, Ue = function() {
  t(this, M) && (r(this, M, !1), t(this, h).classList.remove("is-progress-hovering"), e(this, s, Wt).call(this), e(this, s, bs).call(this));
}, Xe = function(i, a) {
  if (e(this, s, A).call(this)) return;
  !e(this, s, C).call(this) && e(this, s, $e).call(this, t(this, m), i, a) ? (r(this, M, !0), t(this, h).classList.add("is-progress-hovering"), e(this, s, mt).call(this, i, !1, !1)) : e(this, s, C).call(this) || e(this, s, Ue).call(this);
  const l = t(this, it).find((f) => !f.hidden && !e(this, s, Bs).call(this, f) && e(this, s, $e).call(this, f, i, a)) ?? null;
  if (!l) return;
  const u = Number(l.dataset.spControlIndex ?? 0);
  t(this, W).style.setProperty("--sp-control-hover-offset", `calc(var(--sp-control-slot-size) * ${u})`);
}, Yt = function() {
  return t(this, h).classList.contains("is-controls-visible") || t(this, h).classList.contains("is-pointer-active") || t(this, b).activeElement instanceof HTMLElement;
}, ps = function() {
  return e(this, s, A).call(this) && performance.now() < t(this, ss);
}, Bs = function(i) {
  return i instanceof HTMLButtonElement && (i.disabled || i === t(this, w) && (!this.volumeEnabled || !t(this, y)));
}, Ne = function() {
  if (!t(this, zt) && e(this, s, ci).call(this, t(this, es), t(this, is))) {
    e(this, s, qs).call(this, !0);
    return;
  }
  e(this, s, us).call(this);
}, qt = new WeakMap(), Bt = new WeakMap(), Ps = new WeakMap(), $t = new WeakMap(), ct = new WeakMap(), ut = new WeakMap(), Es = new WeakMap(), oe = new WeakMap(), Ts = new WeakMap(), $s = function() {
  t(this, Pt) && (window.clearTimeout(t(this, Pt)), r(this, Pt, 0));
}, Cs = new WeakMap(), ne = new WeakMap(), Ye = function() {
  t(this, gt) && (window.clearTimeout(t(this, gt)), r(this, gt, 0));
}, ds = function() {
  t(this, nt) && (window.clearTimeout(t(this, nt)), r(this, nt, 0));
}, Us = function() {
  t(this, at) && (window.clearTimeout(t(this, at)), r(this, at, 0));
}, ms = function() {
  t(this, Mt) && (window.clearTimeout(t(this, Mt)), r(this, Mt, 0));
}, _e = function() {
  t(this, kt) && (window.clearTimeout(t(this, kt)), r(this, kt, 0));
}, ui = function() {
  e(this, s, _e).call(this), t(this, h).classList.remove("is-volume-icon-animating"), t(this, w).offsetWidth, t(this, h).classList.add("is-volume-icon-animating"), r(this, kt, window.setTimeout(() => {
    r(this, kt, 0), t(this, h).classList.remove("is-volume-icon-animating");
  }, 240));
}, As = new WeakMap(), pi = function() {
  t(this, yt) || t(this, at) || (t(this, h).classList.add("is-progress-settling"), e(this, s, dt).call(this, 0), r(this, at, window.setTimeout(t(this, As), t(this, Gs))));
}, pt = async function() {
  if (t(this, H)) return;
  const i = t(this, o).dataset.src || this.src;
  i && (e(this, s, ds).call(this), e(this, s, ms).call(this), r(this, ts, t(this, ts) + 1), r(this, H, !0), r(this, q, !1), r(this, B, !1), r(this, Z, !1), r(this, O, !1), r(this, K, t(this, K) + 1), t(this, h).classList.remove("has-visible-frame"), e(this, s, hs).call(this), t(this, o).src = i, t(this, o).preload = "auto", t(this, o).load(), t(this, o).autoplay && t(this, o).muted && await t(this, o).play().catch(() => {
  }));
}, We = function() {
  return !t(this, o).loop || t(this, o).paused || !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0 ? !1 : t(this, o).currentTime < 0.28 || t(this, o).duration - t(this, o).currentTime < 0.28;
}, di = function(i = t(this, o).currentTime) {
  if (!Number.isFinite(i)) return 0;
  const a = Math.max(0, i);
  try {
    for (let l = 0; l < t(this, o).buffered.length; l += 1) {
      const u = t(this, o).buffered.start(l), f = t(this, o).buffered.end(l);
      if (a + t(this, Dt) >= u && a <= f + t(this, Dt))
        return Math.max(0, f - a);
    }
  } catch {
    return 0;
  }
  return 0;
}, je = function(i = t(this, se)) {
  if (!t(this, H) || t(this, o).error || !t(this, h).classList.contains("has-loaded-once") || !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) return !1;
  const a = Math.max(0, t(this, o).duration - t(this, o).currentTime), l = Math.min(i, a);
  return l <= t(this, Dt) || e(this, s, di).call(this) + t(this, Dt) >= l;
}, _t = function(i, a = !1) {
  e(this, s, Ye).call(this);
  const l = i && !e(this, s, We).call(this) && !e(this, s, je).call(this), f = i && !t(this, B) || l;
  if (r(this, Vt, f), !f) {
    t(this, h).classList.remove("is-loading");
    return;
  }
  if (a) {
    t(this, h).classList.add("is-loading");
    return;
  }
  r(this, gt, window.setTimeout(() => {
    if (r(this, gt, 0), !t(this, B) || !e(this, s, We).call(this) && !e(this, s, je).call(this)) {
      r(this, Vt, !0), t(this, h).classList.add("is-loading");
      return;
    }
    r(this, Vt, !1), t(this, h).classList.remove("is-loading");
  }, t(this, Ks)));
}, V = new WeakMap(), mi = function() {
  return t(this, H) && !t(this, o).error && t(this, q) && (t(this, o).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA || t(this, o).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !t(this, h).classList.contains("is-loading"));
}, C = function() {
  return t(this, z) || t(this, g) || t(this, N);
}, fi = function() {
  t(this, ts) >= t(this, te) || t(this, nt) || r(this, nt, window.setTimeout(() => {
    r(this, nt, 0), e(this, s, ms).call(this), r(this, H, !1), r(this, q, !1), r(this, B, !1), r(this, Z, !1), r(this, O, !1), r(this, K, t(this, K) + 1), t(this, h).classList.remove("has-visible-frame"), t(this, h).classList.contains("has-loaded-once") || e(this, s, dt).call(this, 0), t(this, o).removeAttribute("src"), t(this, o).load(), e(this, s, pt).call(this);
  }, t(this, Qs)));
}, Ze = function() {
  return t(this, N) ? (r(this, N, !1), r(this, bt, !1), e(this, s, k).call(this), e(this, s, I).call(this), !0) : !1;
}, Oe = function() {
  return e(this, s, ds).call(this), !t(this, h).classList.contains("has-loaded-once") && e(this, s, pi).call(this), t(this, h).classList.add("has-loaded-once"), t(this, h).classList.add("has-visible-frame"), t(this, V).call(this), r(this, L, null), t(this, N) ? (e(this, s, Ze).call(this), !0) : (e(this, s, C).call(this) || e(this, s, k).call(this), e(this, s, I).call(this), !0);
}, bi = function() {
  if (t(this, q) || t(this, Z) || t(this, o).error) return;
  r(this, Z, !0);
  const i = t(this, K), a = () => {
    if (i === t(this, K)) {
      if (e(this, s, ms).call(this), r(this, Z, !1), r(this, q, !t(this, o).error && t(this, o).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && t(this, o).videoWidth > 0 && t(this, o).videoHeight > 0), t(this, q)) {
        if (t(this, O) || t(this, B)) return;
        r(this, O, !0), window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            i === t(this, K) && (r(this, O, !1), r(this, B, !0), e(this, s, Oe).call(this), e(this, s, T).call(this));
          });
        }), e(this, s, T).call(this);
        return;
      }
      t(this, V).call(this);
    }
  };
  if ("requestVideoFrameCallback" in t(this, o)) {
    t(this, o).requestVideoFrameCallback(a), r(this, Mt, window.setTimeout(a, 180));
    return;
  }
  window.requestAnimationFrame(a);
}, Ut = new WeakMap(), Ke = function() {
  return !t(this, o).paused && (!t(this, o).ended || t(this, o).loop) && t(this, o).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
}, k = function(i = t(this, o).currentTime) {
  r(this, ws, Number.isFinite(i) ? Math.max(0, i) : 0), r(this, xs, performance.now());
}, tt = function() {
  r(this, R, null), r(this, lt, null);
}, Ge = function() {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) {
    r(this, R, null);
    return;
  }
  const i = Number.isFinite(t(this, o).currentTime) ? Math.max(0, t(this, o).currentTime) : 0, a = Number.isFinite(t(this, wt)) ? t(this, wt) : i;
  r(this, R, Math.min(t(this, o).duration, Math.max(i, a))), e(this, s, k).call(this, t(this, R));
}, vi = function() {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) {
    r(this, lt, null), e(this, s, Ge).call(this);
    return;
  }
  const i = t(this, h).style.getPropertyValue("--sp-progress-inset"), a = Number.parseFloat(i), l = Number.isFinite(a) ? Math.min(1, Math.max(0, 1 - a / 100)) : null, u = e(this, s, Ct).call(this), f = Math.min(1, Math.max(0, u / t(this, o).duration)), v = Math.max(l ?? 0, f);
  r(this, lt, v), r(this, R, v * t(this, o).duration), e(this, s, k).call(this, t(this, R)), e(this, s, dt).call(this, v), t(this, m).setAttribute("aria-valuenow", `${t(this, R)}`), t(this, m).setAttribute(
    "aria-valuetext",
    `${_(t(this, R))} of ${_(t(this, o).duration)}`
  );
}, Ct = function() {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) return t(this, o).currentTime || 0;
  if (e(this, s, C).call(this)) return t(this, S);
  if (t(this, R) !== null) return t(this, R);
  if (!e(this, s, Ke).call(this)) return t(this, o).currentTime || 0;
  if (t(this, Vt) || !t(this, yt) || performance.now() < t(this, ys))
    return e(this, s, k).call(this), t(this, o).currentTime || 0;
  if (t(this, h).classList.contains("is-loading") && t(this, o).readyState < HTMLMediaElement.HAVE_FUTURE_DATA)
    return e(this, s, k).call(this), t(this, o).currentTime || 0;
  const i = (performance.now() - t(this, xs)) / 1e3, a = t(this, ws) + i, l = t(this, o).loop ? a % t(this, o).duration : Math.min(a, t(this, o).duration);
  return !t(this, o).loop && t(this, o).currentTime - l > 0.45 ? (e(this, s, k).call(this), t(this, o).currentTime) : l;
}, dt = function(i) {
  const a = Math.min(1, Math.max(0, i)), l = (1 - a) * 100, { innerWidth: u } = e(this, s, yi).call(this), f = 1 / u, v = t(this, g) && t(this, Ft) && t(this, ot) + f < a;
  if (t(this, h).style.setProperty("--sp-progress-inset", `${l}%`), t(this, h).style.setProperty("--sp-return-marker-base-opacity", v ? "0" : "1"), v) {
    const Is = e(this, s, fs).call(this, t(this, ot)), ls = Math.max(0, u - 2), Mi = Math.min(ls, Math.max(0, Is - 3));
    t(this, h).style.setProperty("--sp-return-marker-hole-left", `${Mi}px`);
  } else
    t(this, h).style.setProperty("--sp-return-marker-hole-left", "-9999px");
}, gi = function(i) {
  return !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0 ? 0 : Math.min(1, Math.max(0, i / t(this, o).duration));
}, yi = function(i = t(this, m).getBoundingClientRect()) {
  return ii(i);
}, fs = function(i, a = t(this, m).getBoundingClientRect()) {
  return Ni(i, a);
}, wi = function(i, a) {
  return Yi(i, a);
}, xi = function(i) {
  r(this, Lt, Number.isFinite(i) ? Math.max(0, i) : 0), r(this, ot, e(this, s, gi).call(this, t(this, Lt)));
  const a = t(this, m).getBoundingClientRect(), l = e(this, s, fs).call(this, t(this, ot), a), u = l >= t(this, os) && l <= Math.max(t(this, os), a.width - t(this, os));
  r(this, Ft, t(this, Lt) > t(this, Zs) && u), t(this, h).classList.toggle("has-return-marker", t(this, Ft)), t(this, h).style.setProperty("--sp-return-marker-left", `${l}px`);
}, ki = function(i, a, l, u = t(this, g)) {
  const f = l * t(this, o).duration;
  if (!u || !t(this, Ft))
    return { percent: l, targetTime: f };
  const v = a.left + e(this, s, fs).call(this, t(this, ot), a);
  return Math.abs(i - v) <= t(this, js) ? {
    percent: t(this, ot),
    targetTime: t(this, Lt)
  } : { percent: l, targetTime: f };
}, bs = function(i = e(this, s, Ct).call(this)) {
  !this.timeVisible || t(this, M) || e(this, s, C).call(this) || (t(this, Jt).textContent = _(i));
}, I = function(i = e(this, s, Ct).call(this)) {
  const a = Number.isFinite(t(this, o).duration) && t(this, o).duration > 0;
  if (a && t(this, lt) !== null) {
    const f = t(this, lt) * t(this, o).duration;
    r(this, wt, f), e(this, s, dt).call(this, t(this, lt)), t(this, m).setAttribute("aria-valuemin", "0"), t(this, m).setAttribute("aria-valuemax", `${t(this, o).duration}`), t(this, m).setAttribute("aria-valuenow", `${f}`), t(this, m).setAttribute(
      "aria-valuetext",
      `${_(f)} of ${_(t(this, o).duration)}`
    ), e(this, s, bs).call(this, f);
    return;
  }
  const l = a ? Math.min(t(this, o).duration, Math.max(0, i)) : i, u = a ? l / t(this, o).duration : 0;
  r(this, wt, Number.isFinite(l) ? Math.max(0, l) : 0), e(this, s, dt).call(this, u), t(this, m).setAttribute("aria-valuemin", "0"), t(this, m).setAttribute("aria-valuemax", a ? `${t(this, o).duration}` : "0"), t(this, m).setAttribute("aria-valuenow", a ? `${l}` : "0"), t(this, m).setAttribute(
    "aria-valuetext",
    a ? `${_(l)} of ${_(t(this, o).duration)}` : "Loading video"
  ), e(this, s, bs).call(this, l);
}, mt = function(i, a = t(this, g), l = !0) {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) return t(this, o).currentTime;
  const u = t(this, m).getBoundingClientRect(), f = e(this, s, wi).call(this, i, u), v = e(this, s, ki).call(this, i, u, f, a);
  return l && e(this, s, dt).call(this, v.percent), this.timeVisible || t(this, h).style.setProperty("--sp-scrub-preview-left", `${e(this, s, fs).call(this, v.percent, u)}px`), t(this, Jt).textContent = _(v.targetTime), l && (t(this, m).setAttribute("aria-valuenow", `${v.targetTime}`), t(this, m).setAttribute(
    "aria-valuetext",
    `${_(v.targetTime)} of ${_(t(this, o).duration)}`
  )), e(this, s, Pi).call(this), v.targetTime;
}, Wt = function() {
  r(this, It, !1), t(this, h)?.classList.remove("has-controls-collision");
}, Pi = function() {
  if (!t(this, g) && !t(this, M) || !t(this, X) || !t(this, Gt)) {
    e(this, s, Wt).call(this);
    return;
  }
  const i = t(this, X).getBoundingClientRect(), a = t(this, Gt).getBoundingClientRect(), l = i.width > 0 && i.height > 0, u = t(this, It) ? t(this, ie) : t(this, ee), f = l && a.right >= i.left - u && a.left <= i.right + u && a.bottom >= i.top - u && a.top <= i.bottom + u;
  r(this, It, f), t(this, h).classList.toggle("has-controls-collision", t(this, It));
}, jt = function() {
  t(this, ft) && (window.cancelAnimationFrame(t(this, ft)), r(this, ft, 0));
}, Ei = function() {
  e(this, s, jt).call(this), e(this, s, k).call(this);
  const i = () => {
    e(this, s, I).call(this, e(this, s, Ct).call(this)), e(this, s, Ke).call(this) && r(this, ft, window.requestAnimationFrame(i));
  };
  r(this, ft, window.requestAnimationFrame(i));
}, T = function() {
  const i = !t(this, o).paused && (!t(this, o).ended || t(this, o).loop) || t(this, g) && t(this, rt), a = t(this, L) ? t(this, L) === "playing" : i;
  if (t(this, h).classList.toggle("is-playing", a), t(this, U).setAttribute("aria-label", a ? "Pause video" : "Play video"), t(this, g)) {
    e(this, s, jt).call(this);
    return;
  }
  i && t(this, h).classList.contains("has-loaded-once") && !t(this, h).classList.contains("is-progress-settling") ? e(this, s, Ei).call(this) : (e(this, s, jt).call(this), e(this, s, I).call(this));
}, At = function() {
  t(this, St) && (window.clearTimeout(t(this, St)), r(this, St, 0));
}, Ti = function() {
  return Xi(t(this, o), t(this, y));
}, F = new WeakMap(), Je = function(i) {
  if (!t(this, y)) return;
  const a = t(this, E).getBoundingClientRect(), l = Math.min(1, Math.max(0, 1 - (i - a.top) / a.height)), u = Math.round(l * 100) / 100;
  t(this, o).volume = u, t(this, o).muted = u <= 0, t(this, F).call(this);
}, Xs = function(i) {
  i !== null && t(this, E).hasPointerCapture(i) && t(this, E).releasePointerCapture(i);
}, Zt = function(i) {
  r(this, Y, !1), r(this, x, null), t(this, j).classList.remove("is-scrubbing-volume"), t(this, E).blur(), e(this, s, Xs).call(this, i), e(this, s, ei).call(this, 260);
}, Et = new WeakMap(), Ns = function() {
  return Di(t(this, b));
}, Qe = function() {
  return Hi(this.fullscreenEnabled, t(this, h), t(this, o));
}, Ci = function() {
  return qi(t(this, h));
}, Ai = function() {
  $i(t(this, o));
}, Li = function() {
  return Ui();
}, Xt = new WeakMap(), Tt = new WeakMap(), Fi = function(i) {
  e(this, s, $).call(this), e(this, s, vs).call(this), e(this, s, Ys).call(this, t(this, P)), e(this, s, Xs).call(this, t(this, x)), e(this, s, At).call(this), r(this, z, !1), r(this, g, !1), r(this, M, !1), t(this, h).classList.remove("is-progress-hovering"), r(this, P, null), r(this, G, !1), r(this, ht, !1), r(this, Y, !1), r(this, x, null), e(this, s, $s).call(this), t(this, Cs).call(this), t(this, W).style.removeProperty("--sp-control-hover-offset"), t(this, w).classList.remove("is-volume-open"), t(this, j).classList.remove("is-scrubbing-volume"), t(this, h).classList.remove("is-scrubbing"), t(this, h).classList.remove("is-pointer-active");
  const a = t(this, b).activeElement;
  a instanceof HTMLElement && a.blur(), i ? e(this, s, Ne).call(this) : e(this, s, us).call(this);
}, Ls = new WeakMap(), Ys = function(i) {
  i !== null && t(this, m).hasPointerCapture(i) && t(this, m).releasePointerCapture(i);
}, ti = async function(i, a, l) {
  if (!t(this, z) && !t(this, g)) return;
  const u = t(this, g);
  e(this, s, At).call(this), r(this, z, !1), r(this, g, !1), r(this, M, !1), t(this, h).classList.remove("is-progress-hovering"), r(this, P, null), t(this, h).classList.remove("is-scrubbing"), e(this, s, Wt).call(this), e(this, s, Ys).call(this, a), l && i !== null && (e(this, s, tt).call(this), r(this, S, e(this, s, mt).call(this, i, u)), r(this, N, !0), r(this, bt, t(this, rt)), t(this, o).currentTime = t(this, S), e(this, s, k).call(this, t(this, S))), e(this, s, I).call(this, t(this, S)), u && t(this, rt) && await t(this, o).play(), e(this, s, J).call(this);
}, _s = function(i) {
  !t(this, z) && !t(this, g) || (e(this, s, At).call(this), r(this, z, !1), r(this, g, !1), r(this, M, !1), t(this, h).classList.remove("is-progress-hovering"), r(this, P, null), t(this, h).classList.remove("is-scrubbing"), e(this, s, Wt).call(this), e(this, s, Ys).call(this, i), e(this, s, k).call(this), e(this, s, I).call(this), t(this, rt) && t(this, o).play(), e(this, s, J).call(this));
}, ae = new WeakMap(), le = new WeakMap(), he = new WeakMap(), vs = function() {
  t(this, xt) && (window.clearTimeout(t(this, xt)), r(this, xt, 0));
}, si = function() {
  !this.volumeEnabled || !this.volumeSliderEnabled || !t(this, y) || (e(this, s, vs).call(this), t(this, w).classList.add("is-volume-open"));
}, ns = new WeakMap(), ei = function(i = 150) {
  e(this, s, vs).call(this), r(this, xt, window.setTimeout(t(this, ns), i));
}, Fs = new WeakMap(), Ss = new WeakMap(), ce = new WeakMap(), ue = new WeakMap(), pe = new WeakMap(), de = new WeakMap(), me = new WeakMap(), fe = new WeakMap(), be = new WeakMap(), ve = new WeakMap(), Ms = new WeakMap(), Vs = new WeakMap(), ge = new WeakMap(), ye = new WeakMap(), we = new WeakMap(), xe = new WeakMap(), ke = new WeakMap(), Pe = new WeakMap(), Ee = new WeakMap(), Te = new WeakMap(), Ce = new WeakMap(), Ae = new WeakMap(), Le = new WeakMap(), Fe = new WeakMap(), Se = new WeakMap(), as = new WeakMap(), Me = new WeakMap(), Ve = new WeakMap(), Ie = new WeakMap(), ze = new WeakMap(), Re = new WeakMap(), De = new WeakMap(), A = function() {
  return window.matchMedia("(max-width: 768px)").matches && window.matchMedia("(hover: none), (pointer: coarse)").matches;
}, Si = function() {
  t(this, o) && (t(this, D)?.disconnect(), r(this, D, null), e(this, s, ds).call(this), e(this, s, Us).call(this), r(this, H, !1), r(this, ts, 0), r(this, q, !1), r(this, B, !1), r(this, Z, !1), r(this, O, !1), r(this, K, t(this, K) + 1), r(this, yt, !1), r(this, wt, 0), e(this, s, tt).call(this), r(this, y, !0), r(this, N, !1), r(this, bt, !1), r(this, L, null), t(this, h).classList.remove("has-loaded-once", "has-visible-frame", "is-progress-settling"), t(this, o).dataset.src = this.src, t(this, o).pause(), t(this, o).removeAttribute("src"), t(this, o).preload = "none", e(this, s, hs).call(this), t(this, o).load(), e(this, s, dt).call(this, 0), t(this, F).call(this), t(this, V).call(this), e(this, s, T).call(this));
}, oi(li, "observedAttributes", Ri);
customElements.get("simple-player") || customElements.define("simple-player", li);
export {
  li as SimplePlayer
};
//# sourceMappingURL=simple-player.js.map
