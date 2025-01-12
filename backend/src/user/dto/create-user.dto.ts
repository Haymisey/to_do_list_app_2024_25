// create-user.dto.ts
export class CreateUserDto {
    username: string;
    email: string;
    password: string;
    role: string; // If you want to assign a role to the user
  }
  