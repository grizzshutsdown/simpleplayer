import type { FullscreenDocument, FullscreenPlayer, FullscreenVideo } from './types';

export function getFullscreenElement(root: ShadowRoot): Element | null {
  const fullscreenDocument = document as FullscreenDocument;

  return (
    root.fullscreenElement ||
    document.fullscreenElement ||
    fullscreenDocument.webkitFullscreenElement ||
    fullscreenDocument.mozFullScreenElement ||
    fullscreenDocument.msFullscreenElement ||
    null
  );
}

export function isFullscreenSupported(
  fullscreenEnabled: boolean,
  player: HTMLElement,
  video: HTMLVideoElement,
): boolean {
  const fullscreenDocument = document as FullscreenDocument;
  const fullscreenPlayer = player as FullscreenPlayer;
  const fullscreenVideo = video as FullscreenVideo;
  const canFullscreenPlayer = !!(
    (
      document.fullscreenEnabled ??
      fullscreenDocument.webkitFullscreenEnabled ??
      fullscreenDocument.mozFullScreenEnabled ??
      fullscreenDocument.msFullscreenEnabled ??
      false
    ) &&
    (
      fullscreenPlayer.requestFullscreen ||
      fullscreenPlayer.webkitRequestFullscreen ||
      fullscreenPlayer.mozRequestFullScreen ||
      fullscreenPlayer.msRequestFullscreen
    )
  );
  const canFullscreenVideo = !!(
    fullscreenVideo.webkitSupportsFullscreen ||
    fullscreenVideo.webkitEnterFullscreen ||
    fullscreenVideo.webkitEnterFullScreen
  );

  return !!(fullscreenEnabled && (canFullscreenPlayer || canFullscreenVideo));
}

export function requestPlayerFullscreen(player: HTMLElement): Promise<void> {
  const fullscreenPlayer = player as FullscreenPlayer;
  const requestFullscreen = (
    fullscreenPlayer.requestFullscreen ||
    fullscreenPlayer.webkitRequestFullscreen ||
    fullscreenPlayer.mozRequestFullScreen ||
    fullscreenPlayer.msRequestFullscreen
  );

  return Promise.resolve(requestFullscreen?.call(fullscreenPlayer));
}

export function canRequestPlayerFullscreen(player: HTMLElement): boolean {
  const fullscreenPlayer = player as FullscreenPlayer;

  return (
    typeof fullscreenPlayer.requestFullscreen === 'function' ||
    typeof fullscreenPlayer.webkitRequestFullscreen === 'function' ||
    typeof fullscreenPlayer.mozRequestFullScreen === 'function' ||
    typeof fullscreenPlayer.msRequestFullscreen === 'function'
  );
}

export function requestVideoFullscreen(video: HTMLVideoElement): void {
  const fullscreenVideo = video as FullscreenVideo;
  const requestFullscreen = fullscreenVideo.webkitEnterFullscreen || fullscreenVideo.webkitEnterFullScreen;

  requestFullscreen?.call(fullscreenVideo);
}

export function exitFullscreen(): Promise<void> {
  const fullscreenDocument = document as FullscreenDocument;
  const exitFullscreen = (
    document.exitFullscreen ||
    fullscreenDocument.webkitExitFullscreen ||
    fullscreenDocument.mozCancelFullScreen ||
    fullscreenDocument.msExitFullscreen
  );

  return Promise.resolve(exitFullscreen?.call(fullscreenDocument));
}
