import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from 'react';
import type { ClusterProps } from '@smoked-glass/ui';

/**
 * Pages never lay out the bottom bar — they *request* things from it, and each
 * kind of request always lands in the same place:
 *   field or switcher → the centre · Primary → the trailing circle
 *   Actions → the … bloom (or icons on desktop) · Back is added by the shell.
 * Only the open item (the main pane) requests; lists in the left half never do.
 */
export type BarRequests = Pick<ClusterProps, 'accessory' | 'primary' | 'actions'>;

const SetCtx = createContext<(r: BarRequests | null) => void>(() => {});
const ValueCtx = createContext<BarRequests | null>(null);

export function BarProvider({ children }: { children: ReactNode }) {
  const [req, setReq] = useState<BarRequests | null>(null);
  return <SetCtx.Provider value={setReq}><ValueCtx.Provider value={req}>{children}</ValueCtx.Provider></SetCtx.Provider>;
}
/** Ask the bar for a field, switcher, Primary and actions. List the values the request depends on in `deps`. */
export function useBar(requests: BarRequests, deps: unknown[]) {
  const set = useContext(SetCtx);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => { set(requests); return () => set(null); }, deps);
}
export function useBarRequests() { return useContext(ValueCtx); }
