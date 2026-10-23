import type { ModuleDef } from '../types';
import { ChatHome, ChatList } from './ChatList';
import { Conversation } from './Conversation';

export const chat: ModuleDef = {
  id: 'chat', label: 'Chat', icon: 'bubble',
  List: () => <ChatList wide />, Root: ChatHome, Item: Conversation,
  home: { view: 'chat', id: 'lisbon' },
};
