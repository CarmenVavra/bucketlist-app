import { inject, Injectable } from '@angular/core';
import { ActivityItem } from '../models/activity.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivityService } from './activity.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityFormService {

  #fb = inject(FormBuilder);
  #activityService = inject(ActivityService);

  constructor() { }

  getActivityFormDefinition(item?: ActivityItem) {
    if (item == undefined) {
      return this.#fb.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(5)]],
        location: [''],
        executionDate: [''],
        executionTime: [''],
        executionFromDate: [''],
        executionToDate: [''],
        executionFromTime: [''],
        executionToTime: [''],
        duration: [''],
        done: [false],
      });
    } else {
      const tempTime = new Date(item.executionTime!).getHours();
      return this.#fb.group({
        title: [item.title, [Validators.required]],
        description: [item.description, [Validators.required, Validators.minLength(5)]],
        location: [item.location],
        executionDate: [item.executionDate],
        executionTime: [item.executionTime],
        executionFromDate: [item.executionFromDate],
        executionToDate: [item.executionToDate],
        executionFromTime: [item.executionFromTime],
        executionToTime: [item.executionToTime],
        duration: [item.duration],
        done: [item.done],
      });
    }
  }

}