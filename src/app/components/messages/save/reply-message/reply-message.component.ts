import { Component, inject, input, signal } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageItem } from '../../models/message.model';
import { MessageService } from '../../services/message.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ROUTE_PATHS } from '../../../../models/general.model';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../auth/services/auth-service.service';
import { MatCardModule } from "@angular/material/card";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reply-message',
  imports: [MatFormField, MatLabel, MatExpansionModule, FormsModule, ReactiveFormsModule, MatInputModule,
    MatButtonModule, MatCardModule, DatePipe],
  templateUrl: './reply-message.component.html',
  styleUrl: './reply-message.component.css'
})
export class ReplyMessageComponent {
  readonly sender = signal<string>('');

  #fb = inject(FormBuilder);
  #router = inject(Router);
  #authService = inject(AuthService);
  #activatedRoute = inject(ActivatedRoute);
  #messageService = inject(MessageService);

  readonly sentMessageItem = signal<MessageItem>({
    subject: '',
    text: '',
    userId: 0,
  });

  readonly messageItem = signal<MessageItem>({
    subject: '',
    text: '',
    userId: this.#authService.getStoredUser().id!,
  });

  messageForm: FormGroup = this.#fb.group({
    subject: '',
    text: '',
  });

  constructor() {
  }

  ngOnInit(): void {
    const itemId = this.#activatedRoute.snapshot?.params['messageItemId'];
    if (itemId !== undefined && itemId !== null && itemId > 0) {
      this.#messageService.getMessageById(itemId).pipe(first()).subscribe((messageItem) => {
        this.sentMessageItem.set(messageItem);
        this.setNickname(messageItem);
        this.messageForm.controls['subject'].setValue(`Re: ${messageItem.subject}`);
      });
    }
  }

  setNickname(messageItem: any) {
    this.sender.set(messageItem.nickname);
  }

  onSubmit() {
    this.messageItem().subject = this.messageForm.value['subject'];
    this.messageItem().text = this.messageForm.value['text'];
    this.messageItem().sent = true;
    this.messageItem().sentAt = new Date();
    this.sentMessageItem().answered = true;
    this.sentMessageItem().answeredAt = new Date();
    this.#messageService.reply(this.messageItem(), this.sentMessageItem()).subscribe((item) => {
      this.goBack();
    });
  }

  onCancel() {
    this.goBack();
  }

  goBack() {
    this.#router.navigateByUrl(ROUTE_PATHS.MESSAGES);
  }

}
