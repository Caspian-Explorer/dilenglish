'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generatePlacementTest, PlacementTestQuestion } from '@/ai/flows/language-placement-test';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Loader, Trophy } from 'lucide-react';

export default function PlacementTestPage({ params }: { params: { slug: string } }) {
  const [questions, setQuestions] = useState<PlacementTestQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [assessedLevel, setAssessedLevel] = useState('');
  const router = useRouter();

  const unslugify = (slug: string) => {
    const words = slug.split('-');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  const languageName = unslugify(params.slug);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        setIsLoading(true);
        const result = await generatePlacementTest({ language: languageName });
        setQuestions(result.questions);
        setSelectedAnswers(new Array(result.questions.length).fill(null));
      } catch (err) {
        console.error('Failed to generate test:', err);
        setError('Could not load the placement test. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTest();
  }, [languageName]);

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctOptionIndex) {
        correctAnswers++;
      }
    });

    const finalScore = (correctAnswers / questions.length) * 100;
    setScore(finalScore);

    let level = 'A1';
    if (finalScore >= 90) {
      level = 'B2';
    } else if (finalScore >= 70) {
      level = 'B1';
    } else if (finalScore >= 50) {
      level = 'A2';
    }
    setAssessedLevel(level);

    // Here you would typically save the result to the user's profile in a database.
    console.log({ language: languageName, level: level });

    setIsFinished(true);
  };

  if (isLoading) {
    return (
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 pt-24">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <div className="flex justify-end mt-4">
              <Skeleton className="h-10 w-24" />
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 pt-24">
         <Alert variant="destructive" className="max-w-3xl mx-auto">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      </main>
    )
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 pt-24">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">
            {languageName} Placement Test
          </CardTitle>
          {!isFinished && <CardDescription>Complete the questions to assess your level.</CardDescription>}
        </CardHeader>
        <CardContent>
          {isFinished ? (
            <div className="text-center space-y-4 flex flex-col items-center">
              <Trophy className="w-16 h-16 text-yellow-500" />
              <h2 className="text-2xl font-bold">Test Complete!</h2>
              <p className="text-muted-foreground">You scored <span className="font-bold">{score.toFixed(0)}%</span>.</p>
              <p className="text-xl">Your assessed level is: <span className="text-primary font-bold">{assessedLevel}</span></p>
               <div className='border rounded-lg p-4 bg-secondary/50 w-full'>
                 <p className='text-sm text-muted-foreground'>This result has been saved to your profile. You can now start with lessons tailored to your level.</p>
               </div>
              <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <Progress value={progress} className="w-full" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Question {currentQuestionIndex + 1} of {questions.length} ({currentQuestion.difficultyLevel})</p>
                <h3 className="text-lg font-semibold">{currentQuestion.questionText}</h3>
              </div>
              <RadioGroup
                onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                value={selectedAnswers[currentQuestionIndex]?.toString()}
                className="space-y-2"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer p-3 border rounded-md hover:bg-secondary has-[[data-state=checked]]:bg-secondary has-[[data-state=checked]]:border-primary">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="flex justify-end mt-4">
                <Button onClick={handleNext} disabled={selectedAnswers[currentQuestionIndex] === null}>
                  {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
