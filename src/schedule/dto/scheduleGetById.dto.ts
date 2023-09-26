import { IsNumberString } from 'class-validator';

export class ScheduleGetByIdDto {
  @IsNumberString()
  id: number;
}
