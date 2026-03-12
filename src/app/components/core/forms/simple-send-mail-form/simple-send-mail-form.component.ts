import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from "@angular/material/expansion";
import { LoginUser } from '../../../auth/models/auth.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-simple-send-mail-form',
  imports: [FormsModule, ReactiveFormsModule, MatExpansionModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './simple-send-mail-form.component.html',
  styleUrl: './simple-send-mail-form.component.css'
})
export class SimpleSendMailFormComponent {

  readonly availableUsers = input<LoginUser[]>();

  #fb = inject(FormBuilder);

  form = this.#fb.group({
    subject: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.minLength(5)]),
    userIdRecipient: new FormControl('', [Validators.required]),
  });

  protected onSubmit() {
    console.log('in onSubmit');
  }

  protected onCancel() {
    console.log('in onCancel');
  }
}
