import { Component, OnInit } from '@angular/core';
import {ApiHttpService} from 'src/app/api-http.service';
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
  usernameSizeError = false;
  usernameExistError = false;
  passwordSizeError = false;
  userAuthorityError = false;
  tableInUserExistError = false;
  forbiddenDeleteOfCurrentAccount = false;

  constructor(private apiHttp: ApiHttpService) {
  }

  ngOnInit(): void {
    this.apiHttp.userDetails().subscribe(
      r => this.credentials = r
    );
  }

  registerUser(): void {
    this.cleanForm();
    this.apiHttp.userRegister(this.credential).subscribe(
      () => this.apiHttp.userDetails().subscribe(
        r => this.credentials = r
      ),
      e => {
        const errors = e.error.validationErrorList;
        for (const error of errors) {
          if (error.code === 'C001' || error.code === 'C004') {
            this.usernameSizeError = true;
          }
          if (error.code === 'C002' || error.code === 'C005') {
            this.passwordSizeError = true;
          }
          if (error.code === 'C003') {
            this.usernameExistError = true;
          }
          if (error.code === 'C006') {
            this.userAuthorityError = true;
          }
        }
      }
    );
  }

  cleanForm(): void {
    this.passwordSizeError = false;
    this.usernameSizeError = false;
    this.usernameExistError = false;
    this.userAuthorityError = false;
  }

  setUserAsNonActive(id: number): void {
    this.tableInUserExistError = false;
    this.forbiddenDeleteOfCurrentAccount = false;
    this.apiHttp.setAsNonActive(id).subscribe(
      () => this.apiHttp.userDetails().subscribe(
        r => this.credentials = r
      ),
      e => {
        const errors = e.error.validationErrorList;
        for (const error of errors) {
          if (error.code === 'C007') {
            this.tableInUserExistError = true;
          }
          if (error.code === 'C008') {
            this.forbiddenDeleteOfCurrentAccount = true;
          }
        }
      }
    );
  }

  deleteAdminUser(id: number): void {
    this.forbiddenDeleteOfCurrentAccount = false;
    this.apiHttp.deleteAdminUser(id).subscribe(
      () => this.apiHttp.userDetails().subscribe(
        r => this.credentials = r
      ),
      e => {
        this.forbiddenDeleteOfCurrentAccount = false;
        const errors = e.error.validationErrorList;
        for (const error of errors) {
          if (error.code === 'C009') {
            this.forbiddenDeleteOfCurrentAccount = true;
          }
        }
      }
    );
  }
}
