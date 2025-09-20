import { languageList } from '@/lib/languages';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugify = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  return languageList.map((language) => ({
    slug: slugify(language),
  }));
}

export default function LanguageDetailPage({ params }: { params: { slug: string } }) {
    const unslugify = (slug: string) => {
        const words = slug.split('-');
        return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    const languageName = unslugify(params.slug);


  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 pt-24">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
          {languageName}
        </h1>
        <p className="text-muted-foreground">
          Your learning hub for {languageName}.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
            <CardDescription>Start with the basics.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href={`/dashboard`}>
                Start Lesson 1
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vocabulary</CardTitle>
            <CardDescription>Build your word power.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button asChild className="w-full" variant="secondary">
              <Link href="/vocabulary">
                Review Vocabulary
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pronunciation</CardTitle>
            <CardDescription>Practice speaking.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button asChild className="w-full" variant="secondary">
              <Link href="/pronunciation">
                Practice Pronunciation
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Grammar</CardTitle>
            <CardDescription>Master the rules.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button asChild className="w-full" variant="secondary">
              <Link href="#">
                Practice Grammar
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
       <div className="text-center mt-8">
          <Button variant="outline" asChild>
              <Link href="/languages">
                Back to all languages
              </Link>
          </Button>
      </div>
    </main>
  );
}
