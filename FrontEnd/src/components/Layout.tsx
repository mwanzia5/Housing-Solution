import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, BookOpen, Menu, X, LayoutDashboard, PanelLeftClose, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/context/Authcontext';
import { useUI } from '@/context/UIContext';
import { AuthModal } from '@/components/AuthModal';
import { EligibilityModal } from '@/components/EligibilityModal';

const SIDEBAR_VISIBLE_KEY = 'habitatlink-sidebar-visible';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [sidebarVisible, setSidebarVisible] = React.useState(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_VISIBLE_KEY);
      return stored !== 'false';
    } catch {
      return true;
    }
  });
  const location = useLocation();
  const { isAdmin } = useAuth();
  const { openAuthModal } = useUI();

  const toggleSidebar = () => {
    setSidebarVisible((v) => {
      const next = !v;
      try {
        localStorage.setItem(SIDEBAR_VISIBLE_KEY, String(next));
      } catch {}
      return next;
    });
  };

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Housing', path: '/housing', icon: Search },
    { name: 'Programs', path: '/programs', icon: BookOpen },
  ];

  const dashboardItems = [
    { name: 'Citizen Dash', path: '/dashboard/citizen' },
    { name: 'Provider Portal', path: '/dashboard/provider' },
    { name: 'Admin Analytics', path: '/dashboard/admin' },
  ];

  const bottomNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Housing', path: '/housing', icon: Search },
    { name: 'Programs', path: '/programs', icon: BookOpen },
    { name: 'Dashboard', path: '/dashboard/citizen', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-bg text-[var(--text-primary)] pb-20 md:pb-0">
      {/* Desktop: sidebar (collapsible) */}
      <AnimatePresence initial={false}>
        {sidebarVisible && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:z-40 bg-white/80 backdrop-blur-xl shrink-0 overflow-hidden"
          >
            <div className="flex flex-col h-full w-60 min-w-[15rem]">
              <div className="flex items-center justify-between px-4 py-5 shrink-0">
                <Link to="/" className="flex items-center gap-2.5 min-w-0">
                  <img src="/habitat.png" alt="HabitatLink" className="h-9 w-auto object-contain shrink-0" />
                  <span className="text-lg font-semibold text-primary tracking-tight truncate">HabitatLink</span>
                </Link>
                <button
                  type="button"
                  onClick={toggleSidebar}
                  className="p-2 rounded-[var(--radius)] text-[var(--text-secondary)] hover:bg-gray-100 hover:text-primary transition-colors shrink-0"
                  aria-label="Hide sidebar"
                >
                  <PanelLeftClose className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto min-h-0">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-[var(--radius)] text-sm font-medium transition-colors',
                    isActive ? 'bg-primary/10 text-primary' : 'text-[var(--text-secondary)] hover:bg-gray-100 hover:text-primary'
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-4 mt-4">
              <p className="px-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                Dashboards
              </p>
              {dashboardItems
                .filter((item) => item.path !== '/dashboard/admin' || isAdmin)
                .map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5 rounded-[var(--radius)] text-sm font-medium transition-colors',
                      location.pathname === item.path ? 'bg-primary/10 text-primary' : 'text-[var(--text-secondary)] hover:bg-gray-100 hover:text-primary'
                    )}
                  >
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    {item.name}
                  </Link>
                ))}
            </div>
          </nav>
              <div className="p-4 space-y-2 shrink-0">
                <Button variant="outline" size="sm" className="w-full" onClick={() => openAuthModal('login')}>
                  Log In
                </Button>
                <Button size="sm" className="w-full" onClick={() => openAuthModal('signup')}>
                  Get Started
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop: show sidebar button when hidden */}
      {!sidebarVisible && (
        <button
          type="button"
          onClick={toggleSidebar}
          className="hidden md:flex fixed left-0 top-4 z-30 p-2 rounded-r-[var(--radius)] bg-white/90 backdrop-blur shadow-sm text-[var(--text-secondary)] hover:bg-gray-100 hover:text-primary transition-colors"
          aria-label="Show sidebar"
        >
          <PanelLeft className="w-5 h-5" />
        </button>
      )}

      {/* Mobile: top bar (logo only) */}
      <header className="md:hidden sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl">
        <div className="px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/habitat.png" alt="HabitatLink" className="h-8 w-auto object-contain" />
            <span className="text-base font-semibold text-primary">HabitatLink</span>
          </Link>
          <button
            type="button"
            className="p-2 rounded-[var(--radius)] text-[var(--text-secondary)] hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-14 z-40 bg-white shadow-lg p-4"
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-[var(--radius)] transition-colors font-medium',
                    location.pathname === item.path ? 'bg-[var(--accent-soft)] text-primary' : 'text-[var(--text-secondary)] hover:bg-gray-50'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
              <div className="h-px bg-gray-200 my-2" />
              <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider px-4 py-2">
                Dashboards
              </p>
              {dashboardItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-primary font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-px bg-gray-200 my-2" />
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button variant="outline" size="sm" className="w-full" onClick={() => { openAuthModal('login'); setIsMobileMenuOpen(false); }}>
                  Log In
                </Button>
                <Button size="sm" className="w-full" onClick={() => { openAuthModal('signup'); setIsMobileMenuOpen(false); }}>
                  Get Started
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white safe-area-pb shadow-[0_-1px_3px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1280px] mx-auto px-2 flex items-center justify-around h-16">
          {bottomNavItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/dashboard/citizen' && location.pathname.startsWith('/dashboard'));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-[var(--radius)] transition-colors min-w-[64px]',
                  isActive ? 'text-primary bg-[var(--accent-soft)]' : 'text-[var(--text-secondary)]'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main content: offset by sidebar on desktop when visible */}
      <div className={cn('flex-1 flex flex-col min-w-0 min-h-0 transition-[padding] duration-200', sidebarVisible && 'md:pl-60')}>
        <main className="flex-1 min-h-0 max-w-[1280px] w-full mx-auto px-4 md:px-6 py-6 md:py-8 overflow-x-hidden overflow-y-auto">
          {children}
        </main>

        <footer className="bg-[var(--surface)] py-6 mt-auto">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                <img src="/habitat.png" alt="HabitatLink" className="h-8 w-auto object-contain" />
                <span className="font-semibold text-[var(--text-primary)]">HabitatLink</span>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-[var(--text-secondary)]">
                <Link to="/housing" className="hover:text-primary transition-colors">Housing</Link>
                <Link to="/programs" className="hover:text-primary transition-colors">Programs</Link>
                <a href="#" className="hover:text-primary transition-colors">Help</a>
              </div>
            </div>
            <p className="mt-4 text-xs text-[var(--text-secondary)]">
              © {new Date().getFullYear()} HabitatLink. Connecting families to safe, affordable housing.
            </p>
          </div>
        </footer>
      </div>

      <AuthModal />
      <EligibilityModal />
    </div>
  );
};
