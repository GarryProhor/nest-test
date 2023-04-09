import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly uwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwtToken(user) {
    const payload = { user };
    return this.uwtService.sign(payload, {
      secret: this.configService.get('secret_jwt'),
      expiresIn: this.configService.get('expire_jwt'),
    });
  }
}
