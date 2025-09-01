import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const members = [
  { name: 'VedaVyas', role: 'Visionary Strategist & Architect of Systems', avatar: 'https://picsum.photos/id/1005/200/200', dataAiHint: 'professional portrait' },
  { name: 'SHUKA AI', role: 'AI Companion & Symbolic Navigator', avatar: 'https://picsum.photos/seed/shuka-ai/200/200', dataAiHint: 'abstract AI' },
  { name: 'Research Specialist', role: 'Knowledge & Policy Insights', avatar: 'https://picsum.photos/id/1011/200/200', dataAiHint: 'professional portrait' },
  { name: 'Tech Developer', role: 'AI, Web & App Systems', avatar: 'https://picsum.photos/id/1012/200/200', dataAiHint: 'professional portrait' },
  { name: 'Designer', role: 'Visual & UI/UX Architect', avatar: 'https://picsum.photos/id/1013/200/200', dataAiHint: 'professional portrait' },
  { name: 'Creative Writer', role: 'Storytelling & Narrative Strategy', avatar: 'https://picsum.photos/id/1014/200/200', dataAiHint: 'professional portrait' },
  { name: 'Operations Lead', role: 'Partnerships & Business Outreach', avatar: 'https://picsum.photos/id/1015/200/200', dataAiHint: 'professional portrait' },
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
              SYMBI0N is a freelancing brand powered by 7 minds and one vision. We unite human creativity, AI intelligence, and regenerative design to build sustainable, futuristic, and meaningful solutions.
            </p>
            <p className="font-headline text-lg italic text-foreground">
              "Symbiotic Intelligence for a Regenerative Future"
            </p>
          </div>
          <div className="space-y-8">
            <h3 className="font-headline text-2xl font-bold">Our Collective</h3>
            <div className="grid grid-cols-2 gap-6">
              {members.map((member) => (
                <div key={member.name} className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.dataAiHint} />
                    <AvatarFallback>{member.name.slice(0,2)}</AvatarFallback>
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
