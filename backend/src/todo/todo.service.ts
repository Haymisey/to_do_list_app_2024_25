import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  // Fetch all todos
  findAll() {
    return this.todoRepository.find();
  }

  // Fetch a single todo by ID
  findOne(id: number) {
    return this.todoRepository.findOne({ where: { id } });
  }

  // Create a new todo
  create(createTodoDto: CreateTodoDto) {
    const newTodo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(newTodo);
  }

  // Update an existing todo by ID
  async update(id: number, createTodoDto: CreateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      return { message: 'Todo not found' };
    }
    Object.assign(todo, createTodoDto);
    return this.todoRepository.save(todo);
  }

  // Remove a todo by ID
  async remove(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      return { message: 'Todo not found' };
    }
    await this.todoRepository.remove(todo);
    return todo;
  }
  //search
  async search(query: string) {
    return this.todoRepository.find({ where: { title: Like(`%${query}%`) } });
  }
}
