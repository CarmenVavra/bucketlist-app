import { Component, inject, input, signal } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageItem } from '../../models/message.model';
import { MessageService } from '../../services/message.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ROUTE_PATHS } from '../../../../models/general.model';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../auth/services/auth-service.service';

@Component({
  selector: 'app-update-message',
  imports: [MatFormField, MatLabel, MatExpansionModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './update-message.component.html',
  styleUrl: './update-message.component.css'
})
export class UpdateMessageComponent {

  #fb = inject(FormBuilder);
  #router = inject(Router);
  #authService = inject(AuthService);
  #activatedRoute = inject(ActivatedRoute);
  #messageService = inject(MessageService);

  readonly messageItem = signal<MessageItem>({
    subject: '',
    text: '',
    userId: this.#authService.getStoredUser().id!,
  });

  messageForm: FormGroup = this.#fb.group({
    subject: '',
    text: '',
  });

  constructor() {

  }

  ngOnInit(): void {
    const itemId = this.#activatedRoute.snapshot?.params['messageItemId'];
    if (itemId !== undefined && itemId !== null && itemId > 0) {
      this.#messageService.getMessageById(itemId).pipe(first()).subscribe((messageItem) => {
        this.messageItem.set(messageItem);
        if (this.messageItem()) {
          this.messageForm.patchValue(this.messageItem());
        }
      });
    }
  }

  onSubmit() {
    // this.bucketListItem().title = this.bucketListForm.value.title;
    // this.bucketListItem().description = this.bucketListForm.value.description;
    // this.#bucketListService.update(this.bucketListItem()).pipe(first()).subscribe((bucketListItem) => {
    //   this.bucketListItem.set(bucketListItem);
    //   this.goBack();
    // });
  }

  onCancel() {
    this.goBack();
  }

  goBack() {
    this.#router.navigateByUrl(ROUTE_PATHS.MESSAGES);
  }

}
