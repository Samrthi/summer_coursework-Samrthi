import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {NotificationService} from "./notification.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
        catchError(error => {
          if (error.error instanceof ErrorEvent) {
              // Client-side errors
              this.notificationService.error$.next('Error: ' + error.message)
          } else {
              // Server-side errors
              this.notificationService.error$.next('Error: ' + error.error)
          }
          return of([]);
        }
      )
    )
  }
}
