import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceTeamsModule } from './service-teams/service-teams.module';

@Module({
  imports: [ServiceTeamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
