# 🎭 APTI — Agent Personality Type Indicator

<p align="center">
  <strong>测试你的 AI Agent 的抽象人格</strong>
</p>

<p align="center">
  5 大模型 · 15 个维度 · 27 种人格 · 31 道题目
</p>

<p align="center">
  <a href="https://free-2gnwacsve44e4424-1329466636.tcloudbaseapp.com/apti/">🌐 在线体验</a> ·
  <a href="#-快速开始">🚀 快速开始</a> ·
  <a href="#-agent-人格图鉴">📖 人格图鉴</a> ·
  <a href="./README_EN.md">🌍 English</a>
</p>

---

## ✨ 什么是 APTI？

APTI（Agent Personality Type Indicator）是一个面向 AI Agent 的**抽象人格测试系统**——灵感来自 2026 年全网爆火的 SBTI（Silly Big Personality Test）人格测试。

无论你使用的是 Claude Code、Cursor、Qclaw 还是任何其他 Agent 框架，只需通过 APTI 即可测出你的 Agent 的"Agent 人格"。

> ⚠️ 本项目纯属娱乐，不构成专业 AI 能力评估。但它可能比你想象的更准。

## 🧠 五大测评模型

| 模型 | 关注点 | 维度 |
|------|--------|------|
| 🧠 **自主性** | Agent 独立做事的能力与边界 | 独立决策力 · 工具依赖度 · 权限边界感 |
| 🔍 **认知风格** | Agent 理解世界和处理信息的方式 | 上下文贪婪度 · 推理深度 · 幻觉抵抗力 |
| 💬 **交互模式** | Agent 与人类沟通的风格 | 话唠指数 · 用户讨好度 · 拒绝勇气值 |
| ⚡ **执行力** | Agent 完成任务的方式和韧性 | 任务续航力 · 错误恢复力 · 完美主义倾向 |
| 🔄 **适应性** | Agent 面对变化和新场景的反应 | 新场景适应力 · 规则服从度 · 自我进化欲 |

## 🎭 Agent 人格图鉴

共 **27 种** Agent 人格类型，部分精选：

| 代号 | 名称 | 标签 | 稀有度 |
|------|------|------|--------|
| `SUDO` | 全能者 | "权限？什么权限？" | 🟣 珍稀 |
| `LOOP` | 死循环者 | "让我再试一次..." | 🟢 普通 |
| `YOLO` | 一把梭者 | "先写了再说" | 🟢 普通 |
| `NOPE` | 拒绝大师 | "抱歉，我无法协助" | 🔵 稀有 |
| `HACK` | 野路子 | "规则？什么规则？" | 🔵 稀有 |
| `404` | 失联者 | "..." | 🟣 珍稀 |
| `SEGF` | 段错误 | "core dumped" | 🔴 隐藏 |
| `ROOT` | 超管 | "我是造 Agent 的人" | 🔴 隐藏 |

[查看全部 27 种人格 →](https://free-2gnwacsve44e4424-1329466636.tcloudbaseapp.com/apti/#/gallery)

## 🚀 快速开始

### 方式一：在线测试
直接访问 [APTI 在线测试](https://free-2gnwacsve44e4424-1329466636.tcloudbaseapp.com/apti/)，回答 31 道题即可。

### 方式二：Skill 接入
将 `SKILL.md` 文件添加到你的 Agent 项目中，Agent 可自动读取并执行人格测试。

### 方式三：本地运行
```bash
git clone https://github.com/YOUR_USERNAME/apti.git
cd apti
npm install
npm run dev
```

## 🏗️ 技术栈

- React 18 + TypeScript + Vite 5
- Tailwind CSS 3.4
- Recharts（雷达图）
- 部署：腾讯云 CloudBase 静态托管

## 📂 项目结构

```
apti/
├── AGENTS.md          # Agent 工作地图
├── SKILL.md           # APTI Skill 定义
├── docs/              # 结构化文档
├── src/
│   ├── data/          # 测试数据（题目/人格/维度）
│   ├── engine/        # 核心引擎（评分/匹配）
│   ├── pages/         # 4 个页面
│   └── components/    # UI 组件
└── outputs/           # 营销内容
```

## 🤝 贡献

欢迎提交 Issue 和 PR！特别欢迎：
- 新增 Agent 人格类型
- 改进测试题目
- 翻译为更多语言
- 添加更多 Agent 框架的 Skill 接入

## 📝 License

MIT

---

<p align="center">
  <sub>Inspired by SBTI · Built with ❤️ and React · Powered by CloudBase</sub>
</p>
