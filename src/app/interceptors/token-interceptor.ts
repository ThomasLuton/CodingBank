import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    const reqWithToken = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authService.getToken())
    });
    return next(reqWithToken);
  }
  return next(req);
};
