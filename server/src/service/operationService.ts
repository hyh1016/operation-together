import { Repository } from 'typeorm';
import Operation from '@/entity/Operation';
import User from '@/entity/User';

interface OperationForm {
  title: string;
  password?: string;
  startDate: Date;
  endDate: Date;
  color: string;
  adminId?: string;
}

interface JoinForm {
  id: number;
  password?: string;
}

export default class OperationService {
  constructor(private operationRepository: Repository<Operation>) {}

  async createOperation(
    user: User,
    info: OperationForm,
  ): Promise<number | undefined> {
    if (Object.values(info).filter((v) => !v).length > 0) return undefined;
    const newOperation = this.operationRepository.create({
      ...info,
      adminId: user.id,
    });
    if (!newOperation) return undefined;
    newOperation.users = [user];
    await this.operationRepository.save(newOperation);
    return newOperation.id;
  }

  async getOperations(user: User): Promise<Operation[]> {
    const operations = await this.operationRepository
      .createQueryBuilder('operation')
      .where('operation.adminId = :id', { id: user.id })
      .leftJoin('operation.users', 'users')
      .addSelect(['users.id', 'users.nickname'])
      .getMany();
    return operations;
  }

  async getOperationById(id: number): Promise<Operation | undefined> {
    if (!id) return undefined;
    const operation = await this.operationRepository
      .createQueryBuilder('operation')
      .where('operation.id = :id', { id })
      .leftJoin('operation.users', 'users')
      .addSelect(['users.id', 'users.nickname'])
      .getOne();
    if (!operation) return undefined;
    return operation;
  }

  async updateOperation(id: number, info: OperationForm): Promise<boolean> {
    if (Object.values(info).filter((v) => !v).length > 0) return false;
    try {
      await this.operationRepository.update({ id }, { ...info });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async deleteOperation(id: number): Promise<boolean> {
    if (!id) return false;
    try {
      await this.operationRepository.delete({ id });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async isAdminUser(userId: string, operationId: number): Promise<boolean> {
    const operation = await this.operationRepository.findOne({
      id: operationId,
    });
    if (!operation) return false;
    if (userId !== operation.adminId) return false;
    return true;
  }

  async isValidUser(userId: string, operationId: number): Promise<boolean> {
    const operation = await this.operationRepository.findOne(
      {
        id: operationId,
      },
      { relations: ['users'] },
    );
    if (!operation) return false;
    if (operation.users?.filter((v) => v.id === userId).length === 0)
      return false;
    return true;
  }

  async joinOperation(user: User, info: JoinForm): Promise<boolean> {
    const operation = await this.operationRepository.findOne({
      where: info,
      relations: ['users'],
    });
    if (!operation) return false;
    operation.users?.push(user);
    await this.operationRepository.save(operation);
    return true;
  }

  async leaveOperation(userId: string, operationId: number): Promise<boolean> {
    const operation = await this.operationRepository.findOne({
      where: { id: operationId },
      relations: ['users'],
    });
    if (!operation) return false;
    operation.users = operation.users?.filter((v) => v.id !== userId);
    if (operation.users?.length === 0) {
      this.deleteOperation(operationId);
      return true;
    }
    await this.operationRepository.save(operation);
    return true;
  }
}
