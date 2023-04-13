import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '@todo/todo.entity';
import { TodoDto } from '@todo/dto/todo.dto';
import { User } from '@user/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}
  async getTodoListByUserId(userId: number): Promise<Todo[]> {
    return this.todoRepository.findBy({ userId });
  }
  async markTodoItemAsDone(id: number): Promise<Todo> {
    const todo = await this.todoRepository.update({ id }, { done: true });

    if (todo.affected === 0) {
      throw new NotFoundException(`Todo item with id "${id}" is not found`);
    }

    return this.todoRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }
  async create(todoData: TodoDto, user: User): Promise<Todo> {
    const newTodo: Todo = this.todoRepository.create({
      ...todoData,
      user,
    });

    await this.todoRepository.save(newTodo);
    return newTodo;
  }
  async delete(id: number): Promise<void> {
    const todo = await this.todoRepository.delete(id);

    if (todo.affected === 0) {
      throw new NotFoundException(`Todo item with id "${id}" is not found`);
    }
  }
}
