import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-save-button',
  imports: [MatButtonModule],
  templateUrl: './save-button.component.html',
  styleUrl: './save-button.component.css'
})
export class SaveButtonComponent {

  readonly saveAction = output();

  protected save() {
    this.saveAction.emit();
  }
}
