import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

export interface ExperienceInfo {
  _id: string;
  title: string;
  type: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

@Component({
  selector: 'app-experience-dialog',
  templateUrl: './experience-dialog.component.html',
  styleUrls: ['./experience-dialog.component.css'],
})
export class ExperienceDialogComponent {
  experienceForm: FormGroup;
  submitted = false;

  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<ExperienceDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ExperienceInfo,
    @Inject(FormBuilder) public fb: FormBuilder
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
    this.experienceForm = this.fb.group({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      location: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.maxLength(500)]],
    });
  }

  get experienceFormControl() {
    return this.experienceForm.controls;
  }

  doAction() {
    this.submitted = true;

    if (this.experienceForm.valid || this.action === 'Delete') {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
