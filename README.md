# SimplePlayer

A framework-free video player Web Component.

## Install

```bash
npm install @grizzshutsdown/simpleplayer
pnpm add @grizzshutsdown/simpleplayer
yarn add @grizzshutsdown/simpleplayer
bun add @grizzshutsdown/simpleplayer
```

## Use

Import it once:

```js
import '@grizzshutsdown/simpleplayer';
```

Add the element:

```html
<simple-player src="/video.mp4"></simple-player>
```

## Examples

### React

Import the package in your app entry or component:

```jsx
import '@grizzshutsdown/simpleplayer';

export function App() {
  return <simple-player src="/video.mp4" aspect-ratio="16 / 9" />;
}
```

### TypeScript

If TypeScript does not know the custom element, add a declaration file like `simple-player.d.ts`:

```ts
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'simple-player': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        'aspect-ratio'?: string;
        'preload-margin'?: string;
        'disable-volume'?: boolean;
        'disable-picture-in-picture'?: boolean;
        'disable-fullscreen'?: boolean;
      };
    }
  }
}
```

### Vue

```vue
<script setup>
import '@grizzshutsdown/simpleplayer';
</script>

<template>
  <simple-player src="/video.mp4" aspect-ratio="16 / 9" />
</template>
```

### Svelte

```svelte
<script>
  import '@grizzshutsdown/simpleplayer';
</script>

<simple-player src="/video.mp4" aspect-ratio="16 / 9" />
```

## Options

```html
<simple-player
  src="/video.mp4"
  aspect-ratio="16 / 9"
  preload-margin="360px 0px">
</simple-player>
```

Attributes:

- `src`: video URL.
- `aspect-ratio`: player aspect ratio. Default: `16 / 9`.
- `preload-margin`: lazy-load margin before the video enters view. Default: `360px 0px`.
- `disable-volume`: remove the volume control.
- `disable-picture-in-picture`: remove the Picture-in-Picture control.
- `disable-fullscreen`: remove the fullscreen control.

JavaScript:

```js
const player = document.querySelector('simple-player');

player.src = '/next-video.mp4';
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

## AI Skill

The package includes a plain Markdown skill that any AI tool can read.

Install it to the default local skills folder:

```bash
npx @grizzshutsdown/simpleplayer
```

Or choose the skills folder your AI tool uses:

```bash
npx @grizzshutsdown/simpleplayer --dir ~/.ai/skills
```

The installer copies the `simpleplayer` skill folder there. Point your AI tool at that folder if it does not scan it automatically.

## License

MIT
