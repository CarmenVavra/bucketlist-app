import { Component, input, output } from '@angular/core';
import { ExpanderComponent } from "../../../core/expander/expander.component";

@Component({
  selector: 'app-public-fantasy-item',
  imports: [ExpanderComponent],
  templateUrl: './public-fantasy-item.component.html',
  styleUrl: './public-fantasy-item.component.css'
})
export class PublicFantasyItemComponent {
  readonly title = input.required<string>();
  readonly text = input.required<string>();
  readonly nickname = input<string>();

  readonly acceptAction = output();
  readonly denyAction = output();

  /**
   * Emits an event to accept the public fantasy item when the accept button is clicked.
   */
  protected accept() {
    this.acceptAction.emit();
  }

  /**
   * Emits an event to deny the public fantasy item when the deny button is clicked.
   */
  protected deny() {
    this.denyAction.emit();
  }
}
