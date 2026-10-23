import { ChatListView, type ViewRow } from '@smoked-glass/ui';
import { useNav } from '../../app/state/nav';
import { useStore } from '../../app/state/store';
import { useBar } from '../../app/state/bar';

/** Chats that need you rise to the top. Used as the phone root and as the left half. */
export function ChatList({ wide }: { wide?: boolean }) {
  const { chats } = useStore();
  const nav = useNav();
  const open = (id: string) => nav.push({ view: 'chat', id });
  const row = (c: typeof chats[number]): ViewRow => ({ id: c.id, icon: c.icon, tint: c.tint, title: c.title, subtitle: c.subtitle, onClick: () => open(c.id) });
  return <ChatListView date="Thursday 22 October" wide={wide}
    needsYou={chats.filter(c => c.needsYou).map(row)} recent={chats.filter(c => !c.needsYou).map(row)} />;
}

/** Phone root: the list, plus the composer that starts a new chat. */
export function ChatHome() {
  useBar({ accessory: { kind: 'composer', key: 'ask', placeholder: 'Ask anything…' } }, []);
  return <ChatList />;
}
