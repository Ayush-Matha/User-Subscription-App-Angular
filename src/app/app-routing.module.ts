import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { PlansComponent } from './plans/plans.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessPageComponent } from './payment/success-page/success-page.component';
import { BillViewComponent } from './payment/bill-view/bill-view.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'plan_view',
    component:PlansComponent
  },
  {
    path:'payment/:id',
    component:PaymentComponent
  },
  {
    path:'success_page',
    component:SuccessPageComponent
  },
  {
    path:'bill',
    component:BillViewComponent
  },
  { path: 'plans', loadChildren: () => import('./plans/plans.module').then(m => m.PlansModule) },
  { path: 'Payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
  
 


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
