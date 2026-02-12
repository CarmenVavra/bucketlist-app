import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-button',
  imports: [MatButtonModule],
  templateUrl: './edit-button.component.html',
  styleUrl: './edit-button.component.css'
})
export class EditButtonComponent {

  readonly editAction = output();

  protected edit() {
    this.editAction.emit();
  }
}
