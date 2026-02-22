import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  SkeletonGridComponent,
  SkeletonItem,
} from '../skeleton-grid/skeleton-grid.component';

@Component({
  imports: [RouterModule, SkeletonGridComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  demoLayout: SkeletonItem[] = [
    {
      type: 'row',
      width: '100%',
      children: [
        { type: 'item', width: '60%', height: '300px' }, // Large Item (Left)
        {
          type: 'column',
          width: '40%',
          children: [
            { type: 'item', width: '100%', height: '142px' }, // Small Top (Right)
            { type: 'item', width: '100%', height: '142px' }, // Small Bottom (Right)
          ],
        },
      ],
    },
    {
      type: 'row',
      width: '100%',
      children: [
        {
          type: 'column',
          width: '40%',
          children: [
            { type: 'item', width: '100%', height: '142px' }, // Small Top (Right)
            { type: 'item', width: '100%', height: '142px' }, // Small Bottom (Right)
          ],
        },
        { type: 'item', width: '60%', height: '300px' }, // Large Item (Left)
        {
          type: 'column',
          width: '40%',
          children: [
            { type: 'item', width: '100%', height: '142px' }, // Small Top (Right)
            { type: 'item', width: '100%', height: '142px' }, // Small Bottom (Right)
          ],
        },
      ],
    },
  ];
}
