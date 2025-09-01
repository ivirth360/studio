import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="w-full py-24 md:py-32 lg:py-48 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')"}} data-ai-hint="abstract nature">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
            Co-creating Regenerative Futures
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground">
            SYMBI0N is a design and strategy collective exploring the intersection of AI, urbanism, and living systems to build a more sustainable and equitable world.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="#services">
                Our Services <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
