import { Component, inject, signal } from '@angular/core';
import { MatAccordion } from "@angular/material/expansion";
import { ActivityItemComponent } from "./activity-item/activity-item.component";
import { ActivityItem } from './models/activity.model';
import { ActivityService } from './services/activity.service';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../models/general.model';
import { AuthService } from '../auth/services/auth-service.service';

@Component({
  selector: 'app-activities',
  imports: [MatAccordion, ActivityItemComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  readonly activities = signal<ActivityItem[]>([]);

  #authService = inject(AuthService);
  #activityService = inject(ActivityService);
  #router = inject(Router);

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities() {
    const userId = this.#authService.getStoredUser().id;
    this.#activityService.getByUserId(userId!).subscribe((activities) => {
      this.activities.set(activities);
      if (this.activities().length === 0) {
        console.log('keine Unternehmungen vorhanden');
      } else {
        this.activities.set(activities);
      }
    });
  }

  openCreateActivityItem() {
    this.#router.navigateByUrl(ROUTE_PATHS.ACTIVITY_ITEM_CREATE);
  }

  openEditActivityItem(item: ActivityItem) {
    this.#router.navigateByUrl(`${ROUTE_PATHS.ACTIVITY_ITEM_EDIT}/${item.id}`);
  }

  deleteActivityItem(item: ActivityItem) {
    this.#activityService.delete(item.id!).subscribe((response) => {
      this.loadActivities();
      // const index = this.activities().indexOf(item);
      // if (index) {
      //   this.activities().splice(index, 1);
      // }
    });
  }

  doneActivityItem(item: ActivityItem) {
    console.log('in doneActivityItem', item);
  }

  protected openTakeAways(activityId: number) {
    this.#router.navigateByUrl(`${ROUTE_PATHS.TAKE_AWAYS}/${activityId}`);
  }
}