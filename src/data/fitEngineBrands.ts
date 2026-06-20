export interface MockBrand {
  name: string;
  website: string;
  category: string;
  audience: string[];
  tone: string[];
  budgetRange: string;
  engagementPreferences: string[];
  preferredCreatorNiches: string[];
}

export const mockBrands: MockBrand[] = [
  {
    name: 'Vercel',
    website: 'https://vercel.com',
    category: 'Developer Tools',
    audience: ['developers', 'founders', 'startup teams', 'product builders'],
    tone: ['technical', 'minimal', 'premium', 'future-facing'],
    budgetRange: '$18K-$55K',
    engagementPreferences: ['deep demos', 'launch explainers', 'high-intent comments'],
    preferredCreatorNiches: ['technology', 'developer tools', 'productivity', 'ai', 'software'],
  },
  {
    name: 'Discord',
    website: 'https://discord.com',
    category: 'Community Platform',
    audience: ['gamers', 'creators', 'gen-z', 'online communities'],
    tone: ['playful', 'community-led', 'casual', 'internet-native'],
    budgetRange: '$15K-$45K',
    engagementPreferences: ['livestream integration', 'community reactions', 'memorable clips'],
    preferredCreatorNiches: ['gaming', 'entertainment', 'streaming', 'community', 'youth culture'],
  },
  {
    name: 'Adobe',
    website: 'https://adobe.com',
    category: 'Creative Software',
    audience: ['designers', 'artists', 'marketers', 'creative professionals'],
    tone: ['creative', 'polished', 'educational', 'aspirational'],
    budgetRange: '$25K-$80K',
    engagementPreferences: ['tutorial saves', 'portfolio showcases', 'creative challenges'],
    preferredCreatorNiches: ['art', 'design', 'animation', 'photography', 'creator education', 'video'],
  },
  {
    name: 'Figma',
    website: 'https://figma.com',
    category: 'Design Collaboration',
    audience: ['designers', 'product teams', 'startups', 'students'],
    tone: ['collaborative', 'smart', 'practical', 'design-forward'],
    budgetRange: '$20K-$60K',
    engagementPreferences: ['workflow walkthroughs', 'template downloads', 'community remixes'],
    preferredCreatorNiches: ['design', 'productivity', 'technology', 'education', 'startups'],
  },
  {
    name: 'Nike',
    website: 'https://nike.com',
    category: 'Sportswear',
    audience: ['athletes', 'fitness enthusiasts', 'streetwear fans', 'youth culture', 'fashion shoppers', 'young professionals'],
    tone: ['bold', 'motivational', 'premium', 'energetic', 'aspirational'],
    budgetRange: '$35K-$120K',
    engagementPreferences: ['short-form inspiration', 'style saves', 'fitness participation'],
    preferredCreatorNiches: ['fashion', 'fitness', 'sports', 'lifestyle', 'streetwear', 'motivation'],
  },
  {
    name: 'Sephora',
    website: 'https://sephora.com',
    category: 'Beauty Retail',
    audience: ['beauty shoppers', 'millennial women', 'gen-z', 'makeup enthusiasts'],
    tone: ['glamorous', 'trusted', 'friendly', 'trend-aware'],
    budgetRange: '$20K-$75K',
    engagementPreferences: ['product trials', 'routine saves', 'comment-led recommendations'],
    preferredCreatorNiches: ['beauty', 'makeup', 'skincare', 'fashion', 'lifestyle'],
  },
  {
    name: 'Logitech',
    website: 'https://logitech.com',
    category: 'Consumer Electronics',
    audience: ['gamers', 'remote workers', 'creators', 'tech buyers'],
    tone: ['practical', 'technical', 'reliable', 'performance-led'],
    budgetRange: '$12K-$50K',
    engagementPreferences: ['setup tours', 'gear reviews', 'performance comparisons'],
    preferredCreatorNiches: ['technology', 'gaming', 'productivity', 'workspace', 'streaming'],
  },
  {
    name: 'Notion',
    website: 'https://notion.so',
    category: 'Productivity Software',
    audience: ['students', 'founders', 'knowledge workers', 'creators'],
    tone: ['calm', 'organized', 'educational', 'practical'],
    budgetRange: '$15K-$50K',
    engagementPreferences: ['template downloads', 'workflow saves', 'productivity comments'],
    preferredCreatorNiches: ['productivity', 'education', 'business', 'creator economy', 'self improvement'],
  },
];
