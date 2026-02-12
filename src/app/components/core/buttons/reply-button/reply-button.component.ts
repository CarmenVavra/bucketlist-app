import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reply-button',
  imports: [MatButtonModule],
  templateUrl: './reply-button.component.html',
  styleUrl: './reply-button.component.css'
})
export class ReplyButtonComponent {

  readonly replyAction = output();

  protected reply() {
    this.replyAction.emit();
  }
}
