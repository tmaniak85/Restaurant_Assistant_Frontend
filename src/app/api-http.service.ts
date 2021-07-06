import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserCredentials} from './domain/UserCredentials';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Menu} from './domain/Menu';
import {Tables} from './domain/Tables';
import {Order} from './domain/Order';

const BASE_URL = 'http://localhost:8080';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

  constructor(private httpClient: HttpClient) { }


  userRegister(user: UserCredentials): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/user/register`, JSON.stringify(user), this.getAuthTokenHeader());
  }
  userLogin(user: UserCredentials): Observable<any> {
    return this.httpClient.patch(`${BASE_URL}/user/login`, JSON.stringify(user), HTTP_OPTIONS).pipe(
      tap(r => this.handleAuthToken(r))
    );
  }
  userDetails(): Observable<any> {
    return this.httpClient.get<UserCredentials>(`${BASE_URL}/user/details`, this.getAuthTokenHeader());
  }
  showAvailableUsers(): Observable<any> {
    return this.httpClient.get<UserCredentials>(`${BASE_URL}/user/details/available`, this.getAuthTokenHeader());
  }
  userDetailsByToken(): Observable<any> {
    return this.httpClient.get(`${BASE_URL}/user/detailsByToken`, this.getAuthTokenHeader());
  }
  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${BASE_URL}/user/delete/${id}`, this.getAuthTokenHeader());
  }
  changePassword(id: number, user: UserCredentials): Observable<any> {
    return this.httpClient.patch(`${BASE_URL}/user/register/${id}`, JSON.stringify(user), this.getAuthTokenHeader());
  }
  logout(): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/user/logout`, this.getAuthTokenHeader());
  }


  private handleAuthToken(r): void {
    localStorage.setItem('authToken', r.token);
  }
  isAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }
  private getAuthTokenHeader(): object {
      const authToken = localStorage.getItem('authToken');
      return {headers: HTTP_OPTIONS.headers.append('Authorization', authToken),
      };
  }


  createDish(dish: Menu): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/menu`, JSON.stringify(dish), this.getAuthTokenHeader());
  }
  showActiveDishes(): Observable<any> {
    return this.httpClient.get<any>(`${BASE_URL}/menu/showActiveDishes`, this.getAuthTokenHeader());
  }
  updateDishCurrentStatus(id: number): Observable<any> {
    return this.httpClient.put(`${BASE_URL}/menu/updateCurrentStatus/${id}`, this.getAuthTokenHeader());
  }
  setDishNonActive(id: number): Observable<any> {
    return this.httpClient.put(`${BASE_URL}/menu/setAsNonActive/${id}`, this.getAuthTokenHeader());
  }


  createTable(table: Tables): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/tables`, JSON.stringify(table), this.getAuthTokenHeader());
  }
  showTables(): Observable<any> {
    return this.httpClient.get<any>(`${BASE_URL}/tables`, this.getAuthTokenHeader());
  }
  deleteTable(id: number): Observable<any> {
    return this.httpClient.delete(`${BASE_URL}/tables/${id}`, this.getAuthTokenHeader());
  }


  addUserToTable(introducedTable: Tables, user: UserCredentials): Observable<any> {
    return this.httpClient.patch(`${BASE_URL}/tables/${introducedTable.id}`, JSON.stringify(user), this.getAuthTokenHeader());
  }
  showOccupiedTablesForUser(username: string): Observable<any> {
    return this.httpClient.get(`${BASE_URL}/tables/${username}`, this.getAuthTokenHeader());
  }
  setTableStatusAsOrder(tableId: number): Observable<any> {
    return this.httpClient.patch(`${BASE_URL}/tables/tableOrderStatus/${tableId}`, this.getAuthTokenHeader());
  }
  setTableStatusAsFree(tableId: number): Observable<any> {
    return this.httpClient.patch(`${BASE_URL}/tables/tableFreeStatus/${tableId}`, this.getAuthTokenHeader());
  }


  createOrder(order: Order, tableId: number): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/order/${tableId}`, JSON.stringify(order), this.getAuthTokenHeader());
  }
  showOrders(): Observable<any> {
    return this.httpClient.get<any>(`${BASE_URL}/order`, this.getAuthTokenHeader());
  }
  showOrdersWithKitchenStatus(): Observable<any> {
    return this.httpClient.get<any>(`${BASE_URL}/order/kitchen`, this.getAuthTokenHeader());
  }
  showOrdersWithKitchenReadyStatusForUser(username: string): Observable<any> {
    return this.httpClient.get<any>(`${BASE_URL}/order/kitchenReadyStatus/${username}`, this.getAuthTokenHeader());
  }
  showOrdersForTable(tableId: number): Observable<any> {
    return this.httpClient.get<any>(`${BASE_URL}/order/${tableId}`, this.getAuthTokenHeader());
  }
  setOrderStatusAsReady(orderId: number): Observable<any> {
    return this.httpClient.patch(`${BASE_URL}/order/ready/${orderId}`, this.getAuthTokenHeader());
  }
  setOrderStatusAsReleased(orderId: number): Observable<any> {
    return this.httpClient.patch(`${BASE_URL}/order/released/${orderId}`, this.getAuthTokenHeader());
  }
  setOrderStatusAsArchived(orderId: number): Observable<any> {
    return this.httpClient.patch(`${BASE_URL}/order/archived/${orderId}`, this.getAuthTokenHeader());
  }
}
