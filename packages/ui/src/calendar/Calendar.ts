// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx, evStyle, lanes, mins } from '../internal/util';

export function TimeGrid(p) {
  var days = p.days || [], start = p.startHour == null ? 7 : p.startHour, end = p.endHour == null ? 23 : p.endHour, hh = p.hourHeight || 48;
  var one = days.length === 1, compact = !!p.compact;
  var hours = []; for (var t = start; t <= end; t++) hours.push(t);
  var spans = p.allDay || [];
  return h('div', { className: cx('sg-tg', one && 'is-day', compact && 'is-compact', p.className), style: { '--sg-cols': days.length, '--sg-hh': hh + 'px' }, role: 'grid', 'aria-label': p['aria-label'] || (one ? 'Day' : 'Week') },
    one ? null : h('div', { className: 'sg-tg-head', role: 'row' }, h('span'),
      days.map(function (d, i) {
        return h(p.onSelect ? 'button' : 'div', { key: i, type: p.onSelect ? 'button' : undefined, onClick: p.onSelect ? function () { p.onSelect(i); } : undefined, role: 'columnheader', className: cx('sg-tg-day', d.selected && 'is-on', d.today && 'is-today') },
          h('span', { className: 'caption-2' }, d.name), h('span', { className: 'headline sg-tg-num' }, d.num));
      })),
    spans.length ? h('div', { className: 'sg-tg-allday', role: 'row' }, h('span', { className: 'caption-2 sg-tg-adlabel' }, 'all-day'),
      h('div', { className: 'sg-tg-adlane' }, spans.map(function (a, i) {
        return h('div', { key: i, className: cx('sg-ev sg-ev-span', a.agent && 'is-agent', a.suggested && 'is-suggested'), style: Object.assign(evStyle(a.tint), { gridColumn: (a.from + 1) + ' / ' + (a.to + 2) }) },
          h('span', { className: 'footnote sg-ev-title' }, a.title));
      }))) : null,
    h('div', { className: 'sg-tg-body', style: { height: ((end - start) * hh) + 'px' } },
      h('div', { className: 'sg-tg-hours', 'aria-hidden': true }, hours.map(function (t) {
        return h('span', { key: t, className: 'caption-2 sg-tg-hour', style: { top: ((t - start) * hh) + 'px' } }, (t < 10 ? '0' : '') + t + ':00');
      })),
      h('div', { className: 'sg-tg-cols' },
        hours.map(function (t) { return h('span', { key: 'l' + t, className: 'sg-tg-line', style: { top: ((t - start) * hh) + 'px' } }); }),
        p.now != null ? h('span', { className: 'sg-tg-now', style: { top: ((mins(p.now.time) / 60 - start) * hh) + 'px', gridColumn: (p.now.day + 1) + '' } }) : null,
        days.map(function (d, i) {
          var evs = lanes((p.events || []).filter(function (e) { return (e.day || 0) === i; }));
          return h('div', { key: i, className: cx('sg-tg-col', d.selected && !one && 'is-on'), role: 'gridcell' },
            evs.map(function (e, k) {
              var top = (mins(e.start) / 60 - start) * hh, ht = Math.max(compact ? 18 : 22, (mins(e.end) - mins(e.start)) / 60 * hh - 2);
              var short = ht < 40;
              return h(e.onClick || p.onEvent ? 'button' : 'div', { key: k, type: 'button', onClick: e.onClick || (p.onEvent ? function () { p.onEvent(e); } : undefined),
                  className: cx('sg-ev', e.agent && 'is-agent', e.suggested && 'is-suggested', short && 'is-short'),
                  style: Object.assign(evStyle(e.tint), { top: top + 'px', height: ht + 'px', left: 'calc(' + (100 * e._lane / e._n) + '% + 1px)', width: 'calc(' + (100 / e._n) + '% - 3px)' }) },
                h('span', { className: (compact ? 'caption-2' : 'footnote') + ' sg-ev-title' }, e.title),
                !short && !compact ? h('span', { className: 'caption-1 sg-ev-meta' }, e.start + (e.place ? ' · ' + e.place : '')) : null);
            }));
        }))));
}
export function MonthGrid(p) {
  var weeks = p.weeks || [], titles = !!p.titles;
  return h('div', { className: cx('sg-mg', titles && 'has-titles', p.className), role: 'grid', 'aria-label': p['aria-label'] || 'Month' },
    h('div', { className: 'sg-mg-head', role: 'row' }, (p.names || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']).map(function (n) { return h('span', { key: n, role: 'columnheader', className: 'caption-2' }, titles ? n : n.charAt(0)); })),
    weeks.map(function (w, r) {
      return h('div', { key: r, className: 'sg-mg-week', role: 'row' },
        w.days.map(function (d, i) {
          var Tag = p.onSelect ? 'button' : 'div';
          return h(Tag, { key: i, style: { gridColumn: String(i + 1) }, type: Tag === 'button' ? 'button' : undefined, onClick: p.onSelect ? function () { p.onSelect(r, i, d); } : undefined, role: 'gridcell', 'aria-selected': !!d.selected,
              className: cx('sg-mg-day', d.muted && 'is-muted', d.selected && 'is-on', d.today && 'is-today', d.span && 'has-span') },
            h('span', { className: 'subheadline sg-mg-num' }, d.num),
            titles ? h('span', { className: 'sg-mg-items' }, (d.items || []).slice(0, 3).map(function (it, k) {
                return h('span', { key: k, className: cx('caption-1 sg-mg-item', it.suggested && 'is-suggested'), style: evStyle(it.tint) }, it.title);
              }), (d.items || []).length > 3 ? h('span', { className: 'caption-2 sg-mg-more' }, '+' + (d.items.length - 3)) : null)
              : h('span', { className: 'sg-mg-dots' }, (d.items || []).slice(0, 3).map(function (it, k) { return h('span', { key: k, className: 'sg-mg-dot', style: evStyle(it.tint) }); })));
        }),
        (w.spans || []).map(function (a, k) {
          return h('span', { key: 's' + k, className: cx('sg-mg-span', titles && 'caption-1'), style: Object.assign(evStyle(a.tint), { gridColumn: (a.from + 1) + ' / ' + (a.to + 2) }) }, titles ? a.title : null);
        }));
    }));
}
