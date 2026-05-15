// TODO: Setup Google OAuth 2.0
// Referensi: https://developers.google.com/identity/protocols/oauth2
export const googleOAuth = {
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
}
