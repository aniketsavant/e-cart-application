import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { CanActivateViaAuthGuardForDashboard } from './services/auth-gurad/auth-guard-dashboard.service';
import { CanActivateViaAuthGuardForLogin } from './services/auth-gurad/auth-guard-login.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common-pages/header/header.component';
import { SidebarComponent } from './components/common-pages/sidebar/sidebar.component';
import { LoginComponent } from './components/auth-pages/login/login.component';
import { MainOutletComponent } from './components/main-outlet/main-outlet.component';
import { DashboardComponent } from './components/main-outlet/dashboard/dashboard.component';
import { OrderListComponent } from './components/main-outlet/order-list/order-list.component';
import { UserComponent } from './components/main-outlet/users/user.component';
import { ProductListComponent } from './components/main-outlet/pruduct/product-list/product-list.component';
import { CatogoriesComponent } from './components/main-outlet/catogories/catogories.component';
import { AddProductComponent } from './components/main-outlet/pruduct/add-product/add-product.component';
import { SignUpComponent } from './components/auth-pages/sign-up/sign-up.component';
import { CategoryService } from './services/category.service';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    MainOutletComponent,
    DashboardComponent,
    OrderListComponent,
    ProductListComponent,
    CatogoriesComponent,
    AddProductComponent,
    SignUpComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    AlertModule,
    MatSortModule,
    ModalModule,
    NgxUiLoaderModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    CanActivateViaAuthGuardForDashboard,
    CanActivateViaAuthGuardForLogin,
    LoginService,
    CategoryService,
    BnNgIdleService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
