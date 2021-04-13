import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AboutService } from './about.service';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  resumlyUsers: any;
  userName: any;
  current_user: any;

  constructor(private aboutService: AboutService) {}

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  userNameValidator(userControl: AbstractControl) {
    this.current_user = '';
    this.aboutService.getUserNames().subscribe((data) => {
      this.resumlyUsers = JSON.parse(JSON.stringify(data));
    });

    let Users = this.resumlyUsers.map((user) => user.username);

    return new Promise((resolve) => {
      if (this.validateUserName(userControl.value, Users)) {
        resolve({ userNameNotAvailable: true });
      } else {
        resolve(null);
      }
    });
  }

  validateUserName(userName: string, usernamesArr: any) {
    let UserList = usernamesArr;
    return UserList.indexOf(userName) > -1;
  }
}
