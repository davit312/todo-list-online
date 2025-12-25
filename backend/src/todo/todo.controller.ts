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
import { TodoCreateInput } from 'generated/prisma/models';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() request: RequestWithCurrentUser) {
    const newTodo = {
      ...(request.body as TodoCreateInput),
      userId: request.loggedInUser.id,
    };

    return this.todoService.create(newTodo as TodoCreateInput);
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
  remove(@Param('id') id: string, @Req() request: RequestWithCurrentUser) {
    if (request.loggedInUser.id) {
      const userId: number = request.loggedInUser.id;
      return this.todoService.remove(+id, userId);
    }
    throw new Error('Error while creating new todo');
  }
}
