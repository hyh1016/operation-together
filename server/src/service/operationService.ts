import { Repository } from 'typeorm';
import Operation from '@/entity/Operation';
import User from '@/entity/User';
import container from '@/container';

export interface OperationForm {
  title: string;
  code: string;
  startDate: string;
  endDate: string;
  color: string;
  adminId?: string;
}

export interface JoinForm {
  id: number;
  code?: string;
}

export default class OperationService {
  constructor(private operationRepository: Repository<Operation>) {}

  async createOperation(
    user: User,
    info: OperationForm,
  ): Promise<Operation | undefined> {
    if (
      Object.entries(info).filter(([key, value]) => key !== 'code' && !value)
        .length > 0
    )
      return undefined;
    try {
      const newOperation = this.operationRepository.create({
        ...info,
        adminId: user.id,
      });
      if (!newOperation) return undefined;
      newOperation.users = [user];
      await this.operationRepository.save(newOperation);
      return newOperation;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async getOperationById(id: number): Promise<Operation | undefined> {
    if (!id) return undefined;
    try {
      const operation = await this.operationRepository
        .createQueryBuilder('operation')
        .where('operation.id = :id', { id })
        .leftJoin('operation.users', 'users')
        .addSelect(['users.id', 'users.nickname'])
        .getOne();
      if (!operation) return undefined;
      return operation;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async updateOperation(id: number, info: OperationForm): Promise<boolean> {
    if (
      Object.entries(info).filter(([key, value]) => key !== 'code' && !value)
        .length > 0
    )
      return false;
    try {
      await this.operationRepository.update({ id }, info);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteOperation(id: number): Promise<boolean> {
    if (!id) return false;
    try {
      await this.operationRepository.delete({ id });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async isAdminUser(userId: string, operationId: number): Promise<boolean> {
    try {
      const operation = await this.operationRepository.findOne({
        id: operationId,
      });
      if (!operation) return false;
      if (userId !== operation.adminId) return false;
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }

  async isJoinedUser(userId: string, operationId: number): Promise<boolean> {
    try {
      const operation = await this.operationRepository.findOne(
        {
          id: operationId,
        },
        { relations: ['users'] },
      );
      if (!operation) return false;
      if (operation.users?.filter((v) => v.id === userId).length === 0)
        return false;
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }

  async joinOperation(
    user: User,
    info: JoinForm,
  ): Promise<Operation | undefined> {
    try {
      const operation = await this.operationRepository.findOne({
        where: info,
        relations: ['users'],
      });
      if (!operation) return undefined;
      operation.users?.push(user);
      await this.operationRepository.save(operation);
      return operation;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async leaveOperation(userId: string, operationId: number): Promise<boolean> {
    try {
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
      await container.getChartService().leaveOperation(userId, operationId);
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
}
