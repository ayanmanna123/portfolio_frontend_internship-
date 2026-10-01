import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';

export function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`border border-border text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-200 ${className}`}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      style={{ borderRadius: 0 }}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-300 hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-sky-600 hover:-rotate-12 transition-transform duration-300" />
      )}
    </Button>
  );
}

