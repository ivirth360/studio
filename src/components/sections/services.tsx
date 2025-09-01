import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, BrainCircuit, Building, Lightbulb, Code, BookText, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const serviceCategories = [
  {
    title: 'Global AI & Digital Systems',
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    items: [
      'AI Strategy for Global Enterprises',
      'International Conversational AI Agents',
      'Symbolic AI & Global Codexes',
      'IoT & AI Integration for Smart Cities',
    ],
  },
  {
    title: 'International Urbanism & Planning',
    icon: <Building className="h-10 w-10 text-primary" />,
    items: [
      'Smart & Symbiotic City Design',
      'Biomimetic Architecture Solutions',
      'Global Regenerative Policy Frameworks',
      'Sustainable Land-use Planning',
    ],
  },
  {
    title: 'Creative Strategy for Global Brands',
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    items: [
      'Global Narrative Architecture',
      'Systemic International Brand Identity',
      'Vision Decks & Global Portfolios',
      'Interactive Storytelling for a Global Audience',
    ],
  },
  {
    title: 'Worldwide Design & Development',
    icon: <Code className="h-10 w-10 text-primary" />,
    items: [
      'Full-Stack Web & App Development',
      'AI-powered Web Applications for Global Scale',
      'Symbolic UI/UX Design for International Users',
      'Motion Graphics & Global Visuals',
    ],
  },
  {
    title: 'International Research & Consulting',
    icon: <BookText className="h-10 w-10 text-primary" />,
    items: [
      'International Academic Research & Papers',
      'Global Digital Knowledge Ecosystems',
      'Climate & Innovation Strategy Consulting',
      'Grant & Academic Writing for Global Institutions',
    ],
  },
  {
    title: 'Global Symbiotic Intelligence',
    icon: <Leaf className="h-10 w-10 text-primary" />,
    items: [
      'Life-Centered Design Sprints for Global Products',
      'Worldwide Ecological Data Analysis',
      'Human-AI-Nature Interfaces for Global Systems',
      'Regenerative Systems Mapping for Planet-Scale Impact',
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className={cn("font-headline text-3xl font-bold tracking-tighter sm:text-4xl", "text-gradient bg-gradient-gold")}>Our Global Services</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We provide end-to-end support for projects aiming to create deep, systemic impact. Our services are designed for global clients at the nexus of technology, ecology, and urbanism.
          </p>
        </div>
        <div className="mx-auto grid max-w-7xl items-stretch gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3 mt-12">
          {serviceCategories.map((category) => (
            <Card key={category.title} className="flex flex-col bg-card hover:bg-muted/50 transition-colors duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {category.icon}
                  <CardTitle className="font-headline text-2xl">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
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
