import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Sparkles, Sprout, Bot, Wallet } from 'lucide-react';

const frameworks = [
  {
    icon: <BookOpen className="h-8 w-8 text-accent" />,
    title: 'PUBLIKA AI',
    description: 'Digital Campus & Knowledge Ecosystem',
  },
  {
    icon: <Sparkles className="h-8 w-8 text-accent" />,
    title: 'VEDASHAKTIKA',
    description: 'A symbolic-futuristic storytelling universe',
  },
  {
    icon: <Sprout className="h-8 w-8 text-accent" />,
    title: 'GOBERdhan Planning Theory',
    description: 'Sustainable urban framework',
  },
  {
    icon: <Bot className="h-8 w-8 text-accent" />,
    title: 'SHUKA AI',
    description: 'Your symbolic & systemic AI companion',
  },
  {
    icon: <Wallet className="h-8 w-8 text-accent" />,
    title: 'Svarna Eco-Wallet',
    description: 'Unified eco-digital lifestyle pass',
  },
];

export default function Frameworks() {
  return (
    <section id="frameworks" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Signature Frameworks</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our work is guided by a set of core principles that help us navigate complexity and design for regeneration.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-10">
          {frameworks.map((framework) => (
            <div key={framework.title} className="flex flex-col items-center justify-start space-y-4 text-center">
              <div className="flex justify-center">{framework.icon}</div>
              <h3 className="text-xl font-bold font-headline">{framework.title}</h3>
              <p className="text-muted-foreground">{framework.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
