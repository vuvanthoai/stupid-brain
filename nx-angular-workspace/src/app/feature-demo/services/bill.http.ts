import { inject, Injectable } from '@angular/core';
import { TableData, TableService } from '../models/feature-demo.models';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class BillHttp implements TableService {
  http = inject(HttpClient);

  getData(): Observable<TableData[]> {
    return this.http.get<TableData[]>('/api/bills').pipe(
      catchError(() =>
        of([
          {
            id: 1,
            name: 'bill-1',
            status: 'fail',
          },
        ] as TableData[]),
      ),
    );
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`/api/bills/${id}`);
  }

  updateItem(item: TableData): Observable<void> {
    console.log('=> update item = ', item);
    return of(void 0);
  }
}
