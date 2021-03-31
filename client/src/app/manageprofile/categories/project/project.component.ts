import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';

export interface Tags {
  name: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  tags: Tags[] = [];

  projectInfo = [
    {
      projectName: '',
      url: '',
      description: '',
      projectTags: this.tags,
    },
  ];
  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectService.getProjectList().subscribe((data) => {
      this.projectInfo = JSON.parse(JSON.stringify(data));
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result.project);
      this.projectInfo = JSON.parse(JSON.stringify(result.project));
      this.projectService.createProject(this.projectInfo);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./myprofile']);
    });
  }
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.html',
  styleUrls: ['./project.component.css'],
})
export class AddProjectComponent {

  @ViewChild('myPond') myPond: any;

  pondOptions = {
    class: 'my-filepond',
    multiple: true,
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'image/jpeg, image/png'
  }

  pondFiles = [
    'index.html'
  ]

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
  }
  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  projectName: string = '';
  url: string = '';
  description: string = '';
  tags: Tags[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public project: any
  ) {}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tags): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  closeDialog() {
    this.dialogRef.close({
      project: {
        projectName: this.projectName,
        url: this.url,
        description: this.description,
        projectTags: this.tags,
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
