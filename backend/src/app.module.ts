import { Module } from '@nestjs/common';
import { MailModule } from './email/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}