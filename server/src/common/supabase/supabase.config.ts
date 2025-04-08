import { registerAs } from '@nestjs/config';

export default registerAs('supabase', () => ({
    projectUrl: process.env.SUPABASE_PROJECT_URL,
    apiKey: process.env.SUPABASE_API_KEY,
}));
