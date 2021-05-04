import { UserService } from '@/service/UserService';
import { OperationService } from '@/service/operationService';
import { ChartService } from '@/service/chartService';

class Container {
  container: Map<string, any>;
  constructor() {
    this.container = new Map();
  }

  setInstance(key: string, value: any) {
    this.container.set(key, value);
  }

  getUserService(): UserService {
    return this.container.get('UserService');
  }

  getOperationService(): OperationService {
    return this.container.get('OperationService');
  }

  getChartService(): ChartService {
    return this.container.get('ChartService');
  }
}

export default new Container();
