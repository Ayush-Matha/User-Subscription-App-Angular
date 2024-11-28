import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { response } from 'express';
import { error } from 'console';
import { DataStoreServiceService } from '../Services/data-store-service.service';

import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent  implements OnInit{

  loginForm!: FormGroup;
  registerForm!:FormGroup
  id:any
  loginVar: any=true;
  userList:any
  singleUser:any

  constructor(  private fb: FormBuilder, private dataStore: DataStoreServiceService, private router:Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      email: ['', Validators.required ,] ,//^[a-zA-Z]+(\s[a-zA-Z]+)?$    Validators.pattern('^[a-zA-Z]+$')
      password: ['', [Validators.required, Validators.maxLength(20)]]
    });


    this.registerForm = this.fb.group({
      name: ['', [Validators.required] ] ,
      email: ['', [Validators.required] ] ,//^[a-zA-Z]+(\s[a-zA-Z]+)?$    Validators.pattern('^[a-zA-Z]+$')
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
  
    },
    {
      validators: this.passwordMatchValidator
    });

  }

  emailValue:any
  passwordValue:any
  nameValue:any

  goBack() {
    window.history.back();
  }

  loginOp:any
tryLogin() {

  this.dataStore.userLogin(this.loginForm.value).subscribe(
    (res) => {
      this.loginOp = res;
      if(this.loginOp.data.access_token && this.loginOp.data.refresh_token)
      {
        if (isPlatformBrowser(this.platformId)) {
          // Only access localStorage in the browser
          localStorage.setItem('accessToken', this.loginOp.data.access_token);
          localStorage.setItem('refreshToken', this.loginOp.data.refresh_token);
          // const decodedToken: any = jwtDecode(this.loginOp.access_token);
          // alert(decodedToken.email);
        }
        console.log(this.loginOp);
        this.router.navigateByUrl('/plan_view');
      }
    }
  );

}

passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const password_confirmation = control.get('password_confirmation');
  
  if (password && password_confirmation &&  password.value !== password_confirmation.value) {
    console.log("Password MAtched")
    return { passwordMismatch: true };
    
  }
  return null;
}
       
op:any

tryRegister(){
    this.dataStore.createUser(this.registerForm.value).subscribe((res)=>{
      this.op=res;
      console.log(res);
      this.id=this.op.data.email;
      alert(this.id+"  this is your ID Note down for Login ");
      // this.router.navigate(['/login']);
      window.location.reload();
    });
}

toggleLoginVar(){
if(this.loginVar){
  this.loginVar=false
}
else{
  this.loginVar=true
}
}




tvar:any

getSingleUser(){
  this.tvar= this.tvar=this.dataStore.getSingleUser({"email":"pratikpihulkar2000@gmail.com"})
  console.log( this.tvar)
}

}
