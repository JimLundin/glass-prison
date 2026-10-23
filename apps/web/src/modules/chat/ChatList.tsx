import { ListGroup, ListRow } from '@smoked-glass/ui';
import { Page } from '../../app/shell/Page';
import { useNav } from '../../app/state/nav';
import { useStore } from '../../app/state/store';
import { useBar } from '../../app/state/bar';

/** Chats that need you rise to the top. Used as the phone root and as the left half. */
export function ChatList({ wide }: { wide?: boolean }) {
  const { chats } = useStore();
  const nav = useNav();
  const open = (id: string) => nav.push({ view: 'chat', id });
  return (
    <Page eyebrow="Thursday 22 October" title="Chat" wide={wide}>
      <ListGroup header="Needs you" glass={false}>
        {chats.filter((c) => c.needsYou).map((c) => <ListRow key={c.id} icon={c.icon} tint={c.tint} title={c.title} subtitle={c.subtitle} onClick={() => open(c.id)} />)}
      </ListGroup>
      <ListGroup header="Recent" glass={false}>
        {chats.filter((c) => !c.needsYou).map((c) => <ListRow key={c.id} icon={c.icon} tint={c.tint} title={c.title} subtitle={c.subtitle} onClick={() => open(c.id)} />)}
      </ListGroup>
    </Page>
  );
}

/** Phone root: the list, plus the composer that starts a new chat. */
export function ChatHome() {
  useBar({ accessory: { kind: 'composer', key: 'ask', placeholder: 'Ask anything…' } }, []);
  return <ChatList />;
}
