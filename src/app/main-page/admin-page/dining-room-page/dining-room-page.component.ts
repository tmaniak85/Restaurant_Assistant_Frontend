import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiHttpService} from '../../../api-http.service';
import {Subscription, timer} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {UserCredentials} from '../../../domain/UserCredentials';
import {Tables} from '../../../domain/Tables';

@Component({
  selector: 'app-dining-room-page',
  templateUrl: './dining-room-page.component.html',
  styleUrls: ['./dining-room-page.component.css']
})
export class DiningRoomPageComponent implements OnInit, OnDestroy {

  constructor(private apiHttp: ApiHttpService, private router: Router, private activeRoute: ActivatedRoute) {}
  users: UserCredentials[] = [];
  user: UserCredentials = new UserCredentials();
  subscription: Subscription;
  subscriptionSecond: Subscription;
  tables: Tables[] = [];
  table: Tables = new Tables();
  introducedTable: Tables = new Tables();
  introducedUser: UserCredentials = new UserCredentials();


  ngOnInit(): void {
    this.subscription = timer (0, 3000)
      .pipe(mergeMap(
        () => this.apiHttp.showAvailableUsers()
      )).subscribe(
        r => this.users = r);
    this.subscriptionSecond = timer (0, 3000)
      .pipe(mergeMap(
        () => this.apiHttp.showTables()
      )).subscribe(
        r => this.tables = r);
  }

  addTableId(table: Tables): void {
    this.introducedTable = table;
  }
  addUserId(user: UserCredentials): void {
    this.introducedUser = user;
  }

  addUserToTable(): void {
    this.apiHttp.addUserToTable(this.introducedTable, this.introducedUser).subscribe(
      () => this.setTableWaiterAsNull()
    );
  }

  setTableWaiterAsNull(): void {
    this.introducedUser.username = null;
    this.introducedTable.numberOfTable = null;
  }

  logout(): void {
    this.apiHttp.logout();
    this.router.navigate(['']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionSecond.unsubscribe();
  }
}
