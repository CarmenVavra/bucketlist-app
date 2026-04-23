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

  /**
   * loads note items for the current user from the backend by calling the getAllByUserId 
   * method of the NoteService and sets the noteItems signal with the response, also sets a 
   * message if no items are available
   */
  private loadItems() {
    this.#noteService.getAllByUserId(this.userId!).subscribe((items) => {
      if (items.length === 0) {
        this.message.set(INLINE_MESSAGES.NO_DATA_AVAILABLE);
      }
      this.noteItems.set(items);
    });
  }

  /**
   * navigates to the note item creation page when the create button is clicked by calling 
   * the navigateByUrl method of the Router with the appropriate route path from the 
   * ROUTE_PATHS enum
   */
  openCreate() {
    this.#router.navigateByUrl(ROUTE_PATHS.NOTE_ITEM_CREATE);
  }

  /**
   * navigates to the note item edit page when the edit button is clicked by calling 
   * the navigateByUrl method of the Router with the appropriate route path from the 
   * ROUTE_PATHS enum
   * @param noteItem - NoteItem to edit, the id of the note item is used to construct the route 
   * path for navigation
   */
  openEdit(noteItem: NoteItem) {
    this.#router.navigateByUrl(`${ROUTE_PATHS.NOTE_ITEM_EDIT}/${noteItem.id}`);
  }

  /**
   * opens a confirmation dialog when the delete button is clicked for a note item and 
   * if the user confirms the deletion, calls the deleteItem method to delete the note item 
   * from the backend
   * @param noteItem - NoteItem to delete, the id of the note item is used to call 
   * the delete method of the NoteService
   */
  protected deleteNoteItem(noteItem: NoteItem) {
    this.#coreService.openConfirmationDialog().subscribe((confirmationResult) => {
      if (true == confirmationResult) {
        this.deleteItem(noteItem);
      }
    });
  }

  /**
   * deletes a note item from the backend by calling the delete method of the NoteService 
   * with the id of the note item to delete and reloads the note items after deletion, also 
   * shows a snackbar message confirming the deletion
   * @param noteItem - NoteItem to delete, the id of the note item is used to call 
   * the delete method of the NoteService
   */
  private deleteItem(noteItem: NoteItem) {
    this.#noteService.delete(noteItem.id!).subscribe((message) => {
      this.loadItems();
      this.#coreService.openSnackBar(SNACKBAR_MESSAGES.DELETE);
    });
  }
}
