// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx } from '../internal/util';
import { IconButton } from '../primitives/Button';
import { Icon } from '../primitives/Icon';

/* ---------- Menu (opens upward from its trigger) ---------- */
export function Menu(p) {
  var st = R.useState(false), open = st[0], setOpen = st[1];
  var ref = R.useRef(null);
  R.useEffect(function () {
    if (!open) return;
    function off(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    function esc(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('pointerdown', off); document.addEventListener('keydown', esc);
    return function () { document.removeEventListener('pointerdown', off); document.removeEventListener('keydown', esc); };
  }, [open]);
  return h('div', { className: cx('sg-menu-wrap', p.align === 'start' && 'is-start', p.className), ref: ref },
    open ? h('div', { className: 'sg-menu sg-glass sg-glass-thick', role: 'menu' },
      (p.items || []).map(function (it) {
        return h('button', { key: it.id, type: 'button', role: 'menuitem', className: cx('sg-menu-item body', it.destructive && 'is-destructive'),
          onClick: function () { setOpen(false); if (it.onClick) it.onClick(); } },
          h('span', null, it.label), it.icon ? h(Icon, { name: it.icon, size: 20 }) : null);
      })) : null,
    h(IconButton, { icon: p.icon || 'ellipsis', label: p.label || 'More', variant: p.variant || 'plain', 'aria-haspopup': 'menu', 'aria-expanded': open, onClick: function () { setOpen(!open); } }));
}
