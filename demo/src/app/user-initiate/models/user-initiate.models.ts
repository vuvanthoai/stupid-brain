import { Validators } from '@angular/forms';

export interface UserDetails {
  name: string;
  age: number;
}

export const getChildFormObj = () => ({
  name: ['', Validators.required],
  age: ['', Validators.required],
});
