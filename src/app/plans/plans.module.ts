import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { PlansComponent } from './plans.component';
import { MonthlyPlanComponent } from './monthly-plan/monthly-plan.component';
import { AnnualPlanComponent } from './annual-plan/annual-plan.component';


@NgModule({
  declarations: [
    PlansComponent,
    MonthlyPlanComponent,
    AnnualPlanComponent
  ],
  imports: [
    CommonModule,
    PlansRoutingModule
  ]
})
export class PlansModule { }
