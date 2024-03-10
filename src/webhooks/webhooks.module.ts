import { Module } from '@nestjs/common';

import { PrismaService } from '@/db/prisma.service';
import { UsersService } from '@/users/users.service';

import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';

@Module({
  controllers: [WebhooksController],
  providers: [PrismaService, UsersService, WebhooksService],
})
export class WebhooksModule {}
