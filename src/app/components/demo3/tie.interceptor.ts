import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TieInterceptor implements HttpInterceptor {

  constructor(
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token')
    if(token != '') {
      let clone = request.clone({setHeaders : {'Authorization' : 'bearer '+token}})
      return next.handle(clone)
    }
    return next.handle(request);
  }
}
