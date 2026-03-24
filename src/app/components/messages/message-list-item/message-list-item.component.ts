import { Component, inject, input, output, signal, SimpleChanges } from '@angular/core';
import { MatExpansionModule } from "@angular/material/expansion";
import { MessageItem } from '../models/message.model';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/services/auth-service.service';
import { LoginUser } from '../../auth/models/auth.model';
import { AccordionComponent } from "../../core/accordion/accordion.component";

@Component({
  selector: 'app-message-list-item',
  imports: [MatExpansionModule, MatButtonModule, FormsModule, ReactiveFormsModule, AccordionComponent],
  templateUrl: './message-list-item.component.html',
  styleUrl: './message-list-item.component.css'
})
export class MessageListItemComponent {
  #authService = inject(AuthService);

  readonly showSender = signal<boolean>(false);
  readonly sender = signal<LoginUser>({});

  readonly messageItem = input<MessageItem>();
  readonly color = input<string>();
  readonly messageType = input<string>();

  readonly loggedInUser = this.#authService.getStoredUser();

  readonly editAction = output<MessageItem>();
  readonly deleteAction = output<MessageItem>();
  readonly replyAction = output<MessageItem>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messageItem']) {
      if (this.messageItem()?.userId != this.loggedInUser.id) {
        this.#authService.getUserById(this.messageItem()?.userId!).subscribe((user) => {
          this.sender.set(user);
          this.showSender.set(true);
        });
      } else {
        this.showSender.set(false);
      }
    }
  }

  delete() {
    this.deleteAction.emit(this.messageItem()!);
  }

  edit() {
    this.editAction.emit(this.messageItem()!);
  }

  reply() {
    this.replyAction.emit(this.messageItem()!);
  }
}
