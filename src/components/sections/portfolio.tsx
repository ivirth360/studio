'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const portfolioItems = {
  urban: [
    { title: 'Smart Eco-Benches', description: 'Solar-powered public seating with integrated environmental sensors.', image: 'https://picsum.photos/seed/smart-bench/600/400', dataAiHint: 'smart bench city' },
    { title: 'E-Bike Sharing Network', description: 'A city-wide electric bike sharing program with smart-locking and tracking.', image: 'https://picsum.photos/seed/ebike-city/600/400', dataAiHint: 'electric bike city' },
    { title: 'Regenerative Planning', description: 'Urban planning models that prioritize ecological restoration and circular economies.', image: 'https://picsum.photos/seed/green-plan/600/400', dataAiHint: 'green city plan' },
  ],
  ai: [
    { title: 'PUBLIKA Platform', description: 'An AI-driven knowledge ecosystem for collaborative learning and research.', image: 'https://picsum.photos/seed/publika/600/400', dataAiHint: 'digital library' },
    { title: 'SHUKA AI', description: 'A symbolic and systemic AI companion for personal and organizational sense-making.', image: 'https://picsum.photos/seed/shuka/600/400', dataAiHint: 'AI assistant' },
    { title: 'Eco-Wallet Prototypes', description: 'Prototypes for a unified eco-digital wallet and lifestyle pass.', image: 'https://picsum.photos/seed/eco-wallet/600/400', dataAiHint: 'digital wallet' },
  ],
  symbolic: [
    { title: 'VEDASHAKTIKA Universe', description: 'A symbolic-futuristic storytelling universe across multiple media.', image: 'https://picsum.photos/seed/veda/600/400', dataAiHint: 'mythology futuristic' },
    { title: 'Sigil Maps', description: 'Generative art creating personal and collective symbolic maps.', image: 'https://picsum.photos/seed/sigil-map/600/400', dataAiHint: 'symbolic map' },
    { title: 'Interactive Codexes', description: 'Web-based interactive codexes for exploring complex knowledge systems.', image: 'https://picsum.photos/seed/codex/600/400', dataAiHint: 'ancient book' },
  ],
  research: [
    { title: 'Water at 4°C', description: 'A paper exploring the unique properties of water and its implications for life.', image: 'https://picsum.photos/seed/water-research/600/400', dataAiHint: 'water molecule' },
    { title: 'Theory of Everything', description: 'A multidisciplinary approach to a unified model of reality.', image: 'https://picsum.photos/seed/theory-of-everything/600/400', dataAiHint: 'fractal geometry' },
    { title: 'GOBERdhan', description: 'Research papers on a sustainable urban framework for India.', image: 'https://picsum.photos/seed/goberdhan-research/600/400', dataAiHint: 'sustainable city india' },
  ],
  creative: [
    { title: 'Narrative Decks', description: 'Visually rich presentation decks for film, brand, and venture storytelling.', image: 'https://picsum.photos/seed/narrative-deck/600/400', dataAiHint: 'presentation deck' },
    { title: 'Interactive Apps', description: 'Engaging web and mobile applications for brands and educational purposes.', image: 'https://picsum.photos/seed/interactive-app/600/400', dataAiHint: 'mobile app' },
    { title: 'Real Estate Webapps', description: 'Custom web applications for real estate marketing and sales.', image: 'https://picsum.photos/seed/real-estate-app/600/400', dataAiHint: 'luxury real estate' },
  ],
};

const PortfolioCard = ({ title, description, image, dataAiHint }: { title: string; description: string; image: string; dataAiHint: string; }) => (
  <Card className="overflow-hidden group relative">
    <Image 
      src={image} 
      alt={title} 
      width={600} 
      height={400} 
      className="object-cover aspect-video w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105" 
      data-ai-hint={dataAiHint} 
    />
    <div className="absolute inset-0 bg-black/50 bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 ease-in-out">
      <div className="p-4 h-full flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="font-headline text-lg text-white font-bold">{title}</h3>
        <p className="text-sm text-white/80 mt-1">{description}</p>
      </div>
    </div>
  </Card>
);

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
          
          <TabsContent value="urban" className="mt-8 animate-in fade-in-50 duration-500">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.urban.map((item) => (
                <PortfolioCard key={item.title} {...item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ai" className="mt-8 animate-in fade-in-50 duration-500">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.ai.map((item) => (
                 <PortfolioCard key={item.title} {...item} />
              ))}
            </div>
          </TabsContent>

           <TabsContent value="symbolic" className="mt-8 animate-in fade-in-50 duration-500">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.symbolic.map((item) => (
                 <PortfolioCard key={item.title} {...item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="research" className="mt-8 animate-in fade-in-50 duration-500">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.research.map((item) => (
                 <PortfolioCard key={item.title} {...item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="creative" className="mt-8 animate-in fade-in-50 duration-500">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.creative.map((item) => (
                 <PortfolioCard key={item.title} {...item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
