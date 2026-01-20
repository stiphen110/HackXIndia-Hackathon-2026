import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

type ChatbotTriggerProps = {
  onClick: () => void;
};

export default function ChatbotTrigger({ onClick }: ChatbotTriggerProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
      aria-label="Open personal assistant"
    >
      <MessageCircle className="h-8 w-8" />
    </Button>
  );
}
