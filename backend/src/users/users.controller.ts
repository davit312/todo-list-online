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
// import { AuthGuard } from 'src/auth/auth.guard';
// import type { RequestWithUser } from 'src/auth/constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('/currentuser')
  getCurrentuser(@Req() request: RequestWithCurrentUser) {
    const { sub, fullname, email } = request.loggedInUser;
    return { sub, fullname, email };
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
