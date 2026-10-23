import { CalendarAsideView } from '@smoked-glass/ui';
import { monthWeeks } from './CalendarView';
import { calendarState } from './state';

export function CalendarAside() {
  const [{ date }, set] = calendarState.use();
  return <CalendarAsideView
    month={{ weeks: monthWeeks(date, false), onSelect: (_r, _c, d) => { if (!d.muted) set(s => ({ ...s, date: `2026-11-${d.num.padStart(2, '0')}` })); } }}
    upcoming={[
      { id: 'lisbon', time: 'Fri', tint: 'orange', title: 'Lisbon weekend', meta: '13–15 Nov', agent: true },
      { id: 'dentist', time: 'Tue', tint: 'teal', title: 'Dentist', meta: '17 Nov · 08:30', location: 'Odengatan 12' },
      { id: 'birthday', time: 'Thu', tint: 'pink', title: 'Maja’s birthday', meta: '19 Nov · all day' },
    ]} />;
}
