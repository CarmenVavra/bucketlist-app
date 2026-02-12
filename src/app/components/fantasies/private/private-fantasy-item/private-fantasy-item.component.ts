import { Component, inject, input, output } from '@angular/core';
import { ExpanderComponent } from "../../../core/expander/expander.component";
import { FantasyItem } from '../../models/fantasy.model';

@Component({
  selector: 'app-private-fantasy-item',
  imports: [ExpanderComponent],
  templateUrl: './private-fantasy-item.component.html',
  styleUrl: './private-fantasy-item.component.css'
})
export class PrivateFantasyItemComponent {
  readonly fantasyItem = input.required<FantasyItem>();

  readonly editAction = output<FantasyItem>();
  readonly deleteAction = output<FantasyItem>();

  protected openEdit() {
    this.editAction.emit(this.fantasyItem());
  }

  protected delete() {
    this.deleteAction.emit(this.fantasyItem());
  }
}
