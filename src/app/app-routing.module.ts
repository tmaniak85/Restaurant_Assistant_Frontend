import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPageComponent} from './start-page/start-page.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ChefPageComponent} from './main-page/chef-page/chef-page.component';
import {AdminPageComponent} from './main-page/admin-page/admin-page.component';
import {WaiterPageComponent} from './main-page/waiter-page/waiter-page.component';
import {RegisterPageComponent} from './main-page/admin-page/register-page/register-page.component';
import {AuthGuard} from './auth.guard';
import {MenuPageComponent} from './main-page/chef-page/menu-page/menu-page.component';
import {TablesPageComponent} from './main-page/admin-page/tables-page/tables-page.component';
import {ChangePassPageComponent} from './main-page/admin-page/change-pass-page/change-pass-page.component';
import {DiningRoomPageComponent} from './main-page/admin-page/dining-room-page/dining-room-page.component';
import {WaiterTablesPageComponent} from './main-page/waiter-page/waiter-tables-page/waiter-tables-page.component';
import {EnterPageComponent} from './enter-page/enter-page.component';
import {CustomerTakeOrderPageComponent} from './main-page/waiter-page/waiter-tables-page/customer-take-order-page/customer-take-order-page.component';
import {OrdersPageComponent} from './main-page/chef-page/orders-page/orders-page.component';
import {CustomerShowOrdersPageComponent} from './main-page/waiter-page/waiter-tables-page/customer-show-orders-page/customer-show-orders-page.component';


const routes: Routes = [
  {path: '', component: StartPageComponent},
  {
    path: 'Enter', component: EnterPageComponent
  },
  {
    path: 'MainPage', component: MainPageComponent, children: [
      {path: 'CHEF', data: { canActivate: 'CHEF'}, canActivate: [AuthGuard], component: ChefPageComponent, children: [
          {path: 'Menu', canActivate: [AuthGuard], data: { canActivate: 'CHEF'}, component: MenuPageComponent},
          {path: 'Orders', canActivate: [AuthGuard], data: { canActivate: 'CHEF'}, component: OrdersPageComponent},
          ]
      },
      {path: 'ADMIN', data: { canActivate: 'ADMIN'}, canActivate: [AuthGuard], component: AdminPageComponent, children: [
          {path: 'Register', canActivate: [AuthGuard], data: { canActivate: 'ADMIN'}, component: RegisterPageComponent},
          {path: 'Pass/:Id', canActivate: [AuthGuard], data: { canActivate: 'ADMIN'}, component: ChangePassPageComponent},
          {path: 'Tables', canActivate: [AuthGuard], data: { canActivate: 'ADMIN'}, component: TablesPageComponent},
          {path: 'Room', canActivate: [AuthGuard], data: { canActivate: 'ADMIN'}, component: DiningRoomPageComponent}
          ]},
      {path: 'WAITER', data: { canActivate: 'WAITER'}, canActivate: [AuthGuard], component: WaiterPageComponent, children: [
          {path: 'Tables', component: WaiterTablesPageComponent, canActivate: [AuthGuard], data: { canActivate: 'WAITER'}, children: [
              {path: 'CustomerTakeOrder/:Id', canActivate: [AuthGuard], data: { canActivate: 'WAITER'},
                component: CustomerTakeOrderPageComponent},
              {path: 'CustomerShowOrders', canActivate: [AuthGuard], data: { canActivate: 'WAITER'},
                component: CustomerShowOrdersPageComponent}
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
