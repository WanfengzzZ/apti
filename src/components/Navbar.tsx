import { useState, useEffect } from 'react'
import { Github, Terminal, BookOpen, FlaskConical } from 'lucide-react'

const GITHUB_URL = 'https://github.com/WanfengzzZ/apti'

const NAV_ITEMS = [
  { id: 'hero', label: '首页', icon: Terminal },
  { id: 'gallery', label: '图鉴', icon: BookOpen },
  { id: 'test', label: '测试', icon: FlaskConical },
]

export default function Navbar() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: [0, 0.25, 0.5] }
    )
    NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 group">
            <span className="font-mono text-xl font-bold text-neon-green neon-text-green group-hover:opacity-80 transition-opacity">
              APTI
            </span>
            <span className="text-xs text-slate-500 hidden sm:block">Agent Personality Type Indicator</span>
          </button>

          <div className="flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon
              const isActive = active === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-neon-green/10 text-neon-green'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              )
            })}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all"
            >
              <Github size={16} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
