import { Component, inject } from '@angular/core';
import { DataStore } from '../../services/data.store';

@Component({
  selector: 'app-value-selector',
  imports: [],
  templateUrl: './value-selector.html',
  styleUrl: './value-selector.scss',
})
export class ValueSelector {
  dataStore = inject(DataStore);

  changeValue(event: EventTarget) {
    this.dataStore.selectedValue$.set((event as HTMLInputElement).value);
  }
}
