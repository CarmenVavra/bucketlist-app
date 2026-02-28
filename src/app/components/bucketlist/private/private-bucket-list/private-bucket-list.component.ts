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


@Component({
  selector: 'app-private-bucket-list',
  imports: [MatExpansionModule, PrivateBucketListItemComponent, MatButtonModule, MatDividerModule, PlusButtonComponent],
  templateUrl: './private-bucket-list.component.html',
  styleUrl: './private-bucket-list.component.css'
})
export class PrivateBucketListComponent {
  readonly privateBucketList = signal<BucketListItem[]>([]);
  #bucketListService = inject(BucketListService);
  #authService = inject(AuthService);
  #router = inject(Router);
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);


  readonly loggedInUser = this.#authService.getStoredUser();
  readonly userId = this.loggedInUser.id;

  ngOnInit(): void {
    this.loadPrivateBucketList();
  }

  loadPrivateBucketList() {
    this.#bucketListService.getAllByUserId(this.userId!).pipe(first()).subscribe((bucketList) => {
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
    this.openConfirmationDialog(bucketListItem, '50ms', '50ms');
  }

  openConfirmationDialog(item: BucketListItem, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (true == result) {
        this.deleteItem(item);
      }
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 5 * 1000,
        data: 'Der Eintrag wurde erfolgreich gelöscht!',
      });
    });
  }

  private deleteItem(item: BucketListItem) {
    this.#bucketListService.delete(Number(item.id)).subscribe((message) => {
      this.loadPrivateBucketList();
    });
  }

  publishBucketListItem(bucketListItem: BucketListItem) {
    this.#bucketListService.togglePublishBucketList(Number(bucketListItem.id), true).pipe(first()).subscribe((bucketlistItem) => {
      this.loadPrivateBucketList();
      this.goBack();
    });
  }

  unpublishBucketListItem(bucketListItem: BucketListItem) {
    this.#bucketListService.togglePublishBucketList(Number(bucketListItem.id), false).pipe(first()).subscribe((bucketlistItem) => {
      this.loadPrivateBucketList()
      this.goBack();
    });
  }

  doneBucketListItem(bucketListItem: BucketListItem) {
    this.#bucketListService.setIsDone(Number(bucketListItem.id)).pipe(first()).subscribe((bucketistItem) => {
      this.goBack();
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
