---
name: simpleplayer
description: Use when building, installing, configuring, or troubleshooting the @grizzshutsdown/simpleplayer Web Component video player, including attribute/property setup, styling variables, and optional controls.
---

# SimplePlayer

SimplePlayer is a framework-free Web Component package. Import it once, then use `<simple-player>`.

```js
import '@grizzshutsdown/simpleplayer';
```

```html
<simple-player src="/video.mp4"></simple-player>
```

## Main Options

Attributes:

- `src`: video URL.
- `aspect-ratio`: CSS aspect ratio. Default: `16 / 9`.
- `preload-margin`: lazy-load margin. Default: `360px 0px`.
- `controls`: add a controls tray with volume, playback speed, Picture-in-Picture, and fullscreen buttons. The volume control automatically hides itself if the video has no audio track.
- `disable-autoplay`: turns off muted autoplay.
- `pause-on-overlay-click`: opt into toggling play/pause anywhere on the non-control video surface on desktop. Hidden-overlay clicks pulse only the center play/pause icon. Mobile behavior stays unchanged.
- `show-time`: dual-mode timestamp. With `controls`, shows a pinned glass timestamp tray in the bottom-left. Without `controls`, shows a hover tooltip above the scrubber while dragging or hovering. Clicking toggles between elapsed and remaining time. The tray automatically resizes to fit the text as the time changes during playback.
- `disable-volume`: removes the volume control.
- `disable-speed`: removes playback speed.
- `disable-picture-in-picture`: removes Picture-in-Picture.
- `disable-fullscreen`: removes fullscreen.

The vertical speed slider ranges from `0.25x` to `4x`, with `1x` centered. Drag upward to speed up or downward to slow down; a timestamp-styled live value appears above the slider while the speed changes, then fades away.

The scrubber shows a translucent hover fill that follows the cursor, previewing the seek position. Controls automatically hide after inactivity (1.6s on desktop, 1.2s on mobile) and reappear on movement. Entering fullscreen immediately displays the controls and temporarily disables hover states to prevent "sticky" hover issues on touch devices.

The player is fully keyboard accessible. `Tab` moves through its controls, arrow keys adjust sliders, `Home` and `End` jump to slider limits, and `Escape` closes an open volume or speed slider. When the player surface is focused, `Space`, `Enter`, and `K` toggle playback. Hardware media play/pause buttons use the browser Media Session API when available. Keyboard and media-button toggles pulse only the center play/pause icon without revealing the overlay.

JavaScript properties mirror each attribute:

```js
player.src = '/video.mp4';
player.aspectRatio = '1 / 1';
player.preloadMargin = '240px 0px';
player.autoplayEnabled = false;
player.pauseOnOverlayClick = true;
player.controlsEnabled = true;
player.timeVisible = true;
player.volumeEnabled = true;
player.volumeSliderEnabled = false;
player.speedEnabled = true;
player.pictureInPictureEnabled = false;
player.fullscreenEnabled = false;
```

## Styling

Set CSS variables on the element:

```css
simple-player {
  --overlay-soft: rgb(0 0 0 / 0.42);
  --overlay-blur: 0px;
  --sp-glass-surface: rgb(255 255 255 / 0.04);
  --sp-glass-opacity: 0.28;
  --sp-control-glass-surface: rgb(255 255 255 / 0.12);
  --sp-control-glass-opacity: 0.62;
  --sp-control-hover-surface: rgb(255 255 255 / 0.14);
  --sp-control-tray-padding: 2px;
  --sp-control-slot-size: 24px;
  --sp-control-icon-render-size: 20px;
  --sp-control-icon-stroke-width: 1.6;
}
```

Prefer configuring through attributes, properties, and CSS variables before editing the package source.
