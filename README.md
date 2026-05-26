# SimplePlayer

A simple default video player created from [Grizz's portfolio](https://grizz.fyi) for others to use.

SimplePlayer is a framework-free Web Component. It gives you a clean default video player with custom overlay controls, a scrubber, volume, Picture-in-Picture, fullscreen, and lazy loading.

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

Add the extra control tray when you want volume, Picture-in-Picture, and fullscreen:

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
        'disable-autoplay'?: boolean;
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
- `controls`: add a controls tray with volume, Picture-in-Picture, and fullscreen buttons. The volume control automatically disables itself if the video has no audio track.
- `disable-autoplay`: turn off default autoplay. Autoplay starts muted so browsers allow it.
- `show-time`: dual-mode timestamp. When used with `controls`, shows a pinned glass timestamp tray in the bottom-left alongside the controls tray. When used without `controls`, shows a hover tooltip above the scrubber as you drag or hover it. Clicking the timestamp toggles between elapsed and remaining time.

The default player matches the simple preview: play/pause, scrubber, muted autoplay, and no extra side controls.

Keep the HTML clean and manage controls with JavaScript:

```js
const player = document.querySelector('simple-player');

player.src = '/next-video.mp4';
player.aspectRatio = '1 / 1';
player.preloadMargin = '240px 0px';
player.autoplayEnabled = false;
player.controlsEnabled = true;
player.timeVisible = true;
player.volumeEnabled = true;
player.volumeSliderEnabled = false;
player.pictureInPictureEnabled = true;
player.fullscreenEnabled = true;
```

## Contributing

```bash
npm install
npm run dev
```

The dev playground lives in `dev/` and imports `src/simple-player.ts` directly. Use it when changing the player itself.

The hosted demo is separate from the package source. It has its own consumer install in `site/`, then imports the published package the same way a user would:

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
