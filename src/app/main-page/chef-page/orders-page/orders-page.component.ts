import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiHttpService} from '../../../api-http.service';
import {Router} from '@angular/router';
import {Order} from '../../../domain/Order';
import {Subscription, timer} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {Menu} from '../../../domain/Menu';
import Table = WebAssembly.Table;
import {Tables} from '../../../domain/Tables';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  order: Order = new Order();
  table: Tables = new Tables();
  subscription: Subscription;
  menu: Menu = new Menu();

  constructor(private apiHttp: ApiHttpService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = timer (0, 1000)
      .pipe(mergeMap(
        () => this.apiHttp.showOrdersWithKitchenStatus()
      )).subscribe(
        r => this.orders = r);
  }

  changeStatus(orderId: number): void {
    this.apiHttp.setOrderStatusAsReady(orderId).subscribe();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
