# Brevo Email Integration Setup

This guide will help you set up Brevo (formerly Sendinblue) for email subscriptions and transactional emails.

## 1. Get Your Brevo API Key

1. Go to [Brevo Dashboard](https://app.brevo.com/)
2. Sign up or log in to your account
3. Navigate to **Settings** → **API Keys**
4. Create a new API key or copy your existing one
5. The API key will look like: `xkeysib-xxxxxxxxxxxxxxxxxxxxx`

## 2. Create Prelaunch List

1. In Brevo dashboard, go to **Contacts** → **Lists**
2. Click **Create a new list**
3. Name it "prelaunch" (or any name you prefer)
4. Note down the **List ID** (you'll need this for the environment variable)

## 3. Environment Variables

Create a `.env.local` file in your project root and add:

```env
# Brevo API Configuration
BREVO_API_KEY=xkeysib-your-actual-api-key-here

# Prelaunch List ID (get this from your Brevo dashboard)
BREVO_PRELAUNCH_LIST_ID=123

# Optional: Custom sender email (must be verified in Brevo)
SENDER_EMAIL=noreply@yourdomain.com
SENDER_NAME=Your Company Name
```

## 4. Verify Your Sender Domain

1. In Brevo dashboard, go to **Settings** → **Senders & IP**
2. Add and verify your sender domain
3. This ensures emails are delivered properly

## 5. Test the Integration

1. Start your development server: `npm run dev`
2. Go to the newsletter section
3. Enter an email address and click "Get Early Access"
4. Check the console for success/error messages
5. Check your email for the welcome message

## 6. Monitor in Brevo Dashboard

- **Contacts**: View all subscribers in the Contacts section
- **Lists**: Check your "prelaunch" list for all early access subscribers
- **Transactional Emails**: Monitor email delivery in the Transactional section
- **Analytics**: Track open rates and engagement

## Troubleshooting

### Common Issues:

1. **API Key Error**: Make sure your API key is correct and has proper permissions
2. **Email Not Sending**: Verify your sender domain in Brevo
3. **Contact Not Created**: Check if the email already exists in your contact list

### Error Messages:

- `Invalid API key`: Check your `BREVO_API_KEY` environment variable
- `Sender not verified`: Verify your sender domain in Brevo
- `Contact already exists`: This is normal for duplicate emails
- `400 Bad Request`: Usually means invalid request format or missing required fields

### Debugging Steps:

1. **Test API Connection**: Visit `/api/test-brevo` in your browser to test the connection
2. **Check Environment Variables**: Ensure `BREVO_API_KEY` and `BREVO_PRELAUNCH_LIST_ID` are set correctly
3. **Verify List ID**: Make sure the list ID exists in your Brevo dashboard
4. **Check Console Logs**: Look for detailed error messages in the browser console and server logs

## Features Implemented

✅ **Contact Creation**: Automatically adds subscribers to your Brevo contact list
✅ **List Management**: Adds contacts to your "prelaunch" list for targeted campaigns
✅ **Welcome Email**: Sends a beautiful HTML welcome email
✅ **Error Handling**: Graceful error handling with user feedback
✅ **Loading States**: Visual feedback during subscription process
✅ **Email Validation**: Basic email format validation
✅ **Duplicate Handling**: Handles existing contacts gracefully

## Customization

You can customize the welcome email template in `src/app/lib/brevo.ts` by modifying the `sendWelcomeEmail` function. 