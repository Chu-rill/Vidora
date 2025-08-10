import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class OauthService {
  constructor(
    private jwt: JwtService,
    private userRepository: UserRepository,
    private mailService: EmailService,
  ) {}

  async validateOAuthGoogleLogin(req): Promise<any> {
    if (!req || !req.user) {
      console.log('Google login failed:', req);
      throw new UnauthorizedException('No user from Google');
    }

    const auth = {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
    };

    let user = await this.userRepository.getUserByEmail(auth.email);

    if (!user) {
      let username = `${auth.firstName}${auth.lastName}`;
      user = await this.userRepository.createUserOauth(
        username,
        auth.email,
        auth.picture,
      );

      const data = {
        subject: 'Vidora welcome email',
        username: user.username,
      };
      await this.mailService.sendWelcomeEmail(user.email, data);
    }

    const payload = { id: user.id, username: user.username, email: user.email };
    const token = await this.jwt.signAsync(payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Google Auth Successful',
      data: user,
      token: token,
    };
  }
}
