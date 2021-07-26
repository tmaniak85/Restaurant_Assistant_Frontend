import {UserCredentials} from './UserCredentials';
import {Menu} from './Menu';
import {Tables} from './Tables';
import {Time} from '@angular/common';

export class Order {
  id: number;
  tables: Tables;
  user: UserCredentials;
  menu: Menu;
  creationDate: Date;
  creationTime: Time;
  status: string;
}
