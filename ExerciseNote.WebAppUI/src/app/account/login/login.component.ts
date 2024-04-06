import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];
  returnUrl: string | null = null;
  constructor(private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
  ){
    }

  ngOnInit(): void {
   // this.initiazeGoogleButton();
    this.initializeForm();
  }

  

  initializeForm() {// EZ JO
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  login() {
    this.submitted = true;
    this.errorMessages = [];

   // if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: (response:any) => {
          /*if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigateByUrl('/');
          }*/
        },
        error: error => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages.push(error.error);
          }
        }
      })
  //  }
  }
}
