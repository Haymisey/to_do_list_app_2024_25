import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
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
  userId: number; 

  @Column({ type: 'date', nullable: true }) 
  dueDate: string;
}
