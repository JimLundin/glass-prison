import { shared } from '../../app/state/shared';

export type Range = 'day' | 'week' | 'month';
/** Shared by the left half (month picker) and the view on the right. */
export const calendarState = shared<{ range: Range; date: string }>({ range: 'week', date: '2026-11-13' });

export const WEEK = ['2026-11-09', '2026-11-10', '2026-11-11', '2026-11-12', '2026-11-13', '2026-11-14', '2026-11-15'];
export const NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const LONG = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const dayNum = (d: string) => +d.slice(8);
