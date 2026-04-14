# APTI 技术架构文档

> 版本：1.0 | 日期：2026-04-14

---

## 1. 系统架构概览

```
┌─────────────────────────────────────────────────────┐
│                    用户入口层                         │
├─────────────┬─────────────────┬─────────────────────┤
│  WebUI      │  SKILL.md       │  CLI (future)       │
│  (React SPA)│  (Agent 接入)    │  (命令行工具)        │
└──────┬──────┴────────┬────────┴──────────┬──────────┘
       │               │                   │
┌──────▼───────────────▼───────────────────▼──────────┐
│                    核心引擎层                         │
├─────────────┬─────────────────┬─────────────────────┤
│  评分器      │  匹配器          │  Agent分析器         │
│  scorer.ts  │  matcher.ts     │  agentAnalyzer.ts   │
└──────┬──────┴────────┬────────┴──────────┬──────────┘
       │               │                   │
┌──────▼───────────────▼───────────────────▼──────────┐
│                    数据层                             │
├─────────────┬─────────────────┬─────────────────────┤
│  questions   │  personalities  │  dimensions         │
│  (31题)      │  (27人格)       │  (15维度)           │
└─────────────┴─────────────────┴─────────────────────┘
```

## 2. 技术栈

| 层级 | 技术选型 | 版本 | 说明 |
|------|---------|------|------|
| 前端框架 | React + TypeScript | 18.x + 5.x | SPA 应用 |
| 构建工具 | Vite | 5.x | 快速构建 |
| 样式 | Tailwind CSS | 3.4.17 | 工具类优先 |
| 图表 | Recharts | latest | 雷达图渲染 |
| 路由 | React Router | 6.x | 客户端路由 |
| 图片导出 | html2canvas | latest | 分享卡片 |
| 部署 | CloudBase 静态托管 | - | CDN 加速 |

## 3. 目录结构（Harness Engineering 合规）

```
apti/
├── AGENTS.md                    # Agent 工作地图（~100行）
├── SKILL.md                     # APTI Skill 定义文件
├── README.md                    # 中文 README
├── README_EN.md                 # 英文 README
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── index.html
│
├── docs/                        # 结构化文档（Harness）
│   ├── research/
│   │   └── sbti-analysis.md
│   ├── product/
│   │   └── prd.md
│   ├── architecture/
│   │   └── tech-design.md       # 本文件
│   └── testing/
│       └── test-plan.md
│
├── src/
│   ├── main.tsx                 # React 入口
│   ├── App.tsx                  # 根组件 + 路由
│   ├── index.css                # 全局样式
│   │
│   ├── data/                    # 静态数据层
│   │   ├── questions.ts         # 31 题数据
│   │   ├── personalities.ts     # 27 人格定义
│   │   └── dimensions.ts        # 15 维度定义
│   │
│   ├── engine/                  # 核心引擎
│   │   ├── scorer.ts            # 评分器
│   │   └── matcher.ts           # 匹配器
│   │
│   ├── pages/                   # 页面组件
│   │   ├── HomePage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── TestPage.tsx
│   │   └── ResultPage.tsx
│   │
│   ├── components/              # 通用组件
│   │   ├── RadarChart.tsx
│   │   ├── PersonalityCard.tsx
│   │   ├── ShareCard.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Navbar.tsx
│   │
│   └── utils/                   # 工具函数
│       ├── agentAnalyzer.ts
│       └── shareUtils.ts
│
├── public/
│   └── favicon.svg
│
└── outputs/                     # 营销内容
    ├── xiaohongshu.md
    ├── wechat-article.md
    └── moments.md
```

## 4. 核心算法

### 4.1 评分引擎（scorer.ts）

```
输入: Answer[] (31道题的选项选择)
输出: DimensionScores (15维度分值 [0-100])

流程:
1. 初始化 15 维度基础分 = 50
2. 遍历每道题的选中选项
3. 将选项对应的维度增量叠加到基础分上
4. 将所有维度分值裁剪到 [0, 100] 范围
5. 返回 DimensionScores 对象
```

### 4.2 匹配引擎（matcher.ts）

```
输入: DimensionScores (15维度分值)
输出: MatchResult { personality, confidence, scores }

流程:
1. 检查隐藏类型触发条件
   - 第31题选D + 前30题中≥5题选最后选项 → ROOT
2. 计算用户向量与27种标准向量的欧氏距离
   distance = sqrt(Σ(user[i] - standard[i])²)
3. 将距离转换为匹配度 confidence = max(0, 100 - distance/15*100)
4. 选择匹配度最高的人格类型
5. 若最高匹配度 < 60% → 触发兜底类型 SEGF
6. 返回匹配结果
```

### 4.3 Agent 分析器（agentAnalyzer.ts）

```
输入: string (agent.md 或 AGENTS.md 的文本内容)
输出: DimensionScores (15维度分值 [0-100])

流程:
1. 解析文本内容，提取关键词和结构特征
2. 按 15 维度的关键词表进行评分
   - A1 独立决策力: 包含 "autonomous"/"自主" → +分
   - A3 权限边界感: 包含 "permission"/"权限" → +分
   - ...依此类推
3. 分析文本长度、结构化程度等元特征
4. 综合生成 15 维度分值
5. 送入匹配引擎获取人格类型
```

## 5. 数据流

```
用户答题路径:
  选择选项 → QuestionCard → TestPage(state)
  → 全部答完 → scorer.calculate(answers)
  → matcher.match(scores) → ResultPage 展示

Agent分析路径:
  粘贴agent.md → TestPage(textarea)
  → agentAnalyzer.analyze(text)
  → matcher.match(scores) → ResultPage 展示
```

## 6. 部署方案

- **构建**：`npm run build` → `dist/` 目录
- **部署**：CloudBase 静态托管 uploadFiles
- **环境**：free-2gnwacsve44e4424
- **CDN**：CloudBase 自带 CDN 加速
- **域名**：使用 CloudBase 默认域名

## 7. 设计系统

### 7.1 色彩系统

```css
--color-primary-green: #00FF88;
--color-primary-cyan: #00D4FF;
--color-primary-purple: #A855F7;
--color-bg-deep: #0A0E17;
--color-bg-dark: #111827;
--color-bg-card: #1A1F2E;
--color-text-primary: #F8FAFC;
--color-text-secondary: #94A3B8;
--color-text-muted: #64748B;
```

### 7.2 字体系统

- 标题：DIN Next / 系统等宽字体 fallback
- 代码：JetBrains Mono / Fira Code
- 正文：系统默认无衬线字体

### 7.3 组件规范

- 卡片：`bg-[#1A1F2E]` + `border border-[#2A3040]` + `rounded-xl`
- 按钮：渐变背景 + hover 发光效果
- 输入框：深色背景 + 绿色聚焦边框

---

> 本文档定义了 APTI 的技术实现方案。所有代码开发应参照本文档执行。
