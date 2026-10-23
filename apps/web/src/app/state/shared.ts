import { useSyncExternalStore } from 'react';

/** A tiny shared value — for state a module's list (left half) and item (right half) both need. */
export function shared<T>(initial: T) {
  let value = initial;
  const subs = new Set<() => void>();
  const set = (v: T | ((p: T) => T)) => { value = typeof v === 'function' ? (v as (p: T) => T)(value) : v; subs.forEach((f) => f()); };
  const use = () => [useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => value), set] as const;
  return { use, set, get: () => value };
}
