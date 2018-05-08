import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { CardPhotoDialogComponent } from 'src/app/card-photo-dialog/card-photo-dialog.component';
import { PersistenceService } from 'src/app/core/persistence.service';
import { RecordModel } from 'src/app/models/record.model';

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
  @Input() data: any;

  constructor(private persistenceService: PersistenceService,
    public dialog: MatDialog) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'description', 'open', 'delete'];

  ngOnInit() {
    this.dataSource = new CardsTableDataSource(this.paginator, this.sort, this.persistenceService);
    this.dataSource.loadRecords();
  }

  public deleteClicked(record: RecordModel): void {
    this.persistenceService
      .deleteRecordOfCurrentUser(record.id)
      .then();
  }

  public openDialog(photo: string): void {
    const dialogRef = this.dialog.open(CardPhotoDialogComponent, {
      data: { photo: photo }
    });
  }
}
