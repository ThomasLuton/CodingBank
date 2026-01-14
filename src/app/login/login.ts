import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../services/auth-service';
import { PasswordKeyBoard } from "../commons/password-key-board/password-key-board";
import { disabled, form, FormField, maxLength, minLength, readonly, required, validateHttp } from '@angular/forms/signals';
import { LoginForm } from '../models/login-form';
import { min } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterLink, PasswordKeyBoard, FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {

  loginModel = signal<LoginForm>({
    clientCode: '',
    password: ''
  })
  loginForm = form(this.loginModel, (schemaPath) => {
    disabled(schemaPath.password),
      required(schemaPath.clientCode),
      required(schemaPath.password),
      maxLength(schemaPath.clientCode, 8),
      maxLength(schemaPath.password, 6),
      minLength(schemaPath.clientCode, 8),
      minLength(schemaPath.password, 6)
  });
  constructor(private readonly authService: AuthService) { }

  handleDigitInput(input: number) {
    this.loginForm.password().value.update(value => {
      if (value.length === 6) {
        return value
      }
      return value + input
    });
  }

  clearPassword() {
    this.loginForm.password().value.set('');
  }

  onSubmit(event: Event) {
    event.preventDefault()
    this.authService.login(this.loginModel());
  }
}
