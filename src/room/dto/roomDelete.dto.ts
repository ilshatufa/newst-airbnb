import { IsNumberString } from 'class-validator';

export class RoomDeleteDto {
  @IsNumberString()
  id: number;
}
