import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: `${post.title} | SYMBI0N Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 600,
          alt: post.title,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  // Dummy content for the blog post body.
  const content = `
    <p class="lead text-xl text-muted-foreground mb-8">${post.excerpt} Our work pioneers the integration of advanced technology with ecological principles to build resilient, regenerative systems for a global clientele.</p>
    <p class="mb-6">In our latest exploration at the intersection of technology and ecology, we delve into a topic of profound significance: the development of symbiotic systems. The core question driving our research is no longer merely "How can technology solve our problems?" but rather, "How can technology collaborate with natural systems to create a fundamentally more resilient and regenerative world?" This shift in perspective is crucial for businesses and governments worldwide. It moves us away from a purely mechanistic view of the world and towards one that acknowledges the intricate, interconnected web of life.</p>
    <h3 class="font-headline text-2xl font-bold mt-8 mb-4 text-primary">The Core Principles of Symbiotic Design</h3>
    <p class="mb-6">Symbiotic design, as we practice it at SYMBI0N, is founded on several key principles. First, it necessitates a deep listening of the ecosystem it intends to integrate with. This is not a passive observation but an active dialogue. We use AI-powered sensors and data analysis to understand the subtle rhythms and flows of an environment—be it a bustling smart city or a remote natural landscape. This data-driven empathy allows us to design interventions that enhance, rather than disrupt, existing patterns, providing value to clients across the globe.</p>
    <figure class="my-8">
      <img src="https://picsum.photos/seed/${post.slug}-article/800/400" alt="In-depth article visual of futuristic technology" class="rounded-lg shadow-lg" data-ai-hint="futuristic technology" />
      <figcaption class="text-center text-sm text-muted-foreground mt-2">AI-driven analysis reveals hidden patterns in urban ecosystems.</figcaption>
    </figure>
    <p class="mb-6">Second, our approach champions decentralization and modularity. Monolithic, top-down solutions are often brittle and fail to adapt to local conditions. Instead, we focus on creating networks of smaller, interconnected agents that can respond dynamically to change. Think of it as the difference between a single, rigid skyscraper and a sprawling, adaptive mycelial network. Our work on international e-bike sharing networks and smart eco-benches are practical applications of this principle, creating a distributed infrastructure that is both efficient and resilient.</p>
    <h3 class="font-headline text-2xl font-bold mt-8 mb-4 text-primary">From Global Theory to Tangible Reality</h3>
    <p class="mb-6">The journey from a theoretical framework to a tangible product is where our multidisciplinary collective truly shines. Our designers work alongside AI developers, urban planners, and research specialists to ensure that every aspect of a project, from its user interface to its ecological footprint, is aligned with our core vision for a regenerative future. The VEDASHAKTIKA universe, for example, isn't just a storytelling project; it's a symbolic codex for understanding complex systems, brought to life through interactive web applications for a global audience.</p>
    <p class="mb-6">Ultimately, our goal is to co-create futures where the division between the "built" and the "natural" environment dissolves. A future where technology doesn't seek to dominate nature, but to enter into a partnership with it. This is the essence of SYMBI0N, and it is the future we are building, one project at a time, for clients everywhere.</p>
  `;

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <article className="container mx-auto px-4 md:px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <header className="mb-8">
            <h1 className={cn("font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-4", "text-gradient bg-gradient-full")}>
              {post.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              Published on {post.date}
            </p>
          </header>
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full rounded-lg shadow-lg mb-8"
            data-ai-hint={post.dataAiHint}
          />
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />

           <div className="mt-12 pt-8 border-t">
              <h3 className="font-headline text-xl font-bold mb-4">About the Author</h3>
              <div className="flex items-center gap-4">
                <Image src="https://picsum.photos/id/1005/200/200" alt="Author VedaVyas" width={80} height={80} className="rounded-full" data-ai-hint="professional portrait"/>
                <div>
                  <p className="font-bold text-lg">VedaVyas</p>
                  <p className="text-muted-foreground">Visionary Strategist at SYMBI0N, exploring the threads that connect our technological and ecological futures for a global audience.</p>
                </div>
              </div>
           </div>
           <div className="mt-8 text-center">
             <Button asChild>
                <Link href="/blog">
                  Back to Blog
                </Link>
              </Button>
           </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
