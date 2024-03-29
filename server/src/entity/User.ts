import { Entity, PrimaryColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import Operation from './Operation';
import Chart from './Chart';

@Entity()
export default class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  nickname!: string;

  @Column()
  password!: string;

  @ManyToMany(() => Operation, (operation) => operation.users)
  operations: Operation[] | undefined;

  @OneToMany(() => Chart, (chart) => chart.user)
  charts: Chart[] | undefined;
}
