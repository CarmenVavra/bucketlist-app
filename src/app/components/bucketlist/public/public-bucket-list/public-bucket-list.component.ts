import { Component, inject, signal } from '@angular/core';
import { BucketListItem } from '../../models/bucket-list.model';
import { BucketListService } from '../../services/bucket-list.service';
import { first } from 'rxjs';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { PublicBucketListItemComponent } from "./public-bucket-list-item/public-bucket-list-item.component";
import { MatIcon } from "@angular/material/icon";
import { AuthService } from '../../../auth/services/auth-service.service';


@Component({
  selector: 'app-public-bucket-list',
  imports: [MatExpansionModule, PublicBucketListItemComponent],
  templateUrl: './public-bucket-list.component.html',
  styleUrl: './public-bucket-list.component.css',
})
export class PublicBucketListComponent {
  readonly publicBucketList = signal<BucketListItem[]>([]);

  #bucketListService = inject(BucketListService);
  #authService = inject(AuthService);

  readonly loggedInUser = this.#authService.getStoredUser();

  ngOnInit(): void {
    this.#bucketListService.getAll().pipe(first()).subscribe((bucketList) => {
      this.publicBucketList.set(bucketList);
    });
  }

  acceptBucketListItem(bucketListItem: BucketListItem) {
    this.#bucketListService.setIsAccepted(Number(bucketListItem.id)).pipe(first()).subscribe((bucketlist) => {
      console.log('in acceptBucketListItem bucketListItem', bucketlist);
    });
  }

  denyBucketListItem(bucketListItem: BucketListItem) {
    this.#bucketListService.setIsDenied(Number(bucketListItem.id)).pipe(first()).subscribe((bucketlist) => {
      console.log('in denyBucketListItem bucketListItem', bucketListItem);

    });
  }
}
