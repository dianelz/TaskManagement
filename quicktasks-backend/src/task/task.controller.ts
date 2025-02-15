import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskStatus } from '@prisma/client';

@Controller('tasks') // Assurez-vous que le chemin est bien "tasks"
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Post()
  createTask(@Body() body: { title: string; userId: number }) {
    return this.taskService.createTask(body);
  }

  @Patch(':id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() data: { status: TaskStatus },
  ) {
    console.log('📥 Requête reçue :', { id, data });
    return this.taskService.updateTaskStatus(+id, data.status);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(Number(id));
  }
}
