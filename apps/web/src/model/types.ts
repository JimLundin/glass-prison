/**
 * The app's data model. Modules own their records; other modules only ever
 * reference them by id (a wiki timeline is a query into Calendar, not a copy).
 */
import type { IconName, SystemColor, WikiDocument, WikiSource } from '@smoked-glass/ui';

export type ModuleId = 'chat' | 'calendar' | 'tasks' | 'wiki' | 'you';

/* ---------- Chat ---------- */
export type Turn =
  | { kind: 'system'; text: string }
  | { kind: 'user'; text: string }
  | { kind: 'agent'; text: string }
  | { kind: 'steps'; steps: { icon: IconName; label: string; status: 'done' | 'running' | 'failed' }[] }
  | { kind: 'item'; icon: IconName; tint: SystemColor; title: string; subtitle: string; link: Link }
  | { kind: 'place'; label: string; placeId: string }
  | { kind: 'prompt'; promptId: string };

/** Something the agent needs from you: shown once in the chat, answered in the bar's focus card. */
export type Prompt =
  | { id: string; kind: 'permission'; icon: IconName; tint: SystemColor; title: string; card: { title: string; description: string; detail: string[]; remember?: string }; state: 'pending' | 'done'; answer?: string }
  | { id: string; kind: 'question'; icon: IconName; tint: SystemColor; title: string; options: { value: string; label: string; detail?: string }[]; state: 'pending' | 'done'; answer?: string };

export interface Chat { id: string; title: string; icon: IconName; tint: SystemColor; subtitle: string; needsYou?: boolean; turns: Turn[] }

/* ---------- Calendar ---------- */
export interface CalEvent { id: string; date: string; start: string; end: string; title: string; tint: SystemColor; place?: string; suggested?: boolean; agent?: boolean }
export interface CalSpanEvent { id: string; from: string; to: string; title: string; tint: SystemColor; agent?: boolean }

/* ---------- Tasks ---------- */
export interface Task { id: string; list: string; title: string; meta?: string; done?: boolean; agent?: boolean; due?: 'today' | 'upcoming' }

/* ---------- Places ---------- */
export interface Place { id: string; name: string; kind: string; address: string; lines: { icon: IconName; text: string }[]; pins: { x: number; y: number; tint?: SystemColor; label?: string; active?: boolean }[] }

/* ---------- Wiki ---------- */
export interface WikiPage { id: string; title: string; group: string; updated: string; doc: WikiDocument }
export type { WikiSource };

/* ---------- Navigation ---------- */
export type Link = { module: ModuleId; route?: Route } | { place: string };
export type Route = { view: string; id?: string };
