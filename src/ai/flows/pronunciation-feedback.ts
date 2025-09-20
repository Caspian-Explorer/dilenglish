'use server';

/**
 * @fileOverview AI-powered pronunciation feedback flow.
 *
 * - getPronunciationFeedback - A function that provides feedback on pronunciation.
 * - PronunciationFeedbackInput - The input type for the getPronunciationFeedback function.
 * - PronunciationFeedbackOutput - The return type for the getPronunciationFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PronunciationFeedbackInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "The user's speech audio as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  targetWord: z.string().describe('The word or phrase the user is trying to pronounce.'),
});
export type PronunciationFeedbackInput = z.infer<typeof PronunciationFeedbackInputSchema>;

const PronunciationFeedbackOutputSchema = z.object({
  overallFeedback: z.string().describe('Overall feedback on the user’s pronunciation.'),
  specificAreas: z.array(
    z.object({
      area: z.string().describe('Specific area of improvement (e.g., vowel sounds, consonant sounds, intonation).'),
      feedback: z.string().describe('Detailed feedback on the specific area.'),
      exerciseSuggestion: z.string().describe('Suggested exercise to improve in this area.'),
    })
  ).describe('Specific areas for improvement with detailed feedback and exercise suggestions.'),
  phoneticTranscription: z.string().describe('The correct phonetic transcription of the target word or phrase.'),
  similarityWords: z.array(
    z.object({
        word: z.string().describe('Similar words that might be confused by language learners.'),
        explanation: z.string().describe('Explanation of how these words differ in pronunciation.')
    })
  ).describe('Words similar in pronunciation to the target word, along with explanations of their differences.')
});
export type PronunciationFeedbackOutput = z.infer<typeof PronunciationFeedbackOutputSchema>;

export async function getPronunciationFeedback(input: PronunciationFeedbackInput): Promise<PronunciationFeedbackOutput> {
  return pronunciationFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pronunciationFeedbackPrompt',
  input: {schema: PronunciationFeedbackInputSchema},
  output: {schema: PronunciationFeedbackOutputSchema},
  prompt: `You are an AI-powered pronunciation coach. A user will provide an audio recording of their attempt to pronounce a word or phrase. Your task is to provide detailed feedback to help them improve.

  The word or phrase to pronounce is: {{{targetWord}}}
  The user audio is: {{media url=audioDataUri}}

  Provide the following output:
  1.  overallFeedback: Overall feedback on the user’s pronunciation.
  2.  specificAreas: An array of specific areas for improvement, each including:
  *   area: The specific area (e.g., vowel sounds, consonant sounds, intonation).
  *   feedback: Detailed feedback on the specific area.
  *   exerciseSuggestion: A suggested exercise to improve in this area.
  3. phoneticTranscription: The correct phonetic transcription of the target word or phrase.
  4. similarityWords: Words similar in pronunciation to the target word, along with explanations of their differences. Help the user distinguish between similar words.
  `,
});

const pronunciationFeedbackFlow = ai.defineFlow(
  {
    name: 'pronunciationFeedbackFlow',
    inputSchema: PronunciationFeedbackInputSchema,
    outputSchema: PronunciationFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
