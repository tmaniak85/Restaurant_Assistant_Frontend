import { Component, OnInit } from '@angular/core';
import {ApiHttpService} from 'src/app/api-http.service';
import {Router} from '@angular/router';
import {UserCredentials} from '../../../domain/UserCredentials';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  credential: UserCredentials = new UserCredentials();
  credentials: UserCredentials[] = [];
  password: string;
  id = 1;

  constructor(private apiHttp: ApiHttpService, private router: Router) {
  }

  ngOnInit(): void {
    this.apiHttp.userDetails().subscribe(
      r => this.credentials = r
    );
  }
  registerUser(): void {
    this.apiHttp.userRegister(this.credential).subscribe(
      () => this.apiHttp.userDetails().subscribe(
        r => this.credentials = r
      )
    );
  }

  deleteUser(id: number): void {
    this.apiHttp.deleteUser(id).subscribe(
      () => this.apiHttp.userDetails().subscribe(
        r => this.credentials = r
      )
    );
  }
}
