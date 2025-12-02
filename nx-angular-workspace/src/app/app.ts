import { Component } from '@angular/core';
import { FeatureDemo } from './feature-demo/feature-demo';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [FeatureDemo, RouterOutlet],
})
export class AppComponent {}
