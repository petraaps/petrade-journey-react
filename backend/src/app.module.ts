import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TradesModule } from './trades/trades.module';

@Module({
  imports: [PrismaModule, TradesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
