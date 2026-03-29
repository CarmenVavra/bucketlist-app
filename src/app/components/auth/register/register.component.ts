import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLabel, MatHint } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from '../services/auth-service.service';
import { first } from 'rxjs';
import { RegisterUser } from '../models/auth.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatLabel,
    MatInputModule, MatNativeDateModule, MatHint, MatDatepickerModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [provideNativeDateAdapter()],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

  public passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/

  readonly registerUser = signal<RegisterUser>({
    id: -1,
    nickname: '',
    email: '',
    password: '',
    passwordRep: '',
  });

  #authService = inject(AuthService);

  registerForm = new FormGroup({
    nickname: new FormControl('', [Validators.required]),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    passwordRep: new FormControl('', [Validators.required]),
    birthdate: new FormControl(''),
    street: new FormControl(''),
    zip: new FormControl('', [Validators.minLength(4), Validators.maxLength(6)]),
    place: new FormControl(''),
    phone: new FormControl(''),
  });

  onSubmit() {
    const pwCheck = this.comparePasswords(this.registerForm.value.password, this.registerForm.value.passwordRep);
    if (pwCheck) {
      this.registerUser.set(this.registerForm.getRawValue());
      this.#authService.register(this.registerUser()).pipe(first()).subscribe((registerUser) => {
        console.log('registerUser', registerUser);
      });
    } else {
      this.registerForm.controls.password.reset();
      this.registerForm.controls.passwordRep.reset();
      console.log('Die Passwörter stimmen nicht überein!');
    }
  }

  private comparePasswords(pw1: any, pw2: any) {
    return pw1 === pw2;
  }


}
