import type { ComponentType } from 'react';
import type { IconName } from '@smoked-glass/ui';
import type { ModuleId, Route } from '../model/types';

/**
 * A module plugs into the shell with three views:
 *  - List:   its root on a phone, and the left half on wide screens (never requests bar controls)
 *  - Item:   whatever a route points at; it requests the bar's controls with useBar()
 *  - Root:   optional — what a phone shows at the root instead of List (e.g. Calendar's views)
 * `home` is the route the right half shows on wide screens before anything is picked.
 */
export interface ModuleDef {
  id: ModuleId;
  label: string;
  icon: IconName;
  badge?: number;
  List: ComponentType;
  Item?: ComponentType<{ route: Route }>;
  Root?: ComponentType;
  home?: Route;
}
