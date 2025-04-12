import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieHelper {
    setCookie(key: string, value: string | number, res: Response) {
        // TODO: add constant for maxAge
        res.cookie(key, value, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            sameSite: 'none',
        });
    }
    clearCookie(key: string, res: Response) {
        res.clearCookie(key);
    }
}
