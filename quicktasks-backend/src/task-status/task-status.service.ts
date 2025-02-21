import { Injectable } from '@nestjs/common';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskStatusService {
  constructor(private prisma: PrismaService) {}

  create(createTaskStatusDto: CreateTaskStatusDto) {
    return this.prisma.taskStatus.create({
      data: {
        name: createTaskStatusDto.name,
        is_closed: false,
        is_new: false,
      },
    });
  }

  getAllStatus() {
    return this.prisma.taskStatus.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} taskStatus`;
  }

  update(id: number, updateTaskStatusDto: UpdateTaskStatusDto) {
    return this.prisma.taskStatus.update({
      where: { id },
      data: updateTaskStatusDto,
    });
  }

  remove(id: number) {
    return this.prisma.taskStatus.delete({ where: { id } });
  }
}
