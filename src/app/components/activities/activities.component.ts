import { Component, inject, signal } from '@angular/core';
import { MatAccordion } from "@angular/material/expansion";
import { ActivityItemComponent } from "./activity-item/activity-item.component";
import { ActivityItem } from './models/activity.model';
import { ActivityService } from './services/activity.service';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../models/general.model';
import { AuthService } from '../auth/services/auth-service.service';
import { CoreService } from '../core/services/core.service';
import { INLINE_MESSAGES, SNACKBAR_MESSAGES } from '../core/models/core.model';
import { MessageContainerComponent } from "../core/message-container/message-container.component";

@Component({
  selector: 'app-activities',
  imports: [MatAccordion, ActivityItemComponent, MessageContainerComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  readonly activities = signal<ActivityItem[]>([]);
  readonly message = signal<string>('');

  #authService = inject(AuthService);
  #activityService = inject(ActivityService);
  #coreService = inject(CoreService);
  #router = inject(Router);

  ngOnInit(): void {
    this.loadActivities();
  }

  private loadActivities() {
    const userId = this.#authService.getStoredUser().id;
    this.#activityService.getByUserId(userId!).subscribe((activities) => {
      this.activities.set(activities);
      if (this.activities().length === 0) {
        this.message.set(INLINE_MESSAGES.NO_DATA_AVAILABLE);
      }
    });
  }

  protected openCreateActivityItem() {
    this.#router.navigateByUrl(ROUTE_PATHS.ACTIVITY_ITEM_CREATE);
  }

  protected openEditActivityItem(item: ActivityItem) {
    this.#router.navigateByUrl(`${ROUTE_PATHS.ACTIVITY_ITEM_EDIT}/${item.id}`);
  }

  protected deleteActivityItem(item: ActivityItem) {
    this.#coreService.openConfirmationDialog().subscribe((confirmationResult) => {
      if (true == confirmationResult) {
        this.deleteItem(item);
      }
    });
  }

  private deleteItem(item: ActivityItem) {
    this.#activityService.delete(item.id!).subscribe((response) => {
      this.loadActivities();
      this.#coreService.openSnackBar(SNACKBAR_MESSAGES.DELETE);
    });
  }

  protected doneActivityItem(item: ActivityItem) {
    console.log('in doneActivityItem', item);
  }

  protected openTakeAways(activityId: number) {
    this.#router.navigateByUrl(`${ROUTE_PATHS.TAKE_AWAYS}/${activityId}`);
  }
}