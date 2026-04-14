import { Github, Heart } from 'lucide-react'

const GITHUB_URL = 'https://github.com/WanfengzzZ/apti'

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border-dim/30 bg-bg-deep/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="font-mono text-xl font-bold text-neon-green neon-text-green mb-2">APTI</div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Agent Personality Type Indicator<br />
              5 大模型 × 15 维度 × 27 种人格
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-300 mb-3">链接</h4>
            <div className="space-y-2 text-sm">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-neon-green transition-colors">
                <Github size={14} /> GitHub 开源
              </a>
              <a href="https://skillhub.cn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-neon-cyan transition-colors">
                📦 SkillHub
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-slate-300 mb-3">联系作者</h4>
            <div className="flex gap-4">
              {/* WeChat QR placeholder */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-lg bg-bg-card border border-border-dim/50 flex items-center justify-center overflow-hidden">
                  <img
                    src="/apti/qr-wechat.png"
                    alt="微信二维码"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                      ;(e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-slate-600 text-xs">微信</span>'
                    }}
                  />
                </div>
                <span className="text-xs text-slate-600 mt-1 block">微信</span>
              </div>
              {/* Public Account QR placeholder */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-lg bg-bg-card border border-border-dim/50 flex items-center justify-center overflow-hidden">
                  <img
                    src="/apti/qr-gongzhonghao.png"
                    alt="公众号二维码"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                      ;(e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-slate-600 text-xs">公众号</span>'
                    }}
                  />
                </div>
                <span className="text-xs text-slate-600 mt-1 block">我麋鹿呐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="pt-6 border-t border-border-dim/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span className="flex items-center gap-1">
            © 2026 <span className="text-slate-400 font-medium">Wanfeng</span>. All rights reserved.
          </span>
          <span className="flex items-center gap-1">
            Built with <Heart size={12} className="text-red-500/60" /> and React · Inspired by SBTI
          </span>
        </div>
      </div>
    </footer>
  )
}
