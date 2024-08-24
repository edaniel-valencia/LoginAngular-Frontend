import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SigInComponent } from './components/sig-in/sig-in.component';
import { AuthGuard } from './utils/auth.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signIn', component: SigInComponent},
  {path: 'dashboard', 
    canActivate: [AuthGuard],     
    component: DashboardComponent, 
    children:[
      { path: '', loadChildren:() => import('./admin/dashboard.module').then(m => m.DashboardModule)},
      { path: 'product', loadChildren:() => import('./admin/dashboard.module').then(m => m.DashboardModule) },
      { path: 'category', loadChildren:() => import('./admin/dashboard.module').then(m => m.DashboardModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
