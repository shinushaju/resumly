import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

export interface Contact {
  type: string;
}

export interface ContactInfo {
  _id: string;
  type: string;
  link: string;
}

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css'],
})
export class ContactDialogComponent {
  contactForm: FormGroup;
  submitted = false;

  contactTypes: Contact[] = [
    { type: 'Linkedin' },
    { type: 'Twitter' },
    { type: 'Instagram' },
    { type: 'Facebook' },
    { type: 'Dribbble' },
    { type: 'Github' },
    { type: 'Behance' },
    { type: 'Figma' },
    { type: 'Gitlab' },
    { type: 'Bitbucket' },
  ];

  linkReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ContactInfo,
    @Inject(FormBuilder) public fb: FormBuilder
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      type: ['', [Validators.required]],
      link: ['', [Validators.required, Validators.pattern(this.linkReg)]],
    });
  }

  get contactFormControl() {
    return this.contactForm.controls;
  }

  doAction() {
    if (this.contactForm.valid || this.action === 'Delete') {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
