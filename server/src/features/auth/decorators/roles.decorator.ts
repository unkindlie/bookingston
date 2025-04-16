import { SetMetadata } from '@nestjs/common';

import { Role } from '../../user/enums/role.enum';
import { ROLE_KEY } from '../constants/auth.constants';

export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
