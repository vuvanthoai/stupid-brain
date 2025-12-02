import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export interface TableData {
  id: number;
  name: string;
  status: string;
}

export interface TableService {
  getData: () => Observable<TableData[]>;
  deleteItem: (id: number) => Observable<void>;
  updateItem: (item: TableData) => Observable<void>;
}

export const TABLE_SERVICE = new InjectionToken<TableService>('TABLE_SERVICE');
