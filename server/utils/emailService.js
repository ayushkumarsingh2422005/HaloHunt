import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

// Log API key availability
console.log('BREVO_API_KEY available:', !!process.env.BREVO_API_KEY);

// Create API instance
const emailAPI = new TransactionalEmailsApi();

// Set up authentication correctly
// The error suggests we need to provide a function called applyToRequest
emailAPI.authentications.apiKey = {
  apiKey: process.env.BREVO_API_KEY,
  applyToRequest: function(requestOptions) {
    requestOptions.headers = requestOptions.headers || {};
    requestOptions.headers['api-key'] = this.apiKey;
    return requestOptions;
  }
};

/**
 * Send password reset email
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 * @param {string} resetToken - Password reset token
 * @param {string} resetUrl - URL for password reset
 * @returns {Promise} - Promise with email sending result
 */
export const sendPasswordResetEmail = async (email, name, resetToken, resetUrl) => {
  try {
    console.log('Sending password reset email to:', email);
    
    // Create email message
    const message = new SendSmtpEmail();
    
    message.subject = "Password Reset Request";
    message.htmlContent = `
      <h1>You requested a password reset</h1>
      <p>Hello ${name},</p>
      <p>You requested to reset your password. Please click the link below to reset your password:</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>This link will expire in 10 minutes.</p>
    `;
    message.sender = { 
      name: "HaloHunt Support", 
      email: process.env.FROM_EMAIL || "support@halohunt.com" 
    };
    message.to = [{ email, name }];
    
    // Send email
    const response = await emailAPI.sendTransacEmail(message);
    // console.log('Email sent successfully:', response);
    return { success: true, data: response };
  } catch (error) {
    console.error('Email sending failed:', error.response?.body || error);
    return { success: false, error: error.message };
  }
};

/**
 * Send password reset success email
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 * @returns {Promise} - Promise with email sending result
 */
export const sendPasswordResetSuccessEmail = async (email, name) => {
  try {
    // Create email message
    const message = new SendSmtpEmail();
    
    message.subject = "Password Reset Successful";
    message.htmlContent = `
      <h1>Password Reset Successful</h1>
      <p>Hello ${name},</p>
      <p>Your password has been successfully reset.</p>
      <p>If you did not perform this action, please contact our support team immediately.</p>
    `;
    message.sender = { 
      name: "HaloHunt Support", 
      email: process.env.FROM_EMAIL || "support@halohunt.com" 
    };
    message.to = [{ email, name }];
    
    // Send email
    const response = await emailAPI.sendTransacEmail(message);
    return { success: true, data: response };
  } catch (error) {
    console.error('Email sending failed:', error.response?.body || error);
    return { success: false, error: error.message };
  }
};

export default {
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail
}; 