import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';

import { PersistenceService } from '../core/persistence.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  public isFinalizeDisabled = true;
  public recordName: string;
  public recordNotes: string;
  public downloadUrl: string;
  public isConnected: Observable<boolean>;

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private persistenceService: PersistenceService
  ) {
    this.isConnected = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false));
   }

   ngOnInit() {
   }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onYesClick(): void {
    const sampleRecord = {
      name: this.recordName,
      notes: this.recordNotes,
      photourl: this.downloadUrl
    };

    this.persistenceService
      .addRecordToCurrentUser(sampleRecord)
      .then(x => {
        this.dialogRef.close();
      });
  }

  public upload(event: any): void {
    this.isFinalizeDisabled = true;
    this.persistenceService.upload(event)
      .then(x => {
        this.downloadUrl = x.downloadURL;
        console.log(this.downloadUrl);
        this.isFinalizeDisabled = false;
      });
  }
}
