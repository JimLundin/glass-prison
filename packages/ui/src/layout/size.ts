import { useEffect, useState } from 'react';

/**
 * compact  — phones and the folded Duo: one pane, one bar, menus bloom.
 * expanded — the open Duo and tablets: list | item, two bars, circles gathered in the right thumb's corner.
 * large    — desktop with a pointer: the same two bars, actions laid flat as icons.
 */
export type SizeClass = 'compact' | 'expanded' | 'large';
export function sizeClassFor(width: number): SizeClass {
  if (width < 840) return 'compact';
  const pointer = typeof matchMedia !== 'undefined' && matchMedia('(pointer: fine)').matches;
  return width >= 1200 || (pointer && width >= 1000) ? 'large' : 'expanded';
}
export function useSizeClass() {
  const [w, setW] = useState(() => window.innerWidth);
  useEffect(() => { const on = () => setW(window.innerWidth); window.addEventListener('resize', on); return () => window.removeEventListener('resize', on); }, []);
  return { size: sizeClassFor(w), hinged: w >= 840 && w < 1000 };
}
