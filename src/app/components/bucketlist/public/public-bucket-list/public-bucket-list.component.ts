import { Component, inject, signal } from '@angular/core';
import { BucketListItem, PRIORITY } from '../../models/bucket-list.model';
import { BucketListService } from '../../services/bucket-list.service';
import { first } from 'rxjs';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { PublicBucketListItemComponent } from "./public-bucket-list-item/public-bucket-list-item.component";
import { MatIcon } from "@angular/material/icon";
import { AuthService } from '../../../auth/services/auth-service.service';
import { CoreService } from '../../../core/services/core.service';
import { INLINE_MESSAGES, SNACKBAR_MESSAGES, TEXT } from '../../../core/models/core.model';
import { MessageContainerComponent } from "../../../core/message-container/message-container.component";
import { TextContainerComponent } from "../../../core/text-container/text-container.component";
import { PriorityLegendComponent } from "../../../core/priority-legend/priority-legend.component";


@Component({
  selector: 'app-public-bucket-list',
  imports: [MatExpansionModule, PublicBucketListItemComponent, MessageContainerComponent, TextContainerComponent, PriorityLegendComponent],
  templateUrl: './public-bucket-list.component.html',
  styleUrl: './public-bucket-list.component.css',
})
export class PublicBucketListComponent {
  readonly publicBucketList = signal<BucketListItem[]>([]);
  readonly message = signal<string>('');
  readonly text = signal<string>(TEXT.PUBLIC_BUCKET_LIST);

  #bucketListService = inject(BucketListService);
  #authService = inject(AuthService);
  #coreService = inject(CoreService);

  readonly loggedInUser = this.#authService.getStoredUser();

  ngOnInit(): void {
    this.loadPublicBucketList();
  }

  acceptBucketListItem(bucketListItem: BucketListItem) {
    this.#bucketListService.setIsAccepted(Number(bucketListItem.id)).pipe(first()).subscribe((bucketlist) => {
      this.loadPublicBucketList();
      this.#coreService.openSnackBar(SNACKBAR_MESSAGES.ACCEPT);
    });
  }

  denyBucketListItem(bucketListItem: BucketListItem) {
    this.#bucketListService.setIsDenied(Number(bucketListItem.id)).pipe(first()).subscribe((bucketlist) => {
      this.loadPublicBucketList();
      this.#coreService.openSnackBar(SNACKBAR_MESSAGES.DENY);
    });
  }

  private loadPublicBucketList() {
    this.#bucketListService.getAll().pipe(first()).subscribe((bucketList) => {
      if (bucketList.length === 0) {
        this.message.set(INLINE_MESSAGES.NO_DATA_AVAILABLE);
      }
      this.publicBucketList.set(bucketList);
      // this.setPriorityClass();
    });
  }

  // private setPriorityClass() {
  //   this.publicBucketList().forEach((item) => {
  //     if (PRIORITY.LOW.id == item.priorityId) {
  //       this.priorityClass.set(PRIORITY.LOW.text);
  //     }
  //     if (PRIORITY.MEDIUM.id == item.priorityId) {
  //       this.priorityClass.set(PRIORITY.MEDIUM.text);
  //     }
  //     if (PRIORITY.HIGH.id == item.priorityId) {
  //       this.priorityClass.set(PRIORITY.HIGH.text);
  //     }
  //     console.log('this.priorityClass()', this.priorityClass());
  //     // switch (item.priorityId) {
  //   case PRIORITY.LOW.id:
  //     this.priorityClass.set(PRIORITY.LOW.text);
  //     console.log('in switch low priority', this.priorityClass());
  //     break;
  //   case PRIORITY.MEDIUM.id:
  //     console.log('in switch medium priority');
  //     this.priorityClass.set(PRIORITY.MEDIUM.text);
  //     break;
  //   case PRIORITY.HIGH.id:
  //     console.log('in switch high priority');
  //     this.priorityClass.set(PRIORITY.HIGH.text);
  //     break;
  //   default:
  //     this.priorityClass.set('');
  //     break;
  // }
  //   });
  // }
}
