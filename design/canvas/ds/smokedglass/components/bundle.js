/* @ds-bundle: {"format":4,"namespace":"SmokedGlass","components":[{"name":"Screen"},{"name":"Cluster"},{"name":"TopEdge"},{"name":"Dock"},{"name":"BottomBar"},{"name":"SearchField"},{"name":"Menu"},{"name":"Message"},{"name":"AgentSteps"},{"name":"AgentStatus"},{"name":"ItemCard"},{"name":"AgentRequest"},{"name":"AgentQuestion"},{"name":"AgentPrompt"},{"name":"Checkbox"},{"name":"ChoiceList"},{"name":"TaskRow"},{"name":"EventRow"},{"name":"WeekStrip"},{"name":"TimeGrid"},{"name":"MonthGrid"},{"name":"WikiDoc"},{"name":"SourceCard"},{"name":"WikiTimeline"},{"name":"PlaceChip"},{"name":"MapPreview"},{"name":"Glass"},{"name":"Button"},{"name":"IconButton"},{"name":"SegmentedControl"},{"name":"Switch"},{"name":"Composer"},{"name":"ListGroup"},{"name":"ListRow"},{"name":"TabBar"},{"name":"Badge"},{"name":"Icon"}]} */
(function () {
  var R = window.React, h = R.createElement;

  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function omit(p, keys) {
    var o = {};
    for (var k in p) if (Object.prototype.hasOwnProperty.call(p, k) && keys.indexOf(k) < 0) o[k] = p[k];
    return o;
  }
  function useControlled(value, defaultValue) {
    var s = R.useState(defaultValue);
    var controlled = value !== undefined;
    return [controlled ? value : s[0], function (v) { if (!controlled) s[1](v); }];
  }

  /* ---------- Icon ---------- */
  var PATHS = {
    'plus': 'M12 5v14M5 12h14',
    'arrow-up': 'M12 19V5M6 11l6-6 6 6',
    'chevron-right': 'M9 5l7 7-7 7',
    'chevron-left': 'M15 5l-7 7 7 7',
    'xmark': 'M6 6l12 12M18 6L6 18',
    'checkmark': 'M5 12.5l4.5 4.5L19 7',
    'search': 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5L20 20',
    'mic': 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM6 11a6 6 0 0 0 12 0M12 17v4',
    'bubble': 'M4 12c0-4 3.6-7 8-7s8 3 8 7-3.6 7-8 7c-1.2 0-2.3-.2-3.3-.6L4 20l1.2-3.6C4.4 15.2 4 13.7 4 12z',
    'folder': 'M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z',
    'gear': 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23L5.46 5.46',
    'bell': 'M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0',
    'person': 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5c1-3.5 4-5.5 7.5-5.5s6.5 2 7.5 5.5',
    'sparkle': 'M12 3.5l1.9 5.2 5.1 1.9-5.1 1.9L12 17.7l-1.9-5.2L5 10.6l5.1-1.9z',
    'square-pencil': 'M19 13v5.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4 18.5v-12A1.5 1.5 0 0 1 5.5 5H11M17.5 3.5l3 3L12 15l-4 1 1-4z',
    'ellipsis': 'M6 12h.01M12 12h.01M18 12h.01',
    'calendar': 'M5.5 5.5h13a1.5 1.5 0 0 1 1.5 1.5v11.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5V7a1.5 1.5 0 0 1 1.5-1.5zM4 10h16M8.5 3.5v4M15.5 3.5v4',
    'checklist': 'M4 6.5l1.5 1.5L8.5 5M4 12.5l1.5 1.5 3-3M4 18.5L5.5 20l3-3M11.5 7h8.5M11.5 13h8.5M11.5 19h8.5',
    'book': 'M12 6.5c-1.8-1.3-4.3-2-7.5-2v13c3.2 0 5.7.7 7.5 2 1.8-1.3 4.3-2 7.5-2v-13c-3.2 0-5.7.7-7.5 2zM12 6.5v13',
    'filter': 'M4 6h16M7 12h10M10 18h4',
    'share': 'M12 15V3.5M8 7.5l4-4 4 4M7 11H6a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 6 20h12a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 18 11h-1',
    'trash': 'M4.5 6.5h15M9.5 6.5V4.5h5v2M6.5 6.5l1 13h9l1-13M10 10.5v6M14 10.5v6',
    'pin': 'M9 4h6l-1 5 3 3v1.5H7V12l3-3zM12 13.5V20',
    'location': 'M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    'map': 'M9 5L3.5 7v12L9 17l6 2 5.5-2V5L15 7zM9 5v12M15 7v12',
    'directions': 'M12 3l9 9-9 9-9-9zM9.5 13.5V11h5M12.5 8.5L15 11l-2.5 2.5',
    'clock': 'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM12 7.5V12l3 2',
    'doc': 'M7 3.5h6.5l4.5 4.5v12.5H7zM13.5 3.5V8H18M9.5 12.5h6M9.5 16h6',
    'photo': 'M4.5 6.5h15v11h-15zM4.5 15l4-4 3.5 3.5 2.5-2.5 5 4.5M15.5 10a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z',
    'quote': 'M6 17.5c2.2-.8 3.5-2.6 3.5-5.5V7H5v5h4.5M15 17.5c2.2-.8 3.5-2.6 3.5-5.5V7H14v5h4.5',
    'globe': 'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5s1.2-6.1 3.5-8.5z'
  };
  function Icon(p) {
    var size = p.size || 22;
    var rest = omit(p, ['name', 'size', 'className', 'strokeWidth']);
    return h('svg', Object.assign({
      width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      strokeWidth: p.name === 'ellipsis' ? 3 : (p.strokeWidth || 1.75), strokeLinecap: 'round', strokeLinejoin: 'round',
      'aria-hidden': p['aria-label'] ? undefined : true, className: cx('sg-icon', p.className)
    }, rest), h('path', { d: PATHS[p.name] || '' }));
  }
  Icon.names = Object.keys(PATHS);

  /* ---------- Glass ---------- */
  function Glass(p) {
    var as = p.as || 'div';
    var rest = omit(p, ['as', 'variant', 'shape', 'className', 'children']);
    return h(as, Object.assign({}, rest, {
      className: cx('sg-glass', 'sg-glass-' + (p.variant || 'regular'), 'sg-shape-' + (p.shape || 'rounded'), p.className)
    }), p.children);
  }

  /* ---------- Button ---------- */
  function Button(p) {
    var v = p.variant || 'glass', size = p.size || 'md';
    var rest = omit(p, ['variant', 'size', 'icon', 'className', 'children', 'destructive', 'kbd']);
    return h('button', Object.assign({ type: 'button', 'aria-keyshortcuts': p.kbd ? kbdAria(p.kbd) : undefined }, rest, {
      className: cx('sg-btn', 'sg-btn-' + v, 'sg-btn-' + size, p.destructive && 'sg-btn-destructive',
        v === 'glass' && 'sg-glass sg-glass-regular', size === 'sm' ? 'subheadline' : 'headline', p.className)
    }), p.icon ? h(Icon, { name: p.icon, size: size === 'lg' ? 22 : 18 }) : null, p.children ? h('span', null, p.children) : null,
      p.kbd ? h('kbd', { className: 'sg-kbd', 'aria-hidden': true }, p.kbd) : null);
  }
  function kbdAria(k) { return ({ '⏎': 'Enter', 'esc': 'Escape', 'Esc': 'Escape', '⌘K': 'Meta+K', '⌘N': 'Meta+N' })[k] || k; }

  /* ---------- IconButton ---------- */
  function IconButton(p) {
    var v = p.variant || 'glass', size = p.size || 'md';
    var rest = omit(p, ['variant', 'size', 'icon', 'className', 'label']);
    return h('button', Object.assign({ type: 'button', 'aria-label': p.label, title: p.label }, rest, {
      className: cx('sg-iconbtn', 'sg-iconbtn-' + size, 'sg-iconbtn-' + v,
        v === 'glass' && 'sg-glass sg-glass-thin', v === 'smoke' && 'sg-glass sg-glass-smoke', p.className)
    }), h(Icon, { name: p.icon, size: size === 'sm' ? 18 : size === 'lg' ? 24 : 21 }));
  }

  /* ---------- SegmentedControl ---------- */
  function SegmentedControl(p) {
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

  /* ---------- Switch ---------- */
  function Switch(p) {
    var st = useControlled(p.checked, !!p.defaultChecked);
    return h('button', {
      type: 'button', role: 'switch', 'aria-checked': !!st[0], 'aria-label': p['aria-label'], disabled: p.disabled,
      className: cx('sg-switch', st[0] && 'is-on', p.className),
      onClick: function () { var n = !st[0]; st[1](n); if (p.onChange) p.onChange(n); }
    }, h('span', { className: 'sg-switch-knob' }));
  }

  /* ---------- Composer ---------- */
  function Composer(p) {
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

  /* ---------- ListGroup / ListRow ---------- */
  function ListGroup(p) {
    return h('section', { className: cx('sg-list', p.className) },
      p.header ? h('h3', { className: 'sg-list-header footnote' }, p.header) : null,
      h('div', { className: cx('sg-list-body', p.glass === false ? 'sg-list-solid' : 'sg-glass sg-glass-thick') }, p.children),
      p.footer ? h('p', { className: 'sg-list-footer footnote' }, p.footer) : null);
  }
  function ListRow(p) {
    var acc = p.accessory === undefined ? (p.onClick ? 'chevron' : null) : p.accessory;
    var Tag = p.onClick ? 'button' : 'div';
    return h(Tag, {
      type: p.onClick ? 'button' : undefined, onClick: p.onClick,
      className: cx('sg-row', p.onClick && 'is-action', p.destructive && 'is-destructive', p.className)
    },
      p.icon ? h('span', { className: 'sg-row-tile', style: { background: 'var(--system-' + (p.tint || 'blue') + ')' } },
        typeof p.icon === 'string' ? h(Icon, { name: p.icon, size: 17, strokeWidth: 2 }) : p.icon) : null,
      h('span', { className: 'sg-row-main' },
        h('span', { className: 'sg-row-title body' }, p.title),
        p.subtitle ? h('span', { className: 'sg-row-sub subheadline' }, p.subtitle) : null),
      p.detail ? h('span', { className: 'sg-row-detail body' }, p.detail) : null,
      acc === 'chevron' ? h(Icon, { name: 'chevron-right', size: 16, strokeWidth: 2.25, className: 'sg-row-chev' }) : acc);
  }

  /* ---------- TabBar ---------- */
  function TabBar(p) {
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


  /* ---------- Screen (responsive shell with a bottom-only dock) ---------- */
  function Pane(p) {
    return h(p.as || 'section', { className: cx('sg-pane', p.className), 'aria-label': p.label },
      h('div', { className: 'sg-pane-scroll' },
        (p.title || p.eyebrow) ? h('header', { className: 'sg-pane-header' },
          p.eyebrow ? h('p', { className: 'sg-pane-eyebrow footnote' }, p.eyebrow) : null,
          p.title ? h('h1', { className: 'sg-pane-title large-title' }, p.title) : null) : null,
        h('div', { className: 'sg-pane-content' }, p.children)),
      p.dock ? h('div', { className: 'sg-dock' }, p.dock) : null);
  }
  function Screen(p) {
    return h('div', { className: cx('sg-screen', p.aside && 'has-aside', p.hinge && 'is-hinged', p.className), style: p.style },
      p.aside ? h(Pane, { as: 'aside', className: 'sg-pane-aside', title: p.asideTitle, eyebrow: p.asideEyebrow, dock: p.asideDock, label: p.asideTitle }, p.aside) : null,
      h(Pane, { as: 'main', className: 'sg-pane-main', title: p.title, eyebrow: p.eyebrow, dock: p.dock, label: p.title }, p.children));
  }

  /* ---------- BottomBar ---------- */
  function BottomBar(p) {
    function group(nodes, side) {
      if (!nodes) return h('span', { className: 'sg-bb-spacer' });
      return h('div', { className: 'sg-bb-group sg-bb-' + side + ' sg-glass sg-glass-regular sg-shape-pill' }, nodes);
    }
    return h('div', { className: cx('sg-bottombar', p.className), role: 'toolbar', 'aria-label': p['aria-label'] || 'Actions' },
      group(p.leading, 'leading'),
      p.center ? h('div', { className: 'sg-bb-center' }, p.center) : h('span', { className: 'sg-bb-fill' }),
      group(p.trailing, 'trailing'));
  }


  /* ---------- Menu (opens upward from its trigger) ---------- */
  function Menu(p) {
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

  /* ---------- SearchField (query + capture) ---------- */
  function SearchField(p) {
    var kind = p.kind || 'query';
    var st = useControlled(p.value, p.defaultValue || '');
    var has = String(st[0] || '').length > 0;
    function set(v) { st[1](v); if (p.onChange) p.onChange(v); }
    function submit() { if (!has) return; if (p.onSubmit) p.onSubmit(st[0]); if (kind === 'capture') set(''); }
    return h('div', { className: cx('sg-field sg-glass sg-glass-regular sg-shape-pill', 'sg-field-' + kind, p.className) },
      h(Icon, { name: kind === 'query' ? 'search' : 'plus', size: 19, className: 'sg-field-icon' }),
      h('input', { className: 'sg-field-input body', type: kind === 'query' ? 'search' : 'text', value: st[0], autoFocus: p.autoFocus,
        placeholder: p.placeholder || (kind === 'query' ? 'Search' : 'Add…'), 'aria-label': p.placeholder || (kind === 'query' ? 'Search' : 'Add'),
        enterKeyHint: kind === 'query' ? 'search' : 'done',
        onChange: function (e) { set(e.target.value); },
        onKeyDown: function (e) { if (e.key === 'Enter') { e.preventDefault(); submit(); } if (e.key === 'Escape' && p.onCancel) p.onCancel(); } }),
      has && kind === 'query' ? h(IconButton, { icon: 'xmark', label: 'Clear', variant: 'fill', size: 'sm', onClick: function () { set(''); } }) : null,
      has && kind === 'capture' ? h(IconButton, { icon: 'arrow-up', label: 'Add', variant: 'accent', size: 'sm', onClick: submit }) : null);
  }

  /* ---------- Dock: arranges what a module contributes ---------- */
  var MAX_ACTIONS = { compact: 1, medium: 2, wide: 3 };
  function useSizeClass(ref, forced) {
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
  function Dock(p) {
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



  /* ================= Cluster: the bottom cluster, with morphing glass ================= */
  function useBox(ref, prop) {
    var st = R.useState(0);
    R.useLayoutEffect(function () {
      var el = ref.current; if (!el || !window.ResizeObserver) return;
      var read = function () { var v = prop === 'w' ? el.getBoundingClientRect().width : el.scrollHeight; if (Math.abs(v - st[0]) > 0.5) st[1](v); };
      read();
      var ro = new ResizeObserver(read); ro.observe(el); return function () { ro.disconnect(); };
    });
    return st[0];
  }
  function geo(g, extra) {
    return Object.assign({ left: g.l + 'px', bottom: g.b + 'px', width: Math.max(0, g.w) + 'px', height: Math.max(0, g.h) + 'px', borderRadius: (g.r != null ? g.r : Math.min(g.h, g.w) / 2) + 'px', opacity: g.o == null ? 1 : g.o }, extra || null);
  }
  function Layer(p) {
    return h('div', { className: cx('sg-cl-layer', p.anchor === 'bottom' && 'is-bottom', !p.on && 'is-off', p.className), 'aria-hidden': p.on ? undefined : true, inert: p.on ? undefined : '', ref: p.innerRef }, p.children);
  }

  /* Accessory / sheet given as plain data (for hosts that pass props, not nodes) */
  function fromSpec(x) {
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
    if (k === 'card') return h('section', { key: key, className: cx('sg-request', x.dismiss && 'has-exit'), 'aria-label': x.title },
      h('div', { className: 'sg-request-titles' }, h('h2', { className: 'title-3' }, x.title), x.subtitle ? h('p', { className: 'subheadline' }, x.subtitle) : null),
      (x.lines || []).length ? h('div', { className: 'sg-card-lines' }, x.lines.map(function (l, i) { return h('span', { key: i, className: 'subheadline sg-card-line' }, h(Icon, { name: l.icon || 'clock', size: 18 }), l.text); })) : null,
      (x.actions || x.dismiss) ? h('div', { className: 'sg-request-foot' }, h('span'), h('div', { className: 'sg-request-actions' }, actionButtons(x.actions, x.dismiss))) : null);
    return null;
  }
  function isTextEntry(el) {
    if (!el || !el.tagName) return false;
    var t = el.tagName.toLowerCase();
    return t === 'textarea' || el.isContentEditable || (t === 'input' && !/^(button|checkbox|radio|submit|reset|range|color)$/.test(el.type || ''));
  }
  function Cluster(p) {
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
      var tabW = Math.min(W - H - G, tabs.length * 58 + 8);
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
    var tabsLayer = h(Layer, { on: v === 'bar' ? (!detail && !g.min) : !!g.flatTabs },
      h('div', { className: 'sg-cl-tabs', role: 'tablist' }, tabs.map(function (t) {
        var on = t.id === cur.id;
        return h('button', { key: t.id, type: 'button', role: 'tab', 'aria-selected': on, className: cx('sg-tab', on && 'is-on'), onClick: function () { if (swOpen) setSw(false); if (p.onTab) p.onTab(t.id); } },
          h('span', { className: 'sg-tab-icon' }, h(Icon, { name: t.icon, size: 22, strokeWidth: on ? 2 : 1.75 }), t.badge ? h('span', { className: 'sg-tab-badge' }, t.badge) : null),
          h('span', { className: 'caption-1' }, t.label));
      })));
    var circleLayer = h(Layer, { on: v === 'bar' ? (detail || g.min) : !g.flatTabs },
      (v === 'row' && bloom === 'lead') ? h(IconButton, { icon: 'xmark', label: 'Close', variant: 'plain', size: 'lg', onClick: function () { setBloom('none'); }, className: 'sg-cl-circlebtn' }) :
      leadIcon === 'back'
        ? h(IconButton, { icon: 'chevron-left', label: (p.back && p.back.label) || 'Back', variant: 'plain', size: 'lg', onClick: p.back && p.back.onClick, className: 'sg-cl-circlebtn' })
        : leadIcon === 'module'
          ? h(IconButton, { icon: cur.icon, label: 'Go to… (now ' + cur.label + ')', variant: 'plain', size: 'lg', onClick: function () { setBloom('lead'); }, className: 'sg-cl-circlebtn sg-cl-cur' })
          : h(IconButton, { icon: cur.icon, label: 'Show tabs (' + cur.label + ')', variant: 'plain', size: 'lg', onClick: p.onExpand, className: 'sg-cl-circlebtn sg-cl-cur' }));
    var switcherLayer = null;

    // ---- trail piece
    var trailRow = v === 'row' ? h(Layer, { on: trailKind !== 'none' },
        bloom === 'trail' ? h(IconButton, { icon: 'xmark', label: 'Close', variant: 'plain', size: 'lg', onClick: function () { setBloom('none'); }, className: 'sg-cl-circlebtn' })
        : trailKind === 'primary' ? h(IconButton, { icon: p.primary.icon || 'plus', label: p.primary.label, variant: 'plain', size: 'lg', onClick: p.primary.onClick, className: 'sg-cl-circlebtn sg-cl-prim' })
        : trailKind === 'more' ? h(IconButton, { icon: 'ellipsis', label: 'More', variant: 'plain', size: 'lg', onClick: function () { setBloom('trail'); }, className: 'sg-cl-circlebtn', 'aria-haspopup': 'menu', 'aria-expanded': false })
        : trailKind === 'actions' ? h('div', { className: 'sg-cl-actions' }, flatItems.slice(0, 4).map(function (a) { return h(IconButton, { key: a.id || a.label, icon: a.icon || 'plus', label: a.label, title: a.label, variant: 'plain', onClick: a.onClick, className: a.destructive ? 'is-destructive' : undefined }); }),
            flatItems.length > 4 ? h(Menu, { items: flatItems.slice(4) }) : null) : null) : null;
    // ---- bloom: items stack up from the circle over a dimmed, blurred screen
    var bloomItems = bloom === 'lead' ? tabs.map(function (t) {
        return { id: t.id, label: t.label, icon: t.icon, badge: t.badge, on: t.id === cur.id, onClick: function () { setBloom('none'); if (p.onTab && t.id !== cur.id) p.onTab(t.id); } };
      })
      : bloom === 'trail' ? (p.primary ? [Object.assign({ id: '__primary' }, p.primary)] : []).concat(actions).concat(p.more || []).map(function (a) {
        return { id: a.id || a.label, label: a.label, icon: a.icon || 'plus', destructive: a.destructive, onClick: function () { setBloom('none'); if (a.onClick) a.onClick(); } };
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
          return h('button', { key: it.id, type: 'button', role: 'menuitem', tabIndex: open ? 0 : -1, 'aria-label': it.label, 'aria-current': it.on ? 'page' : undefined,
              className: cx('sg-tab', it.on && 'is-on', it.destructive && 'is-destructive'),
              style: { transitionDelay: (open ? 60 + (n - 1 - i) * 24 : 0) + 'ms' }, onClick: it.onClick },
            h('span', { className: 'sg-tab-icon' }, h(Icon, { name: it.icon, size: 22, strokeWidth: it.on ? 2 : 1.75 }), it.badge ? h('span', { className: 'sg-tab-badge' }, it.badge) : null),
            p.bloomLabels === false ? null : h('span', { className: 'caption-1', 'aria-hidden': true }, it.label));
        }))) : null;
    var trailLayer = v === 'row' ? trailRow : h(Layer, { on: trailKind !== 'none' },
      trailKind === 'search' ? h(IconButton, { icon: 'search', label: (p.search && p.search.label) || 'Search', variant: 'plain', size: 'lg', onClick: p.search && p.search.onOpen, className: 'sg-cl-circlebtn' })
      : trailKind === 'primary' ? h(IconButton, { icon: p.primary.icon || 'plus', label: p.primary.label, variant: 'plain', size: 'lg', onClick: p.primary.onClick, className: 'sg-cl-circlebtn sg-cl-prim' })
      : trailKind === 'more' ? h(Menu, { items: actions.map(function (a) { return { id: a.id, label: a.label, icon: a.icon, onClick: a.onClick, destructive: a.destructive }; }).concat(p.more || []), className: 'sg-cl-circlebtn' })
      : trailKind === 'actions' ? h('div', { className: 'sg-cl-actions' }, actions.slice(0, 3).map(function (a) { return h(IconButton, { key: a.id, icon: a.icon, label: a.label, variant: 'plain', onClick: a.onClick }); }),
          (actions.length > 3 || (p.more && p.more.length)) ? h(Menu, { items: actions.slice(3).concat(p.more || []) }) : null)
      : null);

    var pieceCls = function (k, extra) { return cx('sg-cl-piece sg-glass', extra || 'sg-glass-regular', 'sg-cl-' + k); };
    return h('div', { ref: rootRef, className: cx('sg-cluster', 'is-' + v, p.className), style: { height: total + 'px' }, role: 'region', 'aria-label': p['aria-label'] || 'Controls' },
      h('div', { className: cx(pieceCls('acc', sheet ? 'sg-glass-thick' : 'sg-glass-regular'), bloomSearch && 'is-raised'), style: geo(g.acc),
          // only typing changes the bar's shape (the keyboard is the cue); tapping a switcher or button never does
          onFocus: function (e) { setFocus(isTextEntry(e.target)); }, onBlur: function (e) { if (!e.currentTarget.contains(e.relatedTarget) || !isTextEntry(e.relatedTarget)) setFocus(false); } },
        h(Layer, { on: acc && !sheet, anchor: 'bottom', innerRef: accRef, className: 'sg-cl-acclayer' }, accNode),
        h(Layer, { on: sheet, anchor: 'bottom', innerRef: sheetRef, className: 'sg-cl-sheetlayer' }, sheetNode)),
      h('div', { className: pieceCls('prim', 'sg-glass-thin'), style: geo(g.prim) },
        h(Layer, { on: !!g.prim.w }, p.primary && v === 'bar' ? h(IconButton, { icon: p.primary.icon || 'plus', label: p.primary.label, variant: 'plain', size: 'lg', onClick: p.primary.onClick, className: 'sg-cl-circlebtn' }) : null)),
      bloomLayer,
      h('div', { className: pieceCls('trail'), style: geo(g.trail) }, trailLayer),
      h('div', { className: pieceCls('lead'), style: geo(g.lead) }, tabsLayer, circleLayer, switcherLayer));
  }
  function TopEdge(p) {
    return h('div', { className: cx('sg-topedge', p.show && 'is-on', p.className), 'aria-hidden': true },
      h('span', { className: 'headline sg-topedge-title' }, p.title));
  }

  /* ================= Selection: one tick for every checkbox and choice ================= */
  function Tick(p) {
    return h('span', { className: cx('sg-tick', p.on && 'is-on'), 'aria-hidden': true },
      h('svg', { width: 22, height: 22, viewBox: '0 0 22 22' },
        p.on ? h(R.Fragment, null, h('circle', { cx: 11, cy: 11, r: 11, className: 'sg-tick-fill' }),
                 h('path', { d: 'M6.5 11.5l3 3 6-6.5', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' }))
             : h('circle', { cx: 11, cy: 11, r: 10.25, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 })));
  }
  function Checkbox(p) {
    var st = useControlled(p.checked, !!p.defaultChecked);
    return h('label', { className: cx('sg-check', p.children && 'has-label', p.className) },
      h('input', { type: 'checkbox', className: 'sg-vh', checked: !!st[0], disabled: p.disabled, 'aria-label': p.children ? undefined : p.label,
        onChange: function (e) { st[1](e.target.checked); if (p.onChange) p.onChange(e.target.checked); } }),
      h(Tick, { on: !!st[0] }),
      p.children ? h('span', { className: cx('sg-check-label body', st[0] && p.strike && 'is-struck') }, p.children) : null);
  }
  var choiceSeq = 0;
  function ChoiceList(p) {
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

  /* ================= Agent conversation ================= */
  function Message(p) {
    var from = p.by || p.from || 'agent';
    if (from === 'system') return h('p', { className: cx('sg-msg-system footnote', p.className) }, p.children);
    return h('div', { className: cx('sg-msg', 'sg-msg-' + from, 'body', p.className) }, p.children);
  }
  function Spinner() {
    return h('svg', { className: 'sg-spin', width: 18, height: 18, viewBox: '0 0 18 18', 'aria-hidden': true },
      h('circle', { cx: 9, cy: 9, r: 7, fill: 'none', stroke: 'var(--fill-control)', strokeWidth: 2 }),
      h('path', { d: 'M9 2a7 7 0 0 1 7 7', fill: 'none', stroke: 'var(--accent-text)', strokeWidth: 2, strokeLinecap: 'round' }));
  }
  var STEP_TRAIL = {
    done: function () { return h('span', { className: 'sg-step-ok' }, h(Icon, { name: 'checkmark', size: 18, strokeWidth: 2 }), h('span', { className: 'sg-vh' }, 'Done')); },
    running: function () { return h('span', { className: 'sg-step-run' }, h(Spinner), h('span', { className: 'sg-vh' }, 'In progress')); },
    waiting: function () { return h('span', { className: 'sg-step-wait footnote' }, 'Needs you'); },
    failed: function () { return h('span', { className: 'sg-step-fail footnote' }, h(Icon, { name: 'xmark', size: 14, strokeWidth: 2.5 }), 'Failed'); }
  };
  function AgentSteps(p) {
    return h('ol', { className: cx('sg-steps', p.className), 'aria-label': p['aria-label'] || 'Agent steps' },
      (p.steps || []).map(function (st, i) {
        return h('li', { key: i, className: cx('sg-step', 'is-' + (st.status || 'done')) },
          h('span', { className: 'sg-step-icon' }, h(Icon, { name: st.icon || 'sparkle', size: 18 })),
          h('span', { className: 'sg-step-label subheadline' }, st.label),
          (STEP_TRAIL[st.status || 'done'] || STEP_TRAIL.done)());
      }));
  }
  function AgentStatus(p) {
    var tone = p.tone || 'working';
    return h('span', { className: cx('sg-status', 'is-' + tone, 'subheadline', p.className), role: 'status' },
      h('span', { className: 'sg-status-dot', 'aria-hidden': true }), p.children);
  }
  var DARK_GLYPH = { orange: 1, yellow: 1, green: 1, mint: 1 };
  function Tile(p) {
    return h('span', { className: cx('sg-tile', 'sg-tile-' + (p.size || 'md')), style: { background: 'var(--system-' + (p.tint || 'blue') + ')', color: DARK_GLYPH[p.tint] ? '#1d1d1f' : '#ffffff' } },
      h(Icon, { name: p.icon, size: p.size === 'lg' ? 20 : 18, strokeWidth: 2 }));
  }
  function ItemCard(p) {
    var Tag = p.href ? 'a' : (p.onClick ? 'button' : 'div');
    return h(Tag, { href: p.href, type: Tag === 'button' ? 'button' : undefined, onClick: p.onClick, className: cx('sg-item', p.className) },
      h(Tile, { icon: p.icon || 'book', tint: p.tint || 'teal', size: 'lg' }),
      h('span', { className: 'sg-item-main' }, h('span', { className: 'headline' }, p.title), p.subtitle ? h('span', { className: 'footnote sg-item-sub' }, p.subtitle) : null),
      (p.href || p.onClick) ? h(Icon, { name: 'chevron-right', size: 16, strokeWidth: 2.25, className: 'sg-row-chev' }) : null);
  }
  function actionButtons(actions, dismiss) {
    var out = (actions || []).map(function (a, i) {
      return h(Button, { key: i, variant: a.variant || 'gray', destructive: a.destructive, onClick: a.onClick, size: a.size, kbd: a.kbd }, a.label);
    });
    // the way out without answering: a circle at the end of the row, where the bar's Back / module circle sits
    // with a keyboard, the exit shows its key (esc) in place of the glyph
    if (dismiss) out.push(dismiss.kbd
      ? h('button', { key: '__exit', type: 'button', 'aria-label': dismiss.label || 'Later', title: dismiss.label || 'Later', 'aria-keyshortcuts': kbdAria(dismiss.kbd), onClick: dismiss.onClick, className: 'sg-iconbtn sg-iconbtn-fill sg-request-exit is-kbd' }, h('kbd', { className: 'sg-kbd' }, dismiss.kbd))
      : h(IconButton, { key: '__exit', icon: dismiss.icon || 'xmark', label: dismiss.label || 'Later', title: dismiss.label || 'Later', variant: 'fill', onClick: dismiss.onClick, className: 'sg-request-exit' }));
    return out;
  }
  // swipe down on a focus card = its dismiss
  function useSwipeDown(dismiss) {
    var y0 = R.useRef(null);
    if (!dismiss || !dismiss.onClick) return {};
    return {
      onPointerDown: function (e) { if (e.pointerType !== 'mouse') y0.current = e.clientY; },
      onPointerUp: function (e) { if (y0.current != null && e.clientY - y0.current > 60) dismiss.onClick(); y0.current = null; },
      onPointerCancel: function () { y0.current = null; }
    };
  }
  function AgentRequest(p) {
    var sw = useSwipeDown(p.dismiss);
    return h('section', Object.assign({ className: cx('sg-request sg-glass sg-glass-thick', p.dismiss && 'has-exit', p.className), 'aria-label': p['aria-label'] || 'Permission request' }, sw),
      h('div', { className: 'sg-request-head' },
        h(Tile, { icon: p.icon || 'sparkle', tint: p.tint || 'blue', size: 'lg' }),
        h('div', { className: 'sg-request-titles' },
          h('h2', { className: 'headline' }, p.title),
          p.description ? h('p', { className: 'footnote' }, p.description) : null)),
      p.detail ? h('div', { className: 'sg-request-detail' }, Array.isArray(p.detail)
        ? p.detail.map(function (line, i) { return h('span', { key: i, className: i === 0 ? 'headline' : i === 1 ? 'subheadline' : 'footnote sg-item-sub' }, line); })
        : p.detail) : null,
      p.remember ? h('div', { className: 'sg-request-remember' }, h('span', { className: 'subheadline' }, p.remember), h(Switch, { 'aria-label': p.remember, defaultChecked: p.rememberDefault })) : null,
      h('div', { className: 'sg-request-foot' },
        p.hints ? h('span', { className: 'sg-hints footnote' }, p.hints.map(function (k, i) { return h('span', { key: i }, h('kbd', null, k.key), ' ', k.label); })) : h('span'),
        h('div', { className: 'sg-request-actions' }, actionButtons(p.actions, p.dismiss))));
  }
  function AgentQuestion(p) {
    var sw = useSwipeDown(p.dismiss);
    return h('form', Object.assign({ className: cx('sg-request sg-question sg-glass sg-glass-thick', p.dismiss && 'has-exit', p.className), 'aria-label': p['aria-label'] || 'Question from the agent',
        onSubmit: function (e) { e.preventDefault(); } }, sw),
      h('div', { className: 'sg-question-head' },
        h('h2', { className: 'headline' }, p.title),
        p.progress ? h('span', { className: 'footnote sg-question-progress' }, p.progress) : null),
      h(ChoiceList, { options: p.options, multiple: p.multiple, columns: p.columns, other: p.other, legend: p.hint, defaultValue: p.defaultValue, onChange: p.onChange }),
      h('div', { className: 'sg-request-foot' },
        p.onReplyInChat !== null ? h(Button, { variant: 'plain', size: 'sm', onClick: p.onReplyInChat }, 'Reply in Chat') : h('span'),
        h('div', { className: 'sg-request-actions' }, actionButtons(p.actions, p.dismiss))));
  }


  /* Inline marker for an agent request or question in the conversation; picking it moves it into the cluster */
  function AgentPrompt(p) {
    var state = p.state || 'pending';
    var Tag = state === 'pending' && p.onOpen ? 'button' : 'div';
    return h(Tag, { type: Tag === 'button' ? 'button' : undefined, onClick: state === 'pending' ? p.onOpen : undefined, className: cx('sg-prompt', 'is-' + state, p.className) },
      h(Tile, { icon: state === 'done' ? 'checkmark' : (p.icon || 'sparkle'), tint: state === 'done' ? 'green' : (p.tint || 'blue') }),
      h('span', { className: 'sg-prompt-main' },
        h('span', { className: 'footnote sg-prompt-kind' }, state === 'done' ? (p.doneLabel || 'Answered') : state === 'focused' ? 'Answering below' : (p.kind || 'Question')),
        h('span', { className: 'headline' }, p.title),
        state === 'done' && p.answer ? h('span', { className: 'subheadline sg-prompt-answer' }, p.answer) : null),
      state === 'pending' ? h('span', { className: 'sg-prompt-cta subheadline' }, p.cta || 'Answer') : null);
  }

  /* ================= Module rows ================= */
  function TaskRow(p) {
    var st = useControlled(p.done, !!p.defaultDone);
    return h('div', { className: cx('sg-row sg-task', st[0] && 'is-done', p.className) },
      h(Checkbox, { checked: !!st[0], label: st[0] ? 'Mark ' + p.title + ' as not done' : 'Mark ' + p.title + ' as done',
        onChange: function (v) { st[1](v); if (p.onToggle) p.onToggle(v); } }),
      h('span', { className: 'sg-row-main' },
        h('span', { className: 'sg-row-title body sg-task-title' }, p.title),
        p.meta ? h('span', { className: 'sg-row-sub footnote' }, p.meta) : null,
        (p.badge || p.agent) ? h('span', { className: 'sg-row-badges' }, p.agent ? h(Badge, { tone: 'accent', icon: 'sparkle' }, typeof p.agent === 'string' ? p.agent : 'From chat') : null, p.badge || null) : null));
  }
  function PlaceChip(p) {
    var Tag = p.onClick || p.href ? (p.href ? 'a' : 'button') : 'span';
    return h(Tag, { className: cx('sg-place', p.className), href: p.href, type: Tag === 'button' ? 'button' : undefined, onClick: p.onClick },
      h(Icon, { name: 'location', size: 15, strokeWidth: 2 }), h('span', null, p.name));
  }
  function EventRow(p) {
    return h('div', { className: cx('sg-row sg-event', p.suggested && 'is-suggested', p.className) },
      h('span', { className: 'sg-event-time subheadline' }, p.time),
      h('span', { className: 'sg-event-dot', style: { '--sg-tint': 'var(--system-' + (p.tint || 'blue') + ')' }, 'aria-hidden': true }),
      h('span', { className: 'sg-row-main' },
        h('span', { className: 'sg-row-title headline' }, p.title),
        p.meta ? h('span', { className: 'sg-row-sub footnote' }, p.meta) : null,
        (p.location || p.badge || p.agent || p.suggested) ? h('span', { className: 'sg-row-badges' },
          p.location ? h(PlaceChip, { name: p.location, onClick: p.onLocation || function () {} }) : null,
          p.agent ? h(Badge, { tone: 'accent', icon: 'sparkle' }, typeof p.agent === 'string' ? p.agent : 'Added by agent') : null,
          p.suggested ? h(Badge, null, 'Suggestion') : null,
          p.badge || null) : null));
  }
  function WeekStrip(p) {
    return h('div', { className: cx('sg-week', p.className), 'aria-label': p['aria-label'] || 'Week overview' },
      (p.days || []).map(function (d, i) {
        var on = i === p.selected;
        return h(p.onSelect ? 'button' : 'div', { key: i, type: p.onSelect ? 'button' : undefined, onClick: p.onSelect ? function () { p.onSelect(i); } : undefined, className: cx('sg-week-day', on && 'is-on'), 'aria-current': on ? 'date' : undefined },
          h('span', { className: 'caption-2 sg-week-name' }, d.name), h('span', { className: 'headline' }, d.num),
          h('span', { className: cx('sg-week-dot', d.busy && 'is-busy') }));
      }));
  }

  /* ================= Calendar views: TimeGrid (day / week) and MonthGrid ================= */
  function mins(t) { var a = String(t).split(':'); return (+a[0]) * 60 + (+(a[1] || 0)); }
  function lanes(evs) {
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
  function evStyle(tint) { return { '--sg-ev': 'var(--system-' + (tint || 'blue') + ')' }; }
  function TimeGrid(p) {
    var days = p.days || [], start = p.startHour == null ? 7 : p.startHour, end = p.endHour == null ? 23 : p.endHour, hh = p.hourHeight || 48;
    var one = days.length === 1, compact = !!p.compact;
    var hours = []; for (var t = start; t <= end; t++) hours.push(t);
    var spans = p.allDay || [];
    return h('div', { className: cx('sg-tg', one && 'is-day', compact && 'is-compact', p.className), style: { '--sg-cols': days.length, '--sg-hh': hh + 'px' }, role: 'grid', 'aria-label': p['aria-label'] || (one ? 'Day' : 'Week') },
      one ? null : h('div', { className: 'sg-tg-head', role: 'row' }, h('span'),
        days.map(function (d, i) {
          return h(p.onSelect ? 'button' : 'div', { key: i, type: p.onSelect ? 'button' : undefined, onClick: p.onSelect ? function () { p.onSelect(i); } : undefined, role: 'columnheader', className: cx('sg-tg-day', d.selected && 'is-on', d.today && 'is-today') },
            h('span', { className: 'caption-2' }, d.name), h('span', { className: 'headline sg-tg-num' }, d.num));
        })),
      spans.length ? h('div', { className: 'sg-tg-allday', role: 'row' }, h('span', { className: 'caption-2 sg-tg-adlabel' }, 'all-day'),
        h('div', { className: 'sg-tg-adlane' }, spans.map(function (a, i) {
          return h('div', { key: i, className: cx('sg-ev sg-ev-span', a.agent && 'is-agent', a.suggested && 'is-suggested'), style: Object.assign(evStyle(a.tint), { gridColumn: (a.from + 1) + ' / ' + (a.to + 2) }) },
            h('span', { className: 'footnote sg-ev-title' }, a.title));
        }))) : null,
      h('div', { className: 'sg-tg-body', style: { height: ((end - start) * hh) + 'px' } },
        h('div', { className: 'sg-tg-hours', 'aria-hidden': true }, hours.map(function (t) {
          return h('span', { key: t, className: 'caption-2 sg-tg-hour', style: { top: ((t - start) * hh) + 'px' } }, (t < 10 ? '0' : '') + t + ':00');
        })),
        h('div', { className: 'sg-tg-cols' },
          hours.map(function (t) { return h('span', { key: 'l' + t, className: 'sg-tg-line', style: { top: ((t - start) * hh) + 'px' } }); }),
          p.now != null ? h('span', { className: 'sg-tg-now', style: { top: ((mins(p.now.time) / 60 - start) * hh) + 'px', gridColumn: (p.now.day + 1) + '' } }) : null,
          days.map(function (d, i) {
            var evs = lanes((p.events || []).filter(function (e) { return (e.day || 0) === i; }));
            return h('div', { key: i, className: cx('sg-tg-col', d.selected && !one && 'is-on'), role: 'gridcell' },
              evs.map(function (e, k) {
                var top = (mins(e.start) / 60 - start) * hh, ht = Math.max(compact ? 18 : 22, (mins(e.end) - mins(e.start)) / 60 * hh - 2);
                var short = ht < 40;
                return h(e.onClick || p.onEvent ? 'button' : 'div', { key: k, type: 'button', onClick: e.onClick || (p.onEvent ? function () { p.onEvent(e); } : undefined),
                    className: cx('sg-ev', e.agent && 'is-agent', e.suggested && 'is-suggested', short && 'is-short'),
                    style: Object.assign(evStyle(e.tint), { top: top + 'px', height: ht + 'px', left: 'calc(' + (100 * e._lane / e._n) + '% + 1px)', width: 'calc(' + (100 / e._n) + '% - 3px)' }) },
                  h('span', { className: (compact ? 'caption-2' : 'footnote') + ' sg-ev-title' }, e.title),
                  !short && !compact ? h('span', { className: 'caption-1 sg-ev-meta' }, e.start + (e.place ? ' · ' + e.place : '')) : null);
              }));
          }))));
  }
  function MonthGrid(p) {
    var weeks = p.weeks || [], titles = !!p.titles;
    return h('div', { className: cx('sg-mg', titles && 'has-titles', p.className), role: 'grid', 'aria-label': p['aria-label'] || 'Month' },
      h('div', { className: 'sg-mg-head', role: 'row' }, (p.names || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']).map(function (n) { return h('span', { key: n, role: 'columnheader', className: 'caption-2' }, titles ? n : n.charAt(0)); })),
      weeks.map(function (w, r) {
        return h('div', { key: r, className: 'sg-mg-week', role: 'row' },
          w.days.map(function (d, i) {
            var Tag = p.onSelect ? 'button' : 'div';
            return h(Tag, { key: i, style: { gridColumn: String(i + 1) }, type: Tag === 'button' ? 'button' : undefined, onClick: p.onSelect ? function () { p.onSelect(r, i, d); } : undefined, role: 'gridcell', 'aria-selected': !!d.selected,
                className: cx('sg-mg-day', d.muted && 'is-muted', d.selected && 'is-on', d.today && 'is-today', d.span && 'has-span') },
              h('span', { className: 'subheadline sg-mg-num' }, d.num),
              titles ? h('span', { className: 'sg-mg-items' }, (d.items || []).slice(0, 3).map(function (it, k) {
                  return h('span', { key: k, className: cx('caption-1 sg-mg-item', it.suggested && 'is-suggested'), style: evStyle(it.tint) }, it.title);
                }), (d.items || []).length > 3 ? h('span', { className: 'caption-2 sg-mg-more' }, '+' + (d.items.length - 3)) : null)
                : h('span', { className: 'sg-mg-dots' }, (d.items || []).slice(0, 3).map(function (it, k) { return h('span', { key: k, className: 'sg-mg-dot', style: evStyle(it.tint) }); })));
          }),
          (w.spans || []).map(function (a, k) {
            return h('span', { key: 's' + k, className: cx('sg-mg-span', titles && 'caption-1'), style: Object.assign(evStyle(a.tint), { gridColumn: (a.from + 1) + ' / ' + (a.to + 2) }) }, titles ? a.title : null);
          }));
      }));
  }

  /* ================= Wiki: a page is structured data; every statement cites original source text ================= */
  var SOURCE_KIND = { conversation: { icon: 'bubble', label: 'Conversation' }, voice: { icon: 'mic', label: 'Voice note' }, document: { icon: 'doc', label: 'Document' }, web: { icon: 'globe', label: 'Web page' }, image: { icon: 'photo', label: 'Image' } };
  function sourceKind(src) { return SOURCE_KIND[(src && src.kind) || 'document'] || SOURCE_KIND.document; }
  function SourceTile(p) {
    var k = sourceKind(p.source);
    return h('span', { className: 'sg-src-tile', 'data-kind': (p.source && p.source.kind) || 'document' }, h(Icon, { name: k.icon, size: p.size || 18, strokeWidth: 2 }));
  }
  function citeNumbers(doc) {
    var n = {}, i = 0;
    function add(ids) { (ids || []).forEach(function (id) { if (!(id in n)) n[id] = ++i; }); }
    (doc.blocks || []).forEach(function (b) {
      (b.claims || []).forEach(function (c) { add(c.sources); });
      (b.items || []).forEach(function (c) { add(c.sources); });
    });
    return n;
  }
  function Cites(p) {
    var ids = p.sources || [];
    if (!ids.length) return h('button', { type: 'button', className: 'sg-cite is-missing', 'aria-label': 'No source yet', title: 'No source yet', onClick: p.onCite ? function () { p.onCite(null, p.claim); } : undefined }, '?');
    return h(R.Fragment, null, ids.map(function (id) {
      return h('button', { key: id, type: 'button', className: cx('sg-cite', p.activeSource === id && 'is-on'), 'aria-label': 'Source ' + p.numbers[id], onClick: p.onCite ? function () { p.onCite(id, p.claim); } : undefined }, p.numbers[id]);
    }));
  }
  function EmbedHead(p) {
    return h('div', { className: 'sg-wk-embed-head footnote' }, h(Icon, { name: p.icon, size: 14, strokeWidth: 2 }), h('span', null, p.from), p.detail ? h('span', { className: 'sg-wk-embed-detail' }, '· ' + p.detail) : null);
  }
  function WikiTimeline(p) {
    var days = []; (p.items || []).forEach(function (it) { var d = days[days.length - 1]; if (!d || d.day !== it.day) days.push(d = { day: it.day, items: [] }); d.items.push(it); });
    return h('ol', { className: 'sg-wk-timeline' }, days.map(function (d, i) {
      return h('li', { key: i, className: 'sg-wk-tl-day' }, h('span', { className: 'subheadline sg-wk-tl-date' }, d.day),
        h('ol', null, d.items.map(function (it, k) {
          return h('li', { key: k, className: cx('sg-wk-tl-item', it.suggested && 'is-suggested'), style: { '--sg-ev': 'var(--system-' + (it.tint || 'blue') + ')' } },
            h('span', { className: 'footnote sg-wk-tl-time' }, it.time), h('span', { className: 'sg-wk-tl-dot', 'aria-hidden': true }),
            h('span', { className: 'sg-wk-tl-main' }, h('span', { className: 'subheadline sg-wk-tl-title' }, it.title, it.agent ? h('span', { className: 'sg-wk-agent' }, ' ✦') : null),
              it.suggested ? h('span', { className: 'caption-1 sg-wk-tl-sub' }, 'Suggested · not booked') : (it.meta ? h('span', { className: 'caption-1 sg-wk-tl-sub' }, it.meta) : null)));
        })));
    }));
  }
  function WikiDoc(p) {
    var doc = p.doc || { blocks: [] }, sources = p.sources || {}, nums = citeNumbers(doc);
    var cite = function (ids, key) { return h(Cites, { sources: ids, numbers: nums, claim: key, onCite: p.onCite, activeSource: p.activeClaim === key ? p.activeSource : null }); };
    var blocks = (doc.blocks || []).slice(p.start || 0);
    return h('article', { className: cx('sg-wk', p.className) }, blocks.map(function (b, i) {
      var key = b.id || ('b' + i);
      if (b.type === 'heading') return h('h2', { key: key, className: 'title-3 sg-wk-h' }, b.text);
      if (b.type === 'paragraph') return h('p', { key: key, className: 'body sg-wk-p' }, b.claims.map(function (c, k) {
        var on = p.activeClaim === c.id;
        return h(R.Fragment, { key: c.id || k }, h('span', { className: cx('sg-claim', on && 'is-on', !(c.sources || []).length && 'is-unsourced') }, c.text), cite(c.sources, c.id), ' ');
      }));
      if (b.type === 'facts') return h('dl', { key: key, className: 'sg-wk-facts' }, b.items.map(function (f, k) {
        return h('div', { key: f.id || k, className: cx('sg-wk-fact', p.activeClaim === f.id && 'is-on') },
          h('dt', { className: 'subheadline' }, f.label),
          h('dd', { className: 'subheadline' }, f.place ? h(PlaceChip, { name: f.value, onClick: p.onPlace || function () {} }) : h('span', { className: 'sg-claim' + (p.activeClaim === f.id ? ' is-on' : '') }, f.value), cite(f.sources, f.id)));
      }));
      if (b.type === 'timeline') return h('section', { key: key, className: 'sg-wk-embed' }, h(EmbedHead, { icon: 'calendar', from: 'From Calendar', detail: b.range }), h(WikiTimeline, { items: b.items }));
      if (b.type === 'tasks') return h('section', { key: key, className: 'sg-wk-embed' }, h(EmbedHead, { icon: 'checklist', from: 'From Tasks', detail: b.list }),
        h('div', { className: 'sg-wk-tasks' }, b.items.map(function (t, k) { return h(TaskRow, { key: k, title: t.title, meta: t.meta, defaultDone: t.done, agent: t.agent }); })));
      if (b.type === 'place') return h('section', { key: key, className: 'sg-wk-embed' }, h(EmbedHead, { icon: 'location', from: 'Place', detail: b.name }),
        h(MapPreview, { height: b.height || 150, title: b.name, subtitle: b.subtitle, pins: b.pins, action: { label: 'Open Map', icon: 'map', onClick: p.onPlace } }));
      if (b.type === 'questions') return h('section', { key: key, className: 'sg-wk-embed' }, h(EmbedHead, { icon: 'sparkle', from: 'Open questions', detail: b.items.filter(function (q) { return q.status !== 'answered'; }).length + ' open' }),
        h('div', { className: 'sg-wk-qs' }, b.items.map(function (q, k) {
          var done = q.status === 'answered';
          return h('div', { key: q.id || k, className: cx('sg-wk-q', done && 'is-done') },
            h('span', { className: 'sg-wk-q-mark', 'aria-hidden': true }, done ? h(Icon, { name: 'checkmark', size: 14, strokeWidth: 2.5 }) : '?'),
            h('span', { className: 'sg-wk-q-main' }, h('span', { className: 'subheadline sg-wk-q-text' }, q.q),
              done ? h('span', { className: 'footnote sg-wk-q-answer' }, h('span', { className: 'sg-claim' + (p.activeClaim === q.id ? ' is-on' : '') }, q.answer), cite(q.sources, q.id)) : null),
            done ? null : h(Button, { variant: 'tinted', size: 'sm', onClick: p.onQuestion ? function () { p.onQuestion(q); } : undefined }, 'Answer'));
        })));
      if (b.type === 'sources') {
        var list = Object.keys(nums).sort(function (a, z) { return nums[a] - nums[z]; });
        var counts = {}; (doc.blocks || []).forEach(function (bb) { (bb.claims || []).concat(bb.items || []).forEach(function (c) { (c.sources || []).forEach(function (id) { counts[id] = (counts[id] || 0) + 1; }); }); });
        return h('section', { key: key, className: 'sg-wk-embed' }, h(EmbedHead, { icon: 'quote', from: 'Sources', detail: list.length + ' · every statement above points to one' }),
          h('ol', { className: 'sg-wk-sources' }, list.map(function (id) {
            var src = sources[id] || {}, k = sourceKind(src);
            return h('li', { key: id }, h('button', { type: 'button', className: 'sg-wk-src', onClick: p.onSource ? function () { p.onSource(id); } : undefined },
              h('span', { className: 'footnote sg-wk-src-n' }, nums[id]), h(SourceTile, { source: src }),
              h('span', { className: 'sg-wk-src-main' }, h('span', { className: 'subheadline sg-wk-src-title' }, src.title), h('span', { className: 'caption-1 sg-wk-src-meta' }, k.label + ' · ' + (src.when || '') + ' · cited ' + (counts[id] || 0) + '×'))));
          })));
      }
      return null;
    }));
  }
  function SourceCard(p) {
    var src = p.source || {}, k = sourceKind(src), ex = src.excerpt || '', span = p.span || '', at = span ? ex.indexOf(span) : -1;
    var sw = useSwipeDown(p.dismiss);
    return h('section', Object.assign({ className: cx('sg-request sg-src-card', p.dismiss && 'has-exit', p.className), 'aria-label': 'Source: ' + (src.title || '') }, sw),
      h('div', { className: 'sg-src-head' }, h(SourceTile, { source: src, size: 20 }),
        h('div', { className: 'sg-request-titles' }, h('h2', { className: 'headline' }, src.title), h('p', { className: 'footnote' }, k.label + (src.when ? ' · ' + src.when : '') + (src.where ? ' · ' + src.where : '')))),
      h('blockquote', { className: 'body sg-src-quote' }, src.speaker ? h('span', { className: 'footnote sg-src-speaker' }, src.speaker) : null,
        h('span', null, at >= 0 ? h(R.Fragment, null, ex.slice(0, at), h('mark', null, span), ex.slice(at + span.length)) : ex)),
      src.origin ? h('p', { className: 'footnote sg-src-origin' }, h(Icon, { name: 'globe', size: 13, strokeWidth: 2 }), h('span', null, String(src.origin).replace(/^https?:\/\//, '')), src.captured ? h('span', { className: 'sg-src-captured' }, '· saved ' + src.captured) : null) : null,
      p.claim ? h('p', { className: 'footnote sg-src-for' }, 'Cited for “', p.claim, '”') : null,
      (p.actions || p.dismiss) ? h('div', { className: 'sg-request-foot' }, h('span'), h('div', { className: 'sg-request-actions' }, actionButtons(p.actions, p.dismiss))) : null);
  }

  /* ================= Locations ================= */
  var ROADS = ['M-10 62 C 60 58, 120 70, 210 64 S 340 52, 420 60', 'M70 -10 C 76 40, 64 90, 82 140 S 96 230, 88 320', 'M-10 150 L 430 132',
    'M190 -10 C 180 60, 205 120, 196 180 S 210 260, 214 320', 'M300 -10 L 318 320', 'M-10 230 C 90 222, 200 240, 430 214', 'M120 -10 L 150 150 L 260 320',
    'M360 -10 C 350 80, 380 160, 372 320'];
  function MapArt(p) {
    return h('svg', { className: 'sg-map-art', viewBox: '0 0 420 300', preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': true },
      h('rect', { x: 0, y: 0, width: 420, height: 300, fill: 'var(--map-land)' }),
      h('rect', { x: 214, y: 70, width: 82, height: 58, rx: 14, fill: 'var(--map-park)' }),
      h('rect', { x: 18, y: 166, width: 56, height: 44, rx: 10, fill: 'var(--map-park)' }),
      h('path', { d: 'M-10 262 C 80 244, 150 290, 240 270 S 380 236, 440 252 L 440 320 L -10 320 Z', fill: 'var(--map-water)' }),
      ROADS.map(function (d, i) { return h('path', { key: i, d: d, fill: 'none', stroke: 'var(--map-road)', strokeWidth: i < 3 ? 7 : 4, strokeLinecap: 'round' }); }));
  }
  function MapPreview(p) {
    var pins = p.pins || [];
    return h('figure', { className: cx('sg-map', p.bare && 'is-bare', p.className), style: p.bare ? null : { height: (p.height || 180) + 'px' } },
      h('div', { className: 'sg-map-canvas', role: 'img', 'aria-label': p['aria-label'] || ('Map' + (pins.length ? ' showing ' + pins.map(function (x) { return x.label; }).filter(Boolean).join(', ') : '')) },
        h(MapArt),
        pins.map(function (pn, i) {
          return h('span', { key: i, className: cx('sg-pin', pn.active && 'is-active'), style: { left: pn.x + '%', top: pn.y + '%', '--sg-tint': 'var(--system-' + (pn.tint || 'red') + ')' } },
            pn.active && pn.label ? h('span', { className: 'sg-pin-label caption-1 sg-glass sg-glass-regular sg-shape-pill' }, pn.label) : null,
            h('svg', { width: pn.active ? 34 : 24, height: pn.active ? 42 : 30, viewBox: '0 0 24 30' },
              h('path', { d: 'M12 29s-10-9.2-10-17a10 10 0 0 1 20 0c0 7.8-10 17-10 17z', fill: 'var(--sg-tint)', stroke: 'var(--canvas)', strokeWidth: 1.5 }),
              h('circle', { cx: 12, cy: 12, r: 4, fill: '#ffffff' })));
        })),
      (p.title && !p.bare) ? h('figcaption', { className: 'sg-map-cap' },
        h('span', { className: 'sg-map-cap-main' }, h('span', { className: 'headline' }, p.title), p.subtitle ? h('span', { className: 'footnote sg-item-sub' }, p.subtitle) : null),
        p.action ? h(Button, { variant: 'tinted', size: 'sm', icon: p.action.icon || 'directions', onClick: p.action.onClick }, p.action.label) : null) : null);
  }

  /* ---------- Badge ---------- */
  function Badge(p) {
    return h('span', { className: cx('sg-badge', 'sg-badge-' + (p.tone || 'neutral'), p.className) },
      p.icon ? h(Icon, { name: p.icon, size: 13, strokeWidth: 2.5 }) : null, p.children);
  }

  var api = { Cluster: Cluster, TopEdge: TopEdge, Message: Message, AgentSteps: AgentSteps, AgentStatus: AgentStatus, ItemCard: ItemCard, AgentRequest: AgentRequest, AgentQuestion: AgentQuestion, AgentPrompt: AgentPrompt, Checkbox: Checkbox, ChoiceList: ChoiceList, TaskRow: TaskRow, EventRow: EventRow, WeekStrip: WeekStrip, TimeGrid: TimeGrid, MonthGrid: MonthGrid, WikiDoc: WikiDoc, SourceCard: SourceCard, WikiTimeline: WikiTimeline, PlaceChip: PlaceChip, MapPreview: MapPreview, Screen: Screen, Dock: Dock, BottomBar: BottomBar, SearchField: SearchField, Menu: Menu, Glass: Glass, Button: Button, IconButton: IconButton, SegmentedControl: SegmentedControl, Switch: Switch,
    Composer: Composer, ListGroup: ListGroup, ListRow: ListRow, TabBar: TabBar, Badge: Badge, Icon: Icon };
  window.SmokedGlass = Object.assign(window.SmokedGlass || {}, api);
})();
