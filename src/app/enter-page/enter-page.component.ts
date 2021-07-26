import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiHttpService} from '../api-http.service';
import {Router} from '@angular/router';
import {UserCredentials} from '../domain/UserCredentials';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-enter-page',
  templateUrl: './enter-page.component.html',
  styleUrls: ['./enter-page.component.css']
})
export class EnterPageComponent implements OnInit {
  user: UserCredentials = new UserCredentials();

  constructor(private apiHttp: ApiHttpService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.apiHttp.userDetailsByToken().subscribe(
      r => this.user = r
    );
  }

  goFurther(userAuthority: string): void {
    this.authService.userType = this.user.userAuthority;
    this.router.navigateByUrl(`/MainPage/${userAuthority}`);
  }

  logout(): void {
    this.apiHttp.logout();
    this.router.navigate(['']);
  }
}
