import { Injectable } from '@angular/core';
import { WebapiRequestService } from './webapi-request.service';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  aboutInfo = {
    username: '',
    fullName: '',
    designation: '',
    location: '',
    bio: '',
  };

  constructor(private webApiService: WebapiRequestService) {}

  getUserNames() {
    return this.webApiService.get('users');
  }

  getUserName() {
    return this.webApiService.get('user/username');
  }

  getEmails() {
    return this.webApiService.get('emails');
  }

  getEmail() {
    return this.webApiService.get('user/email');
  }

  getInfo() {
    return this.webApiService.get('user/about');
  }

  saveInfo(aboutInfo: any) {
    return this.webApiService.post('user/about', { aboutInfo });
  }

  updateEmail(id: string, payload: any) {
    return this.webApiService.patch(`user/${id}/credentials`, { payload });
  }

  updateInfo(id: string, payload: any) {
    return this.webApiService.patch(`user/about/${id}`, { payload });
  }

  deleteAccount(id: string) {
    return this.webApiService.delete(`user/${id}`);
  }
}
