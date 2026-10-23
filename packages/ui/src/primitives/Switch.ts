// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx, useControlled } from '../internal/util';

/* ---------- Switch ---------- */
export function Switch(p) {
  var st = useControlled(p.checked, !!p.defaultChecked);
  return h('button', {
    type: 'button', role: 'switch', 'aria-checked': !!st[0], 'aria-label': p['aria-label'], disabled: p.disabled,
    className: cx('sg-switch', st[0] && 'is-on', p.className),
    onClick: function () { var n = !st[0]; st[1](n); if (p.onChange) p.onChange(n); }
  }, h('span', { className: 'sg-switch-knob' }));
}
