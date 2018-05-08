import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { PersistenceService } from './core/persistence.service';
import { UserService } from './core/user.service';
import { RecordModel } from './models/record.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'app';
  public records: Observable<RecordModel[]>;
  public name: string;

  constructor(
    public userService: UserService,
    private persistenceService: PersistenceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.records = this.persistenceService.getRecordsOfCurrentUser();
  }

  public addClicked(): void {
    const sampleRecord = {
      name: 'Test record',
      notes: 'My notes',
      photourl: 'My url'
    };

    this.persistenceService
      .addRecordToCurrentUser(sampleRecord)
      .then();
  }

  public deleteClicked(record: RecordModel): void {
    this.persistenceService
      .deleteRecordOfCurrentUser(record.id)
      .then();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: { name: this.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
      console.log(this.name);
    });
  }
}
