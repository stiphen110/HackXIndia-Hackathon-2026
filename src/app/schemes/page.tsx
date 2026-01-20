import { Suspense } from 'react';
import { calculateEligibility } from '@/lib/eligibility';
import { schemes } from '@/lib/data/schemes';
import SchemeCard from '@/components/schemes/SchemeCard';
import type { UserAnswers } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

function Results({searchParams}: {searchParams: UserAnswers}) {
    const answers: UserAnswers = {
        age: searchParams.age ? Number(searchParams.age) : undefined,
        annualIncome: searchParams.annualIncome ? Number(searchParams.annualIncome) : undefined,
        state: searchParams.state,
        category: searchParams.category,
        occupation: searchParams.occupation,
    };

    const eligibilityResults = calculateEligibility(answers, schemes);
    const eligibleSchemesCount = eligibilityResults.filter(r => r.isEligible).length;

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Your Personalized Schemes</h1>
                <p className="text-muted-foreground md:text-xl">
                    Based on your answers, here are the schemes you might be eligible for.
                </p>
                {eligibleSchemesCount > 0 && (
                    <Alert variant="default" className="max-w-2xl mx-auto text-left">
                        <Info className="h-4 w-4" />
                        <AlertTitle className="font-semibold">You have {eligibleSchemesCount} scheme{eligibleSchemesCount > 1 && 's'} you are likely eligible for!</AlertTitle>
                        <AlertDescription>
                            Review the details below and prepare the required documents to apply.
                        </AlertDescription>
                    </Alert>
                )}
            </div>

            {eligibilityResults.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {eligibilityResults.map(result => (
                        <SchemeCard key={result.scheme.id} result={result} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground mb-4">No schemes found based on your answers.</p>
                </div>
            )}
             <div className="text-center mt-12">
                <Button variant="outline" asChild>
                    <Link href="/onboarding">Start Over</Link>
                </Button>
            </div>
        </div>
    );
}


export default function SchemesPage({ searchParams }: { searchParams: UserAnswers }) {
    if (Object.keys(searchParams).length === 0) {
        return (
            <div className="container py-12 text-center">
                 <Alert variant="destructive" className="max-w-md mx-auto">
                    <Info className="h-4 w-4" />
                    <AlertTitle>No Information Provided</AlertTitle>
                    <AlertDescription>
                        Please complete the eligibility check to see your personalized schemes.
                    </AlertDescription>
                </Alert>
                <Button asChild className="mt-6">
                    <Link href="/onboarding">Start Eligibility Check</Link>
                </Button>
            </div>
        );
    }
    
    return (
        <div className="container py-12">
            <Suspense fallback={<div>Loading results...</div>}>
                <Results searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
