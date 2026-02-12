import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-publish-button',
  imports: [MatButtonModule],
  templateUrl: './publish-button.component.html',
  styleUrl: './publish-button.component.css'
})
export class PublishButtonComponent {
  readonly published = input<boolean>();

  readonly publishAction = output();

  protected publish() {
    this.publishAction.emit();
  }
}
