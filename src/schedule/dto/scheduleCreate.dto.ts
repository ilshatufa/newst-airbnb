import { IsDate, IsDateString, IsPositive } from 'class-validator';

export class ScheduleCreateDto {
  @IsDateString()
  date: Date;

  @IsPositive()
  roomId: number;
}
