import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Schedule, ScheduleStatus } from '@prisma/client';
import {
  SCHEDULE_ALREADY_EXISTS,
  SCHEDULE_NOT_EXISTS,
} from './schedule.constatnts';
import { ScheduleCreateDto } from './dto/scheduleCreate.dto';
import { RoomService } from '../room/room.service';
import { ScheduleUpdateDto } from './dto/scheduleUpdate.dto';

@Injectable()
export class ScheduleService {
  constructor(
    private prisma: PrismaService,
    private readonly roomService: RoomService,
  ) {}

  async create(data: ScheduleCreateDto): Promise<Schedule> {
    await this.roomService.getById(data.roomId);
    const date = new Date(data.date);
    const schedule = await this.prisma.schedule.findMany({
      where: {
        date,
        roomId: data.roomId,
        status: ScheduleStatus.OPEN,
      },
    });
    if (schedule.length > 0) {
      throw new HttpException(SCHEDULE_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }
    return await this.prisma.schedule.create({
      data: { date, roomId: data.roomId },
    });
  }

  async getById(id: number): Promise<Schedule> {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
    });
    if (!schedule) {
      throw new HttpException(SCHEDULE_NOT_EXISTS, HttpStatus.CONFLICT);
    }
    return schedule;
  }
  async getAll(): Promise<Schedule[]> {
    return await this.prisma.schedule.findMany();
  }
  async update(id: number, data: ScheduleUpdateDto): Promise<Schedule> {
    await this.roomService.getById(data.roomId);
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
    });
    if (!schedule) {
      throw new HttpException(SCHEDULE_NOT_EXISTS, HttpStatus.CONFLICT);
    }
    const date = new Date(data.date);
    return await this.prisma.schedule.update({
      where: { id },
      data: {
        date,
        roomId: data.roomId,
        status: data.status,
      },
    });
  }
}
