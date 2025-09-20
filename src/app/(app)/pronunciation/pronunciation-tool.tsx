'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Send, Loader, AlertCircle, Sparkles, Dna, Volume2 } from 'lucide-react';
import { getPronunciationFeedback, PronunciationFeedbackOutput } from '@/ai/flows/pronunciation-feedback';
import { useToast } from '@/hooks/use-toast';

export default function PronunciationTool() {
  const [targetWord, setTargetWord] = useState('Hello');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<PronunciationFeedbackOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Audio = reader.result as string;
          getFeedback(base64Audio);
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setFeedback(null);
      setError(null);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Could not access microphone. Please check your browser permissions.');
      toast({
        variant: 'destructive',
        title: 'Microphone Error',
        description: 'Could not access microphone. Please check permissions.',
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsLoading(true);
    }
  };

  const getFeedback = async (audioDataUri: string) => {
    if (!targetWord) {
      setError('Please enter a word or phrase to practice.');
      setIsLoading(false);
      return;
    }
    try {
      const result = await getPronunciationFeedback({ audioDataUri, targetWord });
      setFeedback(result);
    } catch (err) {
      console.error('Error getting feedback:', err);
      setError('An error occurred while analyzing your pronunciation. Please try again.');
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'There was an issue getting feedback from the AI.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="targetWord" className="text-sm font-medium">Word or phrase to practice</label>
        <div className="flex gap-2">
          <Input
            id="targetWord"
            value={targetWord}
            onChange={(e) => setTargetWord(e.target.value)}
            placeholder="e.g., Hello World"
            disabled={isRecording || isLoading}
          />
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isLoading}
            variant={isRecording ? 'destructive' : 'default'}
            size="icon"
            className="w-24"
          >
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : isRecording ? (
              <>
                <MicOff className="mr-2"/> Stop
              </>
            ) : (
              <>
                <Mic className="mr-2" /> Rec
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {feedback && (
        <div className="space-y-6 animate-in fade-in-50">
          <div>
            <h3 className="font-headline text-xl mb-2 flex items-center"><Sparkles className="mr-2 h-5 w-5 text-primary"/>Overall Feedback</h3>
            <p className="text-muted-foreground">{feedback.overallFeedback}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <h3 className="font-headline text-lg">Phonetic Transcription:</h3>
            <Badge variant="secondary" className="text-base font-mono">{feedback.phoneticTranscription}</Badge>
          </div>

          <div>
            <h3 className="font-headline text-xl mb-2 flex items-center"><Dna className="mr-2 h-5 w-5 text-primary"/>Areas for Improvement</h3>
            <Accordion type="single" collapsible className="w-full">
              {feedback.specificAreas.map((area, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{area.area}</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>{area.feedback}</p>
                    <p className="text-sm text-muted-foreground pt-2 border-t">
                      <strong>Suggestion:</strong> {area.exerciseSuggestion}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div>
            <h3 className="font-headline text-xl mb-2 flex items-center"><Volume2 className="mr-2 h-5 w-5 text-primary"/>Similar Sounding Words</h3>
             <div className="space-y-4">
              {feedback.similarityWords.map((sim, index) => (
                <div key={index} className="p-3 bg-secondary/50 rounded-lg">
                  <p className="font-semibold">{sim.word}</p>
                  <p className="text-sm text-muted-foreground">{sim.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
