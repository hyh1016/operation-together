import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';
import Operation from './Operation';

@Entity()
export default class Chart {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  checkedDate!: string;

  @ManyToOne(() => User, (user) => user.charts, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Operation, (operation) => operation.charts, {
    onDelete: 'CASCADE',
  })
  operation!: Operation;
}
