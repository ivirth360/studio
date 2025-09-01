import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-48 flex items-center justify-center">
       <Image
        src="https://picsum.photos/seed/hero-bg/1920/1080"
        alt="Symbiotic background"
        fill
        className="object-cover -z-10"
        data-ai-hint="abstract technology nature"
        priority
      />
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm -z-10" />
      <div className="container mx-auto px-4 md:px-6 text-center z-10">
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
            Designing Tomorrow, Today.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80">
            A multidisciplinary collective blending AI, urban futures, design, research, and symbolic intelligence into one symbiotic ecosystem.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="#services">
                Explore Our Services <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-background/50">
              <Link href="#contact">Work With Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
