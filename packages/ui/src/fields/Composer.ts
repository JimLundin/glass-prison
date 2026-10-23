// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { Message } from '../agent/Agent';
import { cx, useControlled } from '../internal/util';
import { IconButton } from '../primitives/Button';

/* ---------- Composer ---------- */
export function Composer(p) {
  var st = useControlled(p.value, p.defaultValue || '');
  var ref = R.useRef(null);
  var has = String(st[0] || '').trim().length > 0;
  R.useEffect(function () {
    var el = ref.current; if (!el) return;
    el.style.height = '22px'; el.style.height = Math.min(Math.max(el.scrollHeight - 26, 22), 160) + 'px';
  }, [st[0]]);
  function send() { if (!has || p.disabled) return; if (p.onSend) p.onSend(st[0]); st[1](''); if (p.onChange) p.onChange(''); }
  var ph = p.working ? (p.status || 'Working…') : (p.placeholder || 'Message');
  return h('div', { className: cx('sg-composer sg-glass sg-glass-regular', p.working && 'is-working', p.className) },
    h(IconButton, { icon: 'plus', label: 'Add', variant: 'plain', className: 'sg-composer-btn', onClick: p.onAttach }),
    h('textarea', {
      ref: ref, rows: 1, className: 'sg-composer-input body', placeholder: ph,
      value: st[0], disabled: p.disabled, 'aria-label': p.placeholder || 'Message',
      onChange: function (e) { st[1](e.target.value); if (p.onChange) p.onChange(e.target.value); },
      onKeyDown: function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }
    }),
    p.tools || null,
    p.working
      ? h('button', { type: 'button', className: 'sg-iconbtn sg-iconbtn-accent sg-composer-btn sg-composer-send', 'aria-label': 'Stop', onClick: p.onStop },
          h('svg', { width: 12, height: 12, viewBox: '0 0 12 12', 'aria-hidden': true }, h('rect', { x: 1, y: 1, width: 10, height: 10, rx: 2.5, fill: 'currentColor' })))
      : has
        ? h(IconButton, { icon: 'arrow-up', label: 'Send', variant: 'accent', className: 'sg-composer-btn sg-composer-send', onClick: send })
        : h(IconButton, { icon: 'mic', label: 'Dictate', variant: 'plain', className: 'sg-composer-btn', onClick: p.onDictate }));
}
