import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactDialogComponent } from './dialog/contact-dialog.component';
import { Router } from '@angular/router';
import { ContactService } from '../../../services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ContactInfo {
  _id: string;
  type: string;
  link: string;
}

const contactData: ContactInfo[] = [];

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactDataSource = contactData;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactService.getInfo().subscribe((data) => {
      this.contactDataSource = JSON.parse(JSON.stringify(data));
    });
  }

  openDialog(action: any, objData: any) {
    objData.action = action;
    const dialogRef = this.dialog.open(ContactDialogComponent, {
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
    this.contactDataSource = JSON.parse(JSON.stringify(payload));
    this.contactService.saveInfo(this.contactDataSource);
    // reloads component
    setTimeout(() => {
      this._snackBar.open('Contact Added Successfully!', '', {
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
    this.contactDataSource = this.contactDataSource.filter((value, key) => {
      if (value._id == id) {
        // send updated data to db
        this.contactService.updateInfo(id, newData);
      }
      return true;
    });
    // reloads component
    setTimeout(() => {
      this._snackBar.open('Contact Updated Successfully!', '', {
        duration: 3500,
        panelClass: ['custom-snackbar'],
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./myprofile']);
    }, 1500);
  }

  deleteData(id: string) {
    this.contactDataSource = this.contactDataSource.filter((value, key) => {
      if (value._id == id) {
        // delete data from db
        this.contactService.deleteInfo(id);
      }
      return true;
    });
    // reloads component
    setTimeout(() => {
      this._snackBar.open('Contact Deleted Successfully!', '', {
        duration: 3500,
        panelClass: ['custom-snackbar'],
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./myprofile']);
    }, 1500);
  }
}
