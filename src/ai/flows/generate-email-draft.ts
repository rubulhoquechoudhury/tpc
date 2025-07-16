'use server';

/**
 * @fileOverview An AI agent for generating personalized email drafts.
 *
 * - generateEmailDraft - A function that generates personalized email drafts.
 * - GenerateEmailDraftInput - The input type for the generateEmailDraft function.
 * - GenerateEmailDraftOutput - The return type for the generateEmailDraft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEmailDraftInputSchema = z.object({
  existingMessage: z
    .string()
    .describe('The existing email message to personalize.'),
  personalizationDetails: z
    .string()
    .describe('Details to personalize the email with, such as recipient name, company, etc.'),
});
export type GenerateEmailDraftInput = z.infer<typeof GenerateEmailDraftInputSchema>;

const GenerateEmailDraftOutputSchema = z.object({
  draft: z.string().describe('The personalized email draft.'),
});
export type GenerateEmailDraftOutput = z.infer<typeof GenerateEmailDraftOutputSchema>;

export async function generateEmailDraft(input: GenerateEmailDraftInput): Promise<GenerateEmailDraftOutput> {
  return generateEmailDraftFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEmailDraftPrompt',
  input: {schema: GenerateEmailDraftInputSchema},
  output: {schema: GenerateEmailDraftOutputSchema},
  prompt: `You are an AI email assistant that personalizes email drafts based on provided details.

  Existing Message: {{{existingMessage}}}
  Personalization Details: {{{personalizationDetails}}}

  Create a personalized email draft incorporating the personalization details into the existing message.  The generated draft should maintain light formatting (e.g. paragraph breaks) from the existing message.
  Draft:`,
});

const generateEmailDraftFlow = ai.defineFlow(
  {
    name: 'generateEmailDraftFlow',
    inputSchema: GenerateEmailDraftInputSchema,
    outputSchema: GenerateEmailDraftOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
