import { useState, useCallback } from 'react';
import { Outlet } from 'react-router';
import { Navbar } from './navbar';
import { MobileNav } from './mobile-nav';
import { Breadcrumb } from './breadcrumb';
import { Footer } from './footer';

export function AppShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const handleClose = useCallback(() => setMobileNavOpen(false), []);

  return (
    <div className="flex min-h-screen flex-col bg-msacco-page-bg">
      <Navbar onMenuToggle={() => setMobileNavOpen(true)} />
      <MobileNav open={mobileNavOpen} onClose={handleClose} />
      <Breadcrumb />
      <main className="flex-1 mx-auto w-full max-w-[1400px] px-4 py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
