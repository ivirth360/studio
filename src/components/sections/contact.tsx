import LeadCaptureForm from '@/components/lead-capture-form';
import { Mail, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Contact() {
  return (
    <section id="contact" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className={cn("font-headline text-3xl font-bold tracking-tighter sm:text-4xl", "text-gradient bg-gradient-gold")}>
              Let’s Co-Create the Future, Globally.
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Have a project in mind? An idea to explore? Or just want to connect with our global collective? We partner with innovators and organizations worldwide. Fill out the form, and our AI assistant will help draft a starting point for our conversation.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a href="mailto:symbi0n@shuka.in" className="hover:text-primary">
                  symbi0n@shuka.in
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <a href="https://symbi0n.shuka.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  symbi0n.shuka.in
                </a>
              </div>
            </div>
             <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="outline">
                    <Link href="#portfolio">Request Full Portfolio</Link>
                </Button>
            </div>
          </div>
          <div className="space-y-6">
            <LeadCaptureForm />
          </div>
        </div>
      </div>
    </section>
  );
}
