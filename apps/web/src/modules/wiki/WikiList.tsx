import { WikiListView } from '@smoked-glass/ui';
import { useBar } from '../../app/state/bar';
import { useNav } from '../../app/state/nav';
import { PAGES, SOURCES } from '../../data/wiki';

const KIND_ICON = { conversation: 'bubble', voice: 'mic', document: 'doc', web: 'globe', image: 'photo' } as const;
const KIND_TINT = { conversation: 'indigo', voice: 'pink', document: 'brown', web: 'blue', image: 'teal' } as const;

export function WikiList({ wide }: { wide?: boolean }) {
  const nav = useNav();
  return <WikiListView wide={wide}
    pages={PAGES.map(p => ({ id: p.id, icon: 'book', tint: 'teal', title: p.title, subtitle: `${p.group} · updated ${p.updated}`, onClick: () => nav.push({ view: 'page', id: p.id }) }))}
    sources={Object.entries(SOURCES).map(([id, s]) => ({ id, icon: KIND_ICON[s.kind], tint: KIND_TINT[s.kind], title: s.title, subtitle: s.when }))} />;
}

/** Phone root: the list, and the one thing the Wiki asks for — importing a source. Pages are written by the agent. */
export function WikiHome() {
  useBar({ primary: { icon: 'doc', label: 'Import Source' } }, []);
  return <WikiList />;
}
