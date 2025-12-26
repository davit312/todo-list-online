import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { TodoUpdateInput } from 'generated/prisma/models';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TodoService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTodoDto: Prisma.TodoCreateInput) {
    return this.databaseService.todo.create({ data: createTodoDto });
  }

  findUserTodos(userId: number) {
    return this.databaseService.todo.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.databaseService.todo.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateTodoDto: TodoUpdateInput) {
    return this.databaseService.todo.update({
      data: updateTodoDto,
      where: {
        id,
      },
    });
  }

  remove(id: number, userId: number) {
    console.log(id, userId);
    return this.databaseService.todo.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
