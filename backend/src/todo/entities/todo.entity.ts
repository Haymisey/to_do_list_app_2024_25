import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity'; // Import User entity

@Entity('todos') // Add table name for clarity
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  userId: number; // The userId will be stored as a foreign key in the database
  @Column({ type: 'date', nullable: true }) // Add the dueDate field to store the date
  dueDate: string; // You can use Date if you want to store full Date objects, or 'string' for simple date strings
}
