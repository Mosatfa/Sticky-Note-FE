import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "https://sticky-note-lilac.vercel.app/auth"
  isAuthenticated: any = new BehaviorSubject(null)
  
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('SN-UR')) {
      this.saveDataUser()
    }
  }

  saveDataUser() {
    let decoded = jwtDecode(JSON.stringify(localStorage.getItem('SN-UR')))
    this.isAuthenticated.next(decoded)
  }

  signUp(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/signUp`, formData)
  }

  login(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/login`, formData)
  }

  loginWithGmail(idToken: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/loginWithGmail`, idToken)
  }

  requestResetPassword(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/sendCode`, formData)
  }

  requestChangePassword(formData: any): Observable<any> {
    return this._HttpClient.patch(`${this.baseUrl}/forgetPassword`, formData)
  }

  signOut() {
    localStorage.removeItem('SN-UR')
    this.isAuthenticated.next(null)
    this._Router.navigate(['./login'])
  }
}
