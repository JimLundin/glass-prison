// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx, omit } from '../internal/util';

/* ---------- Glass ---------- */
export function Glass(p) {
  var as = p.as || 'div';
  var rest = omit(p, ['as', 'variant', 'shape', 'className', 'children']);
  return h(as, Object.assign({}, rest, {
    className: cx('sg-glass', 'sg-glass-' + (p.variant || 'regular'), 'sg-shape-' + (p.shape || 'rounded'), p.className)
  }), p.children);
}
