import type { Task } from '../model/types';

export const LISTS = [
  { id: 'today', title: 'Today', tint: 'blue' as const },
  { id: 'lisbon', title: 'Lisbon trip', tint: 'orange' as const },
  { id: 'home', title: 'Home', tint: 'green' as const },
  { id: 'work', title: 'Work', tint: 'indigo' as const },
];
export const TASKS: Task[] = [
  { id: 't1', list: 'lisbon', due: 'today', title: 'Book airport transfer in Lisbon', meta: 'Lisbon trip · arrive 21:55 Fri', agent: true },
  { id: 't2', list: 'home', due: 'today', title: 'Send kitchen quote decision to Erik', meta: 'Kitchen remodel · due 17:00' },
  { id: 't3', list: 'lisbon', due: 'today', title: 'Check passport expiry date', meta: 'Lisbon trip', agent: true },
  { id: 't4', list: 'home', due: 'today', title: 'Pay electricity bill', meta: 'Home · done 08:12', done: true },
  { id: 't5', list: 'lisbon', due: 'upcoming', title: 'Pack for Lisbon', meta: 'Fri 13 Nov' },
  { id: 't6', list: 'home', due: 'upcoming', title: 'Pick up dry cleaning', meta: 'Sat 7 Nov · Rörstrandsgatan 12' },
  { id: 't7', list: 'work', due: 'upcoming', title: 'Weekly review', meta: 'Mon 16 Nov · repeats weekly' },
];
