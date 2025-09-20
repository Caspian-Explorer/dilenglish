'use client';

import { useState } from 'react';
import type { DialogueScenario, ConversationTurn, DialogueOption } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';

export default function DialogueSimulation({ scenario }: { scenario: DialogueScenario }) {
  const [messages, setMessages] = useState<ConversationTurn[]>(scenario.conversation);
  const [currentOptions, setCurrentOptions] = useState<DialogueOption[]>(scenario.options);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleOptionSelect = (option: DialogueOption) => {
    const newMessages: ConversationTurn[] = [
      ...messages,
      { type: 'user', text: option.text },
      { type: 'bot', text: option.response },
    ];
    setMessages(newMessages);

    if (option.nextOptions && option.nextOptions.length > 0) {
      setCurrentOptions(option.nextOptions);
    } else {
      setCurrentOptions([]);
      setIsCompleted(true);
    }
  };

  const resetSimulation = () => {
    setMessages(scenario.conversation);
    setCurrentOptions(scenario.options);
    setIsCompleted(false);
  }

  return (
    <Dialog onOpenChange={(open) => !open && resetSimulation()}>
      <DialogTrigger asChild>
        <Button className="w-full bg-primary hover:bg-primary/90">Start Simulation</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">{scenario.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex items-end gap-2 ${message.type === 'user' ? 'justify-end' : ''}`}>
                   {message.type === 'bot' && (
                     <Avatar className="h-8 w-8">
                       <AvatarFallback className='bg-secondary'><Bot className="h-5 w-5"/></AvatarFallback>
                     </Avatar>
                   )}
                  <div
                    className={`max-w-[75%] rounded-lg p-3 text-sm ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.type === 'user' && (
                     <Avatar className="h-8 w-8">
                       <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                     </Avatar>
                   )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="grid grid-cols-1 gap-2">
            {isCompleted ? (
                 <div className='text-center p-4 bg-secondary rounded-lg'>
                    <p className='font-semibold'>Conversation complete!</p>
                    <Button variant="link" onClick={resetSimulation}>Practice again</Button>
                 </div>
            ) : (
                currentOptions.map((option, index) => (
                    <Button key={index} variant="outline" onClick={() => handleOptionSelect(option)}>
                        {option.text}
                    </Button>
                ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
