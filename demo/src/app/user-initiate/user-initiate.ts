import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ChildInformation } from './components/child-information/child-information';

// Custom validator function (Parent-side)
// Example: Always return an error if the age is set, but the name is 'admin'
function ChildNameIsAdminValidator(
  control: AbstractControl
): ValidationErrors | null {
  // Check the value object reported by the CVA
  const value = control.value;
  console.log('=>>>>>>>>>>>>>>> ChildNameIsAdminValidator,', control, value);
  console.log(
    '=> normal user condition = ',
    !!value && value.name?.toLowerCase() === 'user' && !!value.age
  );
  if (!!value && value.name?.toLowerCase() === 'admin' && !!value.age) {
    // This error comes directly from the parent, not the child's internal validation
    return { childNameInvalid: true };
  }
  if (!!value && value.name?.toLowerCase() === 'user' && !!value.age) {
    // This error comes directly from the parent, not the child's internal validation
    return { childIsNormalUser: true };
  }
  return null;
}

@Component({
  selector: 'app-user-initiate',
  imports: [ReactiveFormsModule, JsonPipe, ChildInformation],
  templateUrl: './user-initiate.html',
})
export class UserInitiate implements OnInit {
  private fb = inject(FormBuilder);

  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      featureName: ['', Validators.required],
      userDetailsArray: this.fb.array([this.createUserDetailsControl()]),
    });
  }

  createUserDetailsControl(): FormControl {
    return this.fb.control({}, [
      Validators.required,
      ChildNameIsAdminValidator,
    ]);
  }

  get userDetailsArray(): FormArray {
    return this.userForm.get('userDetailsArray') as FormArray;
  }

  addUserDetail(): void {
    this.userDetailsArray.push(this.createUserDetailsControl());
  }

  removeUserDetail(index: number): void {
    this.userDetailsArray.removeAt(index);
  }

  onSubmit(): void {
    console.log('Form Submitted:', this.userForm.value);
  }
}
