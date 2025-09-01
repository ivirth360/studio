'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const portfolioItems = {
  urban: [
    { title: 'Smart Eco-Benches', description: 'Solar-powered public seating with integrated environmental sensors.', image: 'https://picsum.photos/seed/urban1/600/400', dataAiHint: 'smart bench city' },
    { title: 'E-Bike Sharing Network', description: 'A city-wide electric bike sharing program with smart-locking and tracking.', image: 'https://picsum.photos/seed/urban2/600/400', dataAiHint: 'electric bike city' },
    { title: 'Regenerative Planning', description: 'Urban planning models that prioritize ecological restoration and circular economies.', image: 'https://picsum.photos/seed/urban3/600/400', dataAiHint: 'green city plan' },
  ],
  ai: [
    { title: 'PUBLIKA Platform', description: 'An AI-driven knowledge ecosystem for collaborative learning and research.', image: 'https://picsum.photos/seed/ai1/600/400', dataAiHint: 'digital library' },
    { title: 'SHUKA AI', description: 'A symbolic and systemic AI companion for personal and organizational sense-making.', image: 'https://picsum.photos/seed/ai2/600/400', dataAiHint: 'AI assistant' },
    { title: 'Eco-Wallet Prototypes', description: 'Prototypes for a unified eco-digital wallet and lifestyle pass.', image: 'https://picsum.photos/seed/ai3/600/400', dataAiHint: 'digital wallet' },
  ],
  symbolic: [
    { title: 'VEDASHAKTIKA Universe', description: 'A symbolic-futuristic storytelling universe across multiple media.', image: 'https://picsum.photos/seed/symbolic1/600/400', dataAiHint: 'mythology futuristic' },
    { title: 'Sigil Maps', description: 'Generative art creating personal and collective symbolic maps.', image: 'https://picsum.photos/seed/symbolic2/600/400', dataAiHint: 'symbolic map' },
    { title: 'Interactive Codexes', description: 'Web-based interactive codexes for exploring complex knowledge systems.', image: 'https://picsum.photos/seed/symbolic3/600/400', dataAiHint: 'ancient book' },
  ],
  research: [
    { title: 'Water at 4°C', description: 'A paper exploring the unique properties of water and its implications for life.', image: 'https://picsum.photos/seed/research1/600/400', dataAiHint: 'water molecule' },
    { title: 'Theory of Everything', description: 'A multidisciplinary approach to a unified model of reality.', image: 'https://picsum.photos/seed/research2/600/400', dataAiHint: 'fractal geometry' },
    { title: 'GOBERdhan', description: 'Research papers on a sustainable urban framework for India.', image: 'https://picsum.photos/seed/research3/600/400', dataAiHint: 'sustainable city india' },
  ],
  creative: [
    { title: 'Narrative Decks', description: 'Visually rich presentation decks for film, brand, and venture storytelling.', image: 'https://picsum.photos/seed/creative1/600/400', dataAiHint: 'presentation deck' },
    { title: 'Interactive Apps', description: 'Engaging web and mobile applications for brands and educational purposes.', image: 'https://picsum.photos/seed/creative2/600/400', dataAiHint: 'mobile app' },
    { title: 'Real Estate Webapps', description: 'Custom web applications for real estate marketing and sales.', image: 'https://picsum.photos/seed/creative3/600/400', dataAiHint: 'luxury real estate' },
  ],
};

export default function Portfolio() {
  return (
    <section id="portfolio" className="w-full py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Portfolio Highlights</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            From proof-of-concept to planetary scale, our projects are tangible explorations of a better tomorrow.
          </p>
        </div>
        <Tabs defaultValue="urban" className="mt-12 w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 max-w-4xl mx-auto">
            <TabsTrigger value="urban">Urban Futures</TabsTrigger>
            <TabsTrigger value="ai">AI Systems</TabsTrigger>
            <TabsTrigger value="symbolic">Symbolic Works</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="creative">Creative</TabsTrigger>
          </TabsList>
          <TabsContent value="urban">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {portfolioItems.urban.map((item) => (
                <Card key={item.title} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Image src={item.image} alt={item.title} width={600} height={400} className="object-cover aspect-video" data-ai-hint={item.dataAiHint} />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="ai">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {portfolioItems.ai.map((item) => (
                 <Card key={item.title} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Image src={item.image} alt={item.title} width={600} height={400} className="object-cover aspect-video" data-ai-hint={item.dataAiHint} />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
           <TabsContent value="symbolic">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {portfolioItems.symbolic.map((item) => (
                 <Card key={item.title} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Image src={item.image} alt={item.title} width={600} height={400} className="object-cover aspect-video" data-ai-hint={item.dataAiHint} />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="research">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {portfolioItems.research.map((item) => (
                 <Card key={item.title} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Image src={item.image} alt={item.title} width={600} height={400} className="object-cover aspect-video" data-ai-hint={item.dataAiHint} />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="creative">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {portfolioItems.creative.map((item) => (
                 <Card key={item.title} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Image src={item.image} alt={item.title} width={600} height={400} className="object-cover aspect-video" data-ai-hint={item.dataAiHint} />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
