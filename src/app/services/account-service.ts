import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { OpenAccountForm } from '../models/open-account-form';
import { Router } from '@angular/router';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly URL = "https://coding-bank.fly.dev/accounts"
  private readonly router = inject(Router)

  constructor(
    private readonly http: HttpClient,
  ) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.URL);
  }

  getAccount(id: string): Observable<Account> {
    return this.http.get<Account>(this.URL + "/" + id);
  }

  openAccount(form: OpenAccountForm): void {
    this.http.post<Account>(this.URL, form)
      .subscribe((res) => {
        this.router.navigate(["/home/accounts/" + res.id])
      })
  }

  getTransactions(id: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.URL + "/" + id + "/transactions")
  }
}
