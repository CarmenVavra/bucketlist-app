import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-done-button',
  imports: [MatButtonModule],
  templateUrl: './done-button.component.html',
  styleUrl: './done-button.component.css'
})
export class DoneButtonComponent {
  readonly doneAction = output();

  protected done() {
    this.doneAction.emit();
  }
}
