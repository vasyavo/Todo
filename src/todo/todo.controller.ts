import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TodoService } from '@todo/todo.service';
import { Todo } from '@todo/todo.entity';
import { TodoDto } from '@todo/dto/todo.dto';
import { User } from '@user/user.entity';
import { GetCurrentUser } from '@user/decorators/get-current-user.decorator';
@ApiTags('Todo')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('todos')
export class TodoController {
  @ApiOperation({ description: 'Get todo list by user id' })
  @ApiOkResponse({ type: [Todo], description: 'Todo list' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  @Get()
  getTodoListByUserId(@GetCurrentUser() user: User): Promise<Todo[]> {
    return this.todoService.getTodoListByUserId(user.id);
  }
  constructor(private readonly todoService: TodoService) {}
  @ApiOperation({ description: 'Create todo item' })
  @ApiCreatedResponse({ type: Todo, description: 'New todo item' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createTodo(
    @Body() todoDto: TodoDto,
    @GetCurrentUser() user: User,
  ): Promise<Todo> {
    return this.todoService.create(todoDto, user);
  }
  @ApiOperation({ description: 'Mark todo item as done' })
  @ApiOkResponse({
    type: Todo,
    description: 'Todo item that was marked as done',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({
    description: 'Todo item with id "${id}" is not found',
  })
  @HttpCode(HttpStatus.OK)
  @Patch('/:id/done')
  markTodoItemAsDone(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.markTodoItemAsDone(id);
  }
  @ApiOperation({ description: 'Delete todo item by id' })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({
    description: 'Todo item with id "${id}" is not found',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteTodoById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.delete(id);
  }
}
