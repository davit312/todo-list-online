import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from 'generated/prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async Login(@Body() creds: { email: string; password: string }) {
    const user = this.usersService.findByEmail(creds.email);

    return user.then((u) => {
      if (!u?.id) {
        return { error: 'User not found' };
      }

      const { password, ...user } = u;

      if (password !== creds.password) {
        return { error: 'Wrong credentials' };
      }
      return user;
    });
  }

  // TODO secure this route or remove
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // TODO secure this route or remove
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // TODO secure this route or remove
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  // TODO secure this route or remove
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
