export type AngleUnit = 'radians' | 'degrees';
function settings(unit: AngleUnit) {
  if (unit !== 'radians' && unit !== 'degrees')
    throw new TypeError('Unit must be radians or degrees.');
  return unit === 'degrees' ? 360 : 2 * Math.PI;
}
function finite(value: number, name: string): void {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError(`${name} must be finite.`);
}
export function normalizeAngle(angle: number, unit: AngleUnit = 'radians'): number {
  finite(angle, 'Angle');
  const period = settings(unit);
  const result = ((angle % period) + period) % period;
  return Object.is(result, -0) ? 0 : result;
}
export function shortestAngleDelta(from: number, to: number, unit: AngleUnit = 'radians'): number {
  finite(from, 'From angle');
  finite(to, 'To angle');
  const period = settings(unit);
  const delta = normalizeAngle(to, unit) - normalizeAngle(from, unit);
  let shortest = ((((delta + period / 2) % period) + period) % period) - period / 2;
  if (shortest === -period / 2) shortest = period / 2;
  return shortest;
}
export function interpolateAngle(
  from: number,
  to: number,
  amount: number,
  unit: AngleUnit = 'radians',
): number {
  finite(amount, 'Interpolation amount');
  return normalizeAngle(from + shortestAngleDelta(from, to, unit) * amount, unit);
}
export function circularMean(angles: readonly number[], unit: AngleUnit = 'radians'): number {
  const period = settings(unit);
  if (!Array.isArray(angles) || angles.length === 0 || angles.length > 100_000)
    throw new RangeError('Provide 1..100000 angles.');
  let x = 0;
  let y = 0;
  for (const angle of angles) {
    finite(angle, 'Angle');
    const phase = angle * ((2 * Math.PI) / period);
    x += Math.cos(phase);
    y += Math.sin(phase);
  }
  if (Math.hypot(x, y) <= Number.EPSILON * angles.length * 8)
    throw new RangeError('Circular mean is undefined for a balanced set of directions.');
  return normalizeAngle(Math.atan2(y, x) * (period / (2 * Math.PI)), unit);
}
