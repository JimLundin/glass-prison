import type { ReactNode } from 'react';
import type { AgentRequestProps, IconName, RequestAction } from '../types';
import { Icon } from '../primitives/Icon';
import { actionButtons } from '../agent/Agent';

export interface DetailCardProps {
  title: ReactNode;
  subtitle?: ReactNode;
  lines?: Array<{ icon?: IconName; text: ReactNode }>;
  children?: ReactNode;
  actions?: RequestAction[];
  dismiss?: AgentRequestProps['dismiss'];
}

/** The event / record focus card used by Cluster's `kind: 'card'` specification. */
export function DetailCard({ title, subtitle, lines = [], children, actions, dismiss }: DetailCardProps) {
  return <section className={`sg-request${dismiss ? ' has-exit' : ''}`} aria-label={typeof title === 'string' ? title : undefined}>
    <div className="sg-request-titles"><h2 className="title-3">{title}</h2>{subtitle ? <p className="subheadline">{subtitle}</p> : null}</div>
    {lines.length ? <div className="sg-card-lines">{lines.map((line, index) => <span key={index} className="subheadline sg-card-line"><Icon name={line.icon || 'clock'} size={18} />{line.text}</span>)}</div> : null}
    {children}
    {actions || dismiss ? <div className="sg-request-foot"><span /><div className="sg-request-actions">{actionButtons(actions, dismiss)}</div></div> : null}
  </section>;
}
