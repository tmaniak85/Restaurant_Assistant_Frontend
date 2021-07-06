import {UserCredentials} from './UserCredentials';
import {Menu} from './Menu';
import Table = WebAssembly.Table;
import {Tables} from './Tables';
import DateTimeFormat = Intl.DateTimeFormat;

export class Order {
  id: number;
  table: Tables;
  user: UserCredentials;
  menu: Menu;
  creationDateTime: Date;
  status: string;
}
