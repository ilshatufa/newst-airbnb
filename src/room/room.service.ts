import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoomCreateDto } from './dto/roomCreate.dto';
import { PrismaService } from '../prisma.service';
import { Room } from '@prisma/client';
import { ROOM_ALREADY_EXISTS, ROOM_NOT_EXISTS } from './room.constatnts';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(data: RoomCreateDto): Promise<Room> {
    const room = await this.prisma.room.findUnique({
      where: { number: data.number },
    });
    if (room) {
      throw new HttpException(ROOM_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }
    return await this.prisma.room.create({
      data,
    });
  }

  async delete(id: number): Promise<Room> {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });
    if (!room) {
      throw new HttpException(ROOM_NOT_EXISTS, HttpStatus.CONFLICT);
    }
    return await this.prisma.room.delete({ where: { id } });
  }
  async getById(id: number): Promise<Room> {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });
    if (!room) {
      throw new HttpException(ROOM_NOT_EXISTS, HttpStatus.CONFLICT);
    }
    return room;
  }
  async getAll(): Promise<Room[]> {
    return await this.prisma.room.findMany();
  }
  async update(id: number, data: RoomCreateDto): Promise<Room> {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });
    if (!room) {
      throw new HttpException(ROOM_NOT_EXISTS, HttpStatus.CONFLICT);
    }
    const roomWithNumber = await this.prisma.room.findMany({
      where: { id: { not: id }, number: data.number },
    });

    if (roomWithNumber.length > 0) {
      throw new HttpException(ROOM_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }
    return await this.prisma.room.update({ where: { id }, data });
  }
}
