import { useState, type ReactNode } from 'react';
import { TopEdge } from '@smoked-glass/ui';

/**
 * A scrolling page. The top half is for reading: a large title, then — once it
 * scrolls away — a small passive title in the top edge. No controls up here.
 */
export function Page({ eyebrow, title, children, wide, bare }: { eyebrow?: string; title?: string; children: ReactNode; wide?: boolean; bare?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  return (
    <>
      <div className="sg-pane-scroll" style={{ paddingBottom: 200, paddingTop: title ? undefined : 96 }} onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 60)}>
        {title ? (
          <header className="sg-pane-header" style={{ paddingTop: wide ? 40 : 72, maxWidth: bare ? 'none' : undefined }}>
            {eyebrow ? <p className="sg-pane-eyebrow footnote">{eyebrow}</p> : null}
            <h1 className="sg-pane-title large-title">{title}</h1>
          </header>
        ) : null}
        <div className="sg-pane-content" style={bare ? { maxWidth: 'none' } : undefined}>{children}</div>
      </div>
      {title ? <TopEdge title={title} show={scrolled} /> : null}
    </>
  );
}

/** A conversation-style page: no large title, the title lives in the top edge. */
export function Thread({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <div className="sg-pane-scroll" style={{ paddingTop: 96, paddingBottom: 220 }}>
        <div className="sg-pane-content" style={{ gap: 16 }}>{children}</div>
      </div>
      <TopEdge title={title} show />
    </>
  );
}
