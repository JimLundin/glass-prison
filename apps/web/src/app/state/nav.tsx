import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ModuleId, Route } from '../../model/types';

/**
 * Navigation: one module at a time, each with its own stack of routes.
 * On a phone the empty stack shows the module's list; on wide screens the
 * list sits in the left half and the top of the stack (or the module's
 * default route) fills the right half.
 */
interface Nav {
  module: ModuleId;
  stack: Route[];
  /** a place opened over the current screen (from a chip or a map card) */
  place: string | null;
  search: string | null;
  go(module: ModuleId, route?: Route): void;
  push(route: Route): void;
  back(): void;
  openPlace(id: string | null): void;
  setSearch(q: string | null): void;
}
const Ctx = createContext<Nav | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [module, setModule] = useState<ModuleId>('chat');
  const [stacks, setStacks] = useState<Partial<Record<ModuleId, Route[]>>>({});
  const [place, setPlace] = useState<string | null>(null);
  const [search, setSearchState] = useState<string | null>(null);
  const value = useMemo<Nav>(() => ({
    module, stack: stacks[module] ?? [], place, search,
    go(m, route) { setModule(m); setPlace(null); setSearchState(null); if (route) setStacks((s) => ({ ...s, [m]: [route] })); },
    push(route) { setPlace(null); setSearchState(null); setStacks((s) => ({ ...s, [module]: [...(s[module] ?? []), route] })); },
    back() {
      if (place) return setPlace(null);
      if (search !== null) return setSearchState(null);
      setStacks((s) => ({ ...s, [module]: (s[module] ?? []).slice(0, -1) }));
    },
    openPlace: setPlace,
    setSearch: setSearchState,
  }), [module, stacks, place, search]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useNav() { const v = useContext(Ctx); if (!v) throw new Error('useNav outside NavProvider'); return v; }
