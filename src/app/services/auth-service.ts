import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from '../models/login-form';
import { TokenInfo } from '../models/token-info';
import { catchError, map, Observable } from 'rxjs';
import { RegisterForm } from '../models/register-form';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = "token";
  private readonly URL = "https://coding-bank.fly.dev"

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey)
    return !!token;
  }

  login(form: LoginForm): void {
    this.http.post<TokenInfo>(this.URL + "/auth/login", form)
      .subscribe((res) => {
        localStorage.setItem(this.tokenKey, res.jwt)
        this.router.navigate(["home"])
      })
  }

  register(form: RegisterForm): void {
    this.http.post<TokenInfo>(this.URL + "/auth/register", form)
      .subscribe((res) => {
        localStorage.setItem(this.tokenKey, res.jwt)
        this.router.navigate(["home"])
      })
  }

  disconnect(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(["login"])
  }
}
