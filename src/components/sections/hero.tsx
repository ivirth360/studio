import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Hero() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-48 flex items-center justify-center">
       <Image
        src="https://picsum.photos/seed/future-tech/1920/1080"
        alt="Abstract background representing global networks and future technology"
        fill
        className="object-cover -z-10"
        data-ai-hint="abstract technology"
        priority
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm -z-10" />
      <div className="container mx-auto px-4 md:px-6 text-center z-10">
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <h1 className={cn(
            "font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl",
            "text-gradient bg-gradient-full"
            )}>
            Co-Creating Regenerative Futures
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80">
            A global multidisciplinary collective blending AI, urban futures, and regenerative design. We partner with visionary clients across the globe to build a sustainable and intelligent world.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="#services">
                Explore Our Global Services <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-background/50">
              <Link href="#contact">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
