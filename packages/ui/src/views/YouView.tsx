import type { ReactNode } from 'react';
import { Page } from '../layout/Page';
import { ListGroup, ListRow } from '../lists/List';
import { Icon } from '../primitives/Icon';
import { ChoiceList } from '../selection/Selection';
import type { ChoiceListProps, IconName, SystemColor } from '../types';

export interface SettingChoicesProps {
  title: string;
  icon?: IconName;
  tint?: SystemColor;
  options: ChoiceListProps['options'];
  value: string;
  onChange(value: string): void;
  columns?: number;
}

/** Small settings expose their alternatives in place; navigation rows open full panes. */
export function SettingChoices({ title, icon, tint = 'blue', options, value, onChange, columns = 1 }: SettingChoicesProps) {
  return <ChoiceList className="sg-setting" legend={<>
    {icon ? <span className="sg-row-tile" style={{ background: `var(--system-${tint})` }} aria-hidden="true"><Icon name={icon} size={17} strokeWidth={2} /></span> : null}
    <span className="body">{title}</span>
  </>} options={options} value={value} columns={columns} onChange={(next: string | string[]) => { if (typeof next === 'string') onChange(next); }} />;
}

/** The profile header and settings groups from the You and DeskYou boards. */
export function YouProfilePage({ name, wide, children }: { name: string | null; wide?: boolean; children: ReactNode }) {
  const initial = name ? Array.from(name.trim())[0]?.toLocaleUpperCase() : null;
  return <Page eyebrow="You" title={name || 'Profile'} wide={wide} leading={!wide && <span aria-hidden="true" className="title-2"
    style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--system-indigo)', color: '#ffffff', display: 'grid', placeItems: 'center', flex: 'none' }}>
    {initial || <Icon name="person" size={28} />}
  </span>}>{children}</Page>;
}

export function YouSections({ permissions, places, onPermissions, onPlaces }: { permissions: string; places: string; onPermissions(): void; onPlaces?: () => void }) {
  return <ListGroup glass={false}>
    <ListRow icon="sparkle" tint="blue" title="Agent permissions" subtitle={permissions} onClick={onPermissions} />
    <ListRow icon="location" tint="red" title="Places" subtitle={places} onClick={onPlaces} />
  </ListGroup>;
}

export function YouPreferences({ wide, appearance, notifications, onNotifications, onGeneral, onExit, exitLabel = 'Sign Out' }: {
  wide?: boolean; appearance: Pick<SettingChoicesProps, 'options' | 'value' | 'onChange'>; notifications?: string; onNotifications?: () => void; onGeneral?: () => void; onExit(): void; exitLabel?: string;
}) {
  return <>
    <ListGroup header="Preferences" glass={false}>
      <SettingChoices icon="sparkle" tint="indigo" title="Appearance" {...appearance} />
      <ListRow icon="bell" tint="pink" title="Notifications" subtitle={wide ? notifications : undefined} detail={wide ? undefined : notifications} onClick={onNotifications} />
      <ListRow icon="gear" tint="brown" title="General" onClick={onGeneral} />
    </ListGroup>
    <ListGroup glass={false}><ListRow title={exitLabel} destructive accessory={null} onClick={onExit} /></ListGroup>
  </>;
}
