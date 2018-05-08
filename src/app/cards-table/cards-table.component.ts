import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { CardsTableDataSource } from './cards-table-datasource';

@Component({
  selector: 'app-cards-table',
  templateUrl: './cards-table.component.html',
  styleUrls: ['./cards-table.component.css']
})
export class CardsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CardsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new CardsTableDataSource(this.paginator, this.sort);
  }
}
