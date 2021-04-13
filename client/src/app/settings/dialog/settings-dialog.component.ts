import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css'],
})
export class SettingsDialogComponent {
  emailForm: FormGroup;
  usernameForm: FormGroup;
  submitted = false;
  caseReg = '^[a-z0-9_-]+$';

  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) public fb: FormBuilder,
    private validationService: ValidationService
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.usernameForm = this.fb.group({
      username: [
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
  }

  get emailFormControl() {
    return this.emailForm.controls;
  }

  get usernameFormControl() {
    return this.usernameForm.controls;
  }

  doAction() {
    this.submitted = true;
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
