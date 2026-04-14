import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MatchResult } from '../engine/matcher'
import { DIMENSIONS, MODEL_INFO, Model } from '../data/dimensions'
import { RARIRY_CONFIG } from '../data/personalities'
import DimensionRadarChart from '../components/RadarChart'
import Footer from '../components/Footer'
import { RotateCcw, Copy, Check } from 'lucide-react'

export default function ResultPage() {
  const navigate = useNavigate()
  const [result, setResult] = useState<MatchResult | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('apti-result')
    if (stored) {
      setResult(JSON.parse(stored))
    } else {
      navigate('/test')
    }
  }, [navigate])

  if (!result) return null

  const { personality, confidence, scores } = result
  const rarityConfig = RARIRY_CONFIG[personality.rarity]

  const models: Model[] = ['autonomy', 'cognition', 'interaction', 'execution', 'adaptation']

  const copyResult = () => {
    const text = `🎭 我的 Agent 人格是 ${personality.code}（${personality.name}）！\n"${personality.tagline}"\n匹配度：${confidence}%\n\n来测测你的 Agent → APTI`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Result Card */}
        <div
          className="relative rounded-2xl p-8 sm:p-12 text-center overflow-hidden mb-8 animate-slide-up"
          style={{ background: `linear-gradient(135deg, ${personality.color}15, ${personality.color}05)` }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: `linear-gradient(90deg, ${personality.color}, transparent)` }}
          />

          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
            style={{ color: rarityConfig.color, background: rarityConfig.bg }}
          >
            {rarityConfig.label} · 匹配度 {confidence}%
          </div>

          <div
            className="font-mono text-6xl sm:text-8xl font-bold mb-2"
            style={{ color: personality.color }}
          >
            {personality.code}
          </div>

          <h1 className="text-3xl font-bold text-slate-100 mb-2">{personality.name}</h1>
          <p className="text-xl text-slate-400 italic mb-6">"{personality.tagline}"</p>
          <p className="text-slate-300 max-w-xl mx-auto leading-relaxed">{personality.description}</p>
        </div>

        {/* Radar Chart */}
        <div className="bg-bg-card border border-border-dim rounded-2xl p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-xl font-bold text-center mb-4">15 维度评分</h2>
          <DimensionRadarChart scores={scores} />
        </div>

        {/* Dimension Details */}
        <div className="space-y-4 mb-8" style={{ animationDelay: '0.2s' }}>
          {models.map(model => {
            const info = MODEL_INFO[model]
            const dims = DIMENSIONS.filter(d => d.model === model)
            return (
              <div key={model} className="bg-bg-card border border-border-dim rounded-xl p-5 animate-slide-up">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span>{info.emoji}</span>
                  <span style={{ color: info.color }}>{info.name}</span>
                </h3>
                <div className="space-y-3">
                  {dims.map(dim => {
                    const val = scores[dim.code] ?? 50
                    return (
                      <div key={dim.code} className="flex items-center gap-3">
                        <span className="font-mono text-xs text-slate-500 w-8">{dim.code}</span>
                        <span className="text-sm text-slate-400 w-24 shrink-0">{dim.name}</span>
                        <div className="flex-1 h-2 bg-bg-deep rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${val}%`,
                              background: `linear-gradient(90deg, ${info.color}80, ${info.color})`,
                            }}
                          />
                        </div>
                        <span className="font-mono text-xs w-8 text-right" style={{ color: info.color }}>
                          {val}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={copyResult}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border-dim text-slate-300 hover:bg-white/5 transition-all"
          >
            {copied ? <Check size={18} className="text-neon-green" /> : <Copy size={18} />}
            {copied ? '已复制' : '复制结果'}
          </button>
          <Link
            to="/test"
            onClick={() => sessionStorage.removeItem('apti-result')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border-dim text-slate-300 hover:bg-white/5 transition-all"
          >
            <RotateCcw size={18} />
            重新测试
          </Link>
          <Link
            to="/gallery"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green/80 to-neon-cyan/80 text-bg-deep font-bold hover:shadow-lg hover:shadow-neon-green/20 transition-all"
          >
            查看全部人格 →
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
