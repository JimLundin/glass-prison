// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx, useControlled } from '../internal/util';

/* ---------- SegmentedControl ---------- */
export function SegmentedControl(p) {
  var opts = (p.options || []).map(function (o) { return typeof o === 'string' ? { value: o, label: o } : o; });
  var st = useControlled(p.value, p.defaultValue !== undefined ? p.defaultValue : (opts[0] && opts[0].value));
  var idx = Math.max(0, opts.findIndex(function (o) { return o.value === st[0]; }));
  return h('div', {
    role: 'radiogroup', 'aria-label': p['aria-label'],
    className: cx('sg-seg', p.className), style: { '--sg-n': opts.length, '--sg-i': idx }
  },
    h('span', { className: 'sg-seg-thumb', 'aria-hidden': true }),
    opts.map(function (o) {
      var on = o.value === st[0];
      return h('button', {
        key: o.value, type: 'button', role: 'radio', 'aria-checked': on,
        className: cx('sg-seg-item', 'subheadline', on && 'is-on'),
        onClick: function () { st[1](o.value); if (p.onChange) p.onChange(o.value); }
      }, o.label);
    }));
}
