export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  dataAiHint: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'the-symbiotic-city-ai-urban-planning',
    title: 'The Symbiotic City: Weaving AI into the Global Urban Fabric',
    date: 'August 12, 2024',
    excerpt: 'Explore how urban symbiosis, where AI and natural systems collaborate, creates resilient and equitable smart cities. A key strategy for global urban development and sustainable infrastructure investment.',
    image: 'https://picsum.photos/seed/symbiotic-city-future/600/400',
    dataAiHint: 'futuristic city nature',
  },
  {
    slug: 'life-centered-design-for-global-sustainability',
    title: 'Beyond Human-Centered: A Call for Life-Centered Design on a Global Scale',
    date: 'July 28, 2024',
    excerpt: 'Human-centered design is evolving. We introduce \'Life-Centered Design\', a global framework considering all species and ecosystems, crucial for corporate social responsibility and sustainable product development worldwide.',
    image: 'https://picsum.photos/seed/life-centered-design-global/600/400',
    dataAiHint: 'forest ecosystem',
  },
  {
    slug: 'regenerative-ai-for-business-innovation',
    title: 'The Rise of Regenerative AI: A New Paradigm for Global Business',
    date: 'July 15, 2024',
    excerpt: 'Move beyond extractive AI. We explore Regenerative AI models that enrich data ecosystems, offering a competitive advantage for businesses seeking long-term innovation and sustainable growth in the global market.',
    image: 'https://picsum.photos/seed/regenerative-ai-business/600/400',
    dataAiHint: 'glowing neural network',
  },
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
