import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  HttpStatus,
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
import { success } from 'zod';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: EmailService,
  ) {}

  async register(registerDto: SignupDto) {
    const { username, email, password } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash password
    let hashedPassword = await encrypt(password.trim().toLowerCase());

    // Create user
    const user = await this.userRepository.createUser(
      username,
      email,
      hashedPassword,
    );

    const data = {
      subject: 'Vidora welcome email',
      username: user.username,
    };
    await this.mailService.sendWelcomeEmail(user.email, data);

    // Generate token
    const token = this.generateToken(user.id);

    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'User registered successfully',
      data: user,
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
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
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Login successful',
      data: userWithoutPassword,
      token,
    };
  }

  async logout(userId: string) {
    await this.userService.updateOnlineStatus(userId, false);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User logged out successfully',
      data: null,
    };
  }

  private generateToken(userId: string): string {
    return this.jwtService.sign(userId);
  }
}
