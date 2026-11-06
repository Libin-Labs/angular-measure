import test from 'node:test';
import assert from 'node:assert/strict';
import {
  circularMean,
  interpolateAngle,
  normalizeAngle,
  shortestAngleDelta,
} from '../dist/esm/index.js';

test('normalizes degrees and radians into positive canonical ranges', () => {
  assert.equal(normalizeAngle(-10, 'degrees'), 350);
  assert.equal(normalizeAngle(4 * Math.PI), 0);
});
test('chooses the shortest wrapped direction across zero', () => {
  assert.equal(shortestAngleDelta(350, 10, 'degrees'), 20);
  assert.equal(shortestAngleDelta(10, 350, 'degrees'), -20);
  assert.ok(Math.abs(shortestAngleDelta(-Number.MAX_VALUE, Number.MAX_VALUE)) <= Math.PI);
});
test('uses a deterministic positive half-turn tie', () => {
  assert.equal(shortestAngleDelta(0, 180, 'degrees'), 180);
  assert.equal(shortestAngleDelta(180, 0, 'degrees'), 180);
});
test('interpolates along the circular shortest arc', () => {
  assert.equal(interpolateAngle(350, 10, 0.5, 'degrees'), 0);
  assert.equal(interpolateAngle(0, 90, 2, 'degrees'), 180);
});
test('computes a circular mean near zero rather than around 180', () => {
  assert.ok(
    circularMean([359, 1], 'degrees') < 1e-10 || circularMean([359, 1], 'degrees') > 359.999999999,
  );
});
test('rejects ambiguous opposing angles and invalid values', () => {
  assert.throws(() => circularMean([0, 180], 'degrees'), RangeError);
  assert.throws(() => normalizeAngle(Number.NaN), TypeError);
  assert.throws(() => normalizeAngle(1, 'turns'), TypeError);
});
