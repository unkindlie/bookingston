import { registerAs } from '@nestjs/config';

export default registerAs('google-oauth', () => ({
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
}));
