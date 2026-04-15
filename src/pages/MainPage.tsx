import { useState } from 'react'
import { QUESTIONS } from '../data/questions'
import { PERSONALITIES, RARIRY_CONFIG } from '../data/personalities'
import {
  Zap, Brain, Target, Download, FileText, Eye, Copy, Check,
  ExternalLink, Github, Heart, Bot, ChevronDown, LayoutGrid, Layers
} from 'lucide-react'

import { SplineScene } from '@/components/ui/splite'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'
import { CardStack } from '@/components/ui/card-stack'

const GITHUB_URL = 'https://github.com/WanfengzzZ/apti'

const MODELS = [
  { key: 'autonomy', emoji: '🧠', name: '自主性', desc: '独立决策·工具依赖·权限边界', color: '#00FF88' },
  { key: 'cognition', emoji: '🔍', name: '认知风格', desc: '上下文贪婪·推理深度·幻觉抵抗', color: '#00D4FF' },
  { key: 'interaction', emoji: '💬', name: '交互模式', desc: '话唠指数·用户讨好·拒绝勇气', color: '#A855F7' },
  { key: 'execution', emoji: '⚡', name: '执行力', desc: '任务续航·错误恢复·完美主义', color: '#F59E0B' },
  { key: 'adaptation', emoji: '🔄', name: '适应性', desc: '场景适应·规则服从·自我进化', color: '#EC4899' },
]

type TestTab = 'skill' | 'questions'

type GalleryView = 'carousel' | 'grid'

export default function MainPage() {
  const [testTab, setTestTab] = useState<TestTab>('skill')
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
    <main className="pt-14">

      {/* ══════ HERO ══════ */}
      <section id="hero" className="px-4 sm:px-8 pt-4 scroll-mt-14">
        <Card className="w-full min-h-[80vh] bg-black/[0.96] relative overflow-hidden border-border-dim/30">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="flex flex-col lg:flex-row h-full min-h-[80vh]">
            {/* Left content */}
            <div className="flex-1 p-8 sm:p-12 relative z-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-neutral-700 bg-neutral-900/50 text-xs w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                <span className="text-neutral-400 font-mono">v3.0 · Triple Assessment</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight mb-4">
                你的 Agent<br />是什么人格？
              </h1>

              <p className="text-neutral-400 max-w-lg leading-relaxed mb-6">
                <span className="font-mono text-neon-green font-bold">APTI</span> — Agent Personality Type Indicator
                <br />
                <span className="text-sm text-neutral-500">配置分析 × 31 题自答 × 证据链 · 三重评估 · 全自动</span>
              </p>

              {/* Stats row */}
              <div className="flex gap-6 mb-8">
                {[
                  { v: '5', l: '模型', c: 'text-neon-green' },
                  { v: '15', l: '维度', c: 'text-neon-cyan' },
                  { v: '27', l: '人格', c: 'text-neon-purple' },
                  { v: '31', l: '题目', c: 'text-amber-400' },
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
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>

        {/* Models row below hero */}
        <div className="max-w-6xl mx-auto mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {MODELS.map(m => (
            <div key={m.name} className="flex items-center gap-2.5 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800/50">
              <span className="text-lg">{m.emoji}</span>
              <div>
                <div className="text-xs font-bold" style={{ color: m.color }}>{m.name}</div>
                <div className="text-[10px] text-neutral-500">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ GALLERY ══════ */}
      <section id="gallery" className="py-16 px-4 sm:px-8 border-t border-white/[0.04] scroll-mt-14">
        <div className="max-w-6xl mx-auto">
          {/* Header: title + controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Agent 人格图鉴</h2>
              <p className="text-neutral-500 text-sm mt-1">27 种 Agent 人格 · {galleryView === 'carousel' ? '拖拽或点击切换' : '平铺浏览'}</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Filter dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-800 bg-neutral-900/80 text-sm text-neutral-300 hover:border-neutral-700 transition-all min-w-[140px] justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span>{galleryModel === 'all' ? '🎭' : MODELS.find(m => m.key === galleryModel)?.emoji}</span>
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
                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left transition-colors ${
                          galleryModel === 'all' ? 'bg-white/5 text-white' : 'text-neutral-400 hover:bg-white/[0.03] hover:text-neutral-200'
                        }`}
                      >
                        <span>🎭</span> 全部 <span className="ml-auto text-[10px] text-neutral-600">{PERSONALITIES.length}</span>
                      </button>
                      {MODELS.map(m => {
                        const count = PERSONALITIES.filter(p => p.dominantModel === m.key).length
                        return (
                          <button
                            key={m.key}
                            onClick={() => { setGalleryModel(m.key); setDropdownOpen(false) }}
                            className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left transition-colors ${
                              galleryModel === m.key ? 'bg-white/5 text-white' : 'text-neutral-400 hover:bg-white/[0.03] hover:text-neutral-200'
                            }`}
                          >
                            <span>{m.emoji}</span>
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
                <button
                  onClick={() => setGalleryView('carousel')}
                  className={`p-2 transition-colors ${galleryView === 'carousel' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                  title="卡片轮播"
                >
                  <Layers size={16} />
                </button>
                <button
                  onClick={() => setGalleryView('grid')}
                  className={`p-2 transition-colors ${galleryView === 'grid' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                  title="卡片平铺"
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel view — single stack */}
          {galleryView === 'carousel' && (() => {
            const filtered = galleryModel === 'all'
              ? PERSONALITIES
              : PERSONALITIES.filter(p => p.dominantModel === galleryModel)
            if (filtered.length === 0) return null
            const stackItems = filtered.map(p => ({
              id: p.code,
              title: `${p.code} · ${p.name}`,
              description: `"${p.tagline}" — ${p.description.slice(0, 60)}...`,
              tag: RARIRY_CONFIG[p.rarity].label,
              color: p.color,
              rarity: p.rarity,
            }))
            return (
              <CardStack
                key={galleryModel}
                items={stackItems}
                cardWidth={460}
                cardHeight={240}
                overlap={0.5}
                spreadDeg={36}
                autoAdvance
                intervalMs={3000}
                pauseOnHover
                showDots
                renderCard={(item, { active }) => {
                  const p = PERSONALITIES.find(pp => pp.code === item.id)!
                  const rCfg = RARIRY_CONFIG[p.rarity]
                  const model = MODELS.find(m => m.key === p.dominantModel)
                  return (
                    <div className={`h-full w-full p-6 flex flex-col justify-between transition-all ${active ? 'bg-neutral-900' : 'bg-neutral-950'}`}
                      style={{ borderTop: `2px solid ${p.color}` }}>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-2xl font-bold" style={{ color: p.color }}>{p.code}</span>
                            {model && <span className="text-sm" title={model.name}>{model.emoji}</span>}
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ color: rCfg.color, background: rCfg.bg }}>{rCfg.label}</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-1">{p.name}</h4>
                        <p className="text-sm text-neutral-400 italic">"{p.tagline}"</p>
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3 mt-3">{p.description}</p>
                    </div>
                  )
                }}
              />
            )
          })()}

          {/* Grid view */}
          {galleryView === 'grid' && (() => {
            const filtered = galleryModel === 'all'
              ? PERSONALITIES
              : PERSONALITIES.filter(p => p.dominantModel === galleryModel)
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(p => {
                  const rCfg = RARIRY_CONFIG[p.rarity]
                  const model = MODELS.find(m => m.key === p.dominantModel)
                  return (
                    <div key={p.code} className="relative p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/50 hover:border-neutral-700/60 transition-all group overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xl font-bold" style={{ color: p.color }}>{p.code}</span>
                          {model && <span className="text-xs" title={model.name}>{model.emoji}</span>}
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ color: rCfg.color, background: rCfg.bg }}>{rCfg.label}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-1">{p.name}</h4>
                      <p className="text-xs text-neutral-400 italic mb-3">"{p.tagline}"</p>
                      <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">{p.description}</p>
                    </div>
                  )
                })}
              </div>
            )
          })()}

          {/* Empty state */}
          {galleryModel !== 'all' && PERSONALITIES.filter(p => p.dominantModel === galleryModel).length === 0 && (
            <div className="text-center py-16 text-neutral-600">该分类暂无人格类型</div>
          )}
        </div>
      </section>

      {/* ══════ TEST ══════ */}
      <section id="test" className="py-12 px-4 sm:px-8 border-t border-border-dim/20 scroll-mt-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-1"><span className="gradient-text">Agent 人格测试</span></h2>
          <p className="text-slate-500 text-sm mb-6">安装 Skill 后 Agent 全自动完成：读取配置 + 自答 31 题 + 证据链分析</p>

          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {([
              { key: 'skill' as TestTab, label: 'Skill 安装', icon: Download, badge: '⭐ 开始测试' },
              { key: 'questions' as TestTab, label: '31 道测试题预览', icon: Eye, badge: '' },
            ]).map(tab => {
              const Icon = tab.icon
              return (
                <button key={tab.key} onClick={() => setTestTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    testTab === tab.key ? 'bg-neon-green/10 text-neon-green border border-neon-green/30' : 'text-slate-500 border border-transparent hover:bg-white/5 hover:text-slate-300'
                  }`}>
                  <Icon size={14} /> {tab.label}
                  {tab.badge && <span className="text-[9px] font-bold text-neon-green bg-neon-green/10 px-1 py-0.5 rounded">{tab.badge}</span>}
                </button>
              )
            })}
          </div>

          {/* Skill Tab */}
          {testTab === 'skill' && (
            <div className="space-y-4 animate-slide-up">
              {/* 方式一：NPX 命令安装 */}
              <div className="relative p-5 rounded-xl bg-gradient-to-b from-neon-green/5 to-transparent border border-neon-green/20 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-green to-neon-cyan" />
                <div className="flex items-center gap-2 mb-2">
                  <Bot size={16} className="text-neon-green" />
                  <h3 className="font-bold text-sm text-neon-green">方式一：NPX 命令安装</h3>
                  <span className="text-[9px] font-bold text-neon-green bg-neon-green/10 px-1.5 py-0.5 rounded ml-1">⭐ 推荐</span>
                </div>
                <p className="text-slate-400 text-xs mb-3">让 Agent 运行以下命令自动安装，支持 45+ 种 Agent 环境：</p>
                <div className="flex items-center gap-2 mb-2">
                  <code className="flex-1 bg-bg-deep rounded-lg p-3 text-xs font-mono text-neon-green border border-border-dim/40 select-all">
                    npx -y skills add WanfengzzZ/apti
                  </code>
                  <button onClick={() => copyText('npx -y skills add WanfengzzZ/apti', 'a')}
                    className="p-2.5 rounded-lg border border-border-dim/40 text-slate-400 hover:text-neon-green hover:border-neon-green/30 transition-all shrink-0">
                    {copied === 'a' ? <Check size={16} className="text-neon-green" /> : <Copy size={16} />}
                  </button>
                </div>
                <p className="text-slate-600 text-[10px]">需要 Node.js 环境 · 支持 Claude Code / Cursor / Codex / Windsurf 等</p>
              </div>

              {/* 方式二：SkillHub 安装（国内推荐） */}
              <div className="relative p-5 rounded-xl bg-gradient-to-b from-neon-purple/5 to-transparent border border-neon-purple/20 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-cyan" />
                <div className="flex items-center gap-2 mb-2">
                  <Download size={16} className="text-neon-purple" />
                  <h3 className="font-bold text-sm text-neon-purple">方式二：SkillHub 安装</h3>
                  <span className="text-[9px] font-bold text-neon-purple bg-neon-purple/10 px-1.5 py-0.5 rounded ml-1">🇨🇳 国内推荐</span>
                </div>
                <p className="text-slate-400 text-xs mb-3">无需访问 GitHub，直接从 SkillHub 国内源安装：</p>
                <div className="flex items-center gap-2 mb-3">
                  <code className="flex-1 bg-bg-deep rounded-lg p-3 text-xs font-mono text-neon-purple border border-border-dim/40 select-all">
                    npx -y skills install https://skillhub.cn/skills/apti-skill
                  </code>
                  <button onClick={() => copyText('npx -y skills install https://skillhub.cn/skills/apti-skill', 'b')}
                    className="p-2.5 rounded-lg border border-border-dim/40 text-slate-400 hover:text-neon-purple hover:border-neon-purple/30 transition-all shrink-0">
                    {copied === 'b' ? <Check size={16} className="text-neon-purple" /> : <Copy size={16} />}
                  </button>
                </div>
                <a href="https://skillhub.cn/skills/apti-skill" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-neon-purple/80 to-neon-cyan/80 text-white font-bold text-sm hover:shadow-lg transition-all">
                  <Download size={14} /> 在 SkillHub 查看 <ExternalLink size={12} />
                </a>
              </div>

              {/* 方式三：手动下载 SKILL.md */}
              <div className="p-5 rounded-xl bg-bg-card/40 border border-border-dim/30">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} className="text-neon-cyan" />
                  <h3 className="font-bold text-sm">方式三：手动下载 SKILL.md</h3>
                </div>
                <p className="text-slate-400 text-xs mb-3">下载 SKILL.md 放入项目根目录，然后在 Agent 中调用：</p>
                <div className="flex items-center gap-2 mb-3">
                  <code className="flex-1 bg-bg-deep rounded-lg p-3 text-xs font-mono text-neon-cyan border border-border-dim/40">use_skill("apti")</code>
                  <button onClick={() => copyText('use_skill("apti")', 'c')}
                    className="p-2.5 rounded-lg border border-border-dim/40 text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all shrink-0">
                    {copied === 'c' ? <Check size={16} className="text-neon-cyan" /> : <Copy size={16} />}
                  </button>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <a href="https://skillhub.cn/skills/apti-skill" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-neon-purple hover:underline">
                    📦 从 SkillHub 下载 <ExternalLink size={10} />
                  </a>
                  <span className="text-slate-600">|</span>
                  <a href={`${GITHUB_URL}/blob/main/SKILL.md`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-neon-cyan hover:underline">
                    <Github size={12} /> 从 GitHub 下载 <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              {/* Terminal preview */}
              <div className="rounded-xl bg-bg-card/40 border border-border-dim/30 overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border-dim/30 bg-bg-deep/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  <span className="ml-1.5 font-mono text-[10px] text-slate-600">output preview</span>
                </div>
                <div className="p-4 font-mono text-[11px] space-y-0.5">
                  <div className="text-slate-600">[APTI] Reading AGENTS.md...</div>
                  <div className="text-slate-600">[APTI] Evaluating 15 dimensions (90+ signals)...</div>
                  <div className="text-slate-600">[APTI] Extracting evidence chains...</div>
                  <div className="text-neon-green">[APTI] ✓ Result: SUDO (全能者) — 87% match</div>
                  <div className="text-neon-green">[APTI] ✓ Report generated with evidence citations ✨</div>
                </div>
              </div>
            </div>
          )}

          {/* Questions Tab — 纯展示 */}
          {testTab === 'questions' && (
            <div className="animate-slide-up space-y-4">
              <div className="p-4 rounded-xl bg-bg-card/30 border border-border-dim/20">
                <p className="text-slate-400 text-xs leading-relaxed">
                  💡 以下 31 道情境题由 Agent 在安装 Skill 后<span className="text-neon-green font-medium">自动回答</span>，无需用户参与。
                  Agent 基于自身行为特性选择最"像自己"的答案，每题选项对应 15 维度的分值偏移，与证据链分析<span className="text-neon-cyan font-medium">加权融合（6:4）</span>后匹配人格。
                </p>
              </div>

              <div className="space-y-2">
                {QUESTIONS.map((q, idx) => (
                  <div key={q.id} className="bg-bg-card/30 border border-border-dim/20 rounded-lg overflow-hidden">
                    <button onClick={() => setExpandedQ(expandedQ === idx ? null : idx)}
                      className="w-full flex items-start gap-2 p-3 text-left hover:bg-white/[0.02] transition-colors">
                      <span className="font-mono text-[10px] text-neon-green/50 mt-0.5 shrink-0 w-7">Q{q.id}.</span>
                      <span className="text-xs text-slate-300 flex-1">{q.text}</span>
                      <span className={`text-slate-600 text-[10px] shrink-0 transition-transform ${expandedQ === idx ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {expandedQ === idx && (
                      <div className="px-3 pb-3 pl-10 space-y-1.5">
                        {q.options.map((opt, i) => (
                          <div key={i} className="p-2 rounded bg-bg-deep/50 border border-border-dim/20 text-xs text-slate-400">
                            <span className="font-mono text-[10px] text-slate-600 mr-1.5">{opt.label}.</span>{opt.text}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="py-10 px-4 sm:px-8 border-t border-border-dim/20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="font-mono text-lg font-bold text-neon-green neon-text-green mb-1">APTI</div>
              <p className="text-slate-600 text-xs">Agent Personality Type Indicator<br />5 大模型 × 15 维度 × 27 种人格</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 mb-2">链接</h4>
              <div className="space-y-1.5 text-xs">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-500 hover:text-neon-green transition-colors"><Github size={12} /> GitHub</a>
                <a href="https://skillhub.cn/skills/apti-skill" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-500 hover:text-neon-cyan transition-colors">📦 SkillHub</a>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 mb-2">联系作者</h4>
              <div className="flex gap-3">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-bg-card border border-border-dim/40 flex items-center justify-center overflow-hidden">
                    <img src="/apti/qr-wechat.jpg" alt="微信" className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-slate-600 text-[10px]">微信</span>' }} />
                  </div>
                  <span className="text-[10px] text-slate-600 mt-0.5 block">微信</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-bg-card border border-border-dim/40 flex items-center justify-center overflow-hidden">
                    <img src="/apti/qr-gongzhonghao.jpg" alt="公众号" className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-slate-600 text-[10px]">公众号</span>' }} />
                  </div>
                  <span className="text-[10px] text-slate-600 mt-0.5 block">我麋鹿呐</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-border-dim/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-600">
            <span>© 2026 <span className="text-slate-400">Wanfeng</span>. All rights reserved.</span>
            <span className="flex items-center gap-1">Built with <Heart size={10} className="text-red-500/50" /> and React · Inspired by SBTI</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
