import { Component, OnInit } from '@angular/core';
import { AboutService } from '../services/about.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manageprofile',
  templateUrl: './manageprofile.component.html',
  styleUrls: ['./manageprofile.component.css'],
})
export class ManageprofileComponent implements OnInit {
  userInfo: any;
  value: any;

  constructor(
    private aboutService: AboutService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.aboutService.getInfo().subscribe((data) => {
      this.userInfo = JSON.parse(JSON.stringify(data));
      this.userInfo.forEach((value: any) => {
        const username = `http://resumly.herokuapp.com/${value.username}`;
        this.value = username;
      });
    });
  }

  openSnackBar() {
    this._snackBar.open('Profile URL Copied!', '', {
      duration: 2000,
      panelClass: ['custom-snackbar'],
    });
  }
}
