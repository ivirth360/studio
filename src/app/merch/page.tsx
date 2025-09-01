
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Wand2, Loader2, Sparkles, ShoppingCart } from 'lucide-react';

import Header from '@/components/header';
import Footer from '@/components/footer';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { getSigil } from '@/app/actions';
import type { GenerateSigilOutput } from '@/ai/flows/sigil-generator-flow';

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const products = [
    { name: "T-Shirt", image: "https://picsum.photos/seed/merch-tshirt/600/600", dataAiHint: "plain t-shirt" },
    { name: "Hoodie", image: "https://picsum.photos/seed/merch-hoodie/600/600", dataAiHint: "plain hoodie" },
    { name: "Bamboo Bottle", image: "https://picsum.photos/seed/merch-bottle/600/600", dataAiHint: "bamboo bottle" },
    { name: "Bamboo Mug", image: "https://picsum.photos/seed/merch-mug/600/600", dataAiHint: "bamboo mug" },
    { name: "Bamboo Tumblr", image: "https://picsum.photos/seed/merch-tumblr/600/600", dataAiHint: "bamboo tumblr" },
    { name: "Bamboo Diary", image: "https://picsum.photos/seed/merch-diary/600/600", dataAiHint: "bamboo diary" },
    { name: "Bamboo Pen", image: "https://picsum.photos/seed/merch-pen/600/600", dataAiHint: "bamboo pen" },
];

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  zodiacSign: z.string({ required_error: "Please select a zodiac sign." }),
});

export default function MerchPage() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [sigilResult, setSigilResult] = useState<GenerateSigilOutput | null>(null);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSigilResult(null);
    startTransition(async () => {
      const result = await getSigil(values);
      if (result.success && result.sigil) {
        toast({
          title: 'Sigil Generated!',
          description: "Your personal sigil has been crafted.",
        });
        setSigilResult(result.sigil);
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: result.message || 'There was a problem generating your sigil.',
        });
      }
    });
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section id="merch-store" className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className={cn("font-headline text-3xl font-bold tracking-tighter sm:text-4xl", "text-gradient bg-gradient-gold")}>
                Personalized Symbiotic Merch
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Create your own unique sigil with SHUKA AI, based on your name and zodiac sign. A symbol of your personal power, printed on our sustainable products.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 mt-12">
              {/* Left Column: Form and Sigil Result */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                      <Wand2 className="text-primary"/>
                      Craft Your Sigil
                    </CardTitle>
                    <CardDescription>
                      Enter your details below and let SHUKA AI generate a symbol unique to your cosmic signature.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="zodiacSign"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Zodiac Sign</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your zodiac sign" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {zodiacSigns.map(sign => (
                                    <SelectItem key={sign} value={sign}>{sign}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" disabled={isPending} className="w-full">
                          {isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating Your Symbol...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Generate Sigil
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                {sigilResult && (
                    <Card className="animate-in fade-in duration-500">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">{sigilResult.sigilName}</CardTitle>
                            <CardDescription>{sigilResult.sigilDescription}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center items-center">
                            <Image src={sigilResult.sigilImageDataUri} alt={sigilResult.sigilName} width={200} height={200} className="rounded-lg bg-white p-2 shadow-inner" />
                        </CardContent>
                    </Card>
                )}

              </div>

              {/* Right Column: Product Preview & Selection */}
              <div className="space-y-8">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">Product Preview</CardTitle>
                    <CardDescription>Select a product to see your personalized sigil on it.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                        <Image src={selectedProduct.image} alt={selectedProduct.name} layout="fill" objectFit="cover" data-ai-hint={selectedProduct.dataAiHint} />
                        {(isPending || sigilResult) && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                {isPending ? (
                                    <Loader2 className="h-16 w-16 animate-spin text-white" />
                                ) : sigilResult ? (
                                    <Image src={sigilResult.sigilImageDataUri} alt={sigilResult.sigilName} width={200} height={200} className="drop-shadow-lg" />
                                ) : null}
                            </div>
                        )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                     <div className="grid grid-cols-4 gap-2 w-full">
                        {products.map(product => (
                            <button key={product.name} onClick={() => setSelectedProduct(product)} className={cn("rounded-lg border-2 aspect-square bg-muted p-1 hover:border-primary transition-colors", selectedProduct.name === product.name ? "border-primary" : "border-transparent")}>
                                <Image src={product.image} alt={product.name} width={100} height={100} className="object-cover rounded-md w-full h-full" data-ai-hint={product.dataAiHint} />
                            </button>
                        ))}
                     </div>
                     <Button className="w-full" size="lg" disabled={!sigilResult}>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart (Coming Soon)
                     </Button>
                  </CardFooter>
                </Card>
              </div>

            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
