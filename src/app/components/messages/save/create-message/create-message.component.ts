import { Component, inject, input, output, signal, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatLabel, MatSelect, MatOption } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { MessageItem } from '../../models/message.model';
import { MessageService } from '../../services/message.service';
import { first, timestamp } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../../models/general.model';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../auth/services/auth-service.service';
import { LoginUser } from '../../../auth/models/auth.model';
import { SimpleSendMailFormComponent } from "../../../core/forms/simple-send-mail-form/simple-send-mail-form.component";
import { CoreService } from '../../../core/services/core.service';
import { SNACKBAR_MESSAGES } from '../../../core/models/core.model';

@Component({
  selector: 'app-create-message',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule,
    MatExpansionModule, MatButtonModule, SimpleSendMailFormComponent],
  templateUrl: './create-message.component.html',
  styleUrl: './create-message.component.css'
})
export class CreateMessageComponent {

  messageForm: FormGroup = new FormGroup('');
  readonly availableUsers = signal<LoginUser[]>([]);

  readonly messageItem = signal<MessageItem>({
    userId: -1,
    subject: '',
    text: '',
    userIdRecipient: -1,
    sent: false,
    sentAt: undefined,
  });

  #fb = inject(FormBuilder);
  #authService = inject(AuthService);
  #messageService = inject(MessageService);
  #router = inject(Router);
  #coreService = inject(CoreService);

  readonly loggedInUser = this.#authService.getStoredUser();
  readonly userId = this.loggedInUser.id;

  constructor() {
    this.#authService.getRegisteredUsers().subscribe((users) => {
      this.availableUsers.set(users);
    });

    this.messageForm = this.#fb.group({
      subject: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required, Validators.minLength(5)]),
      userIdRecipient: new FormControl(this.availableUsers()),
    });
  }

  saveAsDraft(form: FormGroup) {
    this.messageForm = form;
    this.messageItem.set(this.messageForm.value);
    this.messageItem().userId = this.userId!;
    if (this.messageItem().userId) {
      this.#messageService.create(this.messageItem()).pipe(first()).subscribe((message: MessageItem) => {
        this.#coreService.openSnackBar(SNACKBAR_MESSAGES.DRAFT_MESSAGE);
        this.#router.navigate([ROUTE_PATHS.MESSAGES], {
          queryParams: {
            messageType: 'draft',
          }
        });
      });
    }
  }

  onSubmit(form: FormGroup) {
    this.messageForm = form;
    this.messageItem.set(this.messageForm.value);
    this.messageItem().userId = this.userId!;
    this.messageItem().sent = true;
    this.messageItem().sentAt = new Date();
    if (this.messageItem().userId) {
      this.#messageService.create(this.messageItem()).pipe(first()).subscribe((message: MessageItem) => {
        this.#coreService.openSnackBar(SNACKBAR_MESSAGES.SENT_MESSAGE);
        this.#router.navigateByUrl(ROUTE_PATHS.MESSAGES);
      });
    }
  }

  protected cancel() {
    console.log('cancel');
  }

}
