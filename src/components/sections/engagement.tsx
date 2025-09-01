import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const models = [
  {
    title: 'Project-based Sprint',
    description: 'For well-defined challenges that need a concentrated burst of creative and technical energy.',
    features: ['2-6 Week Sprints', 'Dedicated Team', 'Clear Deliverables'],
  },
  {
    title: 'Strategic Retainer',
    description: 'For ongoing guidance, research, and design leadership as you navigate long-term transformation.',
    features: ['Monthly Engagement', 'Embedded Expertise', 'Adaptive Strategy'],
  },
  {
    title: 'Venture Partnership',
    description: 'For ambitious new ventures where we co-invest our time and resources in exchange for equity.',
    features: ['Shared Risk/Reward', 'Deep Collaboration', 'Long-term Growth'],
  },
];

export default function Engagement() {
  return (
    <section id="engagement" className="w-full py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Engagement Models</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We adapt our collaboration style to fit your unique needs. We engage as fluidly and dynamically as the systems we design.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
          {models.map((model) => (
            <Card key={model.title} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline">{model.title}</CardTitle>
                <CardDescription>{model.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
