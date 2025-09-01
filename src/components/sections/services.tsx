import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, BrainCircuit, Building, Scaling, Users, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Regenerative AI',
    description: 'Developing AI that learns from and contributes to natural ecosystems, promoting biodiversity and resource optimization.',
  },
  {
    icon: <Building className="h-8 w-8 text-primary" />,
    title: 'Urban Symbiosis',
    description: 'Designing smart cities where infrastructure, technology, and nature coexist in a mutually beneficial relationship.',
  },
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: 'Bio-integrated Systems',
    description: 'Engineering solutions that merge biological processes with digital technology for sustainable living.',
  },
  {
    icon: <Scaling className="h-8 w-8 text-primary" />,
    title: 'Decentralized Networks',
    description: 'Building resilient, community-owned networks for data, energy, and resource management.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Human-AI Collaboration',
    description: 'Creating frameworks for intuitive and ethical collaboration between humans and intelligent systems.',
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Futures Strategy',
    description: 'Providing strategic foresight and scenario planning for organizations navigating complex systemic change.',
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
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
          {services.map((service) => (
            <Card key={service.title} className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                {service.icon}
                <CardTitle className="font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
