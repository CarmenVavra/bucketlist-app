import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-deny-button',
  imports: [MatButtonModule],
  templateUrl: './deny-button.component.html',
  styleUrl: './deny-button.component.css'
})
export class DenyButtonComponent {

  readonly denyAction = output();

  protected deny() {
    this.denyAction.emit();
  }
}
