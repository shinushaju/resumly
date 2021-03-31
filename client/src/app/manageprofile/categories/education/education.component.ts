import { Component, OnInit, Optional, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EducationService } from '../../../services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  educationInfo = [
    {
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      grade: '',
    },
  ];

  constructor(
    public dialog: MatDialog,
    private educationService: EducationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.educationService.getEducationList().subscribe((data) => {
      this.educationInfo = JSON.parse(JSON.stringify(data));
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEducationComponent, {
      width: '360px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result.education);
      this.educationInfo = JSON.parse(JSON.stringify(result.education));
      this.educationService.createEducation(this.educationInfo);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./myprofile']);
    });
  }

  /*
  deleteEducationItem(educationItem: any) {
    this.educationService.deleteEducation(educationItem._id)
    .subscribe(() => {
      this.educationInfo = this.educationInfo.filter(item => item !== educationItem);
    })
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./myprofile']);
  }*/
}

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.html',
  styleUrls: ['./education.component.css'],
})
export class AddEducationComponent {
  school: string = '';
  degree: string = '';
  fieldOfStudy: string = '';
  startDate: string = '';
  endDate: string = '';
  grade: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddEducationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public education: any
  ) {}

  closeDialog() {
    this.dialogRef.close({
      education: {
        school: this.school,
        degree: this.degree,
        fieldOfStudy: this.fieldOfStudy,
        startDate: this.startDate,
        endDate: this.endDate,
        grade: this.grade,
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
