import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { WebhooksService } from './webhooks.service';

@ApiTags('webhooks')
@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('clerk')
  create(@Headers() headers: Record<string, unknown>, @Body() payload: Record<string, unknown>) {
    return this.webhooksService.handleClerkWebhook(headers, payload);
  }
}
