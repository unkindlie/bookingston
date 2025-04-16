import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JWT_REFRESH_KEY } from '../constants/auth.constants';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(JWT_REFRESH_KEY) {}
