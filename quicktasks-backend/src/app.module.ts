import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TaskStatusModule } from './task-status/task-status.module';

@Module({
  imports: [TaskModule, UserModule, PrismaModule, AuthModule, TaskStatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
