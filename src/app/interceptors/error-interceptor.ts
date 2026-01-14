import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err, cautgh) => {
      console.log("Catch !")
      return next(req);
    })
  )
};
