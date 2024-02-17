import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinistriesModule } from './ministries/ministries.module';
import { ServiceTeamsModule } from './service-teams/service-teams.module';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [ServiceTeamsModule, MinistriesModule, AuthzModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
