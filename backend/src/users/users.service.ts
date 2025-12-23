import { Injectable } from '@nestjs/common';

import { Prisma } from 'generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';

const noPassword = {
  password: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createUserDto,
      omit: noPassword,
    });
  }

  async findAll() {
    return this.databaseService.user.findMany({
      omit: noPassword,
    });
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
      omit: noPassword,
    });
  }

  async findByEmail(email: string) {
    return this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
      omit: noPassword,
    });
  }

  async remove(id: number) {
    return this.databaseService.user.delete({
      where: {
        id,
      },
      omit: noPassword,
    });
  }
}
