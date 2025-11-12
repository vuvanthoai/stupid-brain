import { Injectable, signal } from '@angular/core';

@Injectable()
export class UserService {
  name$ = signal('abc');
}
