import { ListGroup, ListRow } from '@smoked-glass/ui';
import { Page } from '../../app/shell/Page';
import { useFocus } from '../../app/state/focus';
import { useSizeClass } from '../../app/state/size';
import { useStore } from '../../app/state/store';

function Permissions() {
  return (
    <ListGroup header="Agent permissions" footer="Anything set to Ask comes to you as a card at the bottom of the screen first." glass={false}>
      <ListRow icon="calendar" tint="orange" title="Calendar" detail="Ask" onClick={() => {}} />
      <ListRow icon="checklist" tint="green" title="Tasks" detail="Allowed" onClick={() => {}} />
      <ListRow icon="book" tint="teal" title="Wiki" detail="Allowed" onClick={() => {}} />
      <ListRow icon="globe" tint="blue" title="Web search" detail="Ask" onClick={() => {}} />
      <ListRow icon="location" tint="red" title="Location" detail="While using" onClick={() => {}} />
    </ListGroup>
  );
}

function Preferences() {
  const store = useStore();
  const focus = useFocus();
  let pick = store.theme;
  const appearance = () => focus.open({ kind: 'question', key: 'appearance', title: 'Appearance', options: [{ value: 'auto', label: 'Automatic' }, { value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }],
    defaultValue: store.theme, onReplyInChat: null, onChange: (v: string) => { pick = v as typeof pick; }, actions: [{ label: 'Done', variant: 'filled', onClick: () => store.setTheme(pick) }] });
  return (
    <>
      <ListGroup header="Preferences" glass={false}>
        <ListRow icon="sparkle" tint="indigo" title="Appearance" detail={{ auto: 'Automatic', dark: 'Dark', light: 'Light' }[store.theme]} onClick={appearance} />
        <ListRow icon="bell" tint="pink" title="Notifications" onClick={() => {}} />
        <ListRow icon="gear" tint="brown" title="General" onClick={() => {}} />
      </ListGroup>
      <ListGroup glass={false}><ListRow title="Sign Out" destructive accessory={null} onClick={() => {}} /></ListGroup>
    </>
  );
}

/** Phone: everything on one page. You asks the bar for nothing. */
export function YouView() {
  const { size } = useSizeClass();
  return <Page eyebrow="You" title="Jim" wide={size !== 'compact'}><Permissions /><Preferences /></Page>;
}
/** Wide: sections on the left, permissions on the right. */
export function YouAside() { return <Page eyebrow="You" title="Jim" wide><Preferences /></Page>; }
export function YouPermissions() { return <Page eyebrow="You" title="Agent permissions" wide><Permissions /></Page>; }
