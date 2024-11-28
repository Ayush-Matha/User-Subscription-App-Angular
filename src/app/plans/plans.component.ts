import { AfterViewInit, Component } from '@angular/core';
import { DataStoreServiceService } from '../Services/data-store-service.service';
import { ActivatedRoute } from '@angular/router';

declare var bootstrap: any;


@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})

export class PlansComponent{

  constructor(private dataStore :DataStoreServiceService,){
    
  }


  plans:any

  ngOnInit(): void {
    // this.dataStore.getAllPlans().subscribe((res: any) => {
    //   this.plans = res.data; 
    //   console.log(this.plans); 
    // });
  }
  
  isToggled: boolean = false; toggle() { this.isToggled = !this.isToggled; }
  


}
