export type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitFullscreenEnabled?: boolean;
  webkitExitFullscreen?: () => Promise<void> | void;
  mozFullScreenElement?: Element | null;
  mozFullScreenEnabled?: boolean;
  mozCancelFullScreen?: () => Promise<void> | void;
  msFullscreenElement?: Element | null;
  msFullscreenEnabled?: boolean;
  msExitFullscreen?: () => Promise<void> | void;
};

export type FullscreenPlayer = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  mozRequestFullScreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
};

export type FullscreenVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitEnterFullScreen?: () => void;
  webkitSupportsFullscreen?: boolean;
  webkitDisplayingFullscreen?: boolean;
};

export type Cleanup = () => void;
export type PlaybackState = 'playing' | 'paused' | null;

export type ProgressMetrics = {
  rect: DOMRect;
  sideInset: number;
  innerWidth: number;
};

export type ScrubPoint = {
  percent: number;
  targetTime: number;
};
