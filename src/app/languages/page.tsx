import { languageList } from '@/lib/languages';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function LanguagesPage() {
  const slugify = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 pt-24">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
          Explore Languages
        </h1>
        <p className="text-muted-foreground">
          Choose a language to start your learning journey.
        </p>
      </div>
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y">
            {languageList.map((language) => (
              <li key={language}>
                <Link href={`/languages/${slugify(language)}`} className="block hover:bg-secondary">
                  <div className="flex items-center justify-between p-4">
                    <span className="font-medium">{language}</span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
       <div className="text-center mt-8">
          <Button variant="outline" asChild>
              <Link href="/">
                Back to Home
              </Link>
          </Button>
      </div>
    </main>
  );
}
