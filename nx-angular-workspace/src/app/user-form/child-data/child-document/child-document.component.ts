// child-document.component.ts

import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-document',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="documentFormGroup" style="margin-left: 20px;">
      <h5>Documents</h5>
      <label>
        Type:
        <input type="text" formControlName="documentType" />
      </label>
      <label>
        Number:
        <input type="text" formControlName="documentNumber" />
      </label>
    </div>
  `,
  // 🚫 No more viewProviders
})
export class ChildDocumentComponent {
  // Input property to receive the specific FormGroup for documents
  @Input() documentFormGroup!: FormGroup;
}
