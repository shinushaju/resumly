import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

export interface EducationInfo {
  _id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
}

@Component({
  selector: 'app-education-dialog',
  templateUrl: './education-dialog.component.html',
  styleUrls: ['./education-dialog.component.css'],
})
export class EducationDialogComponent {
  educationForm: FormGroup;
  submitted = false;

  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<EducationDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: EducationInfo,
    @Inject(FormBuilder) public fb: FormBuilder
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
    this.educationForm = this.fb.group({
      school: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      fieldOfStudy: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      grade: [''],
    });
  }

  get educationFormControl() {
    return this.educationForm.controls;
  }

  doAction() {
    if (this.educationForm.valid || this.action === 'Delete') {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
