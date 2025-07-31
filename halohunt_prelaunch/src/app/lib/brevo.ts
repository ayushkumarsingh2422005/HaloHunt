import { CreateContact, ContactsApi, TransactionalEmailsApi, SendSmtpEmail, AddContactToList } from "@getbrevo/brevo";

// Initialize APIs
const contactAPI = new ContactsApi();
const emailAPI = new TransactionalEmailsApi();

// Set API key (you'll need to replace this with your actual Brevo API key)
const API_KEY = process.env.BREVO_API_KEY || "xkeysib-xxxxxxxxxxxxxxxxxxxxx";

(contactAPI as any).authentications.apiKey.apiKey = API_KEY;
(emailAPI as any).authentications.apiKey.apiKey = API_KEY;

// Prelaunch list ID - you'll need to get this from your Brevo dashboard
const PRELAUNCH_LIST_ID = parseInt(process.env.BREVO_PRELAUNCH_LIST_ID || "0");

export interface ContactData {
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export class BrevoService {
  /**
   * Test API connection
   */
  static async testConnection() {
    try {
      console.log("Testing Brevo API connection...");
      console.log("API Key:", API_KEY ? `${API_KEY.substring(0, 10)}...` : "Not set");
      console.log("List ID:", PRELAUNCH_LIST_ID || "Not set");
      
      // Try to create a simple contact to test connection
      const testContact = new CreateContact();
      testContact.email = "test@example.com";
      testContact.attributes = {
        FIRSTNAME: "Test",
        LASTNAME: "User"
      };
      
      const response = await contactAPI.createContact(testContact);
      console.log("API connection successful");
      return { success: true, data: response.body };
    } catch (error: any) {
      console.error("API connection test failed:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      return { success: false, error: error.response?.data || error };
    }
  }

  /**
   * Create a new contact in Brevo
   */
  static async createContact(data: ContactData) {
    try {
      console.log("Creating contact with data:", data);
      
      const contact = new CreateContact();
      contact.email = data.email;
      contact.attributes = {
        FIRSTNAME: data.firstName || "",
        LASTNAME: data.lastName || "",
        SMS: data.phoneNumber || "",
        SOURCE: "HaloHunt Prelaunch",
        SIGNUP_DATE: new Date().toISOString()
      };

      console.log("Contact object:", JSON.stringify(contact, null, 2));
      
      const response = await contactAPI.createContact(contact);
      console.log("Contact created successfully:", JSON.stringify(response.body));
      return { success: true, data: response.body };
    } catch (error: any) {
      console.error("Error creating contact:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      return { success: false, error: error.response?.data || error };
    }
  }

  /**
   * Add contact to prelaunch list
   */
  static async addContactToList(email: string, listId: number = PRELAUNCH_LIST_ID) {
    try {
      if (!listId || listId === 0) {
        console.warn("No list ID provided, skipping list addition");
        return { success: true, data: null };
      }

      console.log(`Adding contact ${email} to list ${listId}`);
      
      const addToList = new AddContactToList();
      addToList.emails = [email];

      console.log("AddToList object:", JSON.stringify(addToList, null, 2));
      
      const response = await contactAPI.addContactToList(listId, addToList);
      console.log("Contact added to list successfully:", JSON.stringify(response.body));
      return { success: true, data: response.body };
    } catch (error: any) {
      console.error("Error adding contact to list:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      return { success: false, error: error.response?.data || error };
    }
  }

  /**
   * Send welcome email to new subscriber
   */
  static async sendWelcomeEmail(email: string, firstName?: string) {
    try {
      console.log(`Sending welcome email to ${email}`);
      
      const message = new SendSmtpEmail();
      message.subject = "Welcome to HaloHunt - You're on the Early Access List! 🚀";
      message.sender = { 
        name: "HaloHunt Team", 
        email: "noreply@halohunt.com" 
      };
      message.to = [{ 
        email: email, 
        name: firstName || "Valued Customer" 
      }];

      // HTML content for the welcome email
      message.htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to HaloHunt</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.6; 
              color: #1a1a1a; 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              padding: 20px 0;
            }
            .email-container { 
              max-width: 650px; 
              margin: 0 auto; 
              background: #ffffff;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center; 
              position: relative;
              overflow: hidden;
            }
            .header::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
              animation: float 6s ease-in-out infinite;
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(180deg); }
            }
            .logo-container {
              margin-bottom: 20px;
              position: relative;
              z-index: 2;
            }
            .logo {
              width: 120px;
              height: auto;
              filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
            }
            .header h1 { 
              font-size: 2.5em; 
              font-weight: 700; 
              margin-bottom: 10px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
              position: relative;
              z-index: 2;
            }
            .header p { 
              font-size: 1.2em; 
              opacity: 0.9;
              position: relative;
              z-index: 2;
            }
            .content { 
              background: #ffffff; 
              padding: 40px 30px; 
            }
            .welcome-section {
              text-align: center;
              margin-bottom: 40px;
              padding: 30px;
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
              border-radius: 15px;
              border-left: 5px solid #8B5CF6;
            }
            .welcome-section h2 {
              color: #8B5CF6;
              font-size: 1.8em;
              margin-bottom: 15px;
              font-weight: 600;
            }
            .welcome-section p {
              color: #4a5568;
              font-size: 1.1em;
              line-height: 1.7;
            }
            .features-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 20px;
              margin: 30px 0;
            }
            .feature-card {
              background: linear-gradient(135deg, #ffffff 0%, #f7fafc 100%);
              padding: 25px;
              border-radius: 12px;
              border: 1px solid #e2e8f0;
              text-align: center;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .feature-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 10px 25px rgba(139, 92, 246, 0.15);
            }
            .feature-icon {
              font-size: 2.5em;
              margin-bottom: 15px;
              display: block;
            }
            .feature-card h3 {
              color: #8B5CF6;
              font-size: 1.2em;
              margin-bottom: 10px;
              font-weight: 600;
            }
            .feature-card p {
              color: #4a5568;
              font-size: 0.95em;
              line-height: 1.5;
            }
            .stats-section {
              background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
              color: white;
              padding: 30px;
              border-radius: 15px;
              text-align: center;
              margin: 30px 0;
            }
            .stats-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              gap: 20px;
              margin-top: 20px;
            }
            .stat-item h4 {
              font-size: 2em;
              font-weight: 700;
              margin-bottom: 5px;
            }
            .stat-item p {
              font-size: 0.9em;
              opacity: 0.9;
            }
            .cta-section {
              text-align: center;
              margin: 40px 0;
              padding: 30px;
              background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
              border-radius: 15px;
              border: 2px solid #8B5CF6;
            }
            .cta-button { 
              display: inline-block; 
              background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); 
              color: white; 
              padding: 16px 40px; 
              text-decoration: none; 
              border-radius: 50px; 
              margin: 20px 0; 
              font-weight: 600;
              font-size: 1.1em;
              box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
              transition: all 0.3s ease;
              position: relative;
              overflow: hidden;
            }
            .cta-button::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
              transition: left 0.5s;
            }
            .cta-button:hover::before {
              left: 100%;
            }
            .cta-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 12px 35px rgba(139, 92, 246, 0.4);
            }
            .footer { 
              background: #1a1a1a; 
              color: #ffffff; 
              text-align: center; 
              padding: 30px;
              font-size: 14px;
            }
            .footer p {
              margin-bottom: 10px;
              opacity: 0.8;
            }
            .social-links {
              margin: 20px 0;
            }
            .social-links a {
              display: inline-block;
              margin: 0 10px;
              color: #8B5CF6;
              text-decoration: none;
              font-weight: 600;
            }
            .highlight { 
              color: #8B5CF6; 
              font-weight: 600; 
            }
            @media (max-width: 600px) {
              .email-container { margin: 10px; }
              .header { padding: 30px 20px; }
              .content { padding: 30px 20px; }
              .header h1 { font-size: 2em; }
              .features-grid { grid-template-columns: 1fr; }
              .stats-grid { grid-template-columns: 1fr; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="logo-container">
                <img src="https://pre.halohunt.com/full_purple.png" alt="HaloHunt Logo" class="logo">
              </div>
              <h1>🎉 Welcome to HaloHunt!</h1>
              <p>You're now part of the live commerce revolution</p>
            </div>
            
            <div class="content">
              <div class="welcome-section">
                <h2>Hello ${firstName || 'there'}! 👋</h2>
                <p>Thank you for joining our exclusive early access list! You're now among the first to experience the future of live commerce. Get ready for something extraordinary!</p>
              </div>
              
              <div class="features-grid">
                <div class="feature-card">
                  <span class="feature-icon">🚀</span>
                  <h3>Early Access</h3>
                  <p>Be among the first to try HaloHunt when we launch. Get exclusive first-hand experience of the platform.</p>
                </div>
                <div class="feature-card">
                  <span class="feature-icon">📢</span>
                  <h3>Exclusive Updates</h3>
                  <p>Get insider information about new features, updates, and behind-the-scenes content before anyone else.</p>
                </div>
                <div class="feature-card">
                  <span class="feature-icon">🎁</span>
                  <h3>Special Perks</h3>
                  <p>Enjoy exclusive discounts, premium features, and special benefits reserved only for early adopters.</p>
                </div>
                <div class="feature-card">
                  <span class="feature-icon">🔧</span>
                  <h3>Beta Testing</h3>
                  <p>Help shape the platform with direct feedback. Your input will directly influence HaloHunt's development.</p>
                </div>
              </div>
              
              <div class="stats-section">
                <h3>🚀 Launch Progress</h3>
                <div class="stats-grid">
                  <div class="stat-item">
                    <h4>Q1 2024</h4>
                    <p>Launch Date</p>
                  </div>
                  <div class="stat-item">
                    <h4>10,000+</h4>
                    <p>Early Adopters</p>
                  </div>
                  <div class="stat-item">
                    <h4>24/7</h4>
                    <p>Development</p>
                  </div>
                </div>
              </div>
              
              <div class="cta-section">
                <h3>Ready to Experience the Future?</h3>
                <p>We're working hard to bring you the most innovative live commerce platform. You'll be the first to know when we're ready to launch!</p>
                <a href="https://halohunt.com" class="cta-button">Visit HaloHunt →</a>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>© 2024 HaloHunt. All rights reserved.</strong></p>
              <p>Revolutionizing live commerce, one stream at a time.</p>
              <div class="social-links">
                <a href="https://twitter.com/halohunt">Twitter</a> |
                <a href="https://linkedin.com/company/halohunt">LinkedIn</a> |
                <a href="https://halohunt.com">Website</a>
              </div>
              <p style="margin-top: 20px; font-size: 12px; opacity: 0.6;">If you didn't sign up for this, you can safely ignore this email.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Plain text fallback
      message.textContent = `
Welcome to HaloHunt!

Hello ${firstName || 'there'}!

Thank you for joining our early access list! You're now among the first to experience the future of live commerce.

What's Next?
- Early Access: Be among the first to try HaloHunt when we launch
- Exclusive Updates: Get insider information about new features  
- Special Perks: Enjoy exclusive discounts and benefits
- Beta Testing: Help shape the platform with direct feedback

We're working hard to bring you the most innovative live commerce platform. You'll be the first to know when we're ready to launch!

Launch Date: Q1 2024
Current Waitlist: 10,000+ early adopters

Visit us at: https://halohunt.com

© 2024 HaloHunt. All rights reserved.
      `;

      console.log("Email message object:", JSON.stringify(message, null, 2));
      
      const response = await emailAPI.sendTransacEmail(message);
      console.log("Welcome email sent successfully:", JSON.stringify(response.body));
      return { success: true, data: response.body };
    } catch (error: any) {
      console.error("Error sending welcome email:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      return { success: false, error: error.response?.data || error };
    }
  }

  /**
   * Subscribe user to early access list (creates contact + adds to list + sends welcome email)
   */
  static async subscribeToEarlyAccess(data: ContactData) {
    try {
      // First, create the contact
      const contactResult = await this.createContact(data);
      
      // Check if contact already exists
      if (!contactResult.success && contactResult.error?.code === 'duplicate_parameter') {
        console.log("Contact already exists, proceeding with list addition and email");
        
        // Try to add existing contact to list
        const listResult = await this.addContactToList(data.email);
        if (!listResult.success) {
          console.warn("List addition failed for existing contact:", listResult.error);
        }

        // Send welcome email to existing contact
        const emailResult = await this.sendWelcomeEmail(data.email, data.firstName);
        if (!emailResult.success) {
          console.warn("Welcome email failed for existing contact:", emailResult.error);
        }

        return { 
          success: true, 
          isExistingContact: true,
          contact: null,
          list: listResult.data,
          email: emailResult.data 
        };
      }
      
      if (!contactResult.success) {
        return contactResult;
      }

      // Then, add contact to prelaunch list
      const listResult = await this.addContactToList(data.email);
      if (!listResult.success) {
        console.warn("Contact created but list addition failed:", listResult.error);
      }

      // Finally, send welcome email
      const emailResult = await this.sendWelcomeEmail(data.email, data.firstName);
      if (!emailResult.success) {
        console.warn("Contact created but welcome email failed:", emailResult.error);
      }

      return { 
        success: true, 
        isExistingContact: false,
        contact: contactResult.data,
        list: listResult.data,
        email: emailResult.data 
      };
    } catch (error: any) {
      console.error("Error in subscribeToEarlyAccess:", error);
      return { success: false, error };
    }
  }
} 