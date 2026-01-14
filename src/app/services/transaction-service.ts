import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SendTransactionDTO } from '../models/sendTransactionDTO';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  private readonly URL = "https://coding-bank.fly.dev/transactions"
  private readonly http = inject(HttpClient)
  private readonly router = inject(Router)

  emit(transaction: SendTransactionDTO): void {
    this.http.post<Transaction>(this.URL + "/emit", transaction).subscribe((res) => {
      this.router.navigate(["home/transactions/" + res.emitter.id + "/" + res.id])
    })
  }

  cancel(id: string): void {
    this.http.post<Transaction>(this.URL + "/" + id + "/cancel", id).subscribe((res) => {
      this.router.navigate(["home"])
    })
  }
}
