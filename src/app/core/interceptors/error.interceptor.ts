import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const router = inject(Router);
    const snackbar = inject(SnackbarService);

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          if (err.error.errors) {
            const modelStateErrors = [];

            for (const key in err.error.errors) {
              if (err.error.errors[key]) {
                modelStateErrors.push(err.error.errors[key]);
              }
            }
            throw modelStateErrors.flat();
          } else {
            snackbar.error(err.error.title || err.error);
          }
        }
        if (err.status === 401) {
          snackbar.error(err.error.title || err.error);
        }
        if (err.status === 403) {
          snackbar.error('Forbidden');
        }
        if (err.status === 404) {
          router.navigateByUrl('/not-found');
        }
        if (err.status === 500) {
          const navigationExtras: NavigationExtras = {
            state: { error: err.error },
          };
          router.navigateByUrl('/server-error', navigationExtras);
        }
        return throwError(() => err);
      })
    );
  }
}
