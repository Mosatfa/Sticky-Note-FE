import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {

  showPassword: boolean = false;
  errMessage: string = "";
  errConfirmPassword: boolean = false;
  checked: boolean = false;
  isLoading: boolean = false
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signUpForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.pattern(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/), Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required]),
    cPassword: new FormControl(null, [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required]),
  })

  signUpData() {

    this.errConfirmPassword = this.signUpForm.value.password != this.signUpForm.value.cPassword ? true : false
    if (this.signUpForm.valid) {
      this.isLoading = true
      this._AuthService.signUp(this.signUpForm.value).subscribe({
        next: (response) => {
          if (response.message == 'Done') {
            this.isLoading = false
            this.checked = true
          }
        },
        error: (err) => {
          this.isLoading = false
          this.errMessage = err.error.message
        }
      })
    }
  }

  signInWithGoogle(idToken: string) {
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
      this.signInWithGoogle(user.idToken)
    })

  }

}
