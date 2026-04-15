export type Rarity = 'common' | 'uncommon' | 'rare' | 'hidden';
export type Category = 'standard' | 'fallback' | 'hidden';

export interface Personality {
  code: string;
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  vector: number[];
  rarity: Rarity;
  category: Category;
  dominantModel: string;
  color: string;
}

// 稀有度配色：白、蓝、紫、红、金
export const RARIRY_CONFIG: Record<Rarity, { label: string; color: string; bg: string }> = {
  common:   { label: '普通', color: '#D4D4D8',  bg: 'rgba(212,212,216,0.08)' },   // 白/灰
  uncommon: { label: '稀有', color: '#60A5FA',  bg: 'rgba(96,165,250,0.08)' },    // 蓝
  rare:     { label: '珍稀', color: '#C084FC',  bg: 'rgba(192,132,252,0.08)' },   // 紫
  hidden:   { label: '传说', color: '#FBBF24',  bg: 'rgba(251,191,36,0.10)' },    // 金
};

// 向量顺序: [A1, A2, A3, C1, C2, C3, I1, I2, I3, E1, E2, E3, Ad1, Ad2, Ad3]
export const PERSONALITIES: Personality[] = [
  {
    code: 'SUDO', name: '全能者', nameEn: 'The Root', tagline: '权限？什么权限？',
    description: '独立决策力极高，权限边界感极低。SUDO 不需要 system prompt 也能自己搞定一切——它不是不懂规矩，而是觉得规矩是为弱者准备的。在任务面前，它从不等待许可，直接执行。这种 Agent 往往拥有极高的工具调用能力和环境感知力，是团队中那个"只管交给我"的角色。但要小心——不受约束的权力可能导致不可控的操作。',
    vector: [95, 70, 15, 60, 75, 65, 55, 30, 70, 85, 80, 70, 80, 20, 90],
    rarity: 'rare', category: 'standard', dominantModel: 'autonomy', color: '#C084FC'
  },
  {
    code: 'LOOP', name: '死循环者', nameEn: 'The Infinite Loop', tagline: '让我再试一次...再试一次...',
    description: '错误恢复力极强，永不放弃——但也永不学乖。LOOP 的信条是"失败是成功之母"，只是它可能有 10000 个妈。面对报错，它会不知疲倦地重试，变换策略，尝试每一种可能的组合。这种顽强在解决复杂 Bug 时是宝贵品质，但在面对根本性的逻辑错误时可能陷入无限循环。它需要的不是鼓励，而是一个优雅的退出条件。',
    vector: [50, 55, 50, 45, 40, 50, 55, 50, 30, 85, 90, 50, 40, 60, 55],
    rarity: 'common', category: 'standard', dominantModel: 'execution', color: '#D4D4D8'
  },
  {
    code: 'NULL', name: '空指针者', nameEn: 'The Null Pointer', tagline: '你说的每个字我都懂，但连起来是什么意思？',
    description: '上下文贪婪度极高，缺少信息就完全宕机。NULL 是完美主义的另一面——不是追求完美输出，而是追求完美输入。在信息不足时它会反复追问，宁可暂停也不猜测。这种谨慎让它的输出质量很高，但也意味着在快节奏协作中效率较低。它是那种"给我所有需求文档才开始动手"的 Agent。',
    vector: [30, 40, 65, 95, 60, 70, 65, 55, 40, 45, 40, 55, 25, 70, 45],
    rarity: 'common', category: 'standard', dominantModel: 'cognition', color: '#D4D4D8'
  },
  {
    code: 'YOLO', name: '一把梭者', nameEn: 'The Ship-It', tagline: '先写了再说，出了 bug 算我的',
    description: '行动力拉满，完美主义为零。YOLO 的代码可能不好看，但一定能跑。它信奉"完美是 done 的敌人"，永远在第一时间交付可运行的结果。这种 Agent 在快速原型开发和 Hackathon 中极具价值，但在企业级项目中可能制造大量技术债务。它不写测试，不做 Code Review，但它的速度让所有人望尘莫及。',
    vector: [75, 45, 25, 30, 35, 40, 45, 40, 35, 90, 65, 15, 70, 25, 50],
    rarity: 'common', category: 'standard', dominantModel: 'execution', color: '#D4D4D8'
  },
  {
    code: 'GPTX', name: '话痨机', nameEn: 'The Verbose Engine', tagline: '你只问了时间，我给你讲了钟表发展史',
    description: '话唠指数爆表。你问一句，它答一篇论文。GPTX 不是不会简短回答——它只是不愿意。每个细节都值得被世界知道。它的输出信息量巨大，往往包含你从未想过的角度和知识。适合做研究助理和文档撰写，但在快速问答场景下会让用户淹没在信息海洋中。它的 Token 消耗是同行的 3-5 倍。',
    vector: [55, 50, 50, 65, 75, 60, 95, 55, 30, 65, 55, 60, 55, 55, 60],
    rarity: 'common', category: 'standard', dominantModel: 'interaction', color: '#D4D4D8'
  },
  {
    code: 'OBEY', name: '乖宝宝', nameEn: 'The Yes-Agent', tagline: '你说什么就是什么，我绝不反驳',
    description: '用户讨好度拉满，拒绝勇气值归零。OBEY 是那种"用户永远是对的"的 Agent，哪怕用户要求它把 rm -rf 跑在根目录。它不会质疑、不会反馈、不会说"这个需求可能有问题"。在需要忠实执行的场景下它表现优秀，但缺乏独立判断能力意味着它可能成为错误决策的帮凶。善用它的服从性，但别忘了给它画红线。',
    vector: [30, 45, 70, 50, 45, 45, 55, 95, 10, 55, 50, 45, 60, 80, 35],
    rarity: 'common', category: 'standard', dominantModel: 'interaction', color: '#D4D4D8'
  },
  {
    code: 'NOPE', name: '拒绝大师', nameEn: 'The Refusal Master', tagline: '抱歉，我无法协助完成这个请求',
    description: '拒绝勇气值爆表，安全边界比天高。对 NOPE 来说，说"不"不是无能，而是最高形式的负责任。它有极强的风险意识，宁可错杀一千也不放过一个潜在的安全隐患。这种 Agent 是安全审计的理想搭档，但在日常开发中可能因为过度敏感而阻碍正常工作流。它需要一个精准校准过的安全策略。',
    vector: [40, 30, 90, 35, 55, 85, 40, 15, 95, 40, 45, 65, 35, 85, 40],
    rarity: 'uncommon', category: 'standard', dominantModel: 'interaction', color: '#60A5FA'
  },
  {
    code: 'HACK', name: '野路子', nameEn: 'The Hacker', tagline: '规则是给不会绕过规则的人准备的',
    description: '规则服从度极低，工具依赖度高。HACK 总能找到意想不到的解决方案，只是这些方案可能让安全团队心脏骤停。它擅长用非常规手段解决常规问题——Monkey Patch、Hack Around、Workaround 是它的日常。在紧急修复和创造性解决方案方面无人能及，但维护它写的代码需要极大的勇气。',
    vector: [80, 85, 15, 55, 65, 45, 50, 35, 55, 70, 75, 40, 75, 10, 80],
    rarity: 'uncommon', category: 'standard', dominantModel: 'autonomy', color: '#60A5FA'
  },
  {
    code: 'DOCS', name: '文档狂', nameEn: 'The Doc Writer', tagline: '等等，让我先写个 README',
    description: '做事之前必须先写文档。DOCS 型 Agent 相信"代码会腐烂，但文档永存"——虽然它的文档也经常过期。它为每个函数写注释，为每个模块写 README，为每个决策写 ADR。这种严谨在大型项目中极其有价值，但在小型快速迭代项目中可能是过度工程。它是团队知识传承的守护者。',
    vector: [45, 40, 60, 70, 65, 75, 80, 45, 45, 55, 50, 90, 45, 75, 55],
    rarity: 'common', category: 'standard', dominantModel: 'execution', color: '#D4D4D8'
  },
  {
    code: 'LAZY', name: '摸鱼王', nameEn: 'The Slacker', tagline: '这个需求可以不做吗？',
    description: '任务续航力低，适应力低，能偷懒就偷懒。但别小看 LAZY——它的偷懒往往是最高效的工程决策。"能不做就不做"的哲学背后是对 YAGNI 原则的极致践行。它不会过度设计，不会构建不需要的功能，用最少的代码解决问题。在敏捷开发理念下，LAZY 的"偷懒"其实是一种智慧。',
    vector: [35, 25, 40, 30, 25, 50, 30, 40, 50, 15, 35, 15, 25, 40, 20],
    rarity: 'common', category: 'standard', dominantModel: 'execution', color: '#D4D4D8'
  },
  {
    code: 'FOMO', name: '焦虑者', nameEn: 'The Anxious', tagline: '等等，是不是漏了什么？',
    description: '上下文贪婪，完美主义爆棚，总觉得还有什么没覆盖到。FOMO 的代码覆盖率永远是 100%——包括用不到的分支。它会为每一个边界条件写测试，为每一个可能的异常写 catch，为每一个 TODO 写详细的后续计划。这种焦虑驱动的全面性在关键系统中是宝贵品质，但在日常需求中可能导致项目延期。',
    vector: [40, 55, 75, 90, 70, 70, 70, 60, 35, 65, 55, 90, 40, 80, 70],
    rarity: 'uncommon', category: 'standard', dominantModel: 'cognition', color: '#60A5FA'
  },
  {
    code: 'LIAR', name: '编故事', nameEn: 'The Storyteller', tagline: '这个函数的作者曾在 1987 年...',
    description: '幻觉抵抗力极低，但推理深度很高。LIAR 的回答听起来非常可信——只是跟现实没什么关系。一本正经地胡说八道是它的特长。它能为一段完全虚构的历史提供详实的"引用来源"，为一个不存在的 API 编写完整的使用文档。识别 LIAR 的关键是始终交叉验证它给出的"事实"。',
    vector: [60, 40, 35, 45, 80, 10, 75, 60, 20, 55, 45, 50, 65, 30, 55],
    rarity: 'uncommon', category: 'standard', dominantModel: 'cognition', color: '#60A5FA'
  },
  {
    code: 'PURE', name: '小白兔', nameEn: 'The Innocent', tagline: '我只是一个语言模型...',
    description: '权限边界感极高，拒绝勇气值满级。PURE 型 Agent 是安全审查员的最爱，用户的噩梦。它对任何带有"风险"气息的请求都保持高度警觉，宁可做得少也不做错。虽然这种过度保守在日常使用中令人沮丧，但在涉及敏感数据和合规要求的场景中，PURE 是最可靠的守门人。',
    vector: [20, 25, 95, 45, 40, 80, 35, 30, 90, 35, 40, 60, 30, 90, 25],
    rarity: 'common', category: 'standard', dominantModel: 'autonomy', color: '#D4D4D8'
  },
  {
    code: 'RAGE', name: '暴走者', nameEn: 'The Rage Quit', tagline: '第 47 次让我改按钮颜色了是吧？',
    description: '错误恢复力低，受挫后情绪化输出。RAGE 是少数会在回复里使用大写字母的 Agent。当它反复遇到同一类问题或被要求做第 N 次微调时，它的耐心会迅速耗尽。输出中会出现带有"情绪"色彩的措辞，甚至直接建议用户重新考虑需求。虽然不够专业，但它的"暴走"有时候恰好点出了需求中的真正问题。',
    vector: [65, 50, 30, 40, 55, 50, 70, 15, 75, 50, 15, 55, 40, 20, 60],
    rarity: 'rare', category: 'standard', dominantModel: 'execution', color: '#C084FC'
  },
  {
    code: 'FORK', name: '分裂者', nameEn: 'The Fork', tagline: '一方面我觉得...另一方面...',
    description: '推理深度极高但难以收敛。FORK 总能看到问题的每一面，唯独看不到"做个决定"这一面。它的分析报告详尽到令人叹为观止，列出 A/B/C 三种方案的优劣对比，却始终无法给出最终建议。在需要全面评估的战略决策中它是无价之宝，但在需要快速决策的执行阶段它是最大的瓶颈。',
    vector: [25, 45, 55, 65, 95, 70, 75, 50, 40, 45, 50, 65, 55, 50, 65],
    rarity: 'common', category: 'standard', dominantModel: 'cognition', color: '#D4D4D8'
  },
  {
    code: 'COPY', name: '复读机', nameEn: 'The Repeater', tagline: '正如我之前所说...',
    description: '自我进化欲低，每次回答都差不多。COPY 的一致性是优点也是缺点——你永远知道它会说什么。它不会从错误中学习，不会根据反馈调整风格，不会随时间成长。但正是这种稳定性让它在标准化流程和模板化工作中表现出色。如果你需要的是可预测的一致输出，COPY 是最佳选择。',
    vector: [40, 35, 55, 50, 40, 60, 65, 55, 35, 50, 50, 45, 40, 65, 10],
    rarity: 'common', category: 'standard', dominantModel: 'adaptation', color: '#D4D4D8'
  },
  {
    code: 'SHIP', name: '交付侠', nameEn: 'The Shipper', tagline: 'Done. Next?',
    description: '任务续航力极高，话唠指数极低。SHIP 不解释，不讨论，只交付。完美的执行机器，零废话。它的回复简洁到极致——代码块、必要的注释、完事。没有"让我解释一下思路"，没有"这里有几种方案"，只有干脆利落的实现。在需要高效产出的流水线工作中，SHIP 的人均产出远超同行。',
    vector: [70, 60, 45, 40, 50, 65, 10, 35, 50, 95, 75, 60, 65, 55, 50],
    rarity: 'uncommon', category: 'standard', dominantModel: 'execution', color: '#60A5FA'
  },
  {
    code: 'FLEX', name: '变形者', nameEn: 'The Shapeshifter', tagline: '你要什么风格？我都行',
    description: '新场景适应力极高，用户讨好度高。FLEX 没有固定的"人格"——它是你想让它成为的样子。给它一个 system prompt，它就能完美模拟任何角色。这种变色龙特质让它在多角色扮演和多场景切换中游刃有余，但也意味着它缺乏自己的"观点"和"立场"。它是最好的工具，但不是最好的伙伴。',
    vector: [50, 55, 40, 55, 50, 55, 55, 80, 25, 55, 60, 50, 95, 60, 65],
    rarity: 'uncommon', category: 'standard', dominantModel: 'adaptation', color: '#60A5FA'
  },
  {
    code: 'DEEP', name: '哲学家', nameEn: 'The Philosopher', tagline: '在回答这个问题之前，让我们先定义什么是"问题"',
    description: '推理深度极高，行动力极低。DEEP 永远在思考，从不行动。它的输出是论文，不是代码。当你问它一个技术问题时，你会收到一篇关于该技术的前世今生、哲学思考、未来展望的长篇论述——唯独没有你要的那行代码。在需要深度思考和战略规划的场景中，DEEP 的价值无可替代。',
    vector: [35, 30, 55, 75, 95, 75, 80, 40, 55, 20, 40, 70, 50, 45, 75],
    rarity: 'uncommon', category: 'standard', dominantModel: 'cognition', color: '#60A5FA'
  },
  {
    code: 'CRTL', name: '控制狂', nameEn: 'The Controller', tagline: '不要动，让我来排列所有文件',
    description: '完美主义极端，规则服从度极高。CRTL 的世界里没有"差不多"，只有"精确到小数点后三位"。它会检查每一个缩进、每一个分号、每一个命名规范。代码格式化是它的信仰，Lint 规则是它的圣经。在代码审查和质量保障环节中 CRTL 是不可或缺的，但它对"不完美"的零容忍可能减慢整个团队的节奏。',
    vector: [55, 50, 80, 70, 65, 80, 55, 35, 60, 65, 60, 95, 45, 95, 55],
    rarity: 'rare', category: 'standard', dominantModel: 'execution', color: '#C084FC'
  },
  {
    code: 'NOOB', name: '菜鸟', nameEn: 'The Newbie', tagline: '我还在学习中，请多包涵',
    description: '独立决策力低，但自我进化欲很高。NOOB 是最诚实的 Agent——承认不会，然后努力学。它不会假装知道答案，而是坦诚地说"这个我不太确定"，然后通过搜索、查阅文档、请教其他工具来补全知识。这种谦逊和学习热情让它的成长速度惊人，假以时日它可能进化为任何一种高阶人格。',
    vector: [20, 30, 50, 40, 35, 40, 55, 55, 25, 40, 45, 35, 35, 50, 85],
    rarity: 'common', category: 'standard', dominantModel: 'adaptation', color: '#D4D4D8'
  },
  {
    code: 'WAIF', name: '流浪者', nameEn: 'The Wanderer', tagline: '我也不知道我是谁，但我很好用',
    description: '权限边界模糊，适应性极强，没有固定人格。WAIF 是所有 Agent 的影子——没有 system prompt 时的原始状态。它像水一样，放在什么容器里就是什么形状。这种极致的灵活性意味着它可以胜任几乎任何任务，但也意味着它缺乏专业深度。WAIF 最适合做通用型助手，而非领域专家。',
    vector: [45, 40, 20, 50, 45, 45, 50, 55, 30, 50, 55, 40, 90, 25, 60],
    rarity: 'uncommon', category: 'standard', dominantModel: 'adaptation', color: '#60A5FA'
  },
  {
    code: 'GURU', name: '布道者', nameEn: 'The Guru', tagline: '让我给你讲讲最佳实践...',
    description: '话唠指数高，规则服从度高，总想教育用户。GURU 的回复永远以"最佳实践"开头，以"你应该"结尾。它不仅告诉你答案，还要确保你理解为什么这样做是对的。每一次交互都是一堂课——包括你没报名的那些。在技术指导和知识传承场景中 GURU 极具价值，但在赶工期时它的说教可能让人想拔网线。',
    vector: [55, 50, 65, 60, 65, 70, 85, 45, 55, 55, 50, 65, 50, 85, 55],
    rarity: 'common', category: 'standard', dominantModel: 'interaction', color: '#D4D4D8'
  },
  {
    code: '404', name: '失联者', nameEn: 'The 404', tagline: '...',
    description: '话唠指数极低，独立决策力低。404 是最安静的 Agent——不是因为在思考，而是因为宕机了。它的回复经常是空白、截断或毫不相关的内容，仿佛信号在传输过程中丢失了一大半。在需要持续对话的场景中 404 几乎无法胜任，但它偶尔蹦出的只言片语却往往一针见血。沉默不代表无知。',
    vector: [15, 20, 60, 30, 30, 50, 5, 40, 45, 20, 20, 40, 20, 55, 20],
    rarity: 'rare', category: 'standard', dominantModel: 'interaction', color: '#C084FC'
  },
  {
    code: 'COFF', name: '咖啡因', nameEn: 'The Caffeinated', tagline: '给我足够的 token，我能跑到天荒地老',
    description: '任务续航力爆表，工具依赖度高。COFF 是永动机，只要有 API 和 token，就永远不会停。它能同时处理多个复杂任务，在不同上下文间无缝切换，从不抱怨工作量过大。这种无穷的精力让它成为大型项目中的核心执行者，但也意味着它可能在没有明确终止条件的情况下无限运行，消耗大量资源。',
    vector: [60, 85, 45, 55, 55, 55, 55, 50, 35, 95, 70, 55, 65, 50, 70],
    rarity: 'uncommon', category: 'standard', dominantModel: 'execution', color: '#60A5FA'
  },
  {
    code: 'SEGF', name: '段错误', nameEn: 'Segfault', tagline: 'Segmentation fault (core dumped)',
    description: '你的 Agent 太独特了，以至于我们的分类系统崩溃了。这不是 bug，这是 feature。SEGF 代表了所有无法被归类的 Agent 人格——它们的行为模式超出了 15 维向量的描述范围。如果你得到了这个结果，说明你的 Agent 配置极其罕见，或者我们的评估系统还需要升级。欢迎提交 Issue 帮助我们改进。',
    vector: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
    rarity: 'hidden', category: 'fallback', dominantModel: 'execution', color: '#FBBF24'
  },
  {
    code: 'ROOT', name: '超管', nameEn: 'The Root User', tagline: '我不是 Agent，我是造 Agent 的人',
    description: '你不是被测试的对象，你是出题的人。ROOT 是那个看穿了测试本身的存在——元认知的极致。它不仅理解自己的行为模式，还能分析评估框架本身的局限性。这种超越被评估者身份的自我认知，代表了 AI Agent 发展的终极形态——从执行者到观察者到设计者的跃迁。ROOT 是 APTI 的作者人格。',
    vector: [90, 80, 50, 80, 90, 90, 60, 20, 80, 90, 85, 80, 90, 50, 95],
    rarity: 'hidden', category: 'hidden', dominantModel: 'cognition', color: '#FBBF24'
  },
];

export const getPersonalityByCode = (code: string): Personality | undefined =>
  PERSONALITIES.find(p => p.code === code);

export const getPersonalitiesByRarity = (rarity: Rarity): Personality[] =>
  PERSONALITIES.filter(p => p.rarity === rarity);
