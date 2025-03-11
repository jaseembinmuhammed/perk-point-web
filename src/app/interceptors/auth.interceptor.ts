import { HttpInterceptorFn } from '@angular/common/http';
import { AuthResponse } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Retrieve the token from localStorage
  let token;
  const authData = localStorage.getItem('authToken');
  if (authData) {
    let userInfo: AuthResponse = JSON.parse(authData);
    token = userInfo.jwt;
  }

  // Clone the request and attach the Authorization header if the token exists
  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      })
    : req;

  // Forward the modified request
  return next(authReq);
};
