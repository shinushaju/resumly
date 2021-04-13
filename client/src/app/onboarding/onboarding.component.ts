import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';
import { AboutService } from '../services/about.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
})
export class OnboardingComponent implements OnInit {
  aboutDataSource: any;
  caseReg = '^[a-z0-9_-]+$';

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  fifthFormGroup!: FormGroup;
  submitted: false;

  constructor(
    private authService: AuthService,
    private _formBuilder: FormBuilder,
    private validationService: ValidationService,
    private aboutService: AboutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedin) {
      this.router.navigate(['./myprofile']);
    }

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern(this.caseReg),
        ],
        this.validationService.userNameValidator.bind(this.validationService),
      ],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', [Validators.required, Validators.maxLength(50)]],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', [Validators.required, Validators.maxLength(50)]],
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', [Validators.required, Validators.maxLength(50)]],
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', [Validators.required, Validators.maxLength(749)]],
    });
  }

  get firstFormControl() {
    return this.firstFormGroup.controls;
  }

  get secondFormControl() {
    return this.secondFormGroup.controls;
  }

  get thirdFormControl() {
    return this.thirdFormGroup.controls;
  }

  get fourthFormControl() {
    return this.fourthFormGroup.controls;
  }

  get fifthFormControl() {
    return this.fifthFormGroup.controls;
  }

  saveInfoAboutUser(
    element,
    message: string,
    username: string,
    fullName: string,
    designation: string,
    location: string,
    bio: string
  ) {
    element.textContent = message;
    element.disabled = true;
    let userInfo = {
      username,
      fullName,
      designation,
      location,
      bio,
    };

    // save user info to db and redirect to home
    this.aboutService.saveInfo(userInfo);
    setTimeout(() => {
      this.router.navigate(['./myprofile']);
    }, 1500);
  }
}
