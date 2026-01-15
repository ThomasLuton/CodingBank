import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { ToastService } from '../services/toast-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  return next(req).pipe(
    catchError((err, cautgh) => {
      if (err.status === 40) {

      } else {
        toastService.error("Error from server, code : " + err.status);
      }
      return next(req);
    })
  )
};
