import { useState } from 'react';
import { WikiPageView as PageView } from '@smoked-glass/ui';
import { useBar } from '../../app/state/bar';
import { useFocus } from '../../app/state/focus';
import { useNav } from '../../app/state/nav';
import { useSizeClass } from '../../app/state/size';
import { PAGES, SOURCES } from '../../data/wiki';
import type { Route, WikiSource } from '../../model/types';

const OPEN_LABEL: Record<WikiSource['kind'], string> = { conversation: 'Open in Chat', voice: 'Open in Chat', document: 'Open Document', image: 'Open Image', web: 'Open Saved Copy' };

export function WikiPageView({ route }: { route: Route }) {
  const page = PAGES.find((p) => p.id === route.id) ?? PAGES[0];
  const focus = useFocus();
  const nav = useNav();
  const { size } = useSizeClass();
  const [active, setActive] = useState<{ claim: string | null; source: string | null } | null>(null);

  useBar({ actions: [
    { id: 'ask', label: 'Ask the Agent', icon: 'sparkle' }, { id: 'add', label: 'Add Source', icon: 'doc' },
    { id: 'find', label: 'Find', icon: 'search' }, { id: 'share', label: 'Share', icon: 'share' }, { id: 'delete', label: 'Delete', icon: 'trash', destructive: true },
  ] }, [page.id]);

  // every claim and the exact words it rests on, by id
  const claims: Record<string, { text?: string; label?: string; value?: string; answer?: string; span?: Record<string, string> }> = {};
  page.doc.blocks.forEach((b) => ('claims' in b ? b.claims : 'items' in b ? (b.items as object[]) : []).forEach((c: any) => { if (c.id) claims[c.id] = c; }));

  const openSource = (sourceId: string | null, claimId: string | null) => {
    setActive({ claim: claimId, source: sourceId });
    const close = { dismiss: { icon: 'xmark', label: 'Close', onClick: () => setActive(null) } };
    if (!sourceId) return focus.open({ kind: 'card', key: 'missing:' + claimId, title: 'Source missing', subtitle: 'The agent is looking for another source and will rewrite or remove this.', actions: [{ label: 'Remove Now' }], ...close });
    const src = SOURCES[sourceId], c = claimId ? claims[claimId] : undefined;
    focus.open({ kind: 'source', key: `source:${sourceId}:${claimId}`, source: src, span: c?.span?.[sourceId] ?? '', claim: c ? c.text ?? (c.label ? `${c.label}: ${c.value}` : c.answer) : undefined,
      actions: [{ label: OPEN_LABEL[src.kind], variant: 'filled' }], ...close });
  };
  const onQuestion = (q: { id: string; q: string }) => focus.open({
    kind: 'question', key: 'q:' + q.id, title: q.q, hint: 'Your answer is saved as a source for this page', options: [{ value: 'a', label: 'Fly together' }, { value: 'b', label: 'Meet there' }],
    other: 'Something else…', onReplyInChat: null, actions: [{ label: 'Save Answer', variant: 'filled' }],
  });

  return (
    <PageView eyebrow={`${page.group} · written by the agent · updated ${page.updated}`} title={page.title} wide={size !== 'compact'} doc={page.doc} sources={SOURCES} activeClaim={focus.spec ? active?.claim : null} activeSource={focus.spec ? active?.source : null}
        onCite={openSource} onSource={(id) => openSource(id, null)} onQuestion={onQuestion} onPlace={() => nav.openPlace('casa-alfama')} />
  );
}
