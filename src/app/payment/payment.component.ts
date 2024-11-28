import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { DataStoreServiceService } from '../Services/data-store-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  clickBack() {
    window.history.back();
  }

  id:any;
  planData:any[];
  planName:any;
  amountData:any;
  monthlyPrise:any;
  yearlyPrice:any;
  cardForm!: FormGroup;
  upiForm!: FormGroup;
  bankTransferForm!: FormGroup;
  selectedPlanValidity: string = 'monthly'; 
  selectedOption: string = 'Credit Card';
  

  constructor(  private fb: FormBuilder, private dataStoreService: DataStoreServiceService,private route:Router,private router:ActivatedRoute) {
    
    this.id=parseInt(this.router.snapshot.paramMap.get('id'));
    this.dataStoreService.getPlanById(this.id).subscribe(
      (res) => {
        this.planData = res.data;  
        console.log("this.data ", this.planData);     
        this.amountData = JSON.parse(this.planData[0].amount); 
        this.planName = this.planData[0].name;
        this.monthlyPrise = this.amountData.monthly;
        this.yearlyPrice = this.amountData.yearly;
        console.log('monthly Amount:', this.amountData.monthly);
        console.log('Yearly Amount:', this.amountData.yearly);
      });
  }


  ngOnInit(): void {

    this.cardForm = this.fb.group({
      name: ['', Validators.required ] ,
      card_no: ['', Validators.required ,],
      expiry: ['', Validators.required ,] ,
      cvv: ['', Validators.required ,] ,
      validity : ['']
    });

    this.upiForm = this.fb.group({
      name: ['', Validators.required ] ,
      upi_id: ['', Validators.required ,],
      gmail: ['', Validators.required ,] 
     
    });
    this.bankTransferForm = this.fb.group({
      bank_name: ['', Validators.required ] ,
      account_no: ['', Validators.required ,],
      ifsc: ['', Validators.required ,] ,
      branch: ['', Validators.required ,] 
    });

  }

      

  paymentByCard() {
    console.log(this.cardForm.value);

    this.cardForm.value.validity=this.selectedPlanValidity;
    this.sendData(this.cardForm.value);
    
  }


  paymentByUPI() {
    console.log(this.upiForm.value);
    this.upiForm.value.validity=this.selectedPlanValidity;
    this.sendData(this.upiForm.value);
  }

      

  paymentByBankTransfer() {
    console.log(this.bankTransferForm.value);
    this.bankTransferForm.value.validity=this.selectedPlanValidity;
    this.sendData(this.bankTransferForm.value);
  }

   
  
   
   selectPlanOption(option: string) 
   { 
    this.selectedPlanValidity = option;
   }

    
   selectOption(option: string) 
   { 
    this.selectedOption = option; 
    console.log(this.selectedOption)
   }

  sendData(paymentDetails:any)
  {
  
    const jsonObject = {
      "plan_id": this.id,
      "name": this.planName,
      "amount": (this.selectedPlanValidity == 'monthly')?{"value" : this.monthlyPrise}:{"value" : this.yearlyPrice},
      "validity": (this.selectedPlanValidity == 'monthly')?"monthly":"yearly",
      "payment_type": this.selectedOption,
      "payment_option_details" : paymentDetails
    };

    this.dataStoreService.updateData(jsonObject);
    this.route.navigate(['/bill']);
  }

  calculateTotal()
  {
    if(this.selectedPlanValidity == 'monthly')
    {
      return this.monthlyPrise;
    }
    else
    {
      return (this.yearlyPrice*12);
    }
   
  }
  
}
