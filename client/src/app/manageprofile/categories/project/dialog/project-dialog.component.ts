import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';

export interface ProjectInfo {
  _id: string;
  projectCover: string;
  imageType: string;
  projectDate: string;
  projectName: string;
  url: string;
  description: string;
}

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css'],
})
export class ProjectDialogComponent {
  projectForm: FormGroup;
  submitted = false;

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

  action: string;
  local_data: any;

  urlReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProjectInfo,
    @Inject(FormBuilder) public fb: FormBuilder
  ) {
    this.local_data = { ...data };
    this.croppedImage = `data:image/${this.local_data.imageType};base64,${this.local_data.projectCover}`;
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      projectDate: ['', [Validators.required]],
      projectName: ['', [Validators.required, Validators.maxLength(50)]],
      url: ['', [Validators.pattern(this.urlReg)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  get projectFormControl() {
    return this.projectForm.controls;
  }

  doAction() {
    if (this.imageData != '' && this.imageType != '') {
      this.local_data.projectCover = this.imageData;
      this.local_data.imageType = this.imageType;
    }
    this.submitted = true;
    if (this.projectForm.valid || this.action === 'Delete') {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
