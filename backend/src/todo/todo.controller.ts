import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // Method to fetch all todos
  @Get()
  async findAll() {
    return this.todoService.findAll();
  }

  // Method to fetch a specific todo by ID
  @Get('search') async search(@Query('query') query: string) {
    return this.todoService.search(query);
  }
  @Get(':id') async findOne(@Param('id') id: number) {
    return this.todoService.findOne(id);
  }

  // Method to create a new todo
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  // Method to update a todo by ID
  @Put(':id')
  async update(@Param('id') id: number, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.update(id, createTodoDto);
  }

  // Method to delete a todo by ID
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.todoService.remove(id);
  }
}
