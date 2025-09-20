import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { vocabularyLists } from '@/lib/data';
import * as lucideIcons from 'lucide-react';

export default function VocabularyPage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
          My Vocabulary
        </h1>
        <p className="text-muted-foreground">
          Curated lists to help you master new words.
        </p>
      </div>

      <div className="space-y-4">
        {vocabularyLists.map((list) => {
          const Icon = lucideIcons[list.icon as keyof typeof lucideIcons] as lucideIcons.LucideIcon;
          return (
            <Accordion key={list.category} type="single" collapsible className="w-full bg-card p-4 rounded-lg shadow-sm">
              <AccordionItem value={list.category} className="border-b-0">
                <AccordionTrigger className="text-lg font-headline hover:no-underline">
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="h-6 w-6 text-primary" />}
                    {list.category}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4 pt-4">
                    {list.words.map((wordData) => (
                      <li key={wordData.word} className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-base">{wordData.word}</p>
                          <p className="text-muted-foreground">{wordData.translation}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 italic">
                          "{wordData.example}"
                        </p>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </main>
  );
}
