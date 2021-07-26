import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../../../domain/Order';
import {Subscription, timer} from 'rxjs';
import {UserCredentials} from '../../../../domain/UserCredentials';
import {ApiHttpService} from '../../../../api-http.service';
import {Router} from '@angular/router';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-customer-show-orders-page',
  templateUrl: './customer-show-orders-page.component.html',
  styleUrls: ['./customer-show-orders-page.component.css']
})
export class CustomerShowOrdersPageComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  subscription: Subscription;
  user: UserCredentials;

  constructor(private apiHttp: ApiHttpService, private router: Router) { }

  ngOnInit(): void {
    this.loadUser();
    this.subscription = timer (500, 1000)
      .pipe(mergeMap(
        () => this.apiHttp.showOrdersWithKitchenReadyStatusForUser(this.user.username)
      )).subscribe(
        r => this.orders = r);
  }

  loadUser(): void {
    this.apiHttp.userDetailsByToken().subscribe(
      r => this.user = r
    );
  }

  setOrderStatusAsReleased(orderId: number): void {
    this.apiHttp.setOrderStatusAsReleased(orderId).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
