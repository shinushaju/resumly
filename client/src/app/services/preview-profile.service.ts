import { Injectable } from '@angular/core';
import { WebapiRequestService } from './webapi-request.service';

@Injectable({
  providedIn: 'root',
})
export class PreviewProfileService {
  constructor(private webApiService: WebapiRequestService) {}

  getAboutInfo(username: string) {
    return this.webApiService.get(`user/${username}/about`);
  }

  getProjectInfo(userId: string) {
    return this.webApiService.get(`user/${userId}/projects`);
  }

  getExperienceInfo(userId: string) {
    return this.webApiService.get(`user/${userId}/experience`);
  }

  getEducationInfo(userId: string) {
    return this.webApiService.get(`user/${userId}/education`);
  }

  getContactInfo(userId: string) {
    return this.webApiService.get(`user/${userId}/contacts`);
  }
}
