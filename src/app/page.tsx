import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, CheckCircle, HelpCircle, ListChecks } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-family');

  return (
    <div className="flex flex-col">
      <section className="w-full bg-primary/10 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Suvidha Sahayak
                </h1>
                <p className="font-body text-muted-foreground md:text-xl">
                  Your friendly guide to Indian government schemes. Answer a few simple questions to find the benefits you are eligible for.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="font-headline">
                  <Link href="/onboarding">
                    Start Your Eligibility Check <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            {heroImage && (
               <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
              />
            )}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">How It Works</div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">A Simple Path to Your Benefits</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We've simplified the process of finding and applying for government schemes. No more confusion, no more complicated forms.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-12">
            <Card className="h-full">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <HelpCircle className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-headline text-xl font-bold">1. Answer Questions</h3>
                <p className="text-muted-foreground mt-2">
                  A simple, step-by-step process to understand your needs.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-headline text-xl font-bold">2. See Your Eligibility</h3>
                <p className="text-muted-foreground mt-2">
                  Instantly see which schemes you might qualify for.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <ListChecks className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-headline text-xl font-bold">3. Get Your Checklist</h3>
                <p className="text-muted-foreground mt-2">
                  Receive a simple checklist of documents and steps to apply.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
