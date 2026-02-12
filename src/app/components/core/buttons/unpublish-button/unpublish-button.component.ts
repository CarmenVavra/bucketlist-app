import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-unpublish-button',
  imports: [MatButtonModule],
  templateUrl: './unpublish-button.component.html',
  styleUrl: './unpublish-button.component.css'
})
export class UnpublishButtonComponent {
  readonly published = input<boolean>();

  readonly unpublishAction = output();

  protected unpublish() {
    this.unpublishAction.emit();
  }
}
