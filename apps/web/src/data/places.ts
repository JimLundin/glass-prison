import type { Place } from '../model/types';

export const PLACES: Record<string, Place> = {
  'casa-alfama': {
    id: 'casa-alfama', name: 'Casa Alfama', kind: 'Hotel', address: 'Rua dos Remédios 81 · 4 min walk',
    lines: [{ icon: 'clock', text: 'Check-in Fri 13 Nov from 15:00' }, { icon: 'calendar', text: 'In “Lisbon weekend”' }],
    pins: [{ x: 52, y: 30, tint: 'red', active: true, label: 'Casa Alfama' }, { x: 26, y: 22, tint: 'orange' }, { x: 74, y: 40, tint: 'orange' }, { x: 38, y: 46, tint: 'orange' }, { x: 62, y: 52, tint: 'blue' }],
  },
};
