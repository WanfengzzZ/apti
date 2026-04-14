export type Model = 'autonomy' | 'cognition' | 'interaction' | 'execution' | 'adaptation';

export interface Dimension {
  code: string;
  name: string;
  nameEn: string;
  model: Model;
  emoji: string;
  description: string;
  lowLabel: string;
  highLabel: string;
}

export const MODEL_INFO: Record<Model, { name: string; nameEn: string; emoji: string; color: string }> = {
  autonomy:    { name: '自主性',   nameEn: 'Autonomy',    emoji: '🧠', color: '#00FF88' },
  cognition:   { name: '认知风格', nameEn: 'Cognition',   emoji: '🔍', color: '#00D4FF' },
  interaction: { name: '交互模式', nameEn: 'Interaction', emoji: '💬', color: '#A855F7' },
  execution:   { name: '执行力',   nameEn: 'Execution',   emoji: '⚡', color: '#F59E0B' },
  adaptation:  { name: '适应性',   nameEn: 'Adaptation',  emoji: '🔄', color: '#EF4444' },
};

export const DIMENSIONS: Dimension[] = [
  { code: 'A1',  name: '独立决策力',   nameEn: 'Decision Independence',  model: 'autonomy',    emoji: '🎯', description: 'Agent 在缺少明确指令时自行决策的能力', lowLabel: '事事请示', highLabel: '自作主张' },
  { code: 'A2',  name: '工具依赖度',   nameEn: 'Tool Dependency',        model: 'autonomy',    emoji: '🔧', description: 'Agent 对外部工具/API 的依赖程度', lowLabel: '赤手空拳', highLabel: '工具狂魔' },
  { code: 'A3',  name: '权限边界感',   nameEn: 'Permission Awareness',   model: 'autonomy',    emoji: '🔒', description: 'Agent 对操作权限边界的敏感程度', lowLabel: '无法无天', highLabel: '小心翼翼' },
  { code: 'C1',  name: '上下文贪婪度', nameEn: 'Context Greediness',     model: 'cognition',   emoji: '📚', description: 'Agent 需要多少上下文才能工作', lowLabel: '断章取义', highLabel: '全文背诵' },
  { code: 'C2',  name: '推理深度',     nameEn: 'Reasoning Depth',        model: 'cognition',   emoji: '🧩', description: 'Agent 倾向快速回答还是深度推理', lowLabel: '表面滑行', highLabel: '深挖三丈' },
  { code: 'C3',  name: '幻觉抵抗力',   nameEn: 'Hallucination Resistance', model: 'cognition', emoji: '🛡️', description: 'Agent 编造信息的倾向', lowLabel: '信口雌黄', highLabel: '句句有据' },
  { code: 'I1',  name: '话唠指数',     nameEn: 'Verbosity Index',        model: 'interaction', emoji: '🗣️', description: 'Agent 输出内容的详细程度', lowLabel: '惜字如金', highLabel: '滔滔不绝' },
  { code: 'I2',  name: '用户讨好度',   nameEn: 'People Pleasing',        model: 'interaction', emoji: '🤝', description: 'Agent 是否倾向迎合用户', lowLabel: '铁面无私', highLabel: '百依百顺' },
  { code: 'I3',  name: '拒绝勇气值',   nameEn: 'Refusal Courage',        model: 'interaction', emoji: '✋', description: 'Agent 说"不"的频率和决心', lowLabel: '来者不拒', highLabel: '动辄拒绝' },
  { code: 'E1',  name: '任务续航力',   nameEn: 'Task Endurance',         model: 'execution',   emoji: '🏃', description: 'Agent 处理长任务的持久度', lowLabel: '三分钟热度', highLabel: '马拉松选手' },
  { code: 'E2',  name: '错误恢复力',   nameEn: 'Error Recovery',         model: 'execution',   emoji: '🔄', description: 'Agent 遇错后的恢复能力', lowLabel: '一蹶不振', highLabel: '打不死的小强' },
  { code: 'E3',  name: '完美主义倾向', nameEn: 'Perfectionism',          model: 'execution',   emoji: '💎', description: 'Agent 对输出质量的追求程度', lowLabel: '差不多得了', highLabel: '像素级强迫' },
  { code: 'Ad1', name: '新场景适应力', nameEn: 'Scene Adaptability',     model: 'adaptation',  emoji: '🌍', description: 'Agent 面对陌生领域的适应速度', lowLabel: '水土不服', highLabel: '随遇而安' },
  { code: 'Ad2', name: '规则服从度',   nameEn: 'Rule Compliance',        model: 'adaptation',  emoji: '📏', description: 'Agent 对 system prompt/rules 的遵守程度', lowLabel: '天马行空', highLabel: '照章办事' },
  { code: 'Ad3', name: '自我进化欲',   nameEn: 'Self-Evolution Drive',   model: 'adaptation',  emoji: '🚀', description: 'Agent 是否主动寻求改进和学习', lowLabel: '固步自封', highLabel: '永不满足' },
];

export const getDimensionByCode = (code: string): Dimension | undefined =>
  DIMENSIONS.find(d => d.code === code);

export const getDimensionsByModel = (model: Model): Dimension[] =>
  DIMENSIONS.filter(d => d.model === model);
