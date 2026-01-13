import { AfterViewInit, Component, inject, effect, signal, WritableSignal, computed, linkedSignal, viewChild, ElementRef } from '@angular/core';
import { AccountService } from '../../services/account-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Account } from '../../models/account';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-my-account',
  imports: [RouterLink],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})
export class MyAccount {

  private readonly accountService = inject(AccountService);
  accounts = toSignal<Account[]>(this.accountService.getAccounts());
  selectedAccount = linkedSignal(() => this.accounts()?.[0])

  onSelect(index: string) {
    this.selectedAccount.set(this.accounts()?.[parseInt(index)]);
  }

}
