// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx, kbdAria, omit } from '../internal/util';
import { Icon } from '../primitives/Icon';

/* ---------- Button ---------- */
export function Button(p) {
  var v = p.variant || 'glass', size = p.size || 'md';
  var rest = omit(p, ['variant', 'size', 'icon', 'className', 'children', 'destructive', 'kbd']);
  return h('button', Object.assign({ type: 'button', 'aria-keyshortcuts': p.kbd ? kbdAria(p.kbd) : undefined }, rest, {
    className: cx('sg-btn', 'sg-btn-' + v, 'sg-btn-' + size, p.destructive && 'sg-btn-destructive',
      v === 'glass' && 'sg-glass sg-glass-regular', size === 'sm' ? 'subheadline' : 'headline', p.className)
  }), p.icon ? h(Icon, { name: p.icon, size: size === 'lg' ? 22 : 18 }) : null, p.children ? h('span', null, p.children) : null,
    p.kbd ? h('kbd', { className: 'sg-kbd', 'aria-hidden': true }, p.kbd) : null);
}
/* ---------- IconButton ---------- */
export function IconButton(p) {
  var v = p.variant || 'glass', size = p.size || 'md';
  var rest = omit(p, ['variant', 'size', 'icon', 'className', 'label']);
  return h('button', Object.assign({ type: 'button', 'aria-label': p.label, title: p.label }, rest, {
    className: cx('sg-iconbtn', 'sg-iconbtn-' + size, 'sg-iconbtn-' + v,
      v === 'glass' && 'sg-glass sg-glass-thin', v === 'smoke' && 'sg-glass sg-glass-smoke', p.className)
  }), h(Icon, { name: p.icon, size: size === 'sm' ? 18 : size === 'lg' ? 24 : 21 }));
}
