
import { languageList } from '@/lib/languages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {languageList.map((language) => (
          <Link href={`/languages/${slugify(language)}`} key={language} className="block break-inside-avoid">
            <Card className="hover:shadow-lg hover:border-primary transition-all">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">{language}</CardTitle>
                </CardHeader>
                 <CardContent>
                    <div className="flex justify-end">
                       <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardContent>
            </Card>
          </Link>
        ))}
      </div>
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
