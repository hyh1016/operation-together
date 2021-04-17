import { Repository } from 'typeorm';
import Chart from '@/entity/Chart';
import getToday from '@/util/getToday';
import Container from '@/container';

type ChartData = Map<string, string[]>;

export default class ChartService {
  constructor(private chartRepository: Repository<Chart>) {}

  async createChart(userId: string, operationId: number): Promise<boolean> {
    if (!userId || !operationId) return false;
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
  ): Promise<string[] | undefined> {
    if (!checkedDate || !operationId) return undefined;
    try {
      const charts = await this.chartRepository
        .createQueryBuilder('chart')
        .leftJoin('chart.user', 'user')
        .leftJoin('chart.operation', 'operation')
        .addSelect(['user.nickname'])
        .where(
          'chart.checkedDate= :checkedDate and operation.id= :operationId',
          {
            checkedDate,
            operationId,
          },
        )
        .orderBy('chart.id')
        .getMany();
      return charts.map((chart) => chart.user.nickname);
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
