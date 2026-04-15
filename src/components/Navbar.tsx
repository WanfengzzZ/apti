import { useState, useEffect } from 'react'
import { Github } from 'lucide-react'
import { AptiLogo } from './Icons'

const GITHUB_URL = 'https://github.com/WanfengzzZ/apti'

const NAV_ITEMS = [
  { id: 'hero', label: '首页' },
  { id: 'gallery', label: '图鉴' },
  { id: 'test', label: '测试' },
]

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
            <AptiLogo size={30} />
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
