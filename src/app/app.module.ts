import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';


import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


import { CanActivateViaAuthGuardForDashboard } from './services/auth-gurad/auth-guard-dashboard.service';
import { CanActivateViaAuthGuardForLogin } from './services/auth-gurad/auth-guard-login.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common-pages/header/header.component';
import { FooterComponent } from './components/common-pages/footer/footer.component';
import { SidebarComponent } from './components/common-pages/sidebar/sidebar.component';
import { LoginComponent } from './components/auth-pages/login/login.component';
import { MainOutletComponent } from './components/main-outlet/main-outlet.component';
import { DashboardComponent } from './components/main-outlet/dashboard/dashboard.component';
import { OrderListComponent } from './components/main-outlet/order-list/order-list.component';
import { ProductListComponent } from './components/main-outlet/pruduct/product-list/product-list.component';
import { CatogoriesComponent } from './components/main-outlet/catogories/catogories.component';
import { AddProductComponent } from './components/main-outlet/pruduct/add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    MainOutletComponent,
    DashboardComponent,
    OrderListComponent,
    ProductListComponent,
    CatogoriesComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ButtonsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    AlertModule,
    MatSortModule,
    ModalModule
  ],
  providers: [
    CanActivateViaAuthGuardForDashboard,
    CanActivateViaAuthGuardForLogin
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
