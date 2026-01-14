import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { AccountService } from '../../services/account-service';
import { Account } from '../../models/account';
import { Transaction } from '../../models/transaction';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FirstLetterPipe } from '../../first-letter-pipe';

@Component({
  selector: 'app-transaction-list',
  imports: [RouterLink, DatePipe, CurrencyPipe, FirstLetterPipe],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList {
  private readonly accountService = inject(AccountService);
  private readonly route = inject(ActivatedRoute);
  readonly accountId = computed<string>(() => {
    const id = this.route.snapshot.paramMap.get("accountId")
    if (id !== null) {
      return id;
    }
    return "";
  })
  transactions = toSignal(this.accountService.getTransactions(this.accountId()));
}
