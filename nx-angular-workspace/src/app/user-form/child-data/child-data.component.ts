// child-data.component.ts

import { Component, computed, inject, input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChildInfoComponent } from './child-info/child-info.component';
import { ChildDocumentComponent } from './child-document/child-document.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-child-data',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChildInfoComponent,
    ChildDocumentComponent,
  ],
  providers: [UserService],
  template: `
    <h5>Hello child data {{ name$() }}</h5>
    <div [formGroup]="formGroup()">
      <app-child-info [infoFormGroup]="childInfoGroup"></app-child-info>
      <app-child-document
        [documentFormGroup]="childDocumentGroup"
      ></app-child-document>
      <button type="button" (click)="updateName()">
        Update name in service
      </button>
    </div>
  `,
  // 🚫 No more viewProviders
})
export class ChildDataComponent implements OnInit {
  userService = inject(UserService);

  // Input property to receive the FormGroup from the parent FormArray loop
  childFormGroup = input.required<AbstractControl>();
  index = input<number>();

  formGroup = computed(() => this.childFormGroup() as FormGroup);

  name$ = this.userService.name$;

  // Properties to hold the nested FormGroups for easy access in the template
  childInfoGroup!: FormGroup;
  childDocumentGroup!: FormGroup;

  ngOnInit(): void {
    // Cast the AbstractControl to FormGroup to access the child controls

    // Extract and cast the nested FormGroups to pass them further down
    this.childInfoGroup = this.formGroup().get(
      'childData.childInfo',
    ) as FormGroup;
    this.childDocumentGroup = this.formGroup().get(
      'childData.childDocument',
    ) as FormGroup;
  }

  protected updateName() {
    console.log(`=> child ${this.index()} sync name`);
    this.userService.name$.set(String(this.index()));
  }
}
