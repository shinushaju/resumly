import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExperienceService } from '../../../services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  experienceInfo = [
    {
      title: '',
      type: '',
      companyName: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ];
  constructor(
    public dialog: MatDialog,
    private experienceService: ExperienceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.experienceService.getExperienceList().subscribe((data) => {
      this.experienceInfo = JSON.parse(JSON.stringify(data));
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddExperienceComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result.experience);
      this.experienceInfo = JSON.parse(JSON.stringify(result.experience));
      this.experienceService.createExperience(this.experienceInfo);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./myprofile']);
    });
  }
}

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.html',
  styleUrls: ['./experience.component.css'],
})
export class AddExperienceComponent {
  title: string = '';
  type: string = '';
  companyName: string = '';
  location: string = '';
  startDate: string = '';
  endDate: string = '';
  description: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddExperienceComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public experience: any
  ) {}

  closeDialog() {
    this.dialogRef.close({
      experience: {
        title: this.title,
        type: this.type,
        companyName: this.companyName,
        location: this.location,
        startDate: this.startDate,
        endDate: this.endDate,
        description: this.description,
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
