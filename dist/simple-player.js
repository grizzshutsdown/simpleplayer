var Ki = Object.defineProperty;
var Ei = (m) => {
  throw TypeError(m);
};
var Gi = (m, f, e) => f in m ? Ki(m, f, { enumerable: !0, configurable: !0, writable: !0, value: e }) : m[f] = e;
var Li = (m, f, e) => Gi(m, typeof f != "symbol" ? f + "" : f, e), ni = (m, f, e) => f.has(m) || Ei("Cannot " + e);
var t = (m, f, e) => (ni(m, f, "read from private field"), e ? e.call(m) : f.get(m)), n = (m, f, e) => f.has(m) ? Ei("Cannot add the same private member more than once") : f instanceof WeakSet ? f.add(m) : f.set(m, e), r = (m, f, e, a) => (ni(m, f, "write to private field"), a ? a.call(m, e) : f.set(m, e), e), i = (m, f, e) => (ni(m, f, "access private method"), e);
const Ai = "16 / 9", Ji = "360px 0px", Qi = `
  :host {
    --simple-player-aspect-ratio: ${Ai};
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
  }

  .sp-player.is-pointer-active .sp-button,
  .sp-player.is-controls-visible .sp-button {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, -50%) scale(1);
  }

  .sp-player.is-button-animating .sp-button {
    animation: sp-button-release 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
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
    left: calc(var(--space) * 4);
    z-index: 4;
    display: block;
    width: calc(100% - (var(--space) * 8));
    height: 28px;
    --sp-progress-height: 4px;
    transform: translateX(0);
    transition:
      top 360ms cubic-bezier(0.23, 1, 0.32, 1),
      left 360ms cubic-bezier(0.23, 1, 0.32, 1),
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

  .sp-player.is-loading:not(.has-loaded-once) .sp-control-tray {
    opacity: 0;
    pointer-events: none;
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
`, Mi = document.createElement("template");
Mi.innerHTML = `
  <style>${Qi}</style>
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
var v, Vt, S, Ft, D, h, o, q, d, et, bt, It, Zt, k, Z, P, O, K, Ot, rt, b, V, G, E, gt, J, vt, H, ot, zt, yt, x, C, Rt, Q, nt, at, tt, lt, Kt, F, I, N, U, $, ht, Gt, xt, Jt, Qt, ct, z, st, wt, w, _, X, pt, y, ut, dt, Dt, fs, bs, Ht, gs, vs, ts, Bt, ys, xs, ws, ks, Ps, Ts, kt, Cs, Es, s, ns, as, ai, li, Vi, c, ls, Pt, Y, Ls, hs, Et, $t, cs, As, Ms, Ss, qt, Nt, Vs, hi, _t, ps, ci, pi, Fi, Ii, ss, zi, ft, Ri, ui, Di, di, Lt, L, Hi, B, Bi, mi, fi, qi, Tt, bi, g, j, gi, Ni, Xt, it, Ui, us, Yt, $i, _i, Xi, M, jt, Wt, Yi, At, ji, T, Mt, Wi, A, vi, yi, St, mt, Ct, is, xi, wi, ds, Fs, Is, zs, ms, ki, es, Pi, rs, os, Rs, Ds, Hs, Bs, qs, Ns, Us, $s, _s, Xs, Ys, js, Ws, Zs, Os, Ks, Gs, Js, Qs, Ut, ti, si, ii, ei, ri, oi, W, Zi;
class Si extends HTMLElement {
  constructor() {
    super();
    n(this, s);
    n(this, v);
    n(this, Vt, []);
    n(this, S, null);
    n(this, Ft, !1);
    n(this, D, !1);
    n(this, h);
    n(this, o);
    n(this, q);
    n(this, d);
    n(this, et);
    n(this, bt);
    n(this, It);
    n(this, Zt);
    n(this, k);
    n(this, Z);
    n(this, P);
    n(this, O);
    n(this, K);
    n(this, Ot, []);
    n(this, rt, 0);
    n(this, b, !1);
    n(this, V, !1);
    n(this, G, !1);
    n(this, E, 0);
    n(this, gt, 0);
    n(this, J, 0);
    n(this, vt, !1);
    n(this, H, !1);
    n(this, ot, !1);
    n(this, zt, 0);
    n(this, yt, 0);
    n(this, x, null);
    n(this, C, null);
    n(this, Rt, 0);
    n(this, Q, 0);
    n(this, nt, 0);
    n(this, at, 0);
    n(this, tt, 0);
    n(this, lt, 0);
    n(this, Kt, 0);
    n(this, F, !1);
    n(this, I, !1);
    n(this, N, !1);
    n(this, U, !1);
    n(this, $, 0);
    n(this, ht, !1);
    n(this, Gt, 0);
    n(this, xt, !0);
    n(this, Jt, 0);
    n(this, Qt, performance.now());
    n(this, ct, 0);
    n(this, z, null);
    n(this, st, null);
    n(this, wt, !1);
    n(this, w, !0);
    n(this, _, !1);
    n(this, X, !1);
    n(this, pt, !1);
    n(this, y, null);
    n(this, ut, 0);
    n(this, dt, 0);
    n(this, Dt, null);
    n(this, fs, 4);
    n(this, bs, 3.5);
    n(this, Ht, 6);
    n(this, gs, 0.08);
    n(this, vs, 240);
    n(this, ts, 1200);
    n(this, Bt, 1600);
    n(this, ys, 140);
    n(this, xs, 380);
    n(this, ws, 650);
    n(this, ks, 2e3);
    n(this, Ps, 3);
    n(this, Ts, 10);
    n(this, kt, 0.18);
    n(this, Cs, 8);
    n(this, Es, 18);
    n(this, Pt, (e) => {
      e.preventDefault();
    });
    n(this, Ls, () => {
      if (r(this, nt, 0), !(t(this, V) || t(this, b) || t(this, X))) {
        if (i(this, s, W).call(this)) {
          t(this, h).classList.remove("is-controls-visible");
          return;
        }
        t(this, _) || t(this, h).classList.remove("is-pointer-active");
      }
    });
    n(this, As, () => {
      i(this, s, cs).call(this);
    });
    n(this, Ms, () => {
      i(this, s, cs).call(this);
    });
    n(this, Ss, () => {
      i(this, s, W).call(this) || (r(this, _, !1), i(this, s, Y).call(this), t(this, h).classList.remove("is-pointer-active"));
    });
    n(this, qt, () => {
      i(this, s, W).call(this) || (r(this, _, !0), t(this, h).classList.add("is-pointer-active"), i(this, s, Y).call(this));
    });
    n(this, Nt, () => {
      i(this, s, W).call(this) || (r(this, _, !1), i(this, s, hs).call(this, t(this, Bt)));
    });
    n(this, Vs, (e) => {
      const a = e.currentTarget, l = Number(a?.dataset.spControlIndex ?? 0);
      t(this, bt).style.setProperty("--sp-control-hover-offset", `calc(var(--sp-control-slot-size) * ${l})`);
    });
    n(this, ss, () => {
      if (t(this, tt) || t(this, h).classList.contains("is-progress-settling")) {
        if (i(this, s, ps).call(this), t(this, ht)) {
          t(this, h).classList.remove("is-progress-settling");
          return;
        }
        r(this, ht, !0), r(this, Gt, performance.now() + t(this, ws)), i(this, s, B).call(this) || i(this, s, g).call(this), i(this, s, M).call(this), t(this, h).classList.remove("is-progress-settling"), i(this, s, T).call(this);
      }
    });
    n(this, L, () => {
      if (t(this, o).error) {
        i(this, s, Lt).call(this, !0, !0);
        return;
      }
      i(this, s, Lt).call(this, !t(this, D) || !t(this, I) || t(this, o).readyState < HTMLMediaElement.HAVE_FUTURE_DATA);
    });
    n(this, Tt, () => {
      if (t(this, o).error || t(this, o).readyState < HTMLMediaElement.HAVE_CURRENT_DATA || t(this, o).videoWidth <= 0 || t(this, o).videoHeight <= 0)
        return t(this, L).call(this), !1;
      if (!t(this, F))
        return i(this, s, qi).call(this), t(this, L).call(this), !1;
      const e = i(this, s, fi).call(this);
      return t(this, A).call(this), e;
    });
    n(this, A, () => {
      if (!this.volumeEnabled) {
        t(this, h).classList.remove("is-volume-unavailable", "is-volume-muted", "is-volume-sound", "is-volume-icon-animating"), t(this, k).disabled = !0;
        return;
      }
      r(this, w, i(this, s, Wi).call(this));
      const e = !t(this, w) || t(this, o).muted || t(this, o).volume <= 0, a = t(this, w) && !t(this, o).muted ? t(this, o).volume : 0, l = Math.round(a * 100), p = e ? "muted" : "sound";
      t(this, Dt) && t(this, Dt) !== p && i(this, s, Ii).call(this), r(this, Dt, p), t(this, h).classList.toggle("is-volume-unavailable", !t(this, w)), t(this, h).classList.toggle("is-volume-muted", e), t(this, h).classList.toggle("is-volume-sound", !e), t(this, h).style.setProperty("--sp-volume-level", `${l}%`), t(this, k).disabled = !t(this, w), t(this, k).setAttribute(
        "aria-label",
        t(this, w) ? e ? "Unmute video" : "Mute video" : "Video has no audio"
      ), t(this, P).setAttribute("aria-valuenow", `${l}`);
    });
    n(this, mt, () => {
      const e = document.pictureInPictureElement === t(this, o), a = t(this, o), l = !!(this.pictureInPictureEnabled && document.pictureInPictureEnabled && a.requestPictureInPicture);
      t(this, h).classList.toggle("is-picture-in-picture", e), t(this, O).disabled = !l, t(this, O).setAttribute("aria-label", e ? "Exit picture in picture" : "Enter picture in picture");
    });
    n(this, Ct, () => {
      const e = document.fullscreenElement === this || document.fullscreenElement === t(this, h), a = !!(this.fullscreenEnabled && document.fullscreenEnabled && this.requestFullscreen);
      t(this, h).classList.toggle("is-fullscreen", e), t(this, K).disabled = !a, t(this, K).setAttribute("aria-label", e ? "Exit fullscreen" : "Enter fullscreen"), r(this, _, !1), i(this, s, cs).call(this);
    });
    n(this, is, () => {
      !t(this, V) || t(this, b) || (i(this, s, j).call(this), i(this, s, Y).call(this), i(this, s, Mt).call(this), r(this, b, !0), t(this, h).classList.add("is-scrubbing"), r(this, E, i(this, s, jt).call(this, t(this, zt), !0)), t(this, G) && t(this, o).pause(), t(this, o).currentTime = t(this, E), i(this, s, g).call(this, t(this, E)), i(this, s, M).call(this, t(this, E)), i(this, s, At).call(this), i(this, s, T).call(this));
    });
    n(this, Fs, async () => {
      if (performance.now() < t(this, Kt))
        return;
      i(this, s, Fi).call(this);
      const e = t(this, C) ? t(this, C) !== "playing" : t(this, o).paused || t(this, o).ended, a = !e || i(this, s, Hi).call(this);
      i(this, s, $t).call(this), a && (r(this, C, e ? "playing" : "paused"), i(this, s, T).call(this)), e ? (i(this, s, j).call(this), await i(this, s, ft).call(this), await t(this, o).play().catch(() => {
        r(this, C, null);
      })) : (i(this, s, Ni).call(this), t(this, o).pause()), i(this, s, T).call(this), i(this, s, Et).call(this);
    });
    n(this, Is, (e) => {
      if (!(e instanceof PointerEvent)) return;
      const a = t(this, q).getBoundingClientRect(), l = e.clientX >= a.left && e.clientX <= a.right && e.clientY >= a.top && e.clientY <= a.bottom;
      i(this, s, $t).call(this) && l && r(this, Kt, performance.now() + 260), i(this, s, ft).call(this);
    });
    n(this, zs, (e) => {
      e.stopPropagation();
    });
    n(this, es, () => {
      r(this, ut, 0), !(t(this, pt) || t(this, X)) && t(this, k).classList.remove("is-volume-open");
    });
    n(this, rs, () => {
      r(this, pt, !0), i(this, s, ki).call(this);
    });
    n(this, os, () => {
      r(this, pt, !1), i(this, s, Pi).call(this);
    });
    n(this, Rs, () => {
      !this.volumeEnabled || !t(this, w) || (t(this, o).muted || t(this, o).volume <= 0 ? (t(this, o).volume <= 0 && (t(this, o).volume = 0.7), t(this, o).muted = !1) : t(this, o).muted = !0, t(this, A).call(this));
    });
    n(this, Ds, (e) => {
      e instanceof PointerEvent && (!this.volumeEnabled || !t(this, w) || (e.preventDefault(), e.stopPropagation(), i(this, s, $t).call(this), i(this, s, Y).call(this), i(this, s, ki).call(this), r(this, X, !0), r(this, y, e.pointerId), t(this, Z).classList.add("is-scrubbing-volume"), t(this, P).setPointerCapture(e.pointerId), i(this, s, vi).call(this, e.clientY)));
    });
    n(this, Hs, (e) => {
      e instanceof PointerEvent && t(this, X) && (t(this, y) !== null && e.pointerId !== t(this, y) || (e.preventDefault(), e.stopPropagation(), i(this, s, vi).call(this, e.clientY)));
    });
    n(this, Bs, (e) => {
      e instanceof PointerEvent && (t(this, y) !== null && e.pointerId !== t(this, y) || (e.stopPropagation(), i(this, s, St).call(this, e.pointerId), i(this, s, Et).call(this)));
    });
    n(this, qs, (e) => {
      e instanceof PointerEvent && (t(this, y) !== null && e.pointerId !== t(this, y) || (e.stopPropagation(), i(this, s, St).call(this, e.pointerId)));
    });
    n(this, Ns, (e) => {
      if (!(e instanceof KeyboardEvent) || !this.volumeEnabled || !t(this, w) || !["ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) return;
      e.preventDefault(), e.stopPropagation();
      const a = e.shiftKey ? 0.1 : 0.05, l = e.key === "Home" ? 0 : e.key === "End" ? 1 : t(this, o).volume + (e.key === "ArrowUp" ? a : -a);
      t(this, o).volume = Math.min(1, Math.max(0, l)), t(this, o).muted = t(this, o).volume <= 0, t(this, A).call(this);
    });
    n(this, Us, async () => {
      const e = t(this, o);
      if (!(!this.pictureInPictureEnabled || !document.pictureInPictureEnabled || !e.requestPictureInPicture))
        try {
          await i(this, s, ft).call(this), document.pictureInPictureElement === t(this, o) ? await document.exitPictureInPicture() : await e.requestPictureInPicture();
        } catch {
        } finally {
          t(this, mt).call(this);
        }
    });
    n(this, $s, async () => {
      if (!(!this.fullscreenEnabled || !document.fullscreenEnabled || !this.requestFullscreen))
        try {
          document.fullscreenElement === this || document.fullscreenElement === t(this, h) ? await document.exitFullscreen() : await this.requestFullscreen();
        } catch {
        } finally {
          t(this, Ct).call(this);
        }
    });
    n(this, _s, (e) => {
      e instanceof PointerEvent && (e.preventDefault(), i(this, s, $t).call(this), i(this, s, Y).call(this), t(this, ss).call(this), r(this, H, !1), r(this, ot, !1), i(this, s, _i).call(this, i(this, s, Xt).call(this)), r(this, V, !0), r(this, x, e.pointerId), r(this, zt, e.clientX), r(this, G, !t(this, o).paused && !t(this, o).ended), t(this, d).setPointerCapture(e.pointerId), r(this, E, i(this, s, jt).call(this, e.clientX, !1)), i(this, s, Mt).call(this), r(this, yt, window.setTimeout(t(this, is), t(this, vs))));
    });
    n(this, Xs, (e) => {
      e instanceof PointerEvent && t(this, V) && (t(this, x) !== null && e.pointerId !== t(this, x) || (!t(this, b) && Math.abs(e.clientX - t(this, zt)) >= t(this, fs) && t(this, is).call(this), t(this, b) && r(this, E, i(this, s, jt).call(this, e.clientX))));
    });
    n(this, Ys, (e) => {
      e instanceof PointerEvent && (t(this, x) !== null && e.pointerId !== t(this, x) || i(this, s, wi).call(this, e.clientX, e.pointerId, !0));
    });
    n(this, js, (e) => {
      e instanceof PointerEvent && (t(this, x) !== null && e.pointerId !== t(this, x) || i(this, s, ds).call(this, e.pointerId));
    });
    n(this, Ws, (e) => {
      if (e instanceof PointerEvent) {
        if (t(this, y) !== null && e.pointerId === t(this, y)) {
          i(this, s, St).call(this, e.pointerId);
          return;
        }
        t(this, x) === null || e.pointerId !== t(this, x) || i(this, s, wi).call(this, e.clientX, e.pointerId, !0);
      }
    });
    n(this, Zs, (e) => {
      if (e instanceof PointerEvent) {
        if (t(this, y) !== null && e.pointerId === t(this, y)) {
          i(this, s, St).call(this, e.pointerId);
          return;
        }
        t(this, x) === null || e.pointerId !== t(this, x) || i(this, s, ds).call(this, e.pointerId);
      }
    });
    n(this, Os, () => {
      i(this, s, St).call(this, t(this, y)), i(this, s, ds).call(this, t(this, x));
    });
    n(this, Ks, () => {
      r(this, C, null), i(this, s, j).call(this), i(this, s, B).call(this) || i(this, s, g).call(this), i(this, s, T).call(this);
    });
    n(this, Gs, () => {
      r(this, C, null), i(this, s, B).call(this) || i(this, s, gi).call(this), t(this, L).call(this), i(this, s, T).call(this);
    });
    n(this, Js, () => {
      r(this, C, null), i(this, s, j).call(this), i(this, s, B).call(this) || i(this, s, g).call(this), i(this, s, T).call(this);
    });
    n(this, Qs, () => {
      i(this, s, Lt).call(this, !0, !0);
    });
    n(this, Ut, () => {
      i(this, s, Lt).call(this, !0);
    });
    n(this, ti, () => {
      i(this, s, j).call(this), r(this, w, !0), t(this, A).call(this), i(this, s, B).call(this) || i(this, s, g).call(this), t(this, L).call(this), i(this, s, M).call(this);
    });
    n(this, si, () => {
      const e = t(this, Tt).call(this);
      t(this, A).call(this), e && !i(this, s, B).call(this) && i(this, s, g).call(this), i(this, s, T).call(this);
    });
    n(this, ii, () => {
      if (i(this, s, j).call(this), t(this, L).call(this), t(this, H) && (!t(this, ot) || t(this, o).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA)) {
        i(this, s, mi).call(this), i(this, s, T).call(this);
        return;
      }
      i(this, s, B).call(this) || i(this, s, g).call(this), i(this, s, M).call(this);
    });
    n(this, ei, () => {
      r(this, C, null), r(this, F, !1), r(this, I, !1), r(this, N, !1), r(this, U, !1), r(this, $, t(this, $) + 1), t(this, h).classList.remove("has-visible-frame"), i(this, s, Lt).call(this, !0, !0), i(this, s, T).call(this), i(this, s, Bi).call(this);
    });
    n(this, ri, () => {
      t(this, A).call(this), i(this, s, M).call(this);
    });
    n(this, oi, () => {
      t(this, A).call(this);
    });
    r(this, v, this.attachShadow({ mode: "open" })), t(this, v).append(Mi.content.cloneNode(!0));
  }
  get src() {
    return this.getAttribute("src") ?? "";
  }
  set src(e) {
    i(this, s, ns).call(this, "src", e);
  }
  get aspectRatio() {
    return this.getAttribute("aspect-ratio") || Ai;
  }
  set aspectRatio(e) {
    i(this, s, ns).call(this, "aspect-ratio", e);
  }
  get preloadMargin() {
    return this.getAttribute("preload-margin") || Ji;
  }
  set preloadMargin(e) {
    i(this, s, ns).call(this, "preload-margin", e);
  }
  get volumeEnabled() {
    return !this.hasAttribute("disable-volume") && !this.hasAttribute("no-volume");
  }
  set volumeEnabled(e) {
    i(this, s, as).call(this, "volume", e);
  }
  get pictureInPictureEnabled() {
    return !this.hasAttribute("disable-picture-in-picture") && !this.hasAttribute("disable-pip") && !this.hasAttribute("no-picture-in-picture") && !this.hasAttribute("no-pip");
  }
  set pictureInPictureEnabled(e) {
    i(this, s, as).call(this, "picture-in-picture", e);
  }
  get pipEnabled() {
    return this.pictureInPictureEnabled;
  }
  set pipEnabled(e) {
    this.pictureInPictureEnabled = e;
  }
  get fullscreenEnabled() {
    return !this.hasAttribute("disable-fullscreen") && !this.hasAttribute("no-fullscreen");
  }
  set fullscreenEnabled(e) {
    i(this, s, as).call(this, "fullscreen", e);
  }
  connectedCallback() {
    r(this, h, t(this, v).querySelector("[data-sp-player]")), r(this, o, t(this, v).querySelector("[data-sp-video]")), r(this, q, t(this, v).querySelector("[data-sp-button]")), r(this, d, t(this, v).querySelector("[data-sp-progress-track]")), r(this, et, t(this, v).querySelector("[data-sp-control-tray]")), r(this, bt, t(this, v).querySelector("[data-sp-control-tray-slots]")), r(this, It, t(this, v).querySelector("[data-sp-time]")), r(this, Zt, t(this, v).querySelector("[data-sp-time-text]")), r(this, k, t(this, v).querySelector("[data-sp-volume-control]")), r(this, Z, t(this, v).querySelector("[data-sp-volume-popover]")), r(this, P, t(this, v).querySelector("[data-sp-volume-track]")), r(this, O, t(this, v).querySelector("[data-sp-picture-in-picture-control]")), r(this, K, t(this, v).querySelector("[data-sp-fullscreen-control]")), r(this, Ot, [t(this, k), t(this, O), t(this, K)]), i(this, s, ai).call(this), t(this, Ft) || (i(this, s, Vi).call(this), r(this, Ft, !0)), i(this, s, ls).call(this), i(this, s, li).call(this), t(this, L).call(this), t(this, A).call(this), t(this, mt).call(this), t(this, Ct).call(this), i(this, s, T).call(this);
  }
  disconnectedCallback() {
    t(this, S)?.disconnect(), r(this, S, null), t(this, Vt).forEach((e) => e()), r(this, Vt, []), r(this, Ft, !1), i(this, s, Y).call(this), i(this, s, hi).call(this), i(this, s, _t).call(this), i(this, s, ps).call(this), i(this, s, Mt).call(this), i(this, s, ci).call(this), i(this, s, ms).call(this), i(this, s, pi).call(this), t(this, h).classList.remove("is-button-animating"), t(this, h).classList.remove("is-volume-icon-animating"), t(this, bt).style.removeProperty("--sp-control-hover-offset"), i(this, s, Wt).call(this), r(this, X, !1), r(this, pt, !1), r(this, _, !1), r(this, y, null), t(this, k).classList.remove("is-volume-open"), t(this, h).classList.remove("is-pointer-active"), i(this, s, At).call(this);
  }
  attributeChangedCallback(e, a, l) {
    if (a !== l) {
      if (e === "aspect-ratio") {
        i(this, s, ai).call(this);
        return;
      }
      if (e === "preload-margin" && this.isConnected) {
        t(this, S)?.disconnect(), i(this, s, ls).call(this);
        return;
      }
      if (e === "src" && this.isConnected) {
        i(this, s, Zi).call(this), i(this, s, ls).call(this);
        return;
      }
      (e.startsWith("disable-") || e.startsWith("no-")) && this.isConnected && (i(this, s, li).call(this), t(this, A).call(this), t(this, mt).call(this), t(this, Ct).call(this));
    }
  }
}
v = new WeakMap(), Vt = new WeakMap(), S = new WeakMap(), Ft = new WeakMap(), D = new WeakMap(), h = new WeakMap(), o = new WeakMap(), q = new WeakMap(), d = new WeakMap(), et = new WeakMap(), bt = new WeakMap(), It = new WeakMap(), Zt = new WeakMap(), k = new WeakMap(), Z = new WeakMap(), P = new WeakMap(), O = new WeakMap(), K = new WeakMap(), Ot = new WeakMap(), rt = new WeakMap(), b = new WeakMap(), V = new WeakMap(), G = new WeakMap(), E = new WeakMap(), gt = new WeakMap(), J = new WeakMap(), vt = new WeakMap(), H = new WeakMap(), ot = new WeakMap(), zt = new WeakMap(), yt = new WeakMap(), x = new WeakMap(), C = new WeakMap(), Rt = new WeakMap(), Q = new WeakMap(), nt = new WeakMap(), at = new WeakMap(), tt = new WeakMap(), lt = new WeakMap(), Kt = new WeakMap(), F = new WeakMap(), I = new WeakMap(), N = new WeakMap(), U = new WeakMap(), $ = new WeakMap(), ht = new WeakMap(), Gt = new WeakMap(), xt = new WeakMap(), Jt = new WeakMap(), Qt = new WeakMap(), ct = new WeakMap(), z = new WeakMap(), st = new WeakMap(), wt = new WeakMap(), w = new WeakMap(), _ = new WeakMap(), X = new WeakMap(), pt = new WeakMap(), y = new WeakMap(), ut = new WeakMap(), dt = new WeakMap(), Dt = new WeakMap(), fs = new WeakMap(), bs = new WeakMap(), Ht = new WeakMap(), gs = new WeakMap(), vs = new WeakMap(), ts = new WeakMap(), Bt = new WeakMap(), ys = new WeakMap(), xs = new WeakMap(), ws = new WeakMap(), ks = new WeakMap(), Ps = new WeakMap(), Ts = new WeakMap(), kt = new WeakMap(), Cs = new WeakMap(), Es = new WeakMap(), s = new WeakSet(), ns = function(e, a) {
  if (a === "") {
    this.removeAttribute(e);
    return;
  }
  this.setAttribute(e, a);
}, as = function(e, a) {
  if (a) {
    this.removeAttribute(`disable-${e}`), this.removeAttribute(`no-${e}`), e === "picture-in-picture" && (this.removeAttribute("disable-pip"), this.removeAttribute("no-pip"));
    return;
  }
  this.setAttribute(`disable-${e}`, "");
}, ai = function() {
  this.style.setProperty("--simple-player-aspect-ratio", this.aspectRatio);
}, li = function() {
  if (!t(this, h)) return;
  const e = [
    { button: t(this, k), enabled: this.volumeEnabled, className: "has-volume-control" },
    { button: t(this, O), enabled: this.pictureInPictureEnabled, className: "has-picture-in-picture-control" },
    { button: t(this, K), enabled: this.fullscreenEnabled, className: "has-fullscreen-control" }
  ];
  let a = 0;
  for (const l of e)
    t(this, h).classList.toggle(l.className, l.enabled), l.button.hidden = !l.enabled, l.enabled ? (l.button.dataset.spControlIndex = `${a}`, a += 1) : delete l.button.dataset.spControlIndex;
  this.style.setProperty("--sp-enabled-controls-count", `${a}`), this.style.setProperty("--sp-control-tray-display", a > 0 ? "block" : "none"), this.volumeEnabled || (t(this, es).call(this), i(this, s, yi).call(this, t(this, y)), r(this, X, !1), r(this, pt, !1), t(this, Z).classList.remove("is-scrubbing-volume")), t(this, bt).style.removeProperty("--sp-control-hover-offset");
}, Vi = function() {
  i(this, s, c).call(this, t(this, q), "click", t(this, Fs)), i(this, s, c).call(this, t(this, h), "pointerenter", t(this, As)), i(this, s, c).call(this, t(this, h), "pointermove", t(this, Ms)), i(this, s, c).call(this, t(this, h), "pointerleave", t(this, Ss)), i(this, s, c).call(this, t(this, q), "pointerenter", t(this, qt)), i(this, s, c).call(this, t(this, q), "pointerleave", t(this, Nt)), i(this, s, c).call(this, t(this, d), "pointerenter", t(this, qt)), i(this, s, c).call(this, t(this, d), "pointerleave", t(this, Nt)), i(this, s, c).call(this, t(this, et), "pointerenter", t(this, qt)), i(this, s, c).call(this, t(this, et), "pointerleave", t(this, Nt)), i(this, s, c).call(this, t(this, h), "pointerdown", t(this, Is)), i(this, s, c).call(this, t(this, h), "dragstart", t(this, Pt)), i(this, s, c).call(this, t(this, h), "selectstart", t(this, Pt)), i(this, s, c).call(this, t(this, o), "dragstart", t(this, Pt)), i(this, s, c).call(this, t(this, o), "selectstart", t(this, Pt)), i(this, s, c).call(this, t(this, d), "pointerdown", t(this, _s)), i(this, s, c).call(this, t(this, d), "pointermove", t(this, Xs)), i(this, s, c).call(this, t(this, d), "pointerup", t(this, Ys)), i(this, s, c).call(this, t(this, d), "pointercancel", t(this, js)), i(this, s, c).call(this, t(this, k), "pointerenter", t(this, rs)), i(this, s, c).call(this, t(this, k), "pointerleave", t(this, os)), i(this, s, c).call(this, t(this, k), "click", t(this, Rs)), i(this, s, c).call(this, t(this, Z), "pointerenter", t(this, rs)), i(this, s, c).call(this, t(this, Z), "pointerleave", t(this, os)), i(this, s, c).call(this, t(this, P), "pointerdown", t(this, Ds)), i(this, s, c).call(this, t(this, P), "pointermove", t(this, Hs)), i(this, s, c).call(this, t(this, P), "pointerup", t(this, Bs)), i(this, s, c).call(this, t(this, P), "pointercancel", t(this, qs)), i(this, s, c).call(this, t(this, P), "click", t(this, zs)), i(this, s, c).call(this, t(this, P), "keydown", t(this, Ns)), i(this, s, c).call(this, t(this, O), "click", t(this, Us)), i(this, s, c).call(this, t(this, K), "click", t(this, $s));
  for (const e of t(this, Ot))
    i(this, s, c).call(this, e, "pointerenter", t(this, Vs));
  i(this, s, c).call(this, document, "pointerup", t(this, Ws)), i(this, s, c).call(this, document, "pointercancel", t(this, Zs)), i(this, s, c).call(this, document, "fullscreenchange", t(this, Ct)), i(this, s, c).call(this, window, "blur", t(this, Os)), i(this, s, c).call(this, t(this, o), "play", t(this, Ks)), i(this, s, c).call(this, t(this, o), "pause", t(this, Gs)), i(this, s, c).call(this, t(this, o), "ended", t(this, Js)), i(this, s, c).call(this, t(this, o), "loadstart", t(this, Qs)), i(this, s, c).call(this, t(this, o), "waiting", t(this, Ut)), i(this, s, c).call(this, t(this, o), "stalled", t(this, Ut)), i(this, s, c).call(this, t(this, o), "seeking", t(this, Ut)), i(this, s, c).call(this, t(this, o), "loadeddata", t(this, Tt)), i(this, s, c).call(this, t(this, o), "loadedmetadata", t(this, ti)), i(this, s, c).call(this, t(this, o), "canplay", t(this, Tt)), i(this, s, c).call(this, t(this, o), "canplaythrough", t(this, Tt)), i(this, s, c).call(this, t(this, o), "playing", t(this, si)), i(this, s, c).call(this, t(this, o), "seeked", t(this, ii)), i(this, s, c).call(this, t(this, o), "error", t(this, ei)), i(this, s, c).call(this, t(this, o), "progress", t(this, L)), i(this, s, c).call(this, t(this, o), "suspend", t(this, L)), i(this, s, c).call(this, t(this, o), "timeupdate", t(this, ri)), i(this, s, c).call(this, t(this, o), "volumechange", t(this, oi)), i(this, s, c).call(this, t(this, o), "enterpictureinpicture", t(this, mt)), i(this, s, c).call(this, t(this, o), "leavepictureinpicture", t(this, mt));
}, c = function(e, a, l) {
  e.addEventListener(a, l), t(this, Vt).push(() => e.removeEventListener(a, l));
}, ls = function() {
  if (!(!this.src || t(this, D))) {
    if (t(this, S)?.disconnect(), t(this, o).dataset.src = this.src, "IntersectionObserver" in window) {
      r(this, S, new IntersectionObserver((e, a) => {
        e.some((l) => l.isIntersecting) && (a.disconnect(), r(this, S, null), i(this, s, ft).call(this));
      }, { rootMargin: this.preloadMargin })), t(this, S).observe(t(this, h));
      return;
    }
    i(this, s, ft).call(this);
  }
}, Pt = new WeakMap(), Y = function() {
  t(this, nt) && (window.clearTimeout(t(this, nt)), r(this, nt, 0));
}, Ls = new WeakMap(), hs = function(e = i(this, s, W).call(this) ? t(this, ts) : t(this, Bt)) {
  i(this, s, Y).call(this), r(this, nt, window.setTimeout(t(this, Ls), e));
}, Et = function() {
  i(this, s, W).call(this) && i(this, s, hs).call(this, t(this, ts));
}, $t = function() {
  if (!i(this, s, W).call(this)) return !1;
  const e = t(this, h).classList.contains("is-controls-visible");
  return t(this, h).classList.add("is-controls-visible"), i(this, s, Et).call(this), !e;
}, cs = function() {
  i(this, s, W).call(this) || (t(this, h).classList.add("is-pointer-active"), t(this, _) ? i(this, s, Y).call(this) : i(this, s, hs).call(this, t(this, Bt)));
}, As = new WeakMap(), Ms = new WeakMap(), Ss = new WeakMap(), qt = new WeakMap(), Nt = new WeakMap(), Vs = new WeakMap(), hi = function() {
  t(this, at) && (window.clearTimeout(t(this, at)), r(this, at, 0));
}, _t = function() {
  t(this, Q) && (window.clearTimeout(t(this, Q)), r(this, Q, 0));
}, ps = function() {
  t(this, tt) && (window.clearTimeout(t(this, tt)), r(this, tt, 0));
}, ci = function() {
  t(this, lt) && (window.clearTimeout(t(this, lt)), r(this, lt, 0));
}, pi = function() {
  t(this, dt) && (window.clearTimeout(t(this, dt)), r(this, dt, 0));
}, Fi = function() {
  i(this, s, ci).call(this), t(this, h).classList.remove("is-button-animating"), t(this, q).offsetWidth, t(this, h).classList.add("is-button-animating"), r(this, lt, window.setTimeout(() => {
    r(this, lt, 0), t(this, h).classList.remove("is-button-animating");
  }, 260));
}, Ii = function() {
  i(this, s, pi).call(this), t(this, h).classList.remove("is-volume-icon-animating"), t(this, k).offsetWidth, t(this, h).classList.add("is-volume-icon-animating"), r(this, dt, window.setTimeout(() => {
    r(this, dt, 0), t(this, h).classList.remove("is-volume-icon-animating");
  }, 240));
}, ss = new WeakMap(), zi = function() {
  t(this, ht) || t(this, tt) || (t(this, h).classList.add("is-progress-settling"), i(this, s, it).call(this, 0), r(this, tt, window.setTimeout(t(this, ss), t(this, xs))));
}, ft = async function() {
  if (t(this, D)) return;
  const e = t(this, o).dataset.src || this.src;
  e && (i(this, s, _t).call(this), r(this, Rt, t(this, Rt) + 1), r(this, D, !0), r(this, F, !1), r(this, I, !1), r(this, N, !1), r(this, U, !1), r(this, $, t(this, $) + 1), t(this, h).classList.remove("has-visible-frame"), t(this, o).src = e, t(this, o).preload = "auto", t(this, o).load(), t(this, o).autoplay && t(this, o).muted && await t(this, o).play().catch(() => {
  }));
}, Ri = function(e) {
  if (!Number.isFinite(e) || e < 0) return "0:00";
  const a = Math.floor(e), l = a % 60, p = Math.floor(a / 60), u = p % 60, R = Math.floor(p / 60);
  return R > 0 ? `${R}:${String(u).padStart(2, "0")}:${String(l).padStart(2, "0")}` : `${u}:${String(l).padStart(2, "0")}`;
}, ui = function() {
  return !t(this, o).loop || t(this, o).paused || !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0 ? !1 : t(this, o).currentTime < 0.28 || t(this, o).duration - t(this, o).currentTime < 0.28;
}, Di = function(e = t(this, o).currentTime) {
  if (!Number.isFinite(e)) return 0;
  const a = Math.max(0, e);
  try {
    for (let l = 0; l < t(this, o).buffered.length; l += 1) {
      const p = t(this, o).buffered.start(l), u = t(this, o).buffered.end(l);
      if (a + t(this, kt) >= p && a <= u + t(this, kt))
        return Math.max(0, u - a);
    }
  } catch {
    return 0;
  }
  return 0;
}, di = function(e = t(this, Ts)) {
  if (!t(this, D) || t(this, o).error || !t(this, h).classList.contains("has-loaded-once") || !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) return !1;
  const a = Math.max(0, t(this, o).duration - t(this, o).currentTime), l = Math.min(e, a);
  return l <= t(this, kt) || i(this, s, Di).call(this) + t(this, kt) >= l;
}, Lt = function(e, a = !1) {
  i(this, s, hi).call(this);
  const l = e && !i(this, s, ui).call(this) && !i(this, s, di).call(this), u = e && !t(this, I) || l;
  if (r(this, xt, u), !u) {
    t(this, h).classList.remove("is-loading");
    return;
  }
  if (a) {
    t(this, h).classList.add("is-loading");
    return;
  }
  r(this, at, window.setTimeout(() => {
    if (r(this, at, 0), !t(this, I) || !i(this, s, ui).call(this) && !i(this, s, di).call(this)) {
      r(this, xt, !0), t(this, h).classList.add("is-loading");
      return;
    }
    r(this, xt, !1), t(this, h).classList.remove("is-loading");
  }, t(this, ys)));
}, L = new WeakMap(), Hi = function() {
  return t(this, D) && !t(this, o).error && t(this, F) && (t(this, o).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA || t(this, o).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !t(this, h).classList.contains("is-loading"));
}, B = function() {
  return t(this, V) || t(this, b) || t(this, H);
}, Bi = function() {
  t(this, Rt) >= t(this, Ps) || t(this, Q) || r(this, Q, window.setTimeout(() => {
    r(this, Q, 0), r(this, D, !1), r(this, F, !1), r(this, I, !1), r(this, N, !1), r(this, U, !1), r(this, $, t(this, $) + 1), t(this, h).classList.remove("has-visible-frame"), t(this, h).classList.contains("has-loaded-once") || i(this, s, it).call(this, 0), t(this, o).removeAttribute("src"), t(this, o).load(), i(this, s, ft).call(this);
  }, t(this, ks)));
}, mi = function() {
  return t(this, H) ? (r(this, H, !1), r(this, ot, !1), i(this, s, g).call(this), i(this, s, M).call(this), !0) : !1;
}, fi = function() {
  return i(this, s, _t).call(this), !t(this, h).classList.contains("has-loaded-once") && i(this, s, zi).call(this), t(this, h).classList.add("has-loaded-once"), t(this, h).classList.add("has-visible-frame"), t(this, L).call(this), r(this, C, null), t(this, H) ? (i(this, s, mi).call(this), !0) : (i(this, s, B).call(this) || i(this, s, g).call(this), i(this, s, M).call(this), !0);
}, qi = function() {
  if (t(this, F) || t(this, N) || t(this, o).error) return;
  r(this, N, !0);
  const e = t(this, $), a = () => {
    if (e === t(this, $)) {
      if (r(this, N, !1), r(this, F, !t(this, o).error && t(this, o).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && t(this, o).videoWidth > 0 && t(this, o).videoHeight > 0), t(this, F)) {
        if (t(this, U) || t(this, I)) return;
        r(this, U, !0), window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            e === t(this, $) && (r(this, U, !1), r(this, I, !0), i(this, s, fi).call(this), i(this, s, T).call(this));
          });
        }), i(this, s, T).call(this);
        return;
      }
      t(this, L).call(this);
    }
  };
  if ("requestVideoFrameCallback" in t(this, o)) {
    t(this, o).requestVideoFrameCallback(a);
    return;
  }
  window.requestAnimationFrame(a);
}, Tt = new WeakMap(), bi = function() {
  return !t(this, o).paused && (!t(this, o).ended || t(this, o).loop) && t(this, o).readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
}, g = function(e = t(this, o).currentTime) {
  r(this, Jt, Number.isFinite(e) ? Math.max(0, e) : 0), r(this, Qt, performance.now());
}, j = function() {
  r(this, z, null), r(this, st, null);
}, gi = function() {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) {
    r(this, z, null);
    return;
  }
  const e = Number.isFinite(t(this, o).currentTime) ? Math.max(0, t(this, o).currentTime) : 0, a = Number.isFinite(t(this, ct)) ? t(this, ct) : e;
  r(this, z, Math.min(t(this, o).duration, Math.max(e, a))), i(this, s, g).call(this, t(this, z));
}, Ni = function() {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) {
    r(this, st, null), i(this, s, gi).call(this);
    return;
  }
  const e = t(this, h).style.getPropertyValue("--sp-progress-inset"), a = Number.parseFloat(e), l = Number.isFinite(a) ? Math.min(1, Math.max(0, 1 - a / 100)) : null, p = i(this, s, Xt).call(this), u = Math.min(1, Math.max(0, p / t(this, o).duration)), R = Math.max(l ?? 0, u);
  r(this, st, R), r(this, z, R * t(this, o).duration), i(this, s, g).call(this, t(this, z)), i(this, s, it).call(this, R), t(this, d).setAttribute("aria-valuenow", `${t(this, z)}`);
}, Xt = function() {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) return t(this, o).currentTime || 0;
  if (i(this, s, B).call(this)) return t(this, E);
  if (t(this, z) !== null) return t(this, z);
  if (!i(this, s, bi).call(this)) return t(this, o).currentTime || 0;
  if (t(this, xt) || !t(this, ht) || performance.now() < t(this, Gt))
    return i(this, s, g).call(this), t(this, o).currentTime || 0;
  if (t(this, h).classList.contains("is-loading") && t(this, o).readyState < HTMLMediaElement.HAVE_FUTURE_DATA)
    return i(this, s, g).call(this), t(this, o).currentTime || 0;
  const e = (performance.now() - t(this, Qt)) / 1e3, a = t(this, Jt) + e, l = t(this, o).loop ? a % t(this, o).duration : Math.min(a, t(this, o).duration);
  return !t(this, o).loop && t(this, o).currentTime - l > 0.45 ? (i(this, s, g).call(this), t(this, o).currentTime) : l;
}, it = function(e) {
  const a = Math.min(1, Math.max(0, e)), l = (1 - a) * 100, { innerWidth: p } = i(this, s, us).call(this), u = 1 / p, R = t(this, b) && t(this, vt) && t(this, J) + u < a;
  if (t(this, h).style.setProperty("--sp-progress-inset", `${l}%`), t(this, h).style.setProperty("--sp-return-marker-base-opacity", R ? "0" : "1"), R) {
    const Ti = i(this, s, Yt).call(this, t(this, J)), Ci = Math.max(0, p - 2), Oi = Math.min(Ci, Math.max(0, Ti - 3));
    t(this, h).style.setProperty("--sp-return-marker-hole-left", `${Oi}px`);
  } else
    t(this, h).style.setProperty("--sp-return-marker-hole-left", "-9999px");
}, Ui = function(e) {
  return !Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0 ? 0 : Math.min(1, Math.max(0, e / t(this, o).duration));
}, us = function(e = t(this, d).getBoundingClientRect()) {
  const a = Math.min(2, Math.max(0, e.width / 2)), l = Math.max(1, e.width - a * 2);
  return { rect: e, sideInset: a, innerWidth: l };
}, Yt = function(e, a = t(this, d).getBoundingClientRect()) {
  const { sideInset: l, innerWidth: p } = i(this, s, us).call(this, a), u = Math.min(1, Math.max(0, e));
  return l + u * p;
}, $i = function(e, a) {
  const { sideInset: l, innerWidth: p } = i(this, s, us).call(this, a);
  return Math.min(1, Math.max(0, (e - a.left - l) / p));
}, _i = function(e) {
  r(this, gt, Number.isFinite(e) ? Math.max(0, e) : 0), r(this, J, i(this, s, Ui).call(this, t(this, gt)));
  const a = t(this, d).getBoundingClientRect(), l = i(this, s, Yt).call(this, t(this, J), a), p = l >= t(this, Ht) && l <= Math.max(t(this, Ht), a.width - t(this, Ht));
  r(this, vt, t(this, gt) > t(this, gs) && p), t(this, h).classList.toggle("has-return-marker", t(this, vt)), t(this, h).style.setProperty("--sp-return-marker-left", `${l}px`);
}, Xi = function(e, a, l, p = t(this, b)) {
  const u = l * t(this, o).duration;
  if (!p || !t(this, vt))
    return { percent: l, targetTime: u };
  const R = a.left + i(this, s, Yt).call(this, t(this, J), a);
  return Math.abs(e - R) <= t(this, bs) ? {
    percent: t(this, J),
    targetTime: t(this, gt)
  } : { percent: l, targetTime: u };
}, M = function(e = i(this, s, Xt).call(this)) {
  const a = Number.isFinite(t(this, o).duration) && t(this, o).duration > 0;
  if (a && t(this, st) !== null) {
    const u = t(this, st) * t(this, o).duration;
    r(this, ct, u), i(this, s, it).call(this, t(this, st)), t(this, d).setAttribute("aria-valuemin", "0"), t(this, d).setAttribute("aria-valuemax", `${t(this, o).duration}`), t(this, d).setAttribute("aria-valuenow", `${u}`);
    return;
  }
  const l = a ? Math.min(t(this, o).duration, Math.max(0, e)) : e, p = a ? l / t(this, o).duration : 0;
  r(this, ct, Number.isFinite(l) ? Math.max(0, l) : 0), i(this, s, it).call(this, p), t(this, d).setAttribute("aria-valuemin", "0"), t(this, d).setAttribute("aria-valuemax", a ? `${t(this, o).duration}` : "0"), t(this, d).setAttribute("aria-valuenow", a ? `${l}` : "0");
}, jt = function(e, a = t(this, b)) {
  if (!Number.isFinite(t(this, o).duration) || t(this, o).duration <= 0) return t(this, o).currentTime;
  const l = t(this, d).getBoundingClientRect(), p = i(this, s, $i).call(this, e, l), u = i(this, s, Xi).call(this, e, l, p, a);
  return i(this, s, it).call(this, u.percent), t(this, h).style.setProperty("--sp-scrub-preview-left", `${i(this, s, Yt).call(this, u.percent, l)}px`), t(this, Zt).textContent = i(this, s, Ri).call(this, u.targetTime), t(this, d).setAttribute("aria-valuenow", `${u.targetTime}`), i(this, s, Yi).call(this), u.targetTime;
}, Wt = function() {
  r(this, wt, !1), t(this, h)?.classList.remove("has-controls-collision");
}, Yi = function() {
  if (!t(this, b) || !t(this, et) || !t(this, It)) {
    i(this, s, Wt).call(this);
    return;
  }
  const e = t(this, et).getBoundingClientRect(), a = t(this, It).getBoundingClientRect(), l = e.width > 0 && e.height > 0, p = t(this, wt) ? t(this, Es) : t(this, Cs), u = l && a.right >= e.left - p && a.left <= e.right + p && a.bottom >= e.top - p && a.top <= e.bottom + p;
  r(this, wt, u), t(this, h).classList.toggle("has-controls-collision", t(this, wt));
}, At = function() {
  t(this, rt) && (window.cancelAnimationFrame(t(this, rt)), r(this, rt, 0));
}, ji = function() {
  i(this, s, At).call(this), i(this, s, g).call(this);
  const e = () => {
    i(this, s, M).call(this, i(this, s, Xt).call(this)), i(this, s, bi).call(this) && r(this, rt, window.requestAnimationFrame(e));
  };
  r(this, rt, window.requestAnimationFrame(e));
}, T = function() {
  const e = !t(this, o).paused && (!t(this, o).ended || t(this, o).loop) || t(this, b) && t(this, G), a = t(this, C) ? t(this, C) === "playing" : e;
  if (t(this, h).classList.toggle("is-playing", a), t(this, q).setAttribute("aria-label", a ? "Pause video" : "Play video"), t(this, b)) {
    i(this, s, At).call(this);
    return;
  }
  e && t(this, h).classList.contains("has-loaded-once") && !t(this, h).classList.contains("is-progress-settling") ? i(this, s, ji).call(this) : (i(this, s, At).call(this), i(this, s, M).call(this));
}, Mt = function() {
  t(this, yt) && (window.clearTimeout(t(this, yt)), r(this, yt, 0));
}, Wi = function() {
  const e = t(this, o);
  return e.audioTracks && typeof e.audioTracks.length == "number" ? e.audioTracks.length > 0 : typeof e.mozHasAudio == "boolean" ? e.mozHasAudio : typeof e.webkitAudioDecodedByteCount == "number" && t(this, o).readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !t(this, o).muted && t(this, o).currentTime > 0.25 ? e.webkitAudioDecodedByteCount > 0 : t(this, w);
}, A = new WeakMap(), vi = function(e) {
  if (!t(this, w)) return;
  const a = t(this, P).getBoundingClientRect(), l = Math.min(1, Math.max(0, 1 - (e - a.top) / a.height)), p = Math.round(l * 100) / 100;
  t(this, o).volume = p, t(this, o).muted = p <= 0, t(this, A).call(this);
}, yi = function(e) {
  e !== null && t(this, P).hasPointerCapture(e) && t(this, P).releasePointerCapture(e);
}, St = function(e) {
  r(this, X, !1), r(this, y, null), t(this, Z).classList.remove("is-scrubbing-volume"), t(this, P).blur(), i(this, s, yi).call(this, e), i(this, s, Pi).call(this, 260);
}, mt = new WeakMap(), Ct = new WeakMap(), is = new WeakMap(), xi = function(e) {
  e !== null && t(this, d).hasPointerCapture(e) && t(this, d).releasePointerCapture(e);
}, wi = async function(e, a, l) {
  if (!t(this, V) && !t(this, b)) return;
  const p = t(this, b);
  i(this, s, Mt).call(this), r(this, V, !1), r(this, b, !1), r(this, x, null), t(this, h).classList.remove("is-scrubbing"), i(this, s, Wt).call(this), i(this, s, xi).call(this, a), l && e !== null && (i(this, s, j).call(this), r(this, E, i(this, s, jt).call(this, e, p)), r(this, H, !0), r(this, ot, t(this, G)), t(this, o).currentTime = t(this, E), i(this, s, g).call(this, t(this, E))), i(this, s, M).call(this, t(this, E)), p && t(this, G) && await t(this, o).play(), i(this, s, Et).call(this);
}, ds = function(e) {
  !t(this, V) && !t(this, b) || (i(this, s, Mt).call(this), r(this, V, !1), r(this, b, !1), r(this, x, null), t(this, h).classList.remove("is-scrubbing"), i(this, s, Wt).call(this), i(this, s, xi).call(this, e), i(this, s, g).call(this), i(this, s, M).call(this), t(this, G) && t(this, o).play(), i(this, s, Et).call(this));
}, Fs = new WeakMap(), Is = new WeakMap(), zs = new WeakMap(), ms = function() {
  t(this, ut) && (window.clearTimeout(t(this, ut)), r(this, ut, 0));
}, ki = function() {
  !this.volumeEnabled || !t(this, w) || (i(this, s, ms).call(this), t(this, k).classList.add("is-volume-open"));
}, es = new WeakMap(), Pi = function(e = 150) {
  i(this, s, ms).call(this), r(this, ut, window.setTimeout(t(this, es), e));
}, rs = new WeakMap(), os = new WeakMap(), Rs = new WeakMap(), Ds = new WeakMap(), Hs = new WeakMap(), Bs = new WeakMap(), qs = new WeakMap(), Ns = new WeakMap(), Us = new WeakMap(), $s = new WeakMap(), _s = new WeakMap(), Xs = new WeakMap(), Ys = new WeakMap(), js = new WeakMap(), Ws = new WeakMap(), Zs = new WeakMap(), Os = new WeakMap(), Ks = new WeakMap(), Gs = new WeakMap(), Js = new WeakMap(), Qs = new WeakMap(), Ut = new WeakMap(), ti = new WeakMap(), si = new WeakMap(), ii = new WeakMap(), ei = new WeakMap(), ri = new WeakMap(), oi = new WeakMap(), W = function() {
  return window.matchMedia("(max-width: 768px)").matches && window.matchMedia("(hover: none), (pointer: coarse)").matches;
}, Zi = function() {
  t(this, o) && (t(this, S)?.disconnect(), r(this, S, null), i(this, s, _t).call(this), i(this, s, ps).call(this), r(this, D, !1), r(this, Rt, 0), r(this, F, !1), r(this, I, !1), r(this, N, !1), r(this, U, !1), r(this, $, t(this, $) + 1), r(this, ht, !1), r(this, ct, 0), i(this, s, j).call(this), r(this, w, !0), r(this, H, !1), r(this, ot, !1), r(this, C, null), t(this, h).classList.remove("has-loaded-once", "has-visible-frame", "is-progress-settling"), t(this, o).dataset.src = this.src, t(this, o).pause(), t(this, o).removeAttribute("src"), t(this, o).preload = "none", t(this, o).load(), i(this, s, it).call(this, 0), t(this, A).call(this), t(this, L).call(this), i(this, s, T).call(this));
}, Li(Si, "observedAttributes", [
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
customElements.get("simple-player") || customElements.define("simple-player", Si);
export {
  Si as SimplePlayer
};
//# sourceMappingURL=simple-player.js.map
