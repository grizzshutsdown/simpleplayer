var Pi = Object.defineProperty;
var Ke = (m) => {
  throw TypeError(m);
};
var Ei = (m, b, i) => b in m ? Pi(m, b, { enumerable: !0, configurable: !0, writable: !0, value: i }) : m[b] = i;
var Ge = (m, b, i) => Ei(m, typeof b != "symbol" ? b + "" : b, i), Ve = (m, b, i) => b.has(m) || Ke("Cannot " + i);
var t = (m, b, i) => (Ve(m, b, "read from private field"), i ? i.call(m) : b.get(m)), n = (m, b, i) => b.has(m) ? Ke("Cannot add the same private member more than once") : b instanceof WeakSet ? b.add(m) : b.set(m, i), o = (m, b, i, a) => (Ve(m, b, "write to private field"), a ? a.call(m, i) : b.set(m, i), i), e = (m, b, i) => (Ve(m, b, "access private method"), i);
const Je = "16 / 9", Ti = "360px 0px", Ci = `
  :host {
    --simple-player-aspect-ratio: ${Je};
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
    bottom: calc(100% + var(--space));
    left: var(--sp-scrub-preview-left);
    z-index: 2;
    display: block;
    padding: 2px calc(var(--space) * 1.5);
    color: var(--white);
    background: transparent;
    border-radius: 4px;
    isolation: isolate;
    overflow: hidden;
    pointer-events: none;
    opacity: 0;
    transform: translateX(-50%) translateY(2px);
    transition: transform 120ms ease;
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

  .sp-player.is-scrubbing .sp-time {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
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
`, Qe = document.createElement("template");
Qe.innerHTML = `
  <style>${Ci}</style>
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
var f, Wt, z, jt, R, c, r, q, d, $, Q, Zt, fs, y, _, E, tt, st, pt, dt, v, M, et, F, Tt, it, Ct, N, mt, Ot, At, k, C, Kt, rt, ft, bt, ot, bs, Gt, D, H, W, j, Z, Ft, vt, vs, Lt, gs, ys, gt, V, nt, St, g, O, Jt, Qt, Mt, U, at, w, yt, wt, xt, ts, Ns, Us, ss, Ys, Xs, ws, Vt, _s, Ws, js, Zs, Os, Ks, It, Gs, Js, s, Ss, Ms, Ie, os, ze, si, h, Vs, zt, B, Qs, ns, K, G, Is, as, $t, ei, Nt, ls, Re, De, Rt, Dt, xs, Ht, lt, ht, ks, te, Ps, zs, Es, se, He, hs, Rs, cs, Be, ii, Ts, ri, ct, Y, qe, oi, $e, Ut, L, ni, X, ai, Ne, Ue, li, Bt, Ye, x, J, Xe, hi, Yt, ut, ci, Ds, us, ui, pi, di, S, ps, ds, mi, Xt, fi, T, Et, bi, A, _e, Hs, _t, kt, Bs, We, vi, gi, yi, qt, Pt, wi, Cs, qs, je, $s, ee, ie, re, ms, Ze, es, Oe, As, Fs, oe, ne, ae, le, he, ce, ue, pe, de, me, fe, be, ve, ge, ye, we, xe, ke, Pe, Ee, Te, is, Ce, Ae, Fe, Le, Se, Me, I, xi;
class ti extends HTMLElement {
  constructor() {
    super();
    n(this, s);
    n(this, f);
    n(this, Wt, []);
    n(this, z, null);
    n(this, jt, !1);
    n(this, R, !1);
    n(this, c);
    n(this, r);
    n(this, q);
    n(this, d);
    n(this, $);
    n(this, Q);
    n(this, Zt);
    n(this, fs);
    n(this, y);
    n(this, _);
    n(this, E);
    n(this, tt);
    n(this, st);
    n(this, pt, []);
    n(this, dt, 0);
    n(this, v, !1);
    n(this, M, !1);
    n(this, et, !1);
    n(this, F, 0);
    n(this, Tt, 0);
    n(this, it, 0);
    n(this, Ct, !1);
    n(this, N, !1);
    n(this, mt, !1);
    n(this, Ot, 0);
    n(this, At, 0);
    n(this, k, null);
    n(this, C, null);
    n(this, Kt, 0);
    n(this, rt, 0);
    n(this, ft, 0);
    n(this, bt, 0);
    n(this, ot, 0);
    n(this, bs, 0);
    n(this, Gt, 0);
    n(this, D, !1);
    n(this, H, !1);
    n(this, W, !1);
    n(this, j, !1);
    n(this, Z, 0);
    n(this, Ft, 0);
    n(this, vt, !1);
    n(this, vs, 0);
    n(this, Lt, !0);
    n(this, gs, 0);
    n(this, ys, performance.now());
    n(this, gt, 0);
    n(this, V, null);
    n(this, nt, null);
    n(this, St, !1);
    n(this, g, !0);
    n(this, O, !1);
    n(this, Jt, null);
    n(this, Qt, null);
    n(this, Mt, !1);
    n(this, U, !1);
    n(this, at, !1);
    n(this, w, null);
    n(this, yt, 0);
    n(this, wt, 0);
    n(this, xt, 0);
    n(this, ts, null);
    n(this, Ns, 4);
    n(this, Us, 3.5);
    n(this, ss, 6);
    n(this, Ys, 0.08);
    n(this, Xs, 240);
    n(this, ws, 1200);
    n(this, Vt, 1600);
    n(this, _s, 140);
    n(this, Ws, 380);
    n(this, js, 650);
    n(this, Zs, 2e3);
    n(this, Os, 3);
    n(this, Ks, 10);
    n(this, It, 0.18);
    n(this, Gs, 8);
    n(this, Js, 18);
    n(this, zt, (i) => {
      i.preventDefault();
    });
    n(this, Qs, () => {
      if (o(this, ft, 0), !(t(this, M) || t(this, v) || t(this, U))) {
        if (e(this, s, I).call(this)) {
          t(this, c).classList.remove("is-controls-visible");
          return;
        }
        t(this, O) || t(this, c).classList.remove("is-pointer-active");
      }
    });
    n(this, Rt, (i) => {
      e(this, s, $t).call(this, i) && e(this, s, Is).call(this, !0);
    });
    n(this, Dt, (i) => {
      e(this, s, $t).call(this, i) && e(this, s, Is).call(this, !0);
    });
    n(this, xs, (i) => {
      e(this, s, $t).call(this, i) && e(this, s, De).call(this);
    });
    n(this, Ht, () => {
      e(this, s, as).call(this);
    });
    n(this, lt, (i) => {
      e(this, s, $t).call(this, i) && (o(this, O, !0), t(this, c).classList.add("is-pointer-active"), e(this, s, B).call(this));
    });
    n(this, ht, () => {
      o(this, O, !1), e(this, s, ns).call(this, t(this, Vt));
    });
    n(this, ks, () => {
      e(this, s, I).call(this) ? t(this, c).classList.add("is-controls-visible") : t(this, c).classList.add("is-pointer-active"), e(this, s, B).call(this);
    });
    n(this, te, () => {
      e(this, s, ns).call(this, t(this, Vt));
    });
    n(this, Ps, (i) => {
      const a = i.currentTarget;
      if (e(this, s, Re).call(this, a)) {
        t(this, Q).style.removeProperty("--sp-control-hover-offset");
        return;
      }
      const l = Number(a?.dataset.spControlIndex ?? 0);
      t(this, Q).style.setProperty("--sp-control-hover-offset", `calc(var(--sp-control-slot-size) * ${l})`);
    });
    n(this, Es, () => {
      o(this, xt, 0), t(this, pt).forEach((i) => i.classList.remove("is-control-tap-active")), this.style.removeProperty("--sp-touch-control-hover-offset");
    });
    n(this, se, (i) => {
      if (!(i instanceof PointerEvent) || i.pointerType !== "touch") return;
      const a = i.currentTarget;
      if (!a || !e(this, s, Nt).call(this) || e(this, s, Re).call(this, a)) return;
      const l = Number(a.dataset.spControlIndex ?? 0);
      e(this, s, zs).call(this), t(this, pt).forEach((u) => u.classList.toggle("is-control-tap-active", u === a)), this.style.setProperty("--sp-touch-control-hover-offset", `calc(var(--sp-control-slot-size) * ${l})`), o(this, xt, window.setTimeout(t(this, Es), 280));
    });
    n(this, Ts, () => {
      if (t(this, ot) || t(this, c).classList.contains("is-progress-settling")) {
        if (e(this, s, Rs).call(this), t(this, vt)) {
          t(this, c).classList.remove("is-progress-settling");
          return;
        }
        o(this, vt, !0), o(this, vs, performance.now() + t(this, js)), e(this, s, X).call(this) || e(this, s, x).call(this), e(this, s, S).call(this), t(this, c).classList.remove("is-progress-settling"), e(this, s, T).call(this);
      }
    });
    n(this, L, () => {
      if (t(this, r).error) {
        e(this, s, Ut).call(this, !0, !0);
        return;
      }
      e(this, s, Ut).call(this, !t(this, R) || !t(this, H) || t(this, r).readyState < HTMLMediaElement.HAVE_FUTURE_DATA);
    });
    n(this, Bt, () => {
      if (t(this, r).error || t(this, r).readyState < HTMLMediaElement.HAVE_CURRENT_DATA || t(this, r).videoWidth <= 0 || t(this, r).videoHeight <= 0)
        return t(this, L).call(this), !1;
      if (!t(this, D))
        return e(this, s, li).call(this), t(this, L).call(this), !1;
      const i = e(this, s, Ue).call(this);
      return t(this, A).call(this), i;
    });
    n(this, A, () => {
      if (!this.volumeEnabled) {
        t(this, c).classList.remove("is-volume-unavailable", "is-volume-muted", "is-volume-sound", "is-volume-icon-animating"), t(this, y).disabled = !0, t(this, y).setAttribute("aria-disabled", "true");
        return;
      }
      o(this, g, e(this, s, bi).call(this));
      const i = !t(this, g) || t(this, r).muted || t(this, r).volume <= 0, a = t(this, g) && !t(this, r).muted ? t(this, r).volume : 0, l = Math.round(a * 100), u = i ? "muted" : "sound";
      t(this, ts) && t(this, ts) !== u && e(this, s, ii).call(this), o(this, ts, u), t(this, c).classList.toggle("is-volume-unavailable", !t(this, g)), t(this, c).classList.toggle("is-volume-muted", i), t(this, c).classList.toggle("is-volume-sound", !i), t(this, c).style.setProperty("--sp-volume-level", `${l}%`), t(this, y).disabled = !t(this, g), t(this, y).setAttribute("aria-disabled", `${!t(this, g)}`), t(this, y).setAttribute(
        "aria-label",
        t(this, g) ? i ? "Unmute video" : "Mute video" : "Video has no audio"
      ), t(this, E).setAttribute("aria-valuenow", `${l}`), t(this, E).setAttribute("aria-valuetext", `${l}%`);
    });
    n(this, kt, () => {
      const i = document.pictureInPictureElement === t(this, r), a = t(this, r), l = !!(this.pictureInPictureEnabled && document.pictureInPictureEnabled && a.requestPictureInPicture);
      t(this, c).classList.toggle("is-picture-in-picture", i), t(this, tt).disabled = !l, t(this, tt).setAttribute("aria-label", i ? "Exit picture in picture" : "Enter picture in picture");
    });
    n(this, qt, () => {
      const i = e(this, s, Bs).call(this), a = i === t(this, c) || i === this, l = e(this, s, We).call(this);
      return t(this, c).classList.toggle("is-fullscreen", a), t(this, st).disabled = !l, t(this, st).setAttribute("aria-label", a ? "Exit fullscreen" : "Enter fullscreen"), a;
    });
    n(this, Pt, () => {
      const i = t(this, qt).call(this);
      e(this, s, wi).call(this, i);
    });
    n(this, Cs, () => {
      !t(this, M) || t(this, v) || (e(this, s, J).call(this), e(this, s, B).call(this), e(this, s, Et).call(this), o(this, v, !0), t(this, c).classList.add("is-scrubbing"), o(this, F, e(this, s, ps).call(this, t(this, Ot), !0)), t(this, et) && t(this, r).pause(), t(this, r).currentTime = t(this, F), e(this, s, x).call(this, t(this, F)), e(this, s, S).call(this, t(this, F)), e(this, s, Xt).call(this), e(this, s, T).call(this));
    });
    n(this, ee, async () => {
      if (performance.now() < t(this, bs))
        return;
      const i = t(this, C) ? t(this, C) !== "playing" : t(this, r).paused || t(this, r).ended, a = !i || e(this, s, ni).call(this);
      e(this, s, G).call(this), a && (o(this, C, i ? "playing" : "paused"), e(this, s, T).call(this)), i ? (e(this, s, J).call(this), await e(this, s, ct).call(this), await t(this, r).play().catch(() => {
        o(this, C, null);
      })) : (e(this, s, hi).call(this), t(this, r).pause()), e(this, s, T).call(this), e(this, s, K).call(this);
    });
    n(this, ie, (i) => {
      if (!(i instanceof PointerEvent)) return;
      const a = t(this, q).getBoundingClientRect(), l = i.clientX >= a.left && i.clientX <= a.right && i.clientY >= a.top && i.clientY <= a.bottom, u = t(this, $).getBoundingClientRect(), p = i.clientX >= u.left && i.clientX <= u.right && i.clientY >= u.top && i.clientY <= u.bottom, P = t(this, d).getBoundingClientRect(), Ls = i.clientX >= P.left && i.clientX <= P.right && i.clientY >= P.top && i.clientY <= P.bottom, rs = e(this, s, G).call(this);
      rs && l && o(this, bs, performance.now() + 260), rs && (p || Ls) && o(this, Gt, performance.now() + 260), e(this, s, ct).call(this);
    });
    n(this, re, (i) => {
      i.stopPropagation();
    });
    n(this, es, () => {
      o(this, yt, 0), !(t(this, at) || t(this, U)) && t(this, y).classList.remove("is-volume-open");
    });
    n(this, As, () => {
      e(this, s, I).call(this) || !this.volumeSliderEnabled || !t(this, g) || (o(this, at, !0), e(this, s, Ze).call(this));
    });
    n(this, Fs, () => {
      e(this, s, I).call(this) || !this.volumeSliderEnabled || !t(this, g) || (o(this, at, !1), e(this, s, Oe).call(this));
    });
    n(this, oe, (i) => {
      !this.volumeEnabled || !t(this, g) || (i.preventDefault(), i.stopPropagation(), !(!e(this, s, Nt).call(this) || e(this, s, ls).call(this)) && (e(this, s, G).call(this), t(this, es).call(this), t(this, r).muted || t(this, r).volume <= 0 ? (t(this, r).volume <= 0 && (t(this, r).volume = 0.7), t(this, r).muted = !1) : t(this, r).muted = !0, t(this, A).call(this), e(this, s, K).call(this)));
    });
    n(this, ne, (i) => {
      i instanceof PointerEvent && (!this.volumeEnabled || !this.volumeSliderEnabled || !t(this, g) || e(this, s, I).call(this) || (i.preventDefault(), i.stopPropagation(), e(this, s, G).call(this), e(this, s, B).call(this), e(this, s, Ze).call(this), o(this, U, !0), o(this, w, i.pointerId), t(this, _).classList.add("is-scrubbing-volume"), t(this, E).setPointerCapture(i.pointerId), e(this, s, _e).call(this, i.clientY)));
    });
    n(this, ae, (i) => {
      i instanceof PointerEvent && t(this, U) && (t(this, w) !== null && i.pointerId !== t(this, w) || (i.preventDefault(), i.stopPropagation(), e(this, s, _e).call(this, i.clientY)));
    });
    n(this, le, (i) => {
      i instanceof PointerEvent && (t(this, w) !== null && i.pointerId !== t(this, w) || (i.stopPropagation(), e(this, s, _t).call(this, i.pointerId), e(this, s, K).call(this)));
    });
    n(this, he, (i) => {
      i instanceof PointerEvent && (t(this, w) !== null && i.pointerId !== t(this, w) || (i.stopPropagation(), e(this, s, _t).call(this, i.pointerId)));
    });
    n(this, ce, (i) => {
      if (!(i instanceof KeyboardEvent) || !this.volumeEnabled || !t(this, g) || !["ArrowUp", "ArrowDown", "Home", "End"].includes(i.key)) return;
      i.preventDefault(), i.stopPropagation();
      const a = i.shiftKey ? 0.1 : 0.05, l = i.key === "Home" ? 0 : i.key === "End" ? 1 : t(this, r).volume + (i.key === "ArrowUp" ? a : -a);
      t(this, r).volume = Math.min(1, Math.max(0, l)), t(this, r).muted = t(this, r).volume <= 0, t(this, A).call(this);
    });
    n(this, ue, async () => {
      const i = t(this, r);
      if (!(!this.pictureInPictureEnabled || !document.pictureInPictureEnabled || !i.requestPictureInPicture) && !(!e(this, s, Nt).call(this) || e(this, s, ls).call(this))) {
        e(this, s, G).call(this);
        try {
          await e(this, s, ct).call(this), document.pictureInPictureElement === t(this, r) ? await document.exitPictureInPicture() : await i.requestPictureInPicture();
        } catch {
        } finally {
          t(this, kt).call(this), e(this, s, K).call(this);
        }
      }
    });
    n(this, pe, async (i) => {
      if (e(this, s, We).call(this) && (i.preventDefault(), i.stopPropagation(), !(!e(this, s, Nt).call(this) || e(this, s, ls).call(this)))) {
        e(this, s, $t).call(this, i), e(this, s, G).call(this);
        try {
          const a = e(this, s, Bs).call(this);
          if (a === t(this, c) || a === this)
            await e(this, s, yi).call(this);
          else {
            await e(this, s, ct).call(this);
            const l = t(this, c);
            typeof l.requestFullscreen == "function" || typeof l.webkitRequestFullscreen == "function" || typeof l.mozRequestFullScreen == "function" || typeof l.msRequestFullscreen == "function" ? await e(this, s, vi).call(this) : e(this, s, gi).call(this);
          }
        } catch {
        } finally {
          t(this, qt).call(this), e(this, s, K).call(this);
        }
      }
    });
    n(this, de, (i) => {
      if (i instanceof PointerEvent) {
        if (i.preventDefault(), !e(this, s, Nt).call(this) || e(this, s, ls).call(this)) {
          e(this, s, G).call(this), e(this, s, I).call(this) && o(this, Gt, performance.now() + 260);
          return;
        }
        e(this, s, G).call(this), e(this, s, B).call(this), t(this, Ts).call(this), o(this, N, !1), o(this, mt, !1), e(this, s, pi).call(this, e(this, s, Yt).call(this)), o(this, M, !0), o(this, k, i.pointerId), o(this, Ot, i.clientX), o(this, et, !t(this, r).paused && !t(this, r).ended), t(this, d).setPointerCapture(i.pointerId), o(this, F, e(this, s, ps).call(this, i.clientX, !1)), e(this, s, Et).call(this), o(this, At, window.setTimeout(t(this, Cs), t(this, Xs)));
      }
    });
    n(this, me, (i) => {
      if (!(i instanceof KeyboardEvent) || !Number.isFinite(t(this, r).duration) || t(this, r).duration <= 0 || !["ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"].includes(i.key)) return;
      i.preventDefault(), i.stopPropagation(), t(this, ks).call(this);
      const a = e(this, s, Yt).call(this), l = i.shiftKey ? 10 : 5, u = Math.max(10, t(this, r).duration * 0.1), p = i.key === "Home" ? 0 : i.key === "End" ? t(this, r).duration : i.key === "PageUp" ? a + u : i.key === "PageDown" ? a - u : a + (i.key === "ArrowRight" ? l : -l);
      t(this, r).currentTime = Math.min(t(this, r).duration, Math.max(0, p)), e(this, s, x).call(this, t(this, r).currentTime), e(this, s, S).call(this, t(this, r).currentTime);
    });
    n(this, fe, (i) => {
      i instanceof PointerEvent && t(this, M) && (t(this, k) !== null && i.pointerId !== t(this, k) || (!t(this, v) && Math.abs(i.clientX - t(this, Ot)) >= t(this, Ns) && t(this, Cs).call(this), t(this, v) && o(this, F, e(this, s, ps).call(this, i.clientX))));
    });
    n(this, be, (i) => {
      i instanceof PointerEvent && (t(this, k) !== null && i.pointerId !== t(this, k) || e(this, s, je).call(this, i.clientX, i.pointerId, !0));
    });
    n(this, ve, (i) => {
      i instanceof PointerEvent && (t(this, k) !== null && i.pointerId !== t(this, k) || e(this, s, $s).call(this, i.pointerId));
    });
    n(this, ge, (i) => {
      if (i instanceof PointerEvent) {
        if (t(this, w) !== null && i.pointerId === t(this, w)) {
          e(this, s, _t).call(this, i.pointerId);
          return;
        }
        t(this, k) === null || i.pointerId !== t(this, k) || e(this, s, je).call(this, i.clientX, i.pointerId, !0);
      }
    });
    n(this, ye, (i) => {
      if (i instanceof PointerEvent) {
        if (t(this, w) !== null && i.pointerId === t(this, w)) {
          e(this, s, _t).call(this, i.pointerId);
          return;
        }
        t(this, k) === null || i.pointerId !== t(this, k) || e(this, s, $s).call(this, i.pointerId);
      }
    });
    n(this, we, () => {
      e(this, s, _t).call(this, t(this, w)), e(this, s, $s).call(this, t(this, k));
    });
    n(this, xe, () => {
      e(this, s, Bs).call(this) || e(this, s, as).call(this);
    });
    n(this, ke, () => {
      o(this, C, null), e(this, s, J).call(this), e(this, s, X).call(this) || e(this, s, x).call(this), e(this, s, T).call(this);
    });
    n(this, Pe, () => {
      o(this, C, null), e(this, s, X).call(this) || e(this, s, Xe).call(this), t(this, L).call(this), e(this, s, T).call(this);
    });
    n(this, Ee, () => {
      o(this, C, null), e(this, s, J).call(this), e(this, s, X).call(this) || e(this, s, x).call(this), e(this, s, T).call(this);
    });
    n(this, Te, () => {
      e(this, s, Ut).call(this, !0, !0);
    });
    n(this, is, () => {
      e(this, s, Ut).call(this, !0);
    });
    n(this, Ce, () => {
      e(this, s, J).call(this), o(this, g, !0), t(this, A).call(this), e(this, s, X).call(this) || e(this, s, x).call(this), t(this, L).call(this), e(this, s, S).call(this);
    });
    n(this, Ae, () => {
      const i = t(this, Bt).call(this);
      t(this, A).call(this), i && !e(this, s, X).call(this) && e(this, s, x).call(this), e(this, s, T).call(this);
    });
    n(this, Fe, () => {
      if (e(this, s, J).call(this), t(this, L).call(this), t(this, N) && (!t(this, mt) || t(this, r).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA)) {
        e(this, s, Ne).call(this), e(this, s, T).call(this);
        return;
      }
      e(this, s, X).call(this) || e(this, s, x).call(this), e(this, s, S).call(this);
    });
    n(this, Le, () => {
      o(this, C, null), o(this, D, !1), o(this, H, !1), o(this, W, !1), o(this, j, !1), o(this, Z, t(this, Z) + 1), t(this, c).classList.remove("has-visible-frame"), e(this, s, Ut).call(this, !0, !0), e(this, s, T).call(this), e(this, s, ai).call(this);
    });
    n(this, Se, () => {
      t(this, A).call(this), e(this, s, S).call(this);
    });
    n(this, Me, () => {
      t(this, A).call(this);
    });
    o(this, f, this.attachShadow({ mode: "open" })), t(this, f).append(Qe.content.cloneNode(!0));
  }
  get src() {
    return this.getAttribute("src") ?? "";
  }
  set src(i) {
    e(this, s, Ss).call(this, "src", i);
  }
  get aspectRatio() {
    return this.getAttribute("aspect-ratio") || Je;
  }
  set aspectRatio(i) {
    e(this, s, Ss).call(this, "aspect-ratio", i);
  }
  get preloadMargin() {
    return this.getAttribute("preload-margin") || Ti;
  }
  set preloadMargin(i) {
    e(this, s, Ss).call(this, "preload-margin", i);
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
  get volumeEnabled() {
    return (this.hasAttribute("controls") || this.hasAttribute("enable-volume")) && !this.hasAttribute("disable-volume") && !this.hasAttribute("no-volume");
  }
  set volumeEnabled(i) {
    e(this, s, Ms).call(this, "volume", i);
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
    return (this.hasAttribute("controls") || this.hasAttribute("enable-picture-in-picture")) && !this.hasAttribute("disable-picture-in-picture") && !this.hasAttribute("no-picture-in-picture");
  }
  set pictureInPictureEnabled(i) {
    e(this, s, Ms).call(this, "picture-in-picture", i);
  }
  get fullscreenEnabled() {
    return (this.hasAttribute("controls") || this.hasAttribute("enable-fullscreen")) && !this.hasAttribute("disable-fullscreen") && !this.hasAttribute("no-fullscreen");
  }
  set fullscreenEnabled(i) {
    e(this, s, Ms).call(this, "fullscreen", i);
  }
  connectedCallback() {
    o(this, c, t(this, f).querySelector("[data-sp-player]")), o(this, r, t(this, f).querySelector("[data-sp-video]")), o(this, q, t(this, f).querySelector("[data-sp-button]")), o(this, d, t(this, f).querySelector("[data-sp-progress-track]")), o(this, $, t(this, f).querySelector("[data-sp-control-tray]")), o(this, Q, t(this, f).querySelector("[data-sp-control-tray-slots]")), o(this, Zt, t(this, f).querySelector("[data-sp-time]")), o(this, fs, t(this, f).querySelector("[data-sp-time-text]")), o(this, y, t(this, f).querySelector("[data-sp-volume-control]")), o(this, _, t(this, f).querySelector("[data-sp-volume-popover]")), o(this, E, t(this, f).querySelector("[data-sp-volume-track]")), o(this, tt, t(this, f).querySelector("[data-sp-picture-in-picture-control]")), o(this, st, t(this, f).querySelector("[data-sp-fullscreen-control]")), o(this, pt, [t(this, y), t(this, tt), t(this, st)]), e(this, s, Ie).call(this), t(this, jt) || (e(this, s, si).call(this), o(this, jt, !0)), e(this, s, os).call(this), e(this, s, Vs).call(this), e(this, s, ze).call(this), t(this, L).call(this), t(this, A).call(this), t(this, kt).call(this), t(this, qt).call(this), e(this, s, T).call(this);
  }
  disconnectedCallback() {
    t(this, z)?.disconnect(), o(this, z, null), t(this, Wt).forEach((i) => i()), o(this, Wt, []), o(this, jt, !1), e(this, s, B).call(this), e(this, s, He).call(this), e(this, s, hs).call(this), e(this, s, Rs).call(this), e(this, s, Et).call(this), e(this, s, cs).call(this), e(this, s, ms).call(this), e(this, s, Be).call(this), e(this, s, zs).call(this), t(this, c).classList.remove("is-volume-icon-animating"), t(this, Q).style.removeProperty("--sp-control-hover-offset"), this.style.removeProperty("--sp-touch-control-hover-offset"), e(this, s, ds).call(this), o(this, U, !1), o(this, at, !1), o(this, O, !1), o(this, w, null), t(this, y).classList.remove("is-volume-open"), t(this, pt).forEach((i) => i.classList.remove("is-control-tap-active")), t(this, c).classList.remove("is-pointer-active"), e(this, s, Xt).call(this);
  }
  attributeChangedCallback(i, a, l) {
    if (a !== l) {
      if (i === "aspect-ratio") {
        e(this, s, Ie).call(this);
        return;
      }
      if (i === "preload-margin" && this.isConnected) {
        t(this, z)?.disconnect(), e(this, s, Vs).call(this);
        return;
      }
      if (i === "src" && this.isConnected) {
        e(this, s, xi).call(this), e(this, s, Vs).call(this);
        return;
      }
      if ((i === "disable-autoplay" || i === "no-autoplay") && this.isConnected) {
        e(this, s, os).call(this), t(this, A).call(this), e(this, s, T).call(this);
        return;
      }
      (i === "controls" || i.startsWith("enable-") || i.startsWith("disable-") || i.startsWith("no-")) && this.isConnected && (e(this, s, ze).call(this), t(this, A).call(this), t(this, kt).call(this), t(this, qt).call(this));
    }
  }
}
f = new WeakMap(), Wt = new WeakMap(), z = new WeakMap(), jt = new WeakMap(), R = new WeakMap(), c = new WeakMap(), r = new WeakMap(), q = new WeakMap(), d = new WeakMap(), $ = new WeakMap(), Q = new WeakMap(), Zt = new WeakMap(), fs = new WeakMap(), y = new WeakMap(), _ = new WeakMap(), E = new WeakMap(), tt = new WeakMap(), st = new WeakMap(), pt = new WeakMap(), dt = new WeakMap(), v = new WeakMap(), M = new WeakMap(), et = new WeakMap(), F = new WeakMap(), Tt = new WeakMap(), it = new WeakMap(), Ct = new WeakMap(), N = new WeakMap(), mt = new WeakMap(), Ot = new WeakMap(), At = new WeakMap(), k = new WeakMap(), C = new WeakMap(), Kt = new WeakMap(), rt = new WeakMap(), ft = new WeakMap(), bt = new WeakMap(), ot = new WeakMap(), bs = new WeakMap(), Gt = new WeakMap(), D = new WeakMap(), H = new WeakMap(), W = new WeakMap(), j = new WeakMap(), Z = new WeakMap(), Ft = new WeakMap(), vt = new WeakMap(), vs = new WeakMap(), Lt = new WeakMap(), gs = new WeakMap(), ys = new WeakMap(), gt = new WeakMap(), V = new WeakMap(), nt = new WeakMap(), St = new WeakMap(), g = new WeakMap(), O = new WeakMap(), Jt = new WeakMap(), Qt = new WeakMap(), Mt = new WeakMap(), U = new WeakMap(), at = new WeakMap(), w = new WeakMap(), yt = new WeakMap(), wt = new WeakMap(), xt = new WeakMap(), ts = new WeakMap(), Ns = new WeakMap(), Us = new WeakMap(), ss = new WeakMap(), Ys = new WeakMap(), Xs = new WeakMap(), ws = new WeakMap(), Vt = new WeakMap(), _s = new WeakMap(), Ws = new WeakMap(), js = new WeakMap(), Zs = new WeakMap(), Os = new WeakMap(), Ks = new WeakMap(), It = new WeakMap(), Gs = new WeakMap(), Js = new WeakMap(), s = new WeakSet(), Ss = function(i, a) {
  if (a === "") {
    this.removeAttribute(i);
    return;
  }
  this.setAttribute(i, a);
}, Ms = function(i, a) {
  if (a) {
    this.setAttribute(`enable-${i}`, ""), this.removeAttribute(`disable-${i}`), this.removeAttribute(`no-${i}`);
    return;
  }
  this.removeAttribute(`enable-${i}`), this.setAttribute(`disable-${i}`, "");
}, Ie = function() {
  this.style.setProperty("--simple-player-aspect-ratio", this.aspectRatio);
}, os = function() {
  if (!t(this, r)) return;
  const i = this.autoplayEnabled;
  if (t(this, r).autoplay = i, i) {
    t(this, r).muted = !0, t(this, r).setAttribute("autoplay", ""), t(this, r).setAttribute("muted", "");
    return;
  }
  t(this, r).removeAttribute("autoplay"), t(this, R) || (t(this, r).muted = !1, t(this, r).removeAttribute("muted"));
}, ze = function() {
  if (!t(this, c)) return;
  const i = [
    { button: t(this, y), enabled: this.volumeEnabled, className: "has-volume-control" },
    { button: t(this, tt), enabled: this.pictureInPictureEnabled, className: "has-picture-in-picture-control" },
    { button: t(this, st), enabled: this.fullscreenEnabled, className: "has-fullscreen-control" }
  ];
  let a = 0;
  for (const l of i)
    t(this, c).classList.toggle(l.className, l.enabled), l.button.hidden = !l.enabled, l.enabled ? (l.button.dataset.spControlIndex = `${a}`, a += 1) : delete l.button.dataset.spControlIndex;
  this.style.setProperty("--sp-enabled-controls-count", `${a}`), this.style.setProperty("--sp-control-tray-display", a > 0 ? "block" : "none"), t(this, c).classList.toggle("has-volume-slider-control", this.volumeEnabled && this.volumeSliderEnabled), (!this.volumeEnabled || !this.volumeSliderEnabled) && (t(this, es).call(this), e(this, s, Hs).call(this, t(this, w)), o(this, U, !1), o(this, at, !1), t(this, _).classList.remove("is-scrubbing-volume")), t(this, Q).style.removeProperty("--sp-control-hover-offset");
}, si = function() {
  e(this, s, h).call(this, t(this, q), "click", t(this, ee)), e(this, s, h).call(this, this, "pointerenter", t(this, Rt)), e(this, s, h).call(this, this, "pointermove", t(this, Dt)), e(this, s, h).call(this, this, "pointerleave", t(this, Ht)), e(this, s, h).call(this, this, "mouseenter", t(this, Rt)), e(this, s, h).call(this, this, "mousemove", t(this, Dt)), e(this, s, h).call(this, this, "mouseleave", t(this, Ht)), e(this, s, h).call(this, t(this, c), "pointerenter", t(this, Rt)), e(this, s, h).call(this, t(this, c), "pointermove", t(this, Dt)), e(this, s, h).call(this, t(this, c), "pointerleave", t(this, Ht)), e(this, s, h).call(this, t(this, c), "mouseenter", t(this, Rt)), e(this, s, h).call(this, t(this, c), "mousemove", t(this, Dt)), e(this, s, h).call(this, t(this, c), "mouseleave", t(this, Ht)), e(this, s, h).call(this, t(this, q), "pointerenter", t(this, lt)), e(this, s, h).call(this, t(this, q), "pointerleave", t(this, ht)), e(this, s, h).call(this, t(this, q), "mouseenter", t(this, lt)), e(this, s, h).call(this, t(this, q), "mouseleave", t(this, ht)), e(this, s, h).call(this, t(this, d), "pointerenter", t(this, lt)), e(this, s, h).call(this, t(this, d), "pointerleave", t(this, ht)), e(this, s, h).call(this, t(this, d), "mouseenter", t(this, lt)), e(this, s, h).call(this, t(this, d), "mouseleave", t(this, ht)), e(this, s, h).call(this, t(this, $), "pointerenter", t(this, lt)), e(this, s, h).call(this, t(this, $), "pointerleave", t(this, ht)), e(this, s, h).call(this, t(this, $), "mouseenter", t(this, lt)), e(this, s, h).call(this, t(this, $), "mouseleave", t(this, ht)), e(this, s, h).call(this, t(this, f), "focusin", t(this, ks)), e(this, s, h).call(this, t(this, f), "focusout", t(this, te)), e(this, s, h).call(this, t(this, c), "pointerdown", t(this, ie)), e(this, s, h).call(this, t(this, c), "dragstart", t(this, zt)), e(this, s, h).call(this, t(this, c), "selectstart", t(this, zt)), e(this, s, h).call(this, t(this, r), "dragstart", t(this, zt)), e(this, s, h).call(this, t(this, r), "selectstart", t(this, zt)), e(this, s, h).call(this, t(this, d), "pointerdown", t(this, de)), e(this, s, h).call(this, t(this, d), "pointermove", t(this, fe)), e(this, s, h).call(this, t(this, d), "pointerup", t(this, be)), e(this, s, h).call(this, t(this, d), "pointercancel", t(this, ve)), e(this, s, h).call(this, t(this, d), "keydown", t(this, me)), e(this, s, h).call(this, t(this, y), "pointerenter", t(this, As)), e(this, s, h).call(this, t(this, y), "pointerleave", t(this, Fs)), e(this, s, h).call(this, t(this, y), "click", t(this, oe)), e(this, s, h).call(this, t(this, _), "pointerenter", t(this, As)), e(this, s, h).call(this, t(this, _), "pointerleave", t(this, Fs)), e(this, s, h).call(this, t(this, E), "pointerdown", t(this, ne)), e(this, s, h).call(this, t(this, E), "pointermove", t(this, ae)), e(this, s, h).call(this, t(this, E), "pointerup", t(this, le)), e(this, s, h).call(this, t(this, E), "pointercancel", t(this, he)), e(this, s, h).call(this, t(this, E), "click", t(this, re)), e(this, s, h).call(this, t(this, E), "keydown", t(this, ce)), e(this, s, h).call(this, t(this, tt), "click", t(this, ue)), e(this, s, h).call(this, t(this, st), "click", t(this, pe));
  for (const i of t(this, pt))
    e(this, s, h).call(this, i, "pointerenter", t(this, Ps)), e(this, s, h).call(this, i, "mouseenter", t(this, Ps)), e(this, s, h).call(this, i, "pointerdown", t(this, se));
  e(this, s, h).call(this, document, "pointerup", t(this, ge)), e(this, s, h).call(this, document, "pointercancel", t(this, ye)), e(this, s, h).call(this, document, "pointermove", t(this, xs)), e(this, s, h).call(this, document, "mousemove", t(this, xs)), e(this, s, h).call(this, document, "fullscreenchange", t(this, Pt)), e(this, s, h).call(this, document, "webkitfullscreenchange", t(this, Pt)), e(this, s, h).call(this, document, "mozfullscreenchange", t(this, Pt)), e(this, s, h).call(this, document, "MSFullscreenChange", t(this, Pt)), e(this, s, h).call(this, t(this, f), "fullscreenchange", t(this, Pt)), e(this, s, h).call(this, window, "blur", t(this, we)), e(this, s, h).call(this, window, "focus", t(this, xe)), e(this, s, h).call(this, t(this, r), "play", t(this, ke)), e(this, s, h).call(this, t(this, r), "pause", t(this, Pe)), e(this, s, h).call(this, t(this, r), "ended", t(this, Ee)), e(this, s, h).call(this, t(this, r), "loadstart", t(this, Te)), e(this, s, h).call(this, t(this, r), "waiting", t(this, is)), e(this, s, h).call(this, t(this, r), "stalled", t(this, is)), e(this, s, h).call(this, t(this, r), "seeking", t(this, is)), e(this, s, h).call(this, t(this, r), "loadeddata", t(this, Bt)), e(this, s, h).call(this, t(this, r), "loadedmetadata", t(this, Ce)), e(this, s, h).call(this, t(this, r), "canplay", t(this, Bt)), e(this, s, h).call(this, t(this, r), "canplaythrough", t(this, Bt)), e(this, s, h).call(this, t(this, r), "playing", t(this, Ae)), e(this, s, h).call(this, t(this, r), "seeked", t(this, Fe)), e(this, s, h).call(this, t(this, r), "error", t(this, Le)), e(this, s, h).call(this, t(this, r), "progress", t(this, L)), e(this, s, h).call(this, t(this, r), "suspend", t(this, L)), e(this, s, h).call(this, t(this, r), "timeupdate", t(this, Se)), e(this, s, h).call(this, t(this, r), "volumechange", t(this, Me)), e(this, s, h).call(this, t(this, r), "enterpictureinpicture", t(this, kt)), e(this, s, h).call(this, t(this, r), "leavepictureinpicture", t(this, kt));
}, h = function(i, a, l) {
  i.addEventListener(a, l), t(this, Wt).push(() => i.removeEventListener(a, l));
}, Vs = function() {
  if (!(!this.src || t(this, R))) {
    if (t(this, z)?.disconnect(), t(this, r).dataset.src = this.src, "IntersectionObserver" in window) {
      o(this, z, new IntersectionObserver((i, a) => {
        i.some((l) => l.isIntersecting) && (a.disconnect(), o(this, z, null), e(this, s, ct).call(this));
      }, { rootMargin: this.preloadMargin })), t(this, z).observe(t(this, c));
      return;
    }
    e(this, s, ct).call(this);
  }
}, zt = new WeakMap(), B = function() {
  t(this, ft) && (window.clearTimeout(t(this, ft)), o(this, ft, 0));
}, Qs = new WeakMap(), ns = function(i = e(this, s, I).call(this) ? t(this, ws) : t(this, Vt)) {
  e(this, s, B).call(this), o(this, ft, window.setTimeout(t(this, Qs), i));
}, K = function() {
  e(this, s, I).call(this) && e(this, s, ns).call(this, t(this, ws));
}, G = function() {
  if (!e(this, s, I).call(this)) return !1;
  const i = t(this, c).classList.contains("is-controls-visible");
  return t(this, c).classList.add("is-controls-visible"), e(this, s, K).call(this), !i;
}, Is = function(i = !1) {
  !i && e(this, s, I).call(this) || (t(this, c).classList.add("is-pointer-active"), t(this, O) ? e(this, s, B).call(this) : e(this, s, ns).call(this, i ? t(this, Vt) : void 0));
}, as = function() {
  o(this, O, !1), e(this, s, B).call(this), t(this, c).classList.remove("is-pointer-active");
}, $t = function(i) {
  return i instanceof PointerEvent ? (o(this, Mt, i.pointerType === "touch"), t(this, Mt) ? !1 : (o(this, Jt, i.clientX), o(this, Qt, i.clientY), !0)) : i instanceof MouseEvent ? (o(this, Mt, !1), o(this, Jt, i.clientX), o(this, Qt, i.clientY), !0) : !1;
}, ei = function(i, a) {
  if (i === null || a === null || i < 0 || a < 0 || i > window.innerWidth || a > window.innerHeight) return !1;
  const l = this.getBoundingClientRect();
  return l.width <= 0 || l.height <= 0 ? !1 : i >= l.left && i <= l.right && a >= l.top && a <= l.bottom;
}, Nt = function() {
  return t(this, c).classList.contains("is-controls-visible") || t(this, c).classList.contains("is-pointer-active") || t(this, f).activeElement instanceof HTMLElement;
}, ls = function() {
  return e(this, s, I).call(this) && performance.now() < t(this, Gt);
}, Re = function(i) {
  return i instanceof HTMLButtonElement && (i.disabled || i === t(this, y) && (!this.volumeEnabled || !t(this, g)));
}, De = function() {
  if (!t(this, Mt) && e(this, s, ei).call(this, t(this, Jt), t(this, Qt))) {
    e(this, s, Is).call(this, !0);
    return;
  }
  e(this, s, as).call(this);
}, Rt = new WeakMap(), Dt = new WeakMap(), xs = new WeakMap(), Ht = new WeakMap(), lt = new WeakMap(), ht = new WeakMap(), ks = new WeakMap(), te = new WeakMap(), Ps = new WeakMap(), zs = function() {
  t(this, xt) && (window.clearTimeout(t(this, xt)), o(this, xt, 0));
}, Es = new WeakMap(), se = new WeakMap(), He = function() {
  t(this, bt) && (window.clearTimeout(t(this, bt)), o(this, bt, 0));
}, hs = function() {
  t(this, rt) && (window.clearTimeout(t(this, rt)), o(this, rt, 0));
}, Rs = function() {
  t(this, ot) && (window.clearTimeout(t(this, ot)), o(this, ot, 0));
}, cs = function() {
  t(this, Ft) && (window.clearTimeout(t(this, Ft)), o(this, Ft, 0));
}, Be = function() {
  t(this, wt) && (window.clearTimeout(t(this, wt)), o(this, wt, 0));
}, ii = function() {
  e(this, s, Be).call(this), t(this, c).classList.remove("is-volume-icon-animating"), t(this, y).offsetWidth, t(this, c).classList.add("is-volume-icon-animating"), o(this, wt, window.setTimeout(() => {
    o(this, wt, 0), t(this, c).classList.remove("is-volume-icon-animating");
  }, 240));
}, Ts = new WeakMap(), ri = function() {
  t(this, vt) || t(this, ot) || (t(this, c).classList.add("is-progress-settling"), e(this, s, ut).call(this, 0), o(this, ot, window.setTimeout(t(this, Ts), t(this, Ws))));
}, ct = async function() {
  if (t(this, R)) return;
  const i = t(this, r).dataset.src || this.src;
  i && (e(this, s, hs).call(this), e(this, s, cs).call(this), o(this, Kt, t(this, Kt) + 1), o(this, R, !0), o(this, D, !1), o(this, H, !1), o(this, W, !1), o(this, j, !1), o(this, Z, t(this, Z) + 1), t(this, c).classList.remove("has-visible-frame"), e(this, s, os).call(this), t(this, r).src = i, t(this, r).preload = "auto", t(this, r).load(), t(this, r).autoplay && t(this, r).muted && await t(this, r).play().catch(() => {
  }));
}, Y = function(i) {
  if (!Number.isFinite(i) || i < 0) return "0:00";
  const a = Math.floor(i), l = a % 60, u = Math.floor(a / 60), p = u % 60, P = Math.floor(u / 60);
  return P > 0 ? `${P}:${String(p).padStart(2, "0")}:${String(l).padStart(2, "0")}` : `${p}:${String(l).padStart(2, "0")}`;
}, qe = function() {
  return !t(this, r).loop || t(this, r).paused || !Number.isFinite(t(this, r).duration) || t(this, r).duration <= 0 ? !1 : t(this, r).currentTime < 0.28 || t(this, r).duration - t(this, r).currentTime < 0.28;
}, oi = function(i = t(this, r).currentTime) {
  if (!Number.isFinite(i)) return 0;
  const a = Math.max(0, i);
  try {
    for (let l = 0; l < t(this, r).buffered.length; l += 1) {
      const u = t(this, r).buffered.start(l), p = t(this, r).buffered.end(l);
      if (a + t(this, It) >= u && a <= p + t(this, It))
        return Math.max(0, p - a);
    }
  } catch {
    return 0;
  }
  return 0;
}, $e = function(i = t(this, Ks)) {
  if (!t(this, R) || t(this, r).error || !t(this, c).classList.contains("has-loaded-once") || !Number.isFinite(t(this, r).duration) || t(this, r).duration <= 0) return !1;
  const a = Math.max(0, t(this, r).duration - t(this, r).currentTime), l = Math.min(i, a);
  return l <= t(this, It) || e(this, s, oi).call(this) + t(this, It) >= l;
}, Ut = function(i, a = !1) {
  e(this, s, He).call(this);
  const l = i && !e(this, s, qe).call(this) && !e(this, s, $e).call(this), p = i && !t(this, H) || l;
  if (o(this, Lt, p), !p) {
    t(this, c).classList.remove("is-loading");
    return;
  }
  if (a) {
    t(this, c).classList.add("is-loading");
    return;
  }
  o(this, bt, window.setTimeout(() => {
    if (o(this, bt, 0), !t(this, H) || !e(this, s, qe).call(this) && !e(this, s, $e).call(this)) {
      o(this, Lt, !0), t(this, c).classList.add("is-loading");
      return;
    }
    o(this, Lt, !1), t(this, c).classList.remove("is-loading");
  }, t(this, _s)));
}, L = new WeakMap(), ni = function() {
  return t(this, R) && !t(this, r).error && t(this, D) && (t(this, r).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA || t(this, r).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !t(this, c).classList.contains("is-loading"));
}, X = function() {
  return t(this, M) || t(this, v) || t(this, N);
}, ai = function() {
  t(this, Kt) >= t(this, Os) || t(this, rt) || o(this, rt, window.setTimeout(() => {
    o(this, rt, 0), e(this, s, cs).call(this), o(this, R, !1), o(this, D, !1), o(this, H, !1), o(this, W, !1), o(this, j, !1), o(this, Z, t(this, Z) + 1), t(this, c).classList.remove("has-visible-frame"), t(this, c).classList.contains("has-loaded-once") || e(this, s, ut).call(this, 0), t(this, r).removeAttribute("src"), t(this, r).load(), e(this, s, ct).call(this);
  }, t(this, Zs)));
}, Ne = function() {
  return t(this, N) ? (o(this, N, !1), o(this, mt, !1), e(this, s, x).call(this), e(this, s, S).call(this), !0) : !1;
}, Ue = function() {
  return e(this, s, hs).call(this), !t(this, c).classList.contains("has-loaded-once") && e(this, s, ri).call(this), t(this, c).classList.add("has-loaded-once"), t(this, c).classList.add("has-visible-frame"), t(this, L).call(this), o(this, C, null), t(this, N) ? (e(this, s, Ne).call(this), !0) : (e(this, s, X).call(this) || e(this, s, x).call(this), e(this, s, S).call(this), !0);
}, li = function() {
  if (t(this, D) || t(this, W) || t(this, r).error) return;
  o(this, W, !0);
  const i = t(this, Z), a = () => {
    if (i === t(this, Z)) {
      if (e(this, s, cs).call(this), o(this, W, !1), o(this, D, !t(this, r).error && t(this, r).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && t(this, r).videoWidth > 0 && t(this, r).videoHeight > 0), t(this, D)) {
        if (t(this, j) || t(this, H)) return;
        o(this, j, !0), window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            i === t(this, Z) && (o(this, j, !1), o(this, H, !0), e(this, s, Ue).call(this), e(this, s, T).call(this));
          });
        }), e(this, s, T).call(this);
        return;
      }
      t(this, L).call(this);
    }
  };
  if ("requestVideoFrameCallback" in t(this, r)) {
    t(this, r).requestVideoFrameCallback(a), o(this, Ft, window.setTimeout(a, 180));
    return;
  }
  window.requestAnimationFrame(a);
}, Bt = new WeakMap(), Ye = function() {
  return !t(this, r).paused && (!t(this, r).ended || t(this, r).loop) && t(this, r).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
}, x = function(i = t(this, r).currentTime) {
  o(this, gs, Number.isFinite(i) ? Math.max(0, i) : 0), o(this, ys, performance.now());
}, J = function() {
  o(this, V, null), o(this, nt, null);
}, Xe = function() {
  if (!Number.isFinite(t(this, r).duration) || t(this, r).duration <= 0) {
    o(this, V, null);
    return;
  }
  const i = Number.isFinite(t(this, r).currentTime) ? Math.max(0, t(this, r).currentTime) : 0, a = Number.isFinite(t(this, gt)) ? t(this, gt) : i;
  o(this, V, Math.min(t(this, r).duration, Math.max(i, a))), e(this, s, x).call(this, t(this, V));
}, hi = function() {
  if (!Number.isFinite(t(this, r).duration) || t(this, r).duration <= 0) {
    o(this, nt, null), e(this, s, Xe).call(this);
    return;
  }
  const i = t(this, c).style.getPropertyValue("--sp-progress-inset"), a = Number.parseFloat(i), l = Number.isFinite(a) ? Math.min(1, Math.max(0, 1 - a / 100)) : null, u = e(this, s, Yt).call(this), p = Math.min(1, Math.max(0, u / t(this, r).duration)), P = Math.max(l ?? 0, p);
  o(this, nt, P), o(this, V, P * t(this, r).duration), e(this, s, x).call(this, t(this, V)), e(this, s, ut).call(this, P), t(this, d).setAttribute("aria-valuenow", `${t(this, V)}`), t(this, d).setAttribute(
    "aria-valuetext",
    `${e(this, s, Y).call(this, t(this, V))} of ${e(this, s, Y).call(this, t(this, r).duration)}`
  );
}, Yt = function() {
  if (!Number.isFinite(t(this, r).duration) || t(this, r).duration <= 0) return t(this, r).currentTime || 0;
  if (e(this, s, X).call(this)) return t(this, F);
  if (t(this, V) !== null) return t(this, V);
  if (!e(this, s, Ye).call(this)) return t(this, r).currentTime || 0;
  if (t(this, Lt) || !t(this, vt) || performance.now() < t(this, vs))
    return e(this, s, x).call(this), t(this, r).currentTime || 0;
  if (t(this, c).classList.contains("is-loading") && t(this, r).readyState < HTMLMediaElement.HAVE_FUTURE_DATA)
    return e(this, s, x).call(this), t(this, r).currentTime || 0;
  const i = (performance.now() - t(this, ys)) / 1e3, a = t(this, gs) + i, l = t(this, r).loop ? a % t(this, r).duration : Math.min(a, t(this, r).duration);
  return !t(this, r).loop && t(this, r).currentTime - l > 0.45 ? (e(this, s, x).call(this), t(this, r).currentTime) : l;
}, ut = function(i) {
  const a = Math.min(1, Math.max(0, i)), l = (1 - a) * 100, { innerWidth: u } = e(this, s, Ds).call(this), p = 1 / u, P = t(this, v) && t(this, Ct) && t(this, it) + p < a;
  if (t(this, c).style.setProperty("--sp-progress-inset", `${l}%`), t(this, c).style.setProperty("--sp-return-marker-base-opacity", P ? "0" : "1"), P) {
    const Ls = e(this, s, us).call(this, t(this, it)), rs = Math.max(0, u - 2), ki = Math.min(rs, Math.max(0, Ls - 3));
    t(this, c).style.setProperty("--sp-return-marker-hole-left", `${ki}px`);
  } else
    t(this, c).style.setProperty("--sp-return-marker-hole-left", "-9999px");
}, ci = function(i) {
  return !Number.isFinite(t(this, r).duration) || t(this, r).duration <= 0 ? 0 : Math.min(1, Math.max(0, i / t(this, r).duration));
}, Ds = function(i = t(this, d).getBoundingClientRect()) {
  const a = Math.min(2, Math.max(0, i.width / 2)), l = Math.max(1, i.width - a * 2);
  return { rect: i, sideInset: a, innerWidth: l };
}, us = function(i, a = t(this, d).getBoundingClientRect()) {
  const { sideInset: l, innerWidth: u } = e(this, s, Ds).call(this, a), p = Math.min(1, Math.max(0, i));
  return l + p * u;
}, ui = function(i, a) {
  const { sideInset: l, innerWidth: u } = e(this, s, Ds).call(this, a);
  return Math.min(1, Math.max(0, (i - a.left - l) / u));
}, pi = function(i) {
  o(this, Tt, Number.isFinite(i) ? Math.max(0, i) : 0), o(this, it, e(this, s, ci).call(this, t(this, Tt)));
  const a = t(this, d).getBoundingClientRect(), l = e(this, s, us).call(this, t(this, it), a), u = l >= t(this, ss) && l <= Math.max(t(this, ss), a.width - t(this, ss));
  o(this, Ct, t(this, Tt) > t(this, Ys) && u), t(this, c).classList.toggle("has-return-marker", t(this, Ct)), t(this, c).style.setProperty("--sp-return-marker-left", `${l}px`);
}, di = function(i, a, l, u = t(this, v)) {
  const p = l * t(this, r).duration;
  if (!u || !t(this, Ct))
    return { percent: l, targetTime: p };
  const P = a.left + e(this, s, us).call(this, t(this, it), a);
  return Math.abs(i - P) <= t(this, Us) ? {
    percent: t(this, it),
    targetTime: t(this, Tt)
  } : { percent: l, targetTime: p };
}, S = function(i = e(this, s, Yt).call(this)) {
  const a = Number.isFinite(t(this, r).duration) && t(this, r).duration > 0;
  if (a && t(this, nt) !== null) {
    const p = t(this, nt) * t(this, r).duration;
    o(this, gt, p), e(this, s, ut).call(this, t(this, nt)), t(this, d).setAttribute("aria-valuemin", "0"), t(this, d).setAttribute("aria-valuemax", `${t(this, r).duration}`), t(this, d).setAttribute("aria-valuenow", `${p}`), t(this, d).setAttribute(
      "aria-valuetext",
      `${e(this, s, Y).call(this, p)} of ${e(this, s, Y).call(this, t(this, r).duration)}`
    );
    return;
  }
  const l = a ? Math.min(t(this, r).duration, Math.max(0, i)) : i, u = a ? l / t(this, r).duration : 0;
  o(this, gt, Number.isFinite(l) ? Math.max(0, l) : 0), e(this, s, ut).call(this, u), t(this, d).setAttribute("aria-valuemin", "0"), t(this, d).setAttribute("aria-valuemax", a ? `${t(this, r).duration}` : "0"), t(this, d).setAttribute("aria-valuenow", a ? `${l}` : "0"), t(this, d).setAttribute(
    "aria-valuetext",
    a ? `${e(this, s, Y).call(this, l)} of ${e(this, s, Y).call(this, t(this, r).duration)}` : "Loading video"
  );
}, ps = function(i, a = t(this, v)) {
  if (!Number.isFinite(t(this, r).duration) || t(this, r).duration <= 0) return t(this, r).currentTime;
  const l = t(this, d).getBoundingClientRect(), u = e(this, s, ui).call(this, i, l), p = e(this, s, di).call(this, i, l, u, a);
  return e(this, s, ut).call(this, p.percent), t(this, c).style.setProperty("--sp-scrub-preview-left", `${e(this, s, us).call(this, p.percent, l)}px`), t(this, fs).textContent = e(this, s, Y).call(this, p.targetTime), t(this, d).setAttribute("aria-valuenow", `${p.targetTime}`), t(this, d).setAttribute(
    "aria-valuetext",
    `${e(this, s, Y).call(this, p.targetTime)} of ${e(this, s, Y).call(this, t(this, r).duration)}`
  ), e(this, s, mi).call(this), p.targetTime;
}, ds = function() {
  o(this, St, !1), t(this, c)?.classList.remove("has-controls-collision");
}, mi = function() {
  if (!t(this, v) || !t(this, $) || !t(this, Zt)) {
    e(this, s, ds).call(this);
    return;
  }
  const i = t(this, $).getBoundingClientRect(), a = t(this, Zt).getBoundingClientRect(), l = i.width > 0 && i.height > 0, u = t(this, St) ? t(this, Js) : t(this, Gs), p = l && a.right >= i.left - u && a.left <= i.right + u && a.bottom >= i.top - u && a.top <= i.bottom + u;
  o(this, St, p), t(this, c).classList.toggle("has-controls-collision", t(this, St));
}, Xt = function() {
  t(this, dt) && (window.cancelAnimationFrame(t(this, dt)), o(this, dt, 0));
}, fi = function() {
  e(this, s, Xt).call(this), e(this, s, x).call(this);
  const i = () => {
    e(this, s, S).call(this, e(this, s, Yt).call(this)), e(this, s, Ye).call(this) && o(this, dt, window.requestAnimationFrame(i));
  };
  o(this, dt, window.requestAnimationFrame(i));
}, T = function() {
  const i = !t(this, r).paused && (!t(this, r).ended || t(this, r).loop) || t(this, v) && t(this, et), a = t(this, C) ? t(this, C) === "playing" : i;
  if (t(this, c).classList.toggle("is-playing", a), t(this, q).setAttribute("aria-label", a ? "Pause video" : "Play video"), t(this, v)) {
    e(this, s, Xt).call(this);
    return;
  }
  i && t(this, c).classList.contains("has-loaded-once") && !t(this, c).classList.contains("is-progress-settling") ? e(this, s, fi).call(this) : (e(this, s, Xt).call(this), e(this, s, S).call(this));
}, Et = function() {
  t(this, At) && (window.clearTimeout(t(this, At)), o(this, At, 0));
}, bi = function() {
  const i = t(this, r);
  return i.audioTracks && typeof i.audioTracks.length == "number" ? i.audioTracks.length > 0 : typeof i.mozHasAudio == "boolean" ? i.mozHasAudio : typeof i.webkitAudioDecodedByteCount == "number" && t(this, r).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !t(this, r).muted && t(this, r).currentTime > 0.25 ? i.webkitAudioDecodedByteCount > 0 : t(this, g);
}, A = new WeakMap(), _e = function(i) {
  if (!t(this, g)) return;
  const a = t(this, E).getBoundingClientRect(), l = Math.min(1, Math.max(0, 1 - (i - a.top) / a.height)), u = Math.round(l * 100) / 100;
  t(this, r).volume = u, t(this, r).muted = u <= 0, t(this, A).call(this);
}, Hs = function(i) {
  i !== null && t(this, E).hasPointerCapture(i) && t(this, E).releasePointerCapture(i);
}, _t = function(i) {
  o(this, U, !1), o(this, w, null), t(this, _).classList.remove("is-scrubbing-volume"), t(this, E).blur(), e(this, s, Hs).call(this, i), e(this, s, Oe).call(this, 260);
}, kt = new WeakMap(), Bs = function() {
  const i = document;
  return t(this, f).fullscreenElement || i.fullscreenElement || i.webkitFullscreenElement || i.mozFullScreenElement || i.msFullscreenElement || null;
}, We = function() {
  const i = document, a = t(this, c), l = t(this, r), p = !!((i.fullscreenEnabled ?? i.webkitFullscreenEnabled ?? i.mozFullScreenEnabled ?? i.msFullscreenEnabled ?? !1) && (a.requestFullscreen || a.webkitRequestFullscreen || a.mozRequestFullScreen || a.msRequestFullscreen)), P = !!(l.webkitSupportsFullscreen || l.webkitEnterFullscreen || l.webkitEnterFullScreen);
  return !!(this.fullscreenEnabled && (p || P));
}, vi = function() {
  const i = t(this, c), a = i.requestFullscreen || i.webkitRequestFullscreen || i.mozRequestFullScreen || i.msRequestFullscreen;
  return Promise.resolve(a?.call(i));
}, gi = function() {
  const i = t(this, r);
  (i.webkitEnterFullscreen || i.webkitEnterFullScreen)?.call(i);
}, yi = function() {
  const i = document, a = i.exitFullscreen || i.webkitExitFullscreen || i.mozCancelFullScreen || i.msExitFullscreen;
  return Promise.resolve(a?.call(i));
}, qt = new WeakMap(), Pt = new WeakMap(), wi = function(i) {
  e(this, s, B).call(this), e(this, s, ms).call(this), e(this, s, qs).call(this, t(this, k)), e(this, s, Hs).call(this, t(this, w)), e(this, s, Et).call(this), o(this, M, !1), o(this, v, !1), o(this, k, null), o(this, O, !1), o(this, at, !1), o(this, U, !1), o(this, w, null), e(this, s, zs).call(this), t(this, Es).call(this), t(this, Q).style.removeProperty("--sp-control-hover-offset"), t(this, y).classList.remove("is-volume-open"), t(this, _).classList.remove("is-scrubbing-volume"), t(this, c).classList.remove("is-scrubbing"), t(this, c).classList.remove("is-pointer-active");
  const a = t(this, f).activeElement;
  a instanceof HTMLElement && a.blur(), i ? e(this, s, De).call(this) : e(this, s, as).call(this);
}, Cs = new WeakMap(), qs = function(i) {
  i !== null && t(this, d).hasPointerCapture(i) && t(this, d).releasePointerCapture(i);
}, je = async function(i, a, l) {
  if (!t(this, M) && !t(this, v)) return;
  const u = t(this, v);
  e(this, s, Et).call(this), o(this, M, !1), o(this, v, !1), o(this, k, null), t(this, c).classList.remove("is-scrubbing"), e(this, s, ds).call(this), e(this, s, qs).call(this, a), l && i !== null && (e(this, s, J).call(this), o(this, F, e(this, s, ps).call(this, i, u)), o(this, N, !0), o(this, mt, t(this, et)), t(this, r).currentTime = t(this, F), e(this, s, x).call(this, t(this, F))), e(this, s, S).call(this, t(this, F)), u && t(this, et) && await t(this, r).play(), e(this, s, K).call(this);
}, $s = function(i) {
  !t(this, M) && !t(this, v) || (e(this, s, Et).call(this), o(this, M, !1), o(this, v, !1), o(this, k, null), t(this, c).classList.remove("is-scrubbing"), e(this, s, ds).call(this), e(this, s, qs).call(this, i), e(this, s, x).call(this), e(this, s, S).call(this), t(this, et) && t(this, r).play(), e(this, s, K).call(this));
}, ee = new WeakMap(), ie = new WeakMap(), re = new WeakMap(), ms = function() {
  t(this, yt) && (window.clearTimeout(t(this, yt)), o(this, yt, 0));
}, Ze = function() {
  !this.volumeEnabled || !this.volumeSliderEnabled || !t(this, g) || (e(this, s, ms).call(this), t(this, y).classList.add("is-volume-open"));
}, es = new WeakMap(), Oe = function(i = 150) {
  e(this, s, ms).call(this), o(this, yt, window.setTimeout(t(this, es), i));
}, As = new WeakMap(), Fs = new WeakMap(), oe = new WeakMap(), ne = new WeakMap(), ae = new WeakMap(), le = new WeakMap(), he = new WeakMap(), ce = new WeakMap(), ue = new WeakMap(), pe = new WeakMap(), de = new WeakMap(), me = new WeakMap(), fe = new WeakMap(), be = new WeakMap(), ve = new WeakMap(), ge = new WeakMap(), ye = new WeakMap(), we = new WeakMap(), xe = new WeakMap(), ke = new WeakMap(), Pe = new WeakMap(), Ee = new WeakMap(), Te = new WeakMap(), is = new WeakMap(), Ce = new WeakMap(), Ae = new WeakMap(), Fe = new WeakMap(), Le = new WeakMap(), Se = new WeakMap(), Me = new WeakMap(), I = function() {
  return window.matchMedia("(max-width: 768px)").matches && window.matchMedia("(hover: none), (pointer: coarse)").matches;
}, xi = function() {
  t(this, r) && (t(this, z)?.disconnect(), o(this, z, null), e(this, s, hs).call(this), e(this, s, Rs).call(this), o(this, R, !1), o(this, Kt, 0), o(this, D, !1), o(this, H, !1), o(this, W, !1), o(this, j, !1), o(this, Z, t(this, Z) + 1), o(this, vt, !1), o(this, gt, 0), e(this, s, J).call(this), o(this, g, !0), o(this, N, !1), o(this, mt, !1), o(this, C, null), t(this, c).classList.remove("has-loaded-once", "has-visible-frame", "is-progress-settling"), t(this, r).dataset.src = this.src, t(this, r).pause(), t(this, r).removeAttribute("src"), t(this, r).preload = "none", e(this, s, os).call(this), t(this, r).load(), e(this, s, ut).call(this, 0), t(this, A).call(this), t(this, L).call(this), e(this, s, T).call(this));
}, Ge(ti, "observedAttributes", [
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
  "no-autoplay",
  "no-volume",
  "no-volume-slider",
  "no-picture-in-picture",
  "no-fullscreen"
]);
customElements.get("simple-player") || customElements.define("simple-player", ti);
export {
  ti as SimplePlayer
};
//# sourceMappingURL=simple-player.js.map
