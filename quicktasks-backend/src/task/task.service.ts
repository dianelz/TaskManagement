import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.task.findMany();
  }

  async create(data: { title: string; userId: number }) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }
    return await this.prisma.task.create({ data });
  }

  async update(id: number, data: { title?: string; completed?: boolean }) {
    return await this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return await this.prisma.task.delete({ where: { id } });
  }
}
