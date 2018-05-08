import { Component, OnInit } from '@angular/core';
import { PersistenceService } from './core/persistence.service';
import { SwPush } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public name: string;

  constructor(
    private persistenceService: PersistenceService,
    private swPush: SwPush,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
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

  public subscribeToNotification(): void {
    this.swPush.requestSubscription({
      serverPublicKey: environment.notificationsPublicKey
    })
      .then(sub => {
        console.log('Successfully subscribed to notification');
        this.persistenceService.subscribeNotification(sub).subscribe(x => {
          console.log('Successfully persisted subscription');
        }, err => {
          console.error('Could not persist subscription');
        });
      }).catch(err => {
        console.error('Could not subscribe to notifications', err);
      });
  }
}
