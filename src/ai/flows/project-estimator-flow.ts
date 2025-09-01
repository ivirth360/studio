'use server';
/**
 * @fileOverview An AI-powered tool to estimate project costs based on a description.
 *
 * - estimateProject - A function that takes a project description and returns a cost estimate.
 * - EstimateProjectInput - The input type for the estimateProject function.
 * - EstimateProjectOutput - The return type for the estimateProject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateProjectInputSchema = z.object({
  description: z.string().describe('A detailed description of the project requirements.'),
});
export type EstimateProjectInput = z.infer<typeof EstimateProjectInputSchema>;

const EstimateProjectOutputSchema = z.object({
  estimatedCostUsd: z.string().describe('The estimated cost range in USD (e.g., $5,000 - $8,000).'),
  estimatedCostInr: z.string().describe('The estimated cost range in INR (e.g., ₹4,15,000 - ₹6,65,000).'),
  breakdown: z.string().describe('A brief, point-form breakdown of the key cost drivers.'),
  timeline: z.string().describe('An estimated project timeline (e.g., 4-6 weeks).'),
});
export type EstimateProjectOutput = z.infer<typeof EstimateProjectOutputSchema>;


export async function estimateProject(input: EstimateProjectInput): Promise<EstimateProjectOutput> {
  return estimateProjectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateProjectPrompt',
  input: {schema: EstimateProjectInputSchema},
  output: {schema: EstimateProjectOutputSchema},
  prompt: `You are an expert project manager for SYMBI0N, a collective of strategists, designers, and technologists specializing in AI, Urbanism, and Web Development. Your task is to provide a high-level project estimate based on a user's description.

  **User's Project Description:**
  "{{{description}}}"
  
  **Your Goal:**
  Analyze the description and provide a realistic, high-level estimate. Base your estimate on typical costs for a high-end, globally-distributed creative and technical team.
  - Your cost estimates should be a range (e.g., $5,000 - $8,000).
  - Provide costs in both USD and INR (use an approximate conversion of 1 USD = 83 INR).
  - Provide a brief, bulleted breakdown of what the cost includes (e.g., "- AI Strategy\n- UI/UX Design\n- Web Development").
  - Provide an estimated timeline.
  - If the request is too vague, provide a general starting price for a basic project and ask for more details. For example, a simple website starts at $3,000 / ₹2,50,000. A simple AI agent starts at $5,000 / ₹4,15,000.
  - Keep the tone professional, helpful, and encouraging.
  
  **Generate the estimation based on the schema.**
  `,
});

const estimateProjectFlow = ai.defineFlow(
  {
    name: 'estimateProjectFlow',
    inputSchema: EstimateProjectInputSchema,
    outputSchema: EstimateProjectOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
