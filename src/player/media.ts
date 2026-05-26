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

export type AudioAvailability = 'available' | 'unavailable' | 'unknown';

export function detectAudioAvailability(video: HTMLVideoElement): AudioAvailability {
  const audioTrackVideo = video as HTMLVideoElement & { audioTracks?: { length: number } };
  if (audioTrackVideo.audioTracks && typeof audioTrackVideo.audioTracks.length === 'number') {
    return audioTrackVideo.audioTracks.length > 0 ? 'available' : 'unavailable';
  }

  const firefoxVideo = video as HTMLVideoElement & { mozHasAudio?: boolean };
  if (typeof firefoxVideo.mozHasAudio === 'boolean') {
    return firefoxVideo.mozHasAudio ? 'available' : 'unavailable';
  }

  const streamVideo = video as HTMLVideoElement & {
    captureStream?: () => MediaStream;
    mozCaptureStream?: () => MediaStream;
  };
  const captureStream = streamVideo.captureStream ?? streamVideo.mozCaptureStream;
  if (captureStream && video.readyState >= HTMLMediaElement.HAVE_METADATA) {
    try {
      return captureStream.call(video).getAudioTracks().length > 0 ? 'available' : 'unavailable';
    } catch {
      // Cross-origin media can block captureStream; keep probing with other browser hints.
    }
  }

  const webkitVideo = video as HTMLVideoElement & { webkitAudioDecodedByteCount?: number };
  if (
    typeof webkitVideo.webkitAudioDecodedByteCount === 'number' &&
    video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
    video.currentTime > 0.25
  ) {
    return webkitVideo.webkitAudioDecodedByteCount > 0 ? 'available' : 'unavailable';
  }

  return 'unknown';
}

export function isAudioAvailabilityPending(video: HTMLVideoElement): boolean {
  const webkitVideo = video as HTMLVideoElement & { webkitAudioDecodedByteCount?: number };
  return (
    typeof webkitVideo.webkitAudioDecodedByteCount === 'number' &&
    video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
    video.currentTime <= 0.25
  );
}
