import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

constructor(private route:Router){

}

  clickLogin(){
    // if(chech access tocken)if avail
    // {

    if (confirm("Do you want to log in?")) {
      this.route.navigate(['login']); 
    }

    }
   
}
