import { Component } from '@angular/core';
import { DataStoreServiceService } from '../Services/data-store-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private dataStore:DataStoreServiceService){

  }
  userData:any

  ngOnInit(): void {
    this.dataStore.getUserData().subscribe(res=>{
      this.userData=res.data[0];
      console.log("USER DATA")
      console.log(this.userData)
    });
  }
}

