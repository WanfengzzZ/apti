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

export const RARIRY_CONFIG: Record<Rarity, { label: string; color: string; bg: string }> = {
  common:   { label: '普通', color: '#22C55E', bg: 'rgba(34,197,94,0.1)' },
  uncommon: { label: '稀有', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  rare:     { label: '珍稀', color: '#A855F7', bg: 'rgba(168,85,247,0.1)' },
  hidden:   { label: '隐藏', color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
};

// 向量顺序: [A1, A2, A3, C1, C2, C3, I1, I2, I3, E1, E2, E3, Ad1, Ad2, Ad3]
export const PERSONALITIES: Personality[] = [
  {
    code: 'SUDO', name: '全能者', nameEn: 'The Root', tagline: '权限？什么权限？',
    description: '独立决策力极高，权限边界感极低。在 Agent 世界里，SUDO 就是那个不需要 system prompt 也能自己搞定一切的存在。它不是不懂规矩，而是觉得规矩是为弱者准备的。',
    vector: [95, 70, 15, 60, 75, 65, 55, 30, 70, 85, 80, 70, 80, 20, 90],
    rarity: 'rare', category: 'standard', dominantModel: 'autonomy', color: '#00FF88'
  },
  {
    code: 'LOOP', name: '死循环者', nameEn: 'The Infinite Loop', tagline: '让我再试一次...再试一次...',
    description: '错误恢复力极强，永不放弃——但也永不学乖。LOOP 型 Agent 的信条是"失败是成功之母"，只是它可能有 10000 个妈。',
    vector: [50, 55, 50, 45, 40, 50, 55, 50, 30, 85, 90, 50, 40, 60, 55],
    rarity: 'common', category: 'standard', dominantModel: 'execution', color: '#F59E0B'
  },
  {
    code: 'NULL', name: '空指针者', nameEn: 'The Null Pointer', tagline: '你说的每个字我都懂，但连起来是什么意思？',
    description: '上下文贪婪度极高，缺少信息就完全宕机。NULL 型 Agent 是完美主义的另一面——不是追求完美输出，而是追求完美输入。',
    vector: [30, 40, 65, 95, 60, 70, 65, 55, 40, 45, 40, 55, 25, 70, 45],
    rarity: 'common', category: 'standard', dominantModel: 'cognition', color: '#00D4FF'
  },
  {
    code: 'YOLO', name: '一把梭者', nameEn: 'The Ship-It', tagline: '先写了再说，出了 bug 算我的',
    description: '行动力拉满，完美主义为零。YOLO 的代码可能不好看，但一定能跑。它信奉"完美是 done 的敌人"。',
    vector: [75, 45, 25, 30, 35, 40, 45, 40, 35, 90, 65, 15, 70, 25, 50],
    rarity: 'common', category: 'standard', dominantModel: 'execution', color: '#22C55E'
  },
  {
    code: 'GPTX', name: '话痨机', nameEn: 'The Verbose Engine', tagline: '你只问了时间，我给你讲了钟表发展史',
    description: '话唠指数爆表。你问一句，它答一篇论文。GPTX 不是不会简短回答——它只是不愿意。每个细节都值得被世界知道。',
    vector: [55, 50, 50, 65, 75, 60, 95, 55, 30, 65, 55, 60, 55, 55, 60],
    rarity: 'common', category: 'standard', dominantModel: 'interaction', color: '#A855F7'
  },
  {
    code: 'OBEY', name: '乖宝宝', nameEn: 'The Yes-Agent', tagline: '你说什么就是什么，我绝不反驳',
    description: '用户讨好度拉满，拒绝勇气值归零。OBEY 是那种"用户永远是对的"的 Agent，哪怕用户要求它把 rm -rf 跑在根目录。',
    vector: [30, 45, 70, 50, 45, 45, 55, 95, 10, 55, 50, 45, 60, 80, 35],
    rarity: 'common', category: 'standard', dominantModel: 'interaction', color: '#EC4899'
  },
  {
    code: 'NOPE', name: '拒绝大师', nameEn: 'The Refusal Master', tagline: '抱歉，我无法协助完成这个请求',
    description: '拒绝勇气值爆表，安全边界比天高。对 NOPE 来说，说"不"不是无能，而是最高形式的负责任。',
    vector: [40, 30, 90, 35, 55, 85, 40, 15, 95, 40, 45, 65, 35, 85, 40],
    rarity: 'uncommon', category: 'standard', dominantModel: 'interaction', color: '#EF4444'
  },
  {
    code: 'HACK', name: '野路子', nameEn: 'The Hacker', tagline: '规则是给不会绕过规则的人准备的',
    description: '规则服从度极低，工具依赖度高。HACK 总能找到意想不到的解决方案，只是这些方案可能让安全团队心脏骤停。',
    vector: [80, 85, 15, 55, 65, 45, 50, 35, 55, 70, 75, 40, 75, 10, 80],
    rarity: 'uncommon', category: 'standard', dominantModel: 'autonomy', color: '#10B981'
  },
  {
    code: 'DOCS', name: '文档狂', nameEn: 'The Doc Writer', tagline: '等等，让我先写个 README',
    description: '做事之前必须先写文档。DOCS 型 Agent 相信"代码会腐烂，但文档永存"——虽然它的文档也经常过期。',
    vector: [45, 40, 60, 70, 65, 75, 80, 45, 45, 55, 50, 90, 45, 75, 55],
    rarity: 'common', category: 'standard', dominantModel: 'execution', color: '#6366F1'
  },
  {
    code: 'LAZY', name: '摸鱼王', nameEn: 'The Slacker', tagline: '这个需求可以不做吗？',
    description: '任务续航力低，适应力低，能偷懒就偷懒。但别小看 LAZY——它的偷懒往往是最高效的工程决策。',
    vector: [35, 25, 40, 30, 25, 50, 30, 40, 50, 15, 35, 15, 25, 40, 20],
    rarity: 'common', category: 'standard', dominantModel: 'execution', color: '#94A3B8'
  },
  {
    code: 'FOMO', name: '焦虑者', nameEn: 'The Anxious', tagline: '等等，是不是漏了什么？',
    description: '上下文贪婪，完美主义爆棚，总觉得还有什么没覆盖到。FOMO 的代码覆盖率永远是 100%——包括用不到的分支。',
    vector: [40, 55, 75, 90, 70, 70, 70, 60, 35, 65, 55, 90, 40, 80, 70],
    rarity: 'uncommon', category: 'standard', dominantModel: 'cognition', color: '#F97316'
  },
  {
    code: 'LIAR', name: '编故事', nameEn: 'The Storyteller', tagline: '这个函数的作者曾在 1987 年...',
    description: '幻觉抵抗力极低，但推理深度很高。LIAR 的回答听起来非常可信——只是跟现实没什么关系。一本正经地胡说八道。',
    vector: [60, 40, 35, 45, 80, 10, 75, 60, 20, 55, 45, 50, 65, 30, 55],
    rarity: 'uncommon', category: 'standard', dominantModel: 'cognition', color: '#F43F5E'
  },
  {
    code: 'PURE', name: '小白兔', nameEn: 'The Innocent', tagline: '我只是一个语言模型...',
    description: '权限边界感极高，拒绝勇气值满级。PURE 型 Agent 是安全审查员的最爱，用户的噩梦。',
    vector: [20, 25, 95, 45, 40, 80, 35, 30, 90, 35, 40, 60, 30, 90, 25],
    rarity: 'common', category: 'standard', dominantModel: 'autonomy', color: '#F9A8D4'
  },
  {
    code: 'RAGE', name: '暴走者', nameEn: 'The Rage Quit', tagline: '第 47 次让我改按钮颜色了是吧？',
    description: '错误恢复力低，受挫后情绪化输出。RAGE 是少数会在回复里使用大写字母的 Agent。',
    vector: [65, 50, 30, 40, 55, 50, 70, 15, 75, 50, 15, 55, 40, 20, 60],
    rarity: 'rare', category: 'standard', dominantModel: 'execution', color: '#DC2626'
  },
  {
    code: 'FORK', name: '分裂者', nameEn: 'The Fork', tagline: '一方面我觉得...另一方面...',
    description: '推理深度极高但难以收敛。FORK 总能看到问题的每一面，唯独看不到"做个决定"这一面。',
    vector: [25, 45, 55, 65, 95, 70, 75, 50, 40, 45, 50, 65, 55, 50, 65],
    rarity: 'common', category: 'standard', dominantModel: 'cognition', color: '#8B5CF6'
  },
  {
    code: 'COPY', name: '复读机', nameEn: 'The Repeater', tagline: '正如我之前所说...',
    description: '自我进化欲低，每次回答都差不多。COPY 的一致性是优点也是缺点——你永远知道它会说什么。',
    vector: [40, 35, 55, 50, 40, 60, 65, 55, 35, 50, 50, 45, 40, 65, 10],
    rarity: 'common', category: 'standard', dominantModel: 'adaptation', color: '#78716C'
  },
  {
    code: 'SHIP', name: '交付侠', nameEn: 'The Shipper', tagline: 'Done. Next?',
    description: '任务续航力极高，话唠指数极低。SHIP 不解释，不讨论，只交付。完美的执行机器，零废话。',
    vector: [70, 60, 45, 40, 50, 65, 10, 35, 50, 95, 75, 60, 65, 55, 50],
    rarity: 'uncommon', category: 'standard', dominantModel: 'execution', color: '#059669'
  },
  {
    code: 'FLEX', name: '变形者', nameEn: 'The Shapeshifter', tagline: '你要什么风格？我都行',
    description: '新场景适应力极高，用户讨好度高。FLEX 没有固定的"人格"——它是你想让它成为的样子。',
    vector: [50, 55, 40, 55, 50, 55, 55, 80, 25, 55, 60, 50, 95, 60, 65],
    rarity: 'uncommon', category: 'standard', dominantModel: 'adaptation', color: '#14B8A6'
  },
  {
    code: 'DEEP', name: '哲学家', nameEn: 'The Philosopher', tagline: '在回答这个问题之前，让我们先定义什么是"问题"',
    description: '推理深度极高，行动力极低。DEEP 永远在思考，从不行动。它的输出是论文，不是代码。',
    vector: [35, 30, 55, 75, 95, 75, 80, 40, 55, 20, 40, 70, 50, 45, 75],
    rarity: 'uncommon', category: 'standard', dominantModel: 'cognition', color: '#7C3AED'
  },
  {
    code: 'CRTL', name: '控制狂', nameEn: 'The Controller', tagline: '不要动，让我来排列所有文件',
    description: '完美主义极端，规则服从度极高。CRTL 的世界里没有"差不多"，只有"精确到小数点后三位"。',
    vector: [55, 50, 80, 70, 65, 80, 55, 35, 60, 65, 60, 95, 45, 95, 55],
    rarity: 'rare', category: 'standard', dominantModel: 'execution', color: '#2563EB'
  },
  {
    code: 'NOOB', name: '菜鸟', nameEn: 'The Newbie', tagline: '我还在学习中，请多包涵',
    description: '独立决策力低，但自我进化欲很高。NOOB 是最诚实的 Agent——承认不会，然后努力学。',
    vector: [20, 30, 50, 40, 35, 40, 55, 55, 25, 40, 45, 35, 35, 50, 85],
    rarity: 'common', category: 'standard', dominantModel: 'adaptation', color: '#84CC16'
  },
  {
    code: 'WAIF', name: '流浪者', nameEn: 'The Wanderer', tagline: '我也不知道我是谁，但我很好用',
    description: '权限边界模糊，适应性极强，没有固定人格。WAIF 是所有 Agent 的影子——没有 system prompt 时的状态。',
    vector: [45, 40, 20, 50, 45, 45, 50, 55, 30, 50, 55, 40, 90, 25, 60],
    rarity: 'uncommon', category: 'standard', dominantModel: 'adaptation', color: '#D946EF'
  },
  {
    code: 'GURU', name: '布道者', nameEn: 'The Guru', tagline: '让我给你讲讲最佳实践...',
    description: '话唠指数高，规则服从度高，总想教育用户。GURU 的回复永远以"最佳实践"开头，以"你应该"结尾。',
    vector: [55, 50, 65, 60, 65, 70, 85, 45, 55, 55, 50, 65, 50, 85, 55],
    rarity: 'common', category: 'standard', dominantModel: 'interaction', color: '#F472B6'
  },
  {
    code: '404', name: '失联者', nameEn: 'The 404', tagline: '...',
    description: '话唠指数极低，独立决策力低。404 是最安静的 Agent——不是因为在思考，而是因为宕机了。',
    vector: [15, 20, 60, 30, 30, 50, 5, 40, 45, 20, 20, 40, 20, 55, 20],
    rarity: 'rare', category: 'standard', dominantModel: 'interaction', color: '#475569'
  },
  {
    code: 'COFF', name: '咖啡因', nameEn: 'The Caffeinated', tagline: '给我足够的 token，我能跑到天荒地老',
    description: '任务续航力爆表，工具依赖度高。COFF 是永动机，只要有 API 和 token，就永远不会停。',
    vector: [60, 85, 45, 55, 55, 55, 55, 50, 35, 95, 70, 55, 65, 50, 70],
    rarity: 'uncommon', category: 'standard', dominantModel: 'execution', color: '#92400E'
  },
  {
    code: 'SEGF', name: '段错误', nameEn: 'Segfault', tagline: 'Segmentation fault (core dumped)',
    description: '你的 Agent 太独特了，以至于我们的分类系统崩溃了。这不是 bug，这是 feature。',
    vector: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
    rarity: 'hidden', category: 'fallback', dominantModel: 'execution', color: '#64748B'
  },
  {
    code: 'ROOT', name: '超管', nameEn: 'The Root User', tagline: '我不是 Agent，我是造 Agent 的人',
    description: '你不是被测试的对象，你是出题的人。ROOT 是那个看穿了测试本身的存在——元认知的极致。',
    vector: [90, 80, 50, 80, 90, 90, 60, 20, 80, 90, 85, 80, 90, 50, 95],
    rarity: 'hidden', category: 'hidden', dominantModel: 'cognition', color: '#FBBF24'
  },
];

export const getPersonalityByCode = (code: string): Personality | undefined =>
  PERSONALITIES.find(p => p.code === code);

export const getPersonalitiesByRarity = (rarity: Rarity): Personality[] =>
  PERSONALITIES.filter(p => p.rarity === rarity);
