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
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">HomeLink</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5",
                  location.pathname === item.path ? "text-primary font-semibold" : "text-gray-600"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
            
            {/* Demo Dashboards Dropdown Trigger (Simplified as links for now) */}
            <div className="h-6 w-px bg-gray-300 mx-2" />
            <div className="flex gap-3 text-xs font-medium text-gray-500">
              {dashboardItems.map((item) => (
                <Link key={item.path} to={item.path} className="hover:text-primary transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="h-6 w-px bg-gray-300 mx-2" />
            <Button variant="outline" size="sm" className="rounded-lg">Log In</Button>
            <Button size="sm" className="rounded-lg">Get Started</Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-0 top-16 z-40 glass-panel border-b border-white/20 p-4 shadow-lg"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-colors",
                    location.pathname === item.path ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100/50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              <div className="h-px bg-gray-200 my-2" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3">Dashboards (Demo)</p>
              {dashboardItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-gray-600 hover:text-primary font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-px bg-gray-200 my-2" />
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full justify-center">Log In</Button>
                <Button className="w-full justify-center">Get Started</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-primary text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">HomeLink</span>
              </div>
              <p className="text-primary-100 text-sm leading-relaxed">
                Connecting families to safe, affordable housing and government assistance programs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-primary-100">
                <li><Link to="/housing" className="hover:text-white">Browse Housing</Link></li>
                <li><Link to="/eligibility" className="hover:text-white">Check Eligibility</Link></li>
                <li><Link to="/programs" className="hover:text-white">Government Programs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-primary-100">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Application Guide</a></li>
                <li><a href="#" className="hover:text-white">Tenant Rights</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-primary-100">
                <li>support@homelink.gov</li>
                <li>1-800-HOME-LINK</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-primary-200">
            © 2026 HomeLink. An official housing access initiative.
          </div>
        </div>
      </footer>
    </div>
  );
};
