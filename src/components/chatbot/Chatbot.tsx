'use client';
import { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useChat } from '@/hooks/useChat';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Loader2, User, Sparkles } from 'lucide-react';
import ChatbotTrigger from './ChatbotTrigger';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // This is a bit of a hack to get the viewport element.
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
             viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  const handleSend = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleSend();
    }
  }

  return (
    <>
      <ChatbotTrigger onClick={() => setIsOpen(true)} />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Personalized Assistant</SheetTitle>
            <SheetDescription>
              Ask me anything about government schemes, eligibility, or application processes.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex items-start gap-3',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'assistant' && (
                       <Avatar className='w-8 h-8'>
                         <AvatarFallback className='bg-primary text-primary-foreground'><Sparkles className="w-4 h-4" /></AvatarFallback>
                       </Avatar>
                    )}
                    <div
                      className={cn(
                        'rounded-lg p-3 max-w-sm prose prose-sm',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}
                    >
                      <ReactMarkdown
                        components={{
                            p: ({node, ...props}) => <p className="text-sm" {...props} />,
                            h1: ({node, ...props}) => <h1 className="text-lg" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-4" {...props} />,
                            li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        }}
                      >{message.content}</ReactMarkdown>
                    </div>
                     {message.role === 'user' && (
                       <Avatar className='w-8 h-8'>
                         <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                       </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                   <div className="flex items-start gap-3 justify-start">
                     <Avatar className='w-8 h-8'>
                        <AvatarFallback className='bg-primary text-primary-foreground'><Sparkles className="w-4 h-4" /></AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg p-3 bg-muted flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Thinking...
                      </div>
                   </div>
                )}
              </div>
            </ScrollArea>
          </div>
          <div className="p-4 border-t">
            <div className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="pr-12"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute top-1/2 right-1.5 -translate-y-1/2 h-7 w-7"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
