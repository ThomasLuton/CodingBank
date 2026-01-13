import { Component, inject } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../services/auth-service';
import { RouterOutlet } from '@angular/router';
import { AccountService } from '../services/account-service';

@Component({
  selector: 'app-home',
  imports: [Navbar, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly authService = inject(AuthService);
  userInfo = toSignal(this.authService.getUserInfo());
}
