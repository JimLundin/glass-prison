import { TaskListsView, TasksPage, type TaskViewRow } from '@smoked-glass/ui';
import { useBar } from '../../app/state/bar';
import { useNav } from '../../app/state/nav';
import { useSizeClass } from '../../app/state/size';
import { useStore } from '../../app/state/store';
import { LISTS } from '../../data/tasks';
import type { Route } from '../../model/types';

export function TasksView({ route }: { route?: Route }) {
  const store = useStore();
  const { size } = useSizeClass();
  const listId = route?.id ?? 'today';
  const list = LISTS.find((l) => l.id === listId) ?? LISTS[0];
  const tasks = store.tasks.filter((t) => (listId === 'today' ? true : t.list === listId));
  useBar({
    accessory: { kind: 'capture', key: 'cap:' + listId, placeholder: 'Add a task…', onSubmit: (t: string) => store.addTask(listId === 'today' ? 'home' : listId, t) },
    actions: [{ id: 'filter', label: 'Filter', icon: 'filter' }, { id: 'done', label: 'Show Done', icon: 'checkmark' }],
  }, [listId]);
  const today = tasks.filter((t) => t.due === 'today'), upcoming = tasks.filter((t) => t.due !== 'today');
  const row = (t: (typeof tasks)[number]): TaskViewRow => ({ id: t.id, title: t.title, meta: t.meta, done: !!t.done, agent: t.agent, onToggle: (d: boolean) => store.toggleTask(t.id, d) });
  return <TasksPage title={size === 'compact' && listId === 'today' ? 'Tasks' : list.title} wide={size !== 'compact'}
    dueToday={today.filter(t => !t.done).length} today={today.map(row)} upcoming={upcoming.map(row)} />;
}

export function TaskLists() {
  const store = useStore();
  const nav = useNav();
  return <TaskListsView open={store.tasks.filter(t => !t.done).length} lists={LISTS.map(l => ({
    id: l.id, icon: 'checklist', tint: l.tint, title: l.title,
    subtitle: `${store.tasks.filter(t => (l.id === 'today' ? t.due === 'today' : t.list === l.id) && !t.done).length} open`,
    onClick: () => nav.push({ view: 'list', id: l.id }),
  }))} />;
}
