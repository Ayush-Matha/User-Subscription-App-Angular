import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataStoreServiceService } from '../Services/data-store-service.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggdIn: boolean = false;
  refresh_token : any;

  constructor(private route:Router, private dataStore:DataStoreServiceService, @Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit()
  {
    this.dataStore.isLoggedIn$.subscribe((status) => {
      this.isLoggdIn = status;
    });
  }

  Logout(){
      if (confirm('You Wanna Log Out')) {

        if(isPlatformBrowser(this.platformId)) {
          this.refresh_token = localStorage.getItem('refreshToken');
        }

        this.dataStore.logout(this.refresh_token).subscribe((res:any) => {
          console.log(res);
          if(isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
          this.dataStore.updateLoginStatus(false);
          this.route.navigate(['/login'], { replaceUrl: true });
        });
        
      }
  }
   
}
