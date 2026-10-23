// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { AgentQuestion, AgentRequest, actionButtons } from '../agent/Agent';
import { Composer } from '../fields/Composer';
import { DetailCard } from './DetailCard';
import { Menu } from '../fields/Menu';
import { SearchField } from '../fields/SearchField';
import { cx, omit } from '../internal/util';
import { IconButton } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { SegmentedControl } from '../primitives/SegmentedControl';
import { SourceCard } from '../wiki/SourceCard';

/* ================= Cluster: the bottom cluster, with morphing glass ================= */
export function useBox(ref, prop) {
  var st = R.useState(0);
  R.useLayoutEffect(function () {
    var el = ref.current; if (!el || !window.ResizeObserver) return;
    var read = function () { var v = prop === 'w' ? el.getBoundingClientRect().width : el.scrollHeight; if (Math.abs(v - st[0]) > 0.5) st[1](v); };
    read();
    var ro = new ResizeObserver(read); ro.observe(el); return function () { ro.disconnect(); };
  });
  return st[0];
}
export function geo(g, extra) {
  return Object.assign({ left: g.l + 'px', bottom: g.b + 'px', width: Math.max(0, g.w) + 'px', height: Math.max(0, g.h) + 'px', borderRadius: (g.r != null ? g.r : Math.min(g.h, g.w) / 2) + 'px', opacity: g.o == null ? 1 : g.o }, extra || null);
}
export function Layer(p) {
  return h('div', { className: cx('sg-cl-layer', p.anchor === 'bottom' && 'is-bottom', !p.on && 'is-off', p.className), 'aria-hidden': p.on ? undefined : true, inert: p.on ? undefined : '', ref: p.innerRef }, p.children);
}

/* Accessory / sheet given as plain data (for hosts that pass props, not nodes) */
export function fromSpec(x) {
  if (!x || R.isValidElement(x) || typeof x !== 'object' || Array.isArray(x)) return x || null;
  var k = x.kind, key = x.key || (k + ':' + (x.placeholder || x.title || ''));
  var rest = omit(x, ['kind', 'key']);
  if (k === 'composer') return h(Composer, Object.assign({ key: key }, rest));
  if (k === 'query' || k === 'capture') return h(SearchField, Object.assign({ key: key, kind: k }, rest));
  if (k === 'switcher') return h('div', { key: key, className: 'sg-cl-center' }, h(SegmentedControl, rest));
  if (k === 'title') return h('div', { key: key, className: 'sg-cl-title headline' }, x.text);
  if (k === 'request') return h(AgentRequest, Object.assign({ key: key }, rest));
  if (k === 'question') return h(AgentQuestion, Object.assign({ key: key }, rest));
  if (k === 'source') return h(SourceCard, Object.assign({ key: key }, rest));
  if (k === 'card') return h(DetailCard, Object.assign({ key: key }, rest));
  return null;
}
export function isTextEntry(el) {
  if (!el || !el.tagName) return false;
  var t = el.tagName.toLowerCase();
  return t === 'textarea' || el.isContentEditable || (t === 'input' && !/^(button|checkbox|radio|submit|reset|range|color)$/.test(el.type || ''));
}
export function Cluster(p) {
  var v = p.variant === 'capsule' || p.variant === 'row' ? 'row' : 'bar';
  var H = 56, G = 12;
  var rootRef = R.useRef(null), accRef = R.useRef(null), sheetRef = R.useRef(null), swRef = R.useRef(null);
  var W = useBox(rootRef, 'w') || 358;
  var hA = useBox(accRef, 'h'), hS = useBox(sheetRef, 'h'), hSw = useBox(swRef, 'h');
  var fs = R.useState(false), focus = fs[0], setFocus = fs[1];
  var sws = R.useState(false), swOpen = p.switcherOpen !== undefined ? p.switcherOpen : sws[0];
  function setSw(x) { sws[1](x); if (p.onSwitcher) p.onSwitcher(x); }
  var bls = R.useState('none'), bloom = p.bloom !== undefined ? (p.bloom || 'none') : bls[0];
  function setBloom(x) { bls[1](x); if (p.onBloom) p.onBloom(x); }
  var leadPanelRef = R.useRef(null), trailPanelRef = R.useRef(null);
  var hLP = useBox(leadPanelRef, 'h'), hTP = useBox(trailPanelRef, 'h');
  R.useEffect(function () {
    if (bloom === 'none') return;
    function off(e) { if (rootRef.current && !rootRef.current.contains(e.target)) setBloom('none'); }
    function esc(e) { if (e.key === 'Escape') setBloom('none'); }
    document.addEventListener('pointerdown', off); document.addEventListener('keydown', esc);
    return function () { document.removeEventListener('pointerdown', off); document.removeEventListener('keydown', esc); };
  }, [bloom]);
  var sheetExit = p.sheet && p.sheet.dismiss && p.sheet.dismiss.onClick;
  R.useEffect(function () {
    if (!sheetExit) return;
    function esc(e) { if (e.key === 'Escape') sheetExit(); }
    document.addEventListener('keydown', esc); return function () { document.removeEventListener('keydown', esc); };
  }, [sheetExit]);
  var tabs = p.tabs || [], cur = tabs.filter(function (t) { return t.id === p.tab; })[0] || tabs[0] || { icon: 'ellipsis', label: 'Tabs' };
  var accNode = fromSpec(p.accessory) || (p.children || null), sheetNode = fromSpec(p.sheet);
  // row: blooming the module circle is search — the centre turns into a query field while the modules stand above it
  var bloomSearch = v === 'row' && bloom === 'lead' && !!p.search && !sheetNode;
  if (bloomSearch) accNode = h(SearchField, { key: '__bloomq', kind: 'query', autoFocus: true, placeholder: p.search.placeholder || 'Search everything',
    onChange: function (q) { if (q && p.search.onQuery) { setBloom('none'); p.search.onQuery(q); } },
    onSubmit: function (q) { setBloom('none'); if (p.search.onQuery) p.search.onQuery(q); }, onCancel: function () { setBloom('none'); } });
  var detail = !!p.back, sheet = !!sheetNode, acc = !!accNode;
  var actions = p.actions || [];
  var accH = Math.max(H, hA || 0);
  var g = {};
  var leadIcon, trail = null, trailKind = 'none';

  if (v === 'bar') {
    var min = !sheet && !!(p.minimized || (focus && acc));
    var tabW = Math.min(W - H - 4, Math.max(tabs.length * 44 + 16, Math.min(W - H - G, tabs.length * 58 + 8)));
    g.iconTabs = tabW < tabs.length * 52 + 8;
    // lead: tab bar ⇄ circle (active tab or back)
    g.lead = (detail || min) ? { l: 0, b: 0, w: H, h: H } : { l: 0, b: 0, w: tabW, h: H };
    // trail
    if (detail) {
      if (min) { trailKind = actions.length ? 'more' : (p.primary ? 'primary' : 'none'); }
      else { trailKind = actions.length ? 'actions' : (p.primary ? 'primary' : 'none'); }
    } else {
      trailKind = min ? (p.primary ? 'primary' : (p.search ? 'search' : 'none')) : (p.search ? 'search' : 'none');
    }
    if (min && focus) trailKind = 'none';
    var trailW = trailKind === 'actions' ? Math.min(actions.length, 3) * 44 + (actions.length > 3 ? 44 : 0) + 8 : H;
    g.trail = trailKind === 'none' ? { l: W - H / 2, b: H / 2, w: 0, h: 0, o: 0 } : { l: W - trailW, b: 0, w: trailW, h: H };
    var primRow = !detail && !min && p.primary;
    g.prim = primRow ? { l: W - H, b: H + G, w: H, h: H } : { l: W - H / 2, b: H + G + H / 2, w: 0, h: 0, o: 0 };
    if (sheet) g.acc = { l: 0, b: H + G, w: W, h: Math.max(H, hS || 0), r: 26 };
    else if (!acc) g.acc = { l: W / 2, b: H + G + H / 2, w: 0, h: 0, o: 0 };
    else if (min) { var right = trailKind === 'none' ? 0 : H + G; g.acc = { l: H + G, b: 0, w: W - (H + G) - right, h: accH, r: Math.min(26, accH / 2) }; }
    else g.acc = { l: 0, b: H + G, w: W - (primRow ? H + G : 0), h: accH, r: Math.min(26, accH / 2) };
    leadIcon = detail ? 'back' : 'tab';
    g.min = min;
  } else {
    // row: three fixed positions — [leading circle] [centre] [trailing circle] — plus two states:
    // bloom (a circle grows into its menu) and focus (a card the page puts in front of you takes the whole cluster).
    var trailMode = (p.primary && !actions.length) ? 'primary' : (actions.length ? (p.flat ? 'actions' : 'more') : 'none');
    if ((focus && acc && !p.flat) || bloomSearch) trailMode = 'none';
    var hasLead = detail || tabs.length > 0;
    // pointer (flat): the modules lie flat in the leading capsule instead of hiding behind a circle
    var flatTabs = !!p.flat && !detail && tabs.length > 0;
    var leadW = flatTabs ? tabs.length * 64 + 8 : H;
    var flatItems = trailMode === 'actions' ? (p.primary ? [Object.assign({ id: '__primary' }, p.primary)] : []).concat(actions) : [];
    var trailW = trailMode === 'actions' ? Math.min(flatItems.length, 4) * 44 + (flatItems.length > 4 ? 44 : 0) + 8 : H;
    trailKind = trailMode;
    var circleAt = function (l) { return { l: l, b: 0, w: H, h: H }; };
    if (sheet) {
      g.acc = { l: 0, b: 0, w: W, h: Math.max(H, hS || 0), r: 28 };
      g.lead = { l: 0, b: 0, w: H, h: H, o: 0 };
      g.trail = { l: W - H, b: 0, w: H, h: H, o: 0 };
    } else {
      var tw = Math.min(W, 300);
      // the circles gather at the thumb's corner (outer edge = x 0 before mirroring); the centre fills inward
      var x0 = hasLead ? leadW + G : 0;
      g.lead = hasLead ? { l: 0, b: 0, w: leadW, h: H } : { l: 0, b: H / 2, w: 0, h: 0, o: 0 };
      if (p.gather) {
        // a pane's bar on a wide touch screen: the circles gather in the thumb's corner, the centre fills inward
        g.trail = trailMode === 'none' ? { l: x0, b: H / 2, w: 0, h: 0, o: 0 } : { l: x0, b: 0, w: trailW, h: H };
        var left = x0 + (trailMode === 'none' ? 0 : trailW + G);
        g.acc = acc ? { l: left, b: 0, w: W - left, h: accH, r: Math.min(28, accH / 2) } : { l: left, b: 0, w: 0, h: H, o: 0 };
      } else {
        // phone: the circles take either end and the centre sits between them
        g.trail = trailMode === 'none' ? { l: W - H / 2, b: H / 2, w: 0, h: 0, o: 0 } : { l: W - trailW, b: 0, w: trailW, h: H };
        var right = trailMode === 'none' ? 0 : trailW + G;
        g.acc = acc ? { l: x0, b: 0, w: W - x0 - right, h: accH, r: Math.min(28, accH / 2) } : { l: x0, b: 0, w: 0, h: H, o: 0 };
      }
    }
    g.prim = { l: W, b: 0, w: 0, h: 0, o: 0 };
    leadIcon = detail ? 'back' : (flatTabs ? 'tabs' : 'module');
    g.flatTabs = flatTabs;
    // right-handed: on touch the row is mirrored so navigation / Back sits under the right thumb; a pointer reads left to right
    if (!p.flat) {
      ['lead', 'trail', 'acc'].forEach(function (k) { var x = g[k]; if (x) x.l = W - x.l - x.w; });
      g.mirrored = true;
    }
  }
  var total = 0;
  ['lead', 'trail', 'acc', 'prim'].forEach(function (k) { var x = g[k]; if (x && (x.o == null || x.o > 0)) total = Math.max(total, x.b + x.h); });
  if (v === 'bar' && sheet) total = Math.max(total, H + G + Math.max(H, hS || 0));

  // ---- lead piece
  var leadOn = g.lead.w > 0 && g.lead.o !== 0;
  var tabsLayer = h(Layer, { on: leadOn && (v === 'bar' ? (!detail && !g.min) : !!g.flatTabs) },
    h('div', { className: cx('sg-cl-tabs', g.iconTabs && 'is-icons'), role: 'tablist' }, tabs.map(function (t) {
      var on = t.id === cur.id;
      return h('button', { key: t.id, type: 'button', role: 'tab', 'aria-label': t.label, title: g.iconTabs ? t.label : undefined, 'aria-selected': on, className: cx('sg-tab', on && 'is-on'), onClick: function () { if (swOpen) setSw(false); if (p.onTab) p.onTab(t.id); } },
        h('span', { className: 'sg-tab-icon' }, h(Icon, { name: t.icon, size: 22, strokeWidth: on ? 2 : 1.75 }), t.badge ? h('span', { className: 'sg-tab-badge' }, t.badge) : null),
        h('span', { className: 'caption-1' }, t.label));
    })));
  var circleLayer = h(Layer, { on: leadOn && (v === 'bar' ? (detail || g.min) : !g.flatTabs) },
    (v === 'row' && bloom === 'lead') ? h(IconButton, { icon: 'xmark', label: 'Close', variant: 'plain', size: 'lg', onClick: function () { setBloom('none'); }, className: 'sg-cl-circlebtn' }) :
    leadIcon === 'back'
      ? h(IconButton, { icon: 'chevron-left', label: (p.back && p.back.label) || 'Back', variant: 'plain', size: 'lg', onClick: p.back && p.back.onClick, className: 'sg-cl-circlebtn' })
      : leadIcon === 'module'
        ? h(IconButton, { icon: cur.icon, label: 'Go to… (now ' + cur.label + ')', variant: 'plain', size: 'lg', onClick: function () { setBloom('lead'); }, className: 'sg-cl-circlebtn sg-cl-cur' })
        : h(IconButton, { icon: cur.icon, label: 'Show tabs (' + cur.label + ')', variant: 'plain', size: 'lg', onClick: p.onExpand, className: 'sg-cl-circlebtn sg-cl-cur' }));
  var switcherLayer = null;

  // ---- trail piece
  var trailRow = v === 'row' ? h(Layer, { on: trailKind !== 'none' && g.trail.o !== 0 },
      bloom === 'trail' ? h(IconButton, { icon: 'xmark', label: 'Close', variant: 'plain', size: 'lg', onClick: function () { setBloom('none'); }, className: 'sg-cl-circlebtn' })
      : trailKind === 'primary' ? h(IconButton, { icon: p.primary.icon || 'plus', label: p.primary.label, variant: 'plain', size: 'lg', onClick: p.primary.onClick, disabled: p.primary.disabled, className: 'sg-cl-circlebtn sg-cl-prim' })
      : trailKind === 'more' ? h(IconButton, { icon: 'ellipsis', label: 'More', variant: 'plain', size: 'lg', onClick: function () { setBloom('trail'); }, className: 'sg-cl-circlebtn', 'aria-haspopup': 'menu', 'aria-expanded': false })
      : trailKind === 'actions' ? h('div', { className: 'sg-cl-actions' }, flatItems.slice(0, 4).map(function (a) { return h(IconButton, { key: a.id || a.label, icon: a.icon || 'plus', label: a.label, title: a.label, variant: 'plain', onClick: a.onClick, disabled: a.disabled, className: a.destructive ? 'is-destructive' : undefined }); }),
          flatItems.length > 4 ? h(Menu, { items: flatItems.slice(4) }) : null) : null) : null;
  // ---- bloom: items stack up from the circle over a dimmed, blurred screen
  var bloomItems = bloom === 'lead' ? tabs.map(function (t) {
      return { id: t.id, label: t.label, icon: t.icon, badge: t.badge, on: t.id === cur.id, onClick: function () { setBloom('none'); if (p.onTab && t.id !== cur.id) p.onTab(t.id); } };
    })
    : bloom === 'trail' ? (p.primary ? [Object.assign({ id: '__primary' }, p.primary)] : []).concat(actions).concat(p.more || []).map(function (a) {
      return { id: a.id || a.label, label: a.label, icon: a.icon || 'plus', destructive: a.destructive, disabled: a.disabled, onClick: function () { setBloom('none'); if (a.onClick) a.onClick(); } };
    }) : null;
  var lastBloom = R.useRef({ side: 'lead', items: [] });
  if (bloomItems) lastBloom.current = { side: bloom, items: bloomItems };
  var shownItems = lastBloom.current.items, open = bloom !== 'none' && v === 'row';
  // the bloom is the bar itself stood on end: one vertical glass capsule of tab items, rising from its circle
  var src = g[lastBloom.current.side === 'lead' ? 'lead' : 'trail'] || { l: 0, w: H };
  var VW = 76, vx = Math.max(-8, Math.min(W - VW + 8, src.l + src.w / 2 - VW / 2));
  var bloomLayer = v === 'row' ? h(R.Fragment, null,
    h('div', { className: cx('sg-cl-scrim', open && 'is-on'), onClick: function () { setBloom('none'); }, 'aria-hidden': true }),
    h('div', { className: cx('sg-cl-vbar sg-glass sg-glass-regular', open && 'is-on', p.bloomLabels === false && 'no-labels'), role: 'menu', 'aria-hidden': open ? undefined : true, style: { left: vx + 'px', bottom: (H + G) + 'px' } },
      shownItems.map(function (it, i) {
        var n = shownItems.length;
        return h('button', { key: it.id, type: 'button', role: 'menuitem', disabled: it.disabled, tabIndex: open && !it.disabled ? 0 : -1, 'aria-label': it.label, 'aria-current': it.on ? 'page' : undefined,
            className: cx('sg-tab', it.on && 'is-on', it.destructive && 'is-destructive'),
            style: { transitionDelay: (open ? 60 + (n - 1 - i) * 24 : 0) + 'ms' }, onClick: it.onClick },
          h('span', { className: 'sg-tab-icon' }, h(Icon, { name: it.icon, size: 22, strokeWidth: it.on ? 2 : 1.75 }), it.badge ? h('span', { className: 'sg-tab-badge' }, it.badge) : null),
          p.bloomLabels === false ? null : h('span', { className: 'caption-1', 'aria-hidden': true }, it.label));
      }))) : null;
  var trailLayer = v === 'row' ? trailRow : h(Layer, { on: trailKind !== 'none' },
    trailKind === 'search' ? h(IconButton, { icon: 'search', label: (p.search && p.search.label) || 'Search', variant: 'plain', size: 'lg', onClick: p.search && p.search.onOpen, className: 'sg-cl-circlebtn' })
    : trailKind === 'primary' ? h(IconButton, { icon: p.primary.icon || 'plus', label: p.primary.label, variant: 'plain', size: 'lg', onClick: p.primary.onClick, disabled: p.primary.disabled, className: 'sg-cl-circlebtn sg-cl-prim' })
    : trailKind === 'more' ? h(Menu, { items: actions.map(function (a) { return { id: a.id, label: a.label, icon: a.icon, onClick: a.onClick, disabled: a.disabled, destructive: a.destructive }; }).concat(p.more || []), className: 'sg-cl-circlebtn' })
    : trailKind === 'actions' ? h('div', { className: 'sg-cl-actions' }, actions.slice(0, 3).map(function (a) { return h(IconButton, { key: a.id, icon: a.icon, label: a.label, variant: 'plain', onClick: a.onClick, disabled: a.disabled }); }),
        (actions.length > 3 || (p.more && p.more.length)) ? h(Menu, { items: actions.slice(3).concat(p.more || []) }) : null)
    : null);

  var pieceCls = function (k, extra) { return cx('sg-cl-piece sg-glass', extra || 'sg-glass-regular', 'sg-cl-' + k); };
  return h('div', { ref: rootRef, className: cx('sg-cluster', 'is-' + v, p.flat && !sheet && p.accessory && p.accessory.kind === 'switcher' && 'has-sized-switcher', p.className), style: { height: total + 'px' }, role: 'region', 'aria-label': p['aria-label'] || 'Controls' },
    h('div', { className: cx(pieceCls('acc', sheet ? 'sg-glass-thick' : 'sg-glass-regular'), bloomSearch && 'is-raised'), style: geo(g.acc),
        // only typing changes the bar's shape (the keyboard is the cue); tapping a switcher or button never does
        onFocus: function (e) { setFocus(isTextEntry(e.target)); }, onBlur: function (e) { if (!e.currentTarget.contains(e.relatedTarget) || !isTextEntry(e.relatedTarget)) setFocus(false); } },
      h(Layer, { on: acc && !sheet, anchor: 'bottom', innerRef: accRef, className: 'sg-cl-acclayer' }, accNode),
      h(Layer, { on: sheet, anchor: 'bottom', innerRef: sheetRef, className: 'sg-cl-sheetlayer' }, sheetNode)),
    h('div', { className: pieceCls('prim', 'sg-glass-thin'), style: geo(g.prim) },
      h(Layer, { on: !!g.prim.w }, p.primary && v === 'bar' ? h(IconButton, { icon: p.primary.icon || 'plus', label: p.primary.label, variant: 'plain', size: 'lg', onClick: p.primary.onClick, disabled: p.primary.disabled, className: 'sg-cl-circlebtn' }) : null)),
    bloomLayer,
    h('div', { className: pieceCls('trail'), style: geo(g.trail) }, trailLayer),
    h('div', { className: pieceCls('lead'), style: geo(g.lead) }, tabsLayer, circleLayer, switcherLayer));
}
