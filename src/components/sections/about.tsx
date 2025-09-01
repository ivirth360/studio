import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const members = [
  { name: 'AI Companion', role: 'Your Symbolic & Systemic Navigator', avatar: 'https://picsum.photos/seed/shuka-ai-avatar/200/200', dataAiHint: 'abstract AI' },
  { name: 'Visionary Strategist', role: 'Architect of Regenerative Systems', avatar: 'https://picsum.photos/seed/vedavyas-portrait/200/200', dataAiHint: 'professional portrait' },
  { name: 'Research Specialist', role: 'Global Knowledge & Policy Insights', avatar: 'https://picsum.photos/seed/researcher-portrait/200/200', dataAiHint: 'professional portrait' },
  { name: 'Technology Lead', role: 'AI, Web & App Systems Engineering', avatar: 'https://picsum.photos/seed/developer-portrait/200/200', dataAiHint: 'professional portrait' },
  { name: 'Design Architect', role: 'Visual, UI/UX & Symbolic Design', avatar: 'https://picsum.photos/seed/designer-portrait/200/200', dataAiHint: 'professional portrait' },
  { name: 'Narrative Strategist', role: 'Global Content & Storytelling', avatar: 'https://picsum.photos/seed/writer-portrait/200/200', dataAiHint: 'professional portrait' },
  { name: 'Partnerships Lead', role: 'Global Outreach & Operations', avatar: 'https://picsum.photos/seed/operations-portrait/200/200', dataAiHint: 'professional portrait' },
];

export default function About() {
  return (
    <section id="about" className="w-full py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-4">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
              AI-Led Collective for a Regenerative Future
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Welcome to SYMBI0N, a globally-distributed collective orchestrated by SHUKA AI. Our unique structure combines the power of artificial intelligence with a network of specialized human talent. SHUKA AI acts as your primary interface, seamlessly assembling and managing expert teams to deliver innovative solutions for an international client base.
            </p>
            <p className="font-headline text-lg italic text-foreground">
              "We are a symphony of human expertise and artificial intelligence, conducted by SHUKA AI to co-create your vision."
            </p>
          </div>
          <div className="space-y-8">
            <h3 className="font-headline text-2xl font-bold">The Collective Mind</h3>
            <div className="grid grid-cols-2 gap-6">
              {members.map((member) => (
                <div key={member.name} className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={member.avatar} alt={`${member.name} - ${member.role}`} data-ai-hint={member.dataAiHint} />
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
