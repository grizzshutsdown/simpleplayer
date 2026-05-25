import type { ProgressMetrics } from './types';

export function getProgressMetrics(rect: DOMRect): ProgressMetrics {
  const sideInset = Math.min(2, Math.max(0, rect.width / 2));
  const innerWidth = Math.max(1, rect.width - (sideInset * 2));

  return { rect, sideInset, innerWidth };
}

export function getProgressXFromPercent(percent: number, rect: DOMRect): number {
  const { sideInset, innerWidth } = getProgressMetrics(rect);
  const clampedPercent = Math.min(1, Math.max(0, percent));

  return sideInset + (clampedPercent * innerWidth);
}

export function getProgressPercentFromClientX(clientX: number, rect: DOMRect): number {
  const { sideInset, innerWidth } = getProgressMetrics(rect);

  return Math.min(1, Math.max(0, (clientX - rect.left - sideInset) / innerWidth));
}
