/**
 * Smoked Glass — the component kit.
 * Every export is typed here; the implementations live in the folders next to this file.
 */
import type * as T from './types';
export * from './types';

import { AgentPrompt as _AgentPrompt, AgentQuestion as _AgentQuestion, AgentRequest as _AgentRequest, AgentStatus as _AgentStatus, AgentSteps as _AgentSteps, ItemCard as _ItemCard, Message as _Message } from './agent/Agent';
import { MonthGrid as _MonthGrid, TimeGrid as _TimeGrid } from './calendar/Calendar';
import { Composer as _Composer } from './fields/Composer';
import { Menu as _Menu } from './fields/Menu';
import { SearchField as _SearchField } from './fields/SearchField';
import { Cluster as _Cluster } from './layout/Cluster';
import { Screen as _Screen } from './layout/Screen';
import { TopEdge as _TopEdge } from './layout/TopEdge';
import { BottomBar as _BottomBar, Dock as _Dock, TabBar as _TabBar } from './legacy/Legacy';
import { ListGroup as _ListGroup, ListRow as _ListRow } from './lists/List';
import { EventRow as _EventRow, TaskRow as _TaskRow, WeekStrip as _WeekStrip } from './modules/Rows';
import { MapPreview as _MapPreview, PlaceChip as _PlaceChip } from './places/Places';
import { Badge as _Badge } from './primitives/Badge';
import { Button as _Button, IconButton as _IconButton } from './primitives/Button';
import { Glass as _Glass } from './primitives/Glass';
import { Icon as _Icon } from './primitives/Icon';
import { SegmentedControl as _SegmentedControl } from './primitives/SegmentedControl';
import { Switch as _Switch } from './primitives/Switch';
import { Checkbox as _Checkbox, ChoiceList as _ChoiceList } from './selection/Selection';
import { SourceCard as _SourceCard, WikiDoc as _WikiDoc, WikiTimeline as _WikiTimeline } from './wiki/Wiki';

// Layout
export const Screen = _Screen as (props: T.ScreenProps) => JSX.Element;
export const Cluster = _Cluster as (props: T.ClusterProps) => JSX.Element;
export const TopEdge = _TopEdge as (props: T.TopEdgeProps) => JSX.Element;
// Primitives
export const Icon = _Icon as (props: T.IconProps) => JSX.Element;
export const Glass = _Glass as (props: T.GlassProps) => JSX.Element;
export const Button = _Button as (props: T.ButtonProps) => JSX.Element;
export const IconButton = _IconButton as (props: T.IconButtonProps) => JSX.Element;
export const SegmentedControl = _SegmentedControl as (props: T.SegmentedControlProps) => JSX.Element;
export const Switch = _Switch as (props: T.SwitchProps) => JSX.Element;
export const Badge = _Badge as (props: T.BadgeProps) => JSX.Element;
// Fields
export const Composer = _Composer as (props: T.ComposerProps) => JSX.Element;
export const SearchField = _SearchField as (props: T.SearchFieldProps) => JSX.Element;
export const Menu = _Menu as (props: T.MenuProps) => JSX.Element;
// Lists
export const ListGroup = _ListGroup as (props: T.ListGroupProps) => JSX.Element;
export const ListRow = _ListRow as (props: T.ListRowProps) => JSX.Element;
// Selection
export const Checkbox = _Checkbox as (props: T.CheckboxProps) => JSX.Element;
export const ChoiceList = _ChoiceList as (props: T.ChoiceListProps) => JSX.Element;
// Agent
export const Message = _Message as (props: T.MessageProps) => JSX.Element;
export const AgentSteps = _AgentSteps as (props: T.AgentStepsProps) => JSX.Element;
export const AgentPrompt = _AgentPrompt as (props: T.AgentPromptProps) => JSX.Element;
export const AgentRequest = _AgentRequest as (props: T.AgentRequestProps) => JSX.Element;
export const AgentQuestion = _AgentQuestion as (props: T.AgentQuestionProps) => JSX.Element;
export const ItemCard = _ItemCard as (props: T.ItemCardProps) => JSX.Element;
export const AgentStatus = _AgentStatus as (props: T.AgentStatusProps) => JSX.Element;
// Module rows
export const TaskRow = _TaskRow as (props: T.TaskRowProps) => JSX.Element;
export const EventRow = _EventRow as (props: T.EventRowProps) => JSX.Element;
export const WeekStrip = _WeekStrip as (props: T.WeekStripProps) => JSX.Element;
// Calendar
export const TimeGrid = _TimeGrid as (props: T.TimeGridProps) => JSX.Element;
export const MonthGrid = _MonthGrid as (props: T.MonthGridProps) => JSX.Element;
// Wiki
export const WikiDoc = _WikiDoc as (props: T.WikiDocProps) => JSX.Element;
export const SourceCard = _SourceCard as (props: T.SourceCardProps) => JSX.Element;
// Places
export const PlaceChip = _PlaceChip as (props: T.PlaceChipProps) => JSX.Element;
export const MapPreview = _MapPreview as (props: T.MapPreviewProps) => JSX.Element;
// Legacy — kept for reference, not for new screens
export const TabBar = _TabBar as (props: T.TabBarProps) => JSX.Element;
export const BottomBar = _BottomBar as (props: T.BottomBarProps) => JSX.Element;
export const Dock = _Dock as (props: T.DockProps) => JSX.Element;
export const WikiTimeline = _WikiTimeline as (props: { items: Array<{ day: string; time: string; title: string; tint?: T.SystemColor; suggested?: boolean; agent?: boolean; meta?: string }> }) => JSX.Element;

/** Glyph names shipped by Icon. */
export const iconNames: T.IconName[] = (_Icon as any).names;
