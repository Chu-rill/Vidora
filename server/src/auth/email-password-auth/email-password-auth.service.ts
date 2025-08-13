import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { SignupDto, LoginDto, VerifyEmailDto } from './validation';
import { UserRepository } from 'src/user/user.repository';
import {
  comparePassword,
  encrypt,
} from 'src/utils/helper-functions/encryption';
import { UserService } from 'src/user/user.service';
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
    let hashedPassword = await encrypt(password.trim());

    // Create user
    const user = await this.userRepository.createUser(
      username,
      email,
      hashedPassword,
    );

    // Generate verification token
    const token = await this.generateVerificationToken(user.id);

    const data = {
      subject: 'Vidora Verification Email',
      username: user.username,
      token,
    };

    try {
      await this.mailService.sendWelcomeEmail(user.email, data);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      throw new BadRequestException('Failed to send verification email');
    }

    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message:
        'User registered successfully. Please check your email for verification.',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
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
      password.trim(),
      user.password!,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException(
        'Please verify your email before logging in',
      );
    }

    // Update online status
    await this.userService.updateOnlineStatus(user.id, true);

    // Generate token
    const token = this.generateAuthToken(user.id);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        avatar: user.avatar,
      },
      token,
    };
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const { token } = dto;

    // Find user by verification token
    const user = await this.userRepository.findByVerificationToken(token);
    if (!user) {
      throw new NotFoundException('Invalid verification token');
    }

    // Check if token is expired
    if (user.verificationExpiry && user.verificationExpiry < new Date()) {
      throw new BadRequestException('Verification token has expired');
    }

    // Check if already verified
    if (user.isVerified) {
      throw new BadRequestException('Email is already verified');
    }

    // Mark user as verified
    await this.userRepository.verifyUser(user.id);

    const authToken = this.generateAuthToken(user.id);

    await this.userService.updateOnlineStatus(user.id, true);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Email verified successfully',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        isVerified: true,
      },
      token: authToken,
    };
  }

  async resendVerificationEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email is already verified');
    }

    const token = await this.generateVerificationToken(user.id);

    const data = {
      subject: 'Vidora Verification Email',
      username: user.username,
      token,
    };
    try {
      await this.mailService.sendWelcomeEmail(user.email, data);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      throw new BadRequestException('Failed to send verification email');
    }

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Verification email sent successfully',
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

  private generateAuthToken(userId: string): string {
    return this.jwtService.sign(userId);
  }

  async generateVerificationToken(userId: string): Promise<string> {
    // Generate secure random token
    const token = crypto.randomBytes(32).toString('hex');

    // Set expiry to 24 hours from now
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24);

    // Update user with verification token
    await this.userRepository.updateVerificationToken(userId, token, expiry);

    return token;
  }
}
