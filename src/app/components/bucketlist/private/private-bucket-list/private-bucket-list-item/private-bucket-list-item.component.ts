import { Component, ElementRef, input, output, signal, viewChild, ViewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BucketListItem } from '../../../models/bucket-list.model';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublishButtonComponent } from "../../../../core/buttons/publish-button/publish-button.component";
import { UnpublishButtonComponent } from "../../../../core/buttons/unpublish-button/unpublish-button.component";
import { DeleteButtonComponent } from "../../../../core/buttons/delete-button/delete-button.component";
import { DoneButtonComponent } from "../../../../core/buttons/done-button/done-button.component";
import { EditButtonComponent } from "../../../../core/buttons/edit-button/edit-button.component";
import { ExpanderComponent } from "../../../../core/expander/expander.component";


@Component({
  selector: 'app-private-bucket-list-item',
  imports: [MatExpansionModule, MatButtonModule, FormsModule, ReactiveFormsModule, ExpanderComponent],
  templateUrl: './private-bucket-list-item.component.html',
  styleUrl: './private-bucket-list-item.component.css'
})
export class PrivateBucketListItemComponent {

  readonly bucketListItem = input.required<BucketListItem>();

  readonly editBucketListItemAction = output<BucketListItem>();
  readonly deleteBucketListItemAction = output<BucketListItem>();
  readonly publishBucketListItemAction = output<BucketListItem>();
  readonly unpublishBucketListItemAction = output<BucketListItem>();
  readonly doneBucketListItemAction = output<BucketListItem>();

  ngOnInit(): void {
    console.log('this.bucketListItem()', this.bucketListItem());
  }

  edit() {
    this.editBucketListItemAction.emit(this.bucketListItem());
  }

  delete() {
    this.deleteBucketListItemAction.emit(this.bucketListItem());
  }

  publish() {
    this.publishBucketListItemAction.emit(this.bucketListItem());
  }

  unpublish() {
    this.unpublishBucketListItemAction.emit(this.bucketListItem());
    this.bucketListItem().published = true;
  }

  done() {
    this.doneBucketListItemAction.emit(this.bucketListItem());
  }
}
