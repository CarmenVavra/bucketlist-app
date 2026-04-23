import { Component, inject, output, signal } from '@angular/core';
import { PlusButtonComponent } from "../core/buttons/plus-button/plus-button.component";
import { NoteService } from './services/note.service';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../models/general.model';
import { AuthService } from '../auth/services/auth-service.service';
import { NoteItem } from './models/notes.model';
import { NoteItemComponent } from "./note-item/note-item.component";
import { INLINE_MESSAGES, SNACKBAR_MESSAGES } from '../core/models/core.model';
import { CoreService } from '../core/services/core.service';
import { MessageContainerComponent } from "../core/message-container/message-container.component";

@Component({
  selector: 'app-notes',
  imports: [PlusButtonComponent, NoteItemComponent, MessageContainerComponent],
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
  #coreService = inject(CoreService);

  readonly userId = this.#authService.getStoredUser().id;
  readonly noteItems = signal<NoteItem[]>([]);

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems() {
    console.log('userId from localStorage', this.userId);
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

  protected deleteNoteItem(noteItem: NoteItem) {
    this.#coreService.openConfirmationDialog().subscribe((confirmationResult) => {
      if (true == confirmationResult) {
        this.deleteItem(noteItem);
      }
    });
  }

  private deleteItem(noteItem: NoteItem) {
    this.#noteService.delete(noteItem.id!).subscribe((message) => {
      this.loadItems();
      this.#coreService.openSnackBar(SNACKBAR_MESSAGES.DELETE);
    });
  }
}
