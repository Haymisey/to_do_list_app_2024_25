import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsOptional()  // Marking as optional in case it's not always provided
  @IsDateString()  // Validates that dueDate is a valid date string
  dueDate: string;  // Store the date as a string in ISO format (e.g., "2025-01-12")
}

