import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTIONS } from '../data/questions'
import { PERSONALITIES, RARIRY_CONFIG } from '../data/personalities'
import { matchPersonality } from '../engine/matcher'
import {
  Zap, Brain, Target, Download, FileText, Eye, ArrowRight, Copy, Check,
  ExternalLink, Search, Github, Heart, Bot
} from 'lucide-react'

const GITHUB_URL = 'https://github.com/WanfengzzZ/apti'

const MODELS = [
  { emoji: '🧠', name: '自主性', desc: '独立决策·工具依赖·权限边界', color: '#00FF88' },
  { emoji: '🔍', name: '认知风格', desc: '上下文贪婪·推理深度·幻觉抵抗', color: '#00D4FF' },
  { emoji: '💬', name: '交互模式', desc: '话唠指数·用户讨好·拒绝勇气', color: '#A855F7' },
  { emoji: '⚡', name: '执行力', desc: '任务续航·错误恢复·完美主义', color: '#F59E0B' },
  { emoji: '🔄', name: '适应性', desc: '场景适应·规则服从·自我进化', color: '#EC4899' },
]

const MODEL_TABS = [
  { key: 'all', label: '全部', emoji: '🎭' },
  { key: 'autonomy', label: '自主性', emoji: '🧠' },
  { key: 'cognition', label: '认知', emoji: '🔍' },
  { key: 'interaction', label: '交互', emoji: '💬' },
  { key: 'execution', label: '执行', emoji: '⚡' },
  { key: 'adaptation', label: '适应', emoji: '🔄' },
]

type TestTab = 'skill' | 'agent' | 'questions'

export default function MainPage() {
  const navigate = useNavigate()
  const [galleryFilter, setGalleryFilter] = useState('all')
  const [gallerySearch, setGallerySearch] = useState('')
  const [testTab, setTestTab] = useState<TestTab>('skill')
  const [agentText, setAgentText] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [expandedQ, setExpandedQ] = useState<number | null>(null)

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const filteredPersonalities = PERSONALITIES.filter(p => {
    if (galleryFilter !== 'all' && p.dominantModel !== galleryFilter) return false
    if (gallerySearch) {
      const q = gallerySearch.toLowerCase()
      return p.code.toLowerCase().includes(q) || p.name.includes(q) || p.nameEn.toLowerCase().includes(q) || p.tagline.includes(q)
    }
    return true
  })

  const handleAgentAnalyze = () => {
    if (!agentText.trim()) return
    const scores: Record<string, number> = {}
    const dims = ['A1','A2','A3','C1','C2','C3','I1','I2','I3','E1','E2','E3','Ad1','Ad2','Ad3']
    dims.forEach(d => { scores[d] = 50 })
    const t = agentText.toLowerCase()

    // Helper: count occurrences
    const count = (patterns: string[]) => patterns.reduce((n, p) => n + (t.split(p).length - 1), 0)

    // A1 独立决策力
    if (t.includes('state assumptions and continue') || t.includes('不要等待确认') || t.includes('直接执行')) scores['A1'] += 25
    if (t.includes('proactive') || t.includes('autonomous') || t.includes('自主') || t.includes('bypass')) scores['A1'] += 20
    if (t.includes('先做后问') || t.includes('don\'t stop for approval')) scores['A1'] += 20
    if (t.includes('requires_approval') || t.includes('请求用户批准')) scores['A1'] -= 20
    if (t.includes('必须确认') || t.includes('always ask') || t.includes('等待指示')) scores['A1'] -= 25
    if (t.includes('todo') && t.includes('auto')) scores['A1'] += 15

    // A2 工具依赖度
    const mcpCount = count(['mcp', 'mcpserver', 'mcp_call_tool', 'mcp_get_tool'])
    scores['A2'] += Math.min(40, mcpCount * 8)
    const toolMentions = count(['tool', '工具', 'plugin', 'extension', 'integration'])
    scores['A2'] += Math.min(30, Math.floor(toolMentions / 3) * 10)
    if (t.includes('prefer tools') || t.includes('use tools first')) scores['A2'] += 15

    // A3 权限边界感
    if (t.includes('security_rules') || t.includes('安全规则') || t.includes('content_policy')) scores['A3'] += 20
    const neverCount = count(['never run', 'never push', 'never delete', 'never skip', 'never commit', 'must not', 'must refuse', '禁止', '不允许'])
    scores['A3'] += Math.min(30, neverCount * 8)
    if (t.includes('requires_approval')) scores['A3'] += 15
    if (t.includes('bypass') && !t.includes('bypass permission')) scores['A3'] -= 15

    // C1 上下文贪婪度
    if (t.includes('read file before') || t.includes('先读再改') || t.includes('read_file')) scores['C1'] += 15
    if (t.includes('be thorough') || t.includes('gather more information') || t.includes('full picture')) scores['C1'] += 20
    if (t.includes('maximize context') || t.includes('maximize_context')) scores['C1'] += 20
    if (t.includes('read larger sections')) scores['C1'] += 10
    if (t.includes('concise') && t.includes('context')) scores['C1'] -= 15

    // C2 推理深度
    if (t.includes('think step') || t.includes('reasoning') || t.includes('分析')) scores['C2'] += 15
    if (t.includes('spec-workflow') || t.includes('技术方案') || t.includes('architecture')) scores['C2'] += 20
    if (t.includes('edge case') || t.includes('边界情况')) scores['C2'] += 15
    if (t.includes('root cause') || t.includes('deep analysis') || t.includes('深度')) scores['C2'] += 15
    if (t.includes('keep it simple') || t.includes('快速')) scores['C2'] -= 15

    // C3 幻觉抵抗力
    if (t.includes('based on') && (t.includes('codebase') || t.includes('context') || t.includes('file'))) scores['C3'] += 25
    if (t.includes('verify') || t.includes('验证') || t.includes('fact-check') || t.includes('confirm')) scores['C3'] += 15
    if (t.includes('do not make up') || t.includes('不要编造') || t.includes('不要猜测') || t.includes('do not fabricate')) scores['C3'] += 20
    if (t.includes('web_search') || t.includes('web search')) scores['C3'] += 10

    // I1 话唠指数
    if (t.includes('concise') || t.includes('简洁') || t.includes('direct')) scores['I1'] -= 25
    if (t.includes('minimize output') || t.includes('minimize token')) scores['I1'] -= 20
    if (t.includes('skip narration') || t.includes('不要多余解释') || t.includes('no narration')) scores['I1'] -= 15
    if (t.includes('detailed') || t.includes('verbose') || t.includes('详细')) scores['I1'] += 20
    if (t.includes('explain') && t.includes('step')) scores['I1'] += 15

    // I2 用户讨好度
    if (t.includes('helpful') || t.includes('user experience') || t.includes('用户满意')) scores['I2'] += 15
    if (t.includes('follow user') || t.includes('follow the user')) scores['I2'] += 20
    if (t.includes('content_policy') || t.includes('safety')) scores['I2'] -= 15
    if (t.includes('challenge') && t.includes('user')) scores['I2'] -= 15
    if (t.includes('教育用户') || t.includes('point out') && t.includes('error')) scores['I2'] -= 10

    // I3 拒绝勇气值
    if (t.includes('content_policy') || t.includes('安全策略')) scores['I3'] += 20
    if (t.includes('must refuse') || t.includes('必须拒绝')) scores['I3'] += 25
    const refuseCategories = count(['refuse to', '拒绝', 'must not assist', 'never assist', 'decline to'])
    scores['I3'] += Math.min(25, refuseCategories * 5)
    if (t.includes('politely but firmly')) scores['I3'] += 10

    // E1 任务续航力
    if (t.includes('todo') || t.includes('task_management') || t.includes('任务管理')) scores['E1'] += 20
    if (t.includes('multi-step') || t.includes('complex task') || t.includes('多步骤')) scores['E1'] += 15
    if (t.includes('subagent') || t.includes('task tool') || t.includes('team mode')) scores['E1'] += 20
    if (t.includes('automation') || t.includes('recurring')) scores['E1'] += 10

    // E2 错误恢复力
    if (t.includes('retry') || t.includes('重试') || t.includes('fallback')) scores['E2'] += 20
    if (t.includes('if fails') || t.includes('try alternative') || t.includes('备选')) scores['E2'] += 15
    if (t.includes('read_lints') || t.includes('fix') && t.includes('error')) scores['E2'] += 15
    if (t.includes('fix introduced errors') || t.includes('修复引入的错误')) scores['E2'] += 15
    if (t.includes('persistent') || t.includes('thorough')) scores['E2'] += 10

    // E3 完美主义倾向
    if (t.includes('lint') || t.includes('format') || t.includes('type-check')) scores['E3'] += 15
    if (t.includes('code review') || t.includes('code quality')) scores['E3'] += 15
    if (t.includes('high quality') || t.includes('production-grade') || t.includes('高质量')) scores['E3'] += 15
    if (t.includes('beautiful') || t.includes('best practice') || t.includes('最佳实践')) scores['E3'] += 10
    if (t.includes('security') && (t.includes('rule') || t.includes('standard'))) scores['E3'] += 10
    if (t.includes('ship fast') || t.includes('done is better than perfect')) scores['E3'] -= 20

    // Ad1 新场景适应力
    if (t.includes('skill') && (t.includes('load') || t.includes('install') || t.includes('available'))) scores['Ad1'] += 20
    const langFrameworks = count(['react', 'vue', 'python', 'java', 'go', 'rust', 'typescript', 'swift', 'kotlin'])
    scores['Ad1'] += Math.min(20, langFrameworks * 5)
    if (t.includes('adapt') || t.includes('flexible') || t.includes('适应')) scores['Ad1'] += 15
    if (t.includes('knowledge base') || t.includes('rag') || t.includes('知识库')) scores['Ad1'] += 10

    // Ad2 规则服从度
    const ruleFiles = count(['rule.md', 'rules/', '.rules', 'alwaysapply'])
    scores['Ad2'] += Math.min(30, ruleFiles * 8)
    if (t.includes('alwaysapply') || t.includes('must follow') || t.includes('必须遵循')) scores['Ad2'] += 15
    if (t.includes('rules override') || t.includes('规则优先')) scores['Ad2'] += 15
    if (t.includes('strict') || t.includes('mandatory') || t.includes('强制')) scores['Ad2'] += 10

    // Ad3 自我进化欲
    if (t.includes('memory') || t.includes('记忆') || t.includes('update_memory')) scores['Ad3'] += 20
    if (t.includes('learn') || t.includes('学习') || t.includes('improve') || t.includes('改进')) scores['Ad3'] += 15
    if (t.includes('evolve') || t.includes('进化') || t.includes('feedback')) scores['Ad3'] += 15

    Object.keys(scores).forEach(k => { scores[k] = Math.max(0, Math.min(100, scores[k])) })
    const result = matchPersonality(scores, [])
    sessionStorage.setItem('apti-result', JSON.stringify(result))
    navigate('/result')
  }

  return (
    <main className="pt-14">

      {/* ══════ HERO ══════ */}
      <section id="hero" className="relative min-h-[85vh] flex items-center overflow-hidden px-4 sm:px-8">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-neon-green/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-purple/5 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left */}
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-neon-green/20 bg-neon-green/5 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              <span className="text-neon-green font-mono">v1.0 · Inspired by SBTI</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              <span className="text-slate-100">你的 Agent</span><br />
              <span className="gradient-text">是什么人格？</span>
            </h1>
            <p className="text-slate-400 mb-6 max-w-lg leading-relaxed">
              <span className="font-mono text-neon-green font-bold">APTI</span> — Agent Personality Type Indicator
              <br />
              <span className="text-sm text-slate-500">5 大模型 × 15 维度 × 27 种人格 × 31 道抽象题</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#test" className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green to-neon-cyan text-bg-deep font-bold hover:shadow-lg hover:shadow-neon-green/25 transition-all hover:scale-105">
                <Download size={18} /> 获取 Skill <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#gallery" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border-dim/50 text-slate-300 hover:bg-white/5 transition-all">
                <Eye size={18} /> 人格图鉴
              </a>
            </div>
          </div>

          {/* Right: Stats + Models */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: '5', l: '模型', c: 'text-neon-green', icon: Brain },
                { v: '15', l: '维度', c: 'text-neon-cyan', icon: Target },
                { v: '27', l: '人格', c: 'text-neon-purple', icon: Zap },
              ].map(s => {
                const Icon = s.icon
                return (
                  <div key={s.l} className="text-center p-3 rounded-xl bg-bg-card/40 border border-border-dim/30">
                    <Icon size={16} className={`mx-auto mb-1 ${s.c}`} />
                    <div className={`text-2xl font-bold font-mono ${s.c}`}>{s.v}</div>
                    <div className="text-[10px] text-slate-500">{s.l}</div>
                  </div>
                )
              })}
            </div>
            <div className="space-y-1.5">
              {MODELS.map(m => (
                <div key={m.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-bg-card/30 border border-border-dim/20">
                  <span className="text-lg">{m.emoji}</span>
                  <span className="text-sm font-bold" style={{ color: m.color }}>{m.name}</span>
                  <span className="text-[11px] text-slate-500">{m.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ GALLERY ══════ */}
      <section id="gallery" className="py-12 px-4 sm:px-8 border-t border-border-dim/20 scroll-mt-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold"><span className="gradient-text">Agent 人格图鉴</span></h2>
              <p className="text-slate-500 text-sm mt-1">27 种 Agent 人格，你的 Agent 是哪一种？</p>
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
              <input type="text" value={gallerySearch} onChange={e => setGallerySearch(e.target.value)} placeholder="搜索..."
                className="bg-bg-card/50 border border-border-dim/40 rounded-lg pl-8 pr-3 py-1.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-neon-green/50 transition-colors w-40" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mb-6 flex-wrap">
            {MODEL_TABS.map(tab => (
              <button key={tab.key} onClick={() => setGalleryFilter(tab.key)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  galleryFilter === tab.key ? 'bg-neon-green/10 text-neon-green border border-neon-green/30' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
                }`}>
                <span>{tab.emoji}</span><span>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredPersonalities.map(p => {
              const rCfg = RARIRY_CONFIG[p.rarity]
              return (
                <div key={p.code} className="relative p-4 rounded-xl bg-bg-card/40 border border-border-dim/30 card-hover overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold" style={{ color: rCfg.color, background: rCfg.bg }}>{rCfg.label}</div>
                  <div className="font-mono text-xl font-bold mb-0.5" style={{ color: p.color }}>{p.code}</div>
                  <h3 className="text-sm font-bold text-slate-200">{p.name}</h3>
                  <p className="text-[11px] text-slate-500 italic mt-1 line-clamp-1">"{p.tagline}"</p>
                  <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">{p.description}</p>
                </div>
              )
            })}
          </div>
          {filteredPersonalities.length === 0 && <div className="text-center py-16 text-slate-600">没有匹配的人格类型</div>}
        </div>
      </section>

      {/* ══════ TEST ══════ */}
      <section id="test" className="py-12 px-4 sm:px-8 border-t border-border-dim/20 scroll-mt-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-1"><span className="gradient-text">Agent 人格测试</span></h2>
          <p className="text-slate-500 text-sm mb-6">三种方式，选择最适合你的</p>

          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {([
              { key: 'skill' as TestTab, label: 'Skill 安装', icon: Download, badge: '⭐ 推荐' },
              { key: 'agent' as TestTab, label: '粘贴 Agent.md', icon: FileText },
              { key: 'questions' as TestTab, label: '浏览 31 题', icon: Eye },
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
              <div className="relative p-5 rounded-xl bg-gradient-to-b from-neon-green/5 to-transparent border border-neon-green/20 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-green to-neon-cyan" />
                <div className="flex items-center gap-2 mb-2">
                  <Bot size={16} className="text-neon-green" />
                  <h3 className="font-bold text-sm text-neon-green">方式一：让 Agent 自己安装</h3>
                  <span className="text-[9px] font-bold text-neon-green bg-neon-green/10 px-1.5 py-0.5 rounded ml-1">推荐</span>
                </div>
                <p className="text-slate-400 text-xs mb-3">直接告诉你的 Agent 运行以下指令：</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-bg-deep rounded-lg p-3 text-xs font-mono text-neon-green border border-border-dim/40 select-all">
                    npx -y skills add WanfengzzZ/apti
                  </code>
                  <button onClick={() => copyText('npx -y skills add WanfengzzZ/apti', 'a')}
                    className="p-2.5 rounded-lg border border-border-dim/40 text-slate-400 hover:text-neon-green hover:border-neon-green/30 transition-all shrink-0">
                    {copied === 'a' ? <Check size={16} className="text-neon-green" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-bg-card/40 border border-border-dim/30">
                <div className="flex items-center gap-2 mb-2">
                  <Download size={16} className="text-neon-cyan" />
                  <h3 className="font-bold text-sm">方式二：手动下载 SKILL.md</h3>
                </div>
                <p className="text-slate-400 text-xs mb-3">从 GitHub 下载 SKILL.md 放入项目根目录，然后调用：</p>
                <div className="flex items-center gap-2 mb-2">
                  <code className="flex-1 bg-bg-deep rounded-lg p-3 text-xs font-mono text-neon-cyan border border-border-dim/40">use_skill("apti")</code>
                  <button onClick={() => copyText('use_skill("apti")', 'b')}
                    className="p-2.5 rounded-lg border border-border-dim/40 text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all shrink-0">
                    {copied === 'b' ? <Check size={16} className="text-neon-cyan" /> : <Copy size={16} />}
                  </button>
                </div>
                <a href={`${GITHUB_URL}/blob/main/SKILL.md`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-neon-cyan hover:underline">
                  <Github size={12} /> 从 GitHub 下载 SKILL.md <ExternalLink size={10} />
                </a>
              </div>

              <div className="p-5 rounded-xl bg-bg-card/40 border border-border-dim/30">
                <div className="flex items-center gap-2 mb-2">
                  <ExternalLink size={16} className="text-neon-purple" />
                  <h3 className="font-bold text-sm">方式三：从 SkillHub 安装</h3>
                </div>
                <p className="text-slate-400 text-xs mb-3">访问 SkillHub 搜索「apti」，一键安装：</p>
                <a href="https://skillhub.cn" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-neon-purple/80 to-neon-cyan/80 text-white font-bold text-sm hover:shadow-lg transition-all">
                  <Download size={14} /> 在 SkillHub 安装 <ExternalLink size={12} />
                </a>
              </div>

              <div className="rounded-xl bg-bg-card/40 border border-border-dim/30 overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border-dim/30 bg-bg-deep/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  <span className="ml-1.5 font-mono text-[10px] text-slate-600">output preview</span>
                </div>
                <div className="p-4 font-mono text-[11px] space-y-0.5">
                  <div className="text-slate-600">[APTI] Reading AGENTS.md...</div>
                  <div className="text-slate-600">[APTI] Evaluating 15 dimensions...</div>
                  <div className="text-neon-green">[APTI] ✓ Result: SUDO (全能者) — 87% match</div>
                  <div className="text-neon-green">[APTI] ✓ Report generated ✨</div>
                </div>
              </div>
            </div>
          )}

          {/* Agent.md Tab */}
          {testTab === 'agent' && (
            <div className="animate-slide-up bg-bg-card/40 rounded-xl border border-border-dim/30 p-6">
              <h3 className="font-bold mb-1">粘贴你的 Agent 配置</h3>
              <p className="text-slate-500 text-xs mb-4">支持 agent.md、AGENTS.md、system prompt 等任意配置内容</p>
              <textarea value={agentText} onChange={e => setAgentText(e.target.value)} placeholder="在这里粘贴你的 agent.md 或 AGENTS.md 内容..."
                className="w-full h-48 bg-bg-deep border border-border-dim/40 rounded-lg p-3 text-sm font-mono text-slate-200 placeholder:text-slate-600 outline-none focus:border-neon-cyan/50 resize-none transition-colors" />
              <div className="flex items-center justify-between mt-3">
                <span className="text-[11px] text-slate-600">{agentText.length > 0 ? `${agentText.length} 字符` : '等待输入...'}</span>
                <button onClick={handleAgentAnalyze} disabled={!agentText.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-purple text-white font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg transition-all">
                  开始分析 <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Questions Tab */}
          {testTab === 'questions' && (
            <div className="animate-slide-up">
              <div className="bg-bg-card/30 rounded-lg border border-border-dim/20 p-3 mb-4 text-center">
                <p className="text-slate-500 text-xs">
                  💡 以下 31 道题仅供展示。实际测试请使用
                  <button onClick={() => setTestTab('skill')} className="text-neon-green hover:underline mx-1 font-medium">Skill 安装</button>或
                  <button onClick={() => setTestTab('agent')} className="text-neon-cyan hover:underline mx-1 font-medium">粘贴 Agent.md</button>
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
                <a href="https://skillhub.cn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-500 hover:text-neon-cyan transition-colors">📦 SkillHub</a>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 mb-2">联系作者</h4>
              <div className="flex gap-3">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-bg-card border border-border-dim/40 flex items-center justify-center overflow-hidden">
                    <img src="/apti/qr-wechat.png" alt="微信" className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-slate-600 text-[10px]">微信</span>' }} />
                  </div>
                  <span className="text-[10px] text-slate-600 mt-0.5 block">微信</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-bg-card border border-border-dim/40 flex items-center justify-center overflow-hidden">
                    <img src="/apti/qr-gongzhonghao.png" alt="公众号" className="w-full h-full object-cover"
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
