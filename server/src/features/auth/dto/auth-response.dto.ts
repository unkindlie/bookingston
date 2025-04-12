import { UserPayloadDto } from '../../user/dto/user-payload.dto';
import { JwtTokensDto } from './jwt-tokens.dto';

export type AuthResponseDto = {
    user: UserPayloadDto;
    tokens: JwtTokensDto;
};
