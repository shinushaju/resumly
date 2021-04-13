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

  getInfo() {
    return this.webApiService.get('user/experience');
  }

  saveInfo(experienceInfo: any) {
    return this.webApiService.post('user/experience', { experienceInfo });
  }

  updateInfo(id: string, payload: any) {
    return this.webApiService.patch(`user/experience/${id}`, { payload });
  }

  deleteInfo(id: string) {
    return this.webApiService.delete(`user/experience/${id}`);
  }
}
