import { useState, useMemo } from 'react';
import { Cpu, Code, Search, Star } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  stagger,
  scaleIn,
  T,
  Counter,
  Spotlight,
  useSpotlight,

  viewportOnce,} from '@/lib/motion';
import { SectionHeader } from './SectionHeader';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'DevOps & Tools'];

export function SkillsSection({ skills = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const reduced = useReducedMotion();

  const filteredSkills = useMemo(
    () =>
      skills.filter((skill) => {
        const matchesCat = activeCategory === 'All' || skill.category === activeCategory;
        const matchesSearch = (skill.name || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
      }),
    [skills, activeCategory, searchQuery]
  );

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={Cpu}
          label="Tech Stack & Skills"
          title="Technologies & Frameworks"
          lede="Modern tools and proven technologies I leverage to build secure, scalable, and responsive software."
        />

        {/* ── Filters ─────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ ...T.base, delay: 0.1 }}
        >
          {/* Sliding active-category indicator */}
          <div className="relative flex flex-wrap items-center gap-px border border-border bg-card/70 p-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-2 text-[10px] font-mono font-semibold uppercase tracking-[.1em] transition-colors ${
                    isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skill-filter-active"
                      className="absolute inset-0 bg-primary"
                      transition={T.spring}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute inset-0 bg-primary/0 transition-colors duration-200 hover:bg-primary/10" />
                  )}
                  <span className="relative">{cat}</span>
                </button>
              );
            })}
          </div>

          <motion.div
            className="relative w-full sm:w-64"
            whileFocusWithin={{ scale: 1.02 }}
            transition={T.fast}
          >
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hud-input pl-9"
            />
          </motion.div>
        </motion.div>

        {/* ── Grid ────────────────────────────────────────────── */}
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill._id || skill.name} skill={skill} reduced={reduced} />
            ))}
          </div>
        ) : (
          <motion.div
            className="py-12 text-center text-muted-foreground text-sm font-mono"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
          >
            // NO_SKILLS_FOUND — adjust filter parameters
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ─── Individual skill card ─────────────────────────────────── */
function SkillCard({ skill, reduced }) {
  const level = skill.level || 85;
  const trackPointer = useSpotlight();

  return (
    <motion.div
      variants={scaleIn}
      className="hud-card p-5 group relative overflow-hidden"
      onMouseMove={trackPointer}
      whileHover={{ y: -5 }}
      transition={T.spring}
    >
      <Spotlight />

      <div className="relative flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <motion.div
            className="flex h-8 w-8 items-center justify-center border border-cyan-400/20 bg-cyan-400/5 text-cyan-400"
            whileHover={{ backgroundColor: '#22d3ee', color: '#020617', rotate: -8 }}
            transition={T.fast}
          >
            <Code className="w-3.5 h-3.5" />
          </motion.div>
          <div>
            <h4 className="text-sm font-bold text-foreground leading-tight">{skill.name}</h4>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              {skill.category}
            </span>
          </div>
        </div>
        {skill.isFeatured && (
          <motion.span
            animate={reduced ? undefined : { rotate: [0, 12, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
          </motion.span>
        )}
      </div>

      <div className="relative space-y-1.5">
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
          <span className="uppercase tracking-wider">Proficiency</span>
          <span className="text-cyan-400 font-bold">
            <Counter value={level} duration={1.2} />
            <span className="text-muted-foreground">%</span>
          </span>
        </div>
        <div className="hud-track">
          <motion.div
            className="hud-fill"
            initial={reduced ? false : { width: 0 }}
            whileInView={reduced ? undefined : { width: `${level}%` }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

