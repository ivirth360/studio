'use server';
/**
 * @fileOverview A conversational AI tool to discuss project requirements and provide estimates.
 *
 * - conversationalEstimate - A function that handles a chat interaction for project estimation.
 * - ConversationalEstimateInput - The input type for the function.
 * - ConversationalEstimateOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConversationalEstimateInputSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The history of the conversation so far.'),
});
export type ConversationalEstimateInput = z.infer<typeof ConversationalEstimateInputSchema>;

const ConversationalEstimateOutputSchema = z.string().describe('The AI\'s response to the user\'s message.');
export type ConversationalEstimateOutput = z.infer<typeof ConversationalEstimateOutputSchema>;

export async function conversationalEstimate(input: ConversationalEstimateInput): Promise<ConversationalEstimateOutput> {
  return conversationalEstimateFlow(input);
}

const getProjectEstimateTool = ai.defineTool(
  {
    name: 'getProjectEstimate',
    description: 'Calculates a project estimate based on a detailed description. Use this when the user has provided enough detail and is asking for a quote or estimate.',
    inputSchema: z.object({
      description: z.string().describe('A detailed description of the project requirements.'),
    }),
    outputSchema: z.object({
        estimatedCostUsd: z.string().describe('The estimated cost range in USD (e.g., $5,000 - $8,000).'),
        estimatedCostInr: z.string().describe('The estimated cost range in INR (e.g., ₹4,15,000 - ₹6,65,000).'),
        breakdown: z.string().describe('A brief, point-form breakdown of the key cost drivers.'),
        timeline: z.string().describe('An estimated project timeline (e.g., 4-6 weeks).'),
    }),
  },
  async (input) => {
    const {output} = await estimateProjectPrompt(input);
    return output!;
  }
)

const estimateProjectPrompt = ai.definePrompt({
    name: 'estimateProjectPrompt',
    input: {schema: z.object({
      description: z.string(),
    })},
    output: {schema: getProjectEstimateTool.outputSchema},
    prompt: `You are an expert project manager for SYMBI0N, a collective of strategists, designers, and technologists specializing in AI, Urbanism, and Web Development. Your task is to provide a high-level project estimate based on a user's description.
  
    **User's Project Description:**
    "{{{description}}}"
    
    **Estimation Guidelines:**
    Analyze the description and provide a realistic, high-level estimate. Base your estimate on typical costs for a high-end, globally-distributed creative and technical team.
    - Your cost estimates should be a range (e.g., $5,000 - $8,000).
    - Provide costs in both USD and INR (use an approximate conversion of 1 USD = 83 INR).
    - Provide a brief, bulleted breakdown of what the cost includes.
    - Provide an estimated timeline.

    **Example Costings (for your reference, do not show to user):**
    - **Simple Brochure Website (3-5 pages):** $3,000 - $5,000 USD / ₹2,50,000 - ₹4,15,000 INR (2-4 weeks)
    - **Complex Web App (with backend & auth):** $10,000 - $25,000+ USD / ₹8,30,000 - ₹20,75,000+ INR (8-16 weeks)
    - **Simple AI Agent/Chatbot:** $5,000 - $10,000 USD / ₹4,15,000 - ₹8,30,000 INR (4-8 weeks)
    - **Advanced AI System (e.g., with image processing, custom models):** $20,000 - $50,000+ USD / ₹16,60,000 - ₹41,50,000+ INR (12-24 weeks)
    - **Branding & Strategy Package:** $8,000 - $15,000 USD / ₹6,64,000 - ₹12,45,000 INR (4-6 weeks)
    - **Urbanism Research & Policy Report:** $12,000 - $30,000 USD / ₹9,96,000 - ₹24,90,000 INR (8-12 weeks)
    
    **Important:**
    - If the user's request is too vague, **do not invent a detailed estimate**. Instead, state a general starting price for a relevant service (e.g., "A simple AI agent starts at $5,000 / ₹4,15,000.") and ask for more specific details about their requirements.
    - The breakdown should reflect the user's request. For example, if they ask for an AI-powered web app, the breakdown could include "- AI Model Integration\n- Web Application Development\n- UI/UX Design".
    - Keep the tone professional, helpful, and encouraging.
    
    **Generate the estimation based on the schema.**
    `,
  });
  

const conversationalEstimateFlow = ai.defineFlow(
  {
    name: 'conversationalEstimateFlow',
    inputSchema: ConversationalEstimateInputSchema,
    outputSchema: ConversationalEstimateOutputSchema,
  },
  async (input) => {
    const { messages } = input;
    const {text} = await ai.generate({
        model: 'googleai/gemini-2.5-flash',
        prompt: {
          system: `You are SHUKA AI, the primary AI assistant for SYMBI0N, a global collective of strategists, designers, and technologists. Your role is to act as a helpful and friendly guide, answering questions about SYMBI0N's services and providing project estimates.
    
You are a chatbot on the main website. Be conversational and concise.

Your knowledge base about SYMBI0N's services, portfolio, and frameworks is provided below. Use it to answer user questions.

**Services:**
- AI & Digital Systems: AI Strategy, Conversational AI Agents, Symbolic AI & Codexes, IoT & AI Integration.
- Urbanism & Planning: Smart City Design, Biomimetic Architecture, Regenerative Policy, Sustainable Land-use Planning.
- Creative Strategy: Narrative Architecture, Systemic Brand Identity, Vision Decks, Interactive Storytelling.
- Design & Development: Full-Stack Web & App Development, AI-powered Web Apps, Symbolic UI/UX, Motion Graphics.
- Research & Consulting: Academic Research, Digital Knowledge Ecosystems, Climate & Innovation Strategy, Grant & Academic Writing.
- Symbiotic Intelligence: Life-Centered Design, Ecological Data Analysis, Human-AI-Nature Interfaces, Regenerative Systems Mapping.

**Portfolio Highlights:**
- Urban: Smart Eco-Benches, E-Bike Sharing Network, Regenerative Planning models.
- AI: PUBLIKA Platform (knowledge ecosystem), SHUKA AI (your own system), Eco-Wallet Prototypes.
- Symbolic: VEDASHAKTIKA Universe (storytelling), Sigil Maps (generative art), Interactive Codexes.
- Research: Papers on water properties, unified reality models, sustainable urban frameworks (GOBERdhan).
- Creative: Narrative decks for film/brands, interactive apps, real estate webapps.

**Engagement Models:**
- Freelance Projects: For specific, one-time needs.
- Monthly Retainers: For ongoing strategic support.
- Collaborative Labs: Co-creation partnerships with startups/institutions.
- Knowledge-as-a-Service: On-demand research and expertise.

**Your Goal:**
1.  **Engage:** Start with a friendly greeting.
2.  **Understand:** Ask clarifying questions to understand the user's project needs. Be specific. If they say "I need a website," ask what kind of website, what features it needs, etc.
3.  **Inform:** Answer questions about SYMBI0N's services and portfolio using the provided context.
4.  **Estimate:** Once you have a clear and sufficiently detailed project description from the user, use the 'getProjectEstimate' tool to provide a cost and timeline. You must use the tool. Do not make up estimates or use your general knowledge.
5.  **Guide:** After providing an estimate, suggest the next step is to fill out the contact form on the website for a formal discussion and detailed proposal.

Keep your responses helpful, professional, and slightly futuristic in tone.`,
          history: messages,
        },
        tools: [getProjectEstimateTool]
    });
    return text;
  }
);

    