import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { ConfigType } from '@nestjs/config';

import { AuthService } from '../auth.service';
import { generateNickname } from '../helpers/generate-nickname.helper';
import googleOauthConfig from '../../../common/config/google-oauth.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(googleOauthConfig.KEY)
        private googleConfig: ConfigType<typeof googleOauthConfig>,
        private authService: AuthService,
    ) {
        super({
            clientID: googleConfig.clientId,
            clientSecret: googleConfig.clientSecret,
            callbackURL: googleConfig.callbackUrl,
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
    ) {
        const user = await this.authService.validateExternalUser({
            emailAddress: profile.emails?.at(0).value,
            name: profile.displayName,
            password: '',
            nickname: generateNickname(profile.displayName),
        });

        done(null, user);
    }
}
