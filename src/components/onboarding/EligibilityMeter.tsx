"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

type EligibilityMeterProps = {
  currentStep: number;
  totalSteps: number;
};

const messages = [
    "Let's get started...",
    "Just a few questions...",
    "Looking good...",
    "Almost there...",
    "Finishing up!",
];

export default function EligibilityMeter({ currentStep, totalSteps }: EligibilityMeterProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const calculatedProgress = totalSteps > 0 ? ((currentStep) / totalSteps) * 100 : 0;
    setProgress(calculatedProgress);
  }, [currentStep, totalSteps]);

  const messageIndex = Math.min(Math.floor(progress / (100 / messages.length)), messages.length - 1);

  return (
    <div className="w-full">
      <p className="text-center font-semibold text-primary mb-2 font-headline">{messages[messageIndex]}</p>
      <Progress value={progress} className="w-full" />
    </div>
  );
}
