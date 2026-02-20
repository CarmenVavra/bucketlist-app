import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-blanko-button',
  imports: [MatButtonModule],
  templateUrl: './blanko-button.component.html',
  styleUrl: './blanko-button.component.css'
})
export class BlankoButtonComponent {

  readonly blankoAction = output();

  protected blanko() {
    this.blankoAction.emit();
  }
}
