# APTI — Agent 工作指南

## 快速开始

本项目是 **APTI (Agent Personality Type Indicator)**，一个面向 AI Agent 的抽象人格测试系统。

开始工作前，请阅读：
- [产品需求文档](docs/product/prd.md)
- [技术架构文档](docs/architecture/tech-design.md)
- [SBTI 调研](docs/research/sbti-analysis.md)

## 目录导航

```
apti/
├── AGENTS.md          ← 本文件（Agent 地图）
├── SKILL.md           ← APTI Skill 定义（Agent 接入入口）
├── docs/              ← 结构化文档
│   ├── research/      ← SBTI 调研
│   ├── product/       ← PRD
│   ├── architecture/  ← 技术架构
│   └── testing/       ← 测试文档
├── src/
│   ├── data/          ← 测试数据（题目/人格/维度）
│   ├── engine/        ← 核心引擎（评分/匹配）
│   ├── pages/         ← 页面组件
│   ├── components/    ← 通用组件
│   └── utils/         ← 工具函数
└── outputs/           ← 营销内容
```

## 核心概念

- **5 大模型**：自主性 / 认知风格 / 交互模式 / 执行力 / 适应性
- **15 个维度**：每模型 3 维度（见 `src/data/dimensions.ts`）
- **27 种人格**：25 标准 + 1 兜底 (SEGF) + 1 隐藏 (ROOT)（见 `src/data/personalities.ts`）
- **31 道题目**：情境模拟 + 反逻辑 + 元提问（见 `src/data/questions.ts`）

## 质量门控

- 所有数据以 TypeScript 类型安全定义
- 评分引擎使用欧氏距离最近邻匹配
- 文档与代码保持同步

## 开发命令

```bash
npm install    # 安装依赖
npm run dev    # 启动开发服务器
npm run build  # 生产构建
```
