import type { ModuleDef } from '../types';
import { WikiHome, WikiList } from './WikiList';
import { WikiPageView } from './WikiPageView';

export const wiki: ModuleDef = { id: 'wiki', label: 'Wiki', icon: 'book', List: () => <WikiList wide />, Root: WikiHome, Item: WikiPageView, home: { view: 'page', id: 'lisbon-trip' } };
