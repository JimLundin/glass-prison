import { SearchResultsView } from '@smoked-glass/ui';
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
  return <SearchResultsView query={nav.search ?? ''} wide={size !== 'compact'} onAsk={() => nav.go('chat')} groups={[
    { title: 'Chat', rows: chats.map(c => ({ id: c.id, icon: 'bubble', tint: c.tint, title: c.title, subtitle: c.subtitle, onClick: () => nav.go('chat', { view: 'chat', id: c.id }) })) },
    { title: 'Wiki', rows: pages.map(p => ({ id: p.id, icon: 'book', tint: 'teal', title: p.title, subtitle: p.group, onClick: () => nav.go('wiki', { view: 'page', id: p.id }) })) },
    { title: 'Calendar', rows: events.map(e => ({ id: e.id, icon: 'calendar', tint: e.tint, title: e.title, subtitle: `${e.date.slice(8)} Nov · ${e.start}`, onClick: () => nav.go('calendar') })) },
    { title: 'Places', rows: places.map(p => ({ id: p.id, icon: 'location', tint: 'red', title: p.name, subtitle: p.kind, onClick: () => nav.openPlace(p.id) })) },
    { title: 'Tasks', rows: tasks.map(t => ({ id: t.id, icon: 'checklist', tint: 'green', title: t.title, subtitle: t.meta, onClick: () => nav.go('tasks') })) },
  ]} />;
}
