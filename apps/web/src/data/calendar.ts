import type { CalEvent, CalSpanEvent } from '../model/types';

/** Week 46 (Mon 9 – Sun 15 Nov 2026) and a few dates around it. */
export const EVENTS: CalEvent[] = [
  ...['09', '10', '11', '12', '13'].map((d) => ({ id: 'standup-' + d, date: `2026-11-${d}`, start: '09:00', end: '09:15', title: 'Standup', tint: 'teal' as const })),
  { id: 'design', date: '2026-11-09', start: '13:00', end: '14:00', title: 'Design review', tint: 'indigo', place: 'Room 4' },
  { id: 'gym', date: '2026-11-10', start: '17:00', end: '18:00', title: 'Gym', tint: 'green', place: 'SATS Odenplan' },
  { id: 'erik', date: '2026-11-11', start: '12:00', end: '13:00', title: 'Lunch with Erik', tint: 'pink', place: 'Bar Agrikultur' },
  { id: 'kitchen', date: '2026-11-12', start: '14:00', end: '15:30', title: 'Kitchen contractor', tint: 'brown', place: 'At home' },
  { id: 'maja', date: '2026-11-13', start: '11:30', end: '12:30', title: 'Lunch with Maja', tint: 'pink', place: 'Café Pascal' },
  { id: 'flight-out', date: '2026-11-13', start: '17:40', end: '21:55', title: 'Flight to Lisbon', tint: 'blue', place: 'ARN Terminal 5', suggested: true },
  { id: 'alfama', date: '2026-11-14', start: '10:00', end: '12:00', title: 'Walk through Alfama', tint: 'orange', place: 'From the hotel', agent: true },
  { id: 'dinner', date: '2026-11-14', start: '20:00', end: '22:00', title: 'Dinner at Taberna do Largo', tint: 'orange', place: 'Alfama', suggested: true },
  { id: 'flight-home', date: '2026-11-15', start: '18:40', end: '22:00', title: 'Flight home', tint: 'blue', place: 'LIS Terminal 1', suggested: true },
  { id: 'q4', date: '2026-11-03', start: '10:00', end: '11:00', title: 'Q4 planning', tint: 'indigo' },
  { id: 'haircut', date: '2026-11-05', start: '16:00', end: '16:45', title: 'Haircut', tint: 'mint' },
  { id: 'dentist', date: '2026-11-17', start: '08:30', end: '09:15', title: 'Dentist', tint: 'teal', place: 'Odengatan 12' },
  { id: 'bday', date: '2026-11-19', start: '00:00', end: '23:59', title: 'Maja’s birthday', tint: 'pink' },
  { id: 'demo', date: '2026-11-20', start: '08:00', end: '12:00', title: 'Kitchen demolition', tint: 'brown' },
  { id: 'q4r', date: '2026-11-24', start: '14:00', end: '15:00', title: 'Q4 review', tint: 'indigo' },
  { id: 'market', date: '2026-11-28', start: '12:00', end: '15:00', title: 'Christmas market', tint: 'red' },
];
export const SPANS: CalSpanEvent[] = [{ id: 'lisbon', from: '2026-11-13', to: '2026-11-15', title: 'Lisbon weekend', tint: 'orange', agent: true }];
