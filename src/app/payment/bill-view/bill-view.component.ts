  import { Component } from '@angular/core';
  import { jwtDecode } from 'jwt-decode';
  import { isPlatformBrowser } from '@angular/common';
  import { Inject, PLATFORM_ID } from '@angular/core';
  import { DataStoreServiceService } from '../../Services/data-store-service.service';
  import { ActivatedRoute, Router } from '@angular/router';


  @Component({
    selector: 'app-bill-view',
    templateUrl: './bill-view.component.html',
    styleUrl: './bill-view.component.css'
  })
  export class BillViewComponent {


      otp: any;

      toggleVar=false
      btnConfir=true
      userData:any = {};
      planData:any;
      planDataForBill:any = {};
      planName:any;
      billValidity:any;
      billAmount:any;
      transactionData:any;

      constructor(
        private api:DataStoreServiceService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private router:ActivatedRoute,
        private rutr:Router
      ){}

      ngOnInit()
      {
        this.getUserData();
        this.getPlanData();

      }

      checkOtp(){
          // if(this.otp==this.otp)
          if(this.toggleVar)
          {
            this.toggleVar=false;
            this.btnConfir=false
          }
          else{
            this.toggleVar=true;
          }
          console.log(this.toggleVar);
      }

      confirmPayment(){
        this.transactionData = {
          "user_id" : this.userData.id,
          "payment_type" : this.planDataForBill.payment_type,
          "plan_id" : this.planDataForBill.plan_id,
          "payment_option_details" : this.planDataForBill.payment_option_details
        };
        // this.transactionData.payment_option_details = JSON.stringify({
        //   validity: this.planDataForBill.validity
        // });
        this.transactionData.payment_option_details = JSON.stringify(this.planDataForBill.payment_option_details);
        console.log(this.transactionData);
        this.api.makeTransaction(this.transactionData).subscribe((res:any)=>{
          console.log(res.status);
        });

        this.rutr.navigate(['/success_page'])
      }

      getUserData()
      {
        this.api.getUserData().subscribe((res:any)=>{
          this.userData = res.data[0];
        });
      }

      getPlanData()
      {
        this.api.currentData.subscribe(
          (data) => {
            if(!data){
              alert("You are Logged Out!!")
              
              this.rutr.navigate(['/login'])
            }
            this.planDataForBill = data;
            this.planName = this.planDataForBill.name;
            this.billValidity = this.planDataForBill.validity;
            this.billAmount = this.planDataForBill.amount.value;
          }  
        );
        console.log(this.planDataForBill);
        
      }

      getTotal()
      {
        if(this.planDataForBill?.validity === "yearly")
        {
          return (this.planDataForBill.amount.value * 12);
        }
          return (this.planDataForBill.amount.value * 1);
      }

    
  }

