import { Component, inject, input, signal } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BucketListItem, PRIORITY } from '../../../../models/bucket-list.model';
import { BucketListService } from '../../../../services/bucket-list.service';
import { first, Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ROUTE_PATHS } from '../../../../../../models/general.model';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../../auth/services/auth-service.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CoreService } from '../../../../../core/services/core.service';
import { SNACKBAR_MESSAGES } from '../../../../../core/models/core.model';

@Component({
  selector: 'app-update-bucket-list-item',
  imports: [MatFormField, MatLabel, MatExpansionModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './update-bucket-list-item.component.html',
  styleUrl: './update-bucket-list-item.component.css'
})
export class UpdateBucketListItemComponent {

  #fb = inject(FormBuilder);
  #router = inject(Router);
  #authService = inject(AuthService);
  #activatedRoute = inject(ActivatedRoute);
  #bucketListService = inject(BucketListService);
  #coreService = inject(CoreService);

  readonly bucketListItem = signal<BucketListItem>({
    title: '',
    description: '',
    userId: this.#authService.getStoredUser().id!,
  });

  bucketListForm: FormGroup = this.#fb.group({
    title: '',
    description: '',
    priorityId: 0,
  });

  get priority() {
    return PRIORITY.LIST;
  }

  ngOnInit(): void {
    const itemId = this.#activatedRoute.snapshot?.params['bucketListItemId'];
    if (itemId !== undefined && itemId !== null && itemId > 0) {
      this.#bucketListService.getBucketListItemById(itemId).pipe(first()).subscribe((bucketListItem) => {
        this.bucketListItem.set(bucketListItem);
        if (this.bucketListItem()) {
          this.bucketListForm.patchValue(this.bucketListItem());
        }
      });
    }
  }

  onSubmit() {
    this.bucketListItem().title = this.bucketListForm.value.title;
    this.bucketListItem().description = this.bucketListForm.value.description;
    this.bucketListItem().priorityId = this.bucketListForm.value.priorityId;
    this.#bucketListService.update(this.bucketListItem()).pipe(first()).subscribe((bucketListItem) => {
      this.bucketListItem.set(bucketListItem);
      this.#coreService.openSnackBar(SNACKBAR_MESSAGES.EDIT);
      this.goBack();
    });
  }

  onCancel() {
    this.goBack();
  }

  goBack() {
    this.#router.navigateByUrl(ROUTE_PATHS.PRIVATE_BUCKET_LIST);
  }

}
