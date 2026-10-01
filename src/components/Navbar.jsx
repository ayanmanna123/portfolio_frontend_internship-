import { useState } from 'react';
import { Menu, X, Terminal, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { ThemeToggle } from '@/components/ThemeToggle';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' }
];

export function Navbar({ isLiveConnected, about }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy(NAV_LINKS.map(l => l.id), 120);

  const scrollToSection = (id) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Brand */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="flex h-10 w-10 items-center justify-center border border-primary/30 bg-primary/15 text-primary font-bold shadow-[0_0_24px_rgba(77,229,255,.18)] group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-[.13em] text-foreground group-hover:text-primary transition-colors">
                {about?.name || 'Ayan Manna'}
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-[.15em]">
              Full Stack • CMS
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 border border-border bg-card/60 p-1 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.1em] transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                }`}
                style={{ borderRadius: 0 }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 border-primary/30 bg-primary/10 font-mono text-[10px] uppercase tracking-[.1em] hover:border-primary hover:bg-primary/20 text-foreground"
            onClick={() => scrollToSection('contact')}
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Hire Me
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-foreground" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-2xl px-4 pt-2 pb-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-none text-sm font-medium transition-colors text-left ${
                  activeSection === link.id
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-3">
              <Button
                onClick={() => scrollToSection('contact')}
                className="flex-1"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

