import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExperienceService } from '../../../services/experience.service';
import { ExperienceDialogComponent } from './dialog/experience-dialog.component';

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

const experienceData: ExperienceInfo[] = [];

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  experienceDataSource = experienceData;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private experienceService: ExperienceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.experienceService.getInfo().subscribe((data) => {
      this.experienceDataSource = JSON.parse(JSON.stringify(data));
    });
  }

  openDialog(action: any, objData: any) {
    objData.action = action;
    const dialogRef = this.dialog.open(ExperienceDialogComponent, {
      width: '300px',
      data: objData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Add') {
        this.saveData(result.data);
      } else if (result.event == 'Update') {
        this.updateData(result.data, result.data._id);
      } else if (result.event == 'Delete') {
        this.deleteData(result.data._id);
      }
    });
  }

  saveData(payload: any) {
    // save data to db
    this.experienceDataSource = JSON.parse(JSON.stringify(payload));
    this.experienceService.saveInfo(this.experienceDataSource);
    // reloads component
    setTimeout(() => {
      this._snackBar.open('Experience Added Successfully!', '', {
        duration: 3500,
        panelClass: ['custom-snackbar'],
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./myprofile']);
    }, 1500);
  }

  updateData(payload: any, id: string) {
    const newData = payload;
    delete newData['action'];
    this.experienceDataSource = this.experienceDataSource.filter(
      (value, key) => {
        if (value._id == id) {
          // send updated data to db
          this.experienceService.updateInfo(id, newData);
        }
        return true;
      }
    );
    // reloads component
    setTimeout(() => {
      this._snackBar.open('Experience Updated Successfully!', '', {
        duration: 3500,
        panelClass: ['custom-snackbar'],
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./myprofile']);
    }, 1500);
  }

  deleteData(id: string) {
    this.experienceDataSource = this.experienceDataSource.filter(
      (value, key) => {
        if (value._id == id) {
          // delete data from db
          this.experienceService.deleteInfo(id);
        }
        return true;
      }
    );
    // reloads component
    setTimeout(() => {
      this._snackBar.open('Experience Deleted Successfully!', '', {
        duration: 3500,
        panelClass: ['custom-snackbar'],
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./myprofile']);
    }, 1500);
  }
}
