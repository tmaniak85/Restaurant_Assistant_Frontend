import { Component, OnInit } from '@angular/core';
import {ApiHttpService} from '../../api-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-waiter-footer-page',
  templateUrl: './waiter-page.component.html',
  styleUrls: ['./waiter-page.component.css']
})
export class WaiterPageComponent implements OnInit {

  constructor(private apiHttp: ApiHttpService, private router: Router) { }

  ngOnInit(): void {
    this.router.navigateByUrl('/MainPage/WAITER/Tables');
  }

  logout(): void {
    this.apiHttp.logout();
    this.router.navigate(['']);
  }

}
