import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';
import { AuthService } from '../services/auth.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  hide = true;
  submitted = false;
  error: any;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        Validators.compose([
          Validators.required,
          this.validationService.patternValidator(),
        ]),
      ],
    });
  }

  get signinFormControl() {
    return this.signinForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signinForm.valid) {
      this.authService
        .login(this.signinForm.value.email, this.signinForm.value.password)
        .subscribe(
          (res: HttpResponse<any>) => {
            if (res.status === 200) {
              //  on getting logged in successfully
              this.router.navigate(['/myprofile']);
            }
          },
          (error: HttpErrorResponse) => {
            this.error = error.error.msg;
          }
        );
    }
  }
}
