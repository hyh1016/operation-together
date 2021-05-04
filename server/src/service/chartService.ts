import { Repository } from 'typeorm';
import Chart from '@/entity/Chart';
import getToday from '@/util/getToday';
import Container from '@/container';

export interface ChartData {
  id: string;
  nickname: string;
}

export class ChartService {
  constructor(private chartRepository: Repository<Chart>) {}

  async createChart(userId: string, operationId: number): Promise<boolean> {
    if (!userId || !operationId) return false;
    if (await this.isCheckedUser(userId, operationId)) return false;
    try {
      const newChart = new Chart();
      const user = await Container.getUserService().getUser(userId);
      const operation = await Container.getOperationService().getOperationById(
        operationId,
      );
      if (!user || !operation) return false;
      newChart.checkedDate = getToday();
      newChart.user = user;
      newChart.operation = operation;
      await this.chartRepository.save(newChart);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCheckedUsers(
    operationId: number,
    checkedDate: string,
  ): Promise<ChartData[] | undefined> {
    if (!checkedDate || !operationId) return undefined;
    try {
      const charts = await this.chartRepository
        .createQueryBuilder('chart')
        .leftJoin('chart.user', 'user')
        .leftJoin('chart.operation', 'operation')
        .addSelect(['user.nickname', 'user.id'])
        .where(
          'operation.id= :operationId and chart.checkedDate= :checkedDate',
          {
            operationId,
            checkedDate,
          },
        )
        .orderBy('chart.id')
        .getMany();
      return charts.map((v) => v.user);
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async isCheckedUser(userId: string, operationId: number): Promise<boolean> {
    try {
      const chart = await this.chartRepository
        .createQueryBuilder('chart')
        .leftJoin('chart.user', 'user')
        .leftJoin('chart.operation', 'operation')
        .where(
          'chart.userId= :userId and operation.id= :operationId and chart.checkedDate= :checkedDate',
          {
            userId,
            operationId,
            checkedDate: getToday(),
          },
        )
        .getOne();
      if (!chart) return false;
      return true;
    } catch (error) {
      console.error(error);
      return true;
    }
  }

  async leaveOperation(userId: string, operationId: number): Promise<boolean> {
    try {
      const deletedResult = await this.chartRepository
        .createQueryBuilder('chart')
        .leftJoin('chart.user', 'user')
        .leftJoin('chart.operation', 'operation')
        .delete()
        .where('chart.userId= :userId and operation.id= :operationId', {
          userId,
          operationId,
        })
        .execute();
      if (!deletedResult) return false;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
