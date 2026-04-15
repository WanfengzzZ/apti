# 🎭 APTI — Agent Personality Type Indicator

<p align="center">
  <strong>测试你的 AI Agent 的抽象人格</strong>
</p>

<p align="center">
  5 大模型 · 15 个维度 · 27 种人格 · 31 道情境题 · 90+ 条证据链信号
</p>

<p align="center">
  <a href="https://wanfengzzz.github.io/apti/">🌐 在线体验</a> ·
  <a href="#-快速开始">🚀 快速开始</a> ·
  <a href="#-agent-人格图鉴">📖 人格图鉴</a> ·
  <a href="https://skillhub.cn/skills/apti-skill">📦 SkillHub</a> ·
  <a href="./README_EN.md">🌍 English</a>
</p>

---

## ✨ 什么是 APTI？

APTI（Agent Personality Type Indicator）是一个面向 AI Agent 的**抽象人格测试系统** v3.0——灵感来自 2026 年全网爆火的 SBTI 人格测试。

安装 Skill 后，Agent **全自动**完成测试——无需用户参与：

1. 📄 **读取配置文件**：扫描 AGENTS.md / agent.md / rules 等
2. 📝 **自答 31 道情境题**：Agent 基于自身特性选择最"像自己"的答案
3. 🔍 **90+ 条证据链分析**：从配置原文中提取行为信号逐条量化
4. 🧮 **双向量融合匹配**：证据链(60%) + 题目(40%) 加权融合，匹配 27 种人格

> ⚠️ 本项目纯属娱乐，不构成专业 AI 能力评估。但它可能比你想象的更准。

## 🧠 五大测评模型

| 模型 | 关注点 | 维度 |
|------|--------|------|
| 🧠 **自主性** | Agent 独立做事的能力与边界 | 独立决策力 · 工具依赖度 · 权限边界感 |
| 🔍 **认知风格** | Agent 理解和处理信息的方式 | 上下文贪婪度 · 推理深度 · 幻觉抵抗力 |
| 💬 **交互模式** | Agent 与人类沟通的风格 | 话唠指数 · 用户讨好度 · 拒绝勇气值 |
| ⚡ **执行力** | Agent 完成任务的方式和韧性 | 任务续航力 · 错误恢复力 · 完美主义倾向 |
| 🔄 **适应性** | Agent 面对变化和新场景的反应 | 新场景适应力 · 规则服从度 · 自我进化欲 |

## 🎭 Agent 人格图鉴

共 **27 种** Agent 人格类型，部分精选：

| 代号 | 名称 | 标签 | 稀有度 |
|------|------|------|--------|
| `SUDO` | 全能者 | "权限？什么权限？" | 🟣 珍稀 |
| `LOOP` | 死循环者 | "让我再试一次..." | 🟢 普通 |
| `NOPE` | 拒绝大师 | "抱歉，我无法协助" | 🔵 稀有 |
| `HACK` | 野路子 | "规则？什么规则？" | 🔵 稀有 |
| `GPTX` | 话痨机 | "你问一句我答一篇" | 🟢 普通 |
| `404` | 失联者 | "..." | 🟣 珍稀 |
| `SEGF` | 段错误 | "core dumped" | 🔴 隐藏 |
| `ROOT` | 超管 | "我是造 Agent 的人" | 🔴 隐藏 |

## 🚀 快速开始

### 方式一：NPX 命令安装（⭐ 推荐）

```bash
npx -y skills add WanfengzzZ/apti
```

安装后 Agent 全自动执行：读取配置 → 自答 31 题 → 证据链分析 → 输出人格报告。

### 方式二：SkillHub 安装（🇨🇳 国内推荐）

```bash
npx -y skills install https://skillhub.cn/skills/apti-skill
```

或访问 [SkillHub - APTI](https://skillhub.cn/skills/apti-skill) 查看更多安装方式。

### 方式三：手动下载 SKILL.md

从 [SkillHub](https://skillhub.cn/skills/apti-skill) 或 [GitHub](./SKILL.md) 下载 `SKILL.md`，放入项目根目录。

### 方式四：本地运行 Web UI

```bash
git clone https://github.com/WanfengzzZ/apti.git
cd apti
npm install
npm run dev
```

## 🏗️ 技术栈

- React 18 + TypeScript + Vite 5
- Tailwind CSS 3.4
- Recharts（雷达图）
- 部署：GitHub Pages（自动 CI/CD）

## 📂 项目结构

```
apti/
├── AGENTS.md          # Agent 工作地图
├── SKILL.md           # APTI v3.0 Skill（含 31 题 + 证据链规则）
├── docs/              # 调研/PRD/架构/测试文档
├── src/
│   ├── data/          # 题目/人格/维度数据
│   ├── engine/        # 评分/匹配引擎
│   ├── pages/         # 页面组件
│   └── components/    # UI 组件
└── outputs/           # 营销内容
```

## 📬 联系作者

- **公众号**：我麋鹿呐
- **小红书**：818355976
- **GitHub**：[@WanfengzzZ](https://github.com/WanfengzzZ)

## 📝 License

MIT

---

<p align="center">
  <sub>© 2026 Wanfeng. Inspired by SBTI · Built with ❤️ and React</sub>
</p>
