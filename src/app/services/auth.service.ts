import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BaseUrl: string ="https://localhost:7231/api/User/" 
  constructor(private http:HttpClient) { }


  signUp(userObj:any){
   return this.http.post<any>(`${this.BaseUrl}register`,userObj);
  }
  Login(loginObj:any){
    return this.http.post<any>(`${this.BaseUrl}authenticate`,loginObj);
  }
}
