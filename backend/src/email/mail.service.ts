import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

interface ContactEmailData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.createTransport();
  }

  private createTransport() {
    const smtpHost = this.configService.get<string>('SMTP_HOST');
    const smtpPort = this.configService.get<number>('SMTP_PORT');
    const smtpUser = this.configService.get<string>('SMTP_USER');
    const smtpPassword = this.configService.get<string>('SMTP_PASSWORD');
    const smtpSecure = this.configService.get<string>('SMTP_SECURE') === 'true';

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
      this.logger.error('SMTP configuration is incomplete');
      throw new Error('SMTP configuration is incomplete');
    }

    this.transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPassword,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      

    this.transporter.verify((error, success) => {
      if (error) {
        this.logger.error('SMTP connection failed:', error);
      } else {
        this.logger.log('SMTP server is ready to send emails');
      }
    });
  }

  async sendContactEmail(data: ContactEmailData): Promise<void> {
    try {
      const { name, email, subject, message } = data;
      const recipientEmail = this.configService.get<string>('RECIPIENT_EMAIL');

      if (!recipientEmail) {
        throw new Error('Recipient email is not configured');
      }

      const emailSubject = subject || 'New Contact Form Submission';

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Form Submission</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 300;
            }
            .content {
              padding: 30px;
            }
            .field {
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 1px solid #eee;
            }
            .field:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: bold;
              color: #555;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 5px;
            }
            .value {
              font-size: 16px;
              color: #333;
              word-wrap: break-word;
            }
            .message-content {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 5px;
              border-left: 4px solid #667eea;
              white-space: pre-wrap;
            }
            .footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${emailSubject}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="value">
                  <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from your website contact form.</p>
              <p>Reply directly to this email to respond to ${name}.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const textContent = `
        New Contact Form Submission
        
        From: ${name}
        Email: ${email}
        Subject: ${emailSubject}
        
        Message:
        ${message}
        
        ---
        This email was sent from your website contact form.
        Reply directly to this email to respond to ${name}.
      `;

      const mailOptions = {
        from: `"${name}" <${this.configService.get<string>('SMTP_USER')}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `Contact Form: ${emailSubject}`,
        text: textContent,
        html: htmlContent,
      };

      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent successfully: ${info.messageId}`);

      await this.sendAutoReply(data);

    } catch (error) {
      this.logger.error('Failed to send contact email:', error);
      throw new Error('Failed to send email. Please try again later.');
    }
  }

  private async sendAutoReply(data: ContactEmailData): Promise<void> {
    try {
      const autoReplyEnabled = this.configService.get<string>('AUTO_REPLY_ENABLED') === 'true';
      
      if (!autoReplyEnabled) {
        return;
      }

      const { name, email } = data;

      const autoReplyHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Your Message</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .content {
              padding: 30px;
            }
            .footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You!</h1>
            </div>
            <div class="content">
              <p>Hello ${name},</p>
              <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
              <p>I typically respond within 2-18 hours during business days.</p>
              <p>Best regards,<br>Mahad</p>
            </div>
            <div class="footer">
              <p>This is an automated response. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const autoReplyText = `
        Hello ${name},

        Thank you for reaching out! I've received your message and will get back to you as soon as possible.

        I typically respond within 24-48 hours during working days.

        Best regards,
        Mahad

        ---
        This is an automated response. Please do not reply to this email.
      `;

      const autoReplyOptions = {
        from: `"Mahad" <${this.configService.get<string>('SMTP_USER')}>`,
        to: email,
        subject: 'Thank you for your message!',
        text: autoReplyText,
        html: autoReplyHtml,
      };

      await this.transporter.sendMail(autoReplyOptions);
      this.logger.log(`Auto-reply sent to: ${email}`);

    } catch (error) {
      this.logger.warn('Failed to send auto-reply:', error);
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      this.logger.error('SMTP connection test failed:', error);
      return false;
    }
  }
}