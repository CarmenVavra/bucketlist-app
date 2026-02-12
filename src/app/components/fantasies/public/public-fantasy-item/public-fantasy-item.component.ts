import { Component, input } from '@angular/core';
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


}
