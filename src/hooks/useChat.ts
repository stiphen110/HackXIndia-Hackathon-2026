"use client";

import { useState } from 'react';
import { personalizedAssistanceChatbot } from '@/ai/flows/personalized-assistance-chatbot';
import { schemes } from '@/lib/data/schemes';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (userMessage: string) => {
    setIsLoading(true);
    const newMessage: Message = { id: Date.now().toString(), role: 'user', content: userMessage };
    setMessages(prev => [...prev, newMessage]);

    try {
      const schemeDetails = JSON.stringify(schemes, null, 2);
      const response = await personalizedAssistanceChatbot({ question: userMessage, schemeDetails });
      
      const assistantMessageContent = `
**Answer:** ${response.answer}

**Suggested Schemes:** ${response.suggestedSchemes}

**Support Contact:** ${response.contactInformation}
      `.trim();

      const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: assistantMessageContent };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error("Error calling chatbot:", error);
      const errorMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: "I'm sorry, I encountered an error. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage };
}
