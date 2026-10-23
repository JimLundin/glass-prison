import { useEffect } from 'react';
import { MapPreview } from '@smoked-glass/ui';
import { useBar } from '../../app/state/bar';
import { useFocus } from '../../app/state/focus';
import { useNav } from '../../app/state/nav';
import { PLACES } from '../../data/places';

/** Places are not a module: they open over whatever mentioned them, with their details as a focus card. */
export function PlaceView({ id }: { id: string }) {
  const place = PLACES[id];
  const nav = useNav();
  const focus = useFocus();
  useBar({ actions: [{ id: 'me', label: 'Show My Location', icon: 'location' }, { id: 'share', label: 'Share', icon: 'share' }] }, [id]);
  useEffect(() => {
    focus.open({ kind: 'card', key: 'place:' + id, title: place.name, subtitle: `${place.kind} · ${place.address}`, lines: place.lines,
      actions: [{ label: 'Ask' }, { label: 'Directions', variant: 'filled' }], dismiss: { icon: 'chevron-left', label: 'Back', onClick: () => nav.openPlace(null) } });
    return () => focus.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return <div style={{ position: 'absolute', inset: 0 }}><MapPreview bare pins={place.pins} aria-label={`Map showing ${place.name}`} /></div>;
}
