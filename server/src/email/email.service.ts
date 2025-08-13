import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs/promises';
import * as handlebars from 'handlebars';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;
  private welcomeTemplatePath: string;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get<string>('EMAIL_PROVIDER'),
      port: Number(configService.get<string>('SERVICE_PORT')),
      secure: false,
      service: 'gmail',
      auth: {
        user: configService.get<string>('EMAIL_USER'),
        pass: configService.get<string>('EMAIL_PASS'),
      },
    });

    this.welcomeTemplatePath = path.join(
      process.cwd(),
      'src/views/welcome.hbs',
    );
  }

  // Method to read the email template file based on a path
  private async readTemplateFile(templatePath: string): Promise<string> {
    try {
      return await fs.readFile(templatePath, 'utf-8');
    } catch (error) {
      throw new Error(`Error reading email template file: ${error}`);
    }
  }

  // Send an email with a template
  async sendWelcomeEmail(
    email: string,
    data: { subject: string; username: string; token: string },
  ): Promise<void> {
    try {
      const frontendUrl = this.configService.get('FRONTEND_URL');
      const verificationUrl = `${frontendUrl}/verify-email?token=${data.token}`;
      const templateSource = await this.readTemplateFile(
        this.welcomeTemplatePath,
      );
      const emailTemplate = handlebars.compile(templateSource);

      const info = await this.transporter.sendMail({
        from: this.configService.get<string>('EMAIL_USER'),
        to: email,
        subject: data.subject,
        html: emailTemplate({
          appName: 'Vidora',
          username: data.username,
          verificationLink: verificationUrl,
          title: 'Verification Email',
        }),
      });

      this.logger.log(
        `Welcome email sent successfully to ${email}. MessageId: ${info.messageId}`,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      this.logger.error(
        `Failed to send welcome email to ${email}: ${errorMessage}`,
        error,
      );

      console.error(
        `Error sending email with template: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
