import { mockBrands, type MockBrand } from '../data/fitEngineBrands';
import { mockCreators, type MockCreator } from '../data/fitEngineCreators';

export interface FitAnalysis {
  brand: MockBrand;
  creator: MockCreator;
  overallFitScore: number;
  audienceMatch: number;
  toneMatch: number;
  brandSafetyScore: number;
  engagementPrediction: number;
  predictedCpm: number;
  recommendationSummary: string;
  topKeywordMatches: string[];
  confidence: number;
  riskNote: string;
  advantage: string;
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/^@/, '')
    .replace(/\/$/, '')
    .trim();

const compact = (value: string) => normalize(value).replace(/[^a-z0-9]/g, '');

const aliases: Record<string, string[]> = {
  vercel: ['vercel.com'],
  discord: ['discord.com'],
  adobe: ['adobe.com'],
  figma: ['figma.com'],
  nike: ['nike.com'],
  sephora: ['sephora.com'],
  logitech: ['logitech.com'],
  notion: ['notion.so', 'notion.com'],
};

const engagementScore: Record<MockCreator['engagementLevel'], number> = {
  low: 42,
  medium: 62,
  high: 82,
  'very high': 94,
};

function overlapScore(brandValues: string[], creatorValues: string[]) {
  const brandSet = new Set(brandValues.map(compact));
  const creatorSet = new Set(creatorValues.map(compact));
  const directMatches = [...brandSet].filter((item) => creatorSet.has(item)).length;
  const partialMatches = [...brandSet].filter((brandItem) =>
    [...creatorSet].some((creatorItem) => brandItem.includes(creatorItem) || creatorItem.includes(brandItem)),
  ).length;

  const matchCount = Math.max(directMatches, partialMatches);
  if (matchCount >= 4) return 96;
  if (matchCount === 3) return 90;
  if (matchCount === 2) return 76;
  if (matchCount === 1) return 48;
  return 12;
}

function deterministicVariation(seed: string, range: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 9973;
  }
  return (hash % (range * 2 + 1)) - range;
}

function reachScore(followerCount: number) {
  const millions = followerCount / 1_000_000;
  if (millions >= 250) return 98;
  if (millions >= 100) return 94;
  if (millions >= 25) return 88;
  if (millions >= 10) return 80;
  if (millions >= 5) return 72;
  if (millions >= 1) return 62;
  return 48;
}

function isBroadConsumerBrand(brand: MockBrand) {
  return ['Sportswear', 'Beauty Retail', 'Community Platform', 'Consumer Electronics'].includes(brand.category);
}

export function findBrand(input: string) {
  const normalizedInput = normalize(input);
  const compactInput = compact(input);

  return mockBrands.find((brand) => {
    const brandKey = compact(brand.name);
    const brandSite = normalize(brand.website);
    const brandAliases = aliases[brandKey] ?? [];

    return (
      compactInput === brandKey ||
      normalizedInput === brandSite ||
      normalizedInput.includes(brandSite) ||
      brandAliases.some((alias) => normalizedInput === alias || normalizedInput.includes(alias))
    );
  });
}

export function findCreator(input: string) {
  const compactInput = compact(input);
  return mockCreators.find((creator) => compact(creator.handle) === compactInput);
}

export function generateFitAnalysis(brand: MockBrand, creator: MockCreator): FitAnalysis {
  const creatorSignals = [creator.niche, ...creator.categories];
  const categoryRelevance = overlapScore(brand.preferredCreatorNiches, creatorSignals);
  const reach = reachScore(creator.followerCount);
  const reachWeight = isBroadConsumerBrand(brand) ? 0.16 : 0.07;
  const signalWeight = 1 - reachWeight;
  const audienceMatch = Math.round(
    overlapScore(brand.audience, creator.audienceDemographics) * 0.6 + categoryRelevance * 0.25 + reach * 0.15,
  );
  const toneMatch = Math.round(overlapScore(brand.tone, creator.contentStyle) * 0.75 + categoryRelevance * 0.25);
  const engagementPrediction = Math.round(engagementScore[creator.engagementLevel] * 0.62 + categoryRelevance * 0.23 + reach * 0.15);
  const brandSafetyScore = Math.round(
    72 +
      toneMatch * 0.12 +
      categoryRelevance * 0.08 -
      (creator.categories.includes('comedy') && brand.category !== 'Community Platform' ? 8 : 0),
  );

  const signalOverall =
    categoryRelevance * 0.32 +
    audienceMatch * 0.24 +
    toneMatch * 0.2 +
    brandSafetyScore * 0.12 +
    engagementPrediction * 0.12;
  const rawOverall = signalOverall * signalWeight + reach * reachWeight;
  const strategicBonus = categoryRelevance >= 90 ? 7 : categoryRelevance >= 76 ? 3 : 0;
  const reachBonus = reach >= 94 && isBroadConsumerBrand(brand) ? 6 : reach >= 94 ? 2 : 0;
  const categoryCap =
    brand.category === 'Community Platform' ? 95 : brand.category === 'Productivity Software' ? 96 : 98;
  const overallFitScore = Math.max(
    25,
    Math.min(categoryCap, Math.round(rawOverall + strategicBonus + reachBonus + deterministicVariation(`${brand.name}-${creator.handle}`, 3))),
  );
  const predictedCpm = Number(
    Math.max(4, creator.estimatedCpm * (0.72 + overallFitScore / 210) + deterministicVariation(creator.handle, 6) / 10)
      .toFixed(2),
  );

  const topKeywordMatches = [...new Set([...brand.preferredCreatorNiches, ...brand.tone])]
    .filter((keyword) => creator.categories.map(compact).includes(compact(keyword)) || creator.contentStyle.map(compact).includes(compact(keyword)))
    .slice(0, 4);

  const confidence = Number((0.72 + overallFitScore / 420).toFixed(2));
  const fitBand = overallFitScore >= 85 ? 'strong' : overallFitScore >= 65 ? 'promising' : overallFitScore >= 45 ? 'selective' : 'low-priority';
  const recommendationSummary =
    overallFitScore >= 85
      ? `${creator.handle} is a ${fitBand} prototype match for ${brand.name}, with clear audience overlap and content signals that can support a high-confidence campaign.`
      : overallFitScore >= 55
        ? `${creator.handle} could work for ${brand.name} with a narrow brief, but the campaign should focus on the strongest shared audience and category signals.`
        : `${creator.handle} is a ${fitBand} match for ${brand.name}; the prototype data suggests better results from a creator closer to ${brand.category}.`;

  return {
    brand,
    creator,
    overallFitScore,
    audienceMatch,
    toneMatch,
    brandSafetyScore: Math.min(98, brandSafetyScore),
    engagementPrediction,
    predictedCpm,
    recommendationSummary,
    topKeywordMatches: topKeywordMatches.length ? topKeywordMatches : creator.categories.slice(0, 4),
    confidence,
    riskNote:
      overallFitScore >= 75
        ? 'Low mismatch risk based on current prototype signals'
        : 'Moderate mismatch risk; use a tighter brief and smaller pilot',
    advantage: `${creator.niche} maps best to ${brand.category} through ${creator.categories.slice(0, 2).join(' and ')} signals.`,
  };
}
