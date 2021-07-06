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

  constructor(private apiHttp: ApiHttpService, private router: Router) { }

  ngOnInit(): void {
    this.apiHttp.showActiveDishes().subscribe(
      r => this.menu = r
    );
  }

  createDish(): void {
    this.apiHttp.createDish(this.dish).subscribe(
      () => this.apiHttp.showActiveDishes().subscribe(
        r => this.menu = r
      )
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
