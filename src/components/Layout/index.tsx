import type { ReactNode } from 'react';
import Navigation from '../Navigation';
import './index.scss';

interface LayoutProps {
  children: ReactNode;
  variant?: 'default' | 'full-width' | 'landing';
}

function Layout({ children, variant = 'default' }: LayoutProps) {
  const showNav = variant !== 'landing';

  return (
    <div className={`layout layout--${variant}`}>
      {showNav && <Navigation />}
      <main className={`layout__main ${showNav ? 'layout__main--with-nav' : ''}`}>
        {variant === 'default' ? <div className="layout__container">{children}</div> : children}
      </main>
    </div>
  );
}

export default Layout;
