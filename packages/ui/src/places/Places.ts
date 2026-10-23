// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx } from '../internal/util';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';

export function PlaceChip(p) {
  var Tag = p.onClick || p.href ? (p.href ? 'a' : 'button') : 'span';
  return h(Tag, { className: cx('sg-place', p.className), href: p.href, type: Tag === 'button' ? 'button' : undefined, onClick: p.onClick },
    h(Icon, { name: 'location', size: 15, strokeWidth: 2 }), h('span', null, p.name));
}
/* ================= Locations ================= */
export var ROADS = ['M-10 62 C 60 58, 120 70, 210 64 S 340 52, 420 60', 'M70 -10 C 76 40, 64 90, 82 140 S 96 230, 88 320', 'M-10 150 L 430 132',
  'M190 -10 C 180 60, 205 120, 196 180 S 210 260, 214 320', 'M300 -10 L 318 320', 'M-10 230 C 90 222, 200 240, 430 214', 'M120 -10 L 150 150 L 260 320',
  'M360 -10 C 350 80, 380 160, 372 320'];
export function MapArt(p) {
  return h('svg', { className: 'sg-map-art', viewBox: '0 0 420 300', preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': true },
    h('rect', { x: 0, y: 0, width: 420, height: 300, fill: 'var(--map-land)' }),
    h('rect', { x: 214, y: 70, width: 82, height: 58, rx: 14, fill: 'var(--map-park)' }),
    h('rect', { x: 18, y: 166, width: 56, height: 44, rx: 10, fill: 'var(--map-park)' }),
    h('path', { d: 'M-10 262 C 80 244, 150 290, 240 270 S 380 236, 440 252 L 440 320 L -10 320 Z', fill: 'var(--map-water)' }),
    ROADS.map(function (d, i) { return h('path', { key: i, d: d, fill: 'none', stroke: 'var(--map-road)', strokeWidth: i < 3 ? 7 : 4, strokeLinecap: 'round' }); }));
}
export function MapPreview(p) {
  var pins = p.pins || [];
  return h('figure', { className: cx('sg-map', p.bare && 'is-bare', p.className), style: p.bare ? null : { height: (p.height || 180) + 'px' } },
    h('div', { className: 'sg-map-canvas', role: 'img', 'aria-label': p['aria-label'] || ('Map' + (pins.length ? ' showing ' + pins.map(function (x) { return x.label; }).filter(Boolean).join(', ') : '')) },
      h(MapArt),
      pins.map(function (pn, i) {
        return h('span', { key: i, className: cx('sg-pin', pn.active && 'is-active'), style: { left: pn.x + '%', top: pn.y + '%', '--sg-tint': 'var(--system-' + (pn.tint || 'red') + ')' } },
          pn.active && pn.label ? h('span', { className: 'sg-pin-label caption-1 sg-glass sg-glass-regular sg-shape-pill' }, pn.label) : null,
          h('svg', { width: pn.active ? 34 : 24, height: pn.active ? 42 : 30, viewBox: '0 0 24 30' },
            h('path', { d: 'M12 29s-10-9.2-10-17a10 10 0 0 1 20 0c0 7.8-10 17-10 17z', fill: 'var(--sg-tint)', stroke: 'var(--canvas)', strokeWidth: 1.5 }),
            h('circle', { cx: 12, cy: 12, r: 4, fill: '#ffffff' })));
      })),
    (p.title && !p.bare) ? h('figcaption', { className: 'sg-map-cap' },
      h('span', { className: 'sg-map-cap-main' }, h('span', { className: 'headline' }, p.title), p.subtitle ? h('span', { className: 'footnote sg-item-sub' }, p.subtitle) : null),
      p.action ? h(Button, { variant: 'tinted', size: 'sm', icon: p.action.icon || 'directions', onClick: p.action.onClick }, p.action.label) : null) : null);
}
