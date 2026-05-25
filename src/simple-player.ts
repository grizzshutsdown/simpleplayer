const DEFAULT_ASPECT_RATIO = '16 / 9';
const DEFAULT_PRELOAD_MARGIN = '360px 0px';

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitFullscreenEnabled?: boolean;
  webkitExitFullscreen?: () => Promise<void> | void;
  mozFullScreenElement?: Element | null;
  mozFullScreenEnabled?: boolean;
  mozCancelFullScreen?: () => Promise<void> | void;
  msFullscreenElement?: Element | null;
  msFullscreenEnabled?: boolean;
  msExitFullscreen?: () => Promise<void> | void;
};

type FullscreenPlayer = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  mozRequestFullScreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
};

type FullscreenVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitEnterFullScreen?: () => void;
  webkitSupportsFullscreen?: boolean;
  webkitDisplayingFullscreen?: boolean;
};

const styles = `
  :host {
    --simple-player-aspect-ratio: ${DEFAULT_ASPECT_RATIO};
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
`;

const template = document.createElement('template');
template.innerHTML = `
  <style>${styles}</style>
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

type Cleanup = () => void;
type PlaybackState = 'playing' | 'paused' | null;

export class SimplePlayer extends HTMLElement {
  static observedAttributes = [
    'src',
    'aspect-ratio',
    'preload-margin',
    'controls',
    'disable-autoplay',
    'enable-volume',
    'disable-volume',
    'disable-volume-slider',
    'enable-picture-in-picture',
    'enable-pip',
    'disable-picture-in-picture',
    'disable-pip',
    'enable-fullscreen',
    'disable-fullscreen',
    'no-autoplay',
    'no-volume',
    'no-volume-slider',
    'no-picture-in-picture',
    'no-pip',
    'no-fullscreen',
  ];

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
  #hasAudioTrack = true;
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

  get volumeEnabled() {
    return (
      (this.hasAttribute('controls') || this.hasAttribute('enable-volume')) &&
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
      (
        this.hasAttribute('controls') ||
        this.hasAttribute('enable-picture-in-picture') ||
        this.hasAttribute('enable-pip')
      ) &&
      !this.hasAttribute('disable-picture-in-picture') &&
      !this.hasAttribute('disable-pip') &&
      !this.hasAttribute('no-picture-in-picture') &&
      !this.hasAttribute('no-pip')
    );
  }

  set pictureInPictureEnabled(value: boolean) {
    this.#setOptionalControlAttributes('picture-in-picture', value);
  }

  get pipEnabled() {
    return this.pictureInPictureEnabled;
  }

  set pipEnabled(value: boolean) {
    this.pictureInPictureEnabled = value;
  }

  get fullscreenEnabled() {
    return (
      (this.hasAttribute('controls') || this.hasAttribute('enable-fullscreen')) &&
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

    if ((name.startsWith('disable-') || name.startsWith('no-')) && this.isConnected) {
      this.#syncOptionalControls();
      this.#syncAudioControlState();
      this.#syncPictureInPictureState();
      this.#syncFullscreenState();
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
      if (name === 'picture-in-picture') {
        this.setAttribute('enable-pip', '');
        this.removeAttribute('disable-pip');
        this.removeAttribute('no-pip');
      }
      return;
    }

    this.removeAttribute(`enable-${name}`);
    if (name === 'picture-in-picture') {
      this.removeAttribute('enable-pip');
    }
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

    const controls = [
      { button: this.#volumeControl, enabled: this.volumeEnabled, className: 'has-volume-control' },
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
    this.#player.classList.toggle('has-volume-slider-control', this.volumeEnabled && this.volumeSliderEnabled);

    if (!this.volumeEnabled || !this.volumeSliderEnabled) {
      this.#closeVolumePopover();
      this.#releaseVolumePointer(this.#activeVolumePointerId);
      this.#isVolumeScrubbing = false;
      this.#isVolumeHovering = false;
      this.#volumePopover.classList.remove('is-scrubbing-volume');
    }

    this.#controlTraySlots.style.removeProperty('--sp-control-hover-offset');
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
    for (const control of this.#controlButtons) {
      this.#listen(control, 'pointerenter', this.#handleControlButtonPointerEnter);
      this.#listen(control, 'mouseenter', this.#handleControlButtonPointerEnter);
      this.#listen(control, 'pointerdown', this.#handleControlButtonPointerDown);
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
      (button.disabled || (button === this.#volumeControl && (!this.volumeEnabled || !this.#hasAudioTrack)))
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
    this.#showPointerControls(true);
  };

  #handleDocumentPointerMove = (event: Event) => {
    if (!this.#trackPointerPosition(event)) return;
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
    if (this.#isUnavailableControlButton(target)) {
      this.#controlTraySlots.style.removeProperty('--sp-control-hover-offset');
      return;
    }

    const index = Number(target?.dataset.spControlIndex ?? 0);
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

  #formatVideoTime(time: number) {
    if (!Number.isFinite(time) || time < 0) return '0:00';

    const totalSeconds = Math.floor(time);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    return `${minutes}:${String(seconds).padStart(2, '0')}`;
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
      `${this.#formatVideoTime(this.#pausedVisualProgressTime)} of ${this.#formatVideoTime(this.#video.duration)}`,
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
    const sideInset = Math.min(2, Math.max(0, rect.width / 2));
    const innerWidth = Math.max(1, rect.width - (sideInset * 2));

    return { rect, sideInset, innerWidth };
  }

  #getProgressXFromPercent(percent: number, rect = this.#progressTrack.getBoundingClientRect()) {
    const { sideInset, innerWidth } = this.#getProgressMetrics(rect);
    const clampedPercent = Math.min(1, Math.max(0, percent));

    return sideInset + (clampedPercent * innerWidth);
  }

  #getProgressPercentFromClientX(clientX: number, rect: DOMRect) {
    const { sideInset, innerWidth } = this.#getProgressMetrics(rect);

    return Math.min(1, Math.max(0, (clientX - rect.left - sideInset) / innerWidth));
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
        `${this.#formatVideoTime(frozenTime)} of ${this.#formatVideoTime(this.#video.duration)}`,
      );
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
      hasDuration ? `${this.#formatVideoTime(renderedTime)} of ${this.#formatVideoTime(this.#video.duration)}` : 'Loading video',
    );
  }

  #previewSeekFromClientX(clientX: number, shouldSnap = this.#isScrubbing) {
    if (!Number.isFinite(this.#video.duration) || this.#video.duration <= 0) return this.#video.currentTime;

    const rect = this.#progressTrack.getBoundingClientRect();
    const percent = this.#getProgressPercentFromClientX(clientX, rect);
    const scrubPoint = this.#getScrubPoint(clientX, rect, percent, shouldSnap);

    this.#setProgressVisual(scrubPoint.percent);
    this.#player.style.setProperty('--sp-scrub-preview-left', `${this.#getProgressXFromPercent(scrubPoint.percent, rect)}px`);
    this.#scrubTimeText.textContent = this.#formatVideoTime(scrubPoint.targetTime);
    this.#progressTrack.setAttribute('aria-valuenow', `${scrubPoint.targetTime}`);
    this.#progressTrack.setAttribute(
      'aria-valuetext',
      `${this.#formatVideoTime(scrubPoint.targetTime)} of ${this.#formatVideoTime(this.#video.duration)}`,
    );
    this.#syncControlsCollision();
    return scrubPoint.targetTime;
  }

  #clearControlsCollision() {
    this.#hasControlsCollision = false;
    this.#player?.classList.remove('has-controls-collision');
  }

  #syncControlsCollision() {
    if (!this.#isScrubbing || !this.#controlTray || !this.#scrubTime) {
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
    const media = this.#video as HTMLVideoElement & {
      audioTracks?: { length: number };
      mozHasAudio?: boolean;
      webkitAudioDecodedByteCount?: number;
    };

    if (media.audioTracks && typeof media.audioTracks.length === 'number') {
      return media.audioTracks.length > 0;
    }

    if (typeof media.mozHasAudio === 'boolean') {
      return media.mozHasAudio;
    }

    if (
      typeof media.webkitAudioDecodedByteCount === 'number' &&
      this.#video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
      !this.#video.muted &&
      this.#video.currentTime > 0.25
    ) {
      return media.webkitAudioDecodedByteCount > 0;
    }

    return this.#hasAudioTrack;
  }

  #syncAudioControlState = () => {
    if (!this.volumeEnabled) {
      this.#player.classList.remove('is-volume-unavailable', 'is-volume-muted', 'is-volume-sound', 'is-volume-icon-animating');
      this.#volumeControl.disabled = true;
      this.#volumeControl.setAttribute('aria-disabled', 'true');
      return;
    }

    this.#hasAudioTrack = this.#detectAudioAvailability();
    const isMuted = !this.#hasAudioTrack || this.#video.muted || this.#video.volume <= 0;
    const visualVolume = this.#hasAudioTrack && !this.#video.muted ? this.#video.volume : 0;
    const volumePercent = Math.round(visualVolume * 100);
    const nextIconState = isMuted ? 'muted' : 'sound';

    if (this.#volumeIconState && this.#volumeIconState !== nextIconState) {
      this.#animateVolumeIconSwap();
    }

    this.#volumeIconState = nextIconState;

    this.#player.classList.toggle('is-volume-unavailable', !this.#hasAudioTrack);
    this.#player.classList.toggle('is-volume-muted', isMuted);
    this.#player.classList.toggle('is-volume-sound', !isMuted);
    this.#player.style.setProperty('--sp-volume-level', `${volumePercent}%`);
    this.#volumeControl.disabled = !this.#hasAudioTrack;
    this.#volumeControl.setAttribute('aria-disabled', `${!this.#hasAudioTrack}`);
    this.#volumeControl.setAttribute(
      'aria-label',
      !this.#hasAudioTrack ? 'Video has no audio' : isMuted ? 'Unmute video' : 'Mute video',
    );
    this.#volumeTrack.setAttribute('aria-valuenow', `${volumePercent}`);
    this.#volumeTrack.setAttribute('aria-valuetext', `${volumePercent}%`);
  };

  #setVolumeFromClientY(clientY: number) {
    if (!this.#hasAudioTrack) return;
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
    const fullscreenDocument = document as FullscreenDocument;
    return (
      this.#root.fullscreenElement ||
      fullscreenDocument.fullscreenElement ||
      fullscreenDocument.webkitFullscreenElement ||
      fullscreenDocument.mozFullScreenElement ||
      fullscreenDocument.msFullscreenElement ||
      null
    );
  }

  #isFullscreenSupported() {
    const fullscreenDocument = document as FullscreenDocument;
    const player = this.#player as FullscreenPlayer;
    const video = this.#video as FullscreenVideo;
    const isFullscreenEnabled =
      fullscreenDocument.fullscreenEnabled ??
      fullscreenDocument.webkitFullscreenEnabled ??
      fullscreenDocument.mozFullScreenEnabled ??
      fullscreenDocument.msFullscreenEnabled ??
      false;

    const canFullscreenPlayer = Boolean(
      isFullscreenEnabled &&
      (
        player.requestFullscreen ||
        player.webkitRequestFullscreen ||
        player.mozRequestFullScreen ||
        player.msRequestFullscreen
      )
    );
    const canFullscreenVideo = Boolean(video.webkitSupportsFullscreen || video.webkitEnterFullscreen || video.webkitEnterFullScreen);

    return Boolean(this.fullscreenEnabled && (canFullscreenPlayer || canFullscreenVideo));
  }

  #requestPlayerFullscreen() {
    const player = this.#player as FullscreenPlayer;
    const requestFullscreen =
      player.requestFullscreen ||
      player.webkitRequestFullscreen ||
      player.mozRequestFullScreen ||
      player.msRequestFullscreen;

    return Promise.resolve(requestFullscreen?.call(player));
  }

  #requestVideoFullscreen() {
    const video = this.#video as FullscreenVideo;
    const enterFullscreen = video.webkitEnterFullscreen || video.webkitEnterFullScreen;
    enterFullscreen?.call(video);
  }

  #exitFullscreen() {
    const fullscreenDocument = document as FullscreenDocument;
    const exitFullscreen =
      fullscreenDocument.exitFullscreen ||
      fullscreenDocument.webkitExitFullscreen ||
      fullscreenDocument.mozCancelFullScreen ||
      fullscreenDocument.msExitFullscreen;

    return Promise.resolve(exitFullscreen?.call(fullscreenDocument));
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
    if (!this.volumeEnabled || !this.volumeSliderEnabled || !this.#hasAudioTrack) return;
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
    if (this.#isTouchControls() || !this.volumeSliderEnabled || !this.#hasAudioTrack) return;
    this.#isVolumeHovering = true;
    this.#openVolumePopover();
  };

  #handleVolumePointerLeave = () => {
    if (this.#isTouchControls() || !this.volumeSliderEnabled || !this.#hasAudioTrack) return;
    this.#isVolumeHovering = false;
    this.#scheduleVolumePopoverClose();
  };

  #handleVolumeControlClick = (event: Event) => {
    if (!this.volumeEnabled || !this.#hasAudioTrack) return;
    event.preventDefault();
    event.stopPropagation();
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
    if (!this.volumeEnabled || !this.volumeSliderEnabled || !this.#hasAudioTrack || this.#isTouchControls()) return;
    event.preventDefault();
    event.stopPropagation();
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
    if (!(event instanceof KeyboardEvent) || !this.volumeEnabled || !this.#hasAudioTrack) return;
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
        const player = this.#player as FullscreenPlayer;
        if (
          typeof player.requestFullscreen === 'function' ||
          typeof player.webkitRequestFullscreen === 'function' ||
          typeof player.mozRequestFullScreen === 'function' ||
          typeof player.msRequestFullscreen === 'function'
        ) {
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
    if (!this.#isTrackingScrub) return;
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
    this.#hasAudioTrack = true;
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
    this.#hasAudioTrack = true;
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

if (!customElements.get('simple-player')) {
  customElements.define('simple-player', SimplePlayer);
}

declare global {
  interface HTMLElementTagNameMap {
    'simple-player': SimplePlayer;
  }
}
