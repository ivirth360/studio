import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, GitBranch, HeartHandshake } from 'lucide-react';

const frameworks = [
  {
    icon: <GitBranch className="h-8 w-8 text-accent" />,
    title: 'Symbiotic Design',
    description: 'A design philosophy that prioritizes mutualism, ensuring every component in a system benefits and supports others.',
  },
  {
    icon: <Layers className="h-8 w-8 text-accent" />,
    title: 'Multi-scalar Systems Thinking',
    description: 'Analyzing and intervening in systems at multiple scales simultaneously, from the microscopic to the planetary.',
  },
  {
    icon: <HeartHandshake className="h-8 w-8 text-accent" />,
    title: 'Ecosystemic Value Flow',
    description: 'Redefining value to include ecological health, social equity, and long-term resilience, not just financial profit.',
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
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {frameworks.map((framework) => (
            <div key={framework.title} className="flex flex-col justify-start space-y-4">
              <div className="flex justify-center">{framework.icon}</div>
              <h3 className="text-xl font-bold font-headline text-center">{framework.title}</h3>
              <p className="text-muted-foreground text-center">{framework.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
