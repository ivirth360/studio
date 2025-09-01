'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTransition, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getProjectEstimate } from '@/app/actions';
import { Loader2, Wand2, DollarSign, Clock, List } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';
import type { EstimateProjectOutput } from '@/ai/flows/project-estimator-flow';

const formSchema = z.object({
  description: z.string().min(20, { message: 'Please provide a more detailed description (at least 20 characters).' }),
});

export default function ProjectEstimator() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [estimation, setEstimation] = useState<EstimateProjectOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setEstimation(null);
    startTransition(async () => {
      const result = await getProjectEstimate(values);
      if (result.success) {
        toast({
          title: 'Estimate Generated!',
          description: "Here's a high-level estimate for your project.",
        });
        setEstimation(result.estimation);
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: result.message || 'There was a problem generating your estimate.',
        });
      }
    });
  }

  return (
    <section id="estimator" className="w-full py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
             <h2 className={cn("font-headline text-3xl font-bold tracking-tighter sm:text-4xl", "text-gradient bg-gradient-gold")}>
              AI Project Estimator
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Have an idea? Describe your project, and our AI assistant will provide a high-level, non-binding estimate to get the conversation started. The more detail you provide, the more accurate the estimate will be.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your project, including key features, goals, and target audience..." 
                          className="min-h-[150px] bg-background" 
                          {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending} size="lg">
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Estimate
                </Button>
              </form>
            </Form>
          </div>

          <div className="space-y-6">
            <Card className="bg-background/50 h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                    <Wand2 className="text-primary"/>
                    Your AI-Generated Estimate
                    </CardTitle>
                    <CardDescription>
                    This is a preliminary estimate and is subject to change after a detailed discussion.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isPending ? (
                    <div className="flex items-center justify-center h-48 text-muted-foreground">
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        <p className="text-lg">Generating your estimate...</p>
                    </div>
                    ) : estimation ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                            <div className="p-4 rounded-lg bg-muted">
                                <p className="text-sm text-muted-foreground">Estimated Cost (USD)</p>
                                <p className="text-2xl font-bold text-primary">{estimation.estimatedCostUsd}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted">
                                <p className="text-sm text-muted-foreground">Estimated Cost (INR)</p>
                                <p className="text-2xl font-bold">{estimation.estimatedCostInr}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold flex items-center gap-2"><Clock className="h-5 w-5 text-primary"/> Estimated Timeline</h4>
                            <p className="text-muted-foreground">{estimation.timeline}</p>
                        </div>
                         <div className="space-y-4">
                            <h4 className="font-bold flex items-center gap-2"><List className="h-5 w-5 text-primary"/> Cost Breakdown</h4>
                            <p className="text-muted-foreground whitespace-pre-line">{estimation.breakdown}</p>
                        </div>
                    </div>
                    ) : (
                    <div className="flex items-center justify-center h-48 text-muted-foreground">
                        <p>Your project estimate will appear here.</p>
                    </div>
                    )}
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
