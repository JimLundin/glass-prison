import type { Chat, Prompt } from '../model/types';

export const PROMPTS: Record<string, Prompt> = {
  'p-calendar': {
    id: 'p-calendar', kind: 'permission', icon: 'calendar', tint: 'orange', title: 'Add “Lisbon weekend” to Calendar?', state: 'pending',
    card: { title: 'Add an event to Calendar?', description: 'The agent wants to create 1 event', detail: ['Lisbon weekend', 'Fri 13 Nov, 15:00 – Sun 15 Nov, 22:00', 'Personal calendar · busy'], remember: 'Always allow adding events' },
  },
  'p-airport': {
    id: 'p-airport', kind: 'question', icon: 'sparkle', tint: 'blue', title: 'Where are you flying from?', state: 'pending',
    options: [{ value: 'ARN', label: 'Stockholm Arlanda', detail: 'ARN' }, { value: 'BMA', label: 'Stockholm Bromma', detail: 'BMA' }, { value: 'GOT', label: 'Göteborg Landvetter', detail: 'GOT' }],
  },
};

export const CHATS: Chat[] = [
  {
    id: 'lisbon', title: 'Lisbon trip', icon: 'calendar', tint: 'orange', subtitle: 'Wants to add an event · 2 min', needsYou: true,
    turns: [
      { kind: 'system', text: 'Today 20:41' },
      { kind: 'user', text: 'Find a free weekend in November for Lisbon and start a packing list.' },
      { kind: 'agent', text: 'The weekend of 13–15 November is open — nothing from Friday 15:00 until Sunday night.' },
      { kind: 'steps', steps: [{ icon: 'calendar', label: 'Read calendar, 1–30 Nov', status: 'done' }, { icon: 'book', label: 'Wrote “Lisbon trip”', status: 'done' }] },
      { kind: 'item', icon: 'book', tint: 'teal', title: 'Lisbon trip', subtitle: 'Wiki · 6 sources', link: { module: 'wiki', route: { view: 'page', id: 'lisbon-trip' } } },
      { kind: 'place', label: 'Casa Alfama', placeId: 'casa-alfama' },
      { kind: 'agent', text: 'Want me to block the weekend so nothing gets booked over it? And one question before I look at flights.' },
      { kind: 'prompt', promptId: 'p-calendar' },
      { kind: 'prompt', promptId: 'p-airport' },
    ],
  },
  { id: 'q4', title: 'Q4 planning', icon: 'bubble', tint: 'indigo', subtitle: 'Asked you a question · 1 h', needsYou: true, turns: [{ kind: 'agent', text: 'Which quarter goals should come first?' }] },
  { id: 'kitchen', title: 'Kitchen remodel quotes', icon: 'bubble', tint: 'teal', subtitle: 'Compared three offers · Yesterday', turns: [] },
  { id: 'review', title: 'Weekly review', icon: 'bubble', tint: 'green', subtitle: 'Moved 4 tasks to next week · Mon', turns: [] },
  { id: 'bday', title: 'Birthday ideas for Maja', icon: 'bubble', tint: 'pink', subtitle: 'Saved 6 ideas to the wiki · Sun', turns: [] },
];
