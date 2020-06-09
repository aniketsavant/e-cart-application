import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateViaAuthGuardForDashboard } from './services/auth-gurad/auth-guard-dashboard.service';
import { CanActivateViaAuthGuardForLogin } from './services/auth-gurad/auth-guard-login.service';

import { LoginComponent } from './components/auth-pages/login/login.component';
import { MainOutletComponent } from './components/main-outlet/main-outlet.component';
import { DashboardComponent } from './components/main-outlet/dashboard/dashboard.component';
import { OrderListComponent } from './components/main-outlet/order-list/order-list.component';
import { ProductListComponent } from './components/main-outlet/pruduct/product-list/product-list.component';
import { CatogoriesComponent } from './components/main-outlet/catogories/catogories.component';
import { AddProductComponent } from './components/main-outlet/pruduct/add-product/add-product.component';
import { UserComponent } from './components/main-outlet/users/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanActivateViaAuthGuardForLogin],
  },
  {
    path: '',
    component: MainOutletComponent,
    canActivate: [CanActivateViaAuthGuardForDashboard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'orders',
        component: OrderListComponent,
      },
      {
        path: 'categories',
        component: CatogoriesComponent,
      },
      {
        path: 'product-list',
        component: ProductListComponent,
      },
      {
        path: 'add-product',
        component: AddProductComponent,
      },
      {
        path: 'users',
        component: UserComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
