import { Injectable } from '@angular/core';
import { WebapiRequestService } from './webapi-request.service';

export interface Tags {
  tagName: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  tags: Tags[] = [];

  projectInfo = {
    projectName: '',
    url: '',
    description: '',
    projectTags: this.tags,
  };

  constructor(private webApiService: WebapiRequestService) {}

  getProjectList() {
    return this.webApiService.get('projects');
  }

  createProject(projectInfo: any) {
    return this.webApiService.post('projects', { projectInfo });
  }

  updateProject(id: string, projectInfo: any) {
    return this.webApiService.patch(`projects/${id}`, { projectInfo });
  }

  deleteProject(id: string) {
    return this.webApiService.delete(`./projects/${id}`);
  }
}
