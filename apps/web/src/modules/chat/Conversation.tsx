import { useRef } from 'react';
import { AgentPrompt, AgentSteps, ItemCard, Message, PlaceChip } from '@smoked-glass/ui';
import { Thread } from '../../app/shell/Page';
import { useBar } from '../../app/state/bar';
import { useFocus } from '../../app/state/focus';
import { useNav } from '../../app/state/nav';
import { useStore } from '../../app/state/store';
import type { Prompt, Route } from '../../model/types';

const ACTIONS = [
  { id: 'new', label: 'New Chat', icon: 'plus' as const },
  { id: 'share', label: 'Share', icon: 'share' as const },
  { id: 'rename', label: 'Rename', icon: 'square-pencil' as const },
  { id: 'pin', label: 'Pin', icon: 'pin' as const },
  { id: 'delete', label: 'Delete', icon: 'trash' as const, destructive: true },
];

export function Conversation({ route }: { route: Route }) {
  const store = useStore();
  const nav = useNav();
  const focus = useFocus();
  const chat = store.chats.find((c) => c.id === route.id) ?? store.chats[0];
  const choice = useRef<string>('');

  useBar({ accessory: { kind: 'composer', key: 'reply:' + chat.id, placeholder: 'Reply…', onSend: (t: string) => store.send(chat.id, t) }, actions: ACTIONS }, [chat.id]);

  // A prompt detaches from the conversation into the bar's focus card when you pick it.
  const openPrompt = (p: Prompt) => {
    if (p.kind === 'permission') {
      focus.open({ kind: 'request', key: 'prompt:' + p.id, icon: p.icon, tint: p.tint, title: p.card.title, description: p.card.description, detail: p.card.detail, remember: p.card.remember,
        actions: [{ label: 'Deny', onClick: () => store.answerPrompt(p.id, 'Denied') }, { label: 'Allow', variant: 'filled', kbd: '⏎', onClick: () => store.answerPrompt(p.id, 'Allowed') }],
        dismiss: { label: 'Later', kbd: 'esc' } });
    } else {
      choice.current = p.options[0]?.value ?? '';
      focus.open({ kind: 'question', key: 'prompt:' + p.id, title: p.title, hint: 'Pick one, or type your own', options: p.options, defaultValue: choice.current, other: 'Somewhere else…', onReplyInChat: null,
        onChange: (v: string) => { choice.current = v; },
        actions: [{ label: 'Done', variant: 'filled', onClick: () => store.answerPrompt(p.id, p.options.find((o) => o.value === choice.current)?.label ?? choice.current) }] });
    }
  };

  return (
    <Thread title={chat.title}>
      {chat.turns.map((t, i) => {
        switch (t.kind) {
          case 'system': case 'user': case 'agent': return <Message key={i} from={t.kind}>{t.text}</Message>;
          case 'steps': return <AgentSteps key={i} steps={t.steps} />;
          case 'item': return <ItemCard key={i} icon={t.icon} tint={t.tint} title={t.title} subtitle={t.subtitle} onClick={() => 'module' in t.link ? nav.go(t.link.module, t.link.route) : nav.openPlace(t.link.place)} />;
          case 'place': return <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span className="subheadline" style={{ color: 'var(--label-secondary)' }}>Staying at</span><PlaceChip name={t.label} onClick={() => nav.openPlace(t.placeId)} /></div>;
          case 'prompt': {
            const p = store.prompts[t.promptId];
            const focused = focus.spec?.key === 'prompt:' + p.id;
            return <AgentPrompt key={i} kind={p.kind === 'permission' ? 'Permission' : 'Question'} icon={p.icon} tint={p.tint} title={p.title} cta={p.kind === 'permission' ? 'Review' : 'Answer'}
              state={p.state === 'done' ? 'done' : focused ? 'focused' : 'pending'} answer={p.answer} doneLabel={p.kind === 'permission' ? p.answer : 'Answered'} onOpen={() => openPrompt(p)} />;
          }
        }
      })}
    </Thread>
  );
}
