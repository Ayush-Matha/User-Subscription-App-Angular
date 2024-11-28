import { Component, OnInit } from '@angular/core';
import { ApiService } from './Services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'UserSubscription';
  
    message: string = '';
  
    constructor(private apiService: ApiService) {}
  
    ngOnInit(): void {
      // this.apiService.getData().subscribe(
      //   (response) => {
      //     this.message = response.message;
      //   },
      //   (error) => {
      //     console.error('Error fetching data:', error);
      //   }
      // );
    }
  }
  

