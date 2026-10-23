import { useEffect, useState } from 'react';
import { BarProvider } from './state/bar';
import { FocusProvider } from './state/focus';
import { NavProvider } from './state/nav';
import { StoreProvider, useStore } from './state/store';
import { AppShell } from './shell/AppShell';

function Themed() {
  const { theme } = useStore();
  const [systemDark, setSystemDark] = useState(() => matchMedia('(prefers-color-scheme: dark)').matches);
  useEffect(() => { const m = matchMedia('(prefers-color-scheme: dark)'); const on = () => setSystemDark(m.matches); m.addEventListener('change', on); return () => m.removeEventListener('change', on); }, []);
  const resolved = theme === 'auto' ? (systemDark ? 'dark' : 'light') : theme;
  useEffect(() => { document.documentElement.dataset.theme = resolved; }, [resolved]);
  return <div className="app" data-theme={resolved}><AppShell /></div>;
}

export function App() {
  return (
    <StoreProvider>
      <NavProvider>
        <FocusProvider>
          <BarProvider>
            <Themed />
          </BarProvider>
        </FocusProvider>
      </NavProvider>
    </StoreProvider>
  );
}
