import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AboutService } from '../services/about.service';
import { AuthService } from '../services/auth.service';
import { SettingsDialogComponent } from './dialog/settings-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  userEmail: any;
  userName: any;

  constructor(
    private aboutService: AboutService,
    private authService: AuthService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.aboutService.getEmail().subscribe((data) => {
      this.userEmail = JSON.parse(JSON.stringify(data));
    });

    this.aboutService.getUserName().subscribe((data) => {
      this.userName = JSON.parse(JSON.stringify(data));
    });
  }

  openDialog(action: any, objData: any) {
    objData.action = action;
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '300px',
      data: objData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Change Email') {
        this.changeEmail(result.data, result.data._id);
      }
      if (result.event == 'Change Username') {
        this.changeUserName(result.data, result.data._id);
      }
      if (result.event == 'Delete Account') {
        this.deleteAccount(result.data._id);
      }
    });
  }

  changeEmail(payload: any, id: string) {
    const newData = payload;
    delete newData['action'];

    // send updated data to db
    this.aboutService.updateEmail(id, newData);

    setTimeout(() => {
      this._snackBar.open('Email Changed Successfully!', '', {
        duration: 3500,
        panelClass: ['custom-snackbar'],
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./settings']);
    }, 1500);
    return true;
  }

  changeUserName(payload: any, id: string) {
    const newData = payload;
    delete newData['action'];

    // send updated data to db
    this.aboutService.updateInfo(id, newData);

    setTimeout(() => {
      this._snackBar.open('Username Changed Successfully!', '', {
        duration: 3500,
        panelClass: ['custom-snackbar'],
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./settings']);
    }, 1500);
    return true;
  }

  deleteAccount(id: string) {
    this.aboutService.deleteAccount(id);
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
