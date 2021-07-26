import { Component, OnInit } from '@angular/core';
import {UserCredentials} from '../../../domain/UserCredentials';
import {Order} from '../../../domain/Order';
import {Menu} from '../../../domain/Menu';
import {ApiHttpService} from '../../../api-http.service';
import {Dates} from '../../../domain/Dates';

@Component({
  selector: 'app-stat-page',
  templateUrl: './stat-page.component.html',
  styleUrls: ['./stat-page.component.css']
})
export class StatPageComponent implements OnInit {
  credentials: UserCredentials[] = [];
  ordersForUserStat: Order[] = [];
  ordersForDishesStat: Order[] = [];
  order: Order = new Order();
  menu: Menu[] = [];
  datesForUserStat: Dates = new Dates();
  datesForDishesStat: Dates = new Dates();
  counter: number;
  noDateForUserStatError = false;
  noDateForDishesStatError = false;

  constructor(private apiHttp: ApiHttpService) { }

  ngOnInit(): void {
    this.apiHttp.showActiveWaiters().subscribe(
      r => this.credentials = r
    );
    this.apiHttp.showActiveDishes().subscribe(
      r => this.menu = r
    );
  }

  showOrdersBetweenDatesForUser(): void {
    this.noDateForUserStatError = false;
    this.apiHttp.showOrdersBetweenDates(this.datesForUserStat).subscribe(
      r => this.ordersForUserStat = r,
      e => {
        const errors = e.error.validationErrorList;
        for (const error of errors) {
          if (error.code === 'C001') {
            this.noDateForUserStatError = true;
          }
        }
      }
    );
  }

  showOrdersBetweenDatesForDishes(): void {
    this.noDateForDishesStatError = false;
    this.apiHttp.showOrdersBetweenDates(this.datesForDishesStat).subscribe(
      r => this.ordersForDishesStat = r,
      e => {
        const errors = e.error.validationErrorList;
        for (const error of errors) {
          if (error.code === 'C001') {
            this.noDateForDishesStatError = true;
          }
        }
      }
    );
  }

  countNumberOfOrdersForUser(username: string): number {
    this.counter = 0;
    for (this.order of this.ordersForUserStat) {
      if (this.order.user.username === username) {
        this.counter++;
      }
    }
    return this.counter;
  }

  countNumberOfOrdersForDishes(dishName: string): number {
    this.counter = 0;
    for (this.order of this.ordersForDishesStat) {
      if (this.order.menu.name === dishName) {
        this.counter++;
      }
    }
    return this.counter;
  }

}
