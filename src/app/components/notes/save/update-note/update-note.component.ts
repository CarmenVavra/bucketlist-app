import { Component, inject, OnInit, signal } from '@angular/core';
import { SimpleTitleTextFormComponent } from "../../../core/forms/simple-title-text-form/simple-title-text-form.component";
import { NoteItem } from '../../models/notes.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_PATHS, SimpleTitleText } from '../../../../models/general.model';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-update-note',
  imports: [SimpleTitleTextFormComponent],
  templateUrl: './update-note.component.html',
  styleUrl: './update-note.component.css'
})
export class UpdateNoteComponent implements OnInit {

  readonly noteItem = signal<NoteItem>({
    title: '',
    text: '',
    userId: 0,
  });

  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  #noteService = inject(NoteService);

  ngOnInit(): void {
    this.loadNote();
  }

  protected onSubmit(formData: SimpleTitleText) {
    this.noteItem().title = formData.title!;
    this.noteItem().text = formData.text!;
    this.#noteService.update(this.noteItem()).subscribe((noteItem) => {
      this.noteItem.set(noteItem);
      this.goBack();
    });
  }

  protected onCancel() {
    this.goBack();
  }

  private goBack() {
    this.#router.navigateByUrl(ROUTE_PATHS.NOTES);
  }

  private loadNote() {
    const noteId = this.#activatedRoute.snapshot.params['noteItemId'];
    this.#noteService.getById(noteId).subscribe((noteItem) => {
      this.noteItem.set(noteItem);
    });
  }
}
