import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatLabel } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { BucketListItem, PRIORITY } from '../../../../models/bucket-list.model';
import { BucketListService } from '../../../../services/bucket-list.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../../../../models/general.model';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../../auth/services/auth-service.service';
import { LoginUser } from '../../../../../auth/models/auth.model';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-create-bucket-list-item',
  imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInputModule,
    MatExpansionModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './create-bucket-list-item.component.html',
  styleUrl: './create-bucket-list-item.component.css'
})
export class CreateBucketListItemComponent {
  readonly bucketListForm: FormGroup = new FormGroup('');

  get priority() {
    return PRIORITY.LIST;
  }

  readonly bucketListItem = signal<BucketListItem>({
    userId: -1,
    title: '',
    description: '',
    priorityId: 0,
  });

  #fb = inject(FormBuilder);
  #authService = inject(AuthService);
  #bucketListService = inject(BucketListService);
  #router = inject(Router);

  readonly loggedInUser = this.#authService.getStoredUser();
  readonly userId = this.loggedInUser.id;

  constructor() {
    this.bucketListForm = this.#fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      priorityId: new FormControl(0),
    });
  }

  onSubmit() {
    this.bucketListItem.set(this.bucketListForm.value);
    this.bucketListItem().userId = this.userId!;
    if (this.bucketListItem().userId) {
      this.#bucketListService.create(this.bucketListItem()).pipe(first()).subscribe((bucketList: BucketListItem) => {
        this.goBack();
      });
    }
  }

  protected cancel() {
    this.goBack();
  }

  private goBack() {
    this.#router.navigateByUrl(ROUTE_PATHS.PRIVATE_BUCKET_LIST);
  }

}
