import { DIMENSIONS } from '../data/dimensions';
import { Question, QuestionOption } from '../data/questions';

export interface DimensionScores {
  [code: string]: number;
}

export interface Answer {
  questionId: number;
  optionIndex: number;
}

export function initializeScores(): DimensionScores {
  const scores: DimensionScores = {};
  DIMENSIONS.forEach(d => { scores[d.code] = 50; });
  return scores;
}

export function calculateScores(answers: Answer[], questions: Question[]): DimensionScores {
  const scores = initializeScores();

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    const option: QuestionOption | undefined = question.options[answer.optionIndex];
    if (!option) return;

    Object.entries(option.effects).forEach(([dimCode, delta]) => {
      if (scores[dimCode] !== undefined) {
        scores[dimCode] += delta;
      }
    });
  });

  // Clamp all scores to [0, 100]
  Object.keys(scores).forEach(key => {
    scores[key] = Math.max(0, Math.min(100, scores[key]));
  });

  return scores;
}

export function scoresToArray(scores: DimensionScores): number[] {
  return DIMENSIONS.map(d => scores[d.code] ?? 50);
}
