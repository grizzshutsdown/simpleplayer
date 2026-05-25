var ki = Object.defineProperty;
var Oe = (m) => {
  throw TypeError(m);
};
var Pi = (m, b, i) => b in m ? ki(m, b, { enumerable: !0, configurable: !0, writable: !0, value: i }) : m[b] = i;
var Ke = (m, b, i) => Pi(m, typeof b != "symbol" ? b + "" : b, i), Me = (m, b, i) => b.has(m) || Oe("Cannot " + i);
var t = (m, b, i) => (Me(m, b, "read from private field"), i ? i.call(m) : b.get(m)), n = (m, b, i) => b.has(m) ? Oe("Cannot add the same private member more than once") : b instanceof WeakSet ? b.add(m) : b.set(m, i), r = (m, b, i, a) => (Me(m, b, "write to private field"), a ? a.call(m, i) : b.set(m, i), i), e = (m, b, i) => (Me(m, b, "access private method"), i);
const Ge = "16 / 9", Ei = "360px 0px", Ti = `
  :host {
    --simple-player-aspect-ratio: ${Ge};
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
`, Je = document.createElement("template");
Je.innerHTML = `
  <style>${Ti}</style>
  <div class="sp-player is-loading" data-sp-player>
    <video
      class="sp-video sp-asset"
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
var f, Wt, z, jt, B, c, o, q, d, $, Q, Zt, ms, y, _, E, tt, st, ut, dt, v, M, et, F, Tt, it, Ct, N, mt, Ot, Ft, k, C, Kt, rt, ft, bt, ot, fs, Gt, R, D, W, j, Z, Lt, vt, bs, At, vs, gs, gt, V, nt, St, g, O, Jt, Qt, Mt, U, at, w, yt, wt, xt, ts, $s, Ns, ss, Us, Ys, ys, Vt, Xs, _s, Ws, js, Zs, Os, It, Ks, Gs, s, As, Ss, Ve, Ie, ti, h, Ms, zt, H, Js, os, K, G, Vs, ns, $t, si, Nt, as, ze, Re, Rt, Dt, ws, Ht, lt, ht, xs, Qs, ks, Is, Ps, te, De, ls, zs, hs, He, ei, Es, ii, ct, Y, Be, ri, qe, Ut, L, oi, X, ni, $e, Ne, ai, Bt, Ue, x, J, Ye, li, Yt, pt, hi, Rs, cs, ci, pi, ui, S, ps, us, di, Xt, mi, T, Et, fi, A, Xe, Ds, _t, kt, Hs, _e, bi, vi, gi, qt, Pt, yi, Ts, Bs, We, qs, se, ee, ie, ds, je, es, Ze, Cs, Fs, re, oe, ne, ae, le, he, ce, pe, ue, de, me, fe, be, ve, ge, ye, we, xe, ke, Pe, Ee, is, Te, Ce, Fe, Le, Ae, Se, I, wi;
class Qe extends HTMLElement {
  constructor() {
    super();
    n(this, s);
    n(this, f);
    n(this, Wt, []);
    n(this, z, null);
    n(this, jt, !1);
    n(this, B, !1);
    n(this, c);
    n(this, o);
    n(this, q);
    n(this, d);
    n(this, $);
    n(this, Q);
    n(this, Zt);
    n(this, ms);
    n(this, y);
    n(this, _);
    n(this, E);
    n(this, tt);
    n(this, st);
    n(this, ut, []);
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
    n(this, Ft, 0);
    n(this, k, null);
    n(this, C, null);
    n(this, Kt, 0);
    n(this, rt, 0);
    n(this, ft, 0);
    n(this, bt, 0);
    n(this, ot, 0);
    n(this, fs, 0);
    n(this, Gt, 0);
    n(this, R, !1);
    n(this, D, !1);
    n(this, W, !1);
    n(this, j, !1);
    n(this, Z, 0);
    n(this, Lt, 0);
    n(this, vt, !1);
    n(this, bs, 0);
    n(this, At, !0);
    n(this, vs, 0);
    n(this, gs, performance.now());
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
    n(this, $s, 4);
    n(this, Ns, 3.5);
    n(this, ss, 6);
    n(this, Us, 0.08);
    n(this, Ys, 240);
    n(this, ys, 1200);
    n(this, Vt, 1600);
    n(this, Xs, 140);
    n(this, _s, 380);
    n(this, Ws, 650);
    n(this, js, 2e3);
    n(this, Zs, 3);
    n(this, Os, 10);
    n(this, It, 0.18);
    n(this, Ks, 8);
    n(this, Gs, 18);
    n(this, zt, (i) => {
      i.preventDefault();
    });
    n(this, Js, () => {
      if (r(this, ft, 0), !(t(this, M) || t(this, v) || t(this, U))) {
        if (e(this, s, I).call(this)) {
          t(this, c).classList.remove("is-controls-visible");
          return;
        }
        t(this, O) || t(this, c).classList.remove("is-pointer-active");
      }
    });
    n(this, Rt, (i) => {
      e(this, s, $t).call(this, i) && e(this, s, Vs).call(this, !0);
    });
    n(this, Dt, (i) => {
      e(this, s, $t).call(this, i) && e(this, s, Vs).call(this, !0);
    });
    n(this, ws, (i) => {
      e(this, s, $t).call(this, i) && e(this, s, Re).call(this);
    });
    n(this, Ht, () => {
      e(this, s, ns).call(this);
    });
    n(this, lt, (i) => {
      e(this, s, $t).call(this, i) && (r(this, O, !0), t(this, c).classList.add("is-pointer-active"), e(this, s, H).call(this));
    });
    n(this, ht, () => {
      r(this, O, !1), e(this, s, os).call(this, t(this, Vt));
    });
    n(this, xs, () => {
      e(this, s, I).call(this) ? t(this, c).classList.add("is-controls-visible") : t(this, c).classList.add("is-pointer-active"), e(this, s, H).call(this);
    });
    n(this, Qs, () => {
      e(this, s, os).call(this, t(this, Vt));
    });
    n(this, ks, (i) => {
      const a = i.currentTarget;
      if (e(this, s, ze).call(this, a)) {
        t(this, Q).style.removeProperty("--sp-control-hover-offset");
        return;
      }
      const l = Number(a?.dataset.spControlIndex ?? 0);
      t(this, Q).style.setProperty("--sp-control-hover-offset", `calc(var(--sp-control-slot-size) * ${l})`);
    });
    n(this, Ps, () => {
      r(this, xt, 0), t(this, ut).forEach((i) => i.classList.remove("is-control-tap-active")), this.style.removeProperty("--sp-touch-control-hover-offset");
    });
    n(this, te, (i) => {
      if (!(i instanceof PointerEvent) || i.pointerType !== "touch") return;
      const a = i.currentTarget;
      if (!a || !e(this, s, Nt).call(this) || e(this, s, ze).call(this, a)) return;
      const l = Number(a.dataset.spControlIndex ?? 0);
      e(this, s, Is).call(this), t(this, ut).forEach((p) => p.classList.toggle("is-control-tap-active", p === a)), this.style.setProperty("--sp-touch-control-hover-offset", `calc(var(--sp-control-slot-size) * ${l})`), r(this, xt, window.setTimeout(t(this, Ps), 280));
    });
    n(this, Es, () => {
      if (t(this, ot) || t(this, c).classList.contains("is-progress-settling")) {
        if (e(this, s, zs).call(this), t(this, vt)) {
          t(this, c).classList.remove("is-progress-settling");
          return;
        }
        r(this, vt, !0), r(this, bs, performance.now() + t(this, Ws)), e(this, s, X).call(this) || e(this, s, x).call(this), e(this, s, S).call(this), t(this, c).classList.remove("is-progress-settling"), e(this, s, T).call(this);
      }
    });
    n(this, L, () => {
      if (t(this, o).error) {
        e(this, s, Ut).call(this, !0, !0);
        return;
      }
      e(this, s, Ut).call(this, !t(this, B) || !t(this, D) || t(this, o).readyState < HTMLMediaElement.HAVE_FUTURE_DATA);
    });
    n(this, Bt, () => {
      if (t(this, o).error || t(this, o).readyState < HTMLMediaElement.HAVE_CURRENT_DATA || t(this, o).videoWidth <= 0 || t(this, o).videoHeight <= 0)
        return t(this, L).call(this), !1;
      if (!t(this, R))
        return e(this, s, ai).call(this), t(this, L).call(this), !1;
      const i = e(this, s, Ne).call(this);
      return t(this, A).call(this), i;
    });
    n(this, A, () => {
      if (!this.volumeEnabled) {
        t(this, c).classList.remove("is-volume-unavailable", "is-volume-muted", "is-volume-sound", "is-volume-icon-animating"), t(this, y).disabled = !0, t(this, y).setAttribute("aria-disabled", "true");
        return;
      }
      r(this, g, e(this, s, fi).call(this));
      const i = !t(this, g) || t(this, o).muted || t(this, o).volume <= 0, a = t(this, g) && !t(this, o).muted ? t(this, o).volume : 0, l = Math.round(a * 100), p = i ? "muted" : "sound";
      t(this, ts) && t(this, ts) !== p && e(this, s, ei).call(this), r(this, ts, p), t(this, c).classList.toggle("is-volume-unavailable", !t(this, g)), t(this, c).classList.toggle("is-volume-muted", i), t(this, c).classList.toggle("is-volume-sound", !i), t(this, c).style.setProperty("--sp-volume-level", `${l}%`), t(this, y).disabled = !t(this, g), t(this, y).setAttribute("aria-disabled", `${!t(this, g)}`), t(this, y).setAttribute(
        "aria-label",
        t(this, g) ? i ? "Unmute video" : "Mute video" : "Video has no audio"
      ), t(this, E).setAttribute("aria-valuenow", `${l}`), t(this, E).setAttribute("aria-valuetext", `${l}%`);
    });
    n(this, kt, () => {
      const i = document.pictureInPictureElement === t(this, o), a = t(this, o), l = !!(this.pictureInPictureEnabled && document.pictureInPictureEnabled && a.requestPictureInPicture);
      t(this, c).classList.toggle("is-picture-in-picture", i), t(this, tt).disabled = !l, t(this, tt).setAttribute("aria-label", i ? "Exit picture in picture" : "Enter picture in picture");
    });
    n(this, qt, () => {
      const i = e(this, s, Hs).call(this), a = i === t(this, c) || i === this, l = e(this, s, _e).call(this);
      return t(this, c).classList.toggle("is-fullscreen", a), t(this, st).disabled = !l, t(this, st).setAttribute("aria-label", a ? "Exit fullscreen" : "Enter fullscreen"), a;
    });
    n(this, Pt, () => {
      const i = t(this, qt).call(this);
      e(this, s, yi).call(this, i);
    });
    n(this, Ts, () => {
      !t(this, M) || t(this, v) || (e(this, s, J).call(this), e(this, s, H).call(this), e(this, s, Et).call(this), r(this, v, !0), t(this, c).classList.add("is-scrubbing"), r(this, F, e(this, s, ps).call(this, t(this, Ot), !0)), t(this, et) && t(this, o).pause(), t(this, o).currentTime = t(this, F), e(this, s, x).call(this, t(this, F)), e(this, s, S).call(this, t(this, F)), e(this, s, Xt).call(this), e(this, s, T).call(this));
    });
    n(this, se, async () => {
      if (performance.now() < t(this, fs))
        return;
      const i = t(this, C) ? t(this, C) !== "playing" : t(this, o).paused || t(this, o).ended, a = !i || e(this, s, oi).call(this);
      e(this, s, G).call(this), a && (r(this, C, i ? "playing" : "paused"), e(this, s, T).call(this)), i ? (e(this, s, J).call(this), await e(this, s, ct).call(this), await t(this, o).play().catch(() => {
        r(this, C, null);
      })) : (e(this, s, li).call(this), t(this, o).pause()), e(this, s, T).call(this), e(this, s, K).call(this);
    });
    n(this, ee, (i) => {
      if (!(i instanceof PointerEvent)) return;
      const a = t(this, q).getBoundingClientRect(), l = i.clientX >= a.left && i.clientX <= a.right && i.clientY >= a.top && i.clientY <= a.bottom, p = t(this, $).getBoundingClientRect(), u = i.clientX >= p.left && i.clientX <= p.right && i.clientY >= p.top && i.clientY <= p.bottom, P = t(this, d).getBoundingClientRect(), Ls = i.clientX >= P.left && i.clientX <= P.right && i.clientY >= P.top && i.clientY <= P.bottom, rs = e(this, s, G).call(this);
      rs && l && r(this, fs, performance.now() + 260), rs && (u || Ls) && r(this, Gt, performance.now() + 260), e(this, s, ct).call(this);
    });
    n(this, ie, (i) => {
      i.stopPropagation();
    });
    n(this, es, () => {
      r(this, yt, 0), !(t(this, at) || t(this, U)) && t(this, y).classList.remove("is-volume-open");
    });
    n(this, Cs, () => {
      e(this, s, I).call(this) || !this.volumeSliderEnabled || !t(this, g) || (r(this, at, !0), e(this, s, je).call(this));
    });
    n(this, Fs, () => {
      e(this, s, I).call(this) || !this.volumeSliderEnabled || !t(this, g) || (r(this, at, !1), e(this, s, Ze).call(this));
    });
    n(this, re, (i) => {
      !this.volumeEnabled || !t(this, g) || (i.preventDefault(), i.stopPropagation(), !(!e(this, s, Nt).call(this) || e(this, s, as).call(this)) && (e(this, s, G).call(this), t(this, es).call(this), t(this, o).muted || t(this, o).volume <= 0 ? (t(this, o).volume <= 0 && (t(this, o).volume = 0.7), t(this, o).muted = !1) : t(this, o).muted = !0, t(this, A).call(this), e(this, s, K).call(this)));
    });
    n(this, oe, (i) => {
      i instanceof PointerEvent && (!this.volumeEnabled || !this.volumeSliderEnabled || !t(this, g) || e(this, s, I).call(this) || (i.preventDefault(), i.stopPropagation(), e(this, s, G).call(this), e(this, s, H).call(this), e(this, s, je).call(this), r(this, U, !0), r(this, w, i.pointerId), t(this, _).classList.add("is-scrubbing-volume"), t(this, E).setPointerCapture(i.pointerId), e(this, s, Xe).call(this, i.clientY)));
    });
    n(this, ne, (i) => {
      i instanceof PointerEvent && t(this, U) && (t(this, w) !== null && i.pointerId !== t(this, w) || (i.preventDefault(), i.stopPropagation(), e(this, s, Xe).call(this, i.clientY)));
    });
    n(this, ae, (i) => {
      i instanceof PointerEvent && (t(this, w) !== null && i.pointerId !== t(this, w) || (i.stopPropagation(), e(this, s, _t).call(this, i.pointerId), e(this, s, K).call(this)));
    });
    n(this, le, (i) => {
      i instanceof PointerEvent && (t(this, w) !== null && i.pointerId !== t(this, w) || (i.stopPropagation(), e(this, s, _t).call(this, i.pointerId)));
    });
    n(this, he, (i) => {
      if (!(i instanceof KeyboardEvent) || !this.volumeEnabled || !t(this, g) || !["ArrowUp", "ArrowDown", "Home", "End"].includes(i.key)) return;
      i.preventDefault(), i.stopPropagation();
      const a = i.shiftKey ? 0.1 : 0.05, l = i.key === "Home" ? 0 : i.key === "End" ? 1 : t(this, o).volume + (i.key === "ArrowUp" ? a : -a);
      t(this, o).volume = Math.min(1, Math.max(0, l)), t(this, o).muted = t(this, o).volume <= 0, t(this, A).call(this);
    });
    n(this, ce, async () => {
      const i = t(this, o);
      if (!(!this.pictureInPictureEnabled || !document.pictureInPictureEnabled || !i.requestPictureInPicture) && !(!e(this, s, Nt).call(this) || e(this, s, as).call(this))) {
        e(this, s, G).call(this);
        try {
          await e(this, s, ct).call(this), document.pictureInPictureElement === t(this, o) ? await document.exitPictureInPicture() : await i.requestPictureInPicture();
        } catch {
        } finally {
          t(this, kt).call(this), e(this, s, K).call(this);
        }
      }
    });
    n(this, pe, async (i) => {
      if (e(this, s, _e).call(this) && (i.preventDefault(), i.stopPropagation(), !(!e(this, s, Nt).call(this) || e(this, s, as).call(this)))) {
        e(this, s, $t).call(this, i), e(this, s, G).call(this);
        try {
          const a = e(this, s, Hs).call(this);
          if (a === t(this, c) || a === this)
            await e(this, s, gi).call(this);
          else {
            await e(this, s, ct).call(this);
            const l = t(this, c);
            typeof l.requestFullscreen == "function" || typeof l.webkitRequestFullscreen == "function" || typeof l.mozRequestFullScreen == "function" || typeof l.msRequestFullscreen == "function" ? await e(this, s, bi).call(this) : e(this, s, vi).call(this);
          }
        } catch {
        } finally {
          t(this, qt).call(this), e(this, s, K).call(this);
        }
      }
    });
    n(this, ue, (i) => {
      if (i instanceof PointerEvent) {
        if (i.preventDefault(), !e(this, s, Nt).call(this) || e(this, s, as).call(this)) {
          e(this, s, G).call(this), e(this, s, I).call(this) && r(this, Gt, performance.now() + 260);
          return;
        }
        e(this, s, G).call(this), e(this, s, H).call(this), t(this, Es).call(this), r(this, N, !1), r(this, mt, !1), e(this, s, pi).call(this, e(this, s, Yt).call(this)), r(this, M, !0), r(this, k, i.pointerId), r(this, Ot, i.clientX), r(this, et, !t(this, o).paused && !t(this, o).ended), t(this, d).setPointerCapture(i.pointerId), r(this, F, e(this, s, ps).call(this, i.clientX, !1)), e(this, s, Et).call(this), r(this, Ft, window.setTimeout(t(this, Ts), t(this, Ys)));
      }
    });
    n(this, de, (i) => {
      if (!(i instanceof KeyboardEvent) || !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0 || !["ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"].includes(i.key)) return;
      i.preventDefault(), i.stopPropagation(), t(this, xs).call(this);
      const a = e(this, s, Yt).call(this), l = i.shiftKey ? 10 : 5, p = Math.max(10, t(this, o).duration * 0.1), u = i.key === "Home" ? 0 : i.key === "End" ? t(this, o).duration : i.key === "PageUp" ? a + p : i.key === "PageDown" ? a - p : a + (i.key === "ArrowRight" ? l : -l);
      t(this, o).currentTime = Math.min(t(this, o).duration, Math.max(0, u)), e(this, s, x).call(this, t(this, o).currentTime), e(this, s, S).call(this, t(this, o).currentTime);
    });
    n(this, me, (i) => {
      i instanceof PointerEvent && t(this, M) && (t(this, k) !== null && i.pointerId !== t(this, k) || (!t(this, v) && Math.abs(i.clientX - t(this, Ot)) >= t(this, $s) && t(this, Ts).call(this), t(this, v) && r(this, F, e(this, s, ps).call(this, i.clientX))));
    });
    n(this, fe, (i) => {
      i instanceof PointerEvent && (t(this, k) !== null && i.pointerId !== t(this, k) || e(this, s, We).call(this, i.clientX, i.pointerId, !0));
    });
    n(this, be, (i) => {
      i instanceof PointerEvent && (t(this, k) !== null && i.pointerId !== t(this, k) || e(this, s, qs).call(this, i.pointerId));
    });
    n(this, ve, (i) => {
      if (i instanceof PointerEvent) {
        if (t(this, w) !== null && i.pointerId === t(this, w)) {
          e(this, s, _t).call(this, i.pointerId);
          return;
        }
        t(this, k) === null || i.pointerId !== t(this, k) || e(this, s, We).call(this, i.clientX, i.pointerId, !0);
      }
    });
    n(this, ge, (i) => {
      if (i instanceof PointerEvent) {
        if (t(this, w) !== null && i.pointerId === t(this, w)) {
          e(this, s, _t).call(this, i.pointerId);
          return;
        }
        t(this, k) === null || i.pointerId !== t(this, k) || e(this, s, qs).call(this, i.pointerId);
      }
    });
    n(this, ye, () => {
      e(this, s, _t).call(this, t(this, w)), e(this, s, qs).call(this, t(this, k));
    });
    n(this, we, () => {
      e(this, s, Hs).call(this) || e(this, s, ns).call(this);
    });
    n(this, xe, () => {
      r(this, C, null), e(this, s, J).call(this), e(this, s, X).call(this) || e(this, s, x).call(this), e(this, s, T).call(this);
    });
    n(this, ke, () => {
      r(this, C, null), e(this, s, X).call(this) || e(this, s, Ye).call(this), t(this, L).call(this), e(this, s, T).call(this);
    });
    n(this, Pe, () => {
      r(this, C, null), e(this, s, J).call(this), e(this, s, X).call(this) || e(this, s, x).call(this), e(this, s, T).call(this);
    });
    n(this, Ee, () => {
      e(this, s, Ut).call(this, !0, !0);
    });
    n(this, is, () => {
      e(this, s, Ut).call(this, !0);
    });
    n(this, Te, () => {
      e(this, s, J).call(this), r(this, g, !0), t(this, A).call(this), e(this, s, X).call(this) || e(this, s, x).call(this), t(this, L).call(this), e(this, s, S).call(this);
    });
    n(this, Ce, () => {
      const i = t(this, Bt).call(this);
      t(this, A).call(this), i && !e(this, s, X).call(this) && e(this, s, x).call(this), e(this, s, T).call(this);
    });
    n(this, Fe, () => {
      if (e(this, s, J).call(this), t(this, L).call(this), t(this, N) && (!t(this, mt) || t(this, o).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA)) {
        e(this, s, $e).call(this), e(this, s, T).call(this);
        return;
      }
      e(this, s, X).call(this) || e(this, s, x).call(this), e(this, s, S).call(this);
    });
    n(this, Le, () => {
      r(this, C, null), r(this, R, !1), r(this, D, !1), r(this, W, !1), r(this, j, !1), r(this, Z, t(this, Z) + 1), t(this, c).classList.remove("has-visible-frame"), e(this, s, Ut).call(this, !0, !0), e(this, s, T).call(this), e(this, s, ni).call(this);
    });
    n(this, Ae, () => {
      t(this, A).call(this), e(this, s, S).call(this);
    });
    n(this, Se, () => {
      t(this, A).call(this);
    });
    r(this, f, this.attachShadow({ mode: "open" })), t(this, f).append(Je.content.cloneNode(!0));
  }
  get src() {
    return this.getAttribute("src") ?? "";
  }
  set src(i) {
    e(this, s, As).call(this, "src", i);
  }
  get aspectRatio() {
    return this.getAttribute("aspect-ratio") || Ge;
  }
  set aspectRatio(i) {
    e(this, s, As).call(this, "aspect-ratio", i);
  }
  get preloadMargin() {
    return this.getAttribute("preload-margin") || Ei;
  }
  set preloadMargin(i) {
    e(this, s, As).call(this, "preload-margin", i);
  }
  get volumeEnabled() {
    return !this.hasAttribute("disable-volume") && !this.hasAttribute("no-volume");
  }
  set volumeEnabled(i) {
    e(this, s, Ss).call(this, "volume", i);
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
    return !this.hasAttribute("disable-picture-in-picture") && !this.hasAttribute("disable-pip") && !this.hasAttribute("no-picture-in-picture") && !this.hasAttribute("no-pip");
  }
  set pictureInPictureEnabled(i) {
    e(this, s, Ss).call(this, "picture-in-picture", i);
  }
  get pipEnabled() {
    return this.pictureInPictureEnabled;
  }
  set pipEnabled(i) {
    this.pictureInPictureEnabled = i;
  }
  get fullscreenEnabled() {
    return !this.hasAttribute("disable-fullscreen") && !this.hasAttribute("no-fullscreen");
  }
  set fullscreenEnabled(i) {
    e(this, s, Ss).call(this, "fullscreen", i);
  }
  connectedCallback() {
    r(this, c, t(this, f).querySelector("[data-sp-player]")), r(this, o, t(this, f).querySelector("[data-sp-video]")), r(this, q, t(this, f).querySelector("[data-sp-button]")), r(this, d, t(this, f).querySelector("[data-sp-progress-track]")), r(this, $, t(this, f).querySelector("[data-sp-control-tray]")), r(this, Q, t(this, f).querySelector("[data-sp-control-tray-slots]")), r(this, Zt, t(this, f).querySelector("[data-sp-time]")), r(this, ms, t(this, f).querySelector("[data-sp-time-text]")), r(this, y, t(this, f).querySelector("[data-sp-volume-control]")), r(this, _, t(this, f).querySelector("[data-sp-volume-popover]")), r(this, E, t(this, f).querySelector("[data-sp-volume-track]")), r(this, tt, t(this, f).querySelector("[data-sp-picture-in-picture-control]")), r(this, st, t(this, f).querySelector("[data-sp-fullscreen-control]")), r(this, ut, [t(this, y), t(this, tt), t(this, st)]), e(this, s, Ve).call(this), t(this, jt) || (e(this, s, ti).call(this), r(this, jt, !0)), e(this, s, Ms).call(this), e(this, s, Ie).call(this), t(this, L).call(this), t(this, A).call(this), t(this, kt).call(this), t(this, qt).call(this), e(this, s, T).call(this);
  }
  disconnectedCallback() {
    t(this, z)?.disconnect(), r(this, z, null), t(this, Wt).forEach((i) => i()), r(this, Wt, []), r(this, jt, !1), e(this, s, H).call(this), e(this, s, De).call(this), e(this, s, ls).call(this), e(this, s, zs).call(this), e(this, s, Et).call(this), e(this, s, hs).call(this), e(this, s, ds).call(this), e(this, s, He).call(this), e(this, s, Is).call(this), t(this, c).classList.remove("is-volume-icon-animating"), t(this, Q).style.removeProperty("--sp-control-hover-offset"), this.style.removeProperty("--sp-touch-control-hover-offset"), e(this, s, us).call(this), r(this, U, !1), r(this, at, !1), r(this, O, !1), r(this, w, null), t(this, y).classList.remove("is-volume-open"), t(this, ut).forEach((i) => i.classList.remove("is-control-tap-active")), t(this, c).classList.remove("is-pointer-active"), e(this, s, Xt).call(this);
  }
  attributeChangedCallback(i, a, l) {
    if (a !== l) {
      if (i === "aspect-ratio") {
        e(this, s, Ve).call(this);
        return;
      }
      if (i === "preload-margin" && this.isConnected) {
        t(this, z)?.disconnect(), e(this, s, Ms).call(this);
        return;
      }
      if (i === "src" && this.isConnected) {
        e(this, s, wi).call(this), e(this, s, Ms).call(this);
        return;
      }
      (i.startsWith("disable-") || i.startsWith("no-")) && this.isConnected && (e(this, s, Ie).call(this), t(this, A).call(this), t(this, kt).call(this), t(this, qt).call(this));
    }
  }
}
f = new WeakMap(), Wt = new WeakMap(), z = new WeakMap(), jt = new WeakMap(), B = new WeakMap(), c = new WeakMap(), o = new WeakMap(), q = new WeakMap(), d = new WeakMap(), $ = new WeakMap(), Q = new WeakMap(), Zt = new WeakMap(), ms = new WeakMap(), y = new WeakMap(), _ = new WeakMap(), E = new WeakMap(), tt = new WeakMap(), st = new WeakMap(), ut = new WeakMap(), dt = new WeakMap(), v = new WeakMap(), M = new WeakMap(), et = new WeakMap(), F = new WeakMap(), Tt = new WeakMap(), it = new WeakMap(), Ct = new WeakMap(), N = new WeakMap(), mt = new WeakMap(), Ot = new WeakMap(), Ft = new WeakMap(), k = new WeakMap(), C = new WeakMap(), Kt = new WeakMap(), rt = new WeakMap(), ft = new WeakMap(), bt = new WeakMap(), ot = new WeakMap(), fs = new WeakMap(), Gt = new WeakMap(), R = new WeakMap(), D = new WeakMap(), W = new WeakMap(), j = new WeakMap(), Z = new WeakMap(), Lt = new WeakMap(), vt = new WeakMap(), bs = new WeakMap(), At = new WeakMap(), vs = new WeakMap(), gs = new WeakMap(), gt = new WeakMap(), V = new WeakMap(), nt = new WeakMap(), St = new WeakMap(), g = new WeakMap(), O = new WeakMap(), Jt = new WeakMap(), Qt = new WeakMap(), Mt = new WeakMap(), U = new WeakMap(), at = new WeakMap(), w = new WeakMap(), yt = new WeakMap(), wt = new WeakMap(), xt = new WeakMap(), ts = new WeakMap(), $s = new WeakMap(), Ns = new WeakMap(), ss = new WeakMap(), Us = new WeakMap(), Ys = new WeakMap(), ys = new WeakMap(), Vt = new WeakMap(), Xs = new WeakMap(), _s = new WeakMap(), Ws = new WeakMap(), js = new WeakMap(), Zs = new WeakMap(), Os = new WeakMap(), It = new WeakMap(), Ks = new WeakMap(), Gs = new WeakMap(), s = new WeakSet(), As = function(i, a) {
  if (a === "") {
    this.removeAttribute(i);
    return;
  }
  this.setAttribute(i, a);
}, Ss = function(i, a) {
  if (a) {
    this.removeAttribute(`disable-${i}`), this.removeAttribute(`no-${i}`), i === "picture-in-picture" && (this.removeAttribute("disable-pip"), this.removeAttribute("no-pip"));
    return;
  }
  this.setAttribute(`disable-${i}`, "");
}, Ve = function() {
  this.style.setProperty("--simple-player-aspect-ratio", this.aspectRatio);
}, Ie = function() {
  if (!t(this, c)) return;
  const i = [
    { button: t(this, y), enabled: this.volumeEnabled, className: "has-volume-control" },
    { button: t(this, tt), enabled: this.pictureInPictureEnabled, className: "has-picture-in-picture-control" },
    { button: t(this, st), enabled: this.fullscreenEnabled, className: "has-fullscreen-control" }
  ];
  let a = 0;
  for (const l of i)
    t(this, c).classList.toggle(l.className, l.enabled), l.button.hidden = !l.enabled, l.enabled ? (l.button.dataset.spControlIndex = `${a}`, a += 1) : delete l.button.dataset.spControlIndex;
  this.style.setProperty("--sp-enabled-controls-count", `${a}`), this.style.setProperty("--sp-control-tray-display", a > 0 ? "block" : "none"), t(this, c).classList.toggle("has-volume-slider-control", this.volumeEnabled && this.volumeSliderEnabled), (!this.volumeEnabled || !this.volumeSliderEnabled) && (t(this, es).call(this), e(this, s, Ds).call(this, t(this, w)), r(this, U, !1), r(this, at, !1), t(this, _).classList.remove("is-scrubbing-volume")), t(this, Q).style.removeProperty("--sp-control-hover-offset");
}, ti = function() {
  e(this, s, h).call(this, t(this, q), "click", t(this, se)), e(this, s, h).call(this, this, "pointerenter", t(this, Rt)), e(this, s, h).call(this, this, "pointermove", t(this, Dt)), e(this, s, h).call(this, this, "pointerleave", t(this, Ht)), e(this, s, h).call(this, this, "mouseenter", t(this, Rt)), e(this, s, h).call(this, this, "mousemove", t(this, Dt)), e(this, s, h).call(this, this, "mouseleave", t(this, Ht)), e(this, s, h).call(this, t(this, c), "pointerenter", t(this, Rt)), e(this, s, h).call(this, t(this, c), "pointermove", t(this, Dt)), e(this, s, h).call(this, t(this, c), "pointerleave", t(this, Ht)), e(this, s, h).call(this, t(this, c), "mouseenter", t(this, Rt)), e(this, s, h).call(this, t(this, c), "mousemove", t(this, Dt)), e(this, s, h).call(this, t(this, c), "mouseleave", t(this, Ht)), e(this, s, h).call(this, t(this, q), "pointerenter", t(this, lt)), e(this, s, h).call(this, t(this, q), "pointerleave", t(this, ht)), e(this, s, h).call(this, t(this, q), "mouseenter", t(this, lt)), e(this, s, h).call(this, t(this, q), "mouseleave", t(this, ht)), e(this, s, h).call(this, t(this, d), "pointerenter", t(this, lt)), e(this, s, h).call(this, t(this, d), "pointerleave", t(this, ht)), e(this, s, h).call(this, t(this, d), "mouseenter", t(this, lt)), e(this, s, h).call(this, t(this, d), "mouseleave", t(this, ht)), e(this, s, h).call(this, t(this, $), "pointerenter", t(this, lt)), e(this, s, h).call(this, t(this, $), "pointerleave", t(this, ht)), e(this, s, h).call(this, t(this, $), "mouseenter", t(this, lt)), e(this, s, h).call(this, t(this, $), "mouseleave", t(this, ht)), e(this, s, h).call(this, t(this, f), "focusin", t(this, xs)), e(this, s, h).call(this, t(this, f), "focusout", t(this, Qs)), e(this, s, h).call(this, t(this, c), "pointerdown", t(this, ee)), e(this, s, h).call(this, t(this, c), "dragstart", t(this, zt)), e(this, s, h).call(this, t(this, c), "selectstart", t(this, zt)), e(this, s, h).call(this, t(this, o), "dragstart", t(this, zt)), e(this, s, h).call(this, t(this, o), "selectstart", t(this, zt)), e(this, s, h).call(this, t(this, d), "pointerdown", t(this, ue)), e(this, s, h).call(this, t(this, d), "pointermove", t(this, me)), e(this, s, h).call(this, t(this, d), "pointerup", t(this, fe)), e(this, s, h).call(this, t(this, d), "pointercancel", t(this, be)), e(this, s, h).call(this, t(this, d), "keydown", t(this, de)), e(this, s, h).call(this, t(this, y), "pointerenter", t(this, Cs)), e(this, s, h).call(this, t(this, y), "pointerleave", t(this, Fs)), e(this, s, h).call(this, t(this, y), "click", t(this, re)), e(this, s, h).call(this, t(this, _), "pointerenter", t(this, Cs)), e(this, s, h).call(this, t(this, _), "pointerleave", t(this, Fs)), e(this, s, h).call(this, t(this, E), "pointerdown", t(this, oe)), e(this, s, h).call(this, t(this, E), "pointermove", t(this, ne)), e(this, s, h).call(this, t(this, E), "pointerup", t(this, ae)), e(this, s, h).call(this, t(this, E), "pointercancel", t(this, le)), e(this, s, h).call(this, t(this, E), "click", t(this, ie)), e(this, s, h).call(this, t(this, E), "keydown", t(this, he)), e(this, s, h).call(this, t(this, tt), "click", t(this, ce)), e(this, s, h).call(this, t(this, st), "click", t(this, pe));
  for (const i of t(this, ut))
    e(this, s, h).call(this, i, "pointerenter", t(this, ks)), e(this, s, h).call(this, i, "mouseenter", t(this, ks)), e(this, s, h).call(this, i, "pointerdown", t(this, te));
  e(this, s, h).call(this, document, "pointerup", t(this, ve)), e(this, s, h).call(this, document, "pointercancel", t(this, ge)), e(this, s, h).call(this, document, "pointermove", t(this, ws)), e(this, s, h).call(this, document, "mousemove", t(this, ws)), e(this, s, h).call(this, document, "fullscreenchange", t(this, Pt)), e(this, s, h).call(this, document, "webkitfullscreenchange", t(this, Pt)), e(this, s, h).call(this, document, "mozfullscreenchange", t(this, Pt)), e(this, s, h).call(this, document, "MSFullscreenChange", t(this, Pt)), e(this, s, h).call(this, t(this, f), "fullscreenchange", t(this, Pt)), e(this, s, h).call(this, window, "blur", t(this, ye)), e(this, s, h).call(this, window, "focus", t(this, we)), e(this, s, h).call(this, t(this, o), "play", t(this, xe)), e(this, s, h).call(this, t(this, o), "pause", t(this, ke)), e(this, s, h).call(this, t(this, o), "ended", t(this, Pe)), e(this, s, h).call(this, t(this, o), "loadstart", t(this, Ee)), e(this, s, h).call(this, t(this, o), "waiting", t(this, is)), e(this, s, h).call(this, t(this, o), "stalled", t(this, is)), e(this, s, h).call(this, t(this, o), "seeking", t(this, is)), e(this, s, h).call(this, t(this, o), "loadeddata", t(this, Bt)), e(this, s, h).call(this, t(this, o), "loadedmetadata", t(this, Te)), e(this, s, h).call(this, t(this, o), "canplay", t(this, Bt)), e(this, s, h).call(this, t(this, o), "canplaythrough", t(this, Bt)), e(this, s, h).call(this, t(this, o), "playing", t(this, Ce)), e(this, s, h).call(this, t(this, o), "seeked", t(this, Fe)), e(this, s, h).call(this, t(this, o), "error", t(this, Le)), e(this, s, h).call(this, t(this, o), "progress", t(this, L)), e(this, s, h).call(this, t(this, o), "suspend", t(this, L)), e(this, s, h).call(this, t(this, o), "timeupdate", t(this, Ae)), e(this, s, h).call(this, t(this, o), "volumechange", t(this, Se)), e(this, s, h).call(this, t(this, o), "enterpictureinpicture", t(this, kt)), e(this, s, h).call(this, t(this, o), "leavepictureinpicture", t(this, kt));
}, h = function(i, a, l) {
  i.addEventListener(a, l), t(this, Wt).push(() => i.removeEventListener(a, l));
}, Ms = function() {
  if (!(!this.src || t(this, B))) {
    if (t(this, z)?.disconnect(), t(this, o).dataset.src = this.src, "IntersectionObserver" in window) {
      r(this, z, new IntersectionObserver((i, a) => {
        i.some((l) => l.isIntersecting) && (a.disconnect(), r(this, z, null), e(this, s, ct).call(this));
      }, { rootMargin: this.preloadMargin })), t(this, z).observe(t(this, c));
      return;
    }
    e(this, s, ct).call(this);
  }
}, zt = new WeakMap(), H = function() {
  t(this, ft) && (window.clearTimeout(t(this, ft)), r(this, ft, 0));
}, Js = new WeakMap(), os = function(i = e(this, s, I).call(this) ? t(this, ys) : t(this, Vt)) {
  e(this, s, H).call(this), r(this, ft, window.setTimeout(t(this, Js), i));
}, K = function() {
  e(this, s, I).call(this) && e(this, s, os).call(this, t(this, ys));
}, G = function() {
  if (!e(this, s, I).call(this)) return !1;
  const i = t(this, c).classList.contains("is-controls-visible");
  return t(this, c).classList.add("is-controls-visible"), e(this, s, K).call(this), !i;
}, Vs = function(i = !1) {
  !i && e(this, s, I).call(this) || (t(this, c).classList.add("is-pointer-active"), t(this, O) ? e(this, s, H).call(this) : e(this, s, os).call(this, i ? t(this, Vt) : void 0));
}, ns = function() {
  r(this, O, !1), e(this, s, H).call(this), t(this, c).classList.remove("is-pointer-active");
}, $t = function(i) {
  return i instanceof PointerEvent ? (r(this, Mt, i.pointerType === "touch"), t(this, Mt) ? !1 : (r(this, Jt, i.clientX), r(this, Qt, i.clientY), !0)) : i instanceof MouseEvent ? (r(this, Mt, !1), r(this, Jt, i.clientX), r(this, Qt, i.clientY), !0) : !1;
}, si = function(i, a) {
  if (i === null || a === null || i < 0 || a < 0 || i > window.innerWidth || a > window.innerHeight) return !1;
  const l = this.getBoundingClientRect();
  return l.width <= 0 || l.height <= 0 ? !1 : i >= l.left && i <= l.right && a >= l.top && a <= l.bottom;
}, Nt = function() {
  return t(this, c).classList.contains("is-controls-visible") || t(this, c).classList.contains("is-pointer-active") || t(this, f).activeElement instanceof HTMLElement;
}, as = function() {
  return e(this, s, I).call(this) && performance.now() < t(this, Gt);
}, ze = function(i) {
  return i instanceof HTMLButtonElement && (i.disabled || i === t(this, y) && (!this.volumeEnabled || !t(this, g)));
}, Re = function() {
  if (!t(this, Mt) && e(this, s, si).call(this, t(this, Jt), t(this, Qt))) {
    e(this, s, Vs).call(this, !0);
    return;
  }
  e(this, s, ns).call(this);
}, Rt = new WeakMap(), Dt = new WeakMap(), ws = new WeakMap(), Ht = new WeakMap(), lt = new WeakMap(), ht = new WeakMap(), xs = new WeakMap(), Qs = new WeakMap(), ks = new WeakMap(), Is = function() {
  t(this, xt) && (window.clearTimeout(t(this, xt)), r(this, xt, 0));
}, Ps = new WeakMap(), te = new WeakMap(), De = function() {
  t(this, bt) && (window.clearTimeout(t(this, bt)), r(this, bt, 0));
}, ls = function() {
  t(this, rt) && (window.clearTimeout(t(this, rt)), r(this, rt, 0));
}, zs = function() {
  t(this, ot) && (window.clearTimeout(t(this, ot)), r(this, ot, 0));
}, hs = function() {
  t(this, Lt) && (window.clearTimeout(t(this, Lt)), r(this, Lt, 0));
}, He = function() {
  t(this, wt) && (window.clearTimeout(t(this, wt)), r(this, wt, 0));
}, ei = function() {
  e(this, s, He).call(this), t(this, c).classList.remove("is-volume-icon-animating"), t(this, y).offsetWidth, t(this, c).classList.add("is-volume-icon-animating"), r(this, wt, window.setTimeout(() => {
    r(this, wt, 0), t(this, c).classList.remove("is-volume-icon-animating");
  }, 240));
}, Es = new WeakMap(), ii = function() {
  t(this, vt) || t(this, ot) || (t(this, c).classList.add("is-progress-settling"), e(this, s, pt).call(this, 0), r(this, ot, window.setTimeout(t(this, Es), t(this, _s))));
}, ct = async function() {
  if (t(this, B)) return;
  const i = t(this, o).dataset.src || this.src;
  i && (e(this, s, ls).call(this), e(this, s, hs).call(this), r(this, Kt, t(this, Kt) + 1), r(this, B, !0), r(this, R, !1), r(this, D, !1), r(this, W, !1), r(this, j, !1), r(this, Z, t(this, Z) + 1), t(this, c).classList.remove("has-visible-frame"), t(this, o).src = i, t(this, o).preload = "auto", t(this, o).load(), t(this, o).autoplay && t(this, o).muted && await t(this, o).play().catch(() => {
  }));
}, Y = function(i) {
  if (!Number.isFinite(i) || i < 0) return "0:00";
  const a = Math.floor(i), l = a % 60, p = Math.floor(a / 60), u = p % 60, P = Math.floor(p / 60);
  return P > 0 ? `${P}:${String(u).padStart(2, "0")}:${String(l).padStart(2, "0")}` : `${u}:${String(l).padStart(2, "0")}`;
}, Be = function() {
  return !t(this, o).loop || t(this, o).paused || !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0 ? !1 : t(this, o).currentTime < 0.28 || t(this, o).duration - t(this, o).currentTime < 0.28;
}, ri = function(i = t(this, o).currentTime) {
  if (!Number.isFinite(i)) return 0;
  const a = Math.max(0, i);
  try {
    for (let l = 0; l < t(this, o).buffered.length; l += 1) {
      const p = t(this, o).buffered.start(l), u = t(this, o).buffered.end(l);
      if (a + t(this, It) >= p && a <= u + t(this, It))
        return Math.max(0, u - a);
    }
  } catch {
    return 0;
  }
  return 0;
}, qe = function(i = t(this, Os)) {
  if (!t(this, B) || t(this, o).error || !t(this, c).classList.contains("has-loaded-once") || !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) return !1;
  const a = Math.max(0, t(this, o).duration - t(this, o).currentTime), l = Math.min(i, a);
  return l <= t(this, It) || e(this, s, ri).call(this) + t(this, It) >= l;
}, Ut = function(i, a = !1) {
  e(this, s, De).call(this);
  const l = i && !e(this, s, Be).call(this) && !e(this, s, qe).call(this), u = i && !t(this, D) || l;
  if (r(this, At, u), !u) {
    t(this, c).classList.remove("is-loading");
    return;
  }
  if (a) {
    t(this, c).classList.add("is-loading");
    return;
  }
  r(this, bt, window.setTimeout(() => {
    if (r(this, bt, 0), !t(this, D) || !e(this, s, Be).call(this) && !e(this, s, qe).call(this)) {
      r(this, At, !0), t(this, c).classList.add("is-loading");
      return;
    }
    r(this, At, !1), t(this, c).classList.remove("is-loading");
  }, t(this, Xs)));
}, L = new WeakMap(), oi = function() {
  return t(this, B) && !t(this, o).error && t(this, R) && (t(this, o).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA || t(this, o).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !t(this, c).classList.contains("is-loading"));
}, X = function() {
  return t(this, M) || t(this, v) || t(this, N);
}, ni = function() {
  t(this, Kt) >= t(this, Zs) || t(this, rt) || r(this, rt, window.setTimeout(() => {
    r(this, rt, 0), e(this, s, hs).call(this), r(this, B, !1), r(this, R, !1), r(this, D, !1), r(this, W, !1), r(this, j, !1), r(this, Z, t(this, Z) + 1), t(this, c).classList.remove("has-visible-frame"), t(this, c).classList.contains("has-loaded-once") || e(this, s, pt).call(this, 0), t(this, o).removeAttribute("src"), t(this, o).load(), e(this, s, ct).call(this);
  }, t(this, js)));
}, $e = function() {
  return t(this, N) ? (r(this, N, !1), r(this, mt, !1), e(this, s, x).call(this), e(this, s, S).call(this), !0) : !1;
}, Ne = function() {
  return e(this, s, ls).call(this), !t(this, c).classList.contains("has-loaded-once") && e(this, s, ii).call(this), t(this, c).classList.add("has-loaded-once"), t(this, c).classList.add("has-visible-frame"), t(this, L).call(this), r(this, C, null), t(this, N) ? (e(this, s, $e).call(this), !0) : (e(this, s, X).call(this) || e(this, s, x).call(this), e(this, s, S).call(this), !0);
}, ai = function() {
  if (t(this, R) || t(this, W) || t(this, o).error) return;
  r(this, W, !0);
  const i = t(this, Z), a = () => {
    if (i === t(this, Z)) {
      if (e(this, s, hs).call(this), r(this, W, !1), r(this, R, !t(this, o).error && t(this, o).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && t(this, o).videoWidth > 0 && t(this, o).videoHeight > 0), t(this, R)) {
        if (t(this, j) || t(this, D)) return;
        r(this, j, !0), window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            i === t(this, Z) && (r(this, j, !1), r(this, D, !0), e(this, s, Ne).call(this), e(this, s, T).call(this));
          });
        }), e(this, s, T).call(this);
        return;
      }
      t(this, L).call(this);
    }
  };
  if ("requestVideoFrameCallback" in t(this, o)) {
    t(this, o).requestVideoFrameCallback(a), r(this, Lt, window.setTimeout(a, 180));
    return;
  }
  window.requestAnimationFrame(a);
}, Bt = new WeakMap(), Ue = function() {
  return !t(this, o).paused && (!t(this, o).ended || t(this, o).loop) && t(this, o).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
}, x = function(i = t(this, o).currentTime) {
  r(this, vs, Number.isFinite(i) ? Math.max(0, i) : 0), r(this, gs, performance.now());
}, J = function() {
  r(this, V, null), r(this, nt, null);
}, Ye = function() {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) {
    r(this, V, null);
    return;
  }
  const i = Number.isFinite(t(this, o).currentTime) ? Math.max(0, t(this, o).currentTime) : 0, a = Number.isFinite(t(this, gt)) ? t(this, gt) : i;
  r(this, V, Math.min(t(this, o).duration, Math.max(i, a))), e(this, s, x).call(this, t(this, V));
}, li = function() {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) {
    r(this, nt, null), e(this, s, Ye).call(this);
    return;
  }
  const i = t(this, c).style.getPropertyValue("--sp-progress-inset"), a = Number.parseFloat(i), l = Number.isFinite(a) ? Math.min(1, Math.max(0, 1 - a / 100)) : null, p = e(this, s, Yt).call(this), u = Math.min(1, Math.max(0, p / t(this, o).duration)), P = Math.max(l ?? 0, u);
  r(this, nt, P), r(this, V, P * t(this, o).duration), e(this, s, x).call(this, t(this, V)), e(this, s, pt).call(this, P), t(this, d).setAttribute("aria-valuenow", `${t(this, V)}`), t(this, d).setAttribute(
    "aria-valuetext",
    `${e(this, s, Y).call(this, t(this, V))} of ${e(this, s, Y).call(this, t(this, o).duration)}`
  );
}, Yt = function() {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) return t(this, o).currentTime || 0;
  if (e(this, s, X).call(this)) return t(this, F);
  if (t(this, V) !== null) return t(this, V);
  if (!e(this, s, Ue).call(this)) return t(this, o).currentTime || 0;
  if (t(this, At) || !t(this, vt) || performance.now() < t(this, bs))
    return e(this, s, x).call(this), t(this, o).currentTime || 0;
  if (t(this, c).classList.contains("is-loading") && t(this, o).readyState < HTMLMediaElement.HAVE_FUTURE_DATA)
    return e(this, s, x).call(this), t(this, o).currentTime || 0;
  const i = (performance.now() - t(this, gs)) / 1e3, a = t(this, vs) + i, l = t(this, o).loop ? a % t(this, o).duration : Math.min(a, t(this, o).duration);
  return !t(this, o).loop && t(this, o).currentTime - l > 0.45 ? (e(this, s, x).call(this), t(this, o).currentTime) : l;
}, pt = function(i) {
  const a = Math.min(1, Math.max(0, i)), l = (1 - a) * 100, { innerWidth: p } = e(this, s, Rs).call(this), u = 1 / p, P = t(this, v) && t(this, Ct) && t(this, it) + u < a;
  if (t(this, c).style.setProperty("--sp-progress-inset", `${l}%`), t(this, c).style.setProperty("--sp-return-marker-base-opacity", P ? "0" : "1"), P) {
    const Ls = e(this, s, cs).call(this, t(this, it)), rs = Math.max(0, p - 2), xi = Math.min(rs, Math.max(0, Ls - 3));
    t(this, c).style.setProperty("--sp-return-marker-hole-left", `${xi}px`);
  } else
    t(this, c).style.setProperty("--sp-return-marker-hole-left", "-9999px");
}, hi = function(i) {
  return !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0 ? 0 : Math.min(1, Math.max(0, i / t(this, o).duration));
}, Rs = function(i = t(this, d).getBoundingClientRect()) {
  const a = Math.min(2, Math.max(0, i.width / 2)), l = Math.max(1, i.width - a * 2);
  return { rect: i, sideInset: a, innerWidth: l };
}, cs = function(i, a = t(this, d).getBoundingClientRect()) {
  const { sideInset: l, innerWidth: p } = e(this, s, Rs).call(this, a), u = Math.min(1, Math.max(0, i));
  return l + u * p;
}, ci = function(i, a) {
  const { sideInset: l, innerWidth: p } = e(this, s, Rs).call(this, a);
  return Math.min(1, Math.max(0, (i - a.left - l) / p));
}, pi = function(i) {
  r(this, Tt, Number.isFinite(i) ? Math.max(0, i) : 0), r(this, it, e(this, s, hi).call(this, t(this, Tt)));
  const a = t(this, d).getBoundingClientRect(), l = e(this, s, cs).call(this, t(this, it), a), p = l >= t(this, ss) && l <= Math.max(t(this, ss), a.width - t(this, ss));
  r(this, Ct, t(this, Tt) > t(this, Us) && p), t(this, c).classList.toggle("has-return-marker", t(this, Ct)), t(this, c).style.setProperty("--sp-return-marker-left", `${l}px`);
}, ui = function(i, a, l, p = t(this, v)) {
  const u = l * t(this, o).duration;
  if (!p || !t(this, Ct))
    return { percent: l, targetTime: u };
  const P = a.left + e(this, s, cs).call(this, t(this, it), a);
  return Math.abs(i - P) <= t(this, Ns) ? {
    percent: t(this, it),
    targetTime: t(this, Tt)
  } : { percent: l, targetTime: u };
}, S = function(i = e(this, s, Yt).call(this)) {
  const a = Number.isFinite(t(this, o).duration) && t(this, o).duration > 0;
  if (a && t(this, nt) !== null) {
    const u = t(this, nt) * t(this, o).duration;
    r(this, gt, u), e(this, s, pt).call(this, t(this, nt)), t(this, d).setAttribute("aria-valuemin", "0"), t(this, d).setAttribute("aria-valuemax", `${t(this, o).duration}`), t(this, d).setAttribute("aria-valuenow", `${u}`), t(this, d).setAttribute(
      "aria-valuetext",
      `${e(this, s, Y).call(this, u)} of ${e(this, s, Y).call(this, t(this, o).duration)}`
    );
    return;
  }
  const l = a ? Math.min(t(this, o).duration, Math.max(0, i)) : i, p = a ? l / t(this, o).duration : 0;
  r(this, gt, Number.isFinite(l) ? Math.max(0, l) : 0), e(this, s, pt).call(this, p), t(this, d).setAttribute("aria-valuemin", "0"), t(this, d).setAttribute("aria-valuemax", a ? `${t(this, o).duration}` : "0"), t(this, d).setAttribute("aria-valuenow", a ? `${l}` : "0"), t(this, d).setAttribute(
    "aria-valuetext",
    a ? `${e(this, s, Y).call(this, l)} of ${e(this, s, Y).call(this, t(this, o).duration)}` : "Loading video"
  );
}, ps = function(i, a = t(this, v)) {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) return t(this, o).currentTime;
  const l = t(this, d).getBoundingClientRect(), p = e(this, s, ci).call(this, i, l), u = e(this, s, ui).call(this, i, l, p, a);
  return e(this, s, pt).call(this, u.percent), t(this, c).style.setProperty("--sp-scrub-preview-left", `${e(this, s, cs).call(this, u.percent, l)}px`), t(this, ms).textContent = e(this, s, Y).call(this, u.targetTime), t(this, d).setAttribute("aria-valuenow", `${u.targetTime}`), t(this, d).setAttribute(
    "aria-valuetext",
    `${e(this, s, Y).call(this, u.targetTime)} of ${e(this, s, Y).call(this, t(this, o).duration)}`
  ), e(this, s, di).call(this), u.targetTime;
}, us = function() {
  r(this, St, !1), t(this, c)?.classList.remove("has-controls-collision");
}, di = function() {
  if (!t(this, v) || !t(this, $) || !t(this, Zt)) {
    e(this, s, us).call(this);
    return;
  }
  const i = t(this, $).getBoundingClientRect(), a = t(this, Zt).getBoundingClientRect(), l = i.width > 0 && i.height > 0, p = t(this, St) ? t(this, Gs) : t(this, Ks), u = l && a.right >= i.left - p && a.left <= i.right + p && a.bottom >= i.top - p && a.top <= i.bottom + p;
  r(this, St, u), t(this, c).classList.toggle("has-controls-collision", t(this, St));
}, Xt = function() {
  t(this, dt) && (window.cancelAnimationFrame(t(this, dt)), r(this, dt, 0));
}, mi = function() {
  e(this, s, Xt).call(this), e(this, s, x).call(this);
  const i = () => {
    e(this, s, S).call(this, e(this, s, Yt).call(this)), e(this, s, Ue).call(this) && r(this, dt, window.requestAnimationFrame(i));
  };
  r(this, dt, window.requestAnimationFrame(i));
}, T = function() {
  const i = !t(this, o).paused && (!t(this, o).ended || t(this, o).loop) || t(this, v) && t(this, et), a = t(this, C) ? t(this, C) === "playing" : i;
  if (t(this, c).classList.toggle("is-playing", a), t(this, q).setAttribute("aria-label", a ? "Pause video" : "Play video"), t(this, v)) {
    e(this, s, Xt).call(this);
    return;
  }
  i && t(this, c).classList.contains("has-loaded-once") && !t(this, c).classList.contains("is-progress-settling") ? e(this, s, mi).call(this) : (e(this, s, Xt).call(this), e(this, s, S).call(this));
}, Et = function() {
  t(this, Ft) && (window.clearTimeout(t(this, Ft)), r(this, Ft, 0));
}, fi = function() {
  const i = t(this, o);
  return i.audioTracks && typeof i.audioTracks.length == "number" ? i.audioTracks.length > 0 : typeof i.mozHasAudio == "boolean" ? i.mozHasAudio : typeof i.webkitAudioDecodedByteCount == "number" && t(this, o).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !t(this, o).muted && t(this, o).currentTime > 0.25 ? i.webkitAudioDecodedByteCount > 0 : t(this, g);
}, A = new WeakMap(), Xe = function(i) {
  if (!t(this, g)) return;
  const a = t(this, E).getBoundingClientRect(), l = Math.min(1, Math.max(0, 1 - (i - a.top) / a.height)), p = Math.round(l * 100) / 100;
  t(this, o).volume = p, t(this, o).muted = p <= 0, t(this, A).call(this);
}, Ds = function(i) {
  i !== null && t(this, E).hasPointerCapture(i) && t(this, E).releasePointerCapture(i);
}, _t = function(i) {
  r(this, U, !1), r(this, w, null), t(this, _).classList.remove("is-scrubbing-volume"), t(this, E).blur(), e(this, s, Ds).call(this, i), e(this, s, Ze).call(this, 260);
}, kt = new WeakMap(), Hs = function() {
  const i = document;
  return t(this, f).fullscreenElement || i.fullscreenElement || i.webkitFullscreenElement || i.mozFullScreenElement || i.msFullscreenElement || null;
}, _e = function() {
  const i = document, a = t(this, c), l = t(this, o), u = !!((i.fullscreenEnabled ?? i.webkitFullscreenEnabled ?? i.mozFullScreenEnabled ?? i.msFullscreenEnabled ?? !1) && (a.requestFullscreen || a.webkitRequestFullscreen || a.mozRequestFullScreen || a.msRequestFullscreen)), P = !!(l.webkitSupportsFullscreen || l.webkitEnterFullscreen || l.webkitEnterFullScreen);
  return !!(this.fullscreenEnabled && (u || P));
}, bi = function() {
  const i = t(this, c), a = i.requestFullscreen || i.webkitRequestFullscreen || i.mozRequestFullScreen || i.msRequestFullscreen;
  return Promise.resolve(a?.call(i));
}, vi = function() {
  const i = t(this, o);
  (i.webkitEnterFullscreen || i.webkitEnterFullScreen)?.call(i);
}, gi = function() {
  const i = document, a = i.exitFullscreen || i.webkitExitFullscreen || i.mozCancelFullScreen || i.msExitFullscreen;
  return Promise.resolve(a?.call(i));
}, qt = new WeakMap(), Pt = new WeakMap(), yi = function(i) {
  e(this, s, H).call(this), e(this, s, ds).call(this), e(this, s, Bs).call(this, t(this, k)), e(this, s, Ds).call(this, t(this, w)), e(this, s, Et).call(this), r(this, M, !1), r(this, v, !1), r(this, k, null), r(this, O, !1), r(this, at, !1), r(this, U, !1), r(this, w, null), e(this, s, Is).call(this), t(this, Ps).call(this), t(this, Q).style.removeProperty("--sp-control-hover-offset"), t(this, y).classList.remove("is-volume-open"), t(this, _).classList.remove("is-scrubbing-volume"), t(this, c).classList.remove("is-scrubbing"), t(this, c).classList.remove("is-pointer-active");
  const a = t(this, f).activeElement;
  a instanceof HTMLElement && a.blur(), i ? e(this, s, Re).call(this) : e(this, s, ns).call(this);
}, Ts = new WeakMap(), Bs = function(i) {
  i !== null && t(this, d).hasPointerCapture(i) && t(this, d).releasePointerCapture(i);
}, We = async function(i, a, l) {
  if (!t(this, M) && !t(this, v)) return;
  const p = t(this, v);
  e(this, s, Et).call(this), r(this, M, !1), r(this, v, !1), r(this, k, null), t(this, c).classList.remove("is-scrubbing"), e(this, s, us).call(this), e(this, s, Bs).call(this, a), l && i !== null && (e(this, s, J).call(this), r(this, F, e(this, s, ps).call(this, i, p)), r(this, N, !0), r(this, mt, t(this, et)), t(this, o).currentTime = t(this, F), e(this, s, x).call(this, t(this, F))), e(this, s, S).call(this, t(this, F)), p && t(this, et) && await t(this, o).play(), e(this, s, K).call(this);
}, qs = function(i) {
  !t(this, M) && !t(this, v) || (e(this, s, Et).call(this), r(this, M, !1), r(this, v, !1), r(this, k, null), t(this, c).classList.remove("is-scrubbing"), e(this, s, us).call(this), e(this, s, Bs).call(this, i), e(this, s, x).call(this), e(this, s, S).call(this), t(this, et) && t(this, o).play(), e(this, s, K).call(this));
}, se = new WeakMap(), ee = new WeakMap(), ie = new WeakMap(), ds = function() {
  t(this, yt) && (window.clearTimeout(t(this, yt)), r(this, yt, 0));
}, je = function() {
  !this.volumeEnabled || !this.volumeSliderEnabled || !t(this, g) || (e(this, s, ds).call(this), t(this, y).classList.add("is-volume-open"));
}, es = new WeakMap(), Ze = function(i = 150) {
  e(this, s, ds).call(this), r(this, yt, window.setTimeout(t(this, es), i));
}, Cs = new WeakMap(), Fs = new WeakMap(), re = new WeakMap(), oe = new WeakMap(), ne = new WeakMap(), ae = new WeakMap(), le = new WeakMap(), he = new WeakMap(), ce = new WeakMap(), pe = new WeakMap(), ue = new WeakMap(), de = new WeakMap(), me = new WeakMap(), fe = new WeakMap(), be = new WeakMap(), ve = new WeakMap(), ge = new WeakMap(), ye = new WeakMap(), we = new WeakMap(), xe = new WeakMap(), ke = new WeakMap(), Pe = new WeakMap(), Ee = new WeakMap(), is = new WeakMap(), Te = new WeakMap(), Ce = new WeakMap(), Fe = new WeakMap(), Le = new WeakMap(), Ae = new WeakMap(), Se = new WeakMap(), I = function() {
  return window.matchMedia("(max-width: 768px)").matches && window.matchMedia("(hover: none), (pointer: coarse)").matches;
}, wi = function() {
  t(this, o) && (t(this, z)?.disconnect(), r(this, z, null), e(this, s, ls).call(this), e(this, s, zs).call(this), r(this, B, !1), r(this, Kt, 0), r(this, R, !1), r(this, D, !1), r(this, W, !1), r(this, j, !1), r(this, Z, t(this, Z) + 1), r(this, vt, !1), r(this, gt, 0), e(this, s, J).call(this), r(this, g, !0), r(this, N, !1), r(this, mt, !1), r(this, C, null), t(this, c).classList.remove("has-loaded-once", "has-visible-frame", "is-progress-settling"), t(this, o).dataset.src = this.src, t(this, o).pause(), t(this, o).removeAttribute("src"), t(this, o).preload = "none", t(this, o).load(), e(this, s, pt).call(this, 0), t(this, A).call(this), t(this, L).call(this), e(this, s, T).call(this));
}, Ke(Qe, "observedAttributes", [
  "src",
  "aspect-ratio",
  "preload-margin",
  "disable-volume",
  "disable-volume-slider",
  "disable-picture-in-picture",
  "disable-pip",
  "disable-fullscreen",
  "no-volume",
  "no-volume-slider",
  "no-picture-in-picture",
  "no-pip",
  "no-fullscreen"
]);
customElements.get("simple-player") || customElements.define("simple-player", Qe);
export {
  Qe as SimplePlayer
};
//# sourceMappingURL=simple-player.js.map
