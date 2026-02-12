import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from "@angular/material/divider";
import { ActivityItem } from '../../models/activity.model';
import { ActivityService } from '../../services/activity.service';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../../models/general.model';
import { ActivityFormService } from '../../services/activity-form.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-activity',
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatExpansionModule, MatButtonModule,
    MatInputModule, MatLabel, MatNativeDateModule, MatHint, MatDatepickerModule, MatTimepickerModule, MatInput, MatDividerModule],
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.css'
})
export class CreateActivityComponent {
  activityForm: FormGroup = new FormGroup({});

  readonly activityItem = signal<ActivityItem>({});

  #activityFormService = inject(ActivityFormService);
  #router = inject(Router);
  #activityService = inject(ActivityService);

  constructor() {
    this.activityForm = this.#activityFormService.getActivityFormDefinition();

  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.activityItem.set(this.activityForm.value);
    this.activityItem().userId = localStorage.getItem('auth_data') ? JSON.parse(localStorage.getItem('auth_data')!).id : null;
    this.activityItem().executionDate = this.#activityService.formatDateForBackend(new Date(this.activityItem().executionDate!));
    this.activityItem().executionFromDate = this.#activityService.formatDateForBackend(new Date(this.activityItem().executionFromDate!));
    this.activityItem().executionToDate = this.#activityService.formatDateForBackend(new Date(this.activityItem().executionToDate!));
    this.activityItem().executionTime = this.#activityService.formatTimeForBackend(new Date(this.activityItem().executionTime!));
    this.activityItem().executionFromTime = this.#activityService.formatTimeForBackend(new Date(this.activityItem().executionFromTime!));
    this.activityItem().executionToTime = this.#activityService.formatTimeForBackend(new Date(this.activityItem().executionToTime!));

    this.#activityService.create(this.activityItem()).subscribe((createdItem) => {
      if (createdItem) {
        this.#router.navigateByUrl(ROUTE_PATHS.ACTIVITIES);
      }
    }), (error: any) => {
      console.error('Error creating activity:', error);
    }


  }

}
