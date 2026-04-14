import { PERSONALITIES, Personality } from '../data/personalities';
import { DimensionScores, scoresToArray, Answer } from './scorer';

export interface MatchResult {
  personality: Personality;
  confidence: number;
  scores: DimensionScores;
  allDistances: { code: string; distance: number; confidence: number }[];
}

function euclideanDistance(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += (a[i] - b[i]) ** 2;
  }
  return Math.sqrt(sum);
}

function checkHiddenRoot(answers: Answer[]): boolean {
  // Q31 (id=31) must select option D (index=3)
  const q31 = answers.find(a => a.questionId === 31);
  if (!q31 || q31.optionIndex !== 3) return false;

  // At least 5 questions (out of first 30) selected last option (index=3)
  const lastOptionCount = answers
    .filter(a => a.questionId !== 31)
    .filter(a => a.optionIndex === 3)
    .length;

  return lastOptionCount >= 5;
}

export function matchPersonality(scores: DimensionScores, answers: Answer[]): MatchResult {
  // Check hidden type ROOT
  if (checkHiddenRoot(answers)) {
    const root = PERSONALITIES.find(p => p.code === 'ROOT')!;
    return {
      personality: root,
      confidence: 99,
      scores,
      allDistances: [],
    };
  }

  const userVector = scoresToArray(scores);

  // Calculate distances to all standard personalities (exclude fallback and hidden)
  const standardPersonalities = PERSONALITIES.filter(
    p => p.category === 'standard'
  );

  const distances = standardPersonalities.map(p => {
    const dist = euclideanDistance(userVector, p.vector);
    // Max possible distance for 15 dims each [0,100] = sqrt(15 * 100^2) ≈ 387
    const maxDist = Math.sqrt(15) * 100;
    const conf = Math.max(0, Math.round((1 - dist / maxDist) * 100));
    return { code: p.code, distance: dist, confidence: conf };
  });

  distances.sort((a, b) => a.distance - b.distance);

  const bestMatch = distances[0];

  // Fallback: if best confidence < 60%, use SEGF
  if (bestMatch.confidence < 60) {
    const segf = PERSONALITIES.find(p => p.code === 'SEGF')!;
    return {
      personality: segf,
      confidence: bestMatch.confidence,
      scores,
      allDistances: distances,
    };
  }

  const matched = PERSONALITIES.find(p => p.code === bestMatch.code)!;
  return {
    personality: matched,
    confidence: bestMatch.confidence,
    scores,
    allDistances: distances,
  };
}
