'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

async function sendEmail({ lead }: { lead: z.infer<typeof leadSchema> }) {
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
    return { success: false, message: 'Invalid data' };
  }

  const emailResult = await sendEmail({
    lead: parsed.data,
  });

  if (!emailResult.success) {
     return { 
      success: false, 
      message: 'Lead submission failed at email stage.',
    };
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { 
    success: true, 
    message: 'Lead submitted successfully',
  };
}
