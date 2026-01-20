import { schemes } from '@/lib/data/schemes';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import ApplyChecklist from '@/components/schemes/ApplyChecklist';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function SchemeDetailPage({ params }: { params: { slug: string } }) {
  const scheme = schemes.find(s => s.slug === params.slug);

  if (!scheme) {
    notFound();
  }

  return (
    <ProtectedRoute>
      <div className="bg-secondary/50">
        <div className="container py-12 px-4 md:px-6">
          <div className="mb-8">
              <Button variant="outline" asChild>
                  <Link href="/schemes" className="inline-flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Back to All Schemes
                  </Link>
              </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="relative aspect-video w-full mb-6 overflow-hidden rounded-lg">
                  <Image
                      src={scheme.image.imageUrl}
                      alt={scheme.image.description}
                      data-ai-hint={scheme.image.imageHint}
                      fill
                      className="object-cover"
                  />
              </div>
              <Badge>{scheme.category}</Badge>
              <h1 className="font-headline text-3xl md:text-4xl font-bold mt-2">{scheme.name}</h1>
              <p className="text-lg text-muted-foreground mt-2">{scheme.benefitSummary}</p>
              <div className="prose prose-lg max-w-none mt-6">
                  <p>{scheme.description}</p>
              </div>
            </div>
            <div className="md:col-span-1">
              <Card>
                  <CardHeader>
                      <CardTitle className='font-headline'>How to Apply</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <ApplyChecklist scheme={scheme} />
                  </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// Generate static paths for all schemes
export async function generateStaticParams() {
    return schemes.map(scheme => ({
        slug: scheme.slug,
    }));
}
