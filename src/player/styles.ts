import { DEFAULT_ASPECT_RATIO } from './constants';

export const styles: string = `
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
  .sp-player.is-controls-visible .sp-button {
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
`;
