import { EventRow, ListGroup, MonthGrid, TimeGrid, WeekStrip, type MonthDay } from '@smoked-glass/ui';
import { Page } from '../../app/shell/Page';
import { useBar } from '../../app/state/bar';
import { useFocus } from '../../app/state/focus';
import { useSizeClass } from '../../app/state/size';
import { EVENTS, SPANS } from '../../data/calendar';
import type { CalEvent } from '../../model/types';
import { calendarState, dayNum, LONG, NAMES, WEEK, type Range } from './state';

/** November 2026 as six Monday-first weeks. */
export function monthWeeks(selected: string, titles: boolean) {
  return [0, 1, 2, 3, 4, 5].map((r) => ({
    days: [0, 1, 2, 3, 4, 5, 6].map((i): MonthDay => {
      const n = r * 7 + i - 5, muted = n < 1 || n > 30, date = `2026-11-${String(n).padStart(2, '0')}`;
      return { num: String(n < 1 ? 31 + n : n > 30 ? n - 30 : n), muted, selected: !muted && date === selected, span: r === 2,
        items: muted ? [] : EVENTS.filter((e) => e.date === date && e.title !== 'Standup').map((e) => ({ title: e.title, tint: e.tint, suggested: e.suggested })) };
    }),
    spans: r === 2 ? [{ from: 4, to: 6, title: 'Lisbon weekend', tint: 'orange' as const }] : [],
  }));
}

export function CalendarView() {
  const [{ range, date }, set] = calendarState.use();
  const { size } = useSizeClass();
  const focus = useFocus();
  const desk = size === 'large', compact = size === 'compact';
  const di = Math.max(0, WEEK.indexOf(date));

  useBar({
    accessory: { kind: 'switcher', key: 'range', options: ['Day', 'Week', 'Month'], value: range[0].toUpperCase() + range.slice(1), 'aria-label': 'Range',
      onChange: (v: string) => set((s) => ({ ...s, range: v.toLowerCase() as Range })) },
    primary: { icon: 'plus', label: 'New Event' },
    actions: [{ id: 'today', label: 'Today', icon: 'clock' }],
  }, [range]);

  const openEvent = (e: CalEvent) => focus.open({
    kind: 'card', key: 'event:' + e.id, title: e.title, subtitle: `${LONG[WEEK.indexOf(e.date)] ?? ''} ${dayNum(e.date)} November · ${e.start}–${e.end}`,
    lines: [e.place ? { icon: 'location', text: e.place } : null, e.suggested ? { icon: 'sparkle', text: 'Suggested by the agent · not booked' } : { icon: 'calendar', text: 'Personal' }].filter(Boolean),
    actions: e.suggested ? [{ label: 'Dismiss' }, { label: 'Book', variant: 'filled' }] : [{ label: 'Edit' }, { label: 'Ask' }],
    dismiss: { icon: 'chevron-left', label: 'Back' },
  });
  const weekEvents = EVENTS.filter((e) => WEEK.includes(e.date)).map((e) => ({ ...e, day: WEEK.indexOf(e.date) }));
  const spans = SPANS.map((s) => ({ from: WEEK.indexOf(s.from), to: WEEK.indexOf(s.to), title: s.title, tint: s.tint, agent: s.agent }));
  const onEvent = (e: { id?: string }) => { const ev = EVENTS.find((x) => x.id === e.id); if (ev) openEvent(ev); };

  if (range === 'day') return (
    <Page eyebrow="November 2026" title={`${LONG[di]} ${dayNum(date)}`} wide={!compact}>
      <WeekStrip days={NAMES.map((n, i) => ({ name: n, num: String(9 + i), busy: true }))} selected={di} onSelect={(i: number) => set((s) => ({ ...s, date: WEEK[i] }))} />
      <TimeGrid days={[{ name: NAMES[di], num: String(dayNum(date)) }]} events={weekEvents.filter((e) => e.day === di).map((e) => ({ ...e, day: 0 }))}
        allDay={spans.filter((s) => di >= s.from && di <= s.to).map((s) => ({ ...s, from: 0, to: 0 }))} startHour={8} endHour={23} hourHeight={desk ? 60 : 56} onEvent={onEvent} />
    </Page>
  );
  if (range === 'week') return (
    <Page eyebrow="November 2026" title="Week 46" wide={!compact} bare={!compact}>
      <TimeGrid days={NAMES.map((n, i) => ({ name: n, num: String(9 + i), selected: i === di }))} events={weekEvents} allDay={spans} startHour={8} endHour={23}
        hourHeight={desk ? 52 : 44} compact={!desk} onSelect={(i: number) => set({ range: 'day', date: WEEK[i] })} onEvent={onEvent} />
    </Page>
  );
  return (
    <Page eyebrow="2026" title="November" wide={!compact} bare={!compact}>
      <MonthGrid weeks={monthWeeks(date, desk)} titles={desk} onSelect={(_r: number, _c: number, d: MonthDay) => { if (!d.muted) set((s) => ({ ...s, date: `2026-11-${d.num.padStart(2, '0')}` })); }} />
      {compact ? <DayAgenda date={date} /> : null}
    </Page>
  );
}

export function DayAgenda({ date }: { date: string }) {
  const evs = EVENTS.filter((e) => e.date === date);
  return (
    <ListGroup header={`${LONG[WEEK.indexOf(date)] ?? ''} ${dayNum(date)}`} glass={false}>
      {evs.length ? evs.map((e) => <EventRow key={e.id} time={e.start} tint={e.tint} title={e.title} meta={e.end + (e.place ? ' · ' + e.place : '')} suggested={e.suggested} agent={e.agent} />)
        : <EventRow time="" title="Nothing planned" />}
    </ListGroup>
  );
}
