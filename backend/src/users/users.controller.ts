import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  // Patch,
  // Param,
  // Delete,
  // UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from 'generated/prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import type { RequestWithCurrentUser } from 'src/auth/constants';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async create(@Body() createUserDto: Prisma.UserCreateInput) {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      password: _,
      ...user
    } = await this.usersService.create(createUserDto);
    const token = await this.jwtService.signAsync(user);

    return {
      user: user,
      access_token: token,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/currentuser')
  getCurrentuser(@Req() request: RequestWithCurrentUser) {
    const { id, fullname, email } = request.loggedInUser;
    return { id, fullname, email };
  }
  /*
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request: RequestWithUser) {
    console.log(request.loggedInUser);
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
  */
}
