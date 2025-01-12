import { Role } from '../entities/role.entity';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string; // This should be hashed in production
  roles: Role[];
}
