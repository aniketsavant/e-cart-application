import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from '../../../services/login.service';
import { UserData } from '.././../../interfaces/iAuthPages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      credential: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  public onLoginClick(): void {
    this.loginService
      .loginCall(this.loginForm.value)
      .subscribe((res: UserData) => {
        if (res) {
          this.toastr.success('You can proceed now..', 'Login Successfull..!!');
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigateByUrl('/dashboard');
        } else {
        }
      }),
      (err) => {
        this.toastr.error('Somthing wrong', 'Oops.!!');
        console.log('Error', err);
      };
  }
}
