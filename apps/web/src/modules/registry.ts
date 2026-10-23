import type { ModuleId } from '../model/types';
import type { ModuleDef } from './types';
import { chat } from './chat';
import { calendar } from './calendar';
import { tasks } from './tasks';
import { wiki } from './wiki';
import { you } from './you';

/** The modules, in the order they appear in navigation. Add one here and it shows up everywhere. */
export const MODULES: ModuleDef[] = [chat, calendar, tasks, wiki, you];
export const MODULE: Record<ModuleId, ModuleDef> = Object.fromEntries(MODULES.map((m) => [m.id, m])) as Record<ModuleId, ModuleDef>;
