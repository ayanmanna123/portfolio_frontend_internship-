import { useState, useMemo } from 'react';
import { FolderGit2, ExternalLink, Eye, Search } from 'lucide-react';
import { Github } from './Icons';
import { ProjectModal } from './ProjectModal';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  stagger,
  fadeUp,
  scaleIn,
  T,
  Spotlight,
  useSpotlight,

  viewportOnce,} from '@/lib/motion';
import { SectionHeader } from './SectionHeader';


export function ProjectsSection({ projects = [] }) {
  const reduced = useReducedMotion();
  const trackPointer = useSpotlight();
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = useMemo(() => {
    const set = new Set(['All']);
    projects.forEach((p) => { if (p.category) set.add(p.category); });
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = filterCategory === 'All' || p.category === filterCategory;
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));
      return matchCat && matchSearch;
    });
  }, [projects, filterCategory, search]);

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          icon={FolderGit2}
          label="Selected Work"
          title="Featured Projects &amp; Case Studies"
          lede="Handcrafted software solutions, custom headless platforms, and production-ready applications."
          className="mb-12"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-px border border-border bg-card/70 p-1">
            <AnimatePresence initial={false} mode="popLayout">
              {categories.map((cat) => {
                const active = filterCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`relative px-4 py-2 text-[10px] font-mono font-semibold uppercase tracking-[.1em] transition-colors ${
                      active ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="project-filter-pill"
                        className="absolute inset-0 bg-primary -z-10"
                        transition={T.spring}
                      />
                    )}
                    <span className="relative">{cat}</span>
                  </button>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="hud-input pl-10"
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
        </div>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' }}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.div
                key={project._id || project.slug}
                className="hud-card flex flex-col justify-between overflow-hidden group relative"
                onMouseMove={trackPointer}
                whileHover={{ y: -6 }}
                transition={T.spring}
              >
                <Spotlight />
                <div className="h-[1px] w-full bg-gradient-to-r from-cyan-400/60 via-cyan-400/20 to-transparent" />

                {project.thumbnail && (
                  <div
                    className="h-44 w-full bg-muted/40 dark:bg-slate-950 overflow-hidden relative cursor-pointer border-b border-border"
                    onClick={() => setSelectedProject(project)}
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                    />
                  </div>
                )}

                <div className="p-5 space-y-3 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="tech-tag uppercase">{project.category || 'Full Stack'}</span>
                    {project.featured && (
                      <span className="text-[10px] font-mono font-semibold text-amber-500 uppercase tracking-wider">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-base font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer leading-tight"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h3>

                  {project.tagline && (
                    <p className="text-xs font-mono text-primary/80 line-clamp-1">{project.tagline}</p>
                  )}

                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <span key={i} className="tech-tag">{tag}</span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="text-[10px] font-mono text-muted-foreground">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="px-5 py-3 border-t border-border flex items-center justify-between">
                  <button
                    className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-primary hover:opacity-80 uppercase tracking-[.08em] transition-opacity"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Details
                  </button>
                  <div className="flex items-center gap-1">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer"
                        className="p-1.5 text-muted-foreground hover:text-primary transition-colors" title="GitHub Repository">
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer"
                        className="p-1.5 text-muted-foreground hover:text-primary transition-colors" title="Live Demo">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={fadeUp}
              className="col-span-full py-16 text-center text-muted-foreground text-sm font-mono"
            >
              // NO_PROJECTS_FOUND — adjust filter parameters
            </motion.div>
          )}
        </div>

      </div>
      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
