const mailjet = require('node-mailjet');
require('dotenv').config();

// --- Mailjet Client Setup (Resilient Initialization) ---
// Using the explicit .apiConnect method to prevent module resolution errors
// in deployment environments (a fix we've already implemented successfully).
const mailjetClient = mailjet.apiConnect(
  process.env.MJ_API_KEY,
  process.env.MJ_API_SECRET
);

/**
 * Sends a 6-digit OTP via email using Mailjet.
 * * NOTE: This function maintains the original signature and name (sendOTPEmail)
 * for seamless replacement of the Nodemailer logic.
 * * @param {string} email - The recipient's email address.
 * @param {string} otp - The 6-digit OTP string.
 * @param {string} [name=''] - The recipient's name (optional).
 * @returns {Promise<boolean>} Resolves to true on success, rejects on failure.
 */
function sendOTPEmail(email, otp, name = '') {
  console.log('📧 Sending OTP via Mailjet to:', email);

  const purposeText = name
    ? `Use the following One-Time Password (OTP) to verify your SRM email and complete your registration:`
    : `Use the following One-Time Password (OTP) to reset your Unigram password:`;

  const greeting = name ? `<p>Hello ${name},</p>` : `<p>Hello,</p>`;

  const subject = 'Your Unigram OTP';

  const htmlContent = `
    <div style="font-family: sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #004d40; border-radius: 8px; text-align: center;">
      <h2 style="color: #004d40;">Unigram OTP Request</h2>
      ${greeting}
      <p style="font-size: 16px;">${purposeText}</p>
      
      <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h1 style="color: #d84315; font-size: 32px; letter-spacing: 5px; margin: 0;">${otp}</h1>
      </div>
      
      <p style="font-size: 14px; color: #777;">This OTP is valid for 10 minutes.</p>
      <p style="font-size: 12px; color: #999;">If you did not request this, please ignore this email.</p>
      
      <p style="margin-top: 30px; font-size: 14px;">The SRM Unigram Team</p>
    </div>
  `;

  // --- Mailjet API Request ---
  return mailjetClient.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        // Change the 'From' email to your verified Mailjet sender email
        From: { Email: process.env.MJ_SENDER_EMAIL, Name: 'Unigram' },
        To: [{ Email: email }],
        Subject: subject,
        HTMLPart: htmlContent
      }
    ]
  })
  .then(result => {
      const status = result.body?.Messages?.[0]?.Status;
      if (status !== 'success' && status !== 'queued') {
          console.error('❌ Mailjet rejected OTP:', result.body?.Messages?.[0]?.Errors);
          throw new Error(`Mailjet sending failed with status: ${status}`);
      }
      console.log('✅ OTP email sent via Mailjet:', status);
      return true; 
  })
  .catch(err => {
      console.error('❌ OTP email failed via Mailjet:', err.statusCode, err.message);
      throw err; 
  });
}

module.exports = { sendOTPEmail };