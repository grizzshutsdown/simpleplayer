export declare function formatVideoTime(time: number): string;
export type AudioAvailability = 'available' | 'unavailable' | 'unknown';
export declare function detectAudioAvailability(video: HTMLVideoElement): AudioAvailability;
export declare function isAudioAvailabilityPending(video: HTMLVideoElement): boolean;
