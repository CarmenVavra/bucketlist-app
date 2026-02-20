import { Component, input, output } from '@angular/core';
import { ActivityItem } from '../models/activity.model';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { DeleteButtonComponent } from "../../core/buttons/delete-button/delete-button.component";
import { DoneButtonComponent } from "../../core/buttons/done-button/done-button.component";
import { EditButtonComponent } from "../../core/buttons/edit-button/edit-button.component";
import { ExpanderComponent } from "../../core/expander/expander.component";

@Component({
  selector: 'app-activity-item',
  imports: [MatExpansionModule, MatCardModule, MatButtonModule, ExpanderComponent],
  templateUrl: './activity-item.component.html',
  styleUrl: './activity-item.component.css'
})
export class ActivityItemComponent {
  readonly activityItem = input.required<ActivityItem>();

  readonly editActivityItemAction = output<ActivityItem>();
  readonly deleteActivityItemAction = output<ActivityItem>();
  readonly doneActivityItemAction = output<ActivityItem>();
  readonly takeAwaysAction = output();

  done() {
    this.doneActivityItemAction.emit(this.activityItem()!);
  }

  edit() {
    this.editActivityItemAction.emit(this.activityItem()!);
  }

  delete() {
    this.deleteActivityItemAction.emit(this.activityItem()!);
  }

  protected openTakeAways() {
    console.log('2. step');
    this.takeAwaysAction.emit();
  }

}
