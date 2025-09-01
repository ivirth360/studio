import Header from '@/components/header';
import Footer from '@/components/footer';
import { BlogCard } from '@/components/blog-card';
import { getBlogPosts } from '@/lib/blog';
import { cn } from '@/lib/utils';

export default function BlogPage() {
  const posts = getBlogPosts();
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section id="blog" className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className={cn("font-headline text-3xl font-bold tracking-tighter sm:text-4xl", "text-gradient bg-gradient-gold")}>From the Collective</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Insights, explorations, and signals from the intersection of technology and ecology.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
