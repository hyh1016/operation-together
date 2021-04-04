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

  @Column({ type: 'varchar', default: '' })
  code: string | undefined;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column()
  color!: string;

  @Column()
  adminId!: string;

  @ManyToMany((type) => User, (role) => role.operations)
  @JoinTable()
  users: User[] | undefined;

  @OneToMany(() => Chart, (chart) => chart.operation)
  charts: Chart[] | undefined;
}
