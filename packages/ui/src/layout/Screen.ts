// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx } from '../internal/util';

/* ---------- Screen (responsive shell with a bottom-only dock) ---------- */
export function Pane(p) {
  return h(p.as || 'section', { className: cx('sg-pane', p.className), 'aria-label': p.label },
    h('div', { className: 'sg-pane-scroll' },
      (p.title || p.eyebrow) ? h('header', { className: 'sg-pane-header' },
        p.eyebrow ? h('p', { className: 'sg-pane-eyebrow footnote' }, p.eyebrow) : null,
        p.title ? h('h1', { className: 'sg-pane-title large-title' }, p.title) : null) : null,
      h('div', { className: 'sg-pane-content' }, p.children)),
    p.dock ? h('div', { className: 'sg-dock' }, p.dock) : null);
}
export function Screen(p) {
  return h('div', { className: cx('sg-screen', p.aside && 'has-aside', p.hinge && 'is-hinged', p.className), style: p.style },
    p.aside ? h(Pane, { as: 'aside', className: 'sg-pane-aside', title: p.asideTitle, eyebrow: p.asideEyebrow, dock: p.asideDock, label: p.asideTitle }, p.aside) : null,
    h(Pane, { as: 'main', className: 'sg-pane-main', title: p.title, eyebrow: p.eyebrow, dock: p.dock, label: p.title }, p.children));
}
