import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EducationDialogComponent } from './dialog/education-dialog.component';
import { EducationService } from '../../../services/education.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface EducationInfo {
  _id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
}

const educationData: EducationInfo[] = [];

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  educationDataSource = educationData;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private educationService: EducationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.educationService.getInfo().subscribe((data) => {
      this.educationDataSource = JSON.parse(JSON.stringify(data));
    });
  }

  openDialog(action: any, objData: any) {
    objData.action = action;
    const dialogRef = this.dialog.open(EducationDialogComponent, {
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
    this.educationDataSource = JSON.parse(JSON.stringify(payload));
    this.educationService.saveInfo(this.educationDataSource);
    // reloads component
    setTimeout(() => {
      this._snackBar.open('Education Added Successfully!', '', {
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
    this.educationDataSource = this.educationDataSource.filter((value, key) => {
      if (value._id == id) {
        // send updated data to db
        this.educationService.updateInfo(id, newData);
      }
      return true;
    });
    // reloads component
    setTimeout(() => {
      this._snackBar.open('Education Updated Successfully!', '', {
        duration: 3500,
        panelClass: ['custom-snackbar'],
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./myprofile']);
    }, 1500);
  }

  deleteData(id: string) {
    this.educationDataSource = this.educationDataSource.filter((value, key) => {
      if (value._id == id) {
        // delete data from db
        this.educationService.deleteInfo(id);
      }
      return true;
    });
    // reloads component
    setTimeout(() => {
      this._snackBar.open('Education Deleted Successfully!', '', {
        duration: 3500,
        panelClass: ['custom-snackbar'],
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./myprofile']);
    }, 1500);
  }
}
