// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx, useControlled } from '../internal/util';
import { PlaceChip } from '../places/Places';
import { Badge } from '../primitives/Badge';
import { Checkbox } from '../selection/Selection';

/* ================= Module rows ================= */
export function TaskRow(p) {
  var st = useControlled(p.done, !!p.defaultDone);
  return h('div', { className: cx('sg-row sg-task', st[0] && 'is-done', p.className) },
    h(Checkbox, { checked: !!st[0], label: st[0] ? 'Mark ' + p.title + ' as not done' : 'Mark ' + p.title + ' as done',
      onChange: function (v) { st[1](v); if (p.onToggle) p.onToggle(v); } }),
    h('span', { className: 'sg-row-main' },
      h('span', { className: 'sg-row-title body sg-task-title' }, p.title),
      p.meta ? h('span', { className: 'sg-row-sub footnote' }, p.meta) : null,
      (p.badge || p.agent) ? h('span', { className: 'sg-row-badges' }, p.agent ? h(Badge, { tone: 'accent', icon: 'sparkle' }, typeof p.agent === 'string' ? p.agent : 'From chat') : null, p.badge || null) : null));
}
export function EventRow(p) {
  return h('div', { className: cx('sg-row sg-event', p.suggested && 'is-suggested', p.className) },
    h('span', { className: 'sg-event-time subheadline' }, p.time),
    h('span', { className: 'sg-event-dot', style: { '--sg-tint': 'var(--system-' + (p.tint || 'blue') + ')' }, 'aria-hidden': true }),
    h('span', { className: 'sg-row-main' },
      h('span', { className: 'sg-row-title headline' }, p.title),
      p.meta ? h('span', { className: 'sg-row-sub footnote' }, p.meta) : null,
      (p.location || p.badge || p.agent || p.suggested) ? h('span', { className: 'sg-row-badges' },
        p.location ? h(PlaceChip, { name: p.location, onClick: p.onLocation || function () {} }) : null,
        p.agent ? h(Badge, { tone: 'accent', icon: 'sparkle' }, typeof p.agent === 'string' ? p.agent : 'Added by agent') : null,
        p.suggested ? h(Badge, null, 'Suggestion') : null,
        p.badge || null) : null));
}
export function WeekStrip(p) {
  return h('div', { className: cx('sg-week', p.className), 'aria-label': p['aria-label'] || 'Week overview' },
    (p.days || []).map(function (d, i) {
      var on = i === p.selected;
      return h(p.onSelect ? 'button' : 'div', { key: i, type: p.onSelect ? 'button' : undefined, onClick: p.onSelect ? function () { p.onSelect(i); } : undefined, className: cx('sg-week-day', on && 'is-on'), 'aria-current': on ? 'date' : undefined },
        h('span', { className: 'caption-2 sg-week-name' }, d.name), h('span', { className: 'headline' }, d.num),
        h('span', { className: cx('sg-week-dot', d.busy && 'is-busy') }));
    }));
}
