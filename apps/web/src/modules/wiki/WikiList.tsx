import { ListGroup, ListRow } from '@smoked-glass/ui';
import { Page } from '../../app/shell/Page';
import { useBar } from '../../app/state/bar';
import { useNav } from '../../app/state/nav';
import { PAGES, SOURCES } from '../../data/wiki';

const KIND_ICON = { conversation: 'bubble', voice: 'mic', document: 'doc', web: 'globe', image: 'photo' } as const;
const KIND_TINT = { conversation: 'indigo', voice: 'pink', document: 'brown', web: 'blue', image: 'teal' } as const;

export function WikiList({ wide }: { wide?: boolean }) {
  const nav = useNav();
  return (
    <Page eyebrow={`${PAGES.length} pages · ${Object.keys(SOURCES).length} sources`} title="Wiki" wide={wide}>
      <ListGroup header="Pages" glass={false}>
        {PAGES.map((p) => <ListRow key={p.id} icon="book" tint="teal" title={p.title} subtitle={`${p.group} · updated ${p.updated}`} onClick={() => nav.push({ view: 'page', id: p.id })} />)}
      </ListGroup>
      <ListGroup header="Sources" glass={false} footer="Each is a stored copy — a conversation, a voice note, a document, an image or a web page as it was when saved.">
        {Object.entries(SOURCES).map(([id, s]) => <ListRow key={id} icon={KIND_ICON[s.kind]} tint={KIND_TINT[s.kind]} title={s.title} subtitle={s.when} />)}
      </ListGroup>
    </Page>
  );
}

/** Phone root: the list, and the one thing the Wiki asks for — importing a source. Pages are written by the agent. */
export function WikiHome() {
  useBar({ primary: { icon: 'doc', label: 'Import Source' } }, []);
  return <WikiList />;
}
