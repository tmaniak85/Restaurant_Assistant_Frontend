import { Component, OnInit } from '@angular/core';
import {Tables} from '../../../domain/Tables';
import {ApiHttpService} from '../../../api-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.css']
})
export class TablesPageComponent implements OnInit {
  table: Tables = new Tables();
  tables: Tables[] = [];
  id = 1;

  constructor(private apiHttp: ApiHttpService, private router: Router) { }

  ngOnInit(): void {
    this.apiHttp.showTables().subscribe(
      r => this.tables = r
    );
  }

  createTable(): void {
    this.apiHttp.createTable(this.table).subscribe(
      () => this.apiHttp.showTables().subscribe(
        r => this.tables = r
      )
    );
  }
  deleteTable(id: number): void {
    this.apiHttp.deleteTable(id).subscribe(
      () => this.apiHttp.showTables().subscribe(
        r => this.tables = r
      )
    );
  }
}
