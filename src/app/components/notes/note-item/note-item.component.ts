import { Component, input, output } from '@angular/core';
import { NoteItem } from '../models/notes.model';
import { ExpanderComponent } from '../../core/expander/expander.component';

@Component({
  selector: 'app-note-item',
  imports: [ExpanderComponent],
  templateUrl: './note-item.component.html',
  styleUrl: './note-item.component.css'
})
export class NoteItemComponent {
  readonly noteItem = input.required<NoteItem>();

  readonly openEditAction = output<NoteItem>();
  readonly deleteAction = output<NoteItem>();

  protected edit() {
    this.openEditAction.emit(this.noteItem());
  }

  protected delete() {
    this.deleteAction.emit(this.noteItem());
  }
}
