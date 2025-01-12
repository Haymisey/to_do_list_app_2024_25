import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto'; // Import CreateUserDto

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET request to retrieve all users or a specific user
  @Get()
  async findAll() {
    return this.userService.findAll(); // You will need to implement this method in your UserService
  }

  // GET request to retrieve a user by ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userService.findOne(id); // You will need to implement this method in your UserService
  }

  // POST request to create a new user
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto); // You will need to implement this method in your UserService
  }

  // PUT request to update user details by ID
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    console.log('Request received with id:', id); // Check if the request is being received correctly
    return this.userService.update(id, updateUserDto);
  }

  // DELETE request to remove a user by ID
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userService.remove(id); // You will need to implement this method in your UserService
  }
}
