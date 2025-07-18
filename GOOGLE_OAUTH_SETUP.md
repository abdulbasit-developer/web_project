# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for the AI Research Summarizer.

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API for your project

## Step 2: Create OAuth 2.0 Credentials

1. In the Google Cloud Console, go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. If prompted, configure the OAuth consent screen first:
   - Choose **External** user type
   - Fill in the required fields (App name, User support email, Developer contact)
   - Add your domain to authorized domains if deploying to production
4. For Application type, select **Web application**
5. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`
6. Click **Create**

## Step 3: Configure Environment Variables

1. Copy your **Client ID** and **Client Secret** from the Google Cloud Console
2. Update your `.env.local` file with the following:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

## Step 4: Generate NextAuth Secret

Generate a secure secret for NextAuth:

```bash
# Using OpenSSL
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Replace `your-secret-key-here-change-this-in-production` with the generated secret.

## Step 5: Test the Authentication

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. You should see a "Sign in Required" message
4. Click "Sign in with Google" to test the authentication flow

## Production Deployment

For production deployment:

1. Update `NEXTAUTH_URL` to your production domain
2. Add your production domain to Google OAuth authorized redirect URIs
3. Use a strong, unique `NEXTAUTH_SECRET`
4. Consider adding additional security measures like CSRF protection

## Troubleshooting

- **Error 400: redirect_uri_mismatch**: Make sure your redirect URI in Google Console matches exactly
- **Error 403: access_blocked**: Check your OAuth consent screen configuration
- **Session not persisting**: Verify your `NEXTAUTH_SECRET` is set correctly

## Security Notes

- Never commit your `.env.local` file to version control
- Use different OAuth credentials for development and production
- Regularly rotate your secrets
- Monitor your Google Cloud Console for unusual activity