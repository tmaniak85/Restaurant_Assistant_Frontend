import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ChefPageComponent } from './main-page/chef-page/chef-page.component';
import { AdminPageComponent } from './main-page/admin-page/admin-page.component';
import { WaiterPageComponent } from './main-page/waiter-page/waiter-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterPageComponent } from './main-page/admin-page/register-page/register-page.component';
import {FormsModule} from '@angular/forms';
import { MenuPageComponent } from './main-page/chef-page/menu-page/menu-page.component';
import { TablesPageComponent } from './main-page/admin-page/tables-page/tables-page.component';
import { HeaderPageComponent } from './main-page/header-page/header-page.component';
import { ChangePassPageComponent } from './main-page/admin-page/change-pass-page/change-pass-page.component';
import { DiningRoomPageComponent } from './main-page/admin-page/dining-room-page/dining-room-page.component';
import { WaiterTablesPageComponent } from './main-page/waiter-page/waiter-tables-page/waiter-tables-page.component';
import { EnterPageComponent } from './enter-page/enter-page.component';
import { CustomerTakeOrderPageComponent } from './main-page/waiter-page/waiter-tables-page/customer-take-order-page/customer-take-order-page.component';
import { OrdersPageComponent } from './main-page/chef-page/orders-page/orders-page.component';
import { CustomerShowOrdersPageComponent } from './main-page/waiter-page/waiter-tables-page/customer-show-orders-page/customer-show-orders-page.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    MainPageComponent,
    ChefPageComponent,
    AdminPageComponent,
    WaiterPageComponent,
    RegisterPageComponent,
    MenuPageComponent,
    TablesPageComponent,
    HeaderPageComponent,
    ChangePassPageComponent,
    DiningRoomPageComponent,
    WaiterTablesPageComponent,
    EnterPageComponent,
    CustomerTakeOrderPageComponent,
    OrdersPageComponent,
    CustomerShowOrdersPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
