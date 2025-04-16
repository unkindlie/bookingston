import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenUploadDto } from './dto/refresh-token-upload.dto';
import { MAX_TOKENS_PER_USER } from './constants/refresh-token.constants';

@Injectable()
export class RefreshTokenRepository {
    constructor(
        @InjectRepository(RefreshTokenEntity)
        private tokenRepo: Repository<RefreshTokenEntity>,
    ) {}

    async saveToken(input: RefreshTokenUploadDto): Promise<void> {
        const entity = this.tokenRepo.create({
            token: input.token,
            user: { id: input.userId },
        });
        await this.tokenRepo.insert(entity);
    }
    async updateToken(oldToken: string, newToken: string): Promise<void> {
        const entityId = await this.tokenRepo.findOne({
            select: { id: true },
            where: {
                token: oldToken,
            },
        });
        if (!entityId) {
            throw new UnauthorizedException('No refresh token was found');
        }

        await this.tokenRepo.update(entityId, {
            token: newToken,
            tokenCreationDate: new Date(),
        });
    }
    async removeToken(token: string): Promise<void> {
        const entity = await this.tokenRepo.findOneBy({ token });
        if (!entity) {
            throw new ForbiddenException(
                'No such token available in the database',
            );
        }

        await this.tokenRepo.remove(entity);
    }
    async checkIfTokenAvailable(token: string): Promise<boolean> {
        return await this.tokenRepo.existsBy({ token });
    }
    async checkForTokensAmount(userId: number): Promise<void> {
        const tokensCount = await this.tokenRepo.countBy({
            user: { id: userId },
        });

        if (tokensCount == MAX_TOKENS_PER_USER) {
            throw new ForbiddenException('You have too much active tokens');
        }
    }
}
