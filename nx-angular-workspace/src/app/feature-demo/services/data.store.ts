import { Injectable, signal } from '@angular/core';

@Injectable()
export class DataStore {
  selectedValue$ = signal<string | undefined>(undefined);
}
