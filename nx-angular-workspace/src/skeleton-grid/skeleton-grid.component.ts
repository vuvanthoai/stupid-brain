import { Component, input } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';

export interface SkeletonItem {
  width: string;
  height?: string;
  type: 'row' | 'column' | 'item'; // "item" is child (small) type
  children?: SkeletonItem[]; // Nested items
  borderRadius?: string;
}

@Component({
  selector: 'app-skeleton-grid',
  standalone: true,
  templateUrl: './skeleton-grid.component.html',
  styleUrls: ['./skeleton-grid.component.scss'],
  imports: [NgClass, NgTemplateOutlet],
})
export class SkeletonGridComponent {
  layout = input<SkeletonItem[]>([]);
  gap = input('16px');
}
