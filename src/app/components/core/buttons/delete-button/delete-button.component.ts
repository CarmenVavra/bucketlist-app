import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-button',
  imports: [MatButtonModule],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.css'
})
export class DeleteButtonComponent {

  readonly deleteAction = output();

  protected delete() {
    this.deleteAction.emit();
  }
}
