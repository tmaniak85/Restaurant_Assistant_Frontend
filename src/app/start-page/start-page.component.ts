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
  wrongCredentialsError = false;


  constructor(private apiHttp: ApiHttpService, private router: Router) {
  }

  ngOnInit(): void {
  }

  userLogin(): void {
    this.wrongCredentialsError = false;
    this.apiHttp.userLogin(this.credentials).subscribe(
      () => {
        this.router.navigate(['/Enter']);
      },
      e => {
        const errors = e.error.validationErrorList;
        for (const error of errors) {
          if (error.code === 'C003') {
            this.wrongCredentialsError = true;
          }
        }
      }
    );
  }
}
