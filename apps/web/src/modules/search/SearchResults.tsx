import { ListGroup, ListRow } from '@smoked-glass/ui';
import { Page } from '../../app/shell/Page';
import { useBar } from '../../app/state/bar';
import { useNav } from '../../app/state/nav';
import { useSizeClass } from '../../app/state/size';
import { useStore } from '../../app/state/store';
import { EVENTS } from '../../data/calendar';
import { PLACES } from '../../data/places';
import { PAGES } from '../../data/wiki';

/** Search everything: results grouped by kind — no scope switcher. Opened from the module circle's bloom. */
export function SearchResults() {
  const nav = useNav();
  const store = useStore();
  const { size } = useSizeClass();
  const q = (nav.search ?? '').trim().toLowerCase();
  useBar(size === 'compact' ? { accessory: { kind: 'query', key: 'search', placeholder: 'Search everything', defaultValue: nav.search ?? '', autoFocus: true, onChange: (v: string) => nav.setSearch(v), onCancel: () => nav.setSearch(null) } } : {}, [size]);
  const has = (s: string) => !q || s.toLowerCase().includes(q);
  const chats = store.chats.filter((c) => has(c.title)), pages = PAGES.filter((p) => has(p.title)), events = EVENTS.filter((e) => has(e.title) && e.title !== 'Standup');
  const tasks = store.tasks.filter((t) => has(t.title)), places = Object.values(PLACES).filter((p) => has(p.name));
  const total = chats.length + pages.length + events.length + tasks.length + places.length;
  return (
    <Page eyebrow={`Search · ${total} results`} title={nav.search ? nav.search : 'Search'} wide={size !== 'compact'}>
      {q ? <ListGroup glass={false}><ListRow icon="sparkle" tint="blue" title={`Ask the agent about “${nav.search}”`} subtitle="Start a chat with this as the question" onClick={() => nav.go('chat')} /></ListGroup> : null}
      {chats.length ? <ListGroup header="Chat" glass={false}>{chats.map((c) => <ListRow key={c.id} icon="bubble" tint={c.tint} title={c.title} subtitle={c.subtitle} onClick={() => nav.go('chat', { view: 'chat', id: c.id })} />)}</ListGroup> : null}
      {pages.length ? <ListGroup header="Wiki" glass={false}>{pages.map((p) => <ListRow key={p.id} icon="book" tint="teal" title={p.title} subtitle={p.group} onClick={() => nav.go('wiki', { view: 'page', id: p.id })} />)}</ListGroup> : null}
      {events.length ? <ListGroup header="Calendar" glass={false}>{events.map((e) => <ListRow key={e.id} icon="calendar" tint={e.tint} title={e.title} subtitle={`${e.date.slice(8)} Nov · ${e.start}`} onClick={() => nav.go('calendar')} />)}</ListGroup> : null}
      {places.length ? <ListGroup header="Places" glass={false}>{places.map((p) => <ListRow key={p.id} icon="location" tint="red" title={p.name} subtitle={p.kind} onClick={() => nav.openPlace(p.id)} />)}</ListGroup> : null}
      {tasks.length ? <ListGroup header="Tasks" glass={false}>{tasks.map((t) => <ListRow key={t.id} icon="checklist" tint="green" title={t.title} subtitle={t.meta} onClick={() => nav.go('tasks')} />)}</ListGroup> : null}
    </Page>
  );
}
