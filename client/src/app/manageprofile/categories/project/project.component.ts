import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { ProjectDialogComponent } from './dialog/project-dialog.component';

export interface ProjectInfo {
  _id: string;
  projectCover: string;
  imageType: string;
  projectDate: string;
  projectName: string;
  url: string;
  description: string;
}

const projectData: ProjectInfo[] = [];

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projectDataSource = projectData;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectService.getInfo().subscribe((data) => {
      this.projectDataSource = JSON.parse(JSON.stringify(data));
    });
  }

  openDialog(action: any, objData: any) {
    objData.action = action;
    console.log(objData);
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
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
    const newData = payload;
    delete newData['action'];
    // save data to db
    this.projectDataSource = JSON.parse(JSON.stringify(newData));
    this.projectService.saveInfo(this.projectDataSource);
    // reloads component
    setTimeout(() => {
      this._snackBar.open('Project Added Successfully!', '', {
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
    this.projectDataSource = this.projectDataSource.filter((value, key) => {
      if (value._id == id) {
        // send updated data to db
        this.projectService.updateInfo(id, newData);
      }
      return true;
    });
    // reloads component
    setTimeout(() => {
      this._snackBar.open('Project Updated Successfully!', '', {
        duration: 3500,
        panelClass: ['custom-snackbar'],
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./myprofile']);
    }, 1500);
  }

  deleteData(id: string) {
    this.projectDataSource = this.projectDataSource.filter((value, key) => {
      if (value._id == id) {
        // delete data from db
        this.projectService.deleteInfo(id);
      }
      return true;
    });
    // reloads component
    setTimeout(() => {
      this._snackBar.open('Project Deleted Successfully!', '', {
        duration: 3500,
        panelClass: ['custom-snackbar'],
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./myprofile']);
    }, 1500);
  }
}
