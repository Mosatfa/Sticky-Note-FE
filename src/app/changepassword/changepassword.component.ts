import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  showPassword: boolean = false
  errMessage: string = '';
  errConfirmPassword: boolean = false;
  isLoading: boolean = false

  changePassForm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.pattern(/^[0-9]{5}$/), Validators.required]),
    newPassword: new FormControl(null, [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required]),
    cPassword: new FormControl(null, [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required])
  })

  changePassword() {
    this.errConfirmPassword = this.changePassForm.value.newPassword != this.changePassForm.value.cpassword ? true : false
    if (this.changePassForm.valid) {
      this.isLoading = true
      this._AuthService.requestChangePassword(this.changePassForm.value).subscribe({
        next: (response) => {
          if (response.message == 'Done') {
            this.isLoading = false
            this._Router.navigate(['/login'])
          }
        },
        error: (err) => {
          this.isLoading = false
          this.errMessage = err.error.message
        }
      })
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  constructor(private _AuthService: AuthService, private _Router: Router) { }

  ngOnInit(): void {
  }

}
