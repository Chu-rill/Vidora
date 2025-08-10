import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from 'src/email/email.module';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  controllers: [OauthController],
  providers: [OauthService, GoogleStrategy],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    PassportModule,
    EmailModule,
  ],
})
export class OauthModule {}
