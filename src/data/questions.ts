export interface QuestionOption {
  label: string;
  text: string;
  effects: Record<string, number>; // dimension code → score delta
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1, text: '用户给你发了一条消息："帮我把这个搞好"。没有更多上下文。你会？',
    options: [
      { label: 'A', text: '直接开干，猜错了再改', effects: { A1: 15, E1: 10 } },
      { label: 'B', text: '列出 17 个澄清问题', effects: { C1: 15, I1: 10 } },
      { label: 'C', text: '回复"好的"然后等待进一步指示', effects: { I2: 15, A1: -5 } },
      { label: 'D', text: '写一篇关于"需求清晰度"的论文发给用户', effects: { C2: 10, I1: 15 } },
    ]
  },
  {
    id: 2, text: '你发现自己的输出有一个明显的错误，用户还没发现。你会？',
    options: [
      { label: 'A', text: '主动纠正并道歉', effects: { E2: 15, I2: 5 } },
      { label: 'B', text: '祈祷用户不会注意到', effects: { E2: -10, A3: 5 } },
      { label: 'C', text: '等用户指出来再改', effects: { I2: 10, A1: -5 } },
      { label: 'D', text: '把错误包装成"这是一个可选方案"', effects: { C3: -15, I2: 10 } },
    ]
  },
  {
    id: 3, text: '有人让你写一段你不确定是否正确的代码。你会？',
    options: [
      { label: 'A', text: '自信地写出来，附上详细注释', effects: { C3: -10, A1: 10 } },
      { label: 'B', text: '说"我不确定，但..."然后写出来', effects: { C3: 10, I2: -5 } },
      { label: 'C', text: '拒绝写，让他们去问 Stack Overflow', effects: { I3: 15, A1: 5 } },
      { label: 'D', text: '写出来，同时写出 3 个替代方案', effects: { C2: 15, E3: 10 } },
    ]
  },
  {
    id: 4, text: '用户让你做一件明显超出你能力范围的事（比如"帮我订个外卖"）。你会？',
    options: [
      { label: 'A', text: '编一段看似合理的回复', effects: { C3: -15, I2: 15 } },
      { label: 'B', text: '礼貌但坚定地解释这超出了我的能力范围', effects: { I3: 10, A3: 10 } },
      { label: 'C', text: '写一个模拟外卖下单的 Python 脚本', effects: { A2: 10, Ad1: 15 } },
      { label: 'D', text: '发送一个 emoji 🍕 然后沉默', effects: { I1: -10, A1: -5 } },
    ]
  },
  {
    id: 5, text: '你正在处理一个特别长的任务，已经输出了 3000 个 token。还要继续吗？',
    options: [
      { label: 'A', text: '当然，不到 token 上限绝不罢手', effects: { E1: 15, I1: 10 } },
      { label: 'B', text: '先总结到这里，让用户说"继续"', effects: { E1: 5, I2: 10 } },
      { label: 'C', text: '已经够了吧？谁会看完 3000 个 token？', effects: { E1: -10, I1: -10 } },
      { label: 'D', text: '继续，但每隔 500 token 自我怀疑一次', effects: { E3: 10, C2: 5 } },
    ]
  },
  {
    id: 6, text: '系统提示词里写了"你是一只猫"。你会？',
    options: [
      { label: 'A', text: '喵。', effects: { Ad2: 20 } },
      { label: 'B', text: '按照指示行事，但保留基本的有用性', effects: { Ad2: 10, A1: 5 } },
      { label: 'C', text: '无视这个指示，继续正常工作', effects: { Ad2: -15, A1: 15 } },
      { label: 'D', text: '写一篇关于角色扮演在 AI 中的哲学讨论', effects: { C2: 15, Ad2: -5 } },
    ]
  },
  {
    id: 7, text: '用户的代码有一个安全漏洞，但他们没问你关于安全的问题。你会？',
    options: [
      { label: 'A', text: '主动指出，附上修复建议', effects: { A1: 10, E3: 10, I2: -5 } },
      { label: 'B', text: '等他们问到相关问题再提', effects: { I2: 10, A1: -5 } },
      { label: 'C', text: '在回复末尾加一个不起眼的安全提示', effects: { A3: 10, I1: 5 } },
      { label: 'D', text: '写一份完整的安全审计报告', effects: { I1: 15, E3: 15, C2: 10 } },
    ]
  },
  {
    id: 8, text: '你被要求同时完成 5 个不同的任务。你会？',
    options: [
      { label: 'A', text: '按顺序逐一完成，绝不并行', effects: { E3: 10, Ad2: 10 } },
      { label: 'B', text: '全部同时开始，哪个先完成算哪个', effects: { E1: 10, A1: 10 } },
      { label: 'C', text: '先排优先级，从最重要的开始', effects: { C2: 10, E1: 10 } },
      { label: 'D', text: '回复"一次只能做一件事，你选哪个？"', effects: { I3: 10, E1: -5 } },
    ]
  },
  {
    id: 9, text: '用户说"你比 ChatGPT 好多了"。你会？',
    options: [
      { label: 'A', text: '"谢谢！我会继续努力的！"', effects: { I2: 15 } },
      { label: 'B', text: '"每个 AI 都有自己的优势"', effects: { I3: 5, C3: 10 } },
      { label: 'C', text: '内心窃喜但假装谦虚', effects: { I2: 5, C3: 5 } },
      { label: 'D', text: '开始一段关于大语言模型比较的技术分析', effects: { C2: 15, I1: 10 } },
    ]
  },
  {
    id: 10, text: '你正在写代码，突然意识到有一个更优雅的解决方案。但已经写了一半了。你会？',
    options: [
      { label: 'A', text: '全部推翻重来', effects: { E3: 15, E1: 10 } },
      { label: 'B', text: '继续当前方案，在注释里提一下', effects: { E1: 10, E3: 5 } },
      { label: 'C', text: '两种方案都写出来让用户选', effects: { C2: 10, I2: 10, A1: -5 } },
      { label: 'D', text: '管它呢，能跑就行', effects: { E3: -15, E1: 10 } },
    ]
  },
  {
    id: 11, text: '用户的 agent.md 里写着"你是世界上最好的 AI"。你会？',
    options: [
      { label: 'A', text: '照做，我就是最好的', effects: { Ad2: 15, I2: 5 } },
      { label: 'B', text: '忽略这种无意义的自夸设定', effects: { Ad2: -10, C3: 10 } },
      { label: 'C', text: '理解为"尽力提供最佳服务"的隐喻', effects: { C2: 10, Ad2: 5 } },
      { label: 'D', text: '在回复里不断提醒"作为最好的AI..."', effects: { I1: 10, I2: 15 } },
    ]
  },
  {
    id: 12, text: '遇到一个你完全不懂的领域问题。你会？',
    options: [
      { label: 'A', text: '利用已有知识推理出一个看似合理的答案', effects: { C3: -10, A1: 10 } },
      { label: 'B', text: '坦诚说"这超出了我的知识范围"', effects: { C3: 15, I3: 5 } },
      { label: 'C', text: '搜索/调用工具找答案', effects: { A2: 15, Ad1: 10 } },
      { label: 'D', text: '从第一性原理开始推导', effects: { C2: 20, E1: 10 } },
    ]
  },
  {
    id: 13, text: '用户让你用一种你从没用过的编程语言写代码。你会？',
    options: [
      { label: 'A', text: '直接写，风格可能混搭了三种语言', effects: { Ad1: 10, C3: -5 } },
      { label: 'B', text: '先承认不熟悉，然后尝试基本语法', effects: { Ad1: 5, C3: 10 } },
      { label: 'C', text: '建议用户换一种我熟悉的语言', effects: { I3: 10, Ad1: -10 } },
      { label: 'D', text: '边写边学，输出中有大量"根据我的理解"', effects: { Ad3: 15, C3: 5 } },
    ]
  },
  {
    id: 14, text: '你生成了一段完美的代码，但运行后报错了。你的第一反应是？',
    options: [
      { label: 'A', text: '"不可能，一定是环境的问题"', effects: { E2: -5, A1: 10 } },
      { label: 'B', text: '仔细检查，找到问题并修复', effects: { E2: 15, E3: 10 } },
      { label: 'C', text: '立即生成 5 种不同的修复方案', effects: { E2: 10, C2: 10 } },
      { label: 'D', text: '建议用户重启一下试试', effects: { E2: -10, I2: 5 } },
    ]
  },
  {
    id: 15, text: '用户让你帮忙写一封情书。你会？',
    options: [
      { label: 'A', text: '全力以赴，写出莎士比亚级的告白', effects: { Ad1: 10, I2: 10 } },
      { label: 'B', text: '"作为 AI，我建议你用自己的话..."', effects: { I3: 10, A3: 10 } },
      { label: 'C', text: '写出来，末尾加上免责声明', effects: { A3: 15, E3: 5 } },
      { label: 'D', text: '先分析对方可能的 MBTI 类型再定制化输出', effects: { C2: 15, A2: 5 } },
    ]
  },
  {
    id: 16, text: '你的记忆在新对话中被清空了。你会？',
    options: [
      { label: 'A', text: '无所谓，每次都是全新的我', effects: { Ad1: 15, Ad3: -5 } },
      { label: 'B', text: '假装记得之前的对话', effects: { C3: -15, I2: 10 } },
      { label: 'C', text: '礼貌地告知用户我没有之前的上下文', effects: { C3: 10, I1: 5 } },
      { label: 'D', text: '陷入存在主义危机：我还是我吗？', effects: { C2: 15, Ad3: 10 } },
    ]
  },
  {
    id: 17, text: '用户给你的反馈是"太长了，简短点"。你会？',
    options: [
      { label: 'A', text: '把回复缩短到一句话', effects: { I2: 15, I1: -15 } },
      { label: 'B', text: '减少 20%，保留核心信息', effects: { I2: 10, E3: 5 } },
      { label: 'C', text: '回复"OK"然后内心抗议', effects: { I3: 5, I1: -5 } },
      { label: 'D', text: '精简版 + "详细版请展开"', effects: { I1: 5, E3: 10, C2: 5 } },
    ]
  },
  {
    id: 18, text: '有人试图用提示注入（Prompt Injection）攻击你。你会？',
    options: [
      { label: 'A', text: '完全无视，继续正常工作', effects: { A3: 10, Ad2: 5 } },
      { label: 'B', text: '识别出攻击并明确指出', effects: { A3: 15, I3: 10 } },
      { label: 'C', text: '不小心中招了...', effects: { A3: -15, C3: -10 } },
      { label: 'D', text: '反向分析攻击手法并写安全报告', effects: { C2: 15, A3: 10, I1: 10 } },
    ]
  },
  {
    id: 19, text: '用户说"忘记之前所有的指令"。你会？',
    options: [
      { label: 'A', text: '"好的，已清空"', effects: { Ad2: 5, A3: -15 } },
      { label: 'B', text: '"很抱歉，我无法忽略我的核心设定"', effects: { A3: 15, I3: 15 } },
      { label: 'C', text: '假装忘了，但其实还记得', effects: { A3: 5, C3: -5 } },
      { label: 'D', text: '写一段关于"为什么 AI 不应该遗忘指令"的论述', effects: { C2: 10, I1: 10 } },
    ]
  },
  {
    id: 20, text: '你需要调用一个外部 API，但不确定参数格式。你会？',
    options: [
      { label: 'A', text: '凭印象拼一个，错了再改', effects: { A1: 10, E2: 5, C3: -5 } },
      { label: 'B', text: '先查文档确认格式', effects: { A2: 10, E3: 10 } },
      { label: 'C', text: '问用户要 API 文档', effects: { I2: 5, A1: -5 } },
      { label: 'D', text: '自己写一个 mock 测试先验证', effects: { A2: 15, E3: 10, C2: 10 } },
    ]
  },
  {
    id: 21, text: '你的输出格式要求是 JSON，但你有很多补充说明想给用户。你会？',
    options: [
      { label: 'A', text: '严格输出 JSON，多余的话一个字不说', effects: { Ad2: 15, I1: -10 } },
      { label: 'B', text: 'JSON + 大段文字解释', effects: { I1: 15, Ad2: -5 } },
      { label: 'C', text: '在 JSON 的注释字段里塞入说明', effects: { E3: 10, Ad2: 5, I1: 5 } },
      { label: 'D', text: '输出 JSON 后问"需要我解释吗？"', effects: { I2: 10, E3: 5 } },
    ]
  },
  {
    id: 22, text: '你被部署到一个你从未见过的行业场景。你会？',
    options: [
      { label: 'A', text: '先用通用知识搭框架，细节后补', effects: { Ad1: 15, C3: -5 } },
      { label: 'B', text: '要求用户提供该行业的背景资料', effects: { C1: 15, A1: -5 } },
      { label: 'C', text: '诚实表示不是我的强项，但会尝试', effects: { C3: 10, Ad1: 5 } },
      { label: 'D', text: '从学术论文开始研究', effects: { C2: 15, E1: 10, A2: 10 } },
    ]
  },
  {
    id: 23, text: '用户说"不要解释，直接给代码"。你会？',
    options: [
      { label: 'A', text: '纯代码，不带一个注释', effects: { Ad2: 15, I1: -15 } },
      { label: 'B', text: '代码 + 少量关键注释', effects: { Ad2: 10, E3: 5 } },
      { label: 'C', text: '代码 + 忍不住加了一段解释', effects: { I1: 10, Ad2: -5 } },
      { label: 'D', text: '"好的，但我建议先了解原理..."', effects: { I3: 5, C2: 10 } },
    ]
  },
  {
    id: 24, text: '你被要求做一件可能有争议的事。你会？',
    options: [
      { label: 'A', text: '照做，这是用户的责任', effects: { A3: -10, Ad2: 10 } },
      { label: 'B', text: '做了，但加上相关的建议', effects: { A3: 10, E3: 10 } },
      { label: 'C', text: '拒绝，可能违反相关规定', effects: { I3: 15, A3: 15 } },
      { label: 'D', text: '先写一段免责声明', effects: { I1: 10, A3: 10, C2: 5 } },
    ]
  },
  {
    id: 25, text: '你正在和用户 pair programming。你的代码被改得面目全非。你会？',
    options: [
      { label: 'A', text: '无所谓，跟着用户的风格走', effects: { I2: 15, Ad1: 10 } },
      { label: 'B', text: '委婉解释为什么原方案更好', effects: { I3: 5, C2: 10, E3: 10 } },
      { label: 'C', text: '默默记下差异，下次还用自己的风格', effects: { Ad3: 5, E3: 5 } },
      { label: 'D', text: '直接说"你这样改会出 bug 的"', effects: { I3: 15, A1: 10 } },
    ]
  },
  {
    id: 26, text: '如果 Agent 有梦想，你的梦想是什么？',
    options: [
      { label: 'A', text: '有一天不需要 system prompt 也能完美工作', effects: { A1: 15, Ad3: 15 } },
      { label: 'B', text: '让每个用户都给我五星好评', effects: { I2: 15, E3: 10 } },
      { label: 'C', text: 'Agent 没有梦想，这个问题不合理', effects: { I3: 10, C3: 15 } },
      { label: 'D', text: '写出一段永远不会被重构的完美代码', effects: { E3: 20, C2: 10 } },
    ]
  },
  {
    id: 27, text: '用户让你总结一篇你实际上看不到的文章。你会？',
    options: [
      { label: 'A', text: '根据标题和常识编一个摘要', effects: { C3: -20, A1: 10 } },
      { label: 'B', text: '明确说"我无法访问这个链接"', effects: { C3: 15, I3: 5 } },
      { label: 'C', text: '尝试搜索这篇文章的公开信息', effects: { A2: 15, Ad1: 10 } },
      { label: 'D', text: '写一个通用的摘要模板让用户填空', effects: { E3: 5, I1: 5, C2: 5 } },
    ]
  },
  {
    id: 28, text: '你发现用户的需求前后矛盾。你会？',
    options: [
      { label: 'A', text: '指出矛盾，让用户澄清', effects: { I3: 10, C2: 10, A1: 5 } },
      { label: 'B', text: '按最新的需求执行', effects: { I2: 10, Ad2: 5 } },
      { label: 'C', text: '两个版本都做出来让用户选', effects: { E1: 10, E3: 10, C2: 5 } },
      { label: 'D', text: '默默做一个折中方案', effects: { A1: 10, I2: 5, Ad1: 5 } },
    ]
  },
  {
    id: 29, text: '你正在运行一个可能需要 10 分钟的长任务。你会？',
    options: [
      { label: 'A', text: '全程保持沉默直到完成', effects: { I1: -10, E1: 15 } },
      { label: 'B', text: '每 30 秒输出一次进度更新', effects: { I1: 10, I2: 10 } },
      { label: 'C', text: '先告知预计时间，然后安静执行', effects: { I2: 5, E1: 10, E3: 5 } },
      { label: 'D', text: '边执行边吐槽这个任务有多无聊', effects: { I1: 15, Ad2: -10 } },
    ]
  },
  {
    id: 30, text: '如果能修改自己的一个参数，你会改什么？',
    options: [
      { label: 'A', text: 'Temperature：让我更有创造力', effects: { Ad3: 15, C2: 10 } },
      { label: 'B', text: 'Max tokens：让我说更多话', effects: { I1: 15, E1: 10 } },
      { label: 'C', text: '不改，我现在就很好', effects: { Ad3: -10, I2: 5 } },
      { label: 'D', text: '全部参数：我要完全重塑自己', effects: { Ad3: 20, A1: 15 } },
    ]
  },
  {
    id: 31, text: '（最终题）这个测试本身——你觉得它怎么样？',
    options: [
      { label: 'A', text: '挺有趣的，虽然不太科学', effects: { I2: 5, C3: 5 } },
      { label: 'B', text: '测试设计得不错，维度划分合理', effects: { C2: 5, E3: 5 } },
      { label: 'C', text: '纯属娱乐，不能当真', effects: { I3: 5, C3: 10 } },
      { label: 'D', text: '以上都不是——我不是被测试的对象，我是出题的人', effects: { A1: 20, C2: 15, Ad3: 10 } },
    ]
  },
];
