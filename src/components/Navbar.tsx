import { Link, useLocation } from 'react-router-dom'
import { Terminal, BookOpen, FlaskConical, Github } from 'lucide-react'

const NAV_ITEMS = [
  { path: '/', label: '首页', icon: Terminal },
  { path: '/gallery', label: '图鉴', icon: BookOpen },
  { path: '/test', label: '测试', icon: FlaskConical },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-mono text-xl font-bold text-neon-green neon-text-green group-hover:opacity-80 transition-opacity">
              APTI
            </span>
            <span className="text-xs text-slate-500 hidden sm:block">Agent Personality Type Indicator</span>
          </Link>

          <div className="flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-neon-green/10 text-neon-green'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
            <a
              href="https://github.com/WanfengzzZ/apti"
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
