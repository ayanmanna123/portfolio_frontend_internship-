// This module intentionally co-locates motion primitives (plain objects/hooks)
// with renderable components. The react-refresh rule assumes component-only
// files, which does not apply to a shared motion vocabulary.
/* eslint-disable react-refresh/only-export-components */
import { useRef, useEffect } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
  animate,
} from 'framer-motion';

/* ══════════════════════════════════════════════════════════════
   MOTION DESIGN SYSTEM
   Single source of truth for timing, easing and variants so the
   whole site moves with one consistent mechanical feel.
   ══════════════════════════════════════════════════════════════ */

export const EASE = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  snap: [0.2, 0, 0, 1],
};

export const DUR = {
  fast: 0.18,
  base: 0.32,
  slow: 0.55,
  reveal: 0.7,
};

export const T = {
  fast: { duration: DUR.fast, ease: EASE.out },
  base: { duration: DUR.base, ease: EASE.out },
  slow: { duration: DUR.slow, ease: EASE.out },
  reveal: { duration: DUR.reveal, ease: EASE.out },
  spring: { type: 'spring', stiffness: 320, damping: 30, mass: 0.7 },
  springSoft: { type: 'spring', stiffness: 180, damping: 26, mass: 0.9 },
};

/* ─── Variant presets ───────────────────────────────────────── */

export const stagger = (each = 0.07, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren } },
});

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: T.reveal },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.slow, ease: EASE.out } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: T.spring },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: T.reveal },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: T.reveal },
};

/* Sharp HUD panel wipe. */
export const clipReveal = (dir = 'left') => ({
  hidden: {
    opacity: 0,
    clipPath: dir === 'left' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
  },
  show: { opacity: 1, clipPath: 'inset(0 0 0 0)', transition: T.reveal },
});

export const charContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.022, delayChildren: 0.08 } },
};

export const charItem = {
  hidden: { opacity: 0, y: '0.5em', rotateX: -80 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: EASE.out } },
};

export const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.016, delayChildren: 0.18 } },
};

export const wordItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE.out } },
};

/* ─── Viewport configs ──────────────────────────────────────── */
export const viewportOnce = { once: true };
export const viewportTight = { once: true };

/* ─── Hover / tap presets ───────────────────────────────────── */
export const hoverLift = { y: -4 };
export const hoverGlow = { y: -4, boxShadow: '0 0 44px rgba(77,229,255,.16)' };
export const tapScale = { scale: 0.97 };

/* ══════════════════════════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════════════════════════ */

/** Scroll-triggered reveal. Disabled when the user prefers reduced motion. */
export function Reveal({
  children,
  variants = fadeUp,
  viewport = viewportOnce,
  className,
  as,
  delay = 0,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Comp = as || motion.div;
  if (reduced) {
    const Tag = as || 'div';
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Staggered container. Pair children with <RevealItem>. */
export function StaggerGroup({ children, className, each = 0.07, delay = 0, amount = 0.15, ...rest }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={stagger(each, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: '0px 0px -70px 0px' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Child of StaggerGroup. */
export function RevealItem({ children, className, variants = fadeUp, as, ...rest }) {
  const reduced = useReducedMotion();
  if (reduced) {
    const Tag = as || 'div';
    return <Tag className={className}>{children}</Tag>;
  }
  const Comp = as || motion.div;
  return (
    <Comp className={className} variants={variants} {...rest}>
      {children}
    </Comp>
  );
}

/** Letter- or word-by-word text reveal. */
export function AnimatedText({ text = '', className, word = false, delay = 0 }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;

  const chunks = word ? String(text).split(' ') : [String(text)];
  const container = word ? wordContainer : charContainer;
  const item = word ? wordItem : charItem;

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewportTight}
      transition={{ delayChildren: delay }}
      aria-label={text}
      style={{ perspective: 600 }}
    >
      {chunks.map((chunk, ci) => (
        <span key={ci} className="inline-block whitespace-pre">
          {chunk.split('').map((ch, i) => (
            <motion.span key={i} className="inline-block" variants={item} aria-hidden="true">
              {ch}
            </motion.span>
          ))}
          {word && ci < chunks.length - 1 ? ' ' : null}
        </span>
      ))}
    </motion.span>
  );
}

/** Numeric readout that counts up when scrolled into view. */
export function Counter({ value, suffix = '', prefix = '', decimals = 0, duration = 1.5, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();

  const mv = useMotionValue(0);
  const text = useTransform(mv, (latest) => latest.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration, ease: EASE.out });
    return () => controls.stop();
  }, [inView, value, duration, reduced, mv]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{text}</motion.span>
      {suffix}
    </span>
  );
}

/**
 * Pointer-following radial glow. Place inside a `group` card; the card's
 * onMouseMove must call the returned `track` handler to set --mx/--my.
 * Renders nothing under reduced motion.
 */
export function Spotlight() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          'radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(77,229,255,.11), transparent 62%)',
      }}
    />
  );
}

/** Builds the onMouseMove handler that feeds <Spotlight>. */
export function useSpotlight() {
  return (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
}

/** A horizontal rule that draws itself in when scrolled into view. */
export function DrawLine({ className, delay = 0 }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className} />;
  return (
    <motion.div
      className={className}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: EASE.out, delay }}
      style={{ transformOrigin: 'left' }}
    />
  );
}

// Re-export the framer primitives components reach for directly, so
// components only ever import from one place.
export {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
  useMotionValue,
  useMotionValueEvent,
  AnimatePresence,
  animate,
};
