/** Throwaway UX study: shared glass language, two different workspace structures. */
import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { Button, Checkbox, Cluster, Icon, Message, MonthGrid, TimeGrid, WeekStrip, DayAgendaView } from '../index';
import type { CalendarPageProps, IconName, TabBarItem } from '../index';
import './Workspace.prototype.css';

export interface StudyAction { label: string; icon?: IconName; onClick(): void; disabled?: boolean }
export interface StudyRow { id: string; title: string; subtitle?: string; detail?: string; icon?: IconName; selected?: boolean; onClick(): void }
export interface StudyGroup { title?: string; rows: StudyRow[] }
export interface StudyLayoutProps {
  module: string; modules: TabBarItem[]; onModule(id: string): void; onSearch(): void;
  collectionTitle: string; collectionSummary: string; groups: StudyGroup[];
  collectionTabs?: ReactNode; collectionPrimary?: StudyAction;
  title: string; eyebrow?: string; subtitle?: string; kind?: string;
  compact: boolean; browsing: boolean; onBrowse(value: boolean): void;
  primary?: StudyAction; back?: StudyAction; accessory?: ReactNode; secondary?: ReactNode;
  contentKey: string; scrollPositions: Map<string, number>; children: ReactNode; sheet?: ReactNode;
}

function Navigation(p: StudyLayoutProps) {
  return <nav className="sg-study-navigation" aria-label="Modules">
    <Cluster variant="bar" tabs={p.modules} tab={p.module} onTab={p.onModule}
      search={{ label: 'Search', onOpen: () => { p.onBrowse(false); p.onSearch(); } }} />
  </nav>;
}

export function StudyRows({ groups, label = 'Records' }: { groups: StudyGroup[]; label?: string }) {
  return <div className="sg-study-groups" aria-label={label}>{groups.map((group, index) => <section key={group.title ?? index}>
    {group.title && <h2 className="sg-study-group-title">{group.title}</h2>}
    {group.rows.map(row => <button key={row.id} className={`sg-study-row${row.selected ? ' is-selected' : ''}`} aria-current={row.selected ? 'page' : undefined} onClick={row.onClick}>
      {row.icon && <Icon name={row.icon} size={18} />}
      <span className="sg-study-row-copy"><span className="sg-study-row-title">{row.title}</span>{row.subtitle && <span className="sg-study-row-subtitle">{row.subtitle}</span>}</span>
      {row.detail && <span className="sg-study-row-detail">{row.detail}</span>}
      {row.selected && <span className="sg-study-selection" aria-hidden="true" />}
    </button>)}
  </section>)}</div>;
}

function Collection(p: StudyLayoutProps) {
  return <div className="sg-study-collection-scroll">
    <header className="sg-study-collection-header"><p className="sg-study-eyebrow">Your workspace</p><h1>{p.collectionTitle}</h1><p>{p.collectionSummary}</p></header>
    {p.collectionTabs && <div className="sg-study-collection-tabs">{p.collectionTabs}</div>}
    <StudyRows groups={p.groups} label={`${p.collectionTitle} collection`} />
  </div>;
}

function Content(p: StudyLayoutProps) {
  const scroll = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => { if (scroll.current) scroll.current.scrollTop = p.scrollPositions.get(p.contentKey) ?? 0; }, [p.contentKey]);
  return <div ref={scroll} className="sg-study-content-scroll" onScroll={e => p.scrollPositions.set(p.contentKey, e.currentTarget.scrollTop)}>
    <div className={`sg-study-content${p.kind === 'calendar' ? ' is-calendar' : ''}`}>
      <header className="sg-study-page-header"><p className="sg-study-eyebrow">{p.eyebrow ?? p.collectionTitle}</p><h1>{p.title}</h1>{p.subtitle && <p className="sg-study-summary">{p.subtitle}</p>}</header>
      {p.children}
    </div>
  </div>;
}

function Toolbar({ p, focus = false }: { p: StudyLayoutProps; focus?: boolean }) {
  const collection = p.compact && p.browsing;
  const primary = collection ? p.collectionPrimary : p.primary;
  const back = !collection ? p.back ?? ((p.compact || focus) ? { label: p.collectionTitle, icon: 'chevron-left' as const, onClick: () => p.onBrowse(true) } : undefined) : undefined;
  return <div className="sg-study-toolbar" role="toolbar" aria-label={`${p.collectionTitle} actions`}>
    {back && <Button icon={back.icon ?? 'chevron-left'} onClick={back.onClick} title={back.label} className="sg-study-back">{back.label}</Button>}
    {!collection && p.accessory && <div className="sg-study-accessory">{p.accessory}</div>}
    {!collection && p.secondary}
    {primary && <Button icon={primary.icon} onClick={primary.onClick} disabled={primary.disabled} className="sg-study-primary">{primary.label}</Button>}
  </div>;
}

/** A stable collection beside a working/reading pane. On phones both retain a home. */
export function WorkspaceVariant(p: StudyLayoutProps) {
  return <div className={`sg-study sg-study-workspace sg-study-module-${p.module}${p.compact ? ' is-compact' : ''}`}>
    {(!p.compact || p.browsing) && <aside className="sg-study-collection" aria-label={`${p.collectionTitle} navigation`}><Collection {...p} /></aside>}
    {(!p.compact || !p.browsing) && <main aria-label={p.title}><Content {...p} /></main>}
    <Navigation {...p} /><Toolbar p={p} />{p.sheet}
  </div>;
}

/** A reading-first alternative: one canvas, with its collection available on demand. */
export function FocusVariant(p: StudyLayoutProps) {
  const collection = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!p.browsing) return;
    const element = collection.current!; element.showModal();
    return () => element.close();
  }, [p.browsing]);
  return <div className={`sg-study sg-study-focus sg-study-module-${p.module}${p.compact ? ' is-compact' : ''}`}>
    <main aria-label={p.title}><Content {...p} /></main>
    {p.browsing && <dialog ref={collection} className="sg-study-focus-collection" aria-label={`${p.collectionTitle} navigation`}
      onCancel={event => { event.preventDefault(); p.onBrowse(false); }}><Collection {...p} />
        <Button icon="chevron-left" onClick={() => p.onBrowse(false)} className="sg-study-collection-close">Back to {p.title}</Button>
        <Navigation {...p} />
      </dialog>}
    {!p.browsing && <Navigation {...p} />}<Toolbar p={p} focus />{p.sheet}
  </div>;
}

export function StudySection({ title, aside, children }: { title: string; aside?: ReactNode; children: ReactNode }) {
  return <section className="sg-study-section"><div className="sg-study-section-heading"><h2>{title}</h2>{aside}</div>{children}</section>;
}
export function StudyNote({ children }: { children: ReactNode }) { return <p className="sg-study-note">{children}</p>; }
export function StudyLead({ children }: { children: ReactNode }) { return <p className="sg-study-lead">{children}</p>; }
export function StudyStats({ items }: { items: { value: string | number; label: string }[] }) {
  return <div className="sg-study-stats">{items.map(item => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>;
}
export function StudyArticle({ blocks }: { blocks: { id: string; text: string; heading?: boolean; onCite?: () => void }[] }) {
  return <article className="sg-study-article">{blocks.map(block => block.heading ? <h2 key={block.id}>{block.text}</h2>
    : <p key={block.id}>{block.onCite ? <button className="sg-study-claim" onClick={block.onCite} title="Read the supporting source">{block.text}<Icon name="quote" size={14} /></button> : block.text}</p>)}</article>;
}
export function StudySource({ text, selection, author, date }: { text: string; selection?: { start: number; end: number }; author: string; date: string }) {
  const mark = useRef<HTMLElement>(null);
  useEffect(() => { mark.current?.scrollIntoView({ block: 'center' }); }, [text, selection?.start]);
  return <article className="sg-study-source"><div className="sg-study-source-meta"><Icon name="doc" size={18} /><span>{author} · {date}<small>Original words</small></span></div>
    <div className="sg-study-source-text">{selection ? <>{text.slice(0, selection.start)}<mark ref={mark}>{text.slice(selection.start, selection.end)}</mark>{text.slice(selection.end)}</> : text}</div>
  </article>;
}
export function StudyConversation({ turns }: { turns: { id: string; from: 'user' | 'agent' | 'system'; text: string }[] }) {
  return <div className="sg-study-conversation">{turns.map(turn => <Message key={turn.id} from={turn.from}>{turn.text}</Message>)}</div>;
}
export function StudyTasks({ tasks }: { tasks: { id: string; title: string; meta: string; done: boolean; onToggle(done: boolean): void; onOpen(): void }[] }) {
  return <div className="sg-study-tasks">{tasks.map(task => <div key={task.id} className={`sg-study-task${task.done ? ' is-done' : ''}`}>
    <Checkbox checked={task.done} onChange={task.onToggle} label={`${task.done ? 'Reopen' : 'Complete'} ${task.title}`} />
    <button onClick={task.onOpen}><span>{task.title}</span><small>{task.meta}</small></button>
  </div>)}</div>;
}
export function StudyChoices({ label, value, options, onChange, description }: { label: string; value: string; options: string[]; onChange(value: string): void; description?: string }) {
  return <div className="sg-study-setting"><div><strong>{label}</strong>{description && <p>{description}</p>}</div>
    <div className="sg-study-choices" role="radiogroup" aria-label={label}>{options.map(option => <button type="button" role="radio" aria-checked={option === value} key={option} onClick={() => onChange(option)}>{option}</button>)}</div>
  </div>;
}
export function StudyInput({ label, value, onChange, type = 'text', placeholder }: { label: string; value: string; onChange(value: string): void; type?: string; placeholder?: string }) {
  return <label className="sg-study-field"><span>{label}</span><input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.currentTarget.value)} /></label>;
}
export function StudyTextArea({ label, value, onChange, placeholder }: { label: string; value: string; onChange(value: string): void; placeholder?: string }) {
  return <label className="sg-study-field"><span>{label}</span><textarea value={value} placeholder={placeholder} onChange={e => onChange(e.currentTarget.value)} rows={4} /></label>;
}
export function StudyPicker({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange(value: string): void }) {
  return <label className="sg-study-picker sg-glass sg-glass-regular"><span className="sg-vh">{label}</span><select aria-label={label} value={value} onChange={e => onChange(e.currentTarget.value)}>{options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}</select></label>;
}
export function StudyCalendar(p: CalendarPageProps) {
  return <div className="sg-study-calendar">{p.range === 'day' ? <><WeekStrip {...p.week} /><TimeGrid {...p.grid} hourHeight={48} /></>
    : p.range === 'week' ? <TimeGrid {...p.grid} hourHeight={40} compact={p.size !== 'large'} />
      : <><MonthGrid {...p.month} titles={p.size === 'large'} /><DayAgendaView {...p.agenda} /></>}</div>;
}
export function StudySheet({ title, eyebrow, children, onClose, primary, dismissLabel = 'Cancel' }: { title: string; eyebrow?: string; children: ReactNode; onClose(): void; primary?: StudyAction; dismissLabel?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const element = dialog.current!; element.showModal(); return () => element.close(); }, []);
  return <dialog ref={dialog} className="sg-study-sheet sg-glass sg-glass-thick" aria-label={title} onCancel={e => { e.preventDefault(); onClose(); }}>
    <div className="sg-study-sheet-body"><header><p className="sg-study-eyebrow">{eyebrow}</p><h2>{title}</h2></header>{children}</div>
    <footer><Button variant="plain" onClick={onClose}>{dismissLabel}</Button>{primary && <Button variant="filled" icon={primary.icon} onClick={primary.onClick} disabled={primary.disabled}>{primary.label}</Button>}</footer>
  </dialog>;
}

/** Outside the application viewport: comparison controls never cover product controls. */
export function StudyComparison({ value, onChange, state, children }: {
  value: string; onChange(value: string): void; state: unknown; children: ReactNode;
}) {
  const variants = [{ id: 'current', label: 'Current', description: 'The application as it is today.' },
    { id: 'workspace', label: 'Workspace', description: 'A stable collection beside your work.' },
    { id: 'focus', label: 'Focus', description: 'One canvas. Browse the collection when you need it.' }];
  const active = Math.max(0, variants.findIndex(variant => variant.id === value));
  return <div className="sg-study-comparison">
    {children}
    <footer className="sg-study-comparison-footer" aria-label="Design comparison">
      <div className="sg-study-comparison-caption"><strong>Structure study</strong><span>{variants[active]!.description}</span></div>
      <div className="sg-study-variant-picker" role="group" aria-label="UI variant">
        <button aria-label="Previous design" onClick={() => onChange(variants[(active + 2) % 3]!.id)}>←</button>
        {variants.map((variant, index) => <button key={variant.id} aria-pressed={value === variant.id} onClick={() => onChange(variant.id)}><span>{index + 1}</span>{variant.label}</button>)}
        <button aria-label="Next design" onClick={() => onChange(variants[(active + 1) % 3]!.id)}>→</button>
      </div>
      <details className="sg-study-state"><summary>View state</summary><pre>{JSON.stringify(state, null, 2)}</pre></details>
    </footer>
  </div>;
}
