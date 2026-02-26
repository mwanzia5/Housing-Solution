import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, FileCheck, BookOpen, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Housing', path: '/housing', icon: Search },
    { name: 'Eligibility', path: '/eligibility', icon: FileCheck },
    { name: 'Programs', path: '/programs', icon: BookOpen },
  ];

  const dashboardItems = [
    { name: 'Citizen Dash', path: '/dashboard/citizen' },
    { name: 'Provider Portal', path: '/dashboard/provider' },
    { name: 'Admin Analytics', path: '/dashboard/admin' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-bg text-[var(--text-primary)]">
      <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary rounded-[12px] flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-primary tracking-tight">HomeLink</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'text-sm font-medium transition-colors flex items-center gap-1.5 py-2 relative',
                    isActive
                      ? 'text-primary'
                      : 'text-[var(--text-secondary)] hover:text-primary'
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
            <div className="h-5 w-px bg-[var(--border)] mx-1" />
            <div className="flex gap-4 text-xs font-medium text-[var(--text-secondary)]">
              {dashboardItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="h-5 w-px bg-[var(--border)] mx-1" />
            <Button variant="outline" size="sm">
              Log In
            </Button>
            <Button size="sm">Get Started</Button>
          </nav>

          <button
            type="button"
            className="md:hidden p-2 rounded-[12px] text-[var(--text-secondary)] hover:bg-[#f1f5f9] transition-colors"
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
            className="md:hidden fixed inset-x-0 top-16 z-40 bg-white border-b border-[var(--border)] shadow-[0_8px_30px_rgba(15,23,42,0.06)] p-4"
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-[12px] transition-colors font-medium',
                    location.pathname === item.path
                      ? 'bg-[var(--accent-soft)] text-primary'
                      : 'text-[var(--text-secondary)] hover:bg-[#f8fafc]'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
              <div className="h-px bg-[var(--border)] my-2" />
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
              <div className="h-px bg-[var(--border)] my-2" />
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Log In
                </Button>
                <Button size="sm" className="w-full">
                  Get Started
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8">
        {children}
      </main>

      <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-6 mt-auto">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-[12px] flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-[var(--text-primary)]">HomeLink</span>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-[var(--text-secondary)]">
              <Link to="/housing" className="hover:text-primary transition-colors">Housing</Link>
              <Link to="/eligibility" className="hover:text-primary transition-colors">Eligibility</Link>
              <Link to="/programs" className="hover:text-primary transition-colors">Programs</Link>
              <a href="#" className="hover:text-primary transition-colors">Help</a>
            </div>
          </div>
          <p className="mt-4 text-xs text-[var(--text-secondary)]">
            © {new Date().getFullYear()} HomeLink. Connecting families to safe, affordable housing.
          </p>
        </div>
      </footer>
    </div>
  );
};
