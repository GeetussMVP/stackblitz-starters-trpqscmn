// pages/api/appointment-email.ts (for Next.js Pages Router)

import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface AppointmentEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  appointmentDate?: string;
  timestamp: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { 
    firstName, 
    lastName, 
    email, 
    phone, 
    message, 
    appointmentDate, 
    timestamp 
  } = req.body as AppointmentEmailRequest;

  // Validate required fields
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    // Create nodemailer transporter using your env variables
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // dekoratoriailt@gmail.com
        pass: process.env.EMAIL_PASSWORD, // hfedqvtjgmfugykf
      },
    });

    // Email to the company/admin
    const adminEmailContent = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to your email
      subject: `Naujas susitikimo užsakymas - ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-row { margin: 15px 0; padding: 10px; background: white; border-radius: 5px; }
            .label { font-weight: bold; color: #14b8a6; }
            .appointment-box { background: #14b8a6; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Naujas Susitikimo Užsakymas</h1>
            </div>
            <div class="content">
              <div class="info-row">
                <span class="label">Vardas:</span> ${firstName} ${lastName}
              </div>
              <div class="info-row">
                <span class="label">El. paštas:</span> ${email}
              </div>
              <div class="info-row">
                <span class="label">Telefonas:</span> ${phone || 'Nenurodytas'}
              </div>
              ${appointmentDate ? `
              <div class="appointment-box">
                <h2 style="margin: 0 0 10px 0;">📅 Susitikimo Laikas</h2>
                <p style="margin: 0; font-size: 18px;">${appointmentDate}</p>
              </div>
              ` : ''}
              <div class="info-row">
                <span class="label">Žinutė:</span><br/>
                ${message}
              </div>
              <div class="info-row">
                <span class="label">Užsakymo laikas:</span> ${new Date(timestamp).toLocaleString('lt-LT')}
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Email to the customer (confirmation)
    const customerEmailContent = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: appointmentDate 
        ? `Susitikimo patvirtinimas - ${appointmentDate}` 
        : 'Jūsų užklausa gauta',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .greeting { font-size: 20px; margin-bottom: 20px; }
            .appointment-box { background: #14b8a6; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .contact-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; color: #666; margin-top: 30px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Ačiū už Jūsų Užklausą!</h1>
            </div>
            <div class="content">
              <p class="greeting">Sveiki, ${firstName}!</p>
              <p>Gavome Jūsų užklausą ir netrukus su jumis susisieksime.</p>
              
              ${appointmentDate ? `
              <div class="appointment-box">
                <h2 style="margin: 0 0 10px 0;">📅 Jūsų Susitikimas</h2>
                <p style="margin: 0; font-size: 18px;">${appointmentDate}</p>
                <p style="margin: 10px 0 0 0; font-size: 14px;">Prašome atvykti laiku. Jei negalite atvykti, prašome informuoti iš anksto.</p>
              </div>
              ` : '<p>Susisieksime su jumis artimiausiu metu dėl galimo susitikimo laiko.</p>'}
              
              <div class="contact-info">
                <h3 style="color: #14b8a6; margin-top: 0;">Mūsų Kontaktai:</h3>
                <p><strong>📞 Telefonas:</strong> +370 600 12345</p>
                <p><strong>✉️ El. paštas:</strong> dekoratoriailt@gmail.com</p>
                <p><strong>📍 Adresas:</strong> Gedimino pr. 1, Vilnius, LT-01103</p>
              </div>
              
              <p>Jūsų žinutė:</p>
              <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #14b8a6;">
                ${message}
              </div>
              
              <div class="footer">
                <p>Su pagarba,<br/>Interjero ir Fasado Dekoratoriai Komanda</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminEmailContent);
    await transporter.sendMail(customerEmailContent);

    return res.status(200).json({ 
      success: true, 
      message: 'Emails sent successfully' 
    });

  } catch (error) {
    console.error('Email error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send emails',
      error: errorMessage 
    });
  }
}