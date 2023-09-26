import { IsNumberString } from 'class-validator';

export class RoomGetByIdDto {
  @IsNumberString()
  id: number;
}
