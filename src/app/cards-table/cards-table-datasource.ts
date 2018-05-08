import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersistenceService } from 'src/app/core/persistence.service';
import { RecordModel } from 'src/app/models/record.model';


// TODO: replace this with real data from your application
const EXAMPLE_DATA: RecordModel[] = [];

/**
 * Data source for the CardsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CardsTableDataSource extends DataSource<RecordModel> {
  private recordsSubject = new BehaviorSubject<RecordModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  data: RecordModel[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort, private persistenceService: PersistenceService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<RecordModel[]> {
    return this.recordsSubject.asObservable();
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    // const dataMutations = [observableOf(this.data), this.paginator.page, this.sort.sortChange];

    // Set the paginators length
    // this.paginator.length = this.data.length;

    // return merge(...dataMutations).pipe(
    //   map(() => {
    //     return this.getPagedData(this.getSortedData([...this.data]));
    //   })
    // );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.recordsSubject.complete();
    this.loadingSubject.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: RecordModel[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: RecordModel[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }

  loadRecords() {
    this.loadingSubject.next(true);

    this.persistenceService.getRecordsOfCurrentUser().subscribe(
      records => {
        console.log(records)
        this.data = records;
        this.recordsSubject.next(records);
        this.loadingSubject.next(false);
      }
    );
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
