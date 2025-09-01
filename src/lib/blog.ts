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
    slug: 'the-symbiotic-city',
    title: 'The Symbiotic City: Weaving AI into the Urban Fabric',
    date: 'August 12, 2024',
    excerpt: 'How can we design cities that are not just smart, but wise? This post explores the concept of urban symbiosis, where AI and natural systems collaborate to create more resilient and equitable urban environments.',
    image: 'https://picsum.photos/seed/blog1/600/400',
    dataAiHint: 'futuristic city nature',
  },
  {
    slug: 'beyond-human-centered-design',
    title: 'Beyond Human-Centered: Designing for All Life',
    date: 'July 28, 2024',
    excerpt: 'Human-centered design has taken us far, but it\'s time for an evolution. We introduce \'Life-Centered Design\', a framework that considers the well-being of all species and ecosystems in the design process.',
    image: 'https://picsum.photos/seed/blog2/600/400',
    dataAiHint: 'forest ecosystem',
  },
  {
    slug: 'the-rise-of-regenerative-ai',
    title: 'The Rise of Regenerative AI',
    date: 'July 15, 2024',
    excerpt: 'Instead of extractive AI models, what if we could build systems that regenerate and enrich the very data ecosystems they learn from? A deep dive into the principles and potential of Regenerative AI.',
    image: 'https://picsum.photos/seed/blog3/600/400',
    dataAiHint: 'glowing neural network',
  },
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
