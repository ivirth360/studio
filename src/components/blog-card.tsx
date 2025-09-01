import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <CardHeader className="p-0">
        <Link href={`/blog/${post.slug}`}>
          <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={400}
            className="object-cover aspect-video"
            data-ai-hint={post.dataAiHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <p className="text-sm text-muted-foreground">{post.date}</p>
          <h3 className="font-headline text-xl font-bold mt-2">
            <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
          </h3>
          <p className="mt-2 text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </div>
        <div className="mt-4">
          <Button asChild variant="link" className="p-0 h-auto">
            <Link href={`/blog/${post.slug}`}>
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
