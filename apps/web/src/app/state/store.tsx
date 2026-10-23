import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { CHATS, PROMPTS } from '../../data/chats';
import { TASKS } from '../../data/tasks';
import type { Chat, Prompt, Task } from '../../model/types';

/** In-memory stand-in for the real backend. Swap this file for your API client. */
interface Store {
  chats: Chat[]; prompts: Record<string, Prompt>; tasks: Task[];
  answerPrompt(id: string, answer: string): void;
  send(chatId: string, text: string): void;
  addTask(list: string, title: string): void;
  toggleTask(id: string, done: boolean): void;
  theme: 'auto' | 'dark' | 'light'; setTheme(t: 'auto' | 'dark' | 'light'): void;
}
const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState(CHATS);
  const [prompts, setPrompts] = useState(PROMPTS);
  const [tasks, setTasks] = useState(TASKS);
  const [theme, setTheme] = useState<'auto' | 'dark' | 'light'>('dark');
  const value = useMemo<Store>(() => ({
    chats, prompts, tasks, theme, setTheme,
    answerPrompt: (id, answer) => setPrompts((p) => ({ ...p, [id]: { ...p[id], state: 'done', answer } })),
    send: (chatId, text) => setChats((cs) => cs.map((c) => c.id !== chatId ? c : { ...c, turns: [...c.turns, { kind: 'user', text }, { kind: 'agent', text: 'On it — I’ll add what I find to the Lisbon trip page.' }] })),
    addTask: (list, title) => setTasks((ts) => [{ id: 't' + Date.now(), list, title, due: 'today' }, ...ts]),
    toggleTask: (id, done) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done } : t))),
  }), [chats, prompts, tasks, theme]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useStore() { const v = useContext(Ctx); if (!v) throw new Error('useStore outside StoreProvider'); return v; }
