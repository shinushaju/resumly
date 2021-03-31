import { Injectable } from '@angular/core';
import { WebapiRequestService } from './webapi-request.service';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  experienceInfo = {
    title: '',
    type: '',
    companyName: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  };

  constructor(private webApiService: WebapiRequestService) {}

  getExperienceList() {
    return this.webApiService.get('experience');
  }

  createExperience(experienceInfo: any) {
    return this.webApiService.post('experience', { experienceInfo });
  }

  updateExperience(id: string, experienceInfo: any) {
    return this.webApiService.patch(`experience/${id}`, { experienceInfo });
  }

  deleteExperience(id: string) {
    return this.webApiService.delete(`./experience/${id}`);
  }
}
