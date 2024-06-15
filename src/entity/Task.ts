import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @Column({
    type: 'time',
    nullable: true,
  })
  hour: string;

  @CreateDateColumn({
    default: Date.now()
  })
  created_at: Date;

  @UpdateDateColumn({
    default: Date.now()
  })
  updated_at: Date;
}
