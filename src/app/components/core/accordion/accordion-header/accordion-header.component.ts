import { Component, input, signal } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelHeader, MatExpansionPanelTitle } from "@angular/material/expansion";

@Component({
  selector: 'app-accordion-header',
  imports: [MatExpansionModule, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription],
  templateUrl: './accordion-header.component.html',
  styleUrl: './accordion-header.component.css',
  providers: [MatExpansionPanel],
})
export class AccordionHeaderComponent {
  readonly title = input.required<string>();
  readonly sender = input<string>();

}
