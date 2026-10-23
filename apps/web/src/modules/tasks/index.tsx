import type { ModuleDef } from '../types';
import { TaskLists, TasksView } from './TasksView';

export const tasks: ModuleDef = { id: 'tasks', label: 'Tasks', icon: 'checklist', List: TaskLists, Root: () => <TasksView />, Item: TasksView, home: { view: 'list', id: 'today' } };
