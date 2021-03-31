import { Injectable } from '@angular/core';
import { WebapiRequestService } from './webapi-request.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(private webApiService: WebapiRequestService) { }

}
