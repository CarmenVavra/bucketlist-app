import { Component, inject, signal } from '@angular/core';
import { MessageItem, MessageType } from './models/message.model';
import { MessageService } from './services/message.service';
import { AuthService } from '../auth/services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_PATHS } from '../../models/general.model';
import { MatDivider } from "@angular/material/divider";
import { MessageListComponent } from "./message-list/message-list.component";
import { INLINE_MESSAGES, SNACKBAR_MESSAGES } from '../core/models/core.model';
import { CoreService } from '../core/services/core.service';

@Component({
  selector: 'app-messages',
  imports: [MatDivider, MessageListComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  readonly messages = signal<MessageItem[]>([]);
  readonly receivedMessages = signal<MessageItem[]>([]);
  readonly sentMessages = signal<MessageItem[]>([]);
  readonly answeredMessages = signal<MessageItem[]>([]);
  readonly messageHeadline = signal<string>('');
  readonly messageType = signal<string>('');
  readonly color = signal<string>('');
  readonly message = signal<string>('');

  #messageService = inject(MessageService);
  #authService = inject(AuthService);
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  #coreService = inject(CoreService);

  readonly loggedInUser = this.#authService.getStoredUser();

  get messageTypes() {
    return MessageType;
  }

  constructor() {

  }

  ngOnInit(): void {
    this.laodMessages();

    // if ('draft' == this.messageType()) {
    //   this.getDraftMessages();
    // this.#router.navigate([], {
    //   queryParams: {
    //     'messageType': null,
    //   },
    //   queryParamsHandling: 'merge'
    // });
    // }

  }

  laodMessages() {
    this.messageType.set(this.#activatedRoute.snapshot.queryParams['messageType']);

    switch (this.messageType()) {
      case this.messageTypes.SENT:
        this.getSentMessages();
        break;
      case this.messageTypes.ANSWERED:
        this.getAnsweredMessages();
        break;
      case this.messageTypes.DRAFT:
        this.getDraftMessages();
        break;
      case this.messageTypes.RECEIVED:
      default:
        this.getReceivedMessages();
        break;
    }
  }

  openCreateMessage() {
    this.#router.navigateByUrl(ROUTE_PATHS.MESSAGE_ITEM_CREATE);
  }

  openEditMessage(messageItem: MessageItem) {
    this.#router.navigateByUrl(`${ROUTE_PATHS.MESSAGE_ITEM_EDIT}/${messageItem.id}`);
  }

  openReplyMessage(messageItem: MessageItem) {
    this.#router.navigateByUrl(`${ROUTE_PATHS.MESSAGE_ITEM_REPLY}/${messageItem.id}`);
  }

  getReceivedMessages() {
    this.color.set(this.messageTypes.RECEIVED);
    this.messageType.set(this.messageTypes.RECEIVED);
    this.#messageService.getAllReceivedByUserIdRecipient(this.loggedInUser.id!).subscribe((messages) => {
      if (messages.length === 0) {
        this.message.set(INLINE_MESSAGES.NO_DATA_AVAILABLE);
      } else {
        this.message.set('');
      }
      this.messages.set(messages);

      this.#router.navigate([], {
        queryParams: {
          messageType: this.messageTypes.RECEIVED,
        }
      });
    });
  }

  getSentMessages() {
    this.color.set(this.messageTypes.SENT);
    this.messageType.set(this.messageTypes.SENT);
    this.#messageService.getAllSentByUserIdRecipient(this.loggedInUser.id!).subscribe((messages) => {
      if (messages.length === 0) {
        this.message.set(INLINE_MESSAGES.NO_DATA_AVAILABLE);
      } else {
        this.message.set('');
      }
      this.messages.set(messages);
      this.#router.navigate([], {
        queryParams: {
          messageType: this.messageTypes.SENT,
        }
      });
    });
  }

  getAnsweredMessages() {
    this.color.set(this.messageTypes.ANSWERED);
    this.messageType.set(this.messageTypes.ANSWERED);
    this.#messageService.getAllAnsweredByUserIdRecipient(this.loggedInUser.id!).subscribe((messages) => {
      if (messages.length === 0) {
        this.message.set(INLINE_MESSAGES.NO_DATA_AVAILABLE);
      } else {
        this.message.set('');
      }
      this.messages.set(messages);
      this.#router.navigate([], {
        queryParams: {
          messageType: this.messageTypes.ANSWERED,
        }
      });
    });
  }

  getDraftMessages() {
    this.color.set(this.messageTypes.DRAFT);
    this.messageType.set(this.messageTypes.DRAFT);
    this.#messageService.getAllDraftByUserId(this.loggedInUser.id!).subscribe((messages) => {
      if (messages.length === 0) {
        this.message.set(INLINE_MESSAGES.NO_DATA_AVAILABLE);
      } else {
        this.message.set('');
      }
      this.messages.set(messages);
      this.#router.navigate([], {
        queryParams: {
          messageType: this.messageTypes.DRAFT,
        }
      });
    });
  }

  protected deleteMessageItem(messageItem: MessageItem) {
    this.#coreService.openConfirmationDialog().subscribe((confirmationResult) => {
      if (true == confirmationResult) {
        this.deleteItem(messageItem);
      }
    });
  }

  deleteItem(messageItem: MessageItem) {
    this.#messageService.delete(messageItem.id!).subscribe((response) => {
      this.laodMessages();
      setTimeout(() => {
        this.#coreService.openSnackBar(SNACKBAR_MESSAGES.DELETE);
      }, 300);
      // const index = this.messages().indexOf(messageItem);
      // this.messages().splice(index, 1);
    });
  }
}
