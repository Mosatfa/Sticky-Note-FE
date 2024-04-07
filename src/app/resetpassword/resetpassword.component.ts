import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  errMessage: string = '';
  isLoading: boolean = false

  sendEmailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
  })

  sendEmail() {
    if (this.sendEmailForm.valid) {
      this.isLoading = true
      this._AuthService.requestResetPassword(this.sendEmailForm.value).subscribe({
        next: (res) => {
          if (res.message == 'Success') {
            this.isLoading = false

            this._Router.navigate(['change-password'])
          }
        },
        error: (err) => {
          this.isLoading = false
          this.errMessage = err.error.message
        }
      })
    }

  }
  constructor(private _AuthService: AuthService, private _Router: Router) { }

  ngOnInit(): void {
  }

}
