'use server';
/**
 * @fileOverview An AI-powered tool to generate personalized sigils.
 *
 * - generateSigil - A function that takes a user's name and zodiac sign to create a sigil.
 * - GenerateSigilInput - The input type for the generateSigil function.
 * - GenerateSigilOutput - The return type for the generateSigil function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSigilInputSchema = z.object({
  name: z.string().describe("The user's full name."),
  zodiacSign: z.string().describe('The user\'s zodiac sign (e.g., Aries, Leo, etc.).'),
});
export type GenerateSigilInput = z.infer<typeof GenerateSigilInputSchema>;

const GenerateSigilOutputSchema = z.object({
  sigilName: z.string().describe("A unique, meaningful name for the generated sigil."),
  sigilDescription: z.string().describe("A short, mystical description of the sigil's meaning and resonance."),
  sigilImageDataUri: z.string().describe("The generated sigil image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateSigilOutput = z.infer<typeof GenerateSigilOutputSchema>;


export async function generateSigil(input: GenerateSigilInput): Promise<GenerateSigilOutput> {
  return generateSigilFlow(input);
}

const generateSigilFlow = ai.defineFlow(
  {
    name: 'generateSigilFlow',
    inputSchema: GenerateSigilInputSchema,
    outputSchema: GenerateSigilOutputSchema,
  },
  async ({ name, zodiacSign }) => {
    
    const imagePrompt = `Design a striking, modern, and mystical sigil for a person named ${name}, whose zodiac sign is ${zodiacSign}. The design should be a vector-style, black and white emblem suitable for printing on merchandise.

Key Elements to Incorporate:
- Astrological Symbolism: Subtly weave in the symbol or ruling planet of ${zodiacSign}.
- Numerology/Gematria: Abstractly represent the user's name, ${name}, through geometric shapes or lines.
- Elemental Resonance: Capture the element of ${zodiacSign} (Fire, Earth, Air, or Water) in the design's flow and energy. For example, fire signs might have sharp, energetic lines, while water signs could have more fluid, curved forms.
- Kundalini & Symbiotic Systems: The design should have a sense of upward energy flow, like Kundalini rising, and interconnectedness, reflecting symbiotic principles.

Visual Style:
- Graphic, bold, and clean lines.
- Primarily black design on a white background.
- Circular or contained within a geometric shape (like a hexagon or triangle) to give it a sense of completeness.
- Minimalist yet potent, like a modern logo fused with ancient mysticism. Avoid overly complex or cluttered visuals.
- The final image should be a perfect square.
    `;
    
    const textPrompt = `You are a modern mystic and symbolic artist. For a person named ${name} with the zodiac sign ${zodiacSign}, you have created a personal sigil. Now, provide a name and a brief, evocative description for this sigil.

- **Sigil Name:** Create a unique, one-word or two-word name for the sigil. It should sound powerful and resonant. Examples: "The Arcane Star," "Ananta," "The Solar Weaver."
- **Sigil Description:** Write a 1-2 sentence description that explains the sigil's essence. It should touch upon their elemental nature, personal power, and potential. Make it sound profound and empowering. Example: "This sigil channels the celestial fire of your inner sun, weaving destiny and intention into a singular, ascending path."

**User Details:**
- Name: ${name}
- Zodiac Sign: ${zodiacSign}

Generate the name and description based on the schema.
    `;

    const [imageGeneration, textGeneration] = await Promise.all([
      ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: imagePrompt,
        output: {
          format: 'png',
        }
      }),
      ai.generate({
        model: 'googleai/gemini-2.5-flash',
        prompt: textPrompt,
        output: {
          schema: z.object({
            sigilName: z.string(),
            sigilDescription: z.string(),
          })
        },
      }),
    ]);

    const sigilImageDataUri = imageGeneration.media.url;
    const {sigilName, sigilDescription} = textGeneration.output!;

    return {
        sigilName,
        sigilDescription,
        sigilImageDataUri,
    };
  }
);
