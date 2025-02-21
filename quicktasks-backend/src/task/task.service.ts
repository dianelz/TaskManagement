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
    const defaultStatus = await this.prisma.taskStatus.findFirst({
      where: { is_new: true },
      select: { id: true }, // Suppose que ton champ s'appelle "name"
    });

    if (!defaultStatus) {
      throw new Error('Aucun statut initial trouvé');
    }
    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        status: {
          connect: { id: defaultStatus.id },
        },
        user: {
          connect: { id: data.userId },
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

  async updateTaskStatus(id: number, data: TaskStatus): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: {
        status: {
          connect: { id: data.id },
        },
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.task.delete({ where: { id } });
  }
}
