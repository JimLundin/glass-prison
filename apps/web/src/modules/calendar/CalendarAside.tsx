import { EventRow, ListGroup, MonthGrid, type MonthDay } from '@smoked-glass/ui';
import { Page } from '../../app/shell/Page';
import { DayAgenda, monthWeeks } from './CalendarView';
import { calendarState } from './state';

/** Left half: a small month to pick days (or, in Month view, the chosen day's agenda) and what's coming up. */
export function CalendarAside() {
  const [{ range, date }, set] = calendarState.use();
  return (
    <Page eyebrow="November 2026" title="Calendar" wide>
      {range === 'month' ? <DayAgenda date={date} /> : (
        <MonthGrid weeks={monthWeeks(date, false)} onSelect={(_r: number, _c: number, d: MonthDay) => { if (!d.muted) set((s) => ({ ...s, date: `2026-11-${d.num.padStart(2, '0')}` })); }} />
      )}
      <ListGroup header="Coming up" glass={false}>
        <EventRow time="Fri" tint="orange" title="Lisbon weekend" meta="13–15 Nov" agent />
        <EventRow time="Tue" tint="teal" title="Dentist" meta="17 Nov · 08:30" location="Odengatan 12" />
        <EventRow time="Thu" tint="pink" title="Maja’s birthday" meta="19 Nov · all day" />
      </ListGroup>
    </Page>
  );
}
