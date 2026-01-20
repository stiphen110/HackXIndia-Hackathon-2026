import { OnboardingProvider } from "@/contexts/OnboardingContext";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function OnboardingPage() {
  return (
    <ProtectedRoute>
      <OnboardingProvider>
        <div className="container mx-auto max-w-3xl py-12 px-4">
          <OnboardingFlow />
        </div>
      </OnboardingProvider>
    </ProtectedRoute>
  );
}
