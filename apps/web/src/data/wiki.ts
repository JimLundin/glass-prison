import type { WikiPage, WikiSource } from '../model/types';

/** Stored copies. Every source is captured as it was, with an origin URI back to where it came from. */
export const SOURCES: Record<string, WikiSource> = {
  "s1": {
    "kind": "conversation",
    "title": "Lisbon trip",
    "when": "Thu 22 Oct, 20:41",
    "where": "Chat",
    "speaker": "You",
    "excerpt": "Find a free weekend in November for Lisbon and start a packing list. Nothing too early on Friday — I can’t leave work before three. Window seat if you book anything."
  },
  "s2": {
    "kind": "voice",
    "title": "Voice note on the way home",
    "when": "Wed 21 Oct, 18:12",
    "where": "Transcribed in Chat",
    "speaker": "You",
    "excerpt": "Maja’s coming too, she said yes this morning. She doesn’t eat meat, so look for somewhere with good fish or something veggie."
  },
  "s3": {
    "kind": "document",
    "title": "Booking confirmation — Casa Alfama.pdf",
    "when": "Imported Thu 22 Oct",
    "where": "page 1",
    "excerpt": "Check-in: Friday 13 November 2026, from 15:00. Check-out: Sunday 15 November 2026, by 11:00. Rua dos Remédios 81, 1100-445 Lisboa. Guests: 2."
  },
  "s4": {
    "kind": "document",
    "title": "Email from Maja — “Re: Lisbon?”",
    "when": "Imported Thu 22 Oct",
    "where": "Mail",
    "excerpt": "Count me in!! Only thing: I have to be home by 22 on Sunday, I’m working Monday morning."
  },
  "s6": {
    "kind": "web",
    "title": "Lisbon in November — climate averages",
    "when": "Fetched Thu 22 Oct, 20:58",
    "origin": "https://www.example-weather.org/lisbon/november",
    "captured": "22 Oct 2026",
    "excerpt": "In November, daytime highs in Lisbon average around 18 °C and nights about 12 °C. Rain falls on roughly 9 days of the month, usually in short showers."
  },
  "s5": {
    "kind": "document",
    "title": "City break packing list (2025).md",
    "when": "Imported Sep 2025",
    "where": "Files",
    "excerpt": "Light rain shell. Two warm layers. Shoes with real grip — the hills are steep and the stones get slippery."
  }
};

export const PAGES: WikiPage[] = [
  { id: 'lisbon-trip', title: 'Lisbon trip', group: 'Travel', updated: '4 min ago', doc: {"id": "lisbon-trip", "title": "Lisbon trip", "updated": "4 min ago", "blocks": [{"type": "paragraph", "claims": [{"id": "c1", "text": "A weekend in Lisbon with Maja, Friday 13 to Sunday 15 November 2026.", "sources": ["s1", "s2"], "span": {"s1": "Find a free weekend in November for Lisbon", "s2": "Maja’s coming too"}}, {"id": "c2", "text": "You’re staying at Casa Alfama and can check in from 15:00 on Friday.", "sources": ["s3"], "span": {"s3": "Check-in: Friday 13 November 2026, from 15:00."}}, {"id": "c3", "text": "Flights aren’t booked yet: you can’t leave work before 15:00 on Friday,", "sources": ["s1"], "span": {"s1": "I can’t leave work before three."}}, {"id": "c4", "text": "and Maja has to be home by 22:00 on Sunday.", "sources": ["s4"], "span": {"s4": "I have to be home by 22 on Sunday"}}]}, {"type": "facts", "items": [{"id": "f1", "label": "Dates", "value": "Fri 13 – Sun 15 Nov", "sources": ["s3"], "span": {"s3": "Check-out: Sunday 15 November 2026, by 11:00."}}, {"id": "f2", "label": "Travelling", "value": "You and Maja", "sources": ["s2", "s4"], "span": {"s2": "Maja’s coming too", "s4": "Count me in!!"}}, {"id": "f3", "label": "Staying at", "value": "Casa Alfama", "place": true, "sources": ["s3"], "span": {"s3": "Rua dos Remédios 81, 1100-445 Lisboa."}}, {"id": "f4", "label": "Seat", "value": "Window", "sources": ["s1"], "span": {"s1": "Window seat if you book anything."}}]}, {"type": "timeline", "from": {"module": "calendar", "range": ["2026-11-13", "2026-11-15"]}, "range": "13–15 Nov", "items": [{"day": "Fri 13", "time": "15:00", "title": "Check in at Casa Alfama", "tint": "orange", "meta": "From 15:00"}, {"day": "Fri 13", "time": "17:40", "title": "Flight to Lisbon", "tint": "blue", "suggested": true}, {"day": "Sat 14", "time": "10:00", "title": "Walk through Alfama", "tint": "orange", "agent": true, "meta": "From the hotel"}, {"day": "Sat 14", "time": "20:00", "title": "Dinner at Taberna do Largo", "tint": "orange", "suggested": true}, {"day": "Sun 15", "time": "11:00", "title": "Check out", "tint": "orange", "meta": "By 11:00"}, {"day": "Sun 15", "time": "18:40", "title": "Flight home", "tint": "blue", "suggested": true}]}, {"type": "heading", "text": "Food"}, {"type": "paragraph", "claims": [{"id": "c5", "text": "Maja doesn’t eat meat, so dinners need good fish or vegetarian options.", "sources": ["s2"], "span": {"s2": "She doesn’t eat meat, so look for somewhere with good fish or something veggie."}}, {"id": "c6", "text": "November is mild — highs around 18 °C — but expect a few showers.", "sources": ["s6"], "span": {"s6": "daytime highs in Lisbon average around 18 °C"}}]}, {"type": "place", "placeId": "casa-alfama", "name": "Casa Alfama", "subtitle": "Rua dos Remédios 81 · Alfama", "pins": [{"x": 52, "y": 38, "tint": "red", "active": true, "label": "Casa Alfama"}, {"x": 28, "y": 30, "tint": "orange"}, {"x": 72, "y": 55, "tint": "orange"}]}, {"type": "heading", "text": "Packing"}, {"type": "paragraph", "claims": [{"id": "c7", "text": "Bring a light rain shell and shoes with real grip — the hills are steep and the stones get slippery.", "sources": ["s5"], "span": {"s5": "Shoes with real grip — the hills are steep and the stones get slippery."}}]}, {"type": "tasks", "from": {"module": "tasks", "list": "Lisbon trip"}, "list": "Lisbon trip", "items": [{"title": "Book airport transfer", "meta": "Arrive 21:55 Fri", "agent": true}, {"title": "Check passport expiry date", "meta": "Before booking flights"}, {"title": "Pack for Lisbon", "meta": "Fri 13 Nov"}, {"title": "Reserve dinner for two", "meta": "Sat 14 Nov", "done": true}]}, {"type": "questions", "items": [{"id": "q1", "q": "Do you and Maja fly together, or meet there?", "status": "open"}, {"id": "q2", "q": "Can you get a late check-out on Sunday?", "status": "open"}, {"id": "q3", "q": "Window or aisle?", "status": "answered", "answer": "Window.", "sources": ["s1"], "span": {"s1": "Window seat if you book anything."}}]}, {"type": "sources"}]} },
  { id: 'kitchen', title: 'Kitchen remodel', group: 'Home', updated: 'yesterday', doc: { blocks: [] } },
  { id: 'maja', title: 'Maja', group: 'People', updated: 'Sun', doc: { blocks: [] } },
  { id: 'tax-2026', title: 'Tax 2026', group: 'Money', updated: '18 Oct', doc: { blocks: [] } },
];
