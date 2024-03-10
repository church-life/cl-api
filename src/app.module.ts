import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '@/env';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthzModule } from './authz/authz.module';
import { CountriesModule } from './countries/countries.module';
import { MinistriesModule } from './ministries/ministries.module';
import { ServiceTeamsModule } from './service-teams/service-teams.module';
import { UsersModule } from './users/users.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, validate }),
    ServiceTeamsModule,
    MinistriesModule,
    AuthzModule,
    UsersModule,
    CountriesModule,
    WebhooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
