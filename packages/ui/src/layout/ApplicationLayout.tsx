import type { ReactNode, Ref } from 'react';
import { Cluster } from './Cluster';
import type { ClusterProps, TabBarItem } from '../types';

export interface ApplicationLayoutProps {
  size: 'compact' | 'expanded' | 'large';
  hinged?: boolean;
  label: string;
  tabs: TabBarItem[];
  tab: string;
  onTab(id: string): void;
  aside: ReactNode;
  children: ReactNode;
  bar: Pick<ClusterProps, 'accessory' | 'primary' | 'actions' | 'back' | 'sheet'>;
  search: { query: string | null; onChange(query: string | null): void };
  className?: string;
  mainRef?: Ref<HTMLElement>;
  dockRef?: Ref<HTMLDivElement>;
}

/** The original one-pane / two-pane shell, shared by the demo and connected hosts. */
export function ApplicationLayout({ size, hinged, label, tabs, tab, onTab, aside, children, bar, search, className = '', mainRef, dockRef }: ApplicationLayoutProps) {
  const compact = size === 'compact', searching = search.query !== null;
  return <div className={`sg-screen${compact ? '' : ' has-aside'}${hinged ? ' is-hinged' : ''} ${className}`}>
    {!compact && <aside className="sg-pane sg-pane-aside" aria-label={`${label} navigation`}>
      {aside}
      <div className="sg-dock">
        <Cluster variant="bar" aria-label="Navigation" tabs={tabs} tab={tab} onTab={onTab}
          search={searching ? null : { label: 'Search', onOpen: () => search.onChange('') }}
          minimized={searching} onExpand={() => search.onChange(null)}
          accessory={searching ? { kind: 'query', key: 'search', placeholder: 'Search everything', autoFocus: true, value: search.query ?? '', onChange: (value: string) => search.onChange(value), onCancel: () => search.onChange(null) } : null} />
      </div>
    </aside>}
    <main ref={mainRef} className="sg-pane sg-pane-main" aria-label={label}>
      {children}
      <div className="sg-dock" ref={dockRef}>
        <Cluster variant="row" tabs={compact ? tabs : []} tab={tab} onTab={onTab}
          search={compact ? { placeholder: 'Search everything', onQuery: (query: string) => search.onChange(query) } : null}
          gather={size === 'expanded'} flat={size === 'large'} {...bar} />
      </div>
    </main>
  </div>;
}
