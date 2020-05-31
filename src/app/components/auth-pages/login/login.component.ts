import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from '../../../services/login.service';
import { UserData } from '.././../../interfaces/iAuthPages';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  private loginSubscription: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  public onLoginClick(): void {
    this.loginSubscription = this.loginService
      .loginCall(this.loginForm.value)
      .subscribe((res: any) => {
        if (res.status !=='error') {
          this.toastr.success('You can proceed now..', 'Login Successfull..!!');
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigateByUrl('/dashboard');
        } else {
          this.toastr.error(res.message,'Oops.!!')
        }
      }),
      (err) => {
        this.toastr.error('Somthing wrong', 'Oops.!!');
        console.log('Error', err);
      };
  }

  ngOnDestroy() {
    if(this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
