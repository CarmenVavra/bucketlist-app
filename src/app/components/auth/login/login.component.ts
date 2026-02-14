import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from "@angular/material/input";
import { AuthService } from '../services/auth-service.service';
import { LoginUser } from '../models/auth.model';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../models/general.model';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInput, MatExpansionModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  readonly loginUser = signal<LoginUser>({});
  readonly loading = signal<boolean>(false);

  loginForm = new FormGroup({
    email: new FormControl('chelsie123@gmx.at', [Validators.required, Validators.email]),
    password: new FormControl('schnuFFi69'),
  });

  #authService = inject(AuthService);
  #router = inject(Router);

  onSubmit() {
    // this.loading.set(true);
    this.loginUser.set(this.loginForm.value);
    this.#authService.login(this.loginUser()).pipe(first()).subscribe((loginUser) => {
      this.loginUser.set(loginUser);
      this.#router.navigateByUrl(ROUTE_PATHS.PUBLIC);
    });
  }
}
