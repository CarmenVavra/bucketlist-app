import { Component, inject, input, output } from '@angular/core';
import { MatAccordion } from "@angular/material/expansion";
import { MessageListItemComponent } from "../message-list-item/message-list-item.component";
import { MessageItem } from '../models/message.model';
import { MessageService } from '../services/message.service';
import { AuthService } from '../../auth/services/auth-service.service';

@Component({
  selector: 'app-message-list',
  imports: [MatAccordion, MessageListItemComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  readonly messages = input<MessageItem[]>();
  readonly color = input<string>();
  readonly messageType = input<string>();

  readonly deleteAction = output<MessageItem>();
  readonly editAction = output<MessageItem>();
  readonly replyAction = output<MessageItem>();

  #messageService = inject(MessageService);
  #authService = inject(AuthService);

  readonly loggedInUser = this.#authService.getStoredUser();

  constructor() { }

  deleteItem(messageItem: MessageItem) {
    this.deleteAction.emit(messageItem);
  }

  editItem(messageItem: MessageItem) {
    this.editAction.emit(messageItem);
  }

  replyItem(messageItem: MessageItem) {
    this.replyAction.emit(messageItem);
  }
}
