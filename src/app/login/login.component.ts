import { GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false
  isLoading: boolean = false;
  user!: SocialUser;
  loggedIn!: boolean;
  errMessage: string = "";


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  })

  LoginData() {
    if (this.loginForm.valid) {
      this.isLoading = true
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message == 'Done') {
            this.isLoading = false
            localStorage.setItem('SN-UR', res.token)
            this._AuthService.saveDataUser()
            this._Router.navigate(['home'])
          }
        },
        error: (err) => {
          if (err.error.message) {
            this.isLoading = false
            this.errMessage = err.error.message
          }
        }
      })
    }
  }

  signInWithGoogle(idToken: any) {
    this._AuthService.loginWithGmail({ idToken }).subscribe({
      next: (res) => {
        if (res.message == 'Done') {
          localStorage.setItem('SN-UR', res.token)
          this._AuthService.saveDataUser()
          this._Router.navigate(['home'])
        }
      }
    })
  }

  constructor(private _AuthService: AuthService, private _Router: Router, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.signInWithGoogle(this.user.idToken)
    })
  }


}
