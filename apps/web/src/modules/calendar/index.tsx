import type { ModuleDef } from '../types';
import { CalendarAside } from './CalendarAside';
import { CalendarView } from './CalendarView';

export const calendar: ModuleDef = {
  id: 'calendar', label: 'Calendar', icon: 'calendar',
  List: CalendarAside, Root: CalendarView, Item: CalendarView,
  home: { view: 'range' },
};
