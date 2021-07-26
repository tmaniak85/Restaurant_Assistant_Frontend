import { Component, OnInit } from '@angular/core';
import {ApiHttpService} from '../../api-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-footer-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private apiHttp: ApiHttpService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.apiHttp.logout().subscribe(
      () => this.router.navigate([''])
    );
  }
}
