import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

class ContactDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  subject?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  message!: string;
}

@Controller('api/email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('contact')
  async contact(@Body() body: ContactDto) {
    try {
      await this.mailService.sendContactEmail(body);
      return { success: true, message: 'Message sent successfully' };
    } catch (error: any) {
      const message = typeof error?.message === 'string' ? error.message : 'Failed to send message';
      throw new HttpException({ success: false, message }, HttpStatus.BAD_REQUEST);
    }
  }
}