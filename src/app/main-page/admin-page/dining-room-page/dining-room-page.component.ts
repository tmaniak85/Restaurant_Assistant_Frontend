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
  users: UserCredentials[] = [];
  user: UserCredentials = new UserCredentials();
  subscription: Subscription;
  subscriptionSecond: Subscription;
  tables: Tables[] = [];
  table: Tables = new Tables();
  introducedTable: Tables = new Tables();
  introducedUser: UserCredentials = new UserCredentials();
  noUserToTableError = false;
  noTableToUserError = false;

  constructor(private apiHttp: ApiHttpService, private router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = timer (0, 3000)
      .pipe(mergeMap(
        () => this.apiHttp.showAvailableWaiters()
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
    this.noUserToTableError = false;
    this.noTableToUserError = false;
    this.apiHttp.addUserToTable(this.introducedTable, this.introducedUser).subscribe(
      () => this.setTableWaiterAsNull(),
      e => {
        if (e.error.validationErrorList != null) {
          const errors = e.error.validationErrorList;
          for (const error of errors) {
            if (error.code === 'C002') {
              this.noUserToTableError = true;
            }
          }
        } else if (e.status === 400) {
          this.noTableToUserError = true;
        }
      }
    );
  }

  setTableWaiterAsNull(): void {
    this.introducedUser = null;
    this.introducedTable = null;
    this.introducedUser = new UserCredentials();
    this.introducedTable = new Tables();
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
