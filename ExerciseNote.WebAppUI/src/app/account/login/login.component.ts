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
  loginForm: FormGroup = new FormGroup({});// EZ JÓ
  submitted = false;// EZ JÓ
  errorMessages: string[] = [];// EZ JÓ
 // returnUrl: string | null = null;

  constructor(private accountService: AccountService,//EZJO
    private formBuilder: FormBuilder,
    private router: Router
  ){
    }

  ngOnInit(): void {// EZ JÓ
    this.initializeForm();
  }

  

  initializeForm() {// EZ JO
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  login() {
    this.submitted = true;// EZ JO
    this.errorMessages = [];// EZ JO

    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: error => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages.push(error.error);
          }
        }
      })
    }
  }
}
