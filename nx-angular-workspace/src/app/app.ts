import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BankSelectorComponent } from './bank-selector/bank-selector';
import { JsonPipe } from '@angular/common';
import { Bank } from './bank-selector/models/bank.model';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="paymentForm">
      <h3>Select Your Bank:</h3>
      <app-bank-selector formControlName="bankSelection"></app-bank-selector>

      <p style="margin-top: 20px;">Form Status: {{ paymentForm.status }}</p>
      <p>
        Value: <code>{{ paymentForm.value | json }}</code>
      </p>
      <button
        (click)="disableControl()"
        [disabled]="paymentForm.get('bankSelection')?.disabled"
      >
        Disable Selector
      </button>
    </form>
  `,
  imports: [ReactiveFormsModule, BankSelectorComponent, JsonPipe],
})
export class AppComponent implements OnInit {
  paymentForm!: FormGroup;

  ngOnInit() {
    this.paymentForm = new FormGroup({
      // The Bank object will be stored here
      bankSelection: new FormControl<Bank | null>(null, Validators.required),
    });

    // You can set initial values like this:
    this.paymentForm.get('bankSelection')?.setValue({
      id: 10,
      name: 'Bank of Angular 10',
      code: 'BA10',
    });
  }

  disableControl() {
    this.paymentForm.get('bankSelection')?.disable();
  }
}
