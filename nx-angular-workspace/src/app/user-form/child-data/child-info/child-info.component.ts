// child-info.component.ts

import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="infoFormGroup" style="margin-left: 20px;">
      <h5>Personal Info</h5>
      <label>
        First Name:
        <input type="text" formControlName="firstName" />
      </label>
      <label>
        Age:
        <input type="number" formControlName="age" />
      </label>
    </div>
  `,
  // 🚫 No more viewProviders
})
export class ChildInfoComponent {
  // Input property to receive the specific FormGroup for info
  @Input() infoFormGroup!: FormGroup;
}
