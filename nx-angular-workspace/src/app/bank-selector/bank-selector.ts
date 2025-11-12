// src/app/bank-selector/bank-selector.component.ts
import {
  Component,
  forwardRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { BankService } from './services/bank.service';
import { Bank } from './models/bank.model';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  merge,
  Observable,
} from 'rxjs';
import { scan, startWith, switchMap, tap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-bank-selector',
  templateUrl: './bank-selector.html',
  styleUrls: ['./bank-selector.scss'],
  imports: [
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BankSelectorComponent),
      multi: true,
    },
  ],
})
export class BankSelectorComponent implements OnInit, ControlValueAccessor {
  private bankService = inject(BankService);

  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  // --- Form Control Implementation Properties ---
  selectedBank: Bank | null = null;
  // Placeholder functions provided by the Forms API
  onChange = (bank: Bank | null) => {
    /* empty */
  };
  onTouched = () => {
    /* empty */
  };
  isDisabled = false;
  // --- End Form Control Implementation Properties ---

  banks: Bank[] = [];
  totalItems = 0;

  // A subject to trigger loading new pages
  // --- Search & Pagination Controls ---
  searchControl = new FormControl<string>(''); // 💡 New: Control for the search input
  private loadNextPage$ = new BehaviorSubject<number>(0);

  // The main observable that drives the data array
  banks$!: Observable<Bank[]>;

  // State variables for loading
  isLoading = false;
  hasMoreData = true;
  currentPage = 0;

  currentSearchTerm = ''; // Stores the active search term

  totalBanksLoaded = 0;

  ngOnInit(): void {
    // 1. Define the stream that triggers a reload/search
    const searchUpdates$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      // ⏱️ Wait 300ms after the user stops typing
      debounceTime(300),
      // 🚫 Only proceed if the search term actually changed
      distinctUntilChanged(),
      // 🔍 Map the new search term to reset the page loading
      tap((term) => {
        this.currentSearchTerm = term || '';
        this.currentPage = 0;
        this.hasMoreData = true;

        // 🚨 Reset Virtual Scroll position when a new search starts
        if (this.viewport) {
          this.viewport.scrollToOffset(0, 'auto');
        }
      }),
    );

    // 2. Combine the search trigger with the manual 'loadNextPage' trigger
    const reloadTrigger$ = merge(
      searchUpdates$,
      this.loadNextPage$.pipe(distinctUntilChanged()),
    );

    // 3. Main Data Pipeline
    this.banks$ = reloadTrigger$.pipe(
      // We need both the current search term and the page number
      // Since the page number is updated via loadNextPage$ subject, we use switchMap
      // and pass the current page and search term to the API call.
      switchMap(() => {
        this.isLoading = true;
        // Call the service with the current page and search term
        return this.bankService.getBanks(
          this.currentPage,
          this.currentSearchTerm,
        );
      }),
      tap(({ chunk, totalCount }) => {
        this.isLoading = false;
        this.totalItems = totalCount;

        // Check if this is the last page for the CURRENT filtered dataset
        if (this.currentPage * 50 + chunk.length >= totalCount) {
          this.hasMoreData = false;
        }
      }),
      // Use scan to either append (if currentPage > 0) or replace (if currentPage == 0, triggered by search)
      scan(
        (accBanks: Bank[], result: { chunk: Bank[]; totalCount: number }) => {
          // If it's the first page (0), or a new search, replace the array
          if (this.currentPage === 0) {
            return result.chunk;
          }
          // Otherwise, append the new chunk
          return [...accBanks, ...result.chunk];
        },
        [] as Bank[],
      ),
      tap((banks: Bank[]) => {
        this.totalBanksLoaded = banks.length;
        console.log('=> banks', banks);
      }),
      startWith([]),
    );
  }

  // Called when the user scrolls near the end of the loaded data
  nextBatch(e: any): void {
    // e: The index of the last rendered item in the viewport
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.measureScrollOffset('bottom');
    console.log(`end = ${end} - total = ${total}`);
    // Load the next page if:
    // 1. The user scrolled near the bottom (e.g., 80% through the scrollable height)
    // 2. We are not currently loading
    // 3. There is potentially more data to load (hasMoreData is true)
    if (
      end > this.totalBanksLoaded - 10 &&
      !this.isLoading &&
      this.hasMoreData
    ) {
      this.loadNextPage$.next(this.currentPage + 1);
    }
  }

  // 💡 New Method: Handles selection from the list
  selectBank(bank: Bank): void {
    if (this.isDisabled) return;
    this.selectedBank = bank;
    // 1. Write the value back to the Angular Form
    this.onChange(bank);
    // 2. Mark the control as touched
    this.onTouched();
  }

  // --- ControlValueAccessor Methods ---

  // 1. Called by Angular Forms when it wants to set a value to the component (e.g., setting an initial value)
  writeValue(obj: Bank | null): void {
    this.selectedBank = obj;
  }

  // 2. Called by Angular Forms to register a function to call when the value changes
  registerOnChange(fn: (bank: Bank | null) => void): void {
    this.onChange = fn;
  }

  // 3. Called by Angular Forms to register a function to call when the control is touched
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // 4. Called by Angular Forms to set the disabled state
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (this.isDisabled) {
      this.searchControl.disable({ emitEvent: false });
    } else {
      this.searchControl.enable({ emitEvent: false });
    }
  }
}
