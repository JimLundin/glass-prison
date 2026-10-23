// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { Menu } from '../fields/Menu';
import { MAX_ACTIONS, cx, useControlled, useSizeClass } from '../internal/util';
import { Button, IconButton } from '../primitives/Button';
import { Icon } from '../primitives/Icon';

/* ---------- TabBar ---------- */
export function TabBar(p) {
  var items = p.items || [];
  var st = useControlled(p.value, p.defaultValue !== undefined ? p.defaultValue : (items[0] && items[0].id));
  return h('nav', { className: cx('sg-tabbar-wrap', p.className), 'aria-label': p['aria-label'] || 'Tabs' },
    h('div', { className: 'sg-tabbar sg-glass sg-glass-regular sg-shape-pill', role: 'tablist' },
      items.map(function (it) {
        var on = it.id === st[0];
        return h('button', {
          key: it.id, type: 'button', role: 'tab', 'aria-selected': on,
          className: cx('sg-tab', on && 'is-on'),
          onClick: function () { st[1](it.id); if (p.onChange) p.onChange(it.id); }
        }, h('span', { className: 'sg-tab-icon' }, h(Icon, { name: it.icon, size: 22, strokeWidth: on ? 2 : 1.75 }),
             it.badge ? h('span', { className: 'sg-tab-badge', 'aria-label': it.badge + ' new' }, it.badge) : null),
           h('span', { className: 'caption-1' }, it.label));
      })),
    p.action ? h(IconButton, { icon: p.action.icon, label: p.action.label, size: 'lg', onClick: p.action.onClick, className: 'sg-tabbar-action' }) : null);
}


/* ---------- BottomBar ---------- */
export function BottomBar(p) {
  function group(nodes, side) {
    if (!nodes) return h('span', { className: 'sg-bb-spacer' });
    return h('div', { className: 'sg-bb-group sg-bb-' + side + ' sg-glass sg-glass-regular sg-shape-pill' }, nodes);
  }
  return h('div', { className: cx('sg-bottombar', p.className), role: 'toolbar', 'aria-label': p['aria-label'] || 'Actions' },
    group(p.leading, 'leading'),
    p.center ? h('div', { className: 'sg-bb-center' }, p.center) : h('span', { className: 'sg-bb-fill' }),
    group(p.trailing, 'trailing'));
}


export function Dock(p) {
  var ref = R.useRef(null);
  var size = useSizeClass(ref, p.size);
  var fs = R.useState(false), focused = fs[0], setFocused = fs[1];
  var ns = R.useState(false), navOpen = ns[0], setNavOpen = ns[1];
  var inputActive = p.inputActive !== undefined ? p.inputActive : focused;
  var actions = p.actions || [];
  var max = MAX_ACTIONS[size];
  var visible = actions.length > max ? actions.slice(0, Math.max(0, max - 1)) : actions;
  var hidden = actions.length > max ? actions.slice(visible.length) : [];

  function actionNodes() {
    var out = visible.map(function (a) { return h(IconButton, { key: a.id, icon: a.icon, label: a.label, variant: 'plain', onClick: a.onClick }); });
    if (hidden.length) out.push(h(Menu, { key: '__more', items: hidden }));
    return out.length ? out : null;
  }
  function primaryNode() {
    var pr = p.primary; if (!pr) return null;
    return size === 'compact'
      ? h(IconButton, { key: '__primary', icon: pr.icon || 'plus', label: pr.label, variant: 'accent', size: 'lg', onClick: pr.onClick, className: 'sg-dock-primary' })
      : h(Button, { key: '__primary', variant: 'filled', icon: pr.icon, onClick: pr.onClick, className: 'sg-dock-primary' }, pr.label);
  }
  var back = p.back ? h(IconButton, { icon: p.back.icon || 'chevron-left', label: p.back.label || 'Back', variant: 'plain', onClick: p.back.onClick }) : null;
  var center = (p.center || p.title) ? h('div', { className: 'sg-dock-chip sg-glass sg-glass-regular sg-shape-pill' }, p.center || h('span', { className: 'headline sg-dock-title' }, p.title)) : null;
  var acts = actionNodes(), prim = primaryNode();
  var navCollapsed = !!p.nav && size === 'compact' && inputActive && !navOpen;

  function capsule(nodes, key) { return nodes ? h('div', { key: key, className: 'sg-bb-group sg-glass sg-glass-regular sg-shape-pill' }, nodes) : null; }

  var rows = [];
  if (p.input) {
    var inputEl = h('div', { key: 'in', className: 'sg-dock-input',
      onFocus: function () { setFocused(true); setNavOpen(false); },
      onBlur: function (e) { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); } }, p.input);
    if (size === 'compact') {
      if (back || center) rows.push(h('div', { key: 'ctx', className: 'sg-dock-row' }, capsule(back, 'b'), h('div', { className: 'sg-dock-mid' }, center), capsule(acts, 'a'), prim));
      rows.push(h('div', { key: 'inrow', className: 'sg-dock-row' },
        navCollapsed ? h(IconButton, { icon: p.navIcon || 'ellipsis', label: 'Show tabs', size: 'lg', onClick: function () { setNavOpen(true); } }) : null,
        inputEl,
        (!back && !center) ? capsule(acts, 'a') : null, (!back && !center) ? prim : null));
    } else {
      if (center && !back) rows.push(h('div', { key: 'ctr', className: 'sg-dock-row sg-dock-center' }, center));
      rows.push(h('div', { key: 'inrow', className: 'sg-dock-row' },
        capsule(back, 'b'), inputEl, capsule(acts, 'a'), prim));
    }
  } else if (back || center || acts) {
    rows.push(h('div', { key: 'ctxrow', className: 'sg-dock-row' },
      capsule(back, 'b'), h('div', { className: 'sg-dock-mid' }, center), capsule(acts, 'a'), prim));
  } else if (prim) {
    rows.push(h('div', { key: 'ctxrow', className: 'sg-dock-row sg-dock-end' }, prim));
  }
  if (p.nav && !navCollapsed) rows.push(h('div', { key: 'nav', className: 'sg-dock-row sg-dock-nav' }, p.nav));

  return h('div', { ref: ref, className: cx('sg-dockstack', 'is-' + size, p.className), 'data-size': size }, rows);
}
