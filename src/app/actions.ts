'use server';

import { z } from 'zod';
import { processLead } from '@/ai/flows/process-lead-flow';

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

export async function submitLead(values: z.infer<typeof leadSchema>) {
  const parsed = leadSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: 'Invalid data', suggestedReply: null };
  }

  // In a real application, you would save this to a database and send an email.
  console.log('New Lead Received for symbi0n@shuka.in:');
  console.log(parsed.data);

  // AI-powered lead processing
  try {
    const aiResponse = await processLead(parsed.data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { 
      success: true, 
      message: 'Lead submitted successfully',
      suggestedReply: aiResponse.suggestedReply 
    };
  } catch (error) {
    console.error('AI processing failed:', error);
    return { 
      success: true, // We still captured the lead
      message: 'Lead submitted, but AI processing failed.',
      suggestedReply: 'Could not generate a suggestion at this time.'
    };
  }
}
