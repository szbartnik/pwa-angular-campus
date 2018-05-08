import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PersistenceService } from 'src/app/core/persistence.service';
import { UserService } from 'src/app/core/user.service';
import { RecordModel } from 'src/app/models/record.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public records: Observable<RecordModel[]>;

  constructor(public userService: UserService,
    private persistenceService: PersistenceService) { }

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
