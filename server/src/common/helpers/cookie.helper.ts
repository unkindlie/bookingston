import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { REFRESH_TOKEN_AGE } from '../constants/common.constants';

@Injectable()
export class CookieHelper {
    setCookie(key: string, value: string | number, res: Response) {
        res.cookie(key, value, {
            maxAge: REFRESH_TOKEN_AGE,
            httpOnly: true,
            sameSite: 'none',
        });
    }
    clearCookie(key: string, res: Response) {
        res.clearCookie(key);
    }
}
