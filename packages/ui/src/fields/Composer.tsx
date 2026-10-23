import { useLayoutEffect, useRef, useState } from 'react';
import type { ComposerProps } from '../types';
import { IconButton } from '../primitives/Button';

/** Controlled drafts belong to the caller; uncontrolled drafts clear after acceptance. */
export function Composer(p: ComposerProps) {
  const [draft, setDraft] = useState(p.defaultValue ?? '');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sending = useRef(false);
  const input = useRef<HTMLTextAreaElement>(null);
  const value = p.value ?? draft;
  const busy = pending || p.pending;
  const available = !!value.trim() && !p.disabled && !busy && (!p.working || p.submitWhileWorking);

  useLayoutEffect(() => {
    const element = input.current;
    if (!element) return;
    const measure = () => {
      element.style.height = '22px';
      element.style.height = `${Math.min(Math.max(element.scrollHeight - 26, 22), 160)}px`;
    };
    let width = element.clientWidth;
    measure();
    const observer = new ResizeObserver(() => {
      const next = element.clientWidth;
      if (next !== width) { width = next; measure(); }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  async function send() {
    if (!available || sending.current || !p.onSend) return;
    sending.current = true; setPending(true); setError(null);
    const submitted = value;
    try {
      await p.onSend(submitted);
      if (p.value === undefined) setDraft(current => current === submitted ? '' : current);
    } catch (failure) {
      if (p.onSendError) p.onSendError(failure);
      else setError(failure instanceof Error ? failure.message : 'Unable to send. Your draft is still here.');
    } finally { sending.current = false; setPending(false); }
  }

  return <div>
    <div className={`sg-composer sg-glass sg-glass-regular${p.working ? ' is-working' : ''}${p.className ? ` ${p.className}` : ''}`} aria-busy={busy || undefined}>
      {p.onAttach && <IconButton icon="plus" label="Add" variant="plain" className="sg-composer-btn" onClick={p.onAttach} />}
      <textarea ref={input} rows={1} className="sg-composer-input body" value={value}
        placeholder={p.working ? p.status ?? 'Working…' : p.placeholder ?? 'Message'}
        disabled={p.disabled || busy} aria-label={p.placeholder ?? 'Message'} enterKeyHint="send"
        onChange={event => { setDraft(event.target.value); p.onChange?.(event.target.value); }}
        onKeyDown={event => {
          if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.nativeEvent.keyCode !== 229) {
            event.preventDefault(); void send();
          }
        }} />
      {p.tools}
      {p.working && p.onStop
        ? <button type="button" className="sg-iconbtn sg-iconbtn-accent sg-composer-btn sg-composer-send" aria-label="Stop" onClick={p.onStop}>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><rect x="1" y="1" width="10" height="10" rx="2.5" fill="currentColor" /></svg>
          </button>
        : value.trim()
          ? <IconButton icon="arrow-up" label={busy ? 'Saving' : 'Send'} variant="accent" disabled={!available} className="sg-composer-btn sg-composer-send" onClick={() => void send()} />
          : p.onDictate && <IconButton icon="mic" label="Dictate" variant="plain" className="sg-composer-btn" onClick={p.onDictate} />}
    </div>
    {error && <p className="footnote" role="alert">{error}</p>}
  </div>;
}
