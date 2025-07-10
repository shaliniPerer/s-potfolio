// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Define the shape of the data we expect from the form
interface FormData {
  name: string;
  email: string;
  message: string;
}

// Main handler for the API route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests to this API route
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Extract form data from the request body
  const { name, email, message }: FormData = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Get email credentials from environment variables
  // These are NOT prefixed with NEXT_PUBLIC_ as they are server-side only
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailTo = process.env.EMAIL_TO; // The email address to send to

  // Check if environment variables are set
  if (!emailUser || !emailPass || !emailTo) {
    console.error('Email credentials are not set in environment variables.');
    return res.status(500).json({ message: 'Server configuration error: Email credentials missing.' });
  }

  // Create a Nodemailer transporter using SMTP (for Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use 'gmail' for Gmail
    auth: {
      user: emailUser,
      pass: emailPass, // This is your Gmail App Password
    },
  });

  try {
    // Send the email
    await transporter.sendMail({
      from: `"${name}" <${email}>`, // Sender's name and email from the form
      to: emailTo, // Your recipient email address
      subject: `New Contact Form Submission from ${name}`, // Email subject
      html: `
        <p>You have a new contact form submission:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
      `, // HTML body of the email
      text: `New contact form submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body (fallback)
    });

    // Respond with success
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.', error: (error as Error).message });
  }
}
