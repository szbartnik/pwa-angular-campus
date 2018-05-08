import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-photo-dialog',
  templateUrl: './card-photo-dialog.component.html',
  styleUrls: ['./card-photo-dialog.component.css']
})
export class CardPhotoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CardPhotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

}
