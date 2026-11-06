# @lp-labs/angular-measure

Circular angle operations. Finite degree/radian normalization, shortest-arc interpolation, and circular statistics.

## Install

```sh
npm install @lp-labs/angular-measure
```

## Quick start

```js
import { interpolateAngle } from '@lp-labs/angular-measure';
console.log(interpolateAngle(350, 10, 0.5, 'degrees')); // 0
```

## Runtime exports

- `normalizeAngle`
- `shortestAngleDelta`
- `interpolateAngle`
- `circularMean`

The package supplies independent ESM and CommonJS builds, bundled declarations, and no runtime or peer dependencies.

## Complete public TypeScript declarations

```ts
export type AngleUnit = 'radians' | 'degrees';
export declare function normalizeAngle(angle: number, unit?: AngleUnit): number;
export declare function shortestAngleDelta(from: number, to: number, unit?: AngleUnit): number;
export declare function interpolateAngle(
  from: number,
  to: number,
  amount: number,
  unit?: AngleUnit,
): number;
export declare function circularMean(angles: readonly number[], unit?: AngleUnit): number;
```

## Scope and limits

Normalizes finite degree or radian angles, computes shortest signed angular deltas, interpolates along that circular arc, and computes a circular mean.

## Errors and bounds

Non-finite values or unknown units raise TypeError. Empty/oversized angle lists or an undefined circular mean raise RangeError.

## Customization

Pass degrees explicitly for degree-based values. The shortest-angle tie and finite-input rules are deterministic.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
