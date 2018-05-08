import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { PersistenceService } from './core/persistence.service';
import { UserModel } from './models/user.model';
import { RecordModel } from './models/record.model';
import { UserService } from './core/user.service';
import { SwPush } from '@angular/service-worker';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'app';
  public records: Observable<RecordModel[]>;

  constructor(
    public userService: UserService,
    private persistenceService: PersistenceService,
    private swPush: SwPush
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
