import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { PersistenceService } from './core/persistence.service';
import { UserModel } from './models/user.model';
import { RecordModel } from './models/record.model';
import { UserService } from './core/user.service';

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
    private persistenceService: PersistenceService
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
}
