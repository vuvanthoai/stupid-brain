// user-form.component.ts

import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChildDataComponent } from './child-data/child-data.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ChildDataComponent],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      children: this.fb.array([this.createChildFormGroup()]), // Initialize with one child
    });
  }

  // Getter for easy access to the FormArray
  get childrenArray(): FormArray {
    return this.userForm.get('children') as FormArray;
  }

  // Method to create a new FormGroup for a child
  private createChildFormGroup(): FormGroup {
    return this.fb.group({
      // The child-data component will bind to this FormGroup
      childData: this.fb.group({
        // These groups correspond to ChildInfoComponent and ChildDocumentComponent
        childInfo: this.fb.group({
          firstName: ['', Validators.required],
          age: [null, [Validators.min(0), Validators.max(18)]],
        }),
        childDocument: this.fb.group({
          documentType: [''],
          documentNumber: [''],
        }),
      }),
    });
  }

  addChild(): void {
    this.childrenArray.push(this.createChildFormGroup());
  }

  removeChild(index: number): void {
    this.childrenArray.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.userForm.value);
  }
}
