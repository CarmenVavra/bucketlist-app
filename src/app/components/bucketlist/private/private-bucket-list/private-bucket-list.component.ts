import { Component, inject, signal } from '@angular/core';
import { BucketListItem } from '../../models/bucket-list.model';
import { BucketListService } from '../../services/bucket-list.service';
import { first } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { PrivateBucketListItemComponent } from './private-bucket-list-item/private-bucket-list-item.component';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../../models/general.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from "@angular/material/divider";
import { AuthService } from '../../../auth/services/auth-service.service';
import { PlusButtonComponent } from "../../../core/buttons/plus-button/plus-button.component";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../core/dialog/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../core/snack-bar/snack-bar.component';
import { CoreService } from '../../../core/services/core.service';
import { INLINE_MESSAGES, SNACKBAR_MESSAGES } from '../../../core/models/core.model';

@Component({
  selector: 'app-private-bucket-list',
  imports: [MatExpansionModule, PrivateBucketListItemComponent, MatButtonModule, MatDividerModule, PlusButtonComponent],
  templateUrl: './private-bucket-list.component.html',
  styleUrl: './private-bucket-list.component.css'
})
export class PrivateBucketListComponent {
  readonly privateBucketList = signal<BucketListItem[]>([]);
  readonly message = signal<string>('');

  #bucketListService = inject(BucketListService);
  #authService = inject(AuthService);
  #coreService = inject(CoreService);
  #router = inject(Router);

  readonly loggedInUser = this.#authService.getStoredUser();
  readonly userId = this.loggedInUser.id;

  ngOnInit(): void {
    this.loadPrivateBucketList();
  }

  loadPrivateBucketList() {
    this.#bucketListService.getAllByUserId(this.userId!).pipe(first()).subscribe((bucketList) => {
      if (bucketList.length === 0) {
        this.message.set(INLINE_MESSAGES.NO_DATA_AVAILABLE);
      }

      this.privateBucketList.set(bucketList);

    });
  }

  openCreateBucketListItem() {
    this.#router.navigateByUrl(ROUTE_PATHS.BUCKET_LIST_ITEM_CREATE);
  }

  openEditBucketListItem(bucketListItem: BucketListItem) {
    this.#router.navigateByUrl(`${ROUTE_PATHS.BUCKET_LIST_ITEM_EDIT}/${bucketListItem.id}`);
  }

  deleteBucketListItem(bucketListItem: BucketListItem) {
    this.#coreService.openConfirmationDialog().subscribe((confirmationResult) => {
      if (true == confirmationResult) {
        this.deleteItem(bucketListItem);
      }
    });
  }

  private deleteItem(item: BucketListItem) {
    this.#bucketListService.delete(Number(item.id)).subscribe((message) => {
      this.loadPrivateBucketList();
      setTimeout(() => {
        this.#coreService.openSnackBar(SNACKBAR_MESSAGES.DELETE);
      }, 300);
    });
  }

  publishBucketListItem(bucketListItem: BucketListItem) {
    this.#bucketListService.togglePublishBucketList(Number(bucketListItem.id), true).pipe(first()).subscribe((bucketlistItem) => {
      this.loadPrivateBucketList();
      this.goBack();
      setTimeout(() => {
        this.#coreService.openSnackBar(SNACKBAR_MESSAGES.PUBLISH);
      }, 300);
    });
  }

  unpublishBucketListItem(bucketListItem: BucketListItem) {
    this.#bucketListService.togglePublishBucketList(Number(bucketListItem.id), false).pipe(first()).subscribe((bucketlistItem) => {
      this.loadPrivateBucketList()
      this.goBack();
      setTimeout(() => {
        this.#coreService.openSnackBar(SNACKBAR_MESSAGES.UNPUBLISH);
      }, 300);
    });
  }

  doneBucketListItem(bucketListItem: BucketListItem) {
    this.#bucketListService.setIsDone(Number(bucketListItem.id)).pipe(first()).subscribe((bucketistItem) => {
      this.loadPrivateDone();
      this.goBack();
      setTimeout(() => {
        this.#coreService.openSnackBar(SNACKBAR_MESSAGES.DONE);
      }, 300);
    });
  }

  loadPrivateDone() {
    this.#bucketListService.showPrivateDone(this.userId!).pipe(first()).subscribe((bucketList) => {
      this.privateBucketList.set(bucketList);
    });
  }

  loadPrivateAccepted() {
    this.#bucketListService.showPrivateAccepted(this.userId!).pipe(first()).subscribe((bucketList) => {
      this.privateBucketList.set(bucketList);
      console.log('this.privateBucketList', this.privateBucketList());
    });
  }

  loadPrivateDenied() {
    this.#bucketListService.showPrivateDenied(this.userId!).pipe(first()).subscribe((bucketList) => {
      this.privateBucketList.set(bucketList);
    });
  }

  goBack() {
    this.#router.navigateByUrl(ROUTE_PATHS.PRIVATE_BUCKET_LIST);
  }
}
