import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError, BehaviorSubject} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataStoreServiceService {

  constructor(private http:HttpClient, private route:Router) {}


  private baseUrl = environment.apiUrl;

  private planDataForBill = new BehaviorSubject<any>(null); // Holds the JSON object
  currentData = this.planDataForBill.asObservable();
  updateData(newData: any) {
    this.planDataForBill.next(newData); // Update the JSON object
  }


  //Register User
  createUser(user:any):Observable<any>{
    return this.http.post('http://localhost:8000/register', user);
  }

  //Get User
  getUserData():Observable<any>{
    return this.http.get('http://localhost:8000/me');
  }

  //Login User
  userLogin(user:any):Observable<any>{
    return this.http.post('http://localhost:8000/login', user)
  }


  getSingleUser(user:any):Observable<any>{
    return this.http.post('http://localhost:8000/get_user_by_email', user);
  }


 
  //PLANS      ////////////

  getAllPlans():Observable<any>{
    return this.http.get('http://localhost:8000/plans');
  }

  getPlanById(id:any):Observable<any>{
    return this.http.get('http://localhost:8000/plans/'+id);
  }

  //Transaction

  makeTransaction(transactionData:any):Observable<any>{
    return this.http.post('http://localhost:8000/transactions',transactionData);
  }


  logout(){ 
    if(confirm("You Wanna Log Out")){
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // this.route.navigate(['/login'])
      this.route.navigate(['/login'], { replaceUrl: true });
      // window.history.pushState(null, '', '/login'); 
    }
  }

  refreshToken() {

    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      console.error('No refresh token found in storage!');
      // return throwError('No refresh token found.');
    }

    return this.http.post<{ new_access_token: any }>('http://localhost:8000/refresh', { refreshToken })
    .pipe(
      map(response => {
        console.log('Refresh Response:', response);
        return response.new_access_token;
      }),
      catchError(err => {
        console.error('Refresh Token Error:', err);
        return throwError(err);
      })
    );
  }


loginVar:any=null
globleId:any=null


}
