import { User, MapPin, Mail, Phone, CheckCircle2, Code2, Globe, Download } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import {
  motion,
  useReducedMotion,
  stagger,
  fadeUp,
  scaleIn,
  slideInLeft,
  slideInRight,
  T,
  Spotlight,
  useSpotlight,

  viewportOnce,} from '@/lib/motion';


export function AboutSection({ about }) {
  const reduced = useReducedMotion();
  const trackPointer = useSpotlight();
  const highlights = about?.highlights || [
    'Designed & built custom CMS architecture from scratch',
    'Full-stack React, Next.js, Node.js & Express developer',
    'Focus on performance, SEO, animations, and visual polish',
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          icon={User}
          label="About Me"
          title="Architecting Robust Digital Solutions"
          lede="Bridging the gap between scalable backend infrastructure and fluid frontend aesthetics."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-5">
            <motion.div
              className="hud-card p-6 sm:p-8 space-y-6 group relative overflow-hidden"
              onMouseMove={trackPointer}
              whileHover={{ y: -4 }}
              transition={T.spring}
            >
              <Spotlight />
              <div className="flex items-center gap-4">
                {about?.avatarUrl ? (
                  <div className="h-16 w-16 sm:h-20 sm:w-20 border border-primary/30 bg-card overflow-hidden shrink-0">
                    <img src={about.avatarUrl} alt={about.name || 'Developer Avatar'}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = ''; }} />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center bg-primary/10 text-primary shrink-0 border border-primary/20">
                    <User className="w-8 h-8" />
                  </div>
                )}
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-foreground tracking-tight">
                    {about?.name || 'Alex Rivera'}
                  </h3>
                  <p className="text-[10px] font-mono text-primary uppercase tracking-wider font-semibold">
                    {about?.title || 'Full Stack Engineer & CMS Architect'}
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {about?.bio || 'I specialize in crafting high-performance full-stack web applications, bespoke CMS systems, and elegant user interfaces using modern web technology stacks.'}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-border text-sm">
                {about?.location && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="font-mono text-xs">{about.location}</span>
                  </div>
                )}
                {about?.email && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                    <a href={`mailto:${about.email}`} className="font-mono text-xs hover:text-primary transition-colors truncate">
                      {about.email}
                    </a>
                  </div>
                )}
                {about?.phone && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="font-mono text-xs">{about.phone}</span>
                  </div>
                )}
              </div>

              {about?.resumeUrl && (
                <a href={about.resumeUrl} target="_blank" rel="noreferrer" className="block pt-1">
                  <button className="btn-hud-ghost w-full justify-center">
                    <Download className="w-3.5 h-3.5" />
                    Download Curriculum Vitae (PDF)
                  </button>
                </a>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <motion.h3
                variants={fadeUp}
                className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[.18em] flex items-center gap-2"
              >
                <span className="text-primary">▸</span> Key Highlights &amp; Capabilities
              </motion.h3>
              <div className="space-y-2">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={slideInRight}
                    className="flex items-start gap-3.5 p-4 border border-border bg-card/60 hover:border-primary/40 hover:bg-card transition-all"
                    whileHover={{ x: 6 }}
                    transition={T.fast}
                  >
                    <motion.span
                      initial={reduced ? false : { scale: 0, rotate: -90 }}
                      whileInView={reduced ? undefined : { scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...T.spring, delay: 0.1 + index * 0.08 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    </motion.span>
                    <span className="text-sm text-foreground leading-relaxed font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <motion.div variants={scaleIn} className="hud-card p-5 space-y-2.5" whileHover={{ y: -4 }} transition={T.spring}>
                <div className="w-8 h-8 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-foreground text-sm uppercase tracking-tight">Clean &amp; Scalable Code</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Engineered with strict separation of concerns, modular design patterns, and full documentation.
                </p>
              </motion.div>
              <motion.div variants={scaleIn} className="hud-card p-5 space-y-2.5" whileHover={{ y: -4 }} transition={T.spring}>
                <div className="w-8 h-8 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                  <Globe className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-foreground text-sm uppercase tracking-tight">Custom CMS Architecture</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Tailor-made headless API backends with no dependency on proprietary 3rd party providers.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
