import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';
import Chart from './Chart';

@Entity()
export default class Operation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column()
  color!: string;

  @Column()
  adminId!: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[] | undefined;

  @OneToMany(() => Chart, (chart) => chart.operation)
  charts: Chart[] | undefined;
}
