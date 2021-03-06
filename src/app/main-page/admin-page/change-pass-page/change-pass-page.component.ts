import { Component, OnInit } from '@angular/core';
import {UserCredentials} from '../../../domain/UserCredentials';
import {ApiHttpService} from '../../../api-http.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-change-pass-page',
  templateUrl: './change-pass-page.component.html',
  styleUrls: ['./change-pass-page.component.css']
})
export class ChangePassPageComponent implements OnInit {
  id: number;
  user: UserCredentials = new UserCredentials();
  passwordSizeError = false;

  constructor(private apiHttp: ApiHttpService, private router: Router, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(
      m => {
        this.id = Number.parseInt(m.get('Id'));
      }
    );
  }

  changePassword(): void {
    this.passwordSizeError = false;
    this.apiHttp.changePassword(this.id, this.user).subscribe(
      () => this.router.navigateByUrl(`/MainPage/ADMIN/Register`),
      e => {
        const errors = e.error.validationErrorList;
        for (const error of errors) {
          if (error.code === 'C002' || error.code === 'C005') {
            this.passwordSizeError = true;
          }
        }
      }
    );
  }
}
