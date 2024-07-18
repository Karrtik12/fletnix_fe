import { LoginDetails, RegistrationDetails, RegistrationResponse, UserDetails } from './../Models/cred';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser: UserDetails = {
    email: '', age: 0, message: ''
  }

  baseUrl: string = `https://fletnix-be.onrender.com/api/auth`;

  constructor(private http: HttpClient) { 
  }

  registerApi(registrationDetails: RegistrationDetails){
    return this.http.post<RegistrationResponse>(`${this.baseUrl}/register`,{email:registrationDetails.email, password:registrationDetails.password, age:registrationDetails.age})
  }

  loginApi(loginDetails: LoginDetails){
    return this.http.post<UserDetails>(`${this.baseUrl}/login`,{email:loginDetails.email, password:loginDetails.password})
  }
}
