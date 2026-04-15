# 朋友圈文案

---

## 版本一（技术悬念版）

给 AI Agent 做了个"证据链人格测试"。

不是凭感觉打分——是从配置文件里扫描 90+ 个行为信号，逐条量化，每个评分附带原文证据。

测了自己的 Agent，结果是 CRTL（控制狂）：规则服从度 95，完美主义 95。

……好吧，我确实给它配了 7 个角色 + 30 多个 rules 文件 + 完整协作协议。

一条命令：npx -y skills add WanfengzzZ/apti
📦 github.com/WanfengzzZ/apti

---

## 版本二（洞察共鸣版）

"写代码是智能，知道下一步该做什么是判断力。" —— 红杉 Julien Bek

做了个 Agent 人格测试后我发现：大多数 Agent 的"人格"是 OBEY（乖宝宝）—— 智能够用但判断力为零。

不是 Agent 不行，是我们给它的配置在限制它的判断力。

你给 Agent 的配置方式，暴露的是你对"智能"的理解深度。

🎭 APTI v2.0 — 90+ 信号规则 × 证据链分析 × 27 种人格
📦 github.com/WanfengzzZ/apti

---

## 版本三（极客炫酷版）

新项目 APTI v2.0 上线。

给 AI Agent 做人格测试，但不是随便打分——

✅ 自动扫描 agent.md / AGENTS.md / rules
✅ 90+ 条结构化信号规则逐条匹配
✅ 15 维度向量 × 27 种人格 × 欧氏距离
✅ 每个评分附带原文证据引用
✅ Agent 自己安装、自己测、自己出报告

你的 Agent 是 SUDO（全能者）还是 404（失联者）？

发给 Agent 一句话就能测：
"帮我安装 APTI Skill 并测试我的 Agent 人格：npx -y skills add WanfengzzZ/apti"

📦 github.com/WanfengzzZ/apti
