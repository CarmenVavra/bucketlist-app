import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule, MatExpansionPanelActionRow } from "@angular/material/expansion";
import { MessageType } from '../../messages/models/message.model';
import { ReplyButtonComponent } from "../buttons/reply-button/reply-button.component";

@Component({
  selector: 'app-accordion',
  imports: [MatExpansionModule, MatExpansionPanelActionRow, MatButtonModule, ReplyButtonComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent {
  readonly title = input.required<string>();
  readonly sender = input<string>();
  readonly text = input<string>();
  readonly sent = input<boolean>();
  readonly showSender = input<boolean>();
  readonly color = input<string>();
  readonly messageType = input<string>();

  readonly editAction = output();
  readonly deleteAction = output();
  readonly replyAction = output();

  get messageTypes() {
    return MessageType;
  }

  ngOnInit(): void {
  }

  protected reply() {
    this.replyAction.emit();
  }

  protected edit() {
    this.editAction.emit();
  }

  protected delete() {
    this.deleteAction.emit();
  }
}
