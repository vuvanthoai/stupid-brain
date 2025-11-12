import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserInitiate } from './user-initiate/user-initiate';

@Component({
  imports: [RouterModule, UserInitiate],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'nx-angular-workspace';
}
