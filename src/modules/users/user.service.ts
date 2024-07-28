import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDTO } from './dto/user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getAll(): Promise<User[]> {
    return await this.prisma.user.findMany()
  }

  async findOne(id:number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where:{id}
    })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user
  }

  async create(body: UserDTO): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email
      }
    })
    if (user) {
      throw new HttpException('This is email has been used', HttpStatus.BAD_REQUEST)
    }
    const result = await this.prisma.user.create({
      data: body
    })
    return result
  }

  async update(id: number, dataUpdate: UserDTO): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (dataUpdate.email) {
      const emailExists = await this.prisma.user.findUnique({
        where: { email: dataUpdate.email },
      });

      if (emailExists && emailExists.id !== id) {
        throw new ConflictException('Email already in use');
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: dataUpdate
    })
  }

  async delete(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prisma.user.delete({
      where: { id }
    })
  }
}
