// @ts-nocheck — internals ported from the Smoked Glass canvas bundle; the typed surface is src/index.ts
import * as R from 'react';
const h: any = R.createElement;
import { cx } from '../internal/util';
import { TaskRow } from '../modules/Rows';
import { MapPreview, PlaceChip } from '../places/Places';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';

/* ================= Wiki: a page is structured data; every statement cites original source text ================= */
export var SOURCE_KIND = { conversation: { icon: 'bubble', label: 'Conversation' }, voice: { icon: 'mic', label: 'Voice note' }, document: { icon: 'doc', label: 'Document' }, web: { icon: 'globe', label: 'Web page' }, image: { icon: 'photo', label: 'Image' } };
export function sourceKind(src) { return SOURCE_KIND[(src && src.kind) || 'document'] || SOURCE_KIND.document; }
export function SourceTile(p) {
  var k = sourceKind(p.source);
  return h('span', { className: 'sg-src-tile', 'data-kind': (p.source && p.source.kind) || 'document' }, h(Icon, { name: k.icon, size: p.size || 18, strokeWidth: 2 }));
}
export function citeNumbers(doc, sources) {
  var n = {}, documents = {}, i = 0;
  function add(ids) { (ids || []).forEach(function (id) { var document = sources && sources[id] && sources[id].documentId || id; if (!(document in documents)) documents[document] = ++i; n[id] = documents[document]; }); }
  (doc.blocks || []).forEach(function (b) {
    (b.claims || []).forEach(function (c) { add(c.sources); });
    (b.items || []).forEach(function (c) { add(c.sources); });
  });
  return n;
}
export function Cites(p) {
  var ids = (p.sources || []).filter(function (id, index, all) { return all.findIndex(function (other) { return p.numbers[other] === p.numbers[id]; }) === index; });
  if (!ids.length) return h('button', { type: 'button', className: 'sg-cite is-missing', 'aria-label': 'No source yet', title: 'No source yet', onClick: p.onCite ? function () { p.onCite(null, p.claim); } : undefined }, '?');
  return h(R.Fragment, null, ids.map(function (id) {
    return h('button', { key: id, type: 'button', className: cx('sg-cite', p.activeSource === id && 'is-on'), 'aria-label': 'Source ' + p.numbers[id], onClick: p.onCite ? function () { p.onCite(id, p.claim); } : undefined }, p.numbers[id]);
  }));
}
export function EmbedHead(p) {
  return h('div', { className: 'sg-wk-embed-head footnote' }, h(Icon, { name: p.icon, size: 14, strokeWidth: 2 }), h('span', null, p.from), p.detail ? h('span', { className: 'sg-wk-embed-detail' }, '· ' + p.detail) : null);
}
export function WikiTimeline(p) {
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
export function WikiDoc(p) {
  var doc = p.doc || { blocks: [] }, sources = p.sources || {}, nums = citeNumbers(doc, sources);
  var cite = function (ids, key) { return h(Cites, { sources: ids, numbers: nums, claim: key, onCite: p.onCite, activeSource: p.activeClaim === key ? p.activeSource : null }); };
  var textCitation = function (text, ids, key) {
    var linked = p.citationStyle === 'text' && ids && ids.length && p.onCite;
    return h(linked ? 'a' : 'span', { className: cx('sg-claim', linked && 'sg-claim-link', p.activeClaim === key && 'is-on', !(ids || []).length && 'is-unsourced'),
      href: linked ? sources[ids[0]] && sources[ids[0]].href : undefined, 'aria-haspopup': linked ? 'dialog' : undefined,
      onClick: linked ? function (event) { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); p.onCite(ids[0], key); } : undefined }, text);
  };
  var blocks = (doc.blocks || []).slice(p.start || 0);
  return h('article', { className: cx('sg-wk', p.className) }, blocks.map(function (b, i) {
    var key = b.id || ('b' + i);
    if (b.type === 'heading') return h('h2', { key: key, className: 'title-3 sg-wk-h' }, b.text);
    if (b.type === 'paragraph') return h('p', { key: key, className: 'body sg-wk-p' }, b.claims.map(function (c, k) {
      return h(R.Fragment, { key: c.id || k }, textCitation(c.text, c.sources, c.id), p.citationStyle === 'text' ? null : cite(c.sources, c.id), ' ');
    }));
    if (b.type === 'facts') return h('dl', { key: key, className: 'sg-wk-facts' }, b.items.map(function (f, k) {
      return h('div', { key: f.id || k, className: cx('sg-wk-fact', p.activeClaim === f.id && 'is-on') },
        h('dt', { className: 'subheadline' }, f.label),
        h('dd', { className: 'subheadline' }, f.place ? h(PlaceChip, { name: f.value, onClick: p.onPlace || function () {} }) : textCitation(f.value, f.sources, f.id), p.citationStyle === 'text' ? null : cite(f.sources, f.id)));
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
            done ? h('span', { className: 'footnote sg-wk-q-answer' }, textCitation(q.answer, q.sources, q.id), p.citationStyle === 'text' ? null : cite(q.sources, q.id)) : null),
          done ? null : h(Button, { variant: 'tinted', size: 'sm', onClick: p.onQuestion ? function () { p.onQuestion(q); } : undefined }, 'Answer'));
      })));
    if (b.type === 'sources') {
      var list = Object.keys(nums).sort(function (a, z) { return nums[a] - nums[z]; }).filter(function (id, index, all) { return all.findIndex(function (other) { return nums[other] === nums[id]; }) === index; });
      var counts = {}; (doc.blocks || []).forEach(function (bb) { (bb.claims || []).concat(bb.items || []).forEach(function (c) { Array.from(new Set((c.sources || []).map(function (id) { return nums[id]; }))).forEach(function (number) { counts[number] = (counts[number] || 0) + 1; }); }); });
      return h('section', { key: key, className: 'sg-wk-embed' }, h(EmbedHead, { icon: 'quote', from: 'Sources', detail: list.length + ' · every statement above points to one' }),
        h('ol', { className: 'sg-wk-sources' }, list.map(function (id) {
          var src = sources[id] || {}, k = sourceKind(src);
          return h('li', { key: id }, h('button', { type: 'button', className: 'sg-wk-src', onClick: p.onSource ? function () { p.onSource(id); } : undefined },
            h('span', { className: 'footnote sg-wk-src-n' }, nums[id]), h(SourceTile, { source: src }),
            h('span', { className: 'sg-wk-src-main' }, h('span', { className: 'subheadline sg-wk-src-title' }, src.title), h('span', { className: 'caption-1 sg-wk-src-meta' }, k.label + ' · ' + (src.when || '') + ' · cited ' + (counts[nums[id]] || 0) + '×'))));
        })));
    }
    return null;
  }));
}
