import { Component, OnInit } from '@angular/core';
import {UserCredentials} from '../domain/UserCredentials';
import {ApiHttpService} from '../api-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private apiHttp: ApiHttpService) {
  }

  ngOnInit(): void {
  }

}
