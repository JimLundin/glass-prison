/* Public prop types for every Smoked Glass component. */
import type * as React from 'react';

/** The 28 glyph names shipped by `Icon` (substitutes for SF Symbols). */
export type IconName = 'plus' | 'arrow-up' | 'chevron-right' | 'chevron-left' | 'xmark' | 'checkmark' | 'search' | 'mic' | 'bubble' | 'folder' | 'gear' | 'bell' | 'person' | 'sparkle' | 'square-pencil' | 'ellipsis' | 'calendar' | 'checklist' | 'book' | 'filter' | 'share' | 'trash' | 'pin' | 'location' | 'map' | 'directions' | 'clock' | 'globe' | 'doc' | 'quote' | 'photo';
export type SystemColor = 'blue' | 'green' | 'orange' | 'red' | 'yellow' | 'teal' | 'mint' | 'indigo' | 'pink' | 'brown';

export interface IconProps extends React.SVGProps<SVGSVGElement> { name: IconName; /** px, default 22 */ size?: number; /** default 1.75 */ strokeWidth?: number; }
export interface GlassProps extends React.HTMLAttributes<HTMLElement> { /** default 'regular' */ variant?: 'thin' | 'regular' | 'thick' | 'smoke'; /** default 'rounded' (radius-xl) */ shape?: 'rounded' | 'card' | 'pill' | 'circle' | 'sheet'; as?: keyof JSX.IntrinsicElements; children?: React.ReactNode; }
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { /** default 'glass' */ variant?: 'glass' | 'filled' | 'tinted' | 'gray' | 'plain'; /** default 'md' (44px) */ size?: 'sm' | 'md' | 'lg'; icon?: IconName; destructive?: boolean; /** keyboard shortcut shown inside the button, e.g. '⏎' */ kbd?: string; children?: React.ReactNode; }
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { icon: IconName; /** accessible name, required */ label: string; /** default 'glass' */ variant?: 'glass' | 'smoke' | 'fill' | 'accent' | 'tinted' | 'plain'; size?: 'sm' | 'md' | 'lg'; }
export interface SegmentedControlProps { options: Array<string | { value: string; label: React.ReactNode }>; value?: string; defaultValue?: string; onChange?: (value: string) => void; 'aria-label'?: string; className?: string; }
export interface SwitchProps { checked?: boolean; defaultChecked?: boolean; onChange?: (checked: boolean) => void; disabled?: boolean; 'aria-label'?: string; className?: string; }
export interface ComposerProps { value?: string; defaultValue?: string; placeholder?: string; onChange?: (value: string) => void; onSend?: (value: string) => void | Promise<void>; onSendError?: (error: unknown) => void; onAttach?: () => void; onDictate?: () => void; /** extra tool buttons after the + button */ tools?: React.ReactNode; disabled?: boolean; pending?: boolean; working?: boolean; submitWhileWorking?: boolean; status?: string; onStop?: () => void; className?: string; }
export interface ListGroupProps { header?: React.ReactNode; footer?: React.ReactNode; /** false = opaque canvas-raised instead of thick glass */ glass?: boolean; children: React.ReactNode; className?: string; }
export interface ListRowProps { title: React.ReactNode; subtitle?: React.ReactNode; detail?: React.ReactNode; icon?: IconName | React.ReactNode; /** icon tile colour, default 'blue' */ tint?: SystemColor; /** default: chevron when onClick is set */ accessory?: 'chevron' | React.ReactNode | null; onClick?: () => void; destructive?: boolean; className?: string; }
export interface TabBarItem { id: string; label: string; icon: IconName; /** small count shown on the icon */ badge?: number | string; }
export interface TabBarProps { items: TabBarItem[]; value?: string; defaultValue?: string; onChange?: (id: string) => void; /** detached circular action beside the bar, e.g. search */ action?: { icon: IconName; label: string; onClick?: () => void }; 'aria-label'?: string; className?: string; }
export interface ScreenProps { /** passive large title in the top zone; scrolls away */ title?: React.ReactNode; eyebrow?: React.ReactNode; /** main pane content (scrolls) */ children?: React.ReactNode; /** fixed chrome for the main pane: Composer, BottomBar, TabBar, Buttons — rendered at the bottom */ dock?: React.ReactNode; /** content of the aside pane, shown at Expanded (≥840px) and up */ aside?: React.ReactNode; asideTitle?: React.ReactNode; asideEyebrow?: React.ReactNode; /** fixed chrome for the aside pane (usually the TabBar) */ asideDock?: React.ReactNode; /** split the panes exactly at the middle — a hinged foldable such as iPhone Duo open */ hinge?: boolean; className?: string; style?: React.CSSProperties; }
export interface BottomBarProps { /** back / close circles — IconButtons with variant 'plain' */ leading?: React.ReactNode; /** a title, SegmentedControl or primary Button */ center?: React.ReactNode; /** more / share circles */ trailing?: React.ReactNode; 'aria-label'?: string; className?: string; }
export interface DockAction { disabled?: boolean; id: string; label: string; icon: IconName; onClick?: () => void; destructive?: boolean; }
export interface DockProps {
  /** global navigation, owned by the app shell (usually a TabBar). Omit in a pane whose nav lives in another pane. */ nav?: React.ReactNode;
  /** icon for the collapsed nav circle on Compact while the input is active (the current module's icon) */ navIcon?: IconName;
  /** present when the view is one level in (an item, a page): back or close */ back?: { icon?: 'chevron-left' | 'xmark'; label?: string; onClick?: () => void };
  /** passive title for the context row */ title?: React.ReactNode;
  /** a view switcher (SegmentedControl) that takes the title's place */ center?: React.ReactNode;
  /** module actions in priority order; extras overflow into an upward ellipsis Menu (Compact 1, Medium 2, Wide 3 visible) */ actions?: DockAction[];
  /** the one primary action: an accent circle on Compact, a filled labelled Button wider up */ primary?: { label: string; icon?: IconName; onClick?: () => void };
  /** the module's single input surface: a Composer (compose) or a SearchField (query / capture) */ input?: React.ReactNode;
  /** override: treat the input as active (default: while focus is inside it) */ inputActive?: boolean;
  /** force a size class instead of measuring the pane */ size?: 'compact' | 'medium' | 'wide';
  className?: string;
}
export interface SearchFieldProps { /** 'query' searches (results live above, clear button); 'capture' adds an item on Enter (tasks, quick notes) */ kind?: 'query' | 'capture'; value?: string; defaultValue?: string; placeholder?: string; onChange?: (v: string) => void; onSubmit?: (v: string) => void | Promise<void>; disabled?: boolean; onCancel?: () => void; autoFocus?: boolean; className?: string; }
export interface MenuProps { items: DockAction[]; icon?: IconName; label?: string; variant?: IconButtonProps['variant']; /** open toward the trailing (default) or leading side */ align?: 'end' | 'start'; className?: string; }
export interface ClusterAction { disabled?: boolean; id: string; label: string; icon: IconName; onClick?: () => void; destructive?: boolean; }
export interface ClusterProps {
  variant?: 'row' | 'bar' | 'capsule';
  tabs: TabBarItem[]; tab?: string; onTab?: (id: string) => void;
  search?: { onOpen?: () => void; label?: string; placeholder?: string; onSubmit?: (q: string) => void; /** row: called with the first keystroke typed into the bloomed search field */ onQuery?: (q: string) => void } | null;
  back?: { onClick?: () => void; label?: string } | null;
  actions?: ClusterAction[]; more?: ClusterAction[];
  primary?: { disabled?: boolean; icon?: IconName; label: string; onClick?: () => void } | null;
  /** the module's one accessory: Composer, SearchField, a switcher in .sg-cl-center, or (capsule) a title in .sg-cl-title */ accessory?: React.ReactNode | { kind: 'composer' | 'query' | 'capture' | 'switcher' | 'title'; [k: string]: unknown };
  /** grows out of the accessory slot: AgentRequest, AgentQuestion, a detail card */ sheet?: React.ReactNode | { kind: 'request' | 'question' | 'card' | 'source'; [k: string]: unknown };
  /** bar: fold to one row */ minimized?: boolean; onExpand?: () => void;
  /** row: pointer layout — modules laid flat with names in the leading capsule, actions as icons, read left to right (desktop) */ flat?: boolean;
  /** row: gather both circles in the right thumb's corner and let the centre fill inward (a pane's bar on the open Duo) */ gather?: boolean;
  /** row: show names beside bloomed circles (default true) */ bloomLabels?: boolean;
  /** row: which circle is bloomed into its menu */ bloom?: 'none' | 'lead' | 'trail'; onBloom?: (b: 'none' | 'lead' | 'trail') => void;
  /** legacy */ switcherOpen?: boolean; onSwitcher?: (open: boolean) => void;
  'aria-label'?: string; className?: string;
}
export interface TopEdgeProps { title: React.ReactNode; show?: boolean; className?: string; }
export interface MessageProps { from?: 'user' | 'agent' | 'system'; /** alias of from, for hosts that reserve the from attribute */ by?: 'user' | 'agent' | 'system'; children: React.ReactNode; className?: string; }
export interface AgentStep { icon?: IconName; label: string; status?: 'done' | 'running' | 'waiting' | 'failed'; }
export interface AgentStepsProps { steps: AgentStep[]; 'aria-label'?: string; className?: string; }
export interface AgentStatusProps { tone?: 'working' | 'waiting' | 'question' | 'done'; children: React.ReactNode; className?: string; }
export interface ItemCardProps { icon?: IconName; tint?: SystemColor; title: React.ReactNode; subtitle?: React.ReactNode; href?: string; onClick?: () => void; className?: string; }
export interface RequestAction { label: string; icon?: IconName; iconOnly?: boolean; disabled?: boolean; variant?: ButtonProps['variant']; destructive?: boolean; size?: ButtonProps['size']; onClick?: () => void; }
export interface AgentRequestProps { /** the way out without answering — a circle at the end of the answer row (✕ Later, ‹ Back); swipe down and Esc do the same */ dismiss?: { icon?: IconName; label?: string; /** shown in place of the glyph with a keyboard, e.g. 'esc' */ kbd?: string; onClick?: () => void }; icon?: IconName; tint?: SystemColor; title: React.ReactNode; description?: React.ReactNode; /** exactly what will happen: a node, or lines (first = headline, second = subheadline, rest = footnote) */ detail?: React.ReactNode | string[]; /** label for an "always allow" switch */ remember?: string; rememberDefault?: boolean; /** Deny first, the approving action last and 'filled' */ actions: RequestAction[]; /** keyboard hints, shown from Medium up */ hints?: Array<{ key: string; label: string }>; 'aria-label'?: string; className?: string; }
export interface ChoiceOption { value: string; label: React.ReactNode; detail?: React.ReactNode; }
export interface AgentQuestionProps { /** the way out without answering — a circle at the end of the answer row (✕ Later, ‹ Back); swipe down and Esc do the same */ dismiss?: { icon?: IconName; label?: string; /** shown in place of the glyph with a keyboard, e.g. 'esc' */ kbd?: string; onClick?: () => void }; title: React.ReactNode; progress?: string; hint?: string; options: Array<string | ChoiceOption>; multiple?: boolean; columns?: number; /** placeholder for a free-text option */ other?: string; otherValue?: string; defaultValue?: string | string[]; onChange?: (value: string | string[], otherText?: string) => void; actions: RequestAction[]; /** null hides "Reply in Chat" */ onReplyInChat?: (() => void) | null; 'aria-label'?: string; className?: string; }
export interface AgentPromptProps { title: React.ReactNode; kind?: string; icon?: IconName; tint?: SystemColor; state?: 'pending' | 'focused' | 'done'; answer?: React.ReactNode; cta?: string; doneLabel?: string; onOpen?: () => void; className?: string; }
export interface CheckboxProps { checked?: boolean; defaultChecked?: boolean; onChange?: (checked: boolean) => void; disabled?: boolean; /** accessible name when there is no visible label */ label?: string; /** grey + strike the label when checked */ strike?: boolean; children?: React.ReactNode; className?: string; }
export interface ChoiceListProps { options: Array<string | ChoiceOption>; value?: string | string[]; defaultValue?: string | string[]; onChange?: (value: string | string[], otherText?: string) => void; multiple?: boolean; columns?: number; legend?: React.ReactNode; other?: string; otherValue?: string; name?: string; className?: string; }
export interface TaskRowProps { title: string; disabled?: boolean; meta?: React.ReactNode; done?: boolean; defaultDone?: boolean; onToggle?: (done: boolean) => void; /** created by the agent: true ("From chat") or the badge text */ agent?: boolean | string; badge?: React.ReactNode; className?: string; }
export interface EventRowProps { time: string; onClick?: () => void; title: React.ReactNode; meta?: React.ReactNode; tint?: SystemColor; location?: string; onLocation?: () => void; /** created by the agent: true ("Added by agent") or the badge text */ agent?: boolean | string; badge?: React.ReactNode; /** proposed by the agent, not on the calendar yet */ suggested?: boolean; className?: string; }
export interface WeekStripProps { days: Array<{ name: string; num: string; busy?: boolean }>; selected?: number; onSelect?: (index: number) => void; 'aria-label'?: string; className?: string; }
export interface PlaceChipProps { name: string; onClick?: () => void; href?: string; className?: string; }
export interface MapPin { x: number; y: number; tint?: SystemColor; label?: string; active?: boolean; }
export interface MapPreviewProps { pins?: MapPin[]; height?: number; title?: React.ReactNode; subtitle?: React.ReactNode; action?: { label: string; icon?: IconName; onClick?: () => void }; /** fill the container as the full map view */ bare?: boolean; 'aria-label'?: string; className?: string; }
export interface ComposerWorking { /** the agent is working: the send button becomes Stop */ working?: boolean; status?: string; onStop?: () => void; }
export interface BadgeProps { tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'count'; icon?: IconName; children: React.ReactNode; className?: string; }


export interface CalEvent { day?: number; start: string; end: string; title: string; tint?: string; place?: string; suggested?: boolean; agent?: boolean; id?: string; onClick?: () => void; }
export interface CalSpan { id?: string; onClick?: () => void; from: number; to: number; title?: string; tint?: string; agent?: boolean; suggested?: boolean; }
export interface TimeGridProps { days: { name: string; num: string; selected?: boolean; today?: boolean }[]; events?: CalEvent[]; allDay?: CalSpan[]; startHour?: number; endHour?: number; hourHeight?: number; /** phone week: titles only */ compact?: boolean; now?: { day: number; time: string }; onSelect?: (day: number) => void; onEvent?: (e: CalEvent) => void; 'aria-label'?: string; className?: string; }
export interface MonthDay { num: string; label?: string; muted?: boolean; selected?: boolean; today?: boolean; span?: boolean; items?: { title: string; tint?: string; suggested?: boolean }[]; }
export interface MonthGridProps { weeks: { days: MonthDay[]; spans?: CalSpan[] }[]; /** desktop: event names in the cells instead of dots */ titles?: boolean; names?: string[]; onSelect?: (row: number, col: number, day: MonthDay) => void; 'aria-label'?: string; className?: string; }

export type WikiSourceKind = 'conversation' | 'voice' | 'document' | 'image' | 'web';
export interface WikiSource { kind: WikiSourceKind; title: string; /** Fragments from one stored document share this identity. */ documentId?: string; /** A host's durable link to the stored source. */ href?: string; when?: string; where?: string; speaker?: string; /** where it came from: chat://…, mail://…, https://… */ origin?: string; /** when the stored copy was taken */ captured?: string; /** the stored text, verbatim (the snapshot, never the live original) */ excerpt: string; }
export interface WikiClaim { id: string; text: string; /** source ids; empty = no source yet */ sources: string[]; /** per source, the exact words the claim rests on (must appear in its excerpt) */ span?: Record<string, string>; }
export type WikiBlock =
  | { type: 'paragraph'; claims: WikiClaim[] }
  | { type: 'heading'; text: string }
  | { type: 'facts'; items: (Omit<WikiClaim, 'text'> & { label: string; value: string; place?: boolean | string })[] }
  | { type: 'timeline'; from?: { module: 'calendar'; range: [string, string] }; range?: string; items: { day: string; time: string; title: string; tint?: string; suggested?: boolean; agent?: boolean; meta?: string }[] }
  | { type: 'tasks'; from?: { module: 'tasks'; list: string }; list?: string; items: { title: string; meta?: string; done?: boolean; agent?: boolean }[] }
  | { type: 'place'; from?: { module: 'places'; id: string }; placeId?: string; name: string; subtitle?: string; pins?: MapPin[]; height?: number }
  | { type: 'questions'; items: { id: string; q: string; status: 'open' | 'answered'; answer?: string; sources?: string[]; span?: Record<string, string> }[] }
  | { type: 'sources' };
export interface WikiDocument { id?: string; title?: string; updated?: string; blocks: WikiBlock[]; }
export interface WikiDocProps { doc: WikiDocument; sources: Record<string, WikiSource>; citationStyle?: 'numbers' | 'text'; start?: number; activeClaim?: string | null; activeSource?: string | null; onCite?: (sourceId: string | null, claimId: string) => void; onSource?: (id: string) => void; onQuestion?: (q: { id: string; q: string }) => void; onPlace?: () => void; className?: string; }
export interface SourceCardProps { source: WikiSource; /** Exact half-open UTF-16 offsets into source.excerpt. Takes precedence over legacy span text. */ selection?: { start: number; end: number }; span?: string; claim?: string; actions?: { label: string; icon?: IconName; iconOnly?: boolean; disabled?: boolean; variant?: string; onClick?: () => void }[]; dismiss?: { icon?: IconName; label?: string; kbd?: string; onClick?: () => void }; className?: string; }
