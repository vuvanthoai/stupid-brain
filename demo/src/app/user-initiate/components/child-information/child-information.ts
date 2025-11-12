import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { UserDetails } from '../../models/user-initiate.models';
import { Subscription } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-child-information',
  imports: [ReactiveFormsModule, JsonPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChildInformation),
      multi: true, // Allows multiple CVA services to be registered
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChildInformation),
      multi: true, // Allows multiple validators to be registered
    },
  ],
  templateUrl: './child-information.html',
})
export class ChildInformation
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    age: new FormControl(null, [Validators.required, Validators.min(1)]),
  });

  isDisabled = false;
  valueChangesSubscription!: Subscription;

  // CVA required functions
  private onChange = (value: UserDetails | null) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.valueChangesSubscription = this.form.valueChanges.subscribe(
      (value) => {
        this.onChange(value);
      }
    );
  }

  // 1. Called by Forms API to set initial/programmatic value
  writeValue(obj: UserDetails | null): void {
    if (obj) {
      // Patch the internal form with the value from the parent
      this.form.patchValue(obj, { emitEvent: false });
    }
  }

  // 2. Registers a callback function (fn) to call when the value changes
  registerOnChange(fn: (value: UserDetails | null) => void): void {
    this.onChange = fn;
  }

  // 3. Registers a callback function (fn) to call when the control is touched
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // 4. Called by Forms API to set the disabled state
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isDisabled ? this.form.disable() : this.form.enable();
  }

  // 1. Child Component Internal Name Control Error Reporting
  getNameControlErrors(): ValidationErrors | null {
    const control = this.form.get('name');
    return control?.invalid && (control?.dirty || control?.touched)
      ? control.errors
      : null;
  }

  // 2. Implementation of the Validator interface (Parent reads this)
  validate(control: AbstractControl): ValidationErrors | null {
    // Report the internal form's validation status to the parent control
    // If the internal form is invalid, return the errors.
    // If the parent wants to set its own specific error, it can do so.
    console.log('=> control.errors = ', control.errors);
    const nameControl = this.form.get('name');
    if (control.errors && Object.keys(control.errors).length > 0) {
      nameControl.setErrors(control.errors, { emitEvent: false });
    }
    return this.form.valid ? null : control.errors;
  }

  // 3. Optional: Register a function to call when the validation status changes
  registerOnValidatorChange(fn: () => void): void {
    // Notify the parent form when the child's internal form validation changes
    this.form.statusChanges.subscribe(fn);
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription.unsubscribe();
  }
}
