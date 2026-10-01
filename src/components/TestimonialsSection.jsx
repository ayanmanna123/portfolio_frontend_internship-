import { Star, MessageSquareQuote } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  stagger,
  scaleIn,
  T,
  Spotlight,
  useSpotlight,

  viewportOnce,} from '@/lib/motion';
import { SectionHeader } from './SectionHeader';


const DEFAULT_TESTIMONIALS = [
  {
    _id: 'default-test-1',
    author: 'Sarah Jenkins',
    name: 'Sarah Jenkins',
    role: 'VP of Product • Apex Media',
    quote: 'Alex delivered our custom CMS platform ahead of schedule with immaculate code quality and stunning UI. Highly recommended!',
    rating: 5
  }
];

export function TestimonialsSection({ testimonials = [] }) {
  const reduced = useReducedMotion();
  const trackPointer = useSpotlight();
  const items = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  return (
    <section id="testimonials" className="py-20 md:py-28 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          icon={MessageSquareQuote}
          label="Client Reviews"
          title="What Clients Say"
          lede="Feedback from team leaders, founders, and product managers."
          className="mb-12"
        />

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}
        >
          {items.map((t, idx) => (
            <motion.div
              key={t._id || idx}
              className="hud-card p-6 space-y-4 flex flex-col group relative overflow-hidden"
              onMouseMove={trackPointer}
              whileHover={{ y: -5 }}
              transition={T.spring}
            >
              <Spotlight />
              {/* Stars pop in one by one */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={reduced ? false : { scale: 0, rotate: -120, opacity: 0 }}
                    whileInView={reduced ? undefined : { scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...T.spring, delay: 0.15 + i * 0.07 }}
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${i < (t.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`}
                    />
                  </motion.span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-foreground/80 leading-relaxed flex-1 italic">
                &ldquo;{t.quote || t.message}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-cyan-500/10">
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.clientName || t.author || t.name}
                    className="w-8 h-8 rounded-full object-cover border border-cyan-400/30 shrink-0"
                    onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-8 h-8 bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold shrink-0">
                    {(t.clientName || t.author || t.name || 'A').charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-foreground leading-tight">
                    {t.clientName || t.author || t.name}
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
                    {t.position && t.company
                      ? `${t.position} • ${t.company}`
                      : t.position || t.company || t.role || ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
