import { Injectable } from '@nestjs/common';

import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenUploadDto } from './dto/refresh-token-upload.dto';

@Injectable()
export class RefreshTokenService {
    constructor(private repository: RefreshTokenRepository) {}

    async saveToken(input: RefreshTokenUploadDto): Promise<void> {
        await this.repository.saveToken(input);
    }
    async updateToken(oldToken: string, newToken: string): Promise<void> {
        await this.repository.updateToken(oldToken, newToken);
    }
    async removeToken(token: string): Promise<void> {
        await this.repository.removeToken(token);
    }
    async checkForTokensAmount(userId: number): Promise<void> {
        await this.repository.checkForTokensAmount(userId);
    }
}
