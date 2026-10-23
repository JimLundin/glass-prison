import type { EventRowProps, MonthGridProps, TimeGridProps, WeekStripProps } from '../types';
import { MonthGrid, TimeGrid } from '../calendar/Calendar';
import { ListGroup } from '../lists/List';
import { EventRow, WeekStrip } from '../modules/Rows';
import { Page } from '../layout/Page';

export type CalendarRow = EventRowProps & { id: string };
export interface DayAgendaProps { title: string; events: CalendarRow[] }
export function DayAgendaView({ title, events }: DayAgendaProps) {
  return <ListGroup header={title} glass={false}>
    {events.length ? events.map(({ id, ...event }) => <EventRow key={id} {...event} />) : <EventRow time="" title="Nothing planned" />}
  </ListGroup>;
}

export interface CalendarPageProps {
  range: 'day' | 'week' | 'month';
  title: string;
  eyebrow: string;
  size: 'compact' | 'expanded' | 'large';
  week: WeekStripProps;
  grid: TimeGridProps;
  month: MonthGridProps;
  agenda: DayAgendaProps;
}

/** Calendar's original Day / Week / Month composition. Hosts supply dates and events. */
export function CalendarPage({ range, title, eyebrow, size, week, grid, month, agenda }: CalendarPageProps) {
  const desk = size === 'large', compact = size === 'compact';
  if (range === 'day') return <Page eyebrow={eyebrow} title={title} wide={!compact} gap={12}>
    <WeekStrip {...week} />
    <TimeGrid startHour={8} endHour={23} hourHeight={desk ? 60 : 56} {...grid} />
  </Page>;
  if (range === 'week') return <Page eyebrow={eyebrow} title={title} wide={!compact} bare={!compact}>
    <TimeGrid startHour={8} endHour={23} hourHeight={desk ? 52 : 44} compact={!desk} {...grid} />
  </Page>;
  return <Page eyebrow={eyebrow} title={title} wide={!compact} bare={!compact} gap={16}>
    <MonthGrid {...month} titles={desk} />
    <DayAgendaView {...agenda} />
  </Page>;
}

export function CalendarAsideView({ month, upcoming }: { month: MonthGridProps; upcoming: CalendarRow[] }) {
  return <Page title="Calendar" wide>
    <MonthGrid {...month} titles={false} />
    <ListGroup header="Coming up" glass={false}>{upcoming.map(({ id, ...event }) => <EventRow key={id} {...event} />)}</ListGroup>
  </Page>;
}
