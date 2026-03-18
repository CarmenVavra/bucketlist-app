import { Component, input, output, signal } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { BucketListItem, PRIORITY } from '../../../models/bucket-list.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { LoginUser } from '../../../../auth/models/auth.model';
import { ExpanderComponent } from "../../../../core/expander/expander.component";

@Component({
  selector: 'app-public-bucket-list-item',
  imports: [MatExpansionModule, MatButtonModule, MatCardModule, ExpanderComponent],
  templateUrl: './public-bucket-list-item.component.html',
  styleUrl: './public-bucket-list-item.component.css',
})
export class PublicBucketListItemComponent {
  readonly prio = signal<string>('');
  readonly priorityClass = signal<string>('');
  readonly showButtons = signal<boolean>(false);

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
    this.showButtons.set(this.loggedInUser()?.id !== this.bucketListItem().userId);

    this.prioList.forEach((value) => {
      if (Number(value.id) == this.bucketListItem().priorityId) {
        this.prio.set(value.displayName);
        this.priorityClass.set(value.text);
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
