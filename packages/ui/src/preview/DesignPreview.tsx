import { useId, useLayoutEffect, useRef, useState } from 'react';
import { FloatingPreview } from './FloatingPreview';
import './styles.css';

export const previewSizes = [
  { id: 'window', label: 'Window', width: 0, height: 0 },
  { id: 'phone', label: 'Phone', width: 390, height: 844 },
  { id: 'folded', label: 'Folded', width: 466, height: 678 },
  { id: 'open', label: 'Open', width: 890, height: 626 },
  { id: 'desktop', label: 'Desktop', width: 1440, height: 900 },
] as const;
type Size = typeof previewSizes[number]['id'];

export interface DesignPreviewProps {
  src: string;
  label: string;
  ready?: boolean;
  referenceHref?: string;
  appHref?: string;
  onReset(frame: HTMLIFrameElement): void | Promise<void>;
}

export function PreviewLauncher({ href }: { href: string }) {
  return <div className="sg-preview-launcher"><a href={href} target="_blank" rel="noopener noreferrer">Size preview</a></div>;
}

/** One live viewport: changing size never replaces its document or application. */
export function DesignPreview({ src, label, ready = true, referenceHref, appHref, onReset }: DesignPreviewProps) {
  const [size, setSize] = useState<Size>(() => previewSizes.find(item => item.id === new URLSearchParams(location.search).get('size'))?.id ?? 'window');
  const [fit, setFit] = useState(() => new URLSearchParams(location.search).get('zoom') !== '100');
  const [expanded, setExpanded] = useState(() => innerWidth >= 840);
  const [bounds, setBounds] = useState({ width: innerWidth, height: innerHeight });
  const [toolbarHeight, setToolbarHeight] = useState(84), [resetting, setResetting] = useState(false), [resetError, setResetError] = useState<string | null>(null);
  const stage = useRef<HTMLDivElement>(null), frame = useRef<HTMLIFrameElement>(null), toolbar = useRef<HTMLElement>(null), initialSrc = useRef(src), panel = useId();
  useLayoutEffect(() => {
    const element = stage.current!;
    const measure = () => setBounds(current => current.width === element.clientWidth && current.height === element.clientHeight ? current : { width: element.clientWidth, height: element.clientHeight });
    const observer = new ResizeObserver(measure); observer.observe(element); measure();
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    const element = toolbar.current!;
    const observer = new ResizeObserver(() => setToolbarHeight(element.offsetHeight));
    observer.observe(element); setToolbarHeight(element.offsetHeight);
    return () => observer.disconnect();
  }, []);
  const preset = previewSizes.find(item => item.id === size)!;
  const fluid = size === 'window', width = fluid ? bounds.width : preset.width, height = fluid ? bounds.height : preset.height;
  const topSpace = toolbarHeight + 28;
  const scale = !fluid && fit ? Math.max(0.1, Math.min(1, (bounds.width - 48) / width, (bounds.height - topSpace - 24) / height)) : 1;
  function choose(next: Size, nextFit = fit) {
    setSize(next); setFit(nextFit);
    const url = new URL(location.href); url.searchParams.set('size', next); url.searchParams.set('zoom', nextFit ? 'fit' : '100');
    history.replaceState(null, '', url);
    stage.current?.scrollTo(0, 0);
  }
  async function reset() {
    if (!frame.current || resetting) return;
    setResetting(true); setResetError(null);
    try { await onReset(frame.current); }
    catch (error) { setResetError(error instanceof Error ? error.message : 'The preview could not reset. Try again.'); }
    finally { setResetting(false); }
  }
  return <div className="sg-preview" data-preview-size={size}>
    <div ref={stage} className="sg-preview-stage" aria-label="Preview canvas">
      <div className={`sg-preview-canvas${fluid ? ' is-fluid' : ''}`} style={{ minWidth: fluid ? '100%' : `max(100%, ${width * scale + 48}px)`, paddingTop: fluid ? 0 : topSpace }}>
        <div className="sg-preview-frame" style={{ width: width * scale, height: height * scale }}>
          <iframe ref={frame} src={initialSrc.current} title="Application preview" style={{ width, height, transform: `scale(${scale})` }} />
        </div>
      </div>
    </div>
    <FloatingPreview>
      <section ref={toolbar} className="sg-preview-toolbar" aria-label="Preview controls">
        <div className="sg-preview-tools-row">
          <button data-preview-grip className="sg-preview-grip" aria-label="Move preview controls" title="Drag to move. Arrow keys move; Home resets.">
            <svg width="16" height="20" viewBox="0 0 16 20" aria-hidden="true">{[5, 10, 15].flatMap(y => [5, 11].map(x => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="currentColor" />))}</svg>
          </button>
          <button className="sg-preview-toggle" aria-expanded={expanded} aria-controls={panel} onClick={() => setExpanded(value => !value)}>
            <strong>Preview</strong>{!expanded && <span>{preset.label} · {Math.round(scale * 100)}%</span>}<span aria-hidden="true">{expanded ? '−' : '+'}</span>
          </button>
          <div id={panel} className="sg-preview-options" hidden={!expanded}>
            <select aria-label="Preview size" value={size} onChange={event => choose(event.target.value as Size)}>
              {previewSizes.map(item => <option key={item.id} value={item.id}>{item.label}{item.width ? ` · ${item.width} × ${item.height}` : ''}</option>)}
            </select>
            <div className="sg-preview-zoom" role="group" aria-label="Preview zoom">
              <button aria-pressed={fit} onClick={() => choose(size, true)}>Fit</button>
              <button aria-pressed={!fit} onClick={() => choose(size, false)}>100%</button>
            </div>
            <button disabled={resetting || !ready} onClick={() => void reset()}>{resetting ? 'Resetting…' : 'Reset'}</button>
            {referenceHref && <a href={referenceHref} target="_blank" rel="noopener noreferrer">Reference</a>}
            {appHref && <a href={appHref}>App</a>}
          </div>
        </div>
        {expanded && <div className="sg-preview-description"><span>{label}</span><output aria-live="polite" aria-label="Preview dimensions">{Math.round(width)} × {Math.round(height)} · {Math.round(scale * 100)}%</output></div>}
        {resetError && <p className="sg-preview-error" role="alert">{resetError}</p>}
      </section>
    </FloatingPreview>
  </div>;
}
