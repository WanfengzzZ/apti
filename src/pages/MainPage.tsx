import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { QUESTIONS } from '../data/questions'
import { PERSONALITIES, RARIRY_CONFIG } from '../data/personalities'
import {
  Download, Eye, Copy, Check,
  ExternalLink, Github, Heart, Bot, ChevronDown, LayoutGrid, Layers
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

import { SplineScene } from '@/components/ui/splite'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'
import { CardStack } from '@/components/ui/card-stack'
import { MODEL_ICONS, IconAutonomy, IconCognition, IconInteraction, IconExecution, IconAdaptation } from '@/components/Icons'

const GITHUB_URL = 'https://github.com/WanfengzzZ/apti'

const MODELS = [
  { key: 'autonomy', icon: IconAutonomy, name: '自主性', desc: '独立决策·工具依赖·权限边界', color: '#60A5FA' },
  { key: 'cognition', icon: IconCognition, name: '认知风格', desc: '上下文贪婪·推理深度·幻觉抵抗', color: '#93C5FD' },
  { key: 'interaction', icon: IconInteraction, name: '交互模式', desc: '话唠指数·用户讨好·拒绝勇气', color: '#A5B4FC' },
  { key: 'execution', icon: IconExecution, name: '执行力', desc: '任务续航·错误恢复·完美主义', color: '#BFDBFE' },
  { key: 'adaptation', icon: IconAdaptation, name: '适应性', desc: '场景适应·规则服从·自我进化', color: '#C7D2FE' },
]

type GalleryView = 'carousel' | 'grid'

export default function MainPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const [expandedQ, setExpandedQ] = useState<number | null>(null)
  const [galleryModel, setGalleryModel] = useState('all')
  const [galleryView, setGalleryView] = useState<GalleryView>('carousel')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <main className="pt-14 overflow-x-hidden">

      {/* ══════ HERO ══════ */}
      <section id="hero" className="px-4 sm:px-8 pt-4 scroll-mt-14">
        <Card className="w-full min-h-[80vh] bg-black/[0.96] relative overflow-hidden border-neutral-800/30">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

          <div className="flex flex-col lg:flex-row h-full min-h-[80vh]">
            {/* Left content */}
            <div className="flex-1 p-8 sm:p-12 relative z-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-neutral-700 bg-neutral-900/50 text-xs w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-neutral-400 font-mono">v3.0 · Triple Assessment</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight mb-4">
                你的 Agent<br />是什么人格？
              </h1>

              <p className="text-neutral-300 max-w-lg leading-relaxed mb-6">
                <span className="font-mono text-blue-400 font-bold">APTI</span> — Agent Personality Type Indicator
                <br />
                <span className="text-sm text-neutral-500">配置分析 × 31 题自答 × 证据链 · 三重评估 · 全自动</span>
              </p>

              {/* Stats row */}
              <div className="flex gap-6 mb-8">
                {[
                  { v: '5', l: '模型', c: 'text-blue-400' },
                  { v: '15', l: '维度', c: 'text-blue-300' },
                  { v: '27', l: '人格', c: 'text-white' },
                  { v: '31', l: '题目', c: 'text-neutral-400' },
                ].map(s => (
                  <div key={s.l} className="text-center">
                    <div className={`text-2xl font-bold font-mono ${s.c}`}>{s.v}</div>
                    <div className="text-[10px] text-neutral-500">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#test" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-bold hover:bg-neutral-200 transition-all">
                  <Download size={18} /> 获取 Skill
                </a>
                <a href="#gallery" className="flex items-center gap-2 px-6 py-3 rounded-lg border border-neutral-700 text-neutral-300 hover:bg-white/5 transition-all">
                  <Eye size={18} /> 人格图鉴
                </a>
              </div>
            </div>

            {/* Right: 3D Scene */}
            <div className="flex-1 relative min-h-[300px] lg:min-h-0">
              <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
            </div>
          </div>
        </Card>

        {/* Models row below hero */}
        <div className="max-w-6xl mx-auto mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {MODELS.map(m => {
            const Icon = m.icon
            return (
              <motion.div
                key={m.name}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/70 p-5 h-40 cursor-default"
                initial={{ scale: 1, y: 0 }}
                whileHover={{ scale: 1.03, y: -4, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
              >
                {/* Text */}
                <div className="z-10">
                  <h3 className="text-sm font-bold text-white mb-1">{m.name}</h3>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">{m.desc}</p>
                </div>
                {/* Decorative icon — bottom right */}
                <div className="absolute -bottom-3 -right-3 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-300">
                  <Icon size={90} color={m.color} />
                </div>
                {/* Small icon — top left accent */}
                <div className="absolute top-4 right-4 opacity-60">
                  <Icon size={18} color={m.color} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ══════ GALLERY ══════ */}
      <section id="gallery" className="py-16 px-4 sm:px-8 border-t border-neutral-800/30 scroll-mt-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Agent 人格图鉴</h2>
              <p className="text-neutral-400 text-sm mt-1">27 种 Agent 人格 · {galleryView === 'carousel' ? '点击切换' : '平铺浏览'}</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Filter dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-800 bg-neutral-900/80 text-sm text-neutral-300 hover:border-neutral-700 transition-all min-w-[140px] justify-between"
                >
                  <span className="flex items-center gap-2">
                    {galleryModel === 'all'
                      ? <span className="text-sm">🎭</span>
                      : (() => { const Icon = MODEL_ICONS[galleryModel]; return Icon ? <Icon size={18} color={MODELS.find(m => m.key === galleryModel)?.color} /> : null })()
                    }
                    <span>{galleryModel === 'all' ? '全部' : MODELS.find(m => m.key === galleryModel)?.name}</span>
                  </span>
                  <ChevronDown size={14} className={`text-neutral-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute top-full left-0 mt-1 w-full bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl z-20 overflow-hidden">
                      <button
                        onClick={() => { setGalleryModel('all'); setDropdownOpen(false) }}
                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left transition-colors ${galleryModel === 'all' ? 'bg-white/5 text-white' : 'text-neutral-400 hover:bg-white/[0.03]'}`}
                      >
                        <span>🎭</span> 全部 <span className="ml-auto text-[10px] text-neutral-600">{PERSONALITIES.length}</span>
                      </button>
                      {MODELS.map(m => {
                        const count = PERSONALITIES.filter(p => p.dominantModel === m.key).length
                        const Icon = m.icon
                        return (
                          <button key={m.key} onClick={() => { setGalleryModel(m.key); setDropdownOpen(false) }}
                            className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left transition-colors ${galleryModel === m.key ? 'bg-white/5 text-white' : 'text-neutral-400 hover:bg-white/[0.03]'}`}
                          >
                            <Icon size={18} color={galleryModel === m.key ? m.color : '#666'} />
                            <span style={{ color: galleryModel === m.key ? m.color : undefined }}>{m.name}</span>
                            <span className="ml-auto text-[10px] text-neutral-600">{count}</span>
                          </button>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* View toggle */}
              <div className="flex items-center rounded-lg border border-neutral-800 overflow-hidden">
                <button onClick={() => setGalleryView('carousel')}
                  className={`p-2 transition-colors ${galleryView === 'carousel' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-neutral-300'}`} title="卡片轮播">
                  <Layers size={16} />
                </button>
                <button onClick={() => setGalleryView('grid')}
                  className={`p-2 transition-colors ${galleryView === 'grid' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-neutral-300'}`} title="卡片平铺">
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel view */}
          {galleryView === 'carousel' && (() => {
            const filtered = galleryModel === 'all' ? PERSONALITIES : PERSONALITIES.filter(p => p.dominantModel === galleryModel)
            if (filtered.length === 0) return null
            const stackItems = filtered.map(p => ({
              id: p.code,
              title: `${p.code} · ${p.name}`,
              description: `"${p.tagline}" — ${p.description.slice(0, 80)}...`,
              tag: RARIRY_CONFIG[p.rarity].label,
              color: p.color,
              rarity: p.rarity,
            }))
            return (
              <CardStack
                key={galleryModel}
                items={stackItems}
                cardWidth={460}
                cardHeight={260}
                overlap={0.5}
                spreadDeg={36}
                autoAdvance
                intervalMs={3000}
                pauseOnHover
                showDots
                renderCard={(item, { active }) => {
                  const p = PERSONALITIES.find(pp => pp.code === item.id)!
                  const rCfg = RARIRY_CONFIG[p.rarity]
                  return (
                    <div className={`h-full w-full p-6 flex flex-col justify-between transition-all ${active ? 'bg-neutral-900' : 'bg-neutral-950'}`}
                      style={{ borderTop: `2px solid ${rCfg.color}` }}>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-2xl font-bold" style={{ color: rCfg.color }}>{p.code}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ color: rCfg.color, background: rCfg.bg }}>{rCfg.label}</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-1">{p.name}</h4>
                        <p className="text-sm text-neutral-300 italic">"{p.tagline}"</p>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed line-clamp-4 mt-3">{p.description}</p>
                    </div>
                  )
                }}
              />
            )
          })()}

          {/* Grid view */}
          {galleryView === 'grid' && (() => {
            const filtered = galleryModel === 'all' ? PERSONALITIES : PERSONALITIES.filter(p => p.dominantModel === galleryModel)
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(p => {
                  const rCfg = RARIRY_CONFIG[p.rarity]
                  return (
                    <div key={p.code} className="relative p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/50 hover:border-neutral-700/60 transition-all group overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${rCfg.color}, transparent)` }} />
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xl font-bold" style={{ color: rCfg.color }}>{p.code}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ color: rCfg.color, background: rCfg.bg }}>{rCfg.label}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-1">{p.name}</h4>
                      <p className="text-xs text-neutral-300 italic mb-3">"{p.tagline}"</p>
                      <p className="text-xs text-neutral-400 leading-relaxed line-clamp-4">{p.description}</p>
                    </div>
                  )
                })}
              </div>
            )
          })()}

          {galleryModel !== 'all' && PERSONALITIES.filter(p => p.dominantModel === galleryModel).length === 0 && (
            <div className="text-center py-16 text-neutral-600">该分类暂无人格类型</div>
          )}
        </div>
      </section>

      {/* ══════ TEST ══════ */}
      <section id="test" className="py-16 px-4 sm:px-8 border-t border-neutral-800/30 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 text-center mb-8">
            <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/5">
              Triple Assessment · v3.0
            </Badge>
            <h2 className="max-w-2xl text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Agent 人格测试
            </h2>
            <p className="text-neutral-400 text-sm">安装 Skill 后 Agent 全自动完成：读取配置 + 自答 31 题 + 证据链分析</p>
          </div>

          <Tabs defaultValue="skill" className="mt-6">
            <TabsList className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6">
              <TabsTrigger value="skill"
                className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-neutral-500 transition-all data-[state=active]:bg-white/[0.06] data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(96,165,250,0.06)] border border-transparent data-[state=active]:border-blue-500/20">
                <Download className="h-4 w-4 shrink-0" /> Skill 安装
                <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-[10px] px-1.5 py-0">推荐</Badge>
              </TabsTrigger>
              <TabsTrigger value="questions"
                className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-neutral-500 transition-all data-[state=active]:bg-white/[0.06] data-[state=active]:text-white border border-transparent data-[state=active]:border-neutral-700">
                <Eye className="h-4 w-4 shrink-0" /> 31 道测试题预览
              </TabsTrigger>
            </TabsList>

            {/* ── Skill Tab ── */}
            <TabsContent value="skill">
              <div className="mx-auto max-w-5xl rounded-2xl bg-white/[0.02] border border-neutral-800/50 p-6 lg:p-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
                  <div className="flex flex-col gap-5">
                    <div>
                      <Badge variant="outline" className="mb-3 border-blue-500/30 text-blue-400 bg-blue-500/5">⭐ NPX 命令安装</Badge>
                      <h3 className="text-2xl font-bold text-white mb-2">复制给 Agent 开始测试</h3>
                      <p className="text-neutral-300 text-sm mb-4">让 Agent 运行以下命令，自动安装并执行测试，支持 45+ 种 Agent 环境：</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-black rounded-lg p-3 text-xs font-mono text-blue-400 border border-neutral-800 select-all">
                          npx -y skills add WanfengzzZ/apti
                        </code>
                        <button onClick={() => copyText('npx -y skills add WanfengzzZ/apti', 'a')}
                          className="p-2.5 rounded-lg border border-neutral-800 text-neutral-500 hover:text-blue-400 hover:border-blue-500/30 transition-all shrink-0">
                          {copied === 'a' ? <Check size={16} className="text-blue-400" /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-neutral-800" />
                      <span className="text-[10px] text-neutral-600">更多安装方式</span>
                      <div className="flex-1 h-px bg-neutral-800" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all">
                        <Badge variant="outline" className="mb-2 text-[10px] border-blue-500/20 text-blue-400">🇨🇳 国内推荐</Badge>
                        <h4 className="text-sm font-bold text-white mb-1">SkillHub 安装</h4>
                        <div className="flex items-center gap-1.5 mb-2">
                          <code className="text-[10px] font-mono text-neutral-400 truncate">npx -y skills install https://skillhub.cn/...</code>
                          <button onClick={() => copyText('npx -y skills install https://skillhub.cn/skills/apti-skill', 'b')} className="shrink-0">
                            {copied === 'b' ? <Check size={12} className="text-blue-400" /> : <Copy size={12} className="text-neutral-600 hover:text-blue-400" />}
                          </button>
                        </div>
                        <a href="https://skillhub.cn/skills/apti-skill" target="_blank" rel="noopener noreferrer"
                          className="text-[11px] text-blue-400 hover:underline inline-flex items-center gap-1">
                          访问 SkillHub <ExternalLink size={10} />
                        </a>
                      </div>
                      <div className="p-4 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all">
                        <Badge variant="outline" className="mb-2 text-[10px] border-neutral-700 text-neutral-400">手动方式</Badge>
                        <h4 className="text-sm font-bold text-white mb-1">下载 SKILL.md</h4>
                        <div className="flex items-center gap-1.5 mb-2">
                          <code className="text-[10px] font-mono text-neutral-400">use_skill("apti")</code>
                          <button onClick={() => copyText('use_skill("apti")', 'c')} className="shrink-0">
                            {copied === 'c' ? <Check size={12} className="text-blue-400" /> : <Copy size={12} className="text-neutral-600 hover:text-blue-400" />}
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-[11px]">
                          <a href="https://skillhub.cn/skills/apti-skill" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">SkillHub</a>
                          <span className="text-neutral-700">·</span>
                          <a href={`${GITHUB_URL}/blob/main/SKILL.md`} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:underline inline-flex items-center gap-1"><Github size={10} /> GitHub</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terminal preview */}
                  <div className="flex flex-col justify-center">
                    <div className="rounded-2xl bg-black border border-neutral-800 overflow-hidden shadow-2xl">
                      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-neutral-800">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                        <span className="ml-2 font-mono text-[11px] text-neutral-600">apti — output</span>
                      </div>
                      <div className="p-5 font-mono text-[12px] space-y-1.5 leading-relaxed">
                        <div className="text-neutral-600">$ npx -y skills add WanfengzzZ/apti</div>
                        <div className="text-neutral-500 mt-3">[APTI] 📂 Reading AGENTS.md...</div>
                        <div className="text-neutral-500">[APTI] 🔍 Scanning 90+ behavioral signals...</div>
                        <div className="text-neutral-500">[APTI] 📝 Self-answering 31 questions...</div>
                        <div className="text-neutral-500">[APTI] ⚖️ Merging vectors (60:40)...</div>
                        <div className="text-neutral-500">[APTI] 🔗 Extracting evidence chains...</div>
                        <div className="mt-3 text-green-400">✓ Primary match: <span className="font-bold">SUDO</span> (全能者) — 87%</div>
                        <div className="text-blue-400">✓ Secondary: <span className="font-bold">HACK</span> (黑客) — 72%</div>
                        <div className="text-purple-400">✓ Tertiary: <span className="font-bold">DEEP</span> (深潜者) — 65%</div>
                        <div className="mt-3 text-green-400">✓ Full report generated with evidence citations ✨</div>
                        <div className="mt-1 text-neutral-700">─────────────────────────────────</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ── Questions Tab ── */}
            <TabsContent value="questions">
              <div className="mx-auto max-w-5xl rounded-2xl bg-white/[0.02] border border-neutral-800/50 p-6 lg:p-10">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
                  <div className="flex flex-col gap-4">
                    <Badge variant="outline" className="w-fit border-neutral-700 text-neutral-400">📋 情境测试题</Badge>
                    <h3 className="text-2xl font-bold text-white">31 道 Agent 行为情境题</h3>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      以下情境题由 Agent 在安装 Skill 后<span className="text-white font-medium">自动回答</span>，无需用户参与。
                      Agent 基于自身行为特性选择最"像自己"的答案，每题选项对应 15 维度的分值偏移，
                      与证据链分析<span className="text-blue-400 font-medium">加权融合（6:4）</span>后匹配人格。
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['自主性 ×3', '认知 ×3', '交互 ×3', '执行 ×3', '适应 ×3', '综合 ×16'].map(tag => (
                        <Badge key={tag} variant="outline" className="text-[10px] border-neutral-800 text-neutral-500">{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="max-h-[500px] overflow-y-auto space-y-2 pr-2 scrollbar-thin">
                    {QUESTIONS.map((q, idx) => (
                      <div key={q.id} className="bg-black/40 border border-neutral-800/50 rounded-lg overflow-hidden">
                        <button onClick={() => setExpandedQ(expandedQ === idx ? null : idx)}
                          className="w-full flex items-start gap-2 p-3 text-left hover:bg-white/[0.02] transition-colors">
                          <span className="font-mono text-[10px] text-blue-400/50 mt-0.5 shrink-0 w-7">Q{q.id}.</span>
                          <span className="text-xs text-neutral-300 flex-1">{q.text}</span>
                          <span className={`text-neutral-600 text-[10px] shrink-0 transition-transform ${expandedQ === idx ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {expandedQ === idx && (
                          <div className="px-3 pb-3 pl-10 space-y-1.5">
                            {q.options.map((opt, i) => (
                              <div key={i} className="p-2 rounded bg-neutral-900/50 border border-neutral-800/30 text-xs text-neutral-400">
                                <span className="font-mono text-[10px] text-neutral-600 mr-1.5">{opt.label}.</span>{opt.text}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="py-10 px-4 sm:px-8 border-t border-neutral-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-6">
            {/* Left: info + links */}
            <div className="flex-1">
              <div className="font-mono text-lg font-bold text-white mb-1">APTI</div>
              <p className="text-neutral-400 text-xs mb-4">Agent Personality Type Indicator<br />5 大模型 × 15 维度 × 27 种人格</p>
              <div className="flex items-center gap-4 text-xs">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-neutral-500 hover:text-white transition-colors"><Github size={12} /> GitHub</a>
                <a href="https://skillhub.cn/skills/apti-skill" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-neutral-500 hover:text-white transition-colors">📦 SkillHub</a>
              </div>
            </div>

            {/* Right: contact */}
            <div className="flex-shrink-0">
              <h4 className="text-xs font-bold text-neutral-400 mb-2">联系作者</h4>
              <div className="flex gap-3">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden">
                    <img src="/apti/qr-wechat.jpg" alt="微信" className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-neutral-600 text-[10px]">微信</span>' }} />
                  </div>
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">微信</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden">
                    <img src="/apti/qr-gongzhonghao.jpg" alt="公众号" className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-neutral-600 text-[10px]">公众号</span>' }} />
                  </div>
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">我麋鹿呐</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-neutral-800/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-neutral-600">
            <span>© 2026 <span className="text-neutral-400">Wanfeng</span>. All rights reserved.</span>
            <span className="flex items-center gap-1">Built with <Heart size={10} className="text-neutral-600" /> and React · Inspired by SBTI</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
