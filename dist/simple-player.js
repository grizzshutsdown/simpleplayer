var pi = Object.defineProperty;
var qe = (m) => {
  throw TypeError(m);
};
var di = (m, f, i) => f in m ? pi(m, f, { enumerable: !0, configurable: !0, writable: !0, value: i }) : m[f] = i;
var He = (m, f, i) => di(m, typeof f != "symbol" ? f + "" : f, i), ve = (m, f, i) => f.has(m) || qe("Cannot " + i);
var t = (m, f, i) => (ve(m, f, "read from private field"), i ? i.call(m) : f.get(m)), n = (m, f, i) => f.has(m) ? qe("Cannot add the same private member more than once") : f instanceof WeakSet ? f.add(m) : f.set(m, i), r = (m, f, i, a) => (ve(m, f, "write to private field"), a ? a.call(m, i) : f.set(m, i), i), e = (m, f, i) => (ve(m, f, "access private method"), i);
const Be = "16 / 9", mi = "360px 0px", fi = `
  :host {
    --simple-player-aspect-ratio: ${Be};
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

  .sp-button::before {
    content: '';
    position: absolute;
    inset: 5px;
    border-radius: 999px;
    background: rgb(var(--white-rgb) / 0.14);
    filter: blur(5px);
    opacity: 0;
    transform: scale(0.82);
    transition:
      opacity 220ms ease,
      filter 260ms ease,
      transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .sp-player.is-pointer-active .sp-button,
  .sp-player.is-controls-visible .sp-button,
  :host(:hover) .sp-button {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, -50%) scale(1);
  }

  .sp-player.is-button-animating .sp-button {
    animation: sp-button-release 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .sp-player.is-button-animating .sp-button::before,
  .sp-button:active::before {
    opacity: 1;
    filter: blur(7px);
    transform: scale(1);
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

  .sp-control-button:hover .sp-control-icon {
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

  @keyframes sp-button-release {
    0% {
      filter: blur(0);
      transform: translate(-50%, -50%) scale(1);
    }

    42% {
      filter: blur(1.2px);
      transform: translate(-50%, -50%) scale(0.91);
    }

    100% {
      filter: blur(0);
      transform: translate(-50%, -50%) scale(1);
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
`, Ne = document.createElement("template");
Ne.innerHTML = `
  <style>${fi}</style>
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
var b, Nt, V, Ut, q, c, o, I, d, $, lt, $t, os, x, _, P, O, K, ns, ht, v, S, G, T, kt, J, Pt, H, ct, _t, Ct, y, E, Xt, Q, ut, pt, tt, dt, as, z, R, X, W, Y, mt, ls, Et, hs, cs, ft, D, st, Tt, k, j, Wt, Yt, Ft, B, et, g, bt, vt, jt, As, Ss, Zt, Ms, Vs, us, Ot, Is, zs, Rs, Ds, qs, Hs, Lt, Bs, Ns, s, gs, ys, ge, ye, $e, h, ws, At, N, Us, xs, wt, Rt, ks, Jt, Dt, _e, we, St, Mt, ps, Vt, it, rt, ds, xe, Qt, Ps, ke, Pe, Xe, We, ms, Ye, ot, je, Ce, Ze, Ee, qt, F, Oe, U, Ke, Te, Fe, Ge, It, Le, w, Z, Ae, Je, ts, nt, Qe, Cs, ss, ti, si, ei, M, es, is, ii, Ht, ri, C, xt, oi, L, Se, Es, Bt, gt, Ts, Me, ni, ai, li, zt, yt, hi, fs, Fs, Ve, Ls, $s, _s, Xs, rs, Ie, Kt, ze, bs, vs, Ws, Ys, js, Zs, Os, Ks, Gs, Js, Qs, te, se, ee, ie, re, oe, ne, ae, le, he, ce, Gt, ue, pe, de, me, fe, be, at, ci;
class Ue extends HTMLElement {
  constructor() {
    super();
    n(this, s);
    n(this, b);
    n(this, Nt, []);
    n(this, V, null);
    n(this, Ut, !1);
    n(this, q, !1);
    n(this, c);
    n(this, o);
    n(this, I);
    n(this, d);
    n(this, $);
    n(this, lt);
    n(this, $t);
    n(this, os);
    n(this, x);
    n(this, _);
    n(this, P);
    n(this, O);
    n(this, K);
    n(this, ns, []);
    n(this, ht, 0);
    n(this, v, !1);
    n(this, S, !1);
    n(this, G, !1);
    n(this, T, 0);
    n(this, kt, 0);
    n(this, J, 0);
    n(this, Pt, !1);
    n(this, H, !1);
    n(this, ct, !1);
    n(this, _t, 0);
    n(this, Ct, 0);
    n(this, y, null);
    n(this, E, null);
    n(this, Xt, 0);
    n(this, Q, 0);
    n(this, ut, 0);
    n(this, pt, 0);
    n(this, tt, 0);
    n(this, dt, 0);
    n(this, as, 0);
    n(this, z, !1);
    n(this, R, !1);
    n(this, X, !1);
    n(this, W, !1);
    n(this, Y, 0);
    n(this, mt, !1);
    n(this, ls, 0);
    n(this, Et, !0);
    n(this, hs, 0);
    n(this, cs, performance.now());
    n(this, ft, 0);
    n(this, D, null);
    n(this, st, null);
    n(this, Tt, !1);
    n(this, k, !0);
    n(this, j, !1);
    n(this, Wt, null);
    n(this, Yt, null);
    n(this, Ft, !1);
    n(this, B, !1);
    n(this, et, !1);
    n(this, g, null);
    n(this, bt, 0);
    n(this, vt, 0);
    n(this, jt, null);
    n(this, As, 4);
    n(this, Ss, 3.5);
    n(this, Zt, 6);
    n(this, Ms, 0.08);
    n(this, Vs, 240);
    n(this, us, 1200);
    n(this, Ot, 1600);
    n(this, Is, 140);
    n(this, zs, 380);
    n(this, Rs, 650);
    n(this, Ds, 2e3);
    n(this, qs, 3);
    n(this, Hs, 10);
    n(this, Lt, 0.18);
    n(this, Bs, 8);
    n(this, Ns, 18);
    n(this, At, (i) => {
      i.preventDefault();
    });
    n(this, Us, () => {
      if (r(this, ut, 0), !(t(this, S) || t(this, v) || t(this, B))) {
        if (e(this, s, at).call(this)) {
          t(this, c).classList.remove("is-controls-visible");
          return;
        }
        t(this, j) || t(this, c).classList.remove("is-pointer-active");
      }
    });
    n(this, St, (i) => {
      e(this, s, Dt).call(this, i) && e(this, s, ks).call(this, !0);
    });
    n(this, Mt, (i) => {
      e(this, s, Dt).call(this, i) && e(this, s, ks).call(this, !0);
    });
    n(this, ps, (i) => {
      e(this, s, Dt).call(this, i) && e(this, s, we).call(this);
    });
    n(this, Vt, () => {
      e(this, s, Jt).call(this);
    });
    n(this, it, (i) => {
      e(this, s, Dt).call(this, i) && (r(this, j, !0), t(this, c).classList.add("is-pointer-active"), e(this, s, N).call(this));
    });
    n(this, rt, () => {
      r(this, j, !1), e(this, s, xs).call(this, t(this, Ot));
    });
    n(this, ds, (i) => {
      const a = i.currentTarget, l = Number(a?.dataset.spControlIndex ?? 0);
      t(this, lt).style.setProperty("--sp-control-hover-offset", `calc(var(--sp-control-slot-size) * ${l})`);
    });
    n(this, ms, () => {
      if (t(this, tt) || t(this, c).classList.contains("is-progress-settling")) {
        if (e(this, s, Ps).call(this), t(this, mt)) {
          t(this, c).classList.remove("is-progress-settling");
          return;
        }
        r(this, mt, !0), r(this, ls, performance.now() + t(this, Rs)), e(this, s, U).call(this) || e(this, s, w).call(this), e(this, s, M).call(this), t(this, c).classList.remove("is-progress-settling"), e(this, s, C).call(this);
      }
    });
    n(this, F, () => {
      if (t(this, o).error) {
        e(this, s, qt).call(this, !0, !0);
        return;
      }
      e(this, s, qt).call(this, !t(this, q) || !t(this, R) || t(this, o).readyState < HTMLMediaElement.HAVE_FUTURE_DATA);
    });
    n(this, It, () => {
      if (t(this, o).error || t(this, o).readyState < HTMLMediaElement.HAVE_CURRENT_DATA || t(this, o).videoWidth <= 0 || t(this, o).videoHeight <= 0)
        return t(this, F).call(this), !1;
      if (!t(this, z))
        return e(this, s, Ge).call(this), t(this, F).call(this), !1;
      const i = e(this, s, Fe).call(this);
      return t(this, L).call(this), i;
    });
    n(this, L, () => {
      if (!this.volumeEnabled) {
        t(this, c).classList.remove("is-volume-unavailable", "is-volume-muted", "is-volume-sound", "is-volume-icon-animating"), t(this, x).disabled = !0;
        return;
      }
      r(this, k, e(this, s, oi).call(this));
      const i = !t(this, k) || t(this, o).muted || t(this, o).volume <= 0, a = t(this, k) && !t(this, o).muted ? t(this, o).volume : 0, l = Math.round(a * 100), u = i ? "muted" : "sound";
      t(this, jt) && t(this, jt) !== u && e(this, s, We).call(this), r(this, jt, u), t(this, c).classList.toggle("is-volume-unavailable", !t(this, k)), t(this, c).classList.toggle("is-volume-muted", i), t(this, c).classList.toggle("is-volume-sound", !i), t(this, c).style.setProperty("--sp-volume-level", `${l}%`), t(this, x).disabled = !t(this, k), t(this, x).setAttribute(
        "aria-label",
        t(this, k) ? i ? "Unmute video" : "Mute video" : "Video has no audio"
      ), t(this, P).setAttribute("aria-valuenow", `${l}`);
    });
    n(this, gt, () => {
      const i = document.pictureInPictureElement === t(this, o), a = t(this, o), l = !!(this.pictureInPictureEnabled && document.pictureInPictureEnabled && a.requestPictureInPicture);
      t(this, c).classList.toggle("is-picture-in-picture", i), t(this, O).disabled = !l, t(this, O).setAttribute("aria-label", i ? "Exit picture in picture" : "Enter picture in picture");
    });
    n(this, zt, () => {
      const i = e(this, s, Ts).call(this), a = i === t(this, c) || i === this, l = e(this, s, Me).call(this);
      return t(this, c).classList.toggle("is-fullscreen", a), t(this, K).disabled = !l, t(this, K).setAttribute("aria-label", a ? "Exit fullscreen" : "Enter fullscreen"), a;
    });
    n(this, yt, () => {
      const i = t(this, zt).call(this);
      e(this, s, hi).call(this, i);
    });
    n(this, fs, () => {
      !t(this, S) || t(this, v) || (e(this, s, Z).call(this), e(this, s, N).call(this), e(this, s, xt).call(this), r(this, v, !0), t(this, c).classList.add("is-scrubbing"), r(this, T, e(this, s, es).call(this, t(this, _t), !0)), t(this, G) && t(this, o).pause(), t(this, o).currentTime = t(this, T), e(this, s, w).call(this, t(this, T)), e(this, s, M).call(this, t(this, T)), e(this, s, Ht).call(this), e(this, s, C).call(this));
    });
    n(this, $s, async () => {
      if (performance.now() < t(this, as))
        return;
      e(this, s, Xe).call(this);
      const i = t(this, E) ? t(this, E) !== "playing" : t(this, o).paused || t(this, o).ended, a = !i || e(this, s, Oe).call(this);
      e(this, s, Rt).call(this), a && (r(this, E, i ? "playing" : "paused"), e(this, s, C).call(this)), i ? (e(this, s, Z).call(this), await e(this, s, ot).call(this), await t(this, o).play().catch(() => {
        r(this, E, null);
      })) : (e(this, s, Je).call(this), t(this, o).pause()), e(this, s, C).call(this), e(this, s, wt).call(this);
    });
    n(this, _s, (i) => {
      if (!(i instanceof PointerEvent)) return;
      const a = t(this, I).getBoundingClientRect(), l = i.clientX >= a.left && i.clientX <= a.right && i.clientY >= a.top && i.clientY <= a.bottom;
      e(this, s, Rt).call(this) && l && r(this, as, performance.now() + 260), e(this, s, ot).call(this);
    });
    n(this, Xs, (i) => {
      i.stopPropagation();
    });
    n(this, Kt, () => {
      r(this, bt, 0), !(t(this, et) || t(this, B)) && t(this, x).classList.remove("is-volume-open");
    });
    n(this, bs, () => {
      e(this, s, at).call(this) || (r(this, et, !0), e(this, s, Ie).call(this));
    });
    n(this, vs, () => {
      e(this, s, at).call(this) || (r(this, et, !1), e(this, s, ze).call(this));
    });
    n(this, Ws, (i) => {
      !this.volumeEnabled || !t(this, k) || (i.preventDefault(), i.stopPropagation(), e(this, s, Rt).call(this), t(this, Kt).call(this), t(this, o).muted || t(this, o).volume <= 0 ? (t(this, o).volume <= 0 && (t(this, o).volume = 0.7), t(this, o).muted = !1) : t(this, o).muted = !0, t(this, L).call(this), e(this, s, wt).call(this));
    });
    n(this, Ys, (i) => {
      i instanceof PointerEvent && (!this.volumeEnabled || !t(this, k) || (i.preventDefault(), i.stopPropagation(), e(this, s, Rt).call(this), e(this, s, N).call(this), e(this, s, Ie).call(this), r(this, B, !0), r(this, g, i.pointerId), t(this, _).classList.add("is-scrubbing-volume"), t(this, P).setPointerCapture(i.pointerId), e(this, s, Se).call(this, i.clientY)));
    });
    n(this, js, (i) => {
      i instanceof PointerEvent && t(this, B) && (t(this, g) !== null && i.pointerId !== t(this, g) || (i.preventDefault(), i.stopPropagation(), e(this, s, Se).call(this, i.clientY)));
    });
    n(this, Zs, (i) => {
      i instanceof PointerEvent && (t(this, g) !== null && i.pointerId !== t(this, g) || (i.stopPropagation(), e(this, s, Bt).call(this, i.pointerId), e(this, s, wt).call(this)));
    });
    n(this, Os, (i) => {
      i instanceof PointerEvent && (t(this, g) !== null && i.pointerId !== t(this, g) || (i.stopPropagation(), e(this, s, Bt).call(this, i.pointerId)));
    });
    n(this, Ks, (i) => {
      if (!(i instanceof KeyboardEvent) || !this.volumeEnabled || !t(this, k) || !["ArrowUp", "ArrowDown", "Home", "End"].includes(i.key)) return;
      i.preventDefault(), i.stopPropagation();
      const a = i.shiftKey ? 0.1 : 0.05, l = i.key === "Home" ? 0 : i.key === "End" ? 1 : t(this, o).volume + (i.key === "ArrowUp" ? a : -a);
      t(this, o).volume = Math.min(1, Math.max(0, l)), t(this, o).muted = t(this, o).volume <= 0, t(this, L).call(this);
    });
    n(this, Gs, async () => {
      const i = t(this, o);
      if (!(!this.pictureInPictureEnabled || !document.pictureInPictureEnabled || !i.requestPictureInPicture))
        try {
          await e(this, s, ot).call(this), document.pictureInPictureElement === t(this, o) ? await document.exitPictureInPicture() : await i.requestPictureInPicture();
        } catch {
        } finally {
          t(this, gt).call(this);
        }
    });
    n(this, Js, async (i) => {
      if (e(this, s, Me).call(this)) {
        i.preventDefault(), i.stopPropagation(), e(this, s, Dt).call(this, i);
        try {
          const a = e(this, s, Ts).call(this);
          if (a === t(this, c) || a === this)
            await e(this, s, li).call(this);
          else {
            await e(this, s, ot).call(this);
            const l = t(this, c);
            typeof l.requestFullscreen == "function" || typeof l.webkitRequestFullscreen == "function" || typeof l.mozRequestFullScreen == "function" || typeof l.msRequestFullscreen == "function" ? await e(this, s, ni).call(this) : e(this, s, ai).call(this);
          }
        } catch {
        } finally {
          t(this, zt).call(this);
        }
      }
    });
    n(this, Qs, (i) => {
      i instanceof PointerEvent && (i.preventDefault(), e(this, s, Rt).call(this), e(this, s, N).call(this), t(this, ms).call(this), r(this, H, !1), r(this, ct, !1), e(this, s, si).call(this, e(this, s, ts).call(this)), r(this, S, !0), r(this, y, i.pointerId), r(this, _t, i.clientX), r(this, G, !t(this, o).paused && !t(this, o).ended), t(this, d).setPointerCapture(i.pointerId), r(this, T, e(this, s, es).call(this, i.clientX, !1)), e(this, s, xt).call(this), r(this, Ct, window.setTimeout(t(this, fs), t(this, Vs))));
    });
    n(this, te, (i) => {
      i instanceof PointerEvent && t(this, S) && (t(this, y) !== null && i.pointerId !== t(this, y) || (!t(this, v) && Math.abs(i.clientX - t(this, _t)) >= t(this, As) && t(this, fs).call(this), t(this, v) && r(this, T, e(this, s, es).call(this, i.clientX))));
    });
    n(this, se, (i) => {
      i instanceof PointerEvent && (t(this, y) !== null && i.pointerId !== t(this, y) || e(this, s, Ve).call(this, i.clientX, i.pointerId, !0));
    });
    n(this, ee, (i) => {
      i instanceof PointerEvent && (t(this, y) !== null && i.pointerId !== t(this, y) || e(this, s, Ls).call(this, i.pointerId));
    });
    n(this, ie, (i) => {
      if (i instanceof PointerEvent) {
        if (t(this, g) !== null && i.pointerId === t(this, g)) {
          e(this, s, Bt).call(this, i.pointerId);
          return;
        }
        t(this, y) === null || i.pointerId !== t(this, y) || e(this, s, Ve).call(this, i.clientX, i.pointerId, !0);
      }
    });
    n(this, re, (i) => {
      if (i instanceof PointerEvent) {
        if (t(this, g) !== null && i.pointerId === t(this, g)) {
          e(this, s, Bt).call(this, i.pointerId);
          return;
        }
        t(this, y) === null || i.pointerId !== t(this, y) || e(this, s, Ls).call(this, i.pointerId);
      }
    });
    n(this, oe, () => {
      e(this, s, Bt).call(this, t(this, g)), e(this, s, Ls).call(this, t(this, y));
    });
    n(this, ne, () => {
      e(this, s, Ts).call(this) || e(this, s, Jt).call(this);
    });
    n(this, ae, () => {
      r(this, E, null), e(this, s, Z).call(this), e(this, s, U).call(this) || e(this, s, w).call(this), e(this, s, C).call(this);
    });
    n(this, le, () => {
      r(this, E, null), e(this, s, U).call(this) || e(this, s, Ae).call(this), t(this, F).call(this), e(this, s, C).call(this);
    });
    n(this, he, () => {
      r(this, E, null), e(this, s, Z).call(this), e(this, s, U).call(this) || e(this, s, w).call(this), e(this, s, C).call(this);
    });
    n(this, ce, () => {
      e(this, s, qt).call(this, !0, !0);
    });
    n(this, Gt, () => {
      e(this, s, qt).call(this, !0);
    });
    n(this, ue, () => {
      e(this, s, Z).call(this), r(this, k, !0), t(this, L).call(this), e(this, s, U).call(this) || e(this, s, w).call(this), t(this, F).call(this), e(this, s, M).call(this);
    });
    n(this, pe, () => {
      const i = t(this, It).call(this);
      t(this, L).call(this), i && !e(this, s, U).call(this) && e(this, s, w).call(this), e(this, s, C).call(this);
    });
    n(this, de, () => {
      if (e(this, s, Z).call(this), t(this, F).call(this), t(this, H) && (!t(this, ct) || t(this, o).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA)) {
        e(this, s, Te).call(this), e(this, s, C).call(this);
        return;
      }
      e(this, s, U).call(this) || e(this, s, w).call(this), e(this, s, M).call(this);
    });
    n(this, me, () => {
      r(this, E, null), r(this, z, !1), r(this, R, !1), r(this, X, !1), r(this, W, !1), r(this, Y, t(this, Y) + 1), t(this, c).classList.remove("has-visible-frame"), e(this, s, qt).call(this, !0, !0), e(this, s, C).call(this), e(this, s, Ke).call(this);
    });
    n(this, fe, () => {
      t(this, L).call(this), e(this, s, M).call(this);
    });
    n(this, be, () => {
      t(this, L).call(this);
    });
    r(this, b, this.attachShadow({ mode: "open" })), t(this, b).append(Ne.content.cloneNode(!0));
  }
  get src() {
    return this.getAttribute("src") ?? "";
  }
  set src(i) {
    e(this, s, gs).call(this, "src", i);
  }
  get aspectRatio() {
    return this.getAttribute("aspect-ratio") || Be;
  }
  set aspectRatio(i) {
    e(this, s, gs).call(this, "aspect-ratio", i);
  }
  get preloadMargin() {
    return this.getAttribute("preload-margin") || mi;
  }
  set preloadMargin(i) {
    e(this, s, gs).call(this, "preload-margin", i);
  }
  get volumeEnabled() {
    return !this.hasAttribute("disable-volume") && !this.hasAttribute("no-volume");
  }
  set volumeEnabled(i) {
    e(this, s, ys).call(this, "volume", i);
  }
  get pictureInPictureEnabled() {
    return !this.hasAttribute("disable-picture-in-picture") && !this.hasAttribute("disable-pip") && !this.hasAttribute("no-picture-in-picture") && !this.hasAttribute("no-pip");
  }
  set pictureInPictureEnabled(i) {
    e(this, s, ys).call(this, "picture-in-picture", i);
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
    e(this, s, ys).call(this, "fullscreen", i);
  }
  connectedCallback() {
    r(this, c, t(this, b).querySelector("[data-sp-player]")), r(this, o, t(this, b).querySelector("[data-sp-video]")), r(this, I, t(this, b).querySelector("[data-sp-button]")), r(this, d, t(this, b).querySelector("[data-sp-progress-track]")), r(this, $, t(this, b).querySelector("[data-sp-control-tray]")), r(this, lt, t(this, b).querySelector("[data-sp-control-tray-slots]")), r(this, $t, t(this, b).querySelector("[data-sp-time]")), r(this, os, t(this, b).querySelector("[data-sp-time-text]")), r(this, x, t(this, b).querySelector("[data-sp-volume-control]")), r(this, _, t(this, b).querySelector("[data-sp-volume-popover]")), r(this, P, t(this, b).querySelector("[data-sp-volume-track]")), r(this, O, t(this, b).querySelector("[data-sp-picture-in-picture-control]")), r(this, K, t(this, b).querySelector("[data-sp-fullscreen-control]")), r(this, ns, [t(this, x), t(this, O), t(this, K)]), e(this, s, ge).call(this), t(this, Ut) || (e(this, s, $e).call(this), r(this, Ut, !0)), e(this, s, ws).call(this), e(this, s, ye).call(this), t(this, F).call(this), t(this, L).call(this), t(this, gt).call(this), t(this, zt).call(this), e(this, s, C).call(this);
  }
  disconnectedCallback() {
    t(this, V)?.disconnect(), r(this, V, null), t(this, Nt).forEach((i) => i()), r(this, Nt, []), r(this, Ut, !1), e(this, s, N).call(this), e(this, s, xe).call(this), e(this, s, Qt).call(this), e(this, s, Ps).call(this), e(this, s, xt).call(this), e(this, s, ke).call(this), e(this, s, rs).call(this), e(this, s, Pe).call(this), t(this, c).classList.remove("is-button-animating"), t(this, c).classList.remove("is-volume-icon-animating"), t(this, lt).style.removeProperty("--sp-control-hover-offset"), e(this, s, is).call(this), r(this, B, !1), r(this, et, !1), r(this, j, !1), r(this, g, null), t(this, x).classList.remove("is-volume-open"), t(this, c).classList.remove("is-pointer-active"), e(this, s, Ht).call(this);
  }
  attributeChangedCallback(i, a, l) {
    if (a !== l) {
      if (i === "aspect-ratio") {
        e(this, s, ge).call(this);
        return;
      }
      if (i === "preload-margin" && this.isConnected) {
        t(this, V)?.disconnect(), e(this, s, ws).call(this);
        return;
      }
      if (i === "src" && this.isConnected) {
        e(this, s, ci).call(this), e(this, s, ws).call(this);
        return;
      }
      (i.startsWith("disable-") || i.startsWith("no-")) && this.isConnected && (e(this, s, ye).call(this), t(this, L).call(this), t(this, gt).call(this), t(this, zt).call(this));
    }
  }
}
b = new WeakMap(), Nt = new WeakMap(), V = new WeakMap(), Ut = new WeakMap(), q = new WeakMap(), c = new WeakMap(), o = new WeakMap(), I = new WeakMap(), d = new WeakMap(), $ = new WeakMap(), lt = new WeakMap(), $t = new WeakMap(), os = new WeakMap(), x = new WeakMap(), _ = new WeakMap(), P = new WeakMap(), O = new WeakMap(), K = new WeakMap(), ns = new WeakMap(), ht = new WeakMap(), v = new WeakMap(), S = new WeakMap(), G = new WeakMap(), T = new WeakMap(), kt = new WeakMap(), J = new WeakMap(), Pt = new WeakMap(), H = new WeakMap(), ct = new WeakMap(), _t = new WeakMap(), Ct = new WeakMap(), y = new WeakMap(), E = new WeakMap(), Xt = new WeakMap(), Q = new WeakMap(), ut = new WeakMap(), pt = new WeakMap(), tt = new WeakMap(), dt = new WeakMap(), as = new WeakMap(), z = new WeakMap(), R = new WeakMap(), X = new WeakMap(), W = new WeakMap(), Y = new WeakMap(), mt = new WeakMap(), ls = new WeakMap(), Et = new WeakMap(), hs = new WeakMap(), cs = new WeakMap(), ft = new WeakMap(), D = new WeakMap(), st = new WeakMap(), Tt = new WeakMap(), k = new WeakMap(), j = new WeakMap(), Wt = new WeakMap(), Yt = new WeakMap(), Ft = new WeakMap(), B = new WeakMap(), et = new WeakMap(), g = new WeakMap(), bt = new WeakMap(), vt = new WeakMap(), jt = new WeakMap(), As = new WeakMap(), Ss = new WeakMap(), Zt = new WeakMap(), Ms = new WeakMap(), Vs = new WeakMap(), us = new WeakMap(), Ot = new WeakMap(), Is = new WeakMap(), zs = new WeakMap(), Rs = new WeakMap(), Ds = new WeakMap(), qs = new WeakMap(), Hs = new WeakMap(), Lt = new WeakMap(), Bs = new WeakMap(), Ns = new WeakMap(), s = new WeakSet(), gs = function(i, a) {
  if (a === "") {
    this.removeAttribute(i);
    return;
  }
  this.setAttribute(i, a);
}, ys = function(i, a) {
  if (a) {
    this.removeAttribute(`disable-${i}`), this.removeAttribute(`no-${i}`), i === "picture-in-picture" && (this.removeAttribute("disable-pip"), this.removeAttribute("no-pip"));
    return;
  }
  this.setAttribute(`disable-${i}`, "");
}, ge = function() {
  this.style.setProperty("--simple-player-aspect-ratio", this.aspectRatio);
}, ye = function() {
  if (!t(this, c)) return;
  const i = [
    { button: t(this, x), enabled: this.volumeEnabled, className: "has-volume-control" },
    { button: t(this, O), enabled: this.pictureInPictureEnabled, className: "has-picture-in-picture-control" },
    { button: t(this, K), enabled: this.fullscreenEnabled, className: "has-fullscreen-control" }
  ];
  let a = 0;
  for (const l of i)
    t(this, c).classList.toggle(l.className, l.enabled), l.button.hidden = !l.enabled, l.enabled ? (l.button.dataset.spControlIndex = `${a}`, a += 1) : delete l.button.dataset.spControlIndex;
  this.style.setProperty("--sp-enabled-controls-count", `${a}`), this.style.setProperty("--sp-control-tray-display", a > 0 ? "block" : "none"), this.volumeEnabled || (t(this, Kt).call(this), e(this, s, Es).call(this, t(this, g)), r(this, B, !1), r(this, et, !1), t(this, _).classList.remove("is-scrubbing-volume")), t(this, lt).style.removeProperty("--sp-control-hover-offset");
}, $e = function() {
  e(this, s, h).call(this, t(this, I), "click", t(this, $s)), e(this, s, h).call(this, this, "pointerenter", t(this, St)), e(this, s, h).call(this, this, "pointermove", t(this, Mt)), e(this, s, h).call(this, this, "pointerleave", t(this, Vt)), e(this, s, h).call(this, this, "mouseenter", t(this, St)), e(this, s, h).call(this, this, "mousemove", t(this, Mt)), e(this, s, h).call(this, this, "mouseleave", t(this, Vt)), e(this, s, h).call(this, t(this, c), "pointerenter", t(this, St)), e(this, s, h).call(this, t(this, c), "pointermove", t(this, Mt)), e(this, s, h).call(this, t(this, c), "pointerleave", t(this, Vt)), e(this, s, h).call(this, t(this, c), "mouseenter", t(this, St)), e(this, s, h).call(this, t(this, c), "mousemove", t(this, Mt)), e(this, s, h).call(this, t(this, c), "mouseleave", t(this, Vt)), e(this, s, h).call(this, t(this, I), "pointerenter", t(this, it)), e(this, s, h).call(this, t(this, I), "pointerleave", t(this, rt)), e(this, s, h).call(this, t(this, I), "mouseenter", t(this, it)), e(this, s, h).call(this, t(this, I), "mouseleave", t(this, rt)), e(this, s, h).call(this, t(this, d), "pointerenter", t(this, it)), e(this, s, h).call(this, t(this, d), "pointerleave", t(this, rt)), e(this, s, h).call(this, t(this, d), "mouseenter", t(this, it)), e(this, s, h).call(this, t(this, d), "mouseleave", t(this, rt)), e(this, s, h).call(this, t(this, $), "pointerenter", t(this, it)), e(this, s, h).call(this, t(this, $), "pointerleave", t(this, rt)), e(this, s, h).call(this, t(this, $), "mouseenter", t(this, it)), e(this, s, h).call(this, t(this, $), "mouseleave", t(this, rt)), e(this, s, h).call(this, t(this, c), "pointerdown", t(this, _s)), e(this, s, h).call(this, t(this, c), "dragstart", t(this, At)), e(this, s, h).call(this, t(this, c), "selectstart", t(this, At)), e(this, s, h).call(this, t(this, o), "dragstart", t(this, At)), e(this, s, h).call(this, t(this, o), "selectstart", t(this, At)), e(this, s, h).call(this, t(this, d), "pointerdown", t(this, Qs)), e(this, s, h).call(this, t(this, d), "pointermove", t(this, te)), e(this, s, h).call(this, t(this, d), "pointerup", t(this, se)), e(this, s, h).call(this, t(this, d), "pointercancel", t(this, ee)), e(this, s, h).call(this, t(this, x), "pointerenter", t(this, bs)), e(this, s, h).call(this, t(this, x), "pointerleave", t(this, vs)), e(this, s, h).call(this, t(this, x), "click", t(this, Ws)), e(this, s, h).call(this, t(this, _), "pointerenter", t(this, bs)), e(this, s, h).call(this, t(this, _), "pointerleave", t(this, vs)), e(this, s, h).call(this, t(this, P), "pointerdown", t(this, Ys)), e(this, s, h).call(this, t(this, P), "pointermove", t(this, js)), e(this, s, h).call(this, t(this, P), "pointerup", t(this, Zs)), e(this, s, h).call(this, t(this, P), "pointercancel", t(this, Os)), e(this, s, h).call(this, t(this, P), "click", t(this, Xs)), e(this, s, h).call(this, t(this, P), "keydown", t(this, Ks)), e(this, s, h).call(this, t(this, O), "click", t(this, Gs)), e(this, s, h).call(this, t(this, K), "click", t(this, Js));
  for (const i of t(this, ns))
    e(this, s, h).call(this, i, "pointerenter", t(this, ds)), e(this, s, h).call(this, i, "mouseenter", t(this, ds));
  e(this, s, h).call(this, document, "pointerup", t(this, ie)), e(this, s, h).call(this, document, "pointercancel", t(this, re)), e(this, s, h).call(this, document, "pointermove", t(this, ps)), e(this, s, h).call(this, document, "mousemove", t(this, ps)), e(this, s, h).call(this, document, "fullscreenchange", t(this, yt)), e(this, s, h).call(this, document, "webkitfullscreenchange", t(this, yt)), e(this, s, h).call(this, document, "mozfullscreenchange", t(this, yt)), e(this, s, h).call(this, document, "MSFullscreenChange", t(this, yt)), e(this, s, h).call(this, t(this, b), "fullscreenchange", t(this, yt)), e(this, s, h).call(this, window, "blur", t(this, oe)), e(this, s, h).call(this, window, "focus", t(this, ne)), e(this, s, h).call(this, t(this, o), "play", t(this, ae)), e(this, s, h).call(this, t(this, o), "pause", t(this, le)), e(this, s, h).call(this, t(this, o), "ended", t(this, he)), e(this, s, h).call(this, t(this, o), "loadstart", t(this, ce)), e(this, s, h).call(this, t(this, o), "waiting", t(this, Gt)), e(this, s, h).call(this, t(this, o), "stalled", t(this, Gt)), e(this, s, h).call(this, t(this, o), "seeking", t(this, Gt)), e(this, s, h).call(this, t(this, o), "loadeddata", t(this, It)), e(this, s, h).call(this, t(this, o), "loadedmetadata", t(this, ue)), e(this, s, h).call(this, t(this, o), "canplay", t(this, It)), e(this, s, h).call(this, t(this, o), "canplaythrough", t(this, It)), e(this, s, h).call(this, t(this, o), "playing", t(this, pe)), e(this, s, h).call(this, t(this, o), "seeked", t(this, de)), e(this, s, h).call(this, t(this, o), "error", t(this, me)), e(this, s, h).call(this, t(this, o), "progress", t(this, F)), e(this, s, h).call(this, t(this, o), "suspend", t(this, F)), e(this, s, h).call(this, t(this, o), "timeupdate", t(this, fe)), e(this, s, h).call(this, t(this, o), "volumechange", t(this, be)), e(this, s, h).call(this, t(this, o), "enterpictureinpicture", t(this, gt)), e(this, s, h).call(this, t(this, o), "leavepictureinpicture", t(this, gt));
}, h = function(i, a, l) {
  i.addEventListener(a, l), t(this, Nt).push(() => i.removeEventListener(a, l));
}, ws = function() {
  if (!(!this.src || t(this, q))) {
    if (t(this, V)?.disconnect(), t(this, o).dataset.src = this.src, "IntersectionObserver" in window) {
      r(this, V, new IntersectionObserver((i, a) => {
        i.some((l) => l.isIntersecting) && (a.disconnect(), r(this, V, null), e(this, s, ot).call(this));
      }, { rootMargin: this.preloadMargin })), t(this, V).observe(t(this, c));
      return;
    }
    e(this, s, ot).call(this);
  }
}, At = new WeakMap(), N = function() {
  t(this, ut) && (window.clearTimeout(t(this, ut)), r(this, ut, 0));
}, Us = new WeakMap(), xs = function(i = e(this, s, at).call(this) ? t(this, us) : t(this, Ot)) {
  e(this, s, N).call(this), r(this, ut, window.setTimeout(t(this, Us), i));
}, wt = function() {
  e(this, s, at).call(this) && e(this, s, xs).call(this, t(this, us));
}, Rt = function() {
  if (!e(this, s, at).call(this)) return !1;
  const i = t(this, c).classList.contains("is-controls-visible");
  return t(this, c).classList.add("is-controls-visible"), e(this, s, wt).call(this), !i;
}, ks = function(i = !1) {
  !i && e(this, s, at).call(this) || (t(this, c).classList.add("is-pointer-active"), t(this, j) ? e(this, s, N).call(this) : e(this, s, xs).call(this, i ? t(this, Ot) : void 0));
}, Jt = function() {
  r(this, j, !1), e(this, s, N).call(this), t(this, c).classList.remove("is-pointer-active");
}, Dt = function(i) {
  return i instanceof PointerEvent ? (r(this, Ft, i.pointerType === "touch"), t(this, Ft) ? !1 : (r(this, Wt, i.clientX), r(this, Yt, i.clientY), !0)) : i instanceof MouseEvent ? (r(this, Ft, !1), r(this, Wt, i.clientX), r(this, Yt, i.clientY), !0) : !1;
}, _e = function(i, a) {
  if (i === null || a === null || i < 0 || a < 0 || i > window.innerWidth || a > window.innerHeight) return !1;
  const l = this.getBoundingClientRect();
  return l.width <= 0 || l.height <= 0 ? !1 : i >= l.left && i <= l.right && a >= l.top && a <= l.bottom;
}, we = function() {
  if (!t(this, Ft) && e(this, s, _e).call(this, t(this, Wt), t(this, Yt))) {
    e(this, s, ks).call(this, !0);
    return;
  }
  e(this, s, Jt).call(this);
}, St = new WeakMap(), Mt = new WeakMap(), ps = new WeakMap(), Vt = new WeakMap(), it = new WeakMap(), rt = new WeakMap(), ds = new WeakMap(), xe = function() {
  t(this, pt) && (window.clearTimeout(t(this, pt)), r(this, pt, 0));
}, Qt = function() {
  t(this, Q) && (window.clearTimeout(t(this, Q)), r(this, Q, 0));
}, Ps = function() {
  t(this, tt) && (window.clearTimeout(t(this, tt)), r(this, tt, 0));
}, ke = function() {
  t(this, dt) && (window.clearTimeout(t(this, dt)), r(this, dt, 0));
}, Pe = function() {
  t(this, vt) && (window.clearTimeout(t(this, vt)), r(this, vt, 0));
}, Xe = function() {
  e(this, s, ke).call(this), t(this, c).classList.remove("is-button-animating"), t(this, I).offsetWidth, t(this, c).classList.add("is-button-animating"), r(this, dt, window.setTimeout(() => {
    r(this, dt, 0), t(this, c).classList.remove("is-button-animating");
  }, 260));
}, We = function() {
  e(this, s, Pe).call(this), t(this, c).classList.remove("is-volume-icon-animating"), t(this, x).offsetWidth, t(this, c).classList.add("is-volume-icon-animating"), r(this, vt, window.setTimeout(() => {
    r(this, vt, 0), t(this, c).classList.remove("is-volume-icon-animating");
  }, 240));
}, ms = new WeakMap(), Ye = function() {
  t(this, mt) || t(this, tt) || (t(this, c).classList.add("is-progress-settling"), e(this, s, nt).call(this, 0), r(this, tt, window.setTimeout(t(this, ms), t(this, zs))));
}, ot = async function() {
  if (t(this, q)) return;
  const i = t(this, o).dataset.src || this.src;
  i && (e(this, s, Qt).call(this), r(this, Xt, t(this, Xt) + 1), r(this, q, !0), r(this, z, !1), r(this, R, !1), r(this, X, !1), r(this, W, !1), r(this, Y, t(this, Y) + 1), t(this, c).classList.remove("has-visible-frame"), t(this, o).src = i, t(this, o).preload = "auto", t(this, o).load(), t(this, o).autoplay && t(this, o).muted && await t(this, o).play().catch(() => {
  }));
}, je = function(i) {
  if (!Number.isFinite(i) || i < 0) return "0:00";
  const a = Math.floor(i), l = a % 60, u = Math.floor(a / 60), p = u % 60, A = Math.floor(u / 60);
  return A > 0 ? `${A}:${String(p).padStart(2, "0")}:${String(l).padStart(2, "0")}` : `${p}:${String(l).padStart(2, "0")}`;
}, Ce = function() {
  return !t(this, o).loop || t(this, o).paused || !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0 ? !1 : t(this, o).currentTime < 0.28 || t(this, o).duration - t(this, o).currentTime < 0.28;
}, Ze = function(i = t(this, o).currentTime) {
  if (!Number.isFinite(i)) return 0;
  const a = Math.max(0, i);
  try {
    for (let l = 0; l < t(this, o).buffered.length; l += 1) {
      const u = t(this, o).buffered.start(l), p = t(this, o).buffered.end(l);
      if (a + t(this, Lt) >= u && a <= p + t(this, Lt))
        return Math.max(0, p - a);
    }
  } catch {
    return 0;
  }
  return 0;
}, Ee = function(i = t(this, Hs)) {
  if (!t(this, q) || t(this, o).error || !t(this, c).classList.contains("has-loaded-once") || !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) return !1;
  const a = Math.max(0, t(this, o).duration - t(this, o).currentTime), l = Math.min(i, a);
  return l <= t(this, Lt) || e(this, s, Ze).call(this) + t(this, Lt) >= l;
}, qt = function(i, a = !1) {
  e(this, s, xe).call(this);
  const l = i && !e(this, s, Ce).call(this) && !e(this, s, Ee).call(this), p = i && !t(this, R) || l;
  if (r(this, Et, p), !p) {
    t(this, c).classList.remove("is-loading");
    return;
  }
  if (a) {
    t(this, c).classList.add("is-loading");
    return;
  }
  r(this, pt, window.setTimeout(() => {
    if (r(this, pt, 0), !t(this, R) || !e(this, s, Ce).call(this) && !e(this, s, Ee).call(this)) {
      r(this, Et, !0), t(this, c).classList.add("is-loading");
      return;
    }
    r(this, Et, !1), t(this, c).classList.remove("is-loading");
  }, t(this, Is)));
}, F = new WeakMap(), Oe = function() {
  return t(this, q) && !t(this, o).error && t(this, z) && (t(this, o).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA || t(this, o).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !t(this, c).classList.contains("is-loading"));
}, U = function() {
  return t(this, S) || t(this, v) || t(this, H);
}, Ke = function() {
  t(this, Xt) >= t(this, qs) || t(this, Q) || r(this, Q, window.setTimeout(() => {
    r(this, Q, 0), r(this, q, !1), r(this, z, !1), r(this, R, !1), r(this, X, !1), r(this, W, !1), r(this, Y, t(this, Y) + 1), t(this, c).classList.remove("has-visible-frame"), t(this, c).classList.contains("has-loaded-once") || e(this, s, nt).call(this, 0), t(this, o).removeAttribute("src"), t(this, o).load(), e(this, s, ot).call(this);
  }, t(this, Ds)));
}, Te = function() {
  return t(this, H) ? (r(this, H, !1), r(this, ct, !1), e(this, s, w).call(this), e(this, s, M).call(this), !0) : !1;
}, Fe = function() {
  return e(this, s, Qt).call(this), !t(this, c).classList.contains("has-loaded-once") && e(this, s, Ye).call(this), t(this, c).classList.add("has-loaded-once"), t(this, c).classList.add("has-visible-frame"), t(this, F).call(this), r(this, E, null), t(this, H) ? (e(this, s, Te).call(this), !0) : (e(this, s, U).call(this) || e(this, s, w).call(this), e(this, s, M).call(this), !0);
}, Ge = function() {
  if (t(this, z) || t(this, X) || t(this, o).error) return;
  r(this, X, !0);
  const i = t(this, Y), a = () => {
    if (i === t(this, Y)) {
      if (r(this, X, !1), r(this, z, !t(this, o).error && t(this, o).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && t(this, o).videoWidth > 0 && t(this, o).videoHeight > 0), t(this, z)) {
        if (t(this, W) || t(this, R)) return;
        r(this, W, !0), window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            i === t(this, Y) && (r(this, W, !1), r(this, R, !0), e(this, s, Fe).call(this), e(this, s, C).call(this));
          });
        }), e(this, s, C).call(this);
        return;
      }
      t(this, F).call(this);
    }
  };
  if ("requestVideoFrameCallback" in t(this, o)) {
    t(this, o).requestVideoFrameCallback(a);
    return;
  }
  window.requestAnimationFrame(a);
}, It = new WeakMap(), Le = function() {
  return !t(this, o).paused && (!t(this, o).ended || t(this, o).loop) && t(this, o).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
}, w = function(i = t(this, o).currentTime) {
  r(this, hs, Number.isFinite(i) ? Math.max(0, i) : 0), r(this, cs, performance.now());
}, Z = function() {
  r(this, D, null), r(this, st, null);
}, Ae = function() {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) {
    r(this, D, null);
    return;
  }
  const i = Number.isFinite(t(this, o).currentTime) ? Math.max(0, t(this, o).currentTime) : 0, a = Number.isFinite(t(this, ft)) ? t(this, ft) : i;
  r(this, D, Math.min(t(this, o).duration, Math.max(i, a))), e(this, s, w).call(this, t(this, D));
}, Je = function() {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) {
    r(this, st, null), e(this, s, Ae).call(this);
    return;
  }
  const i = t(this, c).style.getPropertyValue("--sp-progress-inset"), a = Number.parseFloat(i), l = Number.isFinite(a) ? Math.min(1, Math.max(0, 1 - a / 100)) : null, u = e(this, s, ts).call(this), p = Math.min(1, Math.max(0, u / t(this, o).duration)), A = Math.max(l ?? 0, p);
  r(this, st, A), r(this, D, A * t(this, o).duration), e(this, s, w).call(this, t(this, D)), e(this, s, nt).call(this, A), t(this, d).setAttribute("aria-valuenow", `${t(this, D)}`);
}, ts = function() {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) return t(this, o).currentTime || 0;
  if (e(this, s, U).call(this)) return t(this, T);
  if (t(this, D) !== null) return t(this, D);
  if (!e(this, s, Le).call(this)) return t(this, o).currentTime || 0;
  if (t(this, Et) || !t(this, mt) || performance.now() < t(this, ls))
    return e(this, s, w).call(this), t(this, o).currentTime || 0;
  if (t(this, c).classList.contains("is-loading") && t(this, o).readyState < HTMLMediaElement.HAVE_FUTURE_DATA)
    return e(this, s, w).call(this), t(this, o).currentTime || 0;
  const i = (performance.now() - t(this, cs)) / 1e3, a = t(this, hs) + i, l = t(this, o).loop ? a % t(this, o).duration : Math.min(a, t(this, o).duration);
  return !t(this, o).loop && t(this, o).currentTime - l > 0.45 ? (e(this, s, w).call(this), t(this, o).currentTime) : l;
}, nt = function(i) {
  const a = Math.min(1, Math.max(0, i)), l = (1 - a) * 100, { innerWidth: u } = e(this, s, Cs).call(this), p = 1 / u, A = t(this, v) && t(this, Pt) && t(this, J) + p < a;
  if (t(this, c).style.setProperty("--sp-progress-inset", `${l}%`), t(this, c).style.setProperty("--sp-return-marker-base-opacity", A ? "0" : "1"), A) {
    const Re = e(this, s, ss).call(this, t(this, J)), De = Math.max(0, u - 2), ui = Math.min(De, Math.max(0, Re - 3));
    t(this, c).style.setProperty("--sp-return-marker-hole-left", `${ui}px`);
  } else
    t(this, c).style.setProperty("--sp-return-marker-hole-left", "-9999px");
}, Qe = function(i) {
  return !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0 ? 0 : Math.min(1, Math.max(0, i / t(this, o).duration));
}, Cs = function(i = t(this, d).getBoundingClientRect()) {
  const a = Math.min(2, Math.max(0, i.width / 2)), l = Math.max(1, i.width - a * 2);
  return { rect: i, sideInset: a, innerWidth: l };
}, ss = function(i, a = t(this, d).getBoundingClientRect()) {
  const { sideInset: l, innerWidth: u } = e(this, s, Cs).call(this, a), p = Math.min(1, Math.max(0, i));
  return l + p * u;
}, ti = function(i, a) {
  const { sideInset: l, innerWidth: u } = e(this, s, Cs).call(this, a);
  return Math.min(1, Math.max(0, (i - a.left - l) / u));
}, si = function(i) {
  r(this, kt, Number.isFinite(i) ? Math.max(0, i) : 0), r(this, J, e(this, s, Qe).call(this, t(this, kt)));
  const a = t(this, d).getBoundingClientRect(), l = e(this, s, ss).call(this, t(this, J), a), u = l >= t(this, Zt) && l <= Math.max(t(this, Zt), a.width - t(this, Zt));
  r(this, Pt, t(this, kt) > t(this, Ms) && u), t(this, c).classList.toggle("has-return-marker", t(this, Pt)), t(this, c).style.setProperty("--sp-return-marker-left", `${l}px`);
}, ei = function(i, a, l, u = t(this, v)) {
  const p = l * t(this, o).duration;
  if (!u || !t(this, Pt))
    return { percent: l, targetTime: p };
  const A = a.left + e(this, s, ss).call(this, t(this, J), a);
  return Math.abs(i - A) <= t(this, Ss) ? {
    percent: t(this, J),
    targetTime: t(this, kt)
  } : { percent: l, targetTime: p };
}, M = function(i = e(this, s, ts).call(this)) {
  const a = Number.isFinite(t(this, o).duration) && t(this, o).duration > 0;
  if (a && t(this, st) !== null) {
    const p = t(this, st) * t(this, o).duration;
    r(this, ft, p), e(this, s, nt).call(this, t(this, st)), t(this, d).setAttribute("aria-valuemin", "0"), t(this, d).setAttribute("aria-valuemax", `${t(this, o).duration}`), t(this, d).setAttribute("aria-valuenow", `${p}`);
    return;
  }
  const l = a ? Math.min(t(this, o).duration, Math.max(0, i)) : i, u = a ? l / t(this, o).duration : 0;
  r(this, ft, Number.isFinite(l) ? Math.max(0, l) : 0), e(this, s, nt).call(this, u), t(this, d).setAttribute("aria-valuemin", "0"), t(this, d).setAttribute("aria-valuemax", a ? `${t(this, o).duration}` : "0"), t(this, d).setAttribute("aria-valuenow", a ? `${l}` : "0");
}, es = function(i, a = t(this, v)) {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) return t(this, o).currentTime;
  const l = t(this, d).getBoundingClientRect(), u = e(this, s, ti).call(this, i, l), p = e(this, s, ei).call(this, i, l, u, a);
  return e(this, s, nt).call(this, p.percent), t(this, c).style.setProperty("--sp-scrub-preview-left", `${e(this, s, ss).call(this, p.percent, l)}px`), t(this, os).textContent = e(this, s, je).call(this, p.targetTime), t(this, d).setAttribute("aria-valuenow", `${p.targetTime}`), e(this, s, ii).call(this), p.targetTime;
}, is = function() {
  r(this, Tt, !1), t(this, c)?.classList.remove("has-controls-collision");
}, ii = function() {
  if (!t(this, v) || !t(this, $) || !t(this, $t)) {
    e(this, s, is).call(this);
    return;
  }
  const i = t(this, $).getBoundingClientRect(), a = t(this, $t).getBoundingClientRect(), l = i.width > 0 && i.height > 0, u = t(this, Tt) ? t(this, Ns) : t(this, Bs), p = l && a.right >= i.left - u && a.left <= i.right + u && a.bottom >= i.top - u && a.top <= i.bottom + u;
  r(this, Tt, p), t(this, c).classList.toggle("has-controls-collision", t(this, Tt));
}, Ht = function() {
  t(this, ht) && (window.cancelAnimationFrame(t(this, ht)), r(this, ht, 0));
}, ri = function() {
  e(this, s, Ht).call(this), e(this, s, w).call(this);
  const i = () => {
    e(this, s, M).call(this, e(this, s, ts).call(this)), e(this, s, Le).call(this) && r(this, ht, window.requestAnimationFrame(i));
  };
  r(this, ht, window.requestAnimationFrame(i));
}, C = function() {
  const i = !t(this, o).paused && (!t(this, o).ended || t(this, o).loop) || t(this, v) && t(this, G), a = t(this, E) ? t(this, E) === "playing" : i;
  if (t(this, c).classList.toggle("is-playing", a), t(this, I).setAttribute("aria-label", a ? "Pause video" : "Play video"), t(this, v)) {
    e(this, s, Ht).call(this);
    return;
  }
  i && t(this, c).classList.contains("has-loaded-once") && !t(this, c).classList.contains("is-progress-settling") ? e(this, s, ri).call(this) : (e(this, s, Ht).call(this), e(this, s, M).call(this));
}, xt = function() {
  t(this, Ct) && (window.clearTimeout(t(this, Ct)), r(this, Ct, 0));
}, oi = function() {
  const i = t(this, o);
  return i.audioTracks && typeof i.audioTracks.length == "number" ? i.audioTracks.length > 0 : typeof i.mozHasAudio == "boolean" ? i.mozHasAudio : typeof i.webkitAudioDecodedByteCount == "number" && t(this, o).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !t(this, o).muted && t(this, o).currentTime > 0.25 ? i.webkitAudioDecodedByteCount > 0 : t(this, k);
}, L = new WeakMap(), Se = function(i) {
  if (!t(this, k)) return;
  const a = t(this, P).getBoundingClientRect(), l = Math.min(1, Math.max(0, 1 - (i - a.top) / a.height)), u = Math.round(l * 100) / 100;
  t(this, o).volume = u, t(this, o).muted = u <= 0, t(this, L).call(this);
}, Es = function(i) {
  i !== null && t(this, P).hasPointerCapture(i) && t(this, P).releasePointerCapture(i);
}, Bt = function(i) {
  r(this, B, !1), r(this, g, null), t(this, _).classList.remove("is-scrubbing-volume"), t(this, P).blur(), e(this, s, Es).call(this, i), e(this, s, ze).call(this, 260);
}, gt = new WeakMap(), Ts = function() {
  const i = document;
  return t(this, b).fullscreenElement || i.fullscreenElement || i.webkitFullscreenElement || i.mozFullScreenElement || i.msFullscreenElement || null;
}, Me = function() {
  const i = document, a = t(this, c), l = t(this, o), p = !!((i.fullscreenEnabled ?? i.webkitFullscreenEnabled ?? i.mozFullScreenEnabled ?? i.msFullscreenEnabled ?? !1) && (a.requestFullscreen || a.webkitRequestFullscreen || a.mozRequestFullScreen || a.msRequestFullscreen)), A = !!(l.webkitSupportsFullscreen || l.webkitEnterFullscreen || l.webkitEnterFullScreen);
  return !!(this.fullscreenEnabled && (p || A));
}, ni = function() {
  const i = t(this, c), a = i.requestFullscreen || i.webkitRequestFullscreen || i.mozRequestFullScreen || i.msRequestFullscreen;
  return Promise.resolve(a?.call(i));
}, ai = function() {
  const i = t(this, o);
  (i.webkitEnterFullscreen || i.webkitEnterFullScreen)?.call(i);
}, li = function() {
  const i = document, a = i.exitFullscreen || i.webkitExitFullscreen || i.mozCancelFullScreen || i.msExitFullscreen;
  return Promise.resolve(a?.call(i));
}, zt = new WeakMap(), yt = new WeakMap(), hi = function(i) {
  e(this, s, N).call(this), e(this, s, rs).call(this), e(this, s, Fs).call(this, t(this, y)), e(this, s, Es).call(this, t(this, g)), e(this, s, xt).call(this), r(this, S, !1), r(this, v, !1), r(this, y, null), r(this, j, !1), r(this, et, !1), r(this, B, !1), r(this, g, null), t(this, lt).style.removeProperty("--sp-control-hover-offset"), t(this, x).classList.remove("is-volume-open"), t(this, _).classList.remove("is-scrubbing-volume"), t(this, c).classList.remove("is-scrubbing"), t(this, c).classList.remove("is-pointer-active");
  const a = t(this, b).activeElement;
  a instanceof HTMLElement && a.blur(), i ? e(this, s, we).call(this) : e(this, s, Jt).call(this);
}, fs = new WeakMap(), Fs = function(i) {
  i !== null && t(this, d).hasPointerCapture(i) && t(this, d).releasePointerCapture(i);
}, Ve = async function(i, a, l) {
  if (!t(this, S) && !t(this, v)) return;
  const u = t(this, v);
  e(this, s, xt).call(this), r(this, S, !1), r(this, v, !1), r(this, y, null), t(this, c).classList.remove("is-scrubbing"), e(this, s, is).call(this), e(this, s, Fs).call(this, a), l && i !== null && (e(this, s, Z).call(this), r(this, T, e(this, s, es).call(this, i, u)), r(this, H, !0), r(this, ct, t(this, G)), t(this, o).currentTime = t(this, T), e(this, s, w).call(this, t(this, T))), e(this, s, M).call(this, t(this, T)), u && t(this, G) && await t(this, o).play(), e(this, s, wt).call(this);
}, Ls = function(i) {
  !t(this, S) && !t(this, v) || (e(this, s, xt).call(this), r(this, S, !1), r(this, v, !1), r(this, y, null), t(this, c).classList.remove("is-scrubbing"), e(this, s, is).call(this), e(this, s, Fs).call(this, i), e(this, s, w).call(this), e(this, s, M).call(this), t(this, G) && t(this, o).play(), e(this, s, wt).call(this));
}, $s = new WeakMap(), _s = new WeakMap(), Xs = new WeakMap(), rs = function() {
  t(this, bt) && (window.clearTimeout(t(this, bt)), r(this, bt, 0));
}, Ie = function() {
  !this.volumeEnabled || !t(this, k) || (e(this, s, rs).call(this), t(this, x).classList.add("is-volume-open"));
}, Kt = new WeakMap(), ze = function(i = 150) {
  e(this, s, rs).call(this), r(this, bt, window.setTimeout(t(this, Kt), i));
}, bs = new WeakMap(), vs = new WeakMap(), Ws = new WeakMap(), Ys = new WeakMap(), js = new WeakMap(), Zs = new WeakMap(), Os = new WeakMap(), Ks = new WeakMap(), Gs = new WeakMap(), Js = new WeakMap(), Qs = new WeakMap(), te = new WeakMap(), se = new WeakMap(), ee = new WeakMap(), ie = new WeakMap(), re = new WeakMap(), oe = new WeakMap(), ne = new WeakMap(), ae = new WeakMap(), le = new WeakMap(), he = new WeakMap(), ce = new WeakMap(), Gt = new WeakMap(), ue = new WeakMap(), pe = new WeakMap(), de = new WeakMap(), me = new WeakMap(), fe = new WeakMap(), be = new WeakMap(), at = function() {
  return window.matchMedia("(max-width: 768px)").matches && window.matchMedia("(hover: none), (pointer: coarse)").matches;
}, ci = function() {
  t(this, o) && (t(this, V)?.disconnect(), r(this, V, null), e(this, s, Qt).call(this), e(this, s, Ps).call(this), r(this, q, !1), r(this, Xt, 0), r(this, z, !1), r(this, R, !1), r(this, X, !1), r(this, W, !1), r(this, Y, t(this, Y) + 1), r(this, mt, !1), r(this, ft, 0), e(this, s, Z).call(this), r(this, k, !0), r(this, H, !1), r(this, ct, !1), r(this, E, null), t(this, c).classList.remove("has-loaded-once", "has-visible-frame", "is-progress-settling"), t(this, o).dataset.src = this.src, t(this, o).pause(), t(this, o).removeAttribute("src"), t(this, o).preload = "none", t(this, o).load(), e(this, s, nt).call(this, 0), t(this, L).call(this), t(this, F).call(this), e(this, s, C).call(this));
}, He(Ue, "observedAttributes", [
  "src",
  "aspect-ratio",
  "preload-margin",
  "disable-volume",
  "disable-picture-in-picture",
  "disable-pip",
  "disable-fullscreen",
  "no-volume",
  "no-picture-in-picture",
  "no-pip",
  "no-fullscreen"
]);
customElements.get("simple-player") || customElements.define("simple-player", Ue);
export {
  Ue as SimplePlayer
};
//# sourceMappingURL=simple-player.js.map
