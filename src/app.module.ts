import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '@/env';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthzModule } from './authz/authz.module';
import { MinistriesModule } from './ministries/ministries.module';
import { ServiceTeamsModule } from './service-teams/service-teams.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, validate }),
    ServiceTeamsModule,
    MinistriesModule,
    AuthzModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
