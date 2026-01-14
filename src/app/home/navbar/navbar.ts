import { Component, computed, input, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { UserInfo } from '../../models/user-info';
import { FirstLetterPipe } from '../../first-letter-pipe';

@Component({
  selector: 'app-navbar',
  imports: [FirstLetterPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isOpen = signal<boolean>(false);
  userInfo = input<UserInfo>();

  constructor(private readonly authService: AuthService) { }

  logOut(): void {
    this.authService.disconnect();
  }
}
