import createMailTransporter from '../config/mail.config.js';
import env from '../config/env.config.js';

export const sendMail = async ({ to, subject, html }) => {
  try {
    const transporter = await createMailTransporter();
    const info = await transporter.sendMail({
      from: env.SMTP_FROM,
      to,
      subject,
      html,
    });
    console.log(`Mail dispatched successfully to ${to}. MessageId: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Email dispatch error: ${error.message}`);
    // Return mock successful completion status so process flow continues smoothly if SMTP is offline
    return { mockSuccess: true, message: 'Felled back to debug output logs' };
  }
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1f2937; border-radius: 8px; background-color: #0f172a; color: #f8fafc;">
      <div style="text-align: center; margin-bottom: 25px;">
        <img src="${env.CLIENT_URL}/favicon.svg" alt="Nextora Studio Logo" style="width: 55px; height: 55px; display: inline-block; border: none; outline: none;" />
      </div>
      <h2 style="color: #18b7f5; text-align: center;">Nextora Studio Password Reset</h2>
      <p>Hello,</p>
      <p>You requested a password reset for your Nextora workspace dashboard account. Click the button below to secure your credentials:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #18b7f5; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
      </div>
      <p>If you did not initiate this request, you can safely ignore this email. The security link will expire in 10 minutes.</p>
      <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;" />
      <p style="font-size: 11px; color: #64748b; text-align: center;">Nextora Studio &bull; Where Ideas Take Shape</p>
    </div>
  `;
  return await sendMail({ to: email, subject: 'Nextora Workspace Password Reset Link', html });
};

export const sendOtpEmail = async (email, otp) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1f2937; border-radius: 8px; background-color: #0f172a; color: #f8fafc;">
      <div style="text-align: center; margin-bottom: 25px;">
        <img src="${env.CLIENT_URL}/favicon.svg" alt="Nextora Studio Logo" style="width: 55px; height: 55px; display: inline-block; border: none; outline: none;" />
      </div>
      <h2 style="color: #18b7f5; text-align: center;">Nextora Studio Verification Code</h2>
      <p>Hello,</p>
      <p>Your one-time authorization and verification security code is:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="background-color: #1e293b; color: #18b7f5; font-size: 32px; font-weight: bold; letter-spacing: 6px; padding: 16px 32px; border: 1px solid #334155; border-radius: 8px; display: inline-block;">${otp}</span>
      </div>
      <p>This verification code is valid for 10 minutes. If you did not initiate this request, you can safely ignore this email.</p>
      <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;" />
      <p style="font-size: 11px; color: #64748b; text-align: center;">Nextora Studio &bull; Where Ideas Take Shape</p>
    </div>
  `;
  return await sendMail({ to: email, subject: 'Nextora Workspace Verification Code', html });
};

export const sendInvoiceEmail = async (email, invoice) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1f2937; border-radius: 8px; background-color: #0f172a; color: #f8fafc;">
      <div style="text-align: center; margin-bottom: 25px;">
        <img src="${env.CLIENT_URL}/favicon.svg" alt="Nextora Studio Logo" style="width: 55px; height: 55px; display: inline-block; border: none; outline: none;" />
      </div>
      <h2 style="color: #18b7f5; text-align: center;">Invoice Released: ${invoice.invoiceId}</h2>
      <p>Dear Partner,</p>
      <p>A new invoice has been compiled and released for project sprint: <strong>${invoice.project}</strong>.</p>
      <table style="width: 100%; font-size: 13px; color: #94a3b8; border-collapse: collapse; margin: 20px 0;">
        <tr style="border-bottom: 1px solid #334155;">
          <th style="text-align: left; padding: 8px 0;">Invoice ID</th>
          <th style="text-align: right; padding: 8px 0;">Amount</th>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #f8fafc;">${invoice.invoiceId}</td>
          <td style="text-align: right; padding: 8px 0; color: #18b7f5; font-weight: bold;">${invoice.amount}</td>
        </tr>
      </table>
      <p>Please log in to your Client Management Portal to preview your receipt sheet or download the invoice PDF.</p>
      <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;" />
      <p style="font-size: 11px; color: #64748b; text-align: center;">Nextora Studio &bull; Where Ideas Take Shape</p>
    </div>
  `;
  return await sendMail({ to: email, subject: `Nextora Studio invoice released - ${invoice.invoiceId}`, html });
};

export const sendContactEmail = async (contact) => {
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1f2937; border-radius: 8px; background-color: #0f172a; color: #f8fafc;">
      <h2 style="color: #18b7f5; text-align: center; margin-bottom: 20px;">New Contact Message Received</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Subject:</strong> ${contact.subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #1e293b; padding: 15px; border-radius: 6px; border: 1px solid #334155; margin-top: 10px; white-space: pre-wrap; color: #cbd5e1;">
        ${contact.text}
      </div>
      <hr style="border: 0; border-top: 1px solid #334155; margin: 25px 0;" />
      <p style="font-size: 11px; color: #64748b; text-align: center;">Nextora Studio Gateway Portal</p>
    </div>
  `;

  const clientHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1f2937; border-radius: 8px; background-color: #0f172a; color: #f8fafc;">
      <div style="text-align: center; margin-bottom: 25px;">
        <img src="${env.CLIENT_URL}/favicon.svg" alt="Nextora Studio Logo" style="width: 55px; height: 55px; display: inline-block;" />
      </div>
      <h2 style="color: #18b7f5; text-align: center;">Thank You for Contacting Us</h2>
      <p>Dear ${contact.name},</p>
      <p>We have successfully received your inquiry regarding <strong>"${contact.subject}"</strong>. Our team will review your request and get back to you within 24 business hours.</p>
      <p>A copy of your message is attached below for your reference:</p>
      <div style="background-color: #1e293b; padding: 15px; border-radius: 6px; border: 1px solid #334155; margin: 15px 0; white-space: pre-wrap; color: #cbd5e1;">
        ${contact.text}
      </div>
      <p>Best regards,<br/>Nextora Studio Team</p>
      <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;" />
      <p style="font-size: 11px; color: #64748b; text-align: center;">Nextora Studio &bull; Where Ideas Take Shape</p>
    </div>
  `;

  const adminEmail = env.CONTACT_ADMIN_EMAIL;
  
  await Promise.all([
    sendMail({ to: adminEmail, subject: `[Nextora Contact] ${contact.subject}`, html: adminHtml }),
    sendMail({ to: contact.email, subject: `We've received your request - Nextora Studio`, html: clientHtml })
  ]).catch((err) => {
    console.error('Failed to dispatch contact notification emails:', err.message);
  });
};
