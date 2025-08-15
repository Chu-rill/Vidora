import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  HttpCode,
  HttpStatus,
  Query,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './email-password-auth.service';
import { JwtAuthGuard } from '../../guards/auth.guard';
import {
  SignupDto,
  LoginDto,
  VerifyEmailDto,
  SignupSchema,
  SignupDtoSwagger,
  LoginSchema,
  LoginDtoSwagger,
  VerifyEmailSchema,
  EmailValidationSchema,
  EmailValidationDtoSwagger,
  EmailValidationDto,
} from './validation';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ZodPipe } from 'src/utils/schema-validation/validation.pipe';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodPipe(SignupSchema))
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: SignupDtoSwagger })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(@Body() registerDto: SignupDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodPipe(LoginSchema))
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDtoSwagger })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  async logout(@Request() req) {
    return this.authService.logout(req.user.id);
  }

  @Get('verify-email')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodPipe(VerifyEmailSchema))
  @ApiOperation({ summary: 'Verify user' })
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  @ApiResponse({ status: 404, description: 'Token not found' })
  async verifyEmail(@Query() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto);
  }

  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodPipe(EmailValidationSchema))
  @ApiOperation({ summary: 'Resend verification email' })
  @ApiBody({ type: EmailValidationDtoSwagger })
  @ApiResponse({ status: 200, description: 'Verification email sent' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Email already verified' })
  async resendVerificationEmail(@Body() dto: EmailValidationDto) {
    return this.authService.resendVerificationEmail(dto);
  }
}
