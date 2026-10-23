import type { ReactNode } from 'react';
import type { ListRowProps, TaskRowProps, WikiDocProps } from '../types';
import { ListGroup, ListRow } from '../lists/List';
import { TaskRow } from '../modules/Rows';
import { WikiDoc } from '../wiki/Wiki';
import { Page } from '../layout/Page';

export type ViewRow = ListRowProps & { id: string };
export type TaskViewRow = TaskRowProps & { id: string };

export function ChatListView({ date, needsYou, recent, wide }: { date: string; needsYou: ViewRow[]; recent: ViewRow[]; wide?: boolean }) {
  return <Page eyebrow={date} title="Chat" wide={wide}>
    {needsYou.length ? <ListGroup header="Needs you" glass={false}>{needsYou.map(({ id, ...row }) => <ListRow key={id} {...row} />)}</ListGroup> : null}
    <ListGroup header="Recent" glass={false}>{recent.map(({ id, ...row }) => <ListRow key={id} {...row} />)}</ListGroup>
  </Page>;
}

export function TasksPage({ title, dueToday, today, upcoming, wide, children, mode = 'open' }: { title: string; dueToday: number; today: TaskViewRow[]; upcoming: TaskViewRow[]; wide?: boolean; children?: ReactNode; mode?: 'open' | 'done' }) {
  const row = ({ id, ...props }: TaskViewRow) => <TaskRow key={id} {...props} />;
  return <Page eyebrow={mode === 'done' ? undefined : `${dueToday} due today`} title={title} wide={wide}>
    {mode === 'done' ? <ListGroup header="Completed" glass={false}>{[...today, ...upcoming].map(row)}</ListGroup> : <>
      {today.length ? <ListGroup header="Today" glass={false}>{today.map(row)}</ListGroup> : null}
      {upcoming.length ? <ListGroup header="Upcoming" glass={false}>{upcoming.map(row)}</ListGroup> : null}
    </>}
    {!today.length && !upcoming.length ? <p className="body" style={{ color: 'var(--label-secondary)' }}>{mode === 'done' ? 'No completed tasks' : 'No open tasks'}</p> : null}
    {children}
  </Page>;
}

export function TaskListsView({ open, lists, done }: { open: number; lists: ViewRow[]; done?: ViewRow }) {
  const { id: _doneId, ...doneRow } = done ?? { id: 'done' };
  return <Page eyebrow={`${open} open`} title="Tasks" wide>
    <ListGroup header="Lists" glass={false}>{lists.map(({ id, ...row }) => <ListRow key={id} {...row} />)}</ListGroup>
    {done ? <ListGroup glass={false}><ListRow {...doneRow} title={done.title} /></ListGroup> : null}
  </Page>;
}

export function WikiListView({ pages, sources, wide }: { pages: ViewRow[]; sources: ViewRow[]; wide?: boolean }) {
  return <Page eyebrow={`${pages.length} pages · ${sources.length} sources`} title="Wiki" wide={wide}>
    <ListGroup header="Pages" glass={false}>{pages.map(({ id, ...row }) => <ListRow key={id} {...row} />)}</ListGroup>
    <ListGroup header="Sources" glass={false} footer="Each is a stored copy — a conversation, a voice note, a document, an image or a web page as it was when saved.">
      {sources.map(({ id, ...row }) => <ListRow key={id} {...row} />)}
    </ListGroup>
  </Page>;
}

export function WikiPageView({ title, eyebrow, wide, ...doc }: WikiDocProps & { title: string; eyebrow: string; wide?: boolean }) {
  return <Page title={title} eyebrow={eyebrow} wide={wide}><WikiDoc {...doc} /></Page>;
}

export function SearchResultsView({ query, groups, onAsk, wide, children }: { query: string; groups: Array<{ title: string; rows: ViewRow[] }>; onAsk(): void; wide?: boolean; children?: ReactNode }) {
  const total = groups.reduce((count, group) => count + group.rows.length, 0);
  return <Page eyebrow={`Search · ${total} results`} title={query || 'Search'} wide={wide}>
    {query.trim() ? <ListGroup glass={false}><ListRow icon="sparkle" tint="blue" title={`Ask the agent about “${query}”`} subtitle="Start a chat with this as the question" onClick={onAsk} /></ListGroup> : null}
    {groups.filter(group => group.rows.length).map(group => <ListGroup key={group.title} header={group.title} glass={false}>
      {group.rows.map(({ id, ...row }) => <ListRow key={id} {...row} />)}
    </ListGroup>)}
    {children}
  </Page>;
}
