import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../services/auth-service';
import { PasswordKeyBoard } from "../commons/password-key-board/password-key-board";
import { disabled, form, FormField, maxLength, minLength, readonly, required, validateHttp } from '@angular/forms/signals';
import { LoginForm } from '../models/login-form';

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
    required(schemaPath.clientCode, { message: "Client code is required" }),
      required(schemaPath.password, { message: "Password is required" }),
      maxLength(schemaPath.clientCode, 8, { message: "Client code should be 8 characters long" }),
      maxLength(schemaPath.password, 6, { message: "Password should be 6 characters long" }),
      minLength(schemaPath.clientCode, 8, { message: "Client code should be 8 characters long" }),
      minLength(schemaPath.password, 6, { message: "Password should be 6 characters long" })
  });
  constructor(private readonly authService: AuthService) { }

  handleDigitInput(input: number) {
    this.loginForm.password().value.update(value => {
      if (value.length === 6) {
        return value
      }
      return value + input
    });
    this.loginForm.password().markAsTouched();
  }

  clearPassword() {
    this.loginForm.password().value.set('');
  }

  onSubmit(event: Event) {
    event.preventDefault()
    this.authService.login(this.loginModel());
  }
}
