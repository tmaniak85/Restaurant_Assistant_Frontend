import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Menu} from '../../../../domain/Menu';
import {ApiHttpService} from '../../../../api-http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../../../domain/Order';
import {Tables} from '../../../../domain/Tables';
import {UserCredentials} from '../../../../domain/UserCredentials';
import {Subscription, timer} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-customer-take-order-page',
  templateUrl: './customer-take-order-page.component.html',
  styleUrls: ['./customer-take-order-page.component.css']
})
export class CustomerTakeOrderPageComponent implements OnInit, OnDestroy {
  menu: Menu[] = [];
  id = 1;
  orders: Order[] = [];
  user: UserCredentials = new UserCredentials();
  tableId: number;
  order: Order = new Order();
  subscription: Subscription;

  constructor(private apiHttp: ApiHttpService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(
      m => {
        this.tableId = Number.parseInt(m.get('Id'));
      }
    );
    this.subscription = timer (0, 1000)
      .pipe(mergeMap(
        () => this.apiHttp.showOrdersForTable(this.tableId)
      )).subscribe(
        r => this.orders = r);
    this.apiHttp.showActiveDishes().subscribe(
      r => this.menu = r
    );
  }

  createOrder(dish: Menu): void {
    this.order.menu = dish;
    this.apiHttp.createOrder(this.order, this.tableId).subscribe(
      r => this.order = r
    );
  }

  showOrdersForTable(): void {
    this.apiHttp.showOrdersForTable(this.tableId).subscribe(
      r => this.orders = r
    );
  }
  setOrderStatusAsArchived(orderId: number): void {
    this.apiHttp.setOrderStatusAsArchived(orderId).subscribe();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
