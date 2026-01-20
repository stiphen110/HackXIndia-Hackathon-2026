import { OnboardingProvider } from "@/contexts/OnboardingContext";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <div className="container mx-auto max-w-3xl py-12 px-4">
        <OnboardingFlow />
      </div>
    </OnboardingProvider>
  );
}
