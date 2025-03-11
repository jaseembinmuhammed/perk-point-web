import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  login(payload: any) {
    const url = 'http://localhost:8080/perkpoint/api/v1/auth/login';
    // const body = {
    //   email: 'jas',
    //   password: '123lk',
    // };

    return this.http.post<AuthResponse>(url, payload);
  }
}

export interface AuthResponse {
  jwt: string;
  principal: Principal;
}

export interface Principal {
  name: string;
  email: string;
  roles: string[];
}
