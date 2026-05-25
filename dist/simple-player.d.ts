import { SimplePlayer } from './player/simple-player-element';
export { SimplePlayer } from './player/simple-player-element';
declare global {
    interface HTMLElementTagNameMap {
        'simple-player': SimplePlayer;
    }
}
