import { Terminal, ArrowUp } from 'lucide-react';
import { Github, Linkedin, Twitter } from './Icons';
import { motion, useReducedMotion, T } from '@/lib/motion';

export function Footer({ about }) {
  const reduced = useReducedMotion();
  const socials = [
    { icon: Github,   href: about?.socialLinks?.github   || '#', label: 'GitHub' },
    { icon: Linkedin, href: about?.socialLinks?.linkedin  || '#', label: 'LinkedIn' },
    { icon: Twitter,  href: about?.socialLinks?.twitter   || '#', label: 'Twitter' },
  ];

  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <motion.div
            className="flex items-center gap-2.5"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={T.spring}
          >
            <motion.div
              whileHover={reduced ? undefined : { rotate: 90 }}
              transition={T.spring}
              className="w-7 h-7 bg-primary text-primary-foreground flex items-center justify-center shrink-0"
            >
              <Terminal className="w-3.5 h-3.5" />
            </motion.div>
            <div>
              <p className="text-xs font-mono font-bold text-foreground uppercase tracking-[.12em]">
                {about?.name || 'Alex Rivera'}
              </p>
              <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
                Custom Portfolio &amp; CMS Platform
              </p>
            </div>
          </motion.div>

          {/* Socials + back-to-top */}
          <motion.div
            className="flex items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...T.spring, delay: 0.12 }}
          >
            {socials.map(({ icon: Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                initial={reduced ? false : { opacity: 0, scale: 0.5 }}
                whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...T.spring, delay: 0.2 + i * 0.07 }}
                whileHover={reduced ? undefined : { y: -3 }}
                whileTap={reduced ? undefined : { scale: 0.9 }}
                className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors bg-card"
              >
                <Icon className="w-3.5 h-3.5" />
              </motion.a>
            ))}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              whileHover={reduced ? undefined : { y: -3 }}
              whileTap={reduced ? undefined : { scale: 0.9 }}
              transition={T.spring}
              className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors bg-card"
            >
              <motion.span
                animate={reduced ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} {about?.name || 'Alex Rivera'}. All rights reserved.</span>
          <span>Built with React, Tailwind CSS, Shadcn UI &amp; Custom Node/Express CMS</span>
        </div>
      </div>
    </footer>
  );
}
