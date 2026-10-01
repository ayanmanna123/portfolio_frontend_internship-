import {
  motion,
  useReducedMotion,
  fadeUp,
  stagger,
  DrawLine,

  viewportOnce,} from '@/lib/motion';

/**
 * Standard animated section header — the HUD label chip, a headline
 * that reveals word-by-word, an optional lede, and a rule that draws
 * itself in beneath.
 */
export function SectionHeader({
  icon: Icon,
  label,
  title,
  lede,
  align = 'center',
  className = '',
}) {
  const centered = align === 'center';

  return (
    <div className={`${centered ? 'flex flex-col items-center text-center' : 'text-left'} space-y-4 mb-12 ${className}`}>
      {label && (
        <div>
          <span className="hud-label">
            {Icon && <Icon className="w-3 h-3" />}
            {label}
          </span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl font-black text-foreground uppercase tracking-[-0.055em]">
        {title}
      </h2>

      {lede && (
        <p className={`text-muted-foreground text-sm leading-relaxed ${centered ? 'max-w-2xl' : 'max-w-xl'}`}>
          {lede}
        </p>
      )}

      <div
        className={`mt-2 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent ${
          centered ? 'mx-auto' : 'origin-left'
        }`}
      />
    </div>
  );
}

export default SectionHeader;
