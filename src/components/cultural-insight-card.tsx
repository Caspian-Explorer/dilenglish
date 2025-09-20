'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { usefulCulturalInsights } from '@/ai/flows/useful-cultural-insights';

export default function CulturalInsightCard() {
  const [insight, setInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInsight() {
      try {
        setIsLoading(true);
        setError(null);
        const result = await usefulCulturalInsights({
          language: 'Spanish',
          userInterests: 'Travel, food, and history',
        });
        setInsight(result.culturalInsight);
      } catch (e) {
        setError('Failed to load cultural insight. Please try again later.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchInsight();
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Cultural Insight</CardTitle>
        <CardDescription>A useful tip for your language journey</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {error && (
            <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {insight && <p className="text-sm text-muted-foreground">{insight}</p>}
      </CardContent>
    </Card>
  );
}
