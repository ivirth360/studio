'use server';
/**
 * @fileOverview An AI-powered tool to update specific site content.
 *
 * - updateSiteContent - A function that updates the site content.
 * - UpdateSiteContentInput - The input type for the updateSiteContent function.
 * - UpdateSiteContentOutput - The return type for the updateSiteContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UpdateSiteContentInputSchema = z.object({
  contentType: z.string().describe('The type of content to update (e.g., headline, subtext, service description).'),
  contentGoal: z.string().describe('The goal of the content to be created (e.g., attract more users, highlight a new feature).'),
  eventDescription: z.string().describe('The description of the event or data that triggers the content update.'),
  currentContent: z.string().optional().describe('The current content of the section to be updated.'),
});
export type UpdateSiteContentInput = z.infer<typeof UpdateSiteContentInputSchema>;

const UpdateSiteContentOutputSchema = z.object({
  updatedContent: z.string().describe('The updated content for the specified section of the site.'),
});
export type UpdateSiteContentOutput = z.infer<typeof UpdateSiteContentOutputSchema>;

export async function updateSiteContent(input: UpdateSiteContentInput): Promise<UpdateSiteContentOutput> {
  return updateSiteContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'updateSiteContentPrompt',
  input: {schema: UpdateSiteContentInputSchema},
  output: {schema: UpdateSiteContentOutputSchema},
  prompt: `You are a website content specialist. Your task is to update website content based on specific events or data changes.

  The content is of type: {{{contentType}}}.
  The goal of the content is to: {{{contentGoal}}}.
  The event that triggers the update is: {{{eventDescription}}}.
  The current content is: {{{currentContent}}}.

  Please generate updated content that aligns with the event and content goal. The updated content should be concise, engaging, and relevant to the event.
  Updated Content:`, 
});

const updateSiteContentFlow = ai.defineFlow(
  {
    name: 'updateSiteContentFlow',
    inputSchema: UpdateSiteContentInputSchema,
    outputSchema: UpdateSiteContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
