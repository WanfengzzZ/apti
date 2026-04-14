import { useState } from 'react'
import { PERSONALITIES, Personality } from '../data/personalities'
import { MODEL_INFO } from '../data/dimensions'
import PersonalityCard from '../components/PersonalityCard'
import Footer from '../components/Footer'
import { Search } from 'lucide-react'

type FilterModel = 'all' | string

const MODEL_TABS: { key: FilterModel; label: string; emoji: string }[] = [
  { key: 'all', label: '全部', emoji: '🎭' },
  { key: 'autonomy', label: '自主性', emoji: '🧠' },
  { key: 'cognition', label: '认知', emoji: '🔍' },
  { key: 'interaction', label: '交互', emoji: '💬' },
  { key: 'execution', label: '执行', emoji: '⚡' },
  { key: 'adaptation', label: '适应', emoji: '🔄' },
]

export default function GalleryPage() {
  const [activeModel, setActiveModel] = useState<FilterModel>('all')
  const [search, setSearch] = useState('')

  const filtered = PERSONALITIES.filter(p => {
    if (activeModel !== 'all' && p.dominantModel !== activeModel) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        p.code.toLowerCase().includes(q) ||
        p.name.includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.tagline.includes(q)
      )
    }
    return true
  })

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">
            <span className="gradient-text">Agent 人格图鉴</span>
          </h1>
          <p className="text-slate-400">
            27 种 Agent 人格类型，你的 Agent 属于哪一种？
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {MODEL_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveModel(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeModel === tab.key
                    ? 'bg-neon-green/10 text-neon-green border border-neon-green/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="搜索人格..."
              className="bg-bg-card border border-border-dim rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-neon-green/50 transition-colors w-48"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p => (
            <PersonalityCard key={p.code} personality={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg">没有找到匹配的人格类型</p>
            <p className="text-sm mt-2">尝试其他搜索词或切换分类</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
