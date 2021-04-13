import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AboutDialogComponent } from './dialog/about-dialog.component';
import { AboutService } from '../../../services/about.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

const aboutData: AboutInfo[] = [];

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  aboutDataSource = aboutData;

  constructor(
    public dialog: MatDialog,
    private aboutService: AboutService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.aboutService.getInfo().subscribe((data) => {
      this.aboutDataSource = JSON.parse(JSON.stringify(data));
    });
  }

  openDialog(action: any, objData: any) {
    objData.action = action;
    const dialogRef = this.dialog.open(AboutDialogComponent, {
      width: '300px',
      data: objData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Update') {
        this.updateData(result.data, result.data._id);
      }
    });
  }

  updateData(payload: any, id: string) {
    const newData = payload;
    delete newData['action'];
    this.aboutDataSource = this.aboutDataSource.filter((value, key) => {
      if (value._id == id) {
        // send updated data to db
        this.aboutService.updateInfo(id, newData);
      }
      return true;
    });
    // reloads component
    setTimeout(() => {
      this._snackBar.open('Info Updated Successfully!', '', {
        duration: 3500,
        panelClass: ['custom-snackbar'],
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./myprofile']);
    }, 1000);
  }
}
