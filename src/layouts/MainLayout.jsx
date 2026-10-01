import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export function MainLayout({ children, about, isLiveConnected }) {
  return (
    <div className="tech-shell min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary transition-colors duration-200">
      <Navbar isLiveConnected={isLiveConnected} about={about} />
      <main className="flex-1">{children}</main>
      <Footer about={about} />
    </div>
  );
}
