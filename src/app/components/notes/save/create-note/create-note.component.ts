import { Component, inject, output, signal } from '@angular/core';
import { SimpleTitleTextFormComponent } from "../../../core/forms/simple-title-text-form/simple-title-text-form.component";
import { NoteItem } from '../../models/notes.model';
import { NoteService } from '../../services/note.service';
import { AuthService } from '../../../auth/services/auth-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ROUTE_PATHS, SimpleTitleText } from '../../../../models/general.model';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-note',
  imports: [SimpleTitleTextFormComponent],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css'
})
export class CreateNoteComponent {

  #noteService = inject(NoteService);
  #authservice = inject(AuthService);
  #fb = inject(FormBuilder);
  #router = inject(Router);

  // readonly noteForm = this.#fb.group({
  //   title: new FormControl('', [Validators.required]),
  //   text: new FormControl('', [Validators.required]),
  //   userId: this.#authservice.getStoredUser().id,
  // });

  readonly noteItem = signal<NoteItem>({
    title: '',
    text: '',
    userId: this.#authservice.getStoredUser().id!,
  });

  protected onSubmit(formData: SimpleTitleText) {
    this.noteItem().title = formData.title!;
    this.noteItem().text = formData.text!;
    this.#noteService.create(this.noteItem()).subscribe((noteItem) => {
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
}
