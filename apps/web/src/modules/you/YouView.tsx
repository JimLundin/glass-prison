import { ListGroup, ListRow, SettingChoices, YouPreferences, YouProfilePage, YouSections } from '@smoked-glass/ui';
import { Page } from '../../app/shell/Page';
import { useSizeClass } from '../../app/state/size';
import { useStore } from '../../app/state/store';
import { useNav } from '../../app/state/nav';
import { shared } from '../../app/state/shared';

const permissionState = shared({ calendar: 'Ask', tasks: 'Allowed', wiki: 'Allowed' });

function Permissions({ compact = true }: { compact?: boolean }) {
  const [permissions, setPermissions] = permissionState.use();
  const groups = [
    { id: 'calendar', title: 'Calendar', icon: 'calendar', tint: 'orange' },
    { id: 'tasks', title: 'Tasks', icon: 'checklist', tint: 'green' },
    { id: 'wiki', title: 'Wiki', icon: 'book', tint: 'teal' },
  ] as const;
  return (
    <ListGroup header={compact ? 'Agent permissions' : undefined} footer="Anything set to Ask comes to you as a card at the bottom of the screen first." glass={false}>
      {groups.map(({ id, ...setting }) => <SettingChoices key={id} {...setting} options={['Allowed', 'Ask']} value={permissions[id]} columns={2}
        onChange={value => setPermissions(current => ({ ...current, [id]: value }))} />)}
      <ListRow icon="globe" tint="blue" title="Web search" detail="Not connected" />
      <ListRow icon="location" tint="red" title="Location" detail="Not connected" />
    </ListGroup>
  );
}

function Preferences({ wide }: { wide?: boolean }) {
  const store = useStore();
  return <YouPreferences wide={wide} appearance={{ value: store.theme,
    options: [{ value: 'auto', label: 'Automatic' }, { value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }],
    onChange: value => { if (value === 'auto' || value === 'dark' || value === 'light') store.setTheme(value); },
  }} notifications="Not connected" onExit={() => {}} />;
}

/** Phone: everything on one page. You asks the bar for nothing. */
export function YouView() {
  const { size } = useSizeClass();
  return <YouProfilePage name="Jim" wide={size !== 'compact'}><Permissions /><Preferences /></YouProfilePage>;
}
/** Wide: sections on the left, permissions on the right. */
export function YouAside() {
  const nav = useNav(), [permissions] = permissionState.use();
  return <YouProfilePage name="Jim" wide>
    <YouSections permissions={`${Object.values(permissions).filter(value => value === 'Ask').length} ask first`} places="Not connected" onPermissions={() => nav.go('you')} />
    <Preferences wide />
  </YouProfilePage>;
}
export function YouPermissions() { return <Page eyebrow="You" title="Agent permissions" wide><Permissions compact={false} /></Page>; }
