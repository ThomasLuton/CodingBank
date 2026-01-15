import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from '../models/login-form';
import { TokenInfo } from '../models/token-info';
import { catchError, map, Observable } from 'rxjs';
import { RegisterForm } from '../models/register-form';
import { UserInfo } from '../models/user-info';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = "token";
  private readonly URL = environment.api + "auth"

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey)
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(form: LoginForm): void {
    this.http.post<TokenInfo>(this.URL + "/login", form)
      .subscribe((res) => {
        localStorage.setItem(this.tokenKey, res.jwt)
        this.router.navigate(["home"])
      })
  }

  register(form: RegisterForm): void {
    this.http.post<TokenInfo>(this.URL + "/register", form)
      .subscribe((res) => {
        localStorage.setItem(this.tokenKey, res.jwt)
        this.router.navigate(["home"])
      })
  }

  disconnect(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(["login"])
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.URL + "/current-user")
  }
}
