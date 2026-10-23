// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx } from '../internal/util';
import { Icon } from '../primitives/Icon';

/* ---------- Badge ---------- */
export function Badge(p) {
  return h('span', { className: cx('sg-badge', 'sg-badge-' + (p.tone || 'neutral'), p.className) },
    p.icon ? h(Icon, { name: p.icon, size: 13, strokeWidth: 2.5 }) : null, p.children);
}

export var DARK_GLYPH = { orange: 1, yellow: 1, green: 1, mint: 1 };
export function Tile(p) {
  return h('span', { className: cx('sg-tile', 'sg-tile-' + (p.size || 'md')), style: { background: 'var(--system-' + (p.tint || 'blue') + ')', color: DARK_GLYPH[p.tint] ? '#1d1d1f' : '#ffffff' } },
    h(Icon, { name: p.icon, size: p.size === 'lg' ? 20 : 18, strokeWidth: 2 }));
}
