import { useState, useEffect } from 'react'
import { Github } from 'lucide-react'

const GITHUB_URL = 'https://github.com/WanfengzzZ/apti'

const NAV_ITEMS = [
  { id: 'hero', label: '首页' },
  { id: 'gallery', label: '图鉴' },
  { id: 'test', label: '测试' },
]

function AptiLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer hexagon ring */}
      <path
        d="M16 2L28.66 9V23L16 30L3.34 23V9L16 2Z"
        stroke="url(#logo-grad)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner brain/circuit pattern */}
      <circle cx="16" cy="14" r="4" stroke="url(#logo-grad)" strokeWidth="1.2" fill="none" />
      <path d="M12 14C12 14 14 11 16 11C18 11 20 14 20 14" stroke="url(#logo-grad)" strokeWidth="1" />
      <path d="M13 17L16 22L19 17" stroke="url(#logo-grad)" strokeWidth="1" strokeLinecap="round" />
      {/* Dots - neural nodes */}
      <circle cx="16" cy="11" r="1" fill="#00FF88" />
      <circle cx="12" cy="14" r="0.8" fill="#00D4FF" />
      <circle cx="20" cy="14" r="0.8" fill="#A855F7" />
      <circle cx="16" cy="22" r="1" fill="#00FF88" />
      <defs>
        <linearGradient id="logo-grad" x1="3" y1="2" x2="29" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FF88" />
          <stop offset="0.5" stopColor="#00D4FF" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Navbar() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      const offset = 80
      let current = 'hero'
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id)
        if (el) {
          const top = el.getBoundingClientRect().top
          if (top <= offset) current = item.id
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5 group">
            <AptiLogo />
            <span className="font-mono text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400 group-hover:from-neon-green group-hover:to-neon-cyan transition-all">
              APTI
            </span>
            <span className="text-[10px] text-neutral-600 hidden sm:block">Agent Personality Type Indicator</span>
          </button>

          <div className="flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              const isActive = active === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-white/[0.08]'
                      : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
            <div className="w-px h-4 bg-neutral-800 mx-1" />
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.04] transition-all"
            >
              <Github size={14} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
