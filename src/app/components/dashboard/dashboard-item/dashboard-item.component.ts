import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-dashboard-item',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css'
})
export class DashboardItemComponent {
  readonly title = input<string>();
  readonly subtitle = input<string>();
  readonly content = input<string>();
  readonly path = input<string>();
  readonly icon = input<string>();
  readonly color = input<string>();

  readonly buttonClickAction = output<string>();

  protected buttonClick() {
    this.buttonClickAction.emit(this.path()!);
  }
}
