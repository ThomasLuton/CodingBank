import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PasswordKeyBoard } from '../commons/password-key-board/password-key-board';
import { AuthService } from '../services/auth-service';
import { FormField, disabled, form, maxLength, minLength, required } from '@angular/forms/signals';
import { RegisterForm } from '../models/register-form';
import { every } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [RouterLink, PasswordKeyBoard, FormField],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerModel = signal<RegisterForm>({
    name: '',
    password: ''
  })
  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.name, { message: "Name is required" }),
      required(schemaPath.password, { message: "Password is required" }),
      maxLength(schemaPath.password, 6, { message: "Password should be 6 characters long" }),
      minLength(schemaPath.password, 6, { message: "Password should be 6 characters long" })
  });
  constructor(private readonly authService: AuthService) { }

  handleDigitInput(input: number) {
    this.registerForm.password().value.update(value => {
      if (value.length === 6) {
        return value
      }
      return value + input
    });
    this.registerForm.password().markAsTouched();
  }
  clearPassword() {
    this.registerForm.password().value.set('');
  }
  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.authService.register(this.registerModel());
  }

}
