'use server';
/**
 * @fileOverview An AI-powered tool to process incoming leads and draft responses.
 *
 * - processLead - A function that processes a lead and generates a draft response.
 * - ProcessLeadInput - The input type for the processLead function.
 * - ProcessLeadOutput - The return type for the processLead function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessLeadInputSchema = z.object({
  name: z.string().describe("The lead's name."),
  email: z.string().email().describe("The lead's email address."),
  company: z.string().optional().describe("The lead's company."),
  message: z.string().describe("The lead's message."),
});
export type ProcessLeadInput = z.infer<typeof ProcessLeadInputSchema>;

const ProcessLeadOutputSchema = z.object({
  suggestedReply: z.string().describe('The suggested email reply to the lead.'),
});
export type ProcessLeadOutput = z.infer<typeof ProcessLeadOutputSchema>;

export async function processLead(input: ProcessLeadInput): Promise<ProcessLeadOutput> {
  return processLeadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'processLeadPrompt',
  input: {schema: ProcessLeadInputSchema},
  output: {schema: ProcessLeadOutputSchema},
  prompt: `You are an expert business development assistant for SYMBI0N, a collective of strategists, designers, and technologists. Your task is to draft a personalized and professional email reply to a new lead.

  **Lead Details:**
  - **Name:** {{{name}}}
  - **Email:** {{{email}}}
  {{#if company}}- **Company:** {{{company}}}{{/if}}
  - **Message:** {{{message}}}
  
  **Your Goal:**
  Draft a warm, welcoming, and insightful reply. Acknowledge their specific interests from their message and align them with SYMBI0N's services (AI & Digital Systems, Urbanism & Planning, Creative Strategy, Design & Development, Research & Consulting).
  
  Keep the tone professional yet approachable. The goal is to encourage a follow-up conversation. Conclude by suggesting a call to discuss their needs further.
  
  **Draft the email body below.**
  `,
});

const processLeadFlow = ai.defineFlow(
  {
    name: 'processLeadFlow',
    inputSchema: ProcessLeadInputSchema,
    outputSchema: ProcessLeadOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
