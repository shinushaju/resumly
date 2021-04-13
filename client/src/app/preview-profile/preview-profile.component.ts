import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PreviewProfileService } from '../services/preview-profile.service';

@Component({
  selector: 'app-preview-profile',
  templateUrl: './preview-profile.component.html',
  styleUrls: ['./preview-profile.component.css'],
})
export class PreviewProfileComponent implements OnInit {
  aboutDataSource: any;
  projectDataSource: any;
  educationDataSource: any;
  experienceDataSource: any;
  contactDataSource: any;
  userId: string = '';

  constructor(
    private previewProfileService: PreviewProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.username) {
        this.previewProfileService
          .getAboutInfo(params.username)
          .subscribe((data) => {
            this.aboutDataSource = JSON.parse(JSON.stringify(data));
            if (
              this.aboutDataSource == null ||
              this.aboutDataSource == [] ||
              this.aboutDataSource == '' ||
              this.aboutDataSource.length === 0
            ) {
              this.router.navigate(['./myprofile']);
            }
            this.userId = this.aboutDataSource._userId;

            this.previewProfileService
              .getEducationInfo(this.userId)
              .subscribe((data) => {
                this.educationDataSource = JSON.parse(JSON.stringify(data));
              });

            this.previewProfileService
              .getExperienceInfo(this.userId)
              .subscribe((data) => {
                this.experienceDataSource = JSON.parse(JSON.stringify(data));
              });

            this.previewProfileService
              .getProjectInfo(this.userId)
              .subscribe((data) => {
                this.projectDataSource = JSON.parse(JSON.stringify(data));
              });

            this.previewProfileService
              .getContactInfo(this.userId)
              .subscribe((data) => {
                this.contactDataSource = JSON.parse(JSON.stringify(data));
              });
          });
      }
    });
  }
}
