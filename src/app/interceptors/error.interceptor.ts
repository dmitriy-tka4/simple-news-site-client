import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, finalize, Observable, retry, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private errorService: ErrorService,
    private toastrService: ToastrService
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('request', request);

    return next.handle(request)
      .pipe(
        // delay(2000),
        // retry(1),
        catchError((error: HttpErrorResponse) => {
          // console.log('error in interceptor', error);

          // можно обрабатывать ошибки в зависимости от статуса ответа
          // this.errorService.handleError(`${error.name} (${error.status ? error.status : ''}): ${error.error} - ${error.message}`);

          this.toastrService.error(error.error);

          return throwError(() => {
            // return error;

            // не передаем в обработчик детали ошибки, генерируем свою
            return new Error('Запрос завершился с ошибкой')
          });
        }),
        finalize(() => {
          console.log('finalize');
        })
      );
  }
}
