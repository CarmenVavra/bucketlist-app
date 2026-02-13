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

  readonly publishAction = output<FantasyItem>();
  readonly unpublishAction = output<FantasyItem>();
  readonly doneAction = output<FantasyItem>();
  readonly editAction = output<FantasyItem>();
  readonly deleteAction = output<FantasyItem>();

  protected publish() {
    this.publishAction.emit(this.fantasyItem());
  }

  protected unpublish() {
    this.unpublishAction.emit(this.fantasyItem());
  }

  protected done() {
    this.doneAction.emit(this.fantasyItem());
  }

  protected openEdit() {
    this.editAction.emit(this.fantasyItem());
  }

  protected delete() {
    this.deleteAction.emit(this.fantasyItem());
  }
}
