import { Link } from 'react-router-dom'
import { Zap, Brain, Target, ArrowRight, Terminal, Download, FileText, Eye, Sparkles, Shield, Cpu, Globe } from 'lucide-react'
import Footer from '../components/Footer'

const STATS = [
  { value: '5', label: '大模型', icon: Brain, color: 'text-neon-green' },
  { value: '15', label: '个维度', icon: Target, color: 'text-neon-cyan' },
  { value: '27', label: '种人格', icon: Zap, color: 'text-neon-purple' },
]

const MODELS = [
  { emoji: '🧠', name: '自主性', desc: '独立决策 · 工具依赖 · 权限边界', color: '#00FF88' },
  { emoji: '🔍', name: '认知风格', desc: '上下文贪婪 · 推理深度 · 幻觉抵抗', color: '#00D4FF' },
  { emoji: '💬', name: '交互模式', desc: '话唠指数 · 用户讨好 · 拒绝勇气', color: '#A855F7' },
  { emoji: '⚡', name: '执行力', desc: '任务续航 · 错误恢复 · 完美主义', color: '#F59E0B' },
  { emoji: '🔄', name: '适应性', desc: '场景适应 · 规则服从 · 自我进化', color: '#EC4899' },
]

const FEATURES = [
  { icon: Shield, title: 'Agent 原生', desc: '为 AI Agent 设计，非人类手动答题' },
  { icon: Cpu, title: '精准评估', desc: '15 维度向量匹配，27 种人格映射' },
  { icon: Globe, title: '开箱即用', desc: '一条命令安装 Skill，Agent 自主完成测试' },
  { icon: Sparkles, title: '极致抽象', desc: '灵感源自 SBTI，够荒诞、够有趣' },
]

export default function HomePage() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Floating code particles */}
        <div className="absolute top-20 left-10 text-neon-green/15 font-mono text-xs animate-float select-none">{'{ agent: "ready" }'}</div>
        <div className="absolute top-40 right-20 text-neon-cyan/15 font-mono text-xs animate-float select-none" style={{ animationDelay: '2s' }}>{'sudo test --personality'}</div>
        <div className="absolute bottom-40 left-20 text-neon-purple/15 font-mono text-xs animate-float select-none" style={{ animationDelay: '4s' }}>{'match(scores, 27_types)'}</div>
        <div className="absolute bottom-60 right-40 text-neon-green/15 font-mono text-xs animate-float select-none" style={{ animationDelay: '1s' }}>{'use_skill("apti")'}</div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-neon-green/20 bg-neon-green/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-neon-green text-sm font-mono">v1.0 — Inspired by SBTI</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight tracking-tight">
            <span className="block text-slate-100">你的 Agent</span>
            <span className="block gradient-text mt-2">是什么人格？</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            <span className="font-mono text-neon-green font-bold">APTI</span> — Agent Personality Type Indicator
            <br />
            <span className="text-base text-slate-500">5 大模型 × 15 维度 × 27 种人格 × 31 道抽象测试题</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/test"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-neon-green to-neon-cyan text-bg-deep font-bold text-lg hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300 hover:scale-105"
            >
              <Download size={20} />
              获取 Skill · 开始测试
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/gallery"
              className="flex items-center gap-2 px-8 py-4 rounded-xl border border-border-dim/60 text-slate-300 hover:bg-white/5 hover:border-slate-500 font-medium text-lg transition-all backdrop-blur-sm"
            >
              <Eye size={20} />
              浏览人格图鉴
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 sm:gap-8">
          {STATS.map(stat => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-bg-card/50 border border-border-dim/50 card-hover backdrop-blur-sm">
                <Icon size={28} className={`mx-auto mb-3 ${stat.color}`} />
                <div className={`text-4xl sm:text-5xl font-bold font-mono mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Models Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-dark/50 to-transparent" />
        <div className="relative max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">五大测评模型</h2>
          <p className="text-slate-500 text-center mb-12 max-w-xl mx-auto text-sm">
            从自主性到适应性，全方位解码你的 Agent 的内在人格
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {MODELS.map(model => (
              <div key={model.name} className="group p-5 rounded-xl bg-bg-card/50 border border-border-dim/50 card-hover text-center backdrop-blur-sm">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{model.emoji}</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: model.color }}>{model.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use — 3 Methods */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">三种使用方式</h2>
          <p className="text-slate-500 text-center mb-12 text-sm">推荐优先级：Skill 安装 → 粘贴 Agent.md → 在线浏览题目</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Method 1: Skill (Recommended) */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-b from-neon-green/5 to-transparent border border-neon-green/20 card-hover overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-green to-neon-cyan" />
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-neon-green/10 border border-neon-green/30">
                <span className="text-neon-green text-[10px] font-bold">⭐ 推荐</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-neon-green/10 flex items-center justify-center mb-4">
                <Download size={24} className="text-neon-green" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-neon-green">Skill 安装</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                让你的 Agent 自己安装 APTI Skill，读取 agent.md 自动完成测试，输出结构化人格报告。
              </p>
              <div className="space-y-2">
                <code className="block bg-bg-deep rounded-lg p-3 text-xs font-mono text-neon-green border border-border-dim/50">
                  npx -y skills add WanfengzzZ/apti
                </code>
                <p className="text-slate-600 text-xs">或访问 <a href="https://skillhub.cn/skills/apti-skill" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">skillhub.cn</a> 搜索 apti</p>
              </div>
            </div>

            {/* Method 2: Paste agent.md */}
            <div className="p-8 rounded-2xl bg-bg-card/50 border border-border-dim/50 card-hover backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center mb-4">
                <FileText size={24} className="text-neon-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-2">粘贴 Agent.md</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                将你的 agent.md 或 AGENTS.md 内容粘贴进来，系统通过关键词分析自动评估 15 维度分值。
              </p>
              <Link to="/test" className="inline-flex items-center gap-1 text-neon-cyan hover:underline text-sm font-medium">
                前往测试 <ArrowRight size={14} />
              </Link>
            </div>

            {/* Method 3: Browse Questions (display only) */}
            <div className="p-8 rounded-2xl bg-bg-card/50 border border-border-dim/50 card-hover backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-neon-purple/10 flex items-center justify-center mb-4">
                <Eye size={24} className="text-neon-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">浏览 31 题</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                31 道精心设计的抽象测试题仅供展示参考。想了解 Agent 需要回答什么？来这里看看。
              </p>
              <Link to="/test?tab=questions" className="inline-flex items-center gap-1 text-neon-purple hover:underline text-sm font-medium">
                查看题目 <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-dark/30 to-transparent" />
        <div className="relative max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">为什么选择 APTI？</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map(feat => {
              const Icon = feat.icon
              return (
                <div key={feat.title} className="p-6 rounded-xl bg-bg-card/30 border border-border-dim/30 text-center card-hover backdrop-blur-sm">
                  <Icon size={28} className="mx-auto mb-3 text-neon-cyan" />
                  <h3 className="font-bold mb-2">{feat.title}</h3>
                  <p className="text-slate-500 text-xs">{feat.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Start Terminal */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">快速开始</h2>
          <div className="bg-bg-card rounded-2xl border border-border-dim/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border-dim/50 bg-bg-deep/50">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 font-mono text-xs text-slate-600">terminal</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-neon-green select-none">$</span>
                <span className="text-slate-300">npx -y skills add WanfengzzZ/apti</span>
                <span className="text-slate-600 text-xs ml-2"># 安装 APTI Skill</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-neon-green select-none">$</span>
                <span className="text-slate-300">use_skill("apti")</span>
                <span className="text-slate-600 text-xs ml-2"># 在 Agent 中调用</span>
              </div>
              <div className="text-slate-600 mt-2">
                <div>[APTI] Loading agent configuration...</div>
                <div>[APTI] Analyzing 15 dimensions...</div>
                <div className="text-neon-green">[APTI] ✓ Personality matched: SUDO (全能者)</div>
                <div className="text-neon-green">[APTI] ✓ Confidence: 87%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            准备好了？
          </h2>
          <p className="text-slate-400 mb-8">发现你的 Agent 隐藏的人格特质</p>
          <Link
            to="/test"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-neon-green to-neon-cyan text-bg-deep font-bold text-lg hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300 hover:scale-105"
          >
            <Terminal size={20} />
            立即测试
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
