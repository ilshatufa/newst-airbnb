import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleCreateDto } from './dto/scheduleCreate.dto';
import { ScheduleGetByIdDto } from './dto/scheduleGetById.dto';
import { ScheduleUpdateDto } from './dto/scheduleUpdate.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}
  @Post('create')
  async create(@Body() dto: ScheduleCreateDto) {
    return await this.scheduleService.create(dto);
  }
  @Patch(':id')
  async update(
    @Body() dto: ScheduleUpdateDto,
    @Param() { id }: ScheduleGetByIdDto,
  ) {
    return await this.scheduleService.update(Number(id), dto);
  }

  @Get(':id')
  async getById(@Param() dto: ScheduleGetByIdDto) {
    return await this.scheduleService.getById(Number(dto.id));
  }
  @Get()
  async getAll() {
    return await this.scheduleService.getAll();
  }
}
