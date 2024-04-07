import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { take } from 'rxjs';
import { User } from '../../shared/models/account/user';

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

    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');// home pagera vissz  akk is h ha url bol akarnak megnyitni a login t
        } /*else {
          this.activatedRoute.queryParamMap.subscribe({
            next: (params: any) => {
              if (params) {
                this.returnUrl = params.get('returnUrl');
              }
            }
          })
        }*/
      }
    })

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
          this.router.navigateByUrl('/');// belepes utan home pagera vissz 
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
