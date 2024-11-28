import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessPageComponent } from './success-page/success-page.component';
import { BillViewComponent } from './bill-view/bill-view.component';


@NgModule({
  declarations: [
    PaymentComponent,
    SuccessPageComponent,
    BillViewComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class PaymentModule { }
