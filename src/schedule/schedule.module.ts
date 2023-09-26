import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { PrismaService } from '../prisma.service';
import { ScheduleService } from './schedule.service';
import { RoomService } from '../room/room.service';

@Module({
  controllers: [ScheduleController],
  providers: [PrismaService, ScheduleService, RoomService],
})
export class ScheduleModule {}
