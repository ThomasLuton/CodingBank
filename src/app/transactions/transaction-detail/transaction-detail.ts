import { Component, computed, effect, inject, signal } from '@angular/core';
import { AccountService } from '../../services/account-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Transaction } from '../../models/transaction';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FirstLetterPipe } from '../../first-letter-pipe';
import { TransactionService } from '../../services/transaction-service';

@Component({
  selector: 'app-transaction-detail',
  imports: [RouterLink, DatePipe, CurrencyPipe, FirstLetterPipe],
  templateUrl: './transaction-detail.html',
  styleUrl: './transaction-detail.css',
})
export class TransactionDetail {
  private readonly accountService = inject(AccountService);
  private readonly transactionService = inject(TransactionService);
  private readonly route = inject(ActivatedRoute);
  readonly accountId = computed<string>(() => {
    const accountId = this.route.snapshot.paramMap.get("accountId")
    if (accountId !== null) {
      return accountId;
    }
    return "";
  })
  readonly transactionId = computed<string>(() => {
    const transactionId = this.route.snapshot.paramMap.get("transactionId");
    return transactionId !== null ? transactionId : "";
  })
  transactions = toSignal(this.accountService.getTransactions(this.accountId()));
  transaction = signal<Transaction | undefined>(undefined)

  constructor() {
    effect(() => {
      if (this.transactions() !== undefined) {
        this.transaction.set(this.transactions()?.filter(t => t.id === this.transactionId())[0])
      }
    })
  }

  cancel() {
    this.transactionService.cancel(this.transactionId())
  }
}
