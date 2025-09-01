import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="w-full py-24 md:py-32 lg:py-48 bg-cover bg-center relative" >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
            Co-creating Regenerative Futures
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground">
            A multidisciplinary collective blending AI, urban futures, design, research, and symbolic intelligence into one symbiotic ecosystem.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="#services">
                Explore Our Services <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">Work With Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
