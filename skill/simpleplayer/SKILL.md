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

- `src`: video URL.
- `aspect-ratio`: CSS aspect ratio. Default: `16 / 9`.
- `preload-margin`: lazy-load margin. Default: `360px 0px`.
- `disable-volume`: removes the volume control.
- `disable-picture-in-picture`: removes Picture-in-Picture.
- `disable-fullscreen`: removes fullscreen.

JavaScript properties:

```js
player.src = '/video.mp4';
player.aspectRatio = '1 / 1';
player.preloadMargin = '240px 0px';
player.volumeEnabled = false;
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
