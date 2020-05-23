import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { UserData } from '.././../../interfaces/iAuthPages';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      fullAddress: ['', Validators.required],
      city: ['', Validators.required],
      landmark: [''],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  public onRegisterClick(): void {
    // alert(this.loginForm.controls['userName'].value);
    const tempPayload = this.getLoginPayload();
    this.loginService.registrationCall(tempPayload).subscribe((res) => {
      if (res) {
        this.toastr.success('Proceed with login.', 'Account Registered..!!');
        this.router.navigateByUrl('/login');
      } else {
      }
    }),
      (err) => {
        this.toastr.error('Somthing wrong', 'Oops.!!');
        console.log('Error', err);
      };
  }

  public getLoginPayload(): UserData {
    return {
      fName: this.registerForm.controls['fullName'].value,
      mobile: this.registerForm.controls['phoneNumber'].value,
      password: this.registerForm.controls['password'].value,
      userType: 'CUSTOMER',
      // addresses: [
      //   {
      //     full_address: this.registerForm.controls['fullAddress'].value,
      //     city: this.registerForm.controls['city'].value,
      //     landmark: this.registerForm.controls['landmark'].value,
      //     latitude: '',
      //     longitude: '',
      //   },
      // ]
    };
  }
}
