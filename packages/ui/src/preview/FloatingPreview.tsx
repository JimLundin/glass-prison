import { useCallback, useLayoutEffect, useRef, type ReactNode } from 'react';

/** Preview controls move independently of the application being inspected. */
export function FloatingPreview({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null), controls = useRef<HTMLDivElement>(null);
  const position = useRef<{ x: number; y: number } | null>(null);
  const drag = useRef<{ id: number; startX: number; startY: number; x: number; y: number } | null>(null);
  const place = useCallback(() => {
    const outer = frame.current, inner = controls.current;
    if (!outer || !inner) return;
    const maxX = Math.max(0, outer.clientWidth - inner.offsetWidth), maxY = Math.max(0, outer.clientHeight - inner.offsetHeight);
    const next = { x: Math.max(0, Math.min(position.current?.x ?? maxX / 2, maxX)), y: Math.max(0, Math.min(position.current?.y ?? 0, maxY)) };
    if (position.current) position.current = next;
    inner.style.transform = `translate(${next.x}px, ${next.y}px)`;
  }, []);
  useLayoutEffect(() => {
    place();
    const observer = new ResizeObserver(place);
    if (frame.current) observer.observe(frame.current);
    if (controls.current) observer.observe(controls.current);
    return () => observer.disconnect();
  }, [place]);
  return <div ref={frame} className="sg-preview-control-layer">
    <div ref={controls} className="sg-preview-controls" onPointerDown={event => {
      if (event.button !== 0 || !event.isPrimary || drag.current || !(event.target instanceof Element)) return;
      const handle = event.target.closest('[data-preview-grip]');
      if (!handle) return;
      const bounds = event.currentTarget.getBoundingClientRect(), outer = frame.current!.getBoundingClientRect();
      drag.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, x: bounds.left - outer.left, y: bounds.top - outer.top };
      handle.setPointerCapture(event.pointerId);
    }} onPointerMove={event => {
      const current = drag.current;
      if (!current || current.id !== event.pointerId) return;
      position.current = { x: current.x + event.clientX - current.startX, y: current.y + event.clientY - current.startY };
      place();
    }} onLostPointerCapture={event => { if (drag.current?.id === event.pointerId) drag.current = null; }} onKeyDown={event => {
      if (!(event.target instanceof Element) || !event.target.closest('[data-preview-grip]')) return;
      const step = event.shiftKey ? 40 : 10;
      const moves: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
      if (event.key === 'Home') position.current = null;
      else if (moves[event.key]) {
        const bounds = event.currentTarget.getBoundingClientRect(), outer = frame.current!.getBoundingClientRect(), [dx, dy] = moves[event.key]!;
        position.current = { x: bounds.left - outer.left + dx, y: bounds.top - outer.top + dy };
      } else return;
      event.preventDefault(); event.stopPropagation(); place();
    }}>{children}</div>
  </div>;
}
