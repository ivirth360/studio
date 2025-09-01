'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';
import { updateSiteContent } from '@/ai/flows/update-site-content-with-ai';
import { Separator } from './ui/separator';

const formSchema = z.object({
  contentType: z.string().min(1, 'Content type is required.'),
  contentGoal: z.string().min(1, 'Content goal is required.'),
  eventDescription: z.string().min(1, 'Event description is required.'),
  currentContent: z.string().optional(),
});

export default function AiContentTool() {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentType: 'Homepage Headline',
      contentGoal: 'Announce a new partnership with a bio-tech firm',
      eventDescription: 'We just signed a deal with "GenetiCraft" to co-develop a new line of bio-sensors.',
      currentContent: 'Co-creating Regenerative Futures',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setAiResponse(null);
    startTransition(async () => {
      const response = await updateSiteContent(values);
      if (response && response.updatedContent) {
        setAiResponse(response.updatedContent);
      }
    });
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      setAiResponse(null);
    }
    setIsOpen(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Sparkles className="mr-2 h-4 w-4" />
          AI Content Tool
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className='font-headline flex items-center gap-2'>
            <Sparkles className="text-primary" />
            AI-Powered Content Generation
          </DialogTitle>
          <DialogDescription>
            Update site content in response to events. Fill in the details below and let AI generate new text.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="contentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Homepage Headline" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Goal</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Attract more users" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trigger Event</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the event..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="currentContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Content (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Current text on the site" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </form>
          </Form>
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Generated Content</h3>
            <div className="rounded-md border bg-muted min-h-[200px] p-4 text-sm relative">
              {isPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                </div>
              )}
              {aiResponse ? (
                <p>{aiResponse}</p>
              ) : (
                 !isPending && <p className="text-muted-foreground">The generated content will appear here.</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
