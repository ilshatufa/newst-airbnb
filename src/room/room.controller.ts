import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomCreateDto } from './dto/roomCreate.dto';
import { RoomDeleteDto } from './dto/roomDelete.dto';
import { RoomGetByIdDto } from './dto/roomGetById.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Post('create')
  async create(@Body() dto: RoomCreateDto) {
    return await this.roomService.create(dto);
  }
  @Patch(':id')
  async update(@Body() dto: RoomCreateDto, @Param() { id }: RoomDeleteDto) {
    return await this.roomService.update(Number(id), dto);
  }
  @Delete(':id')
  async delete(@Param() dto: RoomDeleteDto) {
    return await this.roomService.delete(Number(dto.id));
  }
  @Get(':id')
  async getById(@Param() dto: RoomGetByIdDto) {
    return await this.roomService.getById(Number(dto.id));
  }
  @Get()
  async getAll() {
    return await this.roomService.getAll();
  }
}
