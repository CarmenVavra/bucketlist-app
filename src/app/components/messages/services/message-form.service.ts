import { inject, Injectable } from '@angular/core';
import { MessageItem } from '../models/message.model';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MessageFormService {

  #fb = inject(FormBuilder);

  constructor() { }

  getMessageFormDefinition(item?: MessageItem) {
    if (item) {
      return this.#fb.group({
        // id: [0],
        // userId: [0],
        // userIdRecipient: [0],
        subject: [''],
        text: [''],
        // sent: [false],
        // received: [false],
        // wasRead: [false],
        // wasReadAt: [''],
        // answered: [false],
      });
    } else {
      return this.#fb.group({ item });
    }
  }
}
