import { registerAs } from '@nestjs/config';

export default registerAs('accessTokenConfig', () => ({
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
}));
