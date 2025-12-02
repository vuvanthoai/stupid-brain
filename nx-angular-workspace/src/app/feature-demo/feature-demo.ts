import { Component, effect, inject } from '@angular/core';
import { DynamicTable } from './components/dynamic-table/dynamic-table';
import { DataStore } from './services/data.store';
import { UserHttp } from './services/user.http';
import { BillHttp } from './services/bill.http';
import { ProductHttp } from './services/product.http';
import { TABLE_SERVICE } from './models/feature-demo.models';
import { ServiceRegistry } from './service-stratery/service.registry';
import { ValueSelector } from './components/value-selector/value-selector';
import { DynamicProxyService } from './service-stratery/dynamic.proxy.service';

@Component({
  selector: 'app-feature-demo',
  imports: [DynamicTable, ValueSelector],
  providers: [
    DataStore,
    UserHttp,
    BillHttp,
    ProductHttp,
    ServiceRegistry,
    {
      provide: TABLE_SERVICE,
      useFactory: (registry: ServiceRegistry) => {
        console.log('=> TABLE_SERVICE registry', registry);
        return new DynamicProxyService(registry);
      },
      deps: [ServiceRegistry], // Dependencies for the factory
    },
  ],
  templateUrl: './feature-demo.html',
  styleUrl: './feature-demo.scss',
})
export class FeatureDemo {
  private dataStore = inject(DataStore);
  private registry = inject(ServiceRegistry);

  constructor() {
    effect(() => {
      const selectedValue = this.dataStore.selectedValue$();
      console.log('selectedValue = ', selectedValue);
      this.registry.switchService(selectedValue);
    });
  }
}
