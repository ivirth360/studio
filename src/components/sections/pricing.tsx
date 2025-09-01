import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

const pricingPlans = [
  {
    title: 'Freelance Projects',
    price: 'Starting from $1,000',
    description: 'One-time or milestone-based engagements for specific project needs.',
    features: ['Fixed Scope & Deliverables', 'Targeted Expertise', 'Ideal for well-defined tasks'],
    cta: 'Get a Quote',
    href: '#contact'
  },
  {
    title: 'Monthly Retainers',
    price: 'Starting from $3,000/mo',
    description: 'Ongoing AI, research, and strategy support to embed our expertise within your team.',
    features: ['Continuous Support', 'Strategic Partnership', 'AI + Research + Strategy'],
    cta: 'Discuss Retainer',
    href: '#contact',
    featured: true
  },
  {
    title: 'Collaborative Labs',
    price: 'Custom Pricing',
    description: 'Co-creation partnerships with startups and institutions to build and launch new ventures.',
    features: ['Joint Development & IP', 'Shared Goals & Risk', 'Accelerated Innovation'],
    cta: 'Propose a Lab',
    href: '#contact'
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Pricing</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Choose a model that aligns with your vision. We offer flexible engagements to match your project's scale and ambition.
          </p>
        </div>
        <div className="mx-auto grid max-w-7xl items-stretch gap-8 sm:grid-cols-1 lg:max-w-none lg:grid-cols-3 mt-12">
          {pricingPlans.map((plan) => (
            <Card key={plan.title} className={`flex flex-col border-2 ${plan.featured ? 'border-primary shadow-lg shadow-primary/20' : 'border-border'}`}>
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl">{plan.title}</CardTitle>
                <CardDescription className="text-4xl font-bold text-primary py-2">{plan.price}</CardDescription>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant={plan.featured ? 'default' : 'outline'}>
                    <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
