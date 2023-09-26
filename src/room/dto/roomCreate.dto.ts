import { IsEnum, IsPositive } from 'class-validator';
import { RoomType, RoomView } from '@prisma/client';

export class RoomCreateDto {
  @IsPositive()
  number: number;

  @IsEnum(RoomView)
  view: RoomView;

  @IsEnum(RoomType)
  type: RoomType;
}
