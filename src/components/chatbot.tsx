'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, Loader2, Send, X, User } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { submitChatMessage } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';

type Message = {
  id: string;
  role: 'user' | 'model' | 'user-pending';
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const initialMessage: Message = {
    id: 'initial',
    role: 'model',
    content: "Hello! I'm SHUKA AI, your guide to SYMBI0N. How can I help you today? Feel free to ask about our services, or describe a project you have in mind.",
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        })
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessageId = Date.now().toString();
    const userMessage: Message = { id: userMessageId, role: 'user-pending', content: input };
    const newMessages: Message[] = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');

    startTransition(async () => {
      const chatHistory = newMessages.map(({ id, role, content }) => ({
          role: role === 'user-pending' ? 'user' : role,
          content,
      })) as ({role: 'user'|'model', content: string})[];

      const result = await submitChatMessage({ messages: chatHistory });

      if (result.success && result.response) {
        setMessages([
          ...messages,
          { ...userMessage, role: 'user' },
          { id: Date.now().toString(), role: 'model', content: result.response },
        ]);
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: result.message || 'There was a problem with the chat service.',
        });
        // Keep the user's message in the chat, but mark it as failed or show an error indicator
        setMessages(m => m.filter(msg => msg.id !== userMessageId));
      }
    });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={() => setIsOpen(!isOpen)} size="icon" className="rounded-full w-16 h-16 shadow-lg">
          {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
          <span className="sr-only">Toggle Chat</span>
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <Card className="w-[380px] h-[550px] flex flex-col shadow-2xl">
            <CardHeader className="flex-row items-center gap-3">
               <div className="relative">
                 <Bot className="h-10 w-10 text-primary p-2 bg-primary/20 rounded-full" />
                 <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
               </div>
               <div className='flex flex-col'>
                <CardTitle className="font-headline text-lg">SHUKA AI</CardTitle>
                <CardDescription>SYMBI0N Project Estimator</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full" ref={scrollAreaRef}>
                <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={cn("flex items-start gap-3", message.role === 'user' || message.role === 'user-pending' ? 'justify-end' : 'justify-start')}>
                     {message.role === 'model' && (
                        <Avatar className="w-8 h-8 border-2 border-primary/50">
                            <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                     )}
                     <div className={cn("max-w-[80%] rounded-xl px-4 py-2 text-sm",
                        message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted',
                        message.role === 'user-pending' && 'bg-primary/70 text-primary-foreground'
                        )}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                     </div>
                     {(message.role === 'user' || message.role === 'user-pending') && (
                        <Avatar className="w-8 h-8">
                            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                     )}
                  </div>
                ))}
                {isPending && (
                     <div className="flex items-start gap-3 justify-start">
                        <Avatar className="w-8 h-8 border-2 border-primary/50">
                            <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-xl px-4 py-3 text-sm flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Thinking...
                        </div>
                     </div>
                )}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className='p-4 border-t'>
              <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                <Input
                  id="message"
                  placeholder="Type your message..."
                  className="flex-1"
                  autoComplete="off"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isPending}
                />
                <Button type="submit" size="icon" disabled={isPending}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
