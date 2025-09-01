
'use server';
/**
 * @fileOverview An AI-powered tool to generate product mockups with personalized sigils.
 *
 * - generateMerchMockup - A function that takes a sigil and product name to create a mockup.
 * - GenerateMerchMockupInput - The input type for the function.
 * - GenerateMerchMockupOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMerchMockupInputSchema = z.object({
  sigilImageDataUri: z
    .string()
    .describe(
      "The user's personalized sigil image as a data URI that must include a MIME type and use Base64 encoding."
    ),
  productName: z.string().describe('The name of the product to create a mockup for (e.g., "T-Shirt", "Bamboo Bottle").'),
});
export type GenerateMerchMockupInput = z.infer<typeof GenerateMerchMockupInputSchema>;

const GenerateMerchMockupOutputSchema = z.object({
  mockupImageDataUri: z.string().describe("The generated product mockup image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateMerchMockupOutput = z.infer<typeof GenerateMerchMockupOutputSchema>;

export async function generateMerchMockup(input: GenerateMerchMockupInput): Promise<GenerateMerchMockupOutput> {
  return generateMerchMockupFlow(input);
}

const generateMerchMockupFlow = ai.defineFlow(
  {
    name: 'generateMerchMockupFlow',
    inputSchema: GenerateMerchMockupInputSchema,
    outputSchema: GenerateMerchMockupOutputSchema,
  },
  async ({ sigilImageDataUri, productName }) => {
    
    const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: [
          {text: `Create a photorealistic product mockup of a ${productName} with a custom sigil printed on it. The product should be in a clean, minimalist studio environment with soft, clear lighting. The sigil design should be placed naturally and centered on the product (e.g., on the chest of a T-shirt, or the front of a bottle). The sigil to be placed is provided in the media.`},
          {media: { url: sigilImageDataUri } }
        ],
        output: {
          format: 'png',
        }
      });

    if (!media) {
      throw new Error('Image generation failed to return media.');
    }

    return {
        mockupImageDataUri: media.url,
    };
  }
);
