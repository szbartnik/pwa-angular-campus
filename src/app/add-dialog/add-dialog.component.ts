import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersistenceService } from '../core/persistence.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {

  public isFinalizeDisabled = true;
  public recordName: string;
  public recordNotes: string;
  public downloadUrl: string;

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private persistenceService: PersistenceService
  ) { }

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
