'use server';

/**
 * @fileOverview AI-powered language placement test generator.
 *
 * - generatePlacementTest - A function that creates a placement test for a given language.
 * - PlacementTestInput - The input type for the generatePlacementTest function.
 * - PlacementTestOutput - The return type for the generatePlacementTest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const PlacementTestQuestionSchema = z.object({
  questionText: z.string().describe('The main text of the question.'),
  options: z.array(z.string()).describe('A list of possible answers for the question.'),
  correctOptionIndex: z.number().describe('The index of the correct option in the options array.'),
  difficultyLevel: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).describe('The CEFR difficulty level of the question.'),
});
export type PlacementTestQuestion = z.infer<typeof PlacementTestQuestionSchema>;

const PlacementTestInputSchema = z.object({
  language: z.string().describe('The language for which to generate the placement test (e.g., Spanish, French).'),
});
export type PlacementTestInput = z.infer<typeof PlacementTestInputSchema>;

const PlacementTestOutputSchema = z.object({
  questions: z.array(PlacementTestQuestionSchema).describe('An array of 10 multiple-choice questions for the placement test.'),
});
export type PlacementTestOutput = z.infer<typeof PlacementTestOutputSchema>;


export async function generatePlacementTest(input: PlacementTestInput): Promise<PlacementTestOutput> {
  return languagePlacementTestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'languagePlacementTestPrompt',
  input: {schema: PlacementTestInputSchema},
  output: {schema: PlacementTestOutputSchema},
  prompt: `You are an expert language test creator. Your task is to generate a 10-question multiple-choice placement test for the specified language: {{{language}}}.

The test should progressively increase in difficulty to accurately assess the user's proficiency level from A1 (Beginner) to B2 (Intermediate).

Generate 3 questions for A1 level, 3 for A2, 2 for B1, and 2 for B2.

For each question, provide:
1.  questionText: The question itself.
2.  options: An array of 4 strings representing the multiple-choice options.
3.  correctOptionIndex: The 0-based index of the correct answer in the 'options' array.
4.  difficultyLevel: The CEFR level of the question (A1, A2, B1, or B2).

Ensure the questions cover a mix of grammar and vocabulary.`,
});

const languagePlacementTestFlow = ai.defineFlow(
  {
    name: 'languagePlacementTestFlow',
    inputSchema: PlacementTestInputSchema,
    outputSchema: PlacementTestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
