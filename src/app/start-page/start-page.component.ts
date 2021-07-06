import { Component, OnInit } from '@angular/core';
import {ApiHttpService} from '../api-http.service';
import {Router} from '@angular/router';
import {UserCredentials} from '../domain/UserCredentials';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  credentials: UserCredentials = new UserCredentials();


  constructor(private apiHttp: ApiHttpService, private router: Router) {
  }

  ngOnInit(): void {
    // localStorage.clear();
  }

  userLogin(): void {
    this.apiHttp.userLogin(this.credentials).subscribe(
      () => {
        this.router.navigate(['/Enter']);
      }
    );
  }
}
