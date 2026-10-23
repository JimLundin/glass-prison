import type { ModuleDef } from '../types';
import { YouAside, YouPermissions, YouView } from './YouView';

export const you: ModuleDef = { id: 'you', label: 'You', icon: 'person', List: YouAside, Root: YouView, Item: YouPermissions, home: { view: 'permissions' } };
