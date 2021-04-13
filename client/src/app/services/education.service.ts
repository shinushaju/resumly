import { Injectable } from '@angular/core';
import { WebapiRequestService } from './webapi-request.service';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  educationInfo = {
    school: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: '',
  };

  constructor(private webApiService: WebapiRequestService) {}

  getInfo() {
    return this.webApiService.get('user/education');
  }

  saveInfo(educationInfo: any) {
    return this.webApiService.post('user/education', { educationInfo });
  }

  updateInfo(id: string, payload: any) {
    return this.webApiService.patch(`user/education/${id}`, { payload });
  }

  deleteInfo(id: string) {
    return this.webApiService.delete(`user/education/${id}`);
  }
}
