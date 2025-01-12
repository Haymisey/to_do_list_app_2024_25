import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, // Injecting the User repository
  ) {}

  // 1. Get all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find(); // Fetch all users
  }

  // 2. Get a single user by ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id }, // Use the where condition for searching by id
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`); // If user is not found, throw an exception
    }
    return user;
  }
  

  // 3. Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto); // Create a new user using the DTO
    return await this.userRepository.save(user); // Save the user to the database
  }

  // 4. Update an existing user by ID
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id }, // Correctly specify the search criteria
    });
    
    if (!user) {
      throw new Error('User not found');
    }

    // Apply the updates to the user
    return this.userRepository.save({ ...user, ...updateUserDto });
  }


  // 5. Delete a user by ID
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id); // Find the user by ID
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.remove(user); // Delete the user from the database
  }
}
