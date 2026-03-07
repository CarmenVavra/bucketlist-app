import { Component, input } from '@angular/core';

@Component({
  selector: 'app-message-container',
  imports: [],
  templateUrl: './message-container.component.html',
  styleUrl: './message-container.component.css'
})
export class MessageContainerComponent {
  readonly message = input<string>();

}
