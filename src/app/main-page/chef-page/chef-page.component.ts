import { Component, OnInit } from '@angular/core';
import {ApiHttpService} from '../../api-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chef-footer-page',
  templateUrl: './chef-page.component.html',
  styleUrls: ['./chef-page.component.css']
})
export class ChefPageComponent implements OnInit {

  constructor(private apiHttp: ApiHttpService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.apiHttp.logout().subscribe(
      () => this.router.navigate([''])
    );
  }
}
