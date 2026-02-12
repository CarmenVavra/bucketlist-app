import { Component, input, output, signal } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { BucketListItem, PRIORITY } from '../../../models/bucket-list.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { LoginUser } from '../../../../auth/models/auth.model';
import { DenyButtonComponent } from "../../../../core/buttons/deny-button/deny-button.component";
import { AcceptButtonComponent } from "../../../../core/buttons/accept-button/accept-button.component";

@Component({
  selector: 'app-public-bucket-list-item',
  imports: [MatExpansionModule, MatButtonModule, MatCardModule, DenyButtonComponent, AcceptButtonComponent],
  templateUrl: './public-bucket-list-item.component.html',
  styleUrl: './public-bucket-list-item.component.css',
})
export class PublicBucketListItemComponent {
  readonly prio = signal<string>('');

  readonly bucketListItem = input.required<BucketListItem>();
  readonly loggedInUser = input<LoginUser>();

  readonly acceptBucketListItemAction = output<BucketListItem>();
  readonly denyBucketListItemAction = output<BucketListItem>();

  get prioList() {
    return PRIORITY.LIST;
  }

  constructor() {

  }

  ngOnInit(): void {
    this.prioList.forEach((value) => {
      if (value.id == this.bucketListItem().priorityId) {
        this.prio.set(value.displayName);
      }
    });
  }


  accept() {
    this.acceptBucketListItemAction.emit(this.bucketListItem());
  }

  deny() {
    this.denyBucketListItemAction.emit(this.bucketListItem());
  }
}
