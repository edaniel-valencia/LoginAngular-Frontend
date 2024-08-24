import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { initFlowbite } from 'flowbite';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenInterceptor } from '../utils/add-token.interceptor';



@NgModule({
  declarations: [
    ProductComponent,
    CategoryComponent,
    UserComponent,
    RoleComponent,
    DashboardComponent,
    HomeComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true
    }
  ],
})
export class DashboardModule { }
