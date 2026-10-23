// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx, kbdAria } from '../internal/util';
import { Tile } from '../primitives/Badge';
import { Button, IconButton } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { Switch } from '../primitives/Switch';
import { ChoiceList } from '../selection/Selection';

/* ================= Agent conversation ================= */
export function Message(p) {
  var from = p.by || p.from || 'agent';
  if (from === 'system') return h('p', { className: cx('sg-msg-system footnote', p.className) }, p.children);
  return h('div', { className: cx('sg-msg', 'sg-msg-' + from, 'body', p.className) }, p.children);
}
export function Spinner() {
  return h('svg', { className: 'sg-spin', width: 18, height: 18, viewBox: '0 0 18 18', 'aria-hidden': true },
    h('circle', { cx: 9, cy: 9, r: 7, fill: 'none', stroke: 'var(--fill-control)', strokeWidth: 2 }),
    h('path', { d: 'M9 2a7 7 0 0 1 7 7', fill: 'none', stroke: 'var(--accent-text)', strokeWidth: 2, strokeLinecap: 'round' }));
}
export var STEP_TRAIL = {
  done: function () { return h('span', { className: 'sg-step-ok' }, h(Icon, { name: 'checkmark', size: 18, strokeWidth: 2 }), h('span', { className: 'sg-vh' }, 'Done')); },
  running: function () { return h('span', { className: 'sg-step-run' }, h(Spinner), h('span', { className: 'sg-vh' }, 'In progress')); },
  waiting: function () { return h('span', { className: 'sg-step-wait footnote' }, 'Needs you'); },
  failed: function () { return h('span', { className: 'sg-step-fail footnote' }, h(Icon, { name: 'xmark', size: 14, strokeWidth: 2.5 }), 'Failed'); }
};
export function AgentSteps(p) {
  return h('ol', { className: cx('sg-steps', p.className), 'aria-label': p['aria-label'] || 'Agent steps' },
    (p.steps || []).map(function (st, i) {
      return h('li', { key: i, className: cx('sg-step', 'is-' + (st.status || 'done')) },
        h('span', { className: 'sg-step-icon' }, h(Icon, { name: st.icon || 'sparkle', size: 18 })),
        h('span', { className: 'sg-step-label subheadline' }, st.label),
        (STEP_TRAIL[st.status || 'done'] || STEP_TRAIL.done)());
    }));
}
export function AgentStatus(p) {
  var tone = p.tone || 'working';
  return h('span', { className: cx('sg-status', 'is-' + tone, 'subheadline', p.className), role: 'status' },
    h('span', { className: 'sg-status-dot', 'aria-hidden': true }), p.children);
}
export function ItemCard(p) {
  var Tag = p.href ? 'a' : (p.onClick ? 'button' : 'div');
  return h(Tag, { href: p.href, type: Tag === 'button' ? 'button' : undefined, onClick: p.onClick, className: cx('sg-item', p.className) },
    h(Tile, { icon: p.icon || 'book', tint: p.tint || 'teal', size: 'lg' }),
    h('span', { className: 'sg-item-main' }, h('span', { className: 'headline' }, p.title), p.subtitle ? h('span', { className: 'footnote sg-item-sub' }, p.subtitle) : null),
    (p.href || p.onClick) ? h(Icon, { name: 'chevron-right', size: 16, strokeWidth: 2.25, className: 'sg-row-chev' }) : null);
}
export function actionButtons(actions, dismiss) {
  var out = (actions || []).map(function (a, i) {
    if (a.iconOnly && a.icon) return h(IconButton, { key: i, icon: a.icon, label: a.label, disabled: a.disabled, onClick: a.onClick, variant: 'fill', className: 'sg-request-nav' });
    return h(Button, { key: i, variant: a.variant || 'gray', destructive: a.destructive, disabled: a.disabled, onClick: a.onClick, size: a.size, kbd: a.kbd }, a.label);
  });
  // the way out without answering: a circle at the end of the row, where the bar's Back / module circle sits
  // with a keyboard, the exit shows its key (esc) in place of the glyph
  if (dismiss) out.push(dismiss.kbd
    ? h('button', { key: '__exit', type: 'button', 'aria-label': dismiss.label || 'Later', title: dismiss.label || 'Later', 'aria-keyshortcuts': kbdAria(dismiss.kbd), onClick: dismiss.onClick, className: 'sg-iconbtn sg-iconbtn-fill sg-request-exit is-kbd' }, h('kbd', { className: 'sg-kbd' }, dismiss.kbd))
    : h(IconButton, { key: '__exit', icon: dismiss.icon || 'xmark', label: dismiss.label || 'Later', title: dismiss.label || 'Later', variant: 'fill', onClick: dismiss.onClick, className: 'sg-request-exit' }));
  return out;
}
// swipe down on a focus card = its dismiss
export function useSwipeDown(dismiss) {
  var y0 = R.useRef(null);
  if (!dismiss || !dismiss.onClick) return {};
  return {
    onPointerDown: function (e) { if (e.pointerType !== 'mouse') y0.current = e.clientY; },
    onPointerUp: function (e) { if (y0.current != null && e.clientY - y0.current > 60) dismiss.onClick(); y0.current = null; },
    onPointerCancel: function () { y0.current = null; }
  };
}
export function AgentRequest(p) {
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
export function AgentQuestion(p) {
  var sw = useSwipeDown(p.dismiss);
  return h('form', Object.assign({ className: cx('sg-request sg-question sg-glass sg-glass-thick', p.dismiss && 'has-exit', p.className), 'aria-label': p['aria-label'] || 'Question from the agent',
      onSubmit: function (e) { e.preventDefault(); } }, sw),
    h('div', { className: 'sg-question-head' },
      h('h2', { className: 'headline' }, p.title),
      p.progress ? h('span', { className: 'footnote sg-question-progress' }, p.progress) : null),
    h(ChoiceList, { options: p.options, multiple: p.multiple, columns: p.columns, other: p.other, otherValue: p.otherValue, legend: p.hint, defaultValue: p.defaultValue, onChange: p.onChange }),
    h('div', { className: 'sg-request-foot' },
      p.onReplyInChat !== null ? h(Button, { variant: 'plain', size: 'sm', onClick: p.onReplyInChat }, 'Reply in Chat') : h('span'),
      h('div', { className: 'sg-request-actions' }, actionButtons(p.actions, p.dismiss))));
}


/* Inline marker for an agent request or question in the conversation; picking it moves it into the cluster */
export function AgentPrompt(p) {
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
