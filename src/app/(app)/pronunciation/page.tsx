import PronunciationTool from './pronunciation-tool';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function PronunciationPage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Pronunciation Practice</CardTitle>
          <CardDescription>Record yourself saying a word or phrase and get instant AI feedback on your accuracy.</CardDescription>
        </CardHeader>
        <CardContent>
          <PronunciationTool />
        </CardContent>
      </Card>
    </main>
  );
}
