// src/app/services/bank.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bank, PAGE_SIZE } from '../models/bank.model';

@Injectable({ providedIn: 'root' })
export class BankService {
  private http = inject(HttpClient);

  private apiUrl = 'api/banks'; // Replace with your actual API endpoint
  private pageSize = PAGE_SIZE;

  private allBanks: Bank[] = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `Bank of Angular ${i + 1}`,
    code: `BA${i + 1}`,
  }));

  // Simulates an API call to get a chunk of data
  getBanks(
    page: number,
    searchTerm = '',
  ): Observable<{ chunk: Bank[]; totalCount: number }> {
    const offset = page * this.pageSize;

    // 1. Apply Search Filter (Simulating Server-Side Filtering)
    const filteredBanks = this.allBanks.filter((bank) =>
      bank.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // 2. Get the Total Count of Filtered items (Crucial for Virtual Scroll)
    const totalCount = filteredBanks.length;

    // 3. Apply Pagination (Simulating Server-Side Pagination)
    const chunk = filteredBanks.slice(offset, offset + this.pageSize);

    // Return the paginated chunk and the total count
    return new Observable((observer) => {
      setTimeout(() => {
        // Simulate network delay
        observer.next({ chunk, totalCount });
        observer.complete();
      }, 300); // Shorter debounce for search responsiveness
    }) as Observable<{ chunk: Bank[]; totalCount: number }>;

    // In a real app, your API would return this structure directly:
    // return this.http.get<{ chunk: Bank[], totalCount: number }>(
    //     `${this.apiUrl}?limit=${this.pageSize}&offset=${offset}&search=${searchTerm}`
    // );
  }

  getTotalBankCount(): Observable<number> {
    // In a real application, the API would provide the total count.
    return new Observable((observer) => {
      observer.next(101); // 1000 total items for mock data
      observer.complete();
    });
  }
}
