import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.css'
})
export class SuccessPageComponent {
  constructor(private router: Router){

  }



  showAlert: boolean = true;

  ngOnInit(): void {
   
    // Display alert for 3 seconds
    setTimeout(() => {
      this.showAlert = false;
     
    }, 3000);

    this.pageAutoRedirect();
  }

  pageAutoRedirect(){
    setTimeout(() => {
    this.router.navigate(['/profile']);
    }, 9000);
  }
}
