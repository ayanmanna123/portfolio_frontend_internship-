import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

import {
  motion,
  useReducedMotion,
  slideInLeft,
  slideInRight,
  T,
  EASE,

  viewportOnce,} from '@/lib/motion';
import { SectionHeader } from './SectionHeader';


const DEFAULT_EXPERIENCES = [
  {
    _id: 'default-exp-1',
    title: 'Senior Full Stack Engineer',
    company: 'Nexus Tech Solutions',
    location: 'San Francisco, CA',
    type: 'full-time',
    startDate: '2023',
    endDate: 'Present',
    current: true,
    description: [
      'Architected custom internal tools and RESTful API microservices powering 50k+ daily operations.',
      'Mentored junior developers and led frontend performance optimization initiatives.'
    ],
    skillsUsed: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS']
  }
];

export function ExperienceSection({ experiences = [] }) {
  const experience = experiences && experiences.length > 0 ? experiences : DEFAULT_EXPERIENCES;
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="py-20 md:py-28 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          icon={Briefcase}
          label="Work History"
          title="Experience &amp; Career Milestones"
          lede="Professional background, team leadership, and technical accomplishments."
          className="mb-16"
        />

        <div className="relative pl-6 space-y-0">
          {/* Timeline spine */}
          <motion.div
            className="timeline-line"
            initial={reduced ? false : { scaleY: 0 }}
            whileInView={reduced ? undefined : { scaleY: 1 }}
            viewport={viewportOnce}
            style={{ transformOrigin: 'top' }}
            transition={{ duration: 1.2, ease: EASE.out }}
          />

          {experience.map((job, idx) => {
            const bullets = job.description || job.responsibilities || [];
            const tags = job.skillsUsed || job.technologies || [];
            const roleTitle = job.title || job.role;

            return (
              <motion.div
                key={job._id || idx}
                className="relative pb-10 last:pb-0"
                variants={slideInLeft}
                initial={reduced ? false : 'hidden'}
                whileInView={reduced ? undefined : 'show'}
                viewport={viewportOnce}
                transition={{ ...T.spring, delay: idx * 0.08 }}
              >
                {/* Timeline node */}
                <motion.div
                  className="timeline-node"
                  initial={reduced ? false : { scale: 0, opacity: 0 }}
                  whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ ...T.spring, delay: 0.15 + idx * 0.08 }}
                />

                <motion.div
                  className="hud-card ml-8 p-6 space-y-4"
                  whileHover={reduced ? undefined : { x: 6, borderColor: 'rgba(77,229,255,.35)' }}
                  transition={T.spring}
                >
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-foreground tracking-tight">
                        {roleTitle}
                      </h3>
                      <div className="flex items-center gap-1.5 text-cyan-400/80">
                        <span className="text-xs font-mono font-semibold">{job.company}</span>
                        {job.current && (
                          <span className="w-1.5 h-1.5 bg-cyan-400 signal-dot" />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 shrink-0">
                      <div className="flex items-center gap-1.5 tech-tag">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        <span>
                          {job.startDate}
                          {' — '}
                          {job.current ? 'Present' : job.endDate || 'Present'}
                        </span>
                      </div>
                      {job.type && (
                        <span className="tech-tag uppercase">{job.type}</span>
                      )}
                      {job.location && (
                        <div className="flex items-center gap-1 tech-tag">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          <span>{job.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bullet points */}
                  {bullets.length > 0 && (
                    <ul className="space-y-2 pt-2 border-t border-cyan-500/10">
                      {bullets.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-cyan-500/10">
                      {tags.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
