import { Component, OnInit } from '@angular/core';
import {ApiHttpService} from '../../api-http.service';
import {UserCredentials} from '../../domain/UserCredentials';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})
export class HeaderPageComponent implements OnInit {
  credentials: UserCredentials = new UserCredentials();

  constructor(private apiHttp: ApiHttpService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.apiHttp.userDetailsByToken().subscribe(
      r => this.credentials = r
    );
  }

}
