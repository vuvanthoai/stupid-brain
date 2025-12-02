import { inject, Injectable } from '@angular/core';
import { TableData, TableService } from '../models/feature-demo.models';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class UserHttp implements TableService {
  http = inject(HttpClient);

  getData(): Observable<TableData[]> {
    return this.http.get<TableData[]>('/api/users').pipe(
      catchError(() =>
        of([
          {
            id: 1,
            name: 'user-1',
            status: 'success',
          },
        ] as TableData[]),
      ),
    );
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`/api/users/${id}`);
  }

  updateItem(item: TableData): Observable<void> {
    console.log('=> update item = ', item);
    return of(void 0);
  }
}
