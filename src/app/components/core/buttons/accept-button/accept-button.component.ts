import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-accept-button',
  imports: [MatButtonModule],
  templateUrl: './accept-button.component.html',
  styleUrl: './accept-button.component.css'
})
export class AcceptButtonComponent {

  readonly acceptAction = output();

  protected accept() {
    this.acceptAction.emit();
  }
}
