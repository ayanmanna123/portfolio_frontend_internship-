import { useRef } from 'react';
import { ArrowDownRight, Mail, Terminal, Radio, Layers3 } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  T,
  EASE,
  stagger,
  fadeUp,
  AnimatedText,
} from '@/lib/motion';

export function FuturisticHero({ about }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Parallax layers — clean fading without downward translation that creates gaps on scroll
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const groupProps = reduced
    ? {}
    : { variants: stagger(0.09, 0.15), initial: 'hidden', animate: 'show' };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center overflow-hidden px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      {/* ── Ambient background ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute right-[-10rem] top-16 h-[38rem] w-[38rem] rounded-full border border-cyan-300/10 bg-[radial-gradient(circle,rgba(29,124,190,.18),transparent_62%)] blur-sm"
          style={reduced ? undefined : { scale: glowScale }}
        />

        {/* Circuit lines that sweep in, hold, then fade */}
        <motion.div
          className="absolute left-[8%] top-[14%] h-px w-[24%] origin-left bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"
          initial={reduced ? false : { scaleX: 0, opacity: 0 }}
          animate={reduced ? undefined : { scaleX: 1, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.6, times: [0, 0.2, 0.75, 1], ease: EASE.out, delay: 0.4 }}
        />
        <motion.div
          className="absolute right-[8%] top-[20%] h-px w-[23%] origin-right bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"
          initial={reduced ? false : { scaleX: 0, opacity: 0 }}
          animate={reduced ? undefined : { scaleX: 1, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.6, times: [0, 0.2, 0.75, 1], ease: EASE.out, delay: 0.7 }}
        />

        {/* Drifting nodes */}
        <motion.div
          className="float-node absolute right-[11%] top-[23%] h-2 w-2 border border-primary/70 bg-primary shadow-[0_0_18px_4px_rgba(2,132,199,.4)] dark:shadow-[0_0_18px_4px_rgba(77,229,255,.4)]"
          animate={reduced ? undefined : { y: [0, -16, 0], opacity: [1, 0.6, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="float-node absolute bottom-[19%] left-[13%] h-1.5 w-1.5 bg-primary shadow-[0_0_16px_4px_rgba(2,132,199,.4)] dark:shadow-[0_0_16px_4px_rgba(77,229,255,.4)]"
          animate={reduced ? undefined : { y: [0, 14, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-16 w-full"
        style={reduced ? undefined : { opacity: copyOpacity }}
      >
        {/* ── Copy column ──────────────────────────────────── */}
        <div className="relative z-10" {...groupProps}>
          <h1 className="max-w-3xl text-[clamp(3.1rem,7.2vw,7.4rem)] font-black uppercase leading-[.82] tracking-[-.085em] text-foreground">
            <AnimatedText text="Interfaces" />
            <span className="block pl-[.12em] text-primary [text-shadow:0_0_38px_rgba(2,132,199,.24)] dark:[text-shadow:0_0_38px_rgba(77,229,255,.24)]">
              <AnimatedText text="with intent." delay={0.18} />
            </span>
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-base leading-7 text-muted-foreground font-medium sm:text-lg"
            variants={fadeUp}
          >
            {about?.bio ||
              'I design and build clear, resilient digital products — from the interaction layer to the systems that power it.'}
          </motion.p>

          <motion.div className="mt-9 flex flex-wrap gap-3" variants={fadeUp}>
            <motion.button
              onClick={() => scrollTo('projects')}
              className="group relative inline-flex h-12 items-center gap-3 overflow-hidden border border-primary bg-primary px-5 font-mono text-xs font-bold uppercase tracking-[.12em] text-primary-foreground shadow-sm"
              whileHover={{ y: -3, boxShadow: '0 0 28px var(--primary)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Selected work</span>
              <ArrowDownRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </motion.button>

            <motion.button
              onClick={() => scrollTo('contact')}
              className="inline-flex h-12 items-center border border-border bg-card px-5 font-mono text-xs font-medium uppercase tracking-[.12em] text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Start a conversation
            </motion.button>
          </motion.div>

          <motion.div className="mt-12 flex items-center gap-4" variants={fadeUp}>
            {about?.socialLinks?.github && (
              <motion.a
                aria-label="GitHub"
                href={about.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center border border-border bg-card text-foreground hover:border-primary hover:text-primary transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.94 }}
              >
                <Github className="h-4 w-4" />
              </motion.a>
            )}
            {about?.socialLinks?.linkedin && (
              <motion.a
                aria-label="LinkedIn"
                href={about.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center border border-border bg-card text-foreground hover:border-primary hover:text-primary transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.94 }}
              >
                <Linkedin className="h-4 w-4" />
              </motion.a>
            )}
            <motion.a
              aria-label="Email"
              href={`mailto:${about?.email || 'admin@portfolio.com'}`}
              className="grid h-10 w-10 place-items-center border border-border bg-card text-foreground hover:border-primary hover:text-primary transition-colors"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.94 }}
            >
              <Mail className="h-4 w-4" />
            </motion.a>
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground font-semibold">
              {about?.name || 'Alex Rivera'} / Product Systems
            </span>
          </motion.div>
        </div>

        {/* ── Visual column ────────────────────────────────── */}
        <motion.div
          className="relative mx-auto w-full max-w-[31rem] lg:mr-0"
          style={reduced ? undefined : { scale: visualScale, opacity: visualOpacity }}
          initial={reduced ? false : { opacity: 0, scale: 0.9, rotateX: 12 }}
          animate={reduced ? undefined : { opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1, ease: EASE.out, delay: 0.25 }}
        >
          <div className="absolute inset-[-12%] rounded-full border border-primary/10 hero-orbit" />
          <div className="absolute inset-[2%] rounded-full border border-dashed border-primary/15 hero-orbit-reverse" />

          <motion.div
            className="relative overflow-hidden border border-border bg-card p-1 shadow-xl dark:border-cyan-200/25 dark:bg-[linear-gradient(145deg,rgba(14,42,66,.88),rgba(6,10,18,.92)_52%,rgba(12,29,48,.85))] dark:shadow-[0_0_100px_rgba(21,145,212,.15)]"
            whileHover={{ scale: 1.015 }}
            transition={T.base}
          >
            <div className="relative aspect-square overflow-hidden border border-border/50 bg-secondary/60 dark:border-cyan-100/10 dark:bg-[radial-gradient(circle_at_48%_38%,rgba(77,229,255,.28),transparent_23%),radial-gradient(circle_at_46%_44%,rgba(14,93,152,.7),transparent_51%),linear-gradient(140deg,#08101c,#0b1f32)]">
              <div className="scan-line absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-primary/15 to-transparent" />

              <motion.div
                className="absolute inset-[13%] rounded-full border border-primary/25 hero-orbit"
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
              >
                <span className="absolute -top-1 left-1/2 h-2 w-2 bg-primary shadow-[0_0_16px_var(--primary)]" />
              </motion.div>

              <motion.div
                className="absolute inset-[24%] rounded-full border border-primary/20 hero-orbit-reverse"
                animate={reduced ? undefined : { rotate: -360 }}
                transition={{ duration: 19, repeat: Infinity, ease: 'linear' }}
              >
                <span className="absolute bottom-2 right-4 h-1.5 w-1.5 bg-primary" />
              </motion.div>

              <motion.div
                className="absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center border border-border bg-card/90 dark:border-cyan-100/30 dark:bg-slate-950/35 backdrop-blur-sm shadow-md"
                animate={
                  reduced
                    ? undefined
                    : { boxShadow: ['0 0 0px rgba(2,132,199,0)', '0 0 34px rgba(2,132,199,.22)', '0 0 0px rgba(2,132,199,0)'] }
                }
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Terminal className="h-14 w-14 text-primary" strokeWidth={1.2} />
                <span className="absolute -bottom-8 font-mono text-[9px] font-semibold tracking-[.18em] text-foreground">
                  BUILD / SHIP / REFINE
                </span>
              </motion.div>

              <motion.div
                className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[9px] font-semibold tracking-[.14em] text-primary"
                animate={reduced ? undefined : { opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Radio className="h-3 w-3" /> NODE_01
              </motion.div>

              <motion.div
                className="absolute bottom-5 right-5 flex items-center gap-2 font-mono text-[9px] font-semibold tracking-[.14em] text-primary"
                animate={reduced ? undefined : { opacity: [1, 0.6, 1] }}
                transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Layers3 className="h-3 w-3" /> SYSTEM_MAP
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -bottom-5 -left-5 border border-border bg-card px-4 py-3 backdrop-blur-md shadow-lg"
            initial={reduced ? false : { opacity: 0, x: -20 }}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE.out, delay: 0.9 }}
            whileHover={{ x: 4, borderColor: 'var(--primary)' }}
          >
            <p className="font-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground font-medium">Current focus</p>
            <p className="mt-1 font-mono text-xs font-bold text-foreground">Product systems / 01</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ────────────────────────────────────── */}
      <motion.button
        onClick={() => scrollTo('about')}
        className="mx-auto mt-10 flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[.2em] text-muted-foreground font-semibold transition-colors hover:text-primary lg:absolute lg:bottom-8 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2"
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        whileHover={{ y: 3 }}
        aria-label="Scroll to about section"
      >
        <span className="h-8 w-px bg-gradient-to-b from-primary/60 to-transparent" />
        SCROLL
        <motion.span
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDownRight className="h-3 w-3" />
        </motion.span>
      </motion.button>
    </section>
  );
}
