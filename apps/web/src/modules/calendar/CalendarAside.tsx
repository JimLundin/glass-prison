import { CalendarCollectionView } from '@smoked-glass/ui';
import { EVENTS, SPANS } from '../../data/calendar';
import { useFocus } from '../../app/state/focus';
import { calendarState } from './state';

export function CalendarAside() {
  const [, set] = calendarState.use(), focus = useFocus();
  const events = [...EVENTS.map(event => ({ ...event, meta: `${event.date.slice(8)} Nov · ${event.start}–${event.end}` })),
    ...SPANS.map(event => ({ ...event, date: event.from, meta: `${event.from.slice(8)}–${event.to.slice(8)} Nov` }))]
    .sort((a, b) => a.date.localeCompare(b.date));
  return <CalendarCollectionView groups={[{ title: 'November', events: events.map(event => ({
    id: event.id, time: event.date.slice(8), title: event.title, tint: event.tint, meta: event.meta, agent: event.agent,
    onClick: () => {
      set(current => ({ ...current, date: event.date }));
      focus.open({ kind: 'card', key: event.id, title: event.title, subtitle: event.meta, dismiss: { icon: 'chevron-left', label: 'Back' } });
    },
  })) }]} />;
}
