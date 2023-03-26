import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from "../../../environments/environment";

import {NzMessageService} from "ng-zorro-antd/message";

import {AuthService} from "../services/auth.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private message: NzMessageService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      url: environment.apiUrl + request.url
    })

    if (this.authService.isLogged) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.message.create('error', 'Вам необходимо авторизоваться')
        }
        return throwError(error);
      })
    );
  }
}
