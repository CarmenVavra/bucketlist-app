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

  readonly acceptAction = output();
  readonly denyAction = output();

  protected accept() {
    this.acceptAction.emit();
  }

  protected deny() {
    this.denyAction.emit();
  }
}
