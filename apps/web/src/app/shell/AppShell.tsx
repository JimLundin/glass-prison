import { Cluster, type ClusterProps } from '@smoked-glass/ui';
import { MODULE, MODULES } from '../../modules/registry';
import { PlaceView } from '../../modules/places/PlaceView';
import { SearchResults } from '../../modules/search/SearchResults';
import { useBarRequests } from '../state/bar';
import { useFocus } from '../state/focus';
import { useNav } from '../state/nav';
import { useSizeClass } from '../state/size';
import { useStore } from '../state/store';
import type { ModuleId } from '../../model/types';

/**
 * The shell owns the bottom bar; pages only request things from it.
 *
 * compact  (phone, Duo folded): one pane, one bar — [… / Primary] [field / switcher] [Back / module].
 *          The module circle blooms into the modules and turns the centre into search.
 * expanded (Duo open, tablet):  list | item. Left bar = modules laid flat + search;
 *          right bar = the item's requests, circles gathered in the right thumb's corner.
 * large    (desktop):           the same two bars; actions lie flat as icons.
 */
export function AppShell() {
  const { size, hinged } = useSizeClass();
  const nav = useNav();
  const focus = useFocus();
  const store = useStore();
  const bar = useBarRequests();
  const M = MODULE[nav.module];
  const compact = size === 'compact';
  const tabs = MODULES.map((m) => ({ id: m.id, label: m.label, icon: m.icon, badge: m.id === 'tasks' ? store.tasks.filter((t) => t.due === 'today' && !t.done).length || undefined : undefined }));
  const onTab = (id: string) => nav.go(id as ModuleId);
  const route = nav.stack[nav.stack.length - 1] ?? (compact ? undefined : M.home);

  const main = nav.place ? <PlaceView id={nav.place} />
    : nav.search !== null ? <SearchResults />
    : route && M.Item ? <M.Item route={route} />
    : M.Root ? <M.Root /> : <M.List />;

  const canBack = !!nav.place || nav.search !== null || nav.stack.length > (compact ? 0 : 1);
  const itemBar: ClusterProps = {
    variant: 'row', tabs: compact ? tabs : [], tab: nav.module, onTab,
    search: compact ? { placeholder: 'Search everything', onQuery: (q) => nav.setSearch(q) } : null,
    back: canBack ? { onClick: nav.back, label: nav.search !== null ? 'Close Search' : 'Back' } : null,
    accessory: bar?.accessory ?? null, primary: bar?.primary ?? null, actions: bar?.actions ?? [],
    // keys are shown inside buttons only where there is a keyboard
    sheet: (focus.spec && size !== 'large' ? stripKeys(focus.spec) : focus.spec) as ClusterProps['sheet'],
    gather: size === 'expanded', flat: size === 'large',
  };

  if (compact) return (
    <div className="sg-screen">
      <main className="sg-pane sg-pane-main" aria-label={M.label}>
        {main}
        <div className="sg-dock"><Cluster {...itemBar} /></div>
      </main>
    </div>
  );

  const searching = nav.search !== null;
  return (
    <div className={'sg-screen has-aside' + (hinged ? ' is-hinged' : '')}>
      <aside className="sg-pane sg-pane-aside" aria-label={M.label}>
        <M.List />
        <div className="sg-dock">
          <Cluster variant="bar" aria-label="Navigation" tabs={tabs} tab={nav.module} onTab={onTab}
            search={searching ? null : { label: 'Search', onOpen: () => nav.setSearch('') }}
            minimized={searching} onExpand={() => nav.setSearch(null)}
            accessory={searching ? { kind: 'query', key: 'search', placeholder: 'Search everything', autoFocus: true, defaultValue: nav.search ?? '', onChange: (v: string) => nav.setSearch(v), onCancel: () => nav.setSearch(null) } : null} />
        </div>
      </aside>
      <main className="sg-pane sg-pane-main" aria-label={M.label}>
        {main}
        <div className="sg-dock"><Cluster {...itemBar} /></div>
      </main>
    </div>
  );
}

function stripKeys<T extends { actions?: { kbd?: string }[]; dismiss?: { kbd?: string } }>(spec: T): T {
  return { ...spec, actions: spec.actions?.map(({ kbd: _k, ...a }) => a), dismiss: spec.dismiss ? { ...spec.dismiss, kbd: undefined } : undefined };
}
