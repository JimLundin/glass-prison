import { useState, type ReactNode } from 'react';
import { TopEdge } from './TopEdge';

/** The scrolling page used by the application screens. Controls stay in the dock. */
export function Page({ eyebrow, title, children, wide, bare, leading, gap }: { eyebrow?: string; title?: string; children?: ReactNode; wide?: boolean; bare?: boolean; leading?: ReactNode; gap?: number }) {
  const [scrolled, setScrolled] = useState(false);
  return <>
    <div className="sg-pane-scroll" style={{ paddingBottom: 200, paddingTop: title ? undefined : 96 }} onScroll={e => setScrolled(e.currentTarget.scrollTop > 60)}>
      {title ? <header className="sg-pane-header" style={{ paddingTop: wide ? 40 : 72, maxWidth: bare ? 'none' : undefined,
        ...(leading ? { display: 'flex', alignItems: 'center', gap: 16 } : {}) }}>
        {leading}
        <div>
          {eyebrow ? <p className="sg-pane-eyebrow footnote">{eyebrow}</p> : null}
          <h1 className="sg-pane-title large-title">{title}</h1>
        </div>
      </header> : null}
      <div className="sg-pane-content" style={{ maxWidth: bare ? 'none' : undefined, gap }}>{children}</div>
    </div>
    {title ? <TopEdge title={title} show={scrolled} /> : null}
  </>;
}

export function Thread({ title, children }: { title: string; children: ReactNode }) {
  return <>
    <div className="sg-pane-scroll" style={{ paddingTop: 96, paddingBottom: 220 }}>
      <div className="sg-pane-content" style={{ gap: 16 }}>{children}</div>
    </div>
    <TopEdge title={title} show />
  </>;
}
