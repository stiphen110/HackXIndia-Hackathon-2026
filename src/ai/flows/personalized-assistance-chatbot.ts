'use server';

/**
 * @fileOverview Personalized assistance chatbot flow to answer citizen questions about government schemes and suggest additional relevant schemes.
 *
 * - personalizedAssistanceChatbot - A function that handles the chatbot interaction.
 * - PersonalizedAssistanceChatbotInput - The input type for the personalizedAssistanceChatbot function.
 * - PersonalizedAssistanceChatbotOutput - The return type for the personalizedAssistanceChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedAssistanceChatbotInputSchema = z.object({
  question: z
    .string()
    .describe('The citizen question about government schemes.'),
  schemeDetails: z.string().describe('Details of available government schemes.'),
});
export type PersonalizedAssistanceChatbotInput = z.infer<
  typeof PersonalizedAssistanceChatbotInputSchema
>;

const PersonalizedAssistanceChatbotOutputSchema = z.object({
  answer: z
    .string()
    .describe('The chatbot answer to the citizen question.'),
  suggestedSchemes: z
    .string()
    .describe('A list of suggested schemes based on the citizen question.'),
  contactInformation: z
    .string()
    .describe('Contact information for support staff.'),
});
export type PersonalizedAssistanceChatbotOutput = z.infer<
  typeof PersonalizedAssistanceChatbotOutputSchema
>;

export async function personalizedAssistanceChatbot(
  input: PersonalizedAssistanceChatbotInput
): Promise<PersonalizedAssistanceChatbotOutput> {
  return personalizedAssistanceChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedAssistanceChatbotPrompt',
  input: {schema: PersonalizedAssistanceChatbotInputSchema},
  output: {schema: PersonalizedAssistanceChatbotOutputSchema},
  prompt: `You are a helpful chatbot assisting Indian citizens with information about government schemes.

  You have access to the following scheme details:
  {{schemeDetails}}

  Answer the citizen's question accurately and concisely.
  Suggest additional relevant schemes based on their question.
  Provide contact information for support staff.

  Citizen Question: {{{question}}}

  Answer:
  {{output}}
  `,
});

const personalizedAssistanceChatbotFlow = ai.defineFlow(
  {
    name: 'personalizedAssistanceChatbotFlow',
    inputSchema: PersonalizedAssistanceChatbotInputSchema,
    outputSchema: PersonalizedAssistanceChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
