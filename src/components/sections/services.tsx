import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Leaf, BrainCircuit, Building, Lightbulb, Code, BookText, Check } from 'lucide-react';

const serviceCategories = [
  {
    title: 'AI & Digital Systems',
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    items: [
      'AI Assistants (custom GPTs, trained on your domain)',
      'AI Flow Architecture (automations, triggers, workflows)',
      'Conversational AI (for education, real estate, health, governance)',
      'Symbolic AI (codexes, glyphs, seals)',
      'IoT + AI integration (eco devices, wearables, apps)',
    ],
  },
  {
    title: 'Urbanism & Planning Futures',
    icon: <Building className="h-8 w-8 text-primary" />,
    items: [
      'Urban & Regional Planning',
      'Smart City Ecosystems (IoT, AI, e-mobility, eco-benches)',
      'Biomimetic & Symbolic Urban Design',
      'Research & Policy Frameworks',
      'Sustainable Land-use & Habitat Planning',
    ],
  },
  {
    title: 'Creative Strategy & Storytelling',
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    items: [
      'Narrative Architecture (mythic + systemic storytelling)',
      'Brand Identity (glyphs, seals, symbolic design language)',
      'Vision Decks & Portfolios',
      'Interactive Codexes (web/VR/AR apps)',
      'Script & Film Development',
    ],
  },
  {
    title: 'Design & Development',
    icon: <Code className="h-8 w-8 text-primary" />,
    items: [
      'Web & App Development (full-stack)',
      'AI-powered Webapps',
      'UI/UX with symbolic language',
      'Landing Pages & Funnels',
      'Motion Graphics & Sonic/Lumia visuals',
    ],
  },
  {
    title: 'Research & Consulting',
    icon: <BookText className="h-8 w-8 text-primary" />,
    items: [
      'Research Papers & Journal Submissions',
      'Knowledge Platforms (digital campuses, ecosystems)',
      'Sustainability & Climate Consulting',
      'Innovation Strategy for Startups & Institutions',
      'Academic & Grant Writing',
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
        <div className="mx-auto max-w-4xl mt-12">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {serviceCategories.map((category, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b">
                <AccordionTrigger className="text-xl font-headline hover:no-underline">
                  <div className="flex items-center gap-4">
                    {category.icon}
                    {category.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pl-12">
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
