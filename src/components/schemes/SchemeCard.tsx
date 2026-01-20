import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import type { EligibilityResult } from '@/lib/types';
import Icon from '../lib/icons';

type SchemeCardProps = {
  result: EligibilityResult;
};

export default function SchemeCard({ result }: SchemeCardProps) {
  const { scheme, isEligible, score, metCriteria, unmetCriteria } = result;

  const getEligibilityBadge = () => {
    if (isEligible) {
      return (
        <Badge variant="default" className="bg-green-600 hover:bg-green-700">
          <CheckCircle2 className="mr-1 h-4 w-4" />
          Eligible
        </Badge>
      );
    }
    if (score > 0) {
      return (
        <Badge variant="secondary" className="bg-amber-500 hover:bg-amber-600 text-white">
          <AlertCircle className="mr-1 h-4 w-4" />
          Possibly Eligible
        </Badge>
      );
    }
    return (
      <Badge variant="outline">
        <XCircle className="mr-1 h-4 w-4" />
        Not a Match
      </Badge>
    );
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="relative aspect-video w-full mb-4">
             <Image
                src={scheme.image.imageUrl}
                alt={scheme.image.description}
                data-ai-hint={scheme.image.imageHint}
                fill
                className="rounded-md object-cover"
              />
        </div>
        <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-xl leading-tight">{scheme.name}</CardTitle>
            {getEligibilityBadge()}
        </div>
        <CardDescription>{scheme.benefitSummary}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Accordion type="single" collapsible>
          <AccordionItem value="eligibility">
            <AccordionTrigger className="text-sm">Why you might be eligible</AccordionTrigger>
            <AccordionContent>
                <ul className="space-y-2 text-sm">
                    {metCriteria.map(rule => (
                        <li key={rule.key} className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                            <span>{rule.description}</span>
                        </li>
                    ))}
                    {unmetCriteria.map(rule => (
                        <li key={rule.key} className="flex items-start">
                            <XCircle className="h-4 w-4 text-destructive mr-2 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{rule.description}</span>
                        </li>
                    ))}
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/schemes/${scheme.slug}`}>
            View Details & Apply
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
