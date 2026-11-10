# SimplePlayer

A simple default video player created from [Grizz's portfolio](https://grizz.fyi) for others to use.

SimplePlayer is a framework-free Web Component. It gives you a clean default video player with custom overlay controls, a scrubber, volume, playback speed, Picture-in-Picture, fullscreen, and lazy loading.

Demo: [simpleplayer.grizz.fyi](https://simpleplayer.grizz.fyi/)

## Installation

```bash
npm install @grizzshutsdown/simpleplayer
pnpm add @grizzshutsdown/simpleplayer
yarn add @grizzshutsdown/simpleplayer
bun add @grizzshutsdown/simpleplayer
```

## Usage

```js
import '@grizzshutsdown/simpleplayer';
```

```html
<simple-player src="/video.mp4"></simple-player>
```

Add the extra control tray when you want volume, playback speed, Picture-in-Picture, and fullscreen:

```html
<simple-player src="/video.mp4" controls></simple-player>
```

## Frameworks

React:

```jsx
import '@grizzshutsdown/simpleplayer';

export function App() {
  return <simple-player src="/video.mp4" aspect-ratio="16 / 9" />;
}
```

Vue:

```vue
<script setup>
import '@grizzshutsdown/simpleplayer';
</script>

<template>
  <simple-player src="/video.mp4" aspect-ratio="16 / 9" />
</template>
```

Svelte:

```svelte
<script>
  import '@grizzshutsdown/simpleplayer';
</script>

<simple-player src="/video.mp4" aspect-ratio="16 / 9" />
```

TypeScript with React:

```ts
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'simple-player': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        'aspect-ratio'?: string;
        'preload-margin'?: string;
        controls?: boolean;
        'disable-speed'?: boolean;
        'disable-autoplay'?: boolean;
        'pause-on-overlay-click'?: boolean;
        'show-time'?: boolean;
      };
    }
  }
}
```

## Options

```html
<simple-player
  src="/video.mp4"
  aspect-ratio="16 / 9"
  preload-margin="360px 0px">
</simple-player>
```

- `src`: video URL.
- `aspect-ratio`: player aspect ratio. Default: `16 / 9`.
- `preload-margin`: lazy-load margin before the video enters view. Default: `360px 0px`.
- `controls`: add a controls tray with volume, playback speed, Picture-in-Picture, and fullscreen buttons. The volume control automatically hides itself if the video has no audio track.
- `disable-speed`: remove the playback speed control from the controls tray.
- `disable-autoplay`: turn off default autoplay. Autoplay starts muted so browsers allow it.
- `pause-on-overlay-click`: opt into toggling play/pause anywhere on the non-control video surface on desktop. Hidden-overlay clicks pulse only the center play/pause icon. Mobile behavior stays unchanged.
- `show-time`: dual-mode timestamp. When used with `controls`, shows a pinned glass timestamp tray in the bottom-left alongside the controls tray. When used without `controls`, shows a hover tooltip above the scrubber as you drag or hover it. Clicking the timestamp toggles between elapsed and remaining time. The tray automatically resizes to fit the text as the time changes during playback.

The vertical speed slider ranges from `0.25x` to `4x`, with normal `1x` playback centered. Drag upward to speed up or downward to slow down. A timestamp-styled live value appears above the slider while the speed changes, then fades away.

The default player matches the simple preview: play/pause, scrubber, muted autoplay, and no extra side controls. Hovering over the scrubber shows a translucent fill that follows the cursor, previewing the seek position. The controls and overlay automatically fade out after a brief period of inactivity (both windowed and fullscreen) and reappear instantly on movement or touch.

The complete player is keyboard accessible. Use `Tab` to move through playback, progress, timestamp, volume, speed, Picture-in-Picture, and fullscreen controls. Arrow keys adjust sliders, `Home` and `End` jump to their limits, and `Escape` closes an open volume or speed slider. When the player surface is focused, `Space`, `Enter`, and `K` toggle playback. Hardware media play/pause buttons use the browser Media Session API when available. Keyboard and media-button toggles pulse only the center play/pause icon without revealing the overlay.

Keep the HTML clean and manage controls with JavaScript:

```js
const player = document.querySelector('simple-player');

player.src = '/next-video.mp4';
player.aspectRatio = '1 / 1';
player.preloadMargin = '240px 0px';
player.autoplayEnabled = false;
player.pauseOnOverlayClick = true;
player.controlsEnabled = true;
player.timeVisible = true;
player.volumeEnabled = true;
player.volumeSliderEnabled = false;
player.speedEnabled = true;
player.pictureInPictureEnabled = true;
player.fullscreenEnabled = true;
```

## Contributing

```bash
npm install
npm run dev
```

The dev playground lives in `dev/` and imports `src/simple-player.ts` directly. Use it when changing the player itself.

The hosted demo is separate from the package source. It has its own consumer install in `site/`, then imports the locally built package artifact so deploys always match the current checkout:

```bash
npm install --prefix site
npm run demo
```

Cloudflare Pages uses:

```bash
npm run build
```

with `site-dist` as the output directory.

Before opening a pull request, run:

```bash
npm run build
npm pack --dry-run
```

## Styling

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
  --sp-time-font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

## AI Skill

The package includes a plain Markdown skill that any AI tool can read.

```bash
npx @grizzshutsdown/simpleplayer
```

## Found this useful?

Follow [Grizz](https://x.com/GrizzShutsDown).

## License

MIT
