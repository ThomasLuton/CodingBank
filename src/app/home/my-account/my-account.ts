import { AfterViewInit, Component, inject, effect, signal, WritableSignal, computed, linkedSignal, viewChild, ElementRef } from '@angular/core';
import { AccountService } from '../../services/account-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Account } from '../../models/account';
import { RouterLink } from "@angular/router";
import { Transaction } from '../../models/transaction';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FirstLetterPipe } from '../../first-letter-pipe';

@Component({
  selector: 'app-my-account',
  imports: [RouterLink, DatePipe, FirstLetterPipe, CurrencyPipe],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})
export class MyAccount {

  private readonly accountService = inject(AccountService);
  accounts = toSignal<Account[]>(this.accountService.getAccounts());
  selectedAccount = linkedSignal(() => this.accounts()?.[0])
  transactions = signal<Transaction[]>([]);
  fiveTransactions = computed(() => {
    if (this.transactions().length < 5) {
      return this.transactions();
    }
    const tmp = [];
    for (let i = 0; i < 5; i++) {
      tmp.push(this.transactions()[i])
    }
    return tmp;
  })

  constructor() {
    effect(() => {
      if (this.selectedAccount() !== undefined) {
        const id = this.selectedAccount()?.id as string;
        this.accountService.getTransactions(id).subscribe((res) => {
          this.transactions.set(res);
        })
      }
    })
  }

  onSelect(index: string) {
    this.selectedAccount.set(this.accounts()?.[parseInt(index)]);
  }
}
