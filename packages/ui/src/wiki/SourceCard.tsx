import type { SourceCardProps } from '../types';
import { actionButtons, useSwipeDown } from '../agent/Agent';
import { Icon } from '../primitives/Icon';
import { SourceTile, sourceKind } from './Wiki';

/** A stored source, with an exact selection when the caller has its offsets. */
export function SourceCard(p: SourceCardProps) {
  const src = p.source, kind = sourceKind(src), excerpt = src.excerpt ?? '';
  const selection = p.selection, span = p.span ?? '';
  const valid = selection && Number.isSafeInteger(selection.start) && Number.isSafeInteger(selection.end)
    && selection.start >= 0 && selection.end > selection.start && selection.end <= excerpt.length;
  const start = selection ? (valid ? selection.start : -1) : (span ? excerpt.indexOf(span) : -1);
  const end = selection ? (valid ? selection.end : -1) : start + span.length;
  const swipe = useSwipeDown(p.dismiss);
  return <section className={`sg-request sg-src-card${p.dismiss ? ' has-exit' : ''}${p.className ? ` ${p.className}` : ''}`} aria-label={`Source: ${src.title ?? ''}`} {...swipe}>
    <div className="sg-src-head"><SourceTile source={src} size={20} />
      <div className="sg-request-titles"><h2 className="headline">{src.title}</h2><p className="footnote">{kind.label}{src.when ? ` · ${src.when}` : ''}{src.where ? ` · ${src.where}` : ''}</p></div>
    </div>
    <blockquote className="body sg-src-quote">{src.speaker && <span className="footnote sg-src-speaker">{src.speaker}</span>}
      <span>{start >= 0 ? <>{excerpt.slice(0, start)}<mark>{excerpt.slice(start, end)}</mark>{excerpt.slice(end)}</> : excerpt}</span>
    </blockquote>
    {selection && !valid && <p className="footnote" role="status">The selected source range is unavailable.</p>}
    {src.origin && <p className="footnote sg-src-origin"><Icon name="globe" size={13} strokeWidth={2} /><span>{src.origin.replace(/^https?:\/\//, '')}</span>{src.captured && <span className="sg-src-captured">· saved {src.captured}</span>}</p>}
    {p.claim && <p className="footnote sg-src-for">Cited for “{p.claim}”</p>}
    {(p.actions || p.dismiss) && <div className="sg-request-foot"><span /><div className="sg-request-actions">{actionButtons(p.actions, p.dismiss)}</div></div>}
  </section>;
}
