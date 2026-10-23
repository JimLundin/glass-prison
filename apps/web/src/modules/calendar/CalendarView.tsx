import { CalendarPage, DayAgendaView, type MonthDay } from '@smoked-glass/ui';
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

  return <CalendarPage range={range} size={size}
    eyebrow={range === 'month' ? '2026' : 'November 2026'} title={range === 'day' ? `${LONG[di]} ${dayNum(date)}` : range === 'week' ? 'Week 46' : 'November'}
    week={{ days: NAMES.map((name, i) => ({ name, num: String(9 + i), busy: true })), selected: di, onSelect: i => set(s => ({ ...s, date: WEEK[i] })) }}
    grid={{ days: range === 'day' ? [{ name: NAMES[di], num: String(dayNum(date)) }] : NAMES.map((name, i) => ({ name, num: String(9 + i), selected: i === di })),
      events: range === 'day' ? weekEvents.filter(e => e.day === di).map(e => ({ ...e, day: 0 })) : weekEvents,
      allDay: range === 'day' ? spans.filter(s => di >= s.from && di <= s.to).map(s => ({ ...s, from: 0, to: 0 })) : spans,
      onSelect: i => set({ range: 'day', date: WEEK[i] }), onEvent }}
    month={{ weeks: monthWeeks(date, desk), onSelect: (_r, _c, d) => { if (!d.muted) set(s => ({ ...s, date: `2026-11-${d.num.padStart(2, '0')}` })); } }}
    agenda={dayAgenda(date)} />;
}

export function dayAgenda(date: string) {
  return { title: `${LONG[WEEK.indexOf(date)] ?? ''} ${dayNum(date)}`, events: EVENTS.filter(e => e.date === date).map(e => ({
    id: e.id, time: e.start, tint: e.tint, title: e.title, meta: e.end + (e.place ? ' · ' + e.place : ''), suggested: e.suggested, agent: e.agent,
  })) };
}

export function DayAgenda({ date }: { date: string }) { return <DayAgendaView {...dayAgenda(date)} />; }
