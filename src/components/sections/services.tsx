import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, BrainCircuit, Building, Lightbulb, Code, BookText, Check } from 'lucide-react';

const serviceCategories = [
  {
    title: 'AI & Digital Systems',
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    items: [
      'AI Assistants & Workflows',
      'Conversational AI Agents',
      'Symbolic AI & Codexes',
      'IoT & AI Integration',
    ],
  },
  {
    title: 'Urbanism & Planning',
    icon: <Building className="h-10 w-10 text-primary" />,
    items: [
      'Smart & Symbiotic City Design',
      'Biomimetic Architecture',
      'Regenerative Policy Frameworks',
      'Sustainable Land-use Planning',
    ],
  },
  {
    title: 'Creative Strategy',
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    items: [
      'Narrative Architecture',
      'Systemic Brand Identity',
      'Vision Decks & Portfolios',
      'Interactive Storytelling',
    ],
  },
  {
    title: 'Design & Development',
    icon: <Code className="h-10 w-10 text-primary" />,
    items: [
      'Full-Stack Web & App Dev',
      'AI-powered Web Applications',
      'Symbolic UI/UX Design',
      'Motion Graphics & Visuals',
    ],
  },
  {
    title: 'Research & Consulting',
    icon: <BookText className="h-10 w-10 text-primary" />,
    items: [
      'Academic Research & Papers',
      'Digital Knowledge Ecosystems',
      'Climate & Innovation Strategy',
      'Grant & Academic Writing',
    ],
  },
  {
    title: 'Symbiotic Intelligence',
    icon: <Leaf className="h-10 w-10 text-primary" />,
    items: [
      'Life-Centered Design Sprints',
      'Ecological Data Analysis',
      'Human-AI-Nature Interfaces',
      'Regenerative Systems Mapping',
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Our Services</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We provide end-to-end support for projects aiming to create deep, systemic impact at the nexus of technology and ecology.
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
                      <Check className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
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
