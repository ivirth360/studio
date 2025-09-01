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
    
    // Use a more powerful model for the complex task of image composition.
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash',
        prompt: [
            {
                text: `Create a photorealistic product mockup. The product is a ${productName}. The setting should be a clean, minimalist studio environment that feels modern and high-tech. The lighting should be soft but clear, highlighting the product's texture.
                
                On this product, please place the following sigil design. The sigil should look like a high-quality print. Ensure the placement is natural and centered. For a T-shirt or hoodie, it should be on the chest. For a bottle, mug, or diary, it should be on the front face.
                
                This is the sigil design to place on the product:`
            },
            {
                media: {
                    url: sigilImageDataUri,
                }
            }
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
