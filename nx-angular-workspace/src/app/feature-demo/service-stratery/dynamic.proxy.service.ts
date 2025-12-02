import { Observable } from 'rxjs';
import { TableData, TableService } from '../models/feature-demo.models';
import { ServiceRegistry } from './service.registry';

export class DynamicProxyService implements TableService {
  constructor(private registry: ServiceRegistry) {}

  getData() {
    // Forward the call to whatever is currently active
    return this.registry.getCurrentService().getData();
  }

  deleteItem(id: number) {
    return this.registry.getCurrentService().deleteItem(id);
  }

  updateItem: (item: TableData) => Observable<void>;
}
