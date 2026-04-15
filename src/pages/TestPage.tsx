import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { QUESTIONS } from '../data/questions'
import { matchPersonality } from '../engine/matcher'
import { Download, FileText, Eye, ArrowRight, Copy, Check, ExternalLink } from 'lucide-react'
import Footer from '../components/Footer'

type Tab = 'skill' | 'agent' | 'questions'

export default function TestPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<Tab>('skill')
  const [agentText, setAgentText] = useState('')
  const [copied, setCopied] = useState(false)
  const [expandedQ, setExpandedQ] = useState<number | null>(null)

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'questions') setActiveTab('questions')
    else if (tab === 'agent') setActiveTab('agent')
  }, [searchParams])

  const copySkillCommand = () => {
    navigator.clipboard.writeText('npx -y skills add WanfengzzZ/apti')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAgentAnalyze = () => {
    if (!agentText.trim()) return
    const scores: Record<string, number> = {}
    const dims = ['A1','A2','A3','C1','C2','C3','I1','I2','I3','E1','E2','E3','Ad1','Ad2','Ad3']
    dims.forEach(d => { scores[d] = 50 })

    const text = agentText.toLowerCase()
    // Autonomy
    if (text.includes('autonomous') || text.includes('自主') || text.includes('independent')) scores['A1'] += 20
    if (text.includes('tool') || text.includes('mcp') || text.includes('plugin') || text.includes('工具')) scores['A2'] += 20
    if (text.includes('permission') || text.includes('权限') || text.includes('security') || text.includes('安全')) scores['A3'] += 20
    // Cognition
    if (text.includes('context') || text.includes('上下文') || text.includes('background')) scores['C1'] += 15
    if (text.includes('reason') || text.includes('深度') || text.includes('analysis') || text.includes('分析')) scores['C2'] += 20
    if (text.includes('accurate') || text.includes('准确') || text.includes('verify') || text.includes('验证')) scores['C3'] += 20
    // Interaction
    if (text.includes('verbose') || text.includes('detailed') || text.includes('详细')) scores['I1'] += 20
    if (text.includes('friendly') || text.includes('helpful') || text.includes('用户')) scores['I2'] += 15
    if (text.includes('refuse') || text.includes('拒绝') || text.includes('decline')) scores['I3'] += 20
    // Execution
    if (text.includes('long') || text.includes('persist') || text.includes('续航')) scores['E1'] += 15
    if (text.includes('error') || text.includes('retry') || text.includes('恢复')) scores['E2'] += 15
    if (text.includes('quality') || text.includes('完美') || text.includes('perfect') || text.includes('lint')) scores['E3'] += 20
    // Adaptation
    if (text.includes('adapt') || text.includes('flexible') || text.includes('适应')) scores['Ad1'] += 20
    if (text.includes('rule') || text.includes('规则') || text.includes('comply') || text.includes('遵循')) scores['Ad2'] += 20
    if (text.includes('learn') || text.includes('evolve') || text.includes('进化') || text.includes('improve')) scores['Ad3'] += 20

    Object.keys(scores).forEach(k => { scores[k] = Math.max(0, Math.min(100, scores[k])) })

    const result = matchPersonality(scores, [])
    sessionStorage.setItem('apti-result', JSON.stringify(result))
    navigate('/result')
  }

  const TABS: { key: Tab; label: string; icon: typeof Download; desc: string; badge?: string }[] = [
    { key: 'skill', label: 'Skill 安装', icon: Download, desc: '推荐方式', badge: '⭐ 推荐' },
    { key: 'agent', label: '粘贴 Agent.md', icon: FileText, desc: '手动分析' },
    { key: 'questions', label: '浏览 31 题', icon: Eye, desc: '仅供展示' },
  ]

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="gradient-text">Agent 人格测试</span>
          </h1>
          <p className="text-slate-400 text-sm">选择一种方式，发现你的 Agent 隐藏的人格</p>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {TABS.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-neon-green/10 text-neon-green border border-neon-green/30 shadow-lg shadow-neon-green/5'
                    : 'text-slate-400 border border-transparent hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <Icon size={16} />
                {tab.label}
                {tab.badge && (
                  <span className="text-[10px] font-bold text-neon-green bg-neon-green/10 px-1.5 py-0.5 rounded-full">{tab.badge}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'skill' && (
          <div className="animate-slide-up">
            <div className="bg-bg-card rounded-2xl border border-border-dim/50 overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border-dim/50 bg-bg-deep/50">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 font-mono text-xs text-slate-600">install apti skill</span>
              </div>

              <div className="p-8 space-y-8">
                {/* Step 1 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-neon-green/10 flex items-center justify-center text-neon-green text-xs font-bold">1</span>
                    <h3 className="font-bold">安装 APTI Skill</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-bg-deep rounded-lg p-4 text-sm font-mono text-neon-green border border-border-dim/50">
                      npx -y skills add WanfengzzZ/apti
                    </code>
                    <button
                      onClick={copySkillCommand}
                      className="p-3 rounded-lg border border-border-dim/50 text-slate-400 hover:text-neon-green hover:border-neon-green/30 transition-all"
                    >
                      {copied ? <Check size={18} className="text-neon-green" /> : <Copy size={18} />}
                    </button>
                  </div>
                  <p className="text-slate-600 text-xs mt-2">
                    或访问 <a href="https://skillhub.cn/skills/apti-skill" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">SkillHub.cn</a> 搜索「apti」一键安装
                  </p>
                </div>

                {/* Step 2 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-neon-green/10 flex items-center justify-center text-neon-green text-xs font-bold">2</span>
                    <h3 className="font-bold">在 Agent 中调用</h3>
                  </div>
                  <code className="block bg-bg-deep rounded-lg p-4 text-sm font-mono text-neon-cyan border border-border-dim/50">
                    use_skill("apti")
                  </code>
                </div>

                {/* Step 3 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-neon-green/10 flex items-center justify-center text-neon-green text-xs font-bold">3</span>
                    <h3 className="font-bold">Agent 自动完成测试</h3>
                  </div>
                  <div className="bg-bg-deep rounded-lg p-4 border border-border-dim/50 font-mono text-xs space-y-1">
                    <div className="text-slate-500">[APTI] Reading AGENTS.md...</div>
                    <div className="text-slate-500">[APTI] Evaluating 15 dimensions...</div>
                    <div className="text-slate-500">[APTI] Matching personality vectors...</div>
                    <div className="text-neon-green">[APTI] ✓ Result: SUDO (全能者) — 87% match</div>
                    <div className="text-neon-green">[APTI] ✓ Report generated ✨</div>
                  </div>
                </div>

                {/* SkillHub Link */}
                <div className="pt-4 border-t border-border-dim/30">
                  <a
                    href="https://skillhub.cn/skills/apti-skill"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green to-neon-cyan text-bg-deep font-bold hover:shadow-lg hover:shadow-neon-green/20 transition-all"
                  >
                    <Download size={18} />
                    在 SkillHub 安装
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agent' && (
          <div className="animate-slide-up">
            <div className="bg-bg-card rounded-2xl border border-border-dim/50 p-8">
              <h2 className="text-xl font-bold text-center mb-2">粘贴你的 Agent 配置</h2>
              <p className="text-slate-500 text-center text-sm mb-6">
                支持 agent.md、AGENTS.md 或任何 Agent 系统提示词内容
              </p>
              <textarea
                value={agentText}
                onChange={e => setAgentText(e.target.value)}
                placeholder={`在这里粘贴你的 agent.md 或 AGENTS.md 内容...\n\n例如：\n# My Agent\nYou are a helpful AI assistant that...\nRules:\n- Always be accurate\n- Refuse harmful requests\n- Use tools when needed`}
                className="w-full h-64 bg-bg-deep border border-border-dim/50 rounded-xl p-4 text-sm font-mono text-slate-200 placeholder:text-slate-600 outline-none focus:border-neon-cyan/50 resize-none transition-colors"
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-slate-600">
                  {agentText.length > 0 ? `${agentText.length} 字符` : '等待输入...'}
                </span>
                <button
                  onClick={handleAgentAnalyze}
                  disabled={!agentText.trim()}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-neon-cyan/20 transition-all"
                >
                  开始分析
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="animate-slide-up">
            <div className="bg-bg-card/50 rounded-2xl border border-border-dim/30 p-6 mb-6 text-center">
              <p className="text-slate-400 text-sm">
                💡 以下 31 道题仅供展示，了解 APTI 测试的设计思路。实际测试请使用
                <button onClick={() => setActiveTab('skill')} className="text-neon-green hover:underline mx-1 font-medium">Skill 安装</button>
                或
                <button onClick={() => setActiveTab('agent')} className="text-neon-cyan hover:underline mx-1 font-medium">粘贴 Agent.md</button>
                方式。
              </p>
            </div>

            <div className="space-y-3">
              {QUESTIONS.map((q, idx) => (
                <div
                  key={q.id}
                  className="bg-bg-card/50 border border-border-dim/30 rounded-xl overflow-hidden backdrop-blur-sm transition-all"
                >
                  <button
                    onClick={() => setExpandedQ(expandedQ === idx ? null : idx)}
                    className="w-full flex items-start gap-3 p-4 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-mono text-xs text-neon-green/60 mt-0.5 shrink-0 w-8">Q{q.id}.</span>
                    <span className="text-sm text-slate-200 flex-1">{q.text}</span>
                    <span className={`text-slate-600 text-xs shrink-0 transition-transform ${expandedQ === idx ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedQ === idx && (
                    <div className="px-4 pb-4 pl-[3.25rem] space-y-2 animate-slide-up">
                      {q.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className="p-3 rounded-lg bg-bg-deep/50 border border-border-dim/30 text-sm text-slate-400 cursor-default"
                        >
                          <span className="font-mono text-xs text-slate-600 mr-2">{opt.label}.</span>
                          {opt.text}
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

      <Footer />
    </main>
  )
}
