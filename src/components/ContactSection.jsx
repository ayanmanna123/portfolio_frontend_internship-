import { useState } from 'react';
import { Send, Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import { api } from '@/lib/api/client';

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  stagger,
  fadeUp,
  slideInLeft,
  slideInRight,
  T,

  viewportOnce,} from '@/lib/motion';
import { SectionHeader } from './SectionHeader';


export function ContactSection({ about }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'ok' | 'err'
  const reduced = useReducedMotion();

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.sendMessage(form);
      setStatus('ok');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('err');
    }
  };

  const contactItems = [
    { icon: Mail,    label: 'EMAIL',    value: about?.email    || 'admin@portfolio.com', href: `mailto:${about?.email || 'admin@portfolio.com'}` },
    { icon: MapPin,  label: 'LOCATION', value: about?.location || 'San Francisco, CA',  href: null },
    { icon: Phone,   label: 'PHONE',    value: about?.phone    || '+1 (555) 019-2834',   href: null },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          icon={Mail}
          label="Get In Touch"
          title="Let&apos;s Build Something Great Together"
          lede="Have a project in mind, need custom CMS development, or looking to collaborate? Drop me a message!"
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: contact info */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[.18em]">
              Contact Information
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              I typically respond within 24 hours. Feel free to reach out directly via email or phone.
            </p>

            <div className="space-y-2">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <motion.div
                  key={label}
                  className="hud-card p-4 flex items-center gap-4"
                  whileHover={reduced ? undefined : { x: 5 }}
                  transition={T.spring}
                >
                  <div className="w-8 h-8 border border-cyan-400/20 bg-cyan-400/5 flex items-center justify-center text-cyan-400 shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-[.15em]">{label}</p>
                    {href ? (
                      <a href={href} className="text-xs text-foreground/80 hover:text-cyan-300 transition-colors font-mono">{value}</a>
                    ) : (
                      <p className="text-xs text-foreground/80 font-mono">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Availability callout */}
            <motion.div
              className="hud-card p-4 border-cyan-400/25 space-y-1"
              whileHover={reduced ? undefined : { scale: 1.015 }}
              transition={T.spring}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 signal-dot" />
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">Quick Turnaround</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Available for freelance contracts, full stack architecture consulting, and custom CMS builds.
              </p>
            </motion.div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-8">
            <div className="hud-card p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[.12em]">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="name" required value={form.name} onChange={handleChange}
                      placeholder="John Doe"
                      className="hud-input w-full"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[.12em]">
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="email" type="email" required value={form.email} onChange={handleChange}
                      placeholder="john@example.com"
                      className="hud-input w-full"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[.12em]">Subject</label>
                  <input
                    name="subject" value={form.subject} onChange={handleChange}
                    placeholder="Project Inquiry / Freelance Contract"
                    className="hud-input w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[.12em]">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message" required value={form.message} onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project, timeline, and goals..."
                    className="hud-input w-full resize-none"
                  />
                </div>

                <AnimatePresence>
                  {status === 'ok' && (
                    <motion.div
                      key="ok"
                      initial={reduced ? false : { opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, height: 0 }}
                      transition={T.spring}
                      className="p-3 border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-xs font-mono"
                    >
                      ✓ MESSAGE_SENT — I&apos;ll get back to you within 24 hours.
                    </motion.div>
                  )}
                  {status === 'err' && (
                    <motion.div
                      key="err"
                      initial={reduced ? false : { opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, height: 0 }}
                      transition={T.spring}
                      className="p-3 border border-red-400/30 bg-red-400/5 text-red-400 text-xs font-mono"
                    >
                      ✗ SEND_FAILED — please try again or email directly.
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={reduced ? undefined : { scale: 1.015 }}
                  whileTap={reduced ? undefined : { scale: 0.985 }}
                  transition={T.fast}
                  className="btn-hud-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Transmitting...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
