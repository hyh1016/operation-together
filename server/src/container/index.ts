import OperationService from '@/service/operationService';
import UserService from '@/service/UserService';

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
}

export default new Container();
