// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx } from '../internal/util';
import { Icon } from '../primitives/Icon';

/* ---------- ListGroup / ListRow ---------- */
export function ListGroup(p) {
  return h('section', { className: cx('sg-list', p.className) },
    p.header ? h('h3', { className: 'sg-list-header footnote' }, p.header) : null,
    h('div', { className: cx('sg-list-body', p.glass === false ? 'sg-list-solid' : 'sg-glass sg-glass-thick') }, p.children),
    p.footer ? h('p', { className: 'sg-list-footer footnote' }, p.footer) : null);
}
export function ListRow(p) {
  var acc = p.accessory === undefined ? (p.onClick ? 'chevron' : null) : p.accessory;
  var Tag = p.onClick ? 'button' : 'div';
  return h(Tag, {
    type: p.onClick ? 'button' : undefined, onClick: p.onClick,
    className: cx('sg-row', p.onClick && 'is-action', p.destructive && 'is-destructive', p.className)
  },
    p.icon ? h('span', { className: 'sg-row-tile', style: { background: 'var(--system-' + (p.tint || 'blue') + ')' } },
      typeof p.icon === 'string' ? h(Icon, { name: p.icon, size: 17, strokeWidth: 2 }) : p.icon) : null,
    h('span', { className: 'sg-row-main' },
      h('span', { className: 'sg-row-title body' }, p.title),
      p.subtitle ? h('span', { className: 'sg-row-sub subheadline' }, p.subtitle) : null),
    p.detail ? h('span', { className: 'sg-row-detail body' }, p.detail) : null,
    acc === 'chevron' ? h(Icon, { name: 'chevron-right', size: 16, strokeWidth: 2.25, className: 'sg-row-chev' }) : acc);
}
