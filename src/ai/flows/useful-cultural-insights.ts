'use server';

/**
 * @fileOverview Provides cultural insights relevant to the language being learned, tailored by AI for usefulness.
 *
 * - UsefulCulturalInsightsInput - The input type for the usefulCulturalInsights function.
 * - UsefulCulturalInsightsOutput - The return type for the usefulCulturalInsights function.
 * - usefulCulturalInsights - A function that returns the most useful cultural insights.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UsefulCulturalInsightsInputSchema = z.object({
  language: z.string().describe('The language for which cultural insights are requested.'),
  userInterests: z
    .string()
    .describe('A description of the user interests to tailor the cultural insights.'),
});
export type UsefulCulturalInsightsInput = z.infer<typeof UsefulCulturalInsightsInputSchema>;

const UsefulCulturalInsightsOutputSchema = z.object({
  culturalInsight: z.string().describe('A cultural insight that is likely to be useful to the user.'),
});
export type UsefulCulturalInsightsOutput = z.infer<typeof UsefulCulturalInsightsOutputSchema>;

export async function usefulCulturalInsights(input: UsefulCulturalInsightsInput): Promise<UsefulCulturalInsightsOutput> {
  return usefulCulturalInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'usefulCulturalInsightsPrompt',
  input: {schema: UsefulCulturalInsightsInputSchema},
  output: {schema: UsefulCulturalInsightsOutputSchema},
  prompt: `You are a cultural expert. Determine the most useful cultural insight for a user learning {{language}}, taking into account their interests which can be described as: {{userInterests}}.\n\nReturn a cultural insight that would be most relevant and helpful for someone in their situation.`,
});

const usefulCulturalInsightsFlow = ai.defineFlow(
  {
    name: 'usefulCulturalInsightsFlow',
    inputSchema: UsefulCulturalInsightsInputSchema,
    outputSchema: UsefulCulturalInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
