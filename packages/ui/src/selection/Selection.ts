// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx, useControlled } from '../internal/util';

export var choiceSeq = 0;
/* ================= Selection: one tick for every checkbox and choice ================= */
export function Tick(p) {
  return h('span', { className: cx('sg-tick', p.on && 'is-on'), 'aria-hidden': true },
    h('svg', { width: 22, height: 22, viewBox: '0 0 22 22' },
      p.on ? h(R.Fragment, null, h('circle', { cx: 11, cy: 11, r: 11, className: 'sg-tick-fill' }),
               h('path', { d: 'M6.5 11.5l3 3 6-6.5', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' }))
           : h('circle', { cx: 11, cy: 11, r: 10.25, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 })));
}
export function Checkbox(p) {
  var st = useControlled(p.checked, !!p.defaultChecked);
  return h('label', { className: cx('sg-check', p.children && 'has-label', p.className) },
    h('input', { type: 'checkbox', className: 'sg-vh', checked: !!st[0], disabled: p.disabled, 'aria-label': p.children ? undefined : p.label,
      onChange: function (e) { st[1](e.target.checked); if (p.onChange) p.onChange(e.target.checked); } }),
    h(Tick, { on: !!st[0] }),
    p.children ? h('span', { className: cx('sg-check-label body', st[0] && p.strike && 'is-struck') }, p.children) : null);
}
export function ChoiceList(p) {
  var nameRef = R.useRef(p.name || ('sg-choice-' + (++choiceSeq)));
  var multi = !!p.multiple;
  var st = useControlled(p.value, p.defaultValue !== undefined ? p.defaultValue : (multi ? [] : null));
  var os = R.useState(''), other = os[0], setOther = os[1];
  var opts = (p.options || []).map(function (o) { return typeof o === 'string' ? { value: o, label: o } : o; });
  function isOn(v) { return multi ? (st[0] || []).indexOf(v) >= 0 : st[0] === v; }
  function pick(v) {
    var next = multi ? (isOn(v) ? st[0].filter(function (x) { return x !== v; }) : (st[0] || []).concat([v])) : v;
    st[1](next); if (p.onChange) p.onChange(next, v === '__other' ? other : undefined);
  }
  return h('fieldset', { className: cx('sg-choices', p.className), style: { '--sg-cols': p.columns || 1 } },
    p.legend ? h('legend', { className: 'sg-choices-legend footnote' }, p.legend) : null,
    h('div', { className: 'sg-choices-grid' },
      opts.map(function (o) {
        var on = isOn(o.value);
        return h('label', { key: o.value, className: cx('sg-choice', on && 'is-on') },
          h('input', { type: multi ? 'checkbox' : 'radio', name: nameRef.current, className: 'sg-vh', checked: on, onChange: function () { pick(o.value); } }),
          h(Tick, { on: on }),
          h('span', { className: 'sg-choice-label body' }, o.label),
          o.detail ? h('span', { className: 'sg-choice-detail footnote' }, o.detail) : null);
      }),
      p.other ? h('label', { className: cx('sg-choice sg-choice-other', isOn('__other') && 'is-on') },
        h('input', { type: multi ? 'checkbox' : 'radio', name: nameRef.current, className: 'sg-vh', checked: isOn('__other'), onChange: function () { pick('__other'); } }),
        h(Tick, { on: isOn('__other') }),
        h('input', { type: 'text', className: 'sg-choice-input body', placeholder: p.other, 'aria-label': p.other, value: other,
          onChange: function (e) { setOther(e.target.value); if (!isOn('__other')) pick('__other'); } })) : null));
}
