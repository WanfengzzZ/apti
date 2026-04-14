import { Personality, RARIRY_CONFIG } from '../data/personalities'

interface Props {
  personality: Personality
  compact?: boolean
  onClick?: () => void
}

export default function PersonalityCard({ personality, compact, onClick }: Props) {
  const rarityConfig = RARIRY_CONFIG[personality.rarity]

  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl bg-bg-card border border-border-dim card-hover overflow-hidden ${
        onClick ? 'cursor-pointer' : ''
      } ${compact ? 'p-4' : 'p-6'}`}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, ${personality.color}, transparent)` }}
      />

      {/* Rarity badge */}
      <div
        className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
        style={{ color: rarityConfig.color, background: rarityConfig.bg }}
      >
        {rarityConfig.label}
      </div>

      {/* Code */}
      <div
        className={`font-mono font-bold ${compact ? 'text-2xl' : 'text-3xl'} mb-1`}
        style={{ color: personality.color }}
      >
        {personality.code}
      </div>

      {/* Name */}
      <h3 className={`font-bold text-slate-100 ${compact ? 'text-sm' : 'text-lg'} mb-1`}>
        {personality.name}
      </h3>

      {/* Tagline */}
      <p className={`text-slate-500 ${compact ? 'text-xs' : 'text-sm'} italic`}>
        "{personality.tagline}"
      </p>

      {!compact && (
        <p className="text-slate-400 text-sm mt-3 line-clamp-3 leading-relaxed">
          {personality.description}
        </p>
      )}
    </div>
  )
}
