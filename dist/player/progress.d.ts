import type { ProgressMetrics } from './types';
export declare function getProgressMetrics(rect: DOMRect): ProgressMetrics;
export declare function getProgressXFromPercent(percent: number, rect: DOMRect): number;
export declare function getProgressPercentFromClientX(clientX: number, rect: DOMRect): number;
