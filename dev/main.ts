import '../src/simple-player';
import type { SimplePlayer } from '../src/simple-player';

const player = document.querySelector<SimplePlayer>('#player');
const settings = document.querySelector<HTMLFormElement>('#settings');

const syncPlayerSetting = (input: HTMLInputElement) => {
  if (!player) return;

  const key = input.name as
    | 'controlsEnabled'
    | 'volumeEnabled'
    | 'volumeSliderEnabled'
    | 'pictureInPictureEnabled'
    | 'fullscreenEnabled'
    | 'autoplayEnabled';

  player[key] = input.checked;
};

settings?.addEventListener('change', (event) => {
  if (!(event.target instanceof HTMLInputElement)) return;
  syncPlayerSetting(event.target);
});

settings?.querySelectorAll<HTMLInputElement>('input').forEach(syncPlayerSetting);
