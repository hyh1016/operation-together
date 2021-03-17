import { Repository } from 'typeorm';
import Operation from '@/entity/Operation';
import User from '@/entity/User';

interface OperationForm {
  title: string;
  startDate: Date;
  endDate: Date;
  color: string;
}

export default class OperationService {
  constructor(private operationRepository: Repository<Operation>) {}

  async createOperation(user: User, info: OperationForm): Promise<number> {
    const newOperation = this.operationRepository.create({
      ...info,
      adminId: user.id,
    });
    newOperation.users = [user];
    await this.operationRepository.save(newOperation);
    return newOperation.id;
  }

  async getOperations(user: User): Promise<Operation[]> {
    // TODO: column을 선택적으로 불러와야 함
    const operations = await this.operationRepository.find({
      relations: ['users'],
      where: { adminId: user.id },
    });
    return operations;
  }
}
