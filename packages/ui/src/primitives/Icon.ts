// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx, omit } from '../internal/util';

/* ---------- Icon ---------- */
export var PATHS = {
  'plus': 'M12 5v14M5 12h14',
  'arrow-up': 'M12 19V5M6 11l6-6 6 6',
  'chevron-right': 'M9 5l7 7-7 7',
  'chevron-left': 'M15 5l-7 7 7 7',
  'xmark': 'M6 6l12 12M18 6L6 18',
  'checkmark': 'M5 12.5l4.5 4.5L19 7',
  'search': 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5L20 20',
  'mic': 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM6 11a6 6 0 0 0 12 0M12 17v4',
  'bubble': 'M4 12c0-4 3.6-7 8-7s8 3 8 7-3.6 7-8 7c-1.2 0-2.3-.2-3.3-.6L4 20l1.2-3.6C4.4 15.2 4 13.7 4 12z',
  'folder': 'M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z',
  'gear': 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23L5.46 5.46',
  'bell': 'M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0',
  'person': 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5c1-3.5 4-5.5 7.5-5.5s6.5 2 7.5 5.5',
  'sparkle': 'M12 3.5l1.9 5.2 5.1 1.9-5.1 1.9L12 17.7l-1.9-5.2L5 10.6l5.1-1.9z',
  'square-pencil': 'M19 13v5.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4 18.5v-12A1.5 1.5 0 0 1 5.5 5H11M17.5 3.5l3 3L12 15l-4 1 1-4z',
  'ellipsis': 'M6 12h.01M12 12h.01M18 12h.01',
  'calendar': 'M5.5 5.5h13a1.5 1.5 0 0 1 1.5 1.5v11.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5V7a1.5 1.5 0 0 1 1.5-1.5zM4 10h16M8.5 3.5v4M15.5 3.5v4',
  'checklist': 'M4 6.5l1.5 1.5L8.5 5M4 12.5l1.5 1.5 3-3M4 18.5L5.5 20l3-3M11.5 7h8.5M11.5 13h8.5M11.5 19h8.5',
  'book': 'M12 6.5c-1.8-1.3-4.3-2-7.5-2v13c3.2 0 5.7.7 7.5 2 1.8-1.3 4.3-2 7.5-2v-13c-3.2 0-5.7.7-7.5 2zM12 6.5v13',
  'filter': 'M4 6h16M7 12h10M10 18h4',
  'share': 'M12 15V3.5M8 7.5l4-4 4 4M7 11H6a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 6 20h12a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 18 11h-1',
  'trash': 'M4.5 6.5h15M9.5 6.5V4.5h5v2M6.5 6.5l1 13h9l1-13M10 10.5v6M14 10.5v6',
  'pin': 'M9 4h6l-1 5 3 3v1.5H7V12l3-3zM12 13.5V20',
  'location': 'M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  'map': 'M9 5L3.5 7v12L9 17l6 2 5.5-2V5L15 7zM9 5v12M15 7v12',
  'directions': 'M12 3l9 9-9 9-9-9zM9.5 13.5V11h5M12.5 8.5L15 11l-2.5 2.5',
  'clock': 'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM12 7.5V12l3 2',
  'doc': 'M7 3.5h6.5l4.5 4.5v12.5H7zM13.5 3.5V8H18M9.5 12.5h6M9.5 16h6',
  'photo': 'M4.5 6.5h15v11h-15zM4.5 15l4-4 3.5 3.5 2.5-2.5 5 4.5M15.5 10a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z',
  'quote': 'M6 17.5c2.2-.8 3.5-2.6 3.5-5.5V7H5v5h4.5M15 17.5c2.2-.8 3.5-2.6 3.5-5.5V7H14v5h4.5',
  'globe': 'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5s1.2-6.1 3.5-8.5z'
};
export function Icon(p) {
  var size = p.size || 22;
  var rest = omit(p, ['name', 'size', 'className', 'strokeWidth']);
  return h('svg', Object.assign({
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    strokeWidth: p.name === 'ellipsis' ? 3 : (p.strokeWidth || 1.75), strokeLinecap: 'round', strokeLinejoin: 'round',
    'aria-hidden': p['aria-label'] ? undefined : true, className: cx('sg-icon', p.className)
  }, rest), h('path', { d: PATHS[p.name] || '' }));
}
Icon.names = Object.keys(PATHS);
