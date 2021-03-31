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

  getEducationList() {
    return this.webApiService.get('education');
  }

  createEducation(educationInfo: any) {
    return this.webApiService.post('education', { educationInfo });
  }

  updateEducation(id: string, educationInfo: any) {
    return this.webApiService.patch(`education/${id}`, { educationInfo });
  }

  deleteEducation(id: string) {
    return this.webApiService.delete(`./education/${id}`);
  }
}
