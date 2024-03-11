import { type WebhookEvent } from '@clerk/clerk-sdk-node';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Webhook } from 'svix';

import { type EnvConfig } from '@/env';
import { UsersService } from '@/users/users.service';

export type Headers = Record<string, unknown>;
export type ClerkPayload = Record<string, unknown>;

@Injectable()
export class WebhooksService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService<EnvConfig, true>,
  ) {}

  async handleClerkWebhook(headers: Headers, payload: ClerkPayload) {
    const evt = this.getClerkWebhookEvent(headers, payload);

    if (evt.type === 'user.created') {
      const userEmail = evt.data.email_addresses.find(
        (e) => e.id === evt.data.primary_email_address_id,
      )?.email_address;

      if (!userEmail) {
        throw new HttpException('User email not found from webhook', 400);
      }
      const newUser = await this.usersService.createFromWebhook({
        email: userEmail,
        externalId: evt.data.id,
        names: evt.data.first_name,
        lastNames: evt.data.last_name,
      });

      return newUser;
    }

    if (evt.type === 'user.deleted') {
      const updatedUser = await this.usersService.removeFromWebhook(evt.data.id);

      return updatedUser;
    }

    throw new HttpException(`Webhook type "${evt.type}" not supported`, 400);
  }

  private getClerkWebhookEvent(headers: Headers, payload: ClerkPayload) {
    const CLERK_WEBHOOK_SECRET = this.configService.get('CLERK_WEBHOOK_SECRET', { infer: true });

    const svixHeaders = this.parseSvixHeaders(headers);

    if (!svixHeaders) {
      throw new HttpException('Error occured -- no svix headers', 400);
    }

    const wh = new Webhook(CLERK_WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
      evt = wh.verify(JSON.stringify(payload), {
        'svix-id': svixHeaders.svix_id,
        'svix-timestamp': svixHeaders.svix_timestamp,
        'svix-signature': svixHeaders.svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      if (err instanceof Error) {
        console.log('Webhook failed to verify. Error:', err.message);
        throw new HttpException(err.message, 400);
      }

      console.log('Webhook failed to verify. Error:', String(err));
      throw new HttpException('Webhook failed to verify', 400);
    }

    return evt;
  }

  private parseSvixHeaders(headers: Headers) {
    const svix_id = headers['svix-id'] as string;
    const svix_timestamp = headers['svix-timestamp'] as string;
    const svix_signature = headers['svix-signature'] as string;

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return null;
    }

    return {
      svix_id,
      svix_timestamp,
      svix_signature,
    };
  }
}
