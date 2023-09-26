import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './schedule/schedule.module';
import { RoomModule } from './room/room.module';
import { PrismaModule } from 'nestjs-prisma';
import { RoomService } from './room/room.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ScheduleModule, RoomModule, PrismaModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService, RoomService],
})
export class AppModule {}
