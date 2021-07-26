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
  tableExistError = false;
  tableNumberRangeError = false;
  numberOfSeatsRangeError = false;
  orderInTablesError = false;
  helperMessage: string;

  constructor(private apiHttp: ApiHttpService, private router: Router) { }

  ngOnInit(): void {
    this.apiHttp.showTables().subscribe(
      r => this.tables = r
    );
  }

  createTable(): void {
    this.tableExistError = false;
    this.tableNumberRangeError = false;
    this.numberOfSeatsRangeError = false;
    this.apiHttp.createTable(this.table).subscribe(
      () => this.apiHttp.showTables().subscribe(
        r => this.tables = r
      ),
      e => {
          const errors = e.error.validationErrorList;
          for (const error of errors) {
            if (error.code === 'C003') {
              this.tableExistError = true;
            }
            if (error.code === 'C001' || error.code === 'C002') {
              this.tableNumberRangeError = true;
            }
            if (error.code === 'C004' || error.code === 'C005') {
              this.numberOfSeatsRangeError = true;
            }
          }
      }
    );
  }

  deleteTable(id: number): void {
    this.orderInTablesError = false;
    this.apiHttp.deleteTable(id).subscribe(
      () => this.apiHttp.showTables().subscribe(
        r => this.tables = r
      ),
      e => {
        const errors = e.error.validationErrorList;
        for (const error of errors) {
          if (error.code === 'C006') {
            this.helperMessage = error.helperMessage;
            this.orderInTablesError = true;
          }
        }
      }
    );
  }
}
