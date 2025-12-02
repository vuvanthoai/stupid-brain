// service-registry.ts
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableService } from '../models/feature-demo.models';
import { UserHttp } from '../services/user.http';
import { ProductHttp } from '../services/product.http';
import { BillHttp } from '../services/bill.http';

@Injectable()
export class ServiceRegistry {
  private userHttp = inject(UserHttp);
  private productHttp = inject(ProductHttp);
  private billHttp = inject(BillHttp);

  // Holds the current active service
  private activeServiceSubject = new BehaviorSubject<TableService>(
    this.userHttp,
  );

  // Observable for the table to listen to
  activeService$ = this.activeServiceSubject.asObservable();

  // The dropdown calls this
  switchService(type: string) {
    this.activeServiceSubject.next(this.getService(type));
  }

  // Helper to get current value snapshot
  getCurrentService(): TableService {
    return this.activeServiceSubject.value;
  }

  private getService(selectedValue: string): TableService {
    switch (selectedValue) {
      case 'user':
        return this.userHttp;
      case 'bill':
        return this.billHttp;
      case 'product':
        return this.productHttp;
    }
    return this.userHttp;
  }
}
