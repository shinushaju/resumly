import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { WebapiRequestService } from './webapi-request.service';
import { Router } from '@angular/router';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedin = false;

  constructor(
    private webService: WebapiRequestService,
    private router: Router,
    private http: HttpClient
  ) {}

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      catchError(this.handleError),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(
          res.body._id,
          res.headers.get('x-access-token'),
          res.headers.get('x-refresh-token')
        );
        this.isLoggedin = true;
        console.log('USER LOGGED IN!');
      })
    );
  }

  signup(email: string, password: string) {
    return this.webService.signup(email, password).pipe(
      shareReplay(),
      catchError(this.handleError),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(
          res.body._id,
          res.headers.get('x-access-token'),
          res.headers.get('x-refresh-token')
        );
        this.isLoggedin = true;
        console.log('Successfully signed up and now logged in!');
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  logout() {
    this.removeSession();
    this.isLoggedin = false;
    console.log('Logged out!');
    this.router.navigate(['/']);
  }

  getAccessToken() {
    this.isLoggedin = true;
    return JSON.parse(JSON.stringify(localStorage.getItem('x-access-token')!));
  }

  getRefreshToken() {
    return JSON.parse(JSON.stringify(localStorage.getItem('x-refresh-token')!));
  }

  getUserId() {
    return JSON.parse(JSON.stringify(localStorage.getItem('user-id')!));
  }

  setAccessToken(accessToken: any) {
    localStorage.setItem('x-access-token', accessToken);
  }

  private setSession(userId: string, accessToken: any, refreshToken: any) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getNewAccessToken() {
    return this.http
      .get(`${this.webService.ROOT_URL}/user/access-token`, {
        headers: {
          'x-refresh-token': this.getRefreshToken(),
          _id: this.getUserId(),
        },
        observe: 'response',
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.headers.get('x-access-token'));
        })
      );
  }
}
