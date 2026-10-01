import { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, Eye, Search } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  stagger,
  scaleIn,
  T,
  EASE,
  Spotlight,
  useSpotlight,

  viewportOnce,} from '@/lib/motion';
import { SectionHeader } from './SectionHeader';


const DEFAULT_BLOGS = [
  {
    _id: 'default-blog-1',
    title: 'Building a Custom Headless CMS with Node.js and Express',
    slug: 'building-a-custom-headless-cms-with-nodejs-and-express',
    excerpt: 'Why building your own CMS from scratch can give you total freedom, better performance, and zero third-party lock-in.',
    tags: ['Node.js', 'Express', 'CMS', 'Architecture'],
    publishedAt: new Date().toISOString(),
    views: 142,
    readTime: 4
  }
];

export function BlogSection({ blogs: posts = [] }) {
  const reduced = useReducedMotion();
  const trackPointer = useSpotlight();
  const [search, setSearch] = useState('');

  const blogItems = posts && posts.length > 0 ? posts : DEFAULT_BLOGS;

  const filtered = blogItems.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.excerpt?.toLowerCase().includes(q) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
    );
  });

  return (
    <section id="blog" className="py-20 md:py-28 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          icon={BookOpen}
          label="Writings &amp; Thoughts"
          title="Articles &amp; Engineering Insights"
          lede="Technical tutorials, custom architecture breakdowns, and web development best practices."
          className="mb-12"
        />

        {/* Search */}
        <div className="relative w-full sm:max-w-md mx-auto mb-10">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search articles by title or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="hud-input pl-9 w-full"
          />
        </div>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}
        >
          <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <motion.div
              key={post._id || post.slug}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
              className="hud-card flex flex-col group relative overflow-hidden"
              onMouseMove={trackPointer}
              whileHover={{ y: -6 }}
              transition={T.spring}
            >
              <Spotlight />
              <motion.div
                className="h-[1px] w-full bg-gradient-to-r from-cyan-400/60 via-cyan-400/20 to-transparent"
                initial={reduced ? false : { scaleX: 0 }}
                whileInView={reduced ? undefined : { scaleX: 1 }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'left' }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              />

              <div className="p-5 space-y-3 flex-1">
                {/* Meta */}
                <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'Draft'}
                  </span>
                  {post.readTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min read
                    </span>
                  )}
                  {post.views != null && (
                    <span className="flex items-center gap-1 ml-auto">
                      <Eye className="w-3 h-3" />
                      {post.views}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-foreground group-hover:text-cyan-300 transition-colors leading-tight cursor-pointer">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-5 py-3 border-t border-cyan-500/10">
                <a
                  href={post.slug ? `/blog/${post.slug}` : '#'}
                  className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-cyan-400 hover:text-cyan-200 uppercase tracking-[.08em] transition-colors"
                >
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
