import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './validation';
import { LoginDto } from 'src/user/validation';
import { UserRepository } from 'src/user/user.repository';
import {
  comparePassword,
  encrypt,
} from 'src/utils/helper-functions/encryption';
import { use } from 'passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: SignupDto) {
    const { username, email, password } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists ß');
    }

    // Hash password
    let hashedPassword = await encrypt(password.trim().toLowerCase());

    // Create user
    const user = await this.userRepository.createUser(
      username,
      email,
      hashedPassword,
    );

    // Generate token
    const token = this.generateToken(user.id);

    return {
      user,
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await comparePassword(
      password.trim().toLowerCase(),
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update online status
    await this.userService.updateOnlineStatus(user.id, true);

    // Generate token
    const token = this.generateToken(user.id);

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async logout(userId: string) {
    await this.userService.updateOnlineStatus(userId, false);
    // await this.prisma.user.update({
    //   where: { id: userId },
    //   data: { isOnline: false },
    // });
  }

  private generateToken(userId: string): string {
    return this.jwtService.sign(userId);
  }
}
