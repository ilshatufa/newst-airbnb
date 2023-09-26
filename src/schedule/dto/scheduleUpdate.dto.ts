import { IsDateString, IsEnum, IsPositive } from 'class-validator';
import { ScheduleStatus } from '@prisma/client';

export class ScheduleUpdateDto {
  @IsDateString()
  date: Date;

  @IsPositive()
  roomId: number;

  @IsEnum(ScheduleStatus)
  status: ScheduleStatus;
}
