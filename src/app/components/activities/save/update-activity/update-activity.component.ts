import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { ActivityFormService } from '../../services/activity-form.service';
import { ActivityItem } from '../../models/activity.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { ROUTE_PATHS } from '../../../../models/general.model';

@Component({
  selector: 'app-update-activity', providers: [provideNativeDateAdapter()],
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatExpansionModule, MatButtonModule,
    MatInputModule, MatLabel, MatNativeDateModule, MatHint, MatDatepickerModule, MatTimepickerModule,
    MatInput, MatDividerModule],
  templateUrl: './update-activity.component.html',
  styleUrl: './update-activity.component.css'
})
export class UpdateActivityComponent {
  activityForm: FormGroup = new FormGroup({});
  readonly activityItem = signal<ActivityItem>({});
  readonly itemId = signal<number>(0);

  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  #activityFormService = inject(ActivityFormService);
  #activityService = inject(ActivityService);

  constructor() {
    this.activityForm = this.#activityFormService.getActivityFormDefinition();
    this.#activityService.getById(this.#activatedRoute.snapshot.params['activityId']).subscribe((item) => {
      this.activityItem.set(item);
      this.itemId.set(item.id!);
      this.initForm(item);
    });
  }

  private initForm(item: ActivityItem) {
    this.activityForm.patchValue(this.#activityFormService.getActivityFormDefinition(item).value);
    this.activityForm.controls['executionTime'].setValue(this.initialTimePickerValue('executionTime'));
    this.activityForm.controls['executionFromTime'].setValue(this.initialTimePickerValue('executionFromTime'));
    this.activityForm.controls['executionToTime'].setValue(this.initialTimePickerValue('executionToTime'));
  }

  private initialTimePickerValue(picker: string): Date {
    const newTime = new Date();
    let timeArray: string[] = [];
    switch (picker) {
      case 'executionTime':
        timeArray = this.activityItem().executionTime ? this.activityItem().executionTime?.split(':')! : [];
        break;
      case 'executionFromTime':
        timeArray = this.activityItem().executionFromTime ? this.activityItem().executionFromTime?.split(':')! : [];
        break;
      case 'executionToTime':
        timeArray = this.activityItem().executionToTime ? this.activityItem().executionToTime?.split(':')! : [];
        break;
      default:
        [];
        break;
    }

    if (timeArray.length > 0) {
      newTime.setHours(Number(timeArray[0]), Number(timeArray[1]));
    }

    return newTime;
  }

  onSubmit() {
    this.activityItem.set(this.activityForm.value);
    this.prepareForBackend();
    // this.activityItem().id = this.itemId();
    // this.activityItem().userId = localStorage.getItem('auth_data') ? JSON.parse(localStorage.getItem('auth_data')!).id : null;
    // this.activityItem().executionDate = this.#activityService.formatDateForBackend(new Date(this.activityItem().executionDate!));
    // this.activityItem().executionFromDate = this.#activityService.formatDateForBackend(new Date(this.activityItem().executionFromDate!));
    // this.activityItem().executionToDate = this.#activityService.formatDateForBackend(new Date(this.activityItem().executionToDate!));
    // this.activityItem().executionTime = this.#activityService.formatTimeForBackend(new Date(this.activityItem().executionTime!));
    // this.activityItem().executionFromTime = this.#activityService.formatTimeForBackend(new Date(this.activityItem().executionFromTime!));
    // this.activityItem().executionToTime = this.#activityService.formatTimeForBackend(new Date(this.activityItem().executionToTime!));

    this.#activityService.update(this.activityItem()).subscribe((updatedItem) => {
      this.#router.navigateByUrl(ROUTE_PATHS.ACTIVITIES);
    }), (error: any) => {
      console.error('Error updating activity:', error);
    };
  }

  private prepareForBackend() {
    this.activityItem().id = this.itemId();
    this.activityItem().userId = localStorage.getItem('auth_data') ? JSON.parse(localStorage.getItem('auth_data')!).id : null;
    this.activityItem().executionDate = this.#activityService.formatDateForBackend(new Date(this.activityItem().executionDate!));
    this.activityItem().executionFromDate = this.#activityService.formatDateForBackend(new Date(this.activityItem().executionFromDate!));
    this.activityItem().executionToDate = this.#activityService.formatDateForBackend(new Date(this.activityItem().executionToDate!));
    this.activityItem().executionTime = this.#activityService.formatTimeForBackend(new Date(this.activityItem().executionTime!));
    this.activityItem().executionFromTime = this.#activityService.formatTimeForBackend(new Date(this.activityItem().executionFromTime!));
    this.activityItem().executionToTime = this.#activityService.formatTimeForBackend(new Date(this.activityItem().executionToTime!));

  }

}
