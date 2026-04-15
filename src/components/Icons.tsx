import React from 'react'

interface IconProps {
  size?: number
  className?: string
  color?: string
}

/** APTI Logo — 拟态六边形 + 神经网络 */
export function AptiLogo({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <defs>
        <linearGradient id="apti-g" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FF88" />
          <stop offset="0.5" stopColor="#00D4FF" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
        <filter id="apti-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="apti-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#1a1a2e" />
          <stop offset="1" stopColor="#0a0a0a" />
        </radialGradient>
      </defs>
      {/* Background plate */}
      <path d="M20 3L35.32 11.5V28.5L20 37L4.68 28.5V11.5L20 3Z" fill="url(#apti-bg)" stroke="url(#apti-g)" strokeWidth="1.2" />
      {/* Inner circuit — central node */}
      <g filter="url(#apti-glow)">
        <circle cx="20" cy="18" r="4.5" stroke="url(#apti-g)" strokeWidth="1" fill="none" />
        {/* Neural paths */}
        <line x1="20" y1="13.5" x2="20" y2="8" stroke="#00FF88" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="15.5" y1="18" x2="10" y2="15" stroke="#00D4FF" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="24.5" y1="18" x2="30" y2="15" stroke="#A855F7" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="17" y1="21.5" x2="13" y2="27" stroke="#F59E0B" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="23" y1="21.5" x2="27" y2="27" stroke="#EC4899" strokeWidth="0.8" strokeLinecap="round" />
      </g>
      {/* Endpoint nodes */}
      <circle cx="20" cy="8" r="1.5" fill="#00FF88" />
      <circle cx="10" cy="15" r="1.3" fill="#00D4FF" />
      <circle cx="30" cy="15" r="1.3" fill="#A855F7" />
      <circle cx="13" cy="27" r="1.3" fill="#F59E0B" />
      <circle cx="27" cy="27" r="1.3" fill="#EC4899" />
      {/* Center core */}
      <circle cx="20" cy="18" r="2" fill="url(#apti-g)" opacity="0.9" />
    </svg>
  )
}

/** 🧠 自主性 — 拟态大脑+光环 */
export function IconAutonomy({ size = 20, className, color = '#00FF88' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <radialGradient id="auto-bg" cx="50%" cy="40%" r="55%">
          <stop offset="0" stopColor={color} stopOpacity="0.12" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        <filter id="auto-glow"><feGaussianBlur stdDeviation="0.8" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#auto-bg)" />
      <g filter="url(#auto-glow)">
        {/* Brain shape */}
        <path d="M12 5C9.5 5 7.5 6.5 7 8.5C6.2 8.8 5.5 9.8 5.5 11C5.5 12.5 6.5 13.5 7.5 13.8C7.8 15.5 9.5 17 12 17C14.5 17 16.2 15.5 16.5 13.8C17.5 13.5 18.5 12.5 18.5 11C18.5 9.8 17.8 8.8 17 8.5C16.5 6.5 14.5 5 12 5Z"
          stroke={color} strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        {/* Center split */}
        <path d="M12 6V16" stroke={color} strokeWidth="0.6" strokeDasharray="1.5 1" opacity="0.5" />
        {/* Signal waves */}
        <path d="M12 2.5V4" stroke={color} strokeWidth="1" strokeLinecap="round" />
        <path d="M8 3.5L9 4.8" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
        <path d="M16 3.5L15 4.8" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      </g>
      {/* Pulse dot */}
      <circle cx="12" cy="11" r="1.5" fill={color} opacity="0.8" />
      {/* Base */}
      <path d="M9 18.5H15" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <path d="M10 20H14" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
}

/** 🔍 认知风格 — 拟态眼睛+扫描线 */
export function IconCognition({ size = 20, className, color = '#00D4FF' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <radialGradient id="cog-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={color} stopOpacity="0.12" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        <filter id="cog-glow"><feGaussianBlur stdDeviation="0.8" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#cog-bg)" />
      <g filter="url(#cog-glow)">
        {/* Eye shape */}
        <path d="M3 12C3 12 7 6 12 6C17 6 21 12 21 12C21 12 17 18 12 18C7 18 3 12 3 12Z"
          stroke={color} strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        {/* Iris */}
        <circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="1" fill="none" />
        {/* Pupil */}
        <circle cx="12" cy="12" r="1.5" fill={color} opacity="0.85" />
        {/* Scan lines */}
        <line x1="12" y1="3" x2="12" y2="6" stroke={color} strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
        <line x1="12" y1="18" x2="12" y2="21" stroke={color} strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
        <line x1="3" y1="12" x2="5.5" y2="12" stroke={color} strokeWidth="0.7" strokeLinecap="round" opacity="0.3" />
        <line x1="18.5" y1="12" x2="21" y2="12" stroke={color} strokeWidth="0.7" strokeLinecap="round" opacity="0.3" />
      </g>
      {/* Corner brackets — scan frame */}
      <path d="M5 8V5H8" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
      <path d="M19 8V5H16" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
      <path d="M5 16V19H8" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
      <path d="M19 16V19H16" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
}

/** 💬 交互模式 — 拟态信号波 */
export function IconInteraction({ size = 20, className, color = '#A855F7' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <radialGradient id="int-bg" cx="50%" cy="50%" r="55%">
          <stop offset="0" stopColor={color} stopOpacity="0.12" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        <filter id="int-glow"><feGaussianBlur stdDeviation="0.8" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#int-bg)" />
      <g filter="url(#int-glow)">
        {/* Central node */}
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.2" fill="none" />
        <circle cx="12" cy="12" r="1.2" fill={color} opacity="0.85" />
        {/* Signal arcs */}
        <path d="M7.5 7.5C9 6 10.5 5.5 12 5.5" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M5 5C7.5 3 9.5 2.5 12 2.5" stroke={color} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />
        <path d="M16.5 16.5C15 18 13.5 18.5 12 18.5" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M19 19C16.5 21 14.5 21.5 12 21.5" stroke={color} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />
        {/* Cross links */}
        <line x1="15" y1="9" x2="18" y2="6" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
        <line x1="9" y1="15" x2="6" y2="18" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
      </g>
      {/* Endpoint dots */}
      <circle cx="5" cy="5" r="1" fill={color} opacity="0.5" />
      <circle cx="19" cy="19" r="1" fill={color} opacity="0.5" />
      <circle cx="18" cy="6" r="0.8" fill={color} opacity="0.4" />
      <circle cx="6" cy="18" r="0.8" fill={color} opacity="0.4" />
    </svg>
  )
}

/** ⚡ 执行力 — 拟态闪电+齿轮 */
export function IconExecution({ size = 20, className, color = '#F59E0B' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <radialGradient id="exe-bg" cx="50%" cy="45%" r="55%">
          <stop offset="0" stopColor={color} stopOpacity="0.12" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        <filter id="exe-glow"><feGaussianBlur stdDeviation="0.8" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#exe-bg)" />
      <g filter="url(#exe-glow)">
        {/* Gear ring */}
        <circle cx="12" cy="12" r="7" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3" strokeDasharray="3 2" />
        {/* Lightning bolt */}
        <path d="M13.5 3L9 12H12L10.5 21L16 11H12.5L13.5 3Z"
          stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.15" strokeLinejoin="round" />
      </g>
      {/* Gear teeth */}
      <line x1="12" y1="4.5" x2="12" y2="3" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <line x1="12" y1="21" x2="12" y2="19.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <line x1="4.5" y1="12" x2="3" y2="12" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <line x1="21" y1="12" x2="19.5" y2="12" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      {/* Core glow */}
      <circle cx="12" cy="12" r="1.5" fill={color} opacity="0.7" />
    </svg>
  )
}

/** 🔄 适应性 — 拟态 DNA 螺旋 */
export function IconAdaptation({ size = 20, className, color = '#EC4899' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <radialGradient id="ada-bg" cx="50%" cy="50%" r="55%">
          <stop offset="0" stopColor={color} stopOpacity="0.12" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        <filter id="ada-glow"><feGaussianBlur stdDeviation="0.8" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#ada-bg)" />
      <g filter="url(#ada-glow)">
        {/* DNA helix strand 1 */}
        <path d="M8 3C8 3 16 7 16 12C16 17 8 21 8 21" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* DNA helix strand 2 */}
        <path d="M16 3C16 3 8 7 8 12C8 17 16 21 16 21" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
        {/* Cross bars */}
        <line x1="9.5" y1="6" x2="14.5" y2="6" stroke={color} strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
        <line x1="8.5" y1="9.5" x2="15.5" y2="9.5" stroke={color} strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
        <line x1="8" y1="12" x2="16" y2="12" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
        <line x1="8.5" y1="14.5" x2="15.5" y2="14.5" stroke={color} strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
        <line x1="9.5" y1="18" x2="14.5" y2="18" stroke={color} strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
      </g>
      {/* Mutation dots */}
      <circle cx="12" cy="12" r="1.5" fill={color} opacity="0.8" />
      <circle cx="10" cy="7.5" r="0.8" fill={color} opacity="0.5" />
      <circle cx="14" cy="16.5" r="0.8" fill={color} opacity="0.5" />
    </svg>
  )
}

/** Map model key to icon component */
export const MODEL_ICONS: Record<string, React.FC<IconProps>> = {
  autonomy: IconAutonomy,
  cognition: IconCognition,
  interaction: IconInteraction,
  execution: IconExecution,
  adaptation: IconAdaptation,
}
