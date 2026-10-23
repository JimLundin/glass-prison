// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx } from '../internal/util';

export function TopEdge(p) {
  return h('div', { className: cx('sg-topedge', p.show && 'is-on', p.className), 'aria-hidden': true },
    h('span', { className: 'headline sg-topedge-title' }, p.title));
}
