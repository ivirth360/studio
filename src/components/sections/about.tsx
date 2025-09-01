import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const members = [
  { name: 'Elara Vance', role: 'AI Ethicist & Systems Architect', avatar: 'https://picsum.photos/id/1/200/200', dataAiHint: 'professional portrait' },
  { name: 'Kaelen Rask', role: 'Urban Ecologist & Designer', avatar: 'https://picsum.photos/id/2/200/200', dataAiHint: 'professional portrait' },
  { name: 'Jaxon terra', role: 'Bio-Roboticist & Futurist', avatar: 'https://picsum.photos/id/3/200/200', dataAiHint: 'professional portrait' },
  { name: 'Lyra Chen', role: 'Lead Strategist & Storyteller', avatar: 'https://picsum.photos/id/4/200/200', dataAiHint: 'professional portrait' },
];

export default function About() {
  return (
    <section id="about" className="w-full py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-4">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
              Who We Are
            </h2>
            <p className="text-muted-foreground md:text-lg">
              We are a decentralized collective of strategists, designers, and technologists united by a shared vision: to harmonize technology with nature and create resilient, self-sustaining systems for future generations.
            </p>
            <p className="font-headline text-lg italic text-foreground">
              "We don't just predict the future; we design the seeds from which it can grow."
            </p>
          </div>
          <div className="space-y-8">
            <h3 className="font-headline text-2xl font-bold">The Collective</h3>
            <div className="grid grid-cols-2 gap-6">
              {members.map((member) => (
                <div key={member.name} className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.dataAiHint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
