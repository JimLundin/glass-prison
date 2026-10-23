import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

/**
 * Focus cards: a permission, a question, a place, an event, a source.
 * The card takes the whole bottom bar until it is answered or left
 * (its dismiss circle, a swipe down, or Esc). Only ever opened by the user's own tap.
 */
export type FocusSpec = { kind: 'request' | 'question' | 'card' | 'source'; key: string; dismiss?: { icon?: string; label?: string; kbd?: string; onClick?: () => void }; actions?: { label: string; variant?: string; kbd?: string; onClick?: () => void }[]; [k: string]: unknown };
interface Focus { spec: FocusSpec | null; open(spec: FocusSpec): void; close(): void }
const Ctx = createContext<Focus | null>(null);

export function FocusProvider({ children }: { children: ReactNode }) {
  const [spec, setSpec] = useState<FocusSpec | null>(null);
  const value = useMemo<Focus>(() => ({
    spec,
    close: () => setSpec(null),
    open: (s) => setSpec({
      ...s,
      // answering or leaving always closes the card
      actions: s.actions?.map((a) => ({ ...a, onClick: () => { a.onClick?.(); setSpec(null); } })),
      dismiss: { icon: 'xmark', label: 'Later', ...s.dismiss, onClick: () => { s.dismiss?.onClick?.(); setSpec(null); } },
    }),
  }), [spec]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useFocus() { const v = useContext(Ctx); if (!v) throw new Error('useFocus outside FocusProvider'); return v; }
