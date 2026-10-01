import { Layout, Check, Server, Zap } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  stagger,
  scaleIn,
  slideInRight,
  T,
  Spotlight,
  useSpotlight,

  viewportOnce,} from '@/lib/motion';
import { SectionHeader } from './SectionHeader';


export function ServicesSection({ services = [] }) {
  const defaultServices = [
    {
      _id: 'default-1',
      title: 'Full Stack Web Development',
      description: 'End-to-end custom web applications built with Next.js, Node.js, and modern databases.',
      icon: 'code',
      features: [
        'Custom REST API & backend architecture',
        'Responsive, accessible frontend UI',
        'SEO optimization & Core Web Vitals',
        'Database schema design & optimization',
      ],
    },
    {
      _id: 'default-2',
      title: 'Custom CMS Architecture',
      description: 'Bespoke admin dashboards and content management backends tailored to your exact business workflow.',
      icon: 'server',
      features: [
        'JWT authentication & role-based access',
        'Media upload & management system',
        'Flexible content schemas & APIs',
        'Zero dependency on proprietary vendors',
      ],
    },
  ];

  const items = services.length > 0 ? services : defaultServices;
  const reduced = useReducedMotion();
  const trackPointer = useSpotlight();

  return (
    <section id="services" className="py-20 md:py-28 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          icon={Zap}
          label="Services &amp; Offerings"
          title="How I Can Help Your Business"
          lede="From initial CMS backend architecture to responsive, high-converting frontend user interfaces."
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((service) => (
            <motion.div
              key={service._id || service.title}
              className="hud-card p-6 flex flex-col space-y-5 relative overflow-hidden"
              onMouseMove={trackPointer}
              whileHover={{ y: -6 }}
              transition={T.spring}
            >
              <Spotlight />
              {/* Icon + title */}
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={reduced ? undefined : { rotate: 90, scale: 1.1 }}
                  transition={T.spring}
                  className="w-10 h-10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0 bg-cyan-400/5"
                >
                  {service.icon === 'server' ? <Server className="w-5 h-5" /> : <Layout className="w-5 h-5" />}
                </motion.div>
                <div>
                  <h3 className="text-base font-bold text-foreground uppercase tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{service.description}</p>
                </div>
              </div>

              {/* Top separator */}
              <div className="h-px w-full bg-gradient-to-r from-cyan-400/30 via-cyan-400/10 to-transparent" />

              {/* Feature list */}
              {service.features && service.features.length > 0 && (
                <ul className="space-y-2 flex-1">
                  {service.features.map((feat, i) => (
                    <motion.li
                      key={i}
                      variants={slideInRight}
                      className="flex items-center gap-2.5 text-xs text-muted-foreground"
                    >
                      <motion.span
                        initial={reduced ? false : { scale: 0 }}
                        whileInView={reduced ? undefined : { scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ ...T.spring, delay: 0.25 + i * 0.07 }}
                      >
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      </motion.span>
                      <span>{feat}</span>
                    </motion.li>
                  ))}
                </ul>
              )}

              <motion.button
                whileHover={reduced ? undefined : { x: 4 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                transition={T.fast}
                className="btn-hud-ghost w-full justify-center mt-auto"
              >
                Request Consultation
              </motion.button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
