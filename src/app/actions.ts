'use server';

import { z } from 'zod';
import { processLead } from '@/ai/flows/process-lead-flow';
import nodemailer from 'nodemailer';
import { estimateProject } from '@/ai/flows/project-estimator-flow';
import { conversationalEstimate } from '@/ai/flows/conversational-estimator-flow';


const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

async function sendEmail({ lead, suggestedReply }: { lead: z.infer<typeof leadSchema>, suggestedReply: string | null }) {
  const { name, email, company, message } = lead;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const fromName = process.env.SMTP_FROM_NAME || 'SYMBI0N';
  const fromEmail = process.env.SMTP_FROM_EMAIL || 'symbi0n@shuka.in';

  // Email to symbi0n@shuka.in
  const leadNotificationMailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: 'symbi0n@shuka.in',
    subject: `New Lead from ${name}`,
    html: `
      <h1>New Lead Received</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr />
      <h2>AI Suggested Reply:</h2>
      <p>${suggestedReply || 'Not available.'}</p>
    `,
  };

  // Confirmation email to the user
  const userConfirmationMailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: email,
    subject: "Thank you for contacting SYMBI0N",
    html: `
      <h1>Thank You for Reaching Out!</h1>
      <p>Hello ${name},</p>
      <p>We have received your message and will get back to you shortly.</p>
      <p>Here's a copy of your message:</p>
      <blockquote>${message}</blockquote>
      <br />
      <p>Best regards,</p>
      <p>The SYMBI0N Collective</p>
    `,
  };

  try {
    await transporter.sendMail(leadNotificationMailOptions);
    await transporter.sendMail(userConfirmationMailOptions);
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

export async function submitLead(values: z.infer<typeof leadSchema>) {
  const parsed = leadSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: 'Invalid data', suggestedReply: null };
  }

  let aiResponse;
  try {
    aiResponse = await processLead(parsed.data);
  } catch (error) {
    console.error('AI processing failed:', error);
    aiResponse = { suggestedReply: 'Could not generate a suggestion at this time.' };
  }

  const emailResult = await sendEmail({
    lead: parsed.data,
    suggestedReply: aiResponse.suggestedReply,
  });

  if (!emailResult.success) {
     return { 
      success: false, 
      message: 'Lead submission failed at email stage.',
      suggestedReply: aiResponse.suggestedReply 
    };
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { 
    success: true, 
    message: 'Lead submitted successfully',
    suggestedReply: aiResponse.suggestedReply 
  };
}

const estimatorSchema = z.object({
  description: z.string().min(20, { message: "Please provide a more detailed description (at least 20 characters)." }),
});

export async function getProjectEstimate(values: z.infer<typeof estimatorSchema>) {
  const parsed = estimatorSchema.safeParse(values);

  if (!parsed.success) {
    const error = parsed.error.format().description?._errors[0];
    return { success: false, message: error || 'Invalid data', estimation: null };
  }

  try {
    const estimation = await estimateProject(parsed.data);
    return { success: true, message: 'Estimation complete', estimation };
  } catch (error) {
    console.error('AI estimation failed:', error);
    return { success: false, message: 'Could not generate an estimate at this time.', estimation: null };
  }
}

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })),
});

export async function submitChatMessage(values: z.infer<typeof chatSchema>) {
  const parsed = chatSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: 'Invalid data', response: null };
  }
  try {
    const response = await conversationalEstimate(parsed.data);
    return { success: true, message: 'Response generated', response };
  } catch (error) {
    console.error('AI chat failed:', error);
    return { success: false, message: 'Could not generate a response at this time.', response: null };
  }
}
