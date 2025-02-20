import { Injectable } from '@nestjs/common';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskStatusService {
  constructor(private prisma: PrismaService) {}

  create(createTaskStatusDto: CreateTaskStatusDto) {
    return `This action create taskStatus with data: ${JSON.stringify(createTaskStatusDto)}`;
  }

  getAllStatus() {
    return this.prisma.taskStatus.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} taskStatus`;
  }

  update(id: number, updateTaskStatusDto: UpdateTaskStatusDto) {
    return `This action updates taskStatus #${id} with data: ${JSON.stringify(updateTaskStatusDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskStatus`;
  }
}
