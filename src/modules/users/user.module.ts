import { Module } from '@nestjs/common';
import { AppController } from './user.controller';
import { UserService  } from './user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [UserService, PrismaService],
})
export class AppModule {}
