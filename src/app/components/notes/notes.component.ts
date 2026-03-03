import { Component, inject, output, signal } from '@angular/core';
import { PlusButtonComponent } from "../core/buttons/plus-button/plus-button.component";
import { NoteService } from './services/note.service';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../models/general.model';
import { AuthService } from '../auth/services/auth-service.service';
import { NoteItem } from './models/notes.model';
import { NoteItemComponent } from "./note-item/note-item.component";
import { INLINE_MESSAGES } from '../core/models/core.model';

@Component({
  selector: 'app-notes',
  imports: [PlusButtonComponent, NoteItemComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  readonly title = signal<string>('');
  readonly text = signal<string>('');
  readonly message = signal<string>('');

  #router = inject(Router);
  #authService = inject(AuthService);
  #noteService = inject(NoteService);

  readonly userId = this.#authService.getStoredUser().id;
  readonly noteItems = signal<NoteItem[]>([]);

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems() {
    this.#noteService.getAllByUserId(this.userId!).subscribe((items) => {
      if (items.length === 0) {
        this.message.set(INLINE_MESSAGES.NO_DATA_AVAILABLE);
      }
      this.noteItems.set(items);
    });
  }

  openCreate() {
    this.#router.navigateByUrl(ROUTE_PATHS.NOTE_ITEM_CREATE);
  }

  openEdit(noteItem: NoteItem) {
    this.#router.navigateByUrl(`${ROUTE_PATHS.NOTE_ITEM_EDIT}/${noteItem.id}`);
  }

  delete(noteItem: NoteItem) {
    this.#noteService.delete(noteItem.id!).subscribe((message) => {
      this.loadItems();
    });
  }
}
