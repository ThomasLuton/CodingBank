import { Component, computed, input, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { UserInfo } from '../../models/user-info';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isOpen = signal<boolean>(false);
  userInfo = input<UserInfo>();
  firstLetter = computed(() => this.userInfo()?.name.substring(0, 1).toUpperCase())

  constructor(private readonly authService: AuthService) { }

  logOut(): void {
    this.authService.disconnect();
  }
}
