import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';
import Operation from './Operation';

@Entity()
export default class Chart {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  checkedDate!: Date;

  @ManyToOne(() => User, (user) => user.charts)
  user!: User;

  @ManyToOne(() => Operation, (operation) => operation.charts)
  operation!: Operation;
}
