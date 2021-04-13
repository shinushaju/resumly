import { Injectable } from '@angular/core';
import { WebapiRequestService } from './webapi-request.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectInfo = {
    projectCover: '',
    imageType: '',
    projectDate: '',
    projectName: '',
    url: '',
    description: '',
  };

  constructor(private webApiService: WebapiRequestService) {}

  getInfo() {
    return this.webApiService.get('user/projects');
  }

  saveInfo(projectInfo: any) {
    return this.webApiService.post('user/projects', { projectInfo });
  }

  updateInfo(id: string, payload: any) {
    return this.webApiService.patch(`user/projects/${id}`, { payload });
  }

  deleteInfo(id: string) {
    return this.webApiService.delete(`user/projects/${id}`);
  }
}
