export declare function getFullscreenElement(root: ShadowRoot): Element | null;
export declare function isFullscreenSupported(fullscreenEnabled: boolean, player: HTMLElement, video: HTMLVideoElement): boolean;
export declare function requestPlayerFullscreen(player: HTMLElement): Promise<void>;
export declare function canRequestPlayerFullscreen(player: HTMLElement): boolean;
export declare function requestVideoFullscreen(video: HTMLVideoElement): void;
export declare function exitFullscreen(): Promise<void>;
