import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService  } from './user.service';
import { Prisma, User } from '@prisma/client';
import { UserDTO } from './dto/user.dto';

@Controller('users')
export class AppController {
  constructor(private readonly userService: UserService ) {}

  @Get()
  listUser():Promise<User[]>{
    return this.userService.getAll()
  }

  @Get(':id')
  getUser(@Param('id',ParseIntPipe) id:number):Promise<User>{
    return this.userService.findOne(id)
  }

  @Post()
  createUser(@Body() body: UserDTO):Promise<User>{
    return this.userService.create(body);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number,@Body() dateUpdate:UserDTO): Promise<User>{
    return this.userService.update(id,dateUpdate)
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User>{
    return this.userService.delete(id)
  }
}