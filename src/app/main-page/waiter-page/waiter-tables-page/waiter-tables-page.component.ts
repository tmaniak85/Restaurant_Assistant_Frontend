import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserCredentials} from '../../../domain/UserCredentials';
import {Subscription, timer} from 'rxjs';
import {Tables} from '../../../domain/Tables';
import {ApiHttpService} from '../../../api-http.service';
import {Router} from '@angular/router';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-waiter-tables-page',
  templateUrl: './waiter-tables-page.component.html',
  styleUrls: ['./waiter-tables-page.component.css']
})
export class WaiterTablesPageComponent implements OnInit, OnDestroy {
  user: UserCredentials = new UserCredentials();
  subscription: Subscription;
  tables: Tables[] = [];
  table: Tables = new Tables();
  introducedTable: Tables = new Tables();
  tableId: number;

  constructor(private apiHttp: ApiHttpService, private router: Router) { }

  ngOnInit(): void {
    this.loadUser();
    this.subscription = timer (200, 2000)
      .pipe(mergeMap(
        () => this.apiHttp.showOccupiedTablesForUser(this.user.username)
      )).subscribe(
        r => this.tables = r);
  }

  loadUser(): void {
    this.apiHttp.userDetailsByToken().subscribe(
      r => this.user = r
    );
  }
  setTableId(tableId: number): void {
    this.tableId = tableId;
  }
  setTableStatusAsOrder(tableId: number): void {
    this.apiHttp.setTableStatusAsOrder(this.tableId).subscribe();
  }
  setTableStatusAsFree(tableId: number): void {
    this.apiHttp.setTableStatusAsFree(this.tableId).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
