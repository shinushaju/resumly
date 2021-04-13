import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
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
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        Validators.compose([
          Validators.required,
          this.validationService.patternValidator(),
        ]),
      ],
      checkbox: ['', Validators.requiredTrue],
    });
  }

  get signupFormControl() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      this.authService
        .signup(this.signupForm.value.email, this.signupForm.value.password)
        .subscribe(
          (res: HttpResponse<any>) => {
            // successfully signed up
            this.router.navigate(['/start']);
          },
          (error: HttpErrorResponse) => {
            this.error = error.error.msg;
          }
        );
    }
  }
}
