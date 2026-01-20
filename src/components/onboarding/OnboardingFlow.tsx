"use client";

import { useOnboarding } from "@/contexts/OnboardingContext";
import { onboardingQuestions } from "@/lib/data/questions";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EligibilityMeter from "./EligibilityMeter";

export default function OnboardingFlow() {
  const { state, dispatch } = useOnboarding();
  const router = useRouter();

  const currentQuestion = onboardingQuestions[state.currentStep];
  const isLastStep = state.currentStep === onboardingQuestions.length - 1;
  const isFinished = state.currentStep === onboardingQuestions.length;

  const handleNext = () => {
    if (isLastStep) {
      const query = new URLSearchParams(state.answers as any).toString();
      router.push(`/schemes?${query}`);
    } else {
      dispatch({ type: "NEXT_STEP" });
    }
  };

  const handlePrev = () => {
    dispatch({ type: "PREV_STEP" });
  };
  
  const handleAnswer = (value: any) => {
    dispatch({ type: "SET_ANSWER", payload: { key: currentQuestion.key, value } });
  }
  
  const isNextDisabled = currentQuestion && state.answers[currentQuestion.key] === undefined;

  if (isFinished) {
    // This state should ideally not be reached as we navigate away on the last step.
    return (
        <div className="text-center">
            <h2 className="font-headline text-2xl font-bold mb-4">Thank you!</h2>
            <p className="text-muted-foreground mb-6">Generating your personalized scheme results...</p>
            <Button onClick={() => router.push(`/schemes?${new URLSearchParams(state.answers as any).toString()}`)}>
                See My Schemes
            </Button>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full mb-8">
        <EligibilityMeter currentStep={state.currentStep} totalSteps={onboardingQuestions.length} />
        <p className="text-center text-sm text-muted-foreground mt-2">
            Step {state.currentStep + 1} of {onboardingQuestions.length}
        </p>
      </div>

      <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-8 text-center animate-in fade-in-50 duration-500">
        <h2 className="font-headline text-2xl font-bold mb-6">{currentQuestion.text}</h2>
        <div className="max-w-sm mx-auto">
          {currentQuestion.type === 'number' && (
            <Input 
              type="number" 
              placeholder={currentQuestion.placeholder}
              value={state.answers[currentQuestion.key] as string || ''}
              onChange={(e) => handleAnswer(parseInt(e.target.value, 10) || undefined)}
              className="text-center text-lg h-12"
            />
          )}

          {currentQuestion.type === 'radio' && (
            <RadioGroup 
              value={state.answers[currentQuestion.key] as string}
              onValueChange={handleAnswer}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {currentQuestion.options?.map(option => (
                <div key={option} className="flex-1">
                  <RadioGroupItem value={option} id={option} className="sr-only peer" />
                  <Label 
                    htmlFor={option}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary text-lg h-full"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQuestion.type === 'select' && (
            <Select
              value={state.answers[currentQuestion.key] as string}
              onValueChange={handleAnswer}
            >
              <SelectTrigger className="w-full text-lg h-12">
                <SelectValue placeholder={currentQuestion.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {currentQuestion.options?.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div className="flex justify-between w-full mt-8">
        <Button variant="outline" onClick={handlePrev} disabled={state.currentStep === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext} disabled={isNextDisabled}>
          {isLastStep ? 'Finish' : 'Next'}
          {isLastStep ? <Send className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
