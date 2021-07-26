import { Component, OnInit } from '@angular/core';
import {ApiHttpService} from '../../../api-http.service';
import {Router} from '@angular/router';
import {Menu} from '../../../domain/Menu';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {
  menu: Menu[] = [];
  dish: Menu = new Menu();
  id = 1;
  dishNameSizeError = false;
  priceFieldNull = false;
  priceRangeError = false;

  constructor(private apiHttp: ApiHttpService, private router: Router) { }

  ngOnInit(): void {
    this.apiHttp.showActiveDishes().subscribe(
      r => this.menu = r
    );
  }

  createDish(): void {
    this.dishNameSizeError = false;
    this.priceFieldNull = false;
    this.priceRangeError = false;
    this.apiHttp.createDish(this.dish).subscribe(
      () => this.apiHttp.showActiveDishes().subscribe(
        r => this.menu = r
      ),
      e => {
        const errors = e.error.validationErrorList;
        for (const error of errors) {
          if (error.code === 'C001' || error.code === 'C002') {
            this.dishNameSizeError = true;
          }
          if (error.code === 'C003') {
            this.priceFieldNull = true;
          }
          if (error.code === 'C004' || error.code === 'C005') {
            this.priceRangeError = true;
          }
        }
      }
    );
  }

  deleteDish(id: number): void {
    this.apiHttp.setDishNonActive(id).subscribe(
      () => this.apiHttp.showActiveDishes().subscribe(
        r => this.menu = r
      )
    );
  }

  updateDishCurrentStatus(id: number): void {
    this.apiHttp.updateDishCurrentStatus(id).subscribe(
      () => this.apiHttp.showActiveDishes().subscribe(
        r => this.menu = r
      )
    );
  }
}
