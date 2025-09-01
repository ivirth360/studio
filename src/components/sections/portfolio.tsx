'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const portfolioItems = {
  urban: [
    { title: 'Project Ærden', description: 'A self-sustaining vertical farm integrated into a residential high-rise.', image: 'https://picsum.photos/seed/urban1/600/400', dataAiHint: 'urban farming' },
    { title: 'Myco-Grid', description: 'A decentralized energy grid powered by bio-electric fungi networks.', image: 'https://picsum.photos/seed/urban2/600/400', dataAiHint: 'bio technology' },
    { title: 'FlowState', description: 'A dynamic public transit system that adapts to real-time city-wide movement patterns.', image: 'https://picsum.photos/seed/urban3/600/400', dataAiHint: 'smart city' },
  ],
  ai: [
    { title: 'GaiaMind', description: 'An open-source AI platform that monitors and predicts ecological changes.', image: 'https://picsum.photos/seed/ai1/600/400', dataAiHint: 'AI ecology' },
    { title: 'KelpNet', description: 'A neural network architecture inspired by the growth patterns of kelp forests.', image: 'https://picsum.photos/seed/ai2/600/400', dataAiHint: 'neural network' },
    { title: 'Symbiotic OS', description: 'An operating system designed for seamless human-machine collaboration.', image: 'https://picsum.photos/seed/ai3/600/400', dataAiHint: 'humanoid robot' },
  ],
  regenerative: [
    { title: 'SoilSense', description: 'IoT sensors that provide real-time data on soil health for regenerative agriculture.', image: 'https://picsum.photos/seed/regen1/600/400', dataAiHint: 'agriculture technology' },
    { title: 'CoralLattice', description: '3D-printed, bio-compatible structures to accelerate coral reef restoration.', image: 'https://picsum.photos/seed/regen2/600/400', dataAiHint: 'coral reef' },
    { title: 'Riverine', description: 'Autonomous drones that clean and monitor river ecosystems.', image: 'https://picsum.photos/seed/regen3/600/400', dataAiHint: 'river drone' },
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
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="urban">Urban Futures</TabsTrigger>
            <TabsTrigger value="ai">AI Systems</TabsTrigger>
            <TabsTrigger value="regenerative">Regenerative Tech</TabsTrigger>
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
           <TabsContent value="regenerative">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {portfolioItems.regenerative.map((item) => (
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
