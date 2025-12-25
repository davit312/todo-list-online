import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Prisma } from 'generated/prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import type { RequestWithCurrentUser } from 'src/auth/constants';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTodoDto: Prisma.TodoCreateInput) {
    return this.todoService.create(createTodoDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findUserTodos(@Req() request: RequestWithCurrentUser) {
    return this.todoService.findUserTodos(+request.loggedInUser.id!);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: Prisma.TodoUpdateInput,
  ) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
