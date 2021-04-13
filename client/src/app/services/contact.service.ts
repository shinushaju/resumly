import { Injectable } from '@angular/core';
import { WebapiRequestService } from './webapi-request.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactInfo = {
    type: '',
    link: '',
  };

  constructor(private webApiService: WebapiRequestService) {}

  getInfo() {
    return this.webApiService.get('user/contact');
  }

  saveInfo(contactInfo: any) {
    return this.webApiService.post('user/contact', { contactInfo });
  }

  updateInfo(id: string, payload: any) {
    return this.webApiService.patch(`user/contact/${id}`, { payload });
  }

  deleteInfo(id: string) {
    return this.webApiService.delete(`user/contact/${id}`);
  }
}
