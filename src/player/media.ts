export function formatVideoTime(time: number): string {
  if (!Number.isFinite(time) || time < 0) return '0:00';

  const totalSeconds = Math.floor(time);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  if (hours > 0) {
    return hours + ':' + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
  }

  return minutes + ':' + String(seconds).padStart(2, '0');
}

export function detectAudioAvailability(video: HTMLVideoElement, fallback: boolean): boolean {
  const audioTrackVideo = video as HTMLVideoElement & { audioTracks?: { length: number } };
  if (audioTrackVideo.audioTracks && typeof audioTrackVideo.audioTracks.length === 'number') {
    return audioTrackVideo.audioTracks.length > 0;
  }

  const firefoxVideo = video as HTMLVideoElement & { mozHasAudio?: boolean };
  if (typeof firefoxVideo.mozHasAudio === 'boolean') {
    return firefoxVideo.mozHasAudio;
  }

  const webkitVideo = video as HTMLVideoElement & { webkitAudioDecodedByteCount?: number };
  if (
    typeof webkitVideo.webkitAudioDecodedByteCount === 'number' &&
    video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
    !video.muted &&
    video.currentTime > 0.25
  ) {
    return webkitVideo.webkitAudioDecodedByteCount > 0;
  }

  return fallback;
}
