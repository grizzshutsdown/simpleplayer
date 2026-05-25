import { SimplePlayer } from './player/simple-player-element';

export { SimplePlayer } from './player/simple-player-element';

if (!customElements.get('simple-player')) {
  customElements.define('simple-player', SimplePlayer);
}

declare global {
  interface HTMLElementTagNameMap {
    'simple-player': SimplePlayer;
  }
}
