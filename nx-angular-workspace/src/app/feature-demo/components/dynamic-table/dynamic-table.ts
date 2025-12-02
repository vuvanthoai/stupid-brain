import { Component, inject, OnInit } from '@angular/core';
import { TABLE_SERVICE, TableData } from '../../models/feature-demo.models';
import { ServiceRegistry } from '../../service-stratery/service.registry';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-dynamic-table',
  imports: [],
  templateUrl: './dynamic-table.html',
  styleUrl: './dynamic-table.scss',
})
export class DynamicTable implements OnInit {
  private registry = inject(ServiceRegistry);
  private tableService = inject(TABLE_SERVICE);

  dataList: TableData[] = [];

  ngOnInit() {
    this.registry.activeService$
      .pipe(switchMap((activeService) => activeService.getData()))
      .subscribe((res) => (this.dataList = res));
  }

  onDelete(id: number) {
    this.tableService.deleteItem(id).subscribe(() => {
      console.log('Deleted');
    });
  }
}
