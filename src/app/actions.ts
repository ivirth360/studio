'use server';

import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

export async function submitLead(values: z.infer<typeof leadSchema>) {
  const parsed = leadSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: 'Invalid data' };
  }

  // In a real application, you would send this data to your CRM,
  // database, or email service.
  // Example: await sendEmail({ to: 'symbi0n@shuka.in', ... })
  console.log('New Lead Received:');
  console.log(parsed.data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // For this demo, we'll always return success.
  return { success: true, message: 'Lead submitted successfully' };
}
