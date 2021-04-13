import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';

export interface AboutInfo {
  _id: string;
  username: string;
  displayImage: string;
  imageType: string;
  fullName: string;
  designation: string;
  location: string;
  bio: string;
}

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css'],
})
export class AboutDialogComponent {
  aboutForm: FormGroup;
  submitted = false;

  action: string;
  local_data: any;

  show: boolean = false;
  crop: boolean = true;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageType: string = '';
  imageData: string = '';

  fileChangeEvent(event: any): void {
    this.crop = true;
    this.show = true;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.imageType = this.croppedImage.substring(
      this.croppedImage.indexOf('/') + 1,
      this.croppedImage.indexOf(';')
    );
    this.imageData = this.croppedImage.split(',')[1];
  }

  cropImage() {
    this.crop = false;
    this.show = false;
  }

  constructor(
    public dialogRef: MatDialogRef<AboutDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AboutInfo,
    @Inject(FormBuilder) public fb: FormBuilder
  ) {
    this.local_data = { ...data };
    this.croppedImage = `data:image/${this.local_data.imageType};base64,${this.local_data.displayImage}`;
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
    this.aboutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      designation: ['', [Validators.required, Validators.maxLength(50)]],
      location: ['', [Validators.required, Validators.maxLength(50)]],
      bio: ['', [Validators.required, Validators.maxLength(749)]],
    });
  }

  get aboutFormControl() {
    return this.aboutForm.controls;
  }

  removeImage() {
    this.croppedImage = '';
    this.local_data.displayImage = '';
    this.local_data.imageType = '';
  }

  doAction() {
    if (this.imageData != '' && this.imageType != '') {
      this.local_data.displayImage = this.imageData;
      this.local_data.imageType = this.imageType;
    }
    this.submitted = true;
    if (this.aboutForm.valid) {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
