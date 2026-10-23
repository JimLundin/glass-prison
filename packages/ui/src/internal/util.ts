// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { MonthGrid, TimeGrid } from '../calendar/Calendar';
import { Dock } from '../legacy/Legacy';

export function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
export function omit(p, keys) {
  var o = {};
  for (var k in p) if (Object.prototype.hasOwnProperty.call(p, k) && keys.indexOf(k) < 0) o[k] = p[k];
  return o;
}
export function useControlled(value, defaultValue) {
  var s = R.useState(defaultValue);
  var controlled = value !== undefined;
  return [controlled ? value : s[0], function (v) { if (!controlled) s[1](v); }];
}

export function useSizeClass(ref, forced) {
  var st = R.useState(forced || 'compact');
  R.useEffect(function () {
    if (forced || !ref.current || !window.ResizeObserver) return;
    var host = ref.current.closest('.sg-pane') || ref.current.parentElement;
    var ro = new ResizeObserver(function () {
      var w = host.getBoundingClientRect().width;
      st[1](w < 600 ? 'compact' : w < 840 ? 'medium' : 'wide');
    });
    ro.observe(host); return function () { ro.disconnect(); };
  }, [forced]);
  return forced || st[0];
}
/* ---------- Dock: arranges what a module contributes ---------- */
export var MAX_ACTIONS = { compact: 1, medium: 2, wide: 3 };
export function kbdAria(k) { return ({ '⏎': 'Enter', 'esc': 'Escape', 'Esc': 'Escape', '⌘K': 'Meta+K', '⌘N': 'Meta+N' })[k] || k; }

/* ================= Calendar views: TimeGrid (day / week) and MonthGrid ================= */
export function mins(t) { var a = String(t).split(':'); return (+a[0]) * 60 + (+(a[1] || 0)); }
export function lanes(evs) {
  // greedy: overlapping events share the column side by side
  var sorted = evs.slice().sort(function (a, b) { return mins(a.start) - mins(b.start); }), ends = [], out = [];
  sorted.forEach(function (e) {
    var s0 = mins(e.start), lane = 0;
    while (ends[lane] != null && ends[lane] > s0) lane++;
    ends[lane] = mins(e.end); out.push(Object.assign({ _lane: lane }, e));
  });
  var n = Math.max(1, ends.length);
  return out.map(function (e) { return Object.assign(e, { _n: n }); });
}
export function evStyle(tint) { return { '--sg-ev': 'var(--system-' + (tint || 'blue') + ')' }; }
