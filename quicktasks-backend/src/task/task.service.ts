import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task, TaskStatus } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.task.findMany();
  }

  async createTask(data: {
    title: string;
    description?: string;
    dueDate?: Date;
    userId: number;
  }) {
    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        status: 'TODO',
        user: {
          connect: { id: data.userId }, // ✅ Liaison via la relation Prisma
        },
      },
    });
  }

  async updateTask(
    id: number,
    data: { title?: string; description?: string; dueDate?: Date },
  ): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { status },
    });
  }

  async delete(id: number) {
    return await this.prisma.task.delete({ where: { id } });
  }
}
