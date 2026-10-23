// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx, useControlled } from '../internal/util';
import { IconButton } from '../primitives/Button';
import { Icon } from '../primitives/Icon';

/* ---------- SearchField (query + capture) ---------- */
export function SearchField(p) {
  var kind = p.kind || 'query';
  var st = useControlled(p.value, p.defaultValue || '');
  var has = String(st[0] || '').trim().length > 0;
  function set(v) { st[1](v); if (p.onChange) p.onChange(v); }
  function submit() { if (!has || p.disabled) return; if (p.onSubmit) p.onSubmit(st[0]); if (kind === 'capture' && p.value === undefined) set(''); }
  return h('div', { className: cx('sg-field sg-glass sg-glass-regular sg-shape-pill', 'sg-field-' + kind, p.className) },
    kind === 'query' ? h(Icon, { name: 'search', size: 19, className: 'sg-field-icon' }) : null,
    h('input', { className: 'sg-field-input body', type: kind === 'query' ? 'search' : 'text', value: st[0], disabled: p.disabled, autoFocus: p.autoFocus,
      placeholder: p.placeholder || (kind === 'query' ? 'Search' : 'Add…'), 'aria-label': p.placeholder || (kind === 'query' ? 'Search' : 'Add'),
      enterKeyHint: kind === 'query' ? 'search' : 'done',
      onChange: function (e) { set(e.target.value); },
      onKeyDown: function (e) { if (e.nativeEvent.isComposing) return; if (e.key === 'Enter') { e.preventDefault(); submit(); } if (e.key === 'Escape' && p.onCancel) p.onCancel(); } }),
    has && kind === 'query' ? h(IconButton, { icon: 'xmark', label: 'Clear', variant: 'fill', size: 'sm', onClick: function () { set(''); } }) : null,
    kind === 'capture' ? h(IconButton, { icon: 'plus', label: 'Add', disabled: p.disabled || !has, variant: has ? 'accent' : 'plain', onClick: submit }) : null);
}
