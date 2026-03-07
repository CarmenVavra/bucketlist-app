import { Component, input } from '@angular/core';

@Component({
  selector: 'app-text-container',
  imports: [],
  templateUrl: './text-container.component.html',
  styleUrl: './text-container.component.css'
})
export class TextContainerComponent {
  readonly text = input<string>();
}
