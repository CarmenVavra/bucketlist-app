import { Component, inject, input, signal } from '@angular/core';
import { CheckboxListComponent } from "../core/checkbox-list/checkbox-list.component";
import { ActivityItemWithTakeAways, TakeAway } from './models/take-aways.model';
import { TakeAwayService } from './services/take-away.service';
import { AuthService } from '../auth/services/auth-service.service';
import { CheckboxItem } from '../core/checkbox-list/models/checkbox-list.model';
import { ActivatedRoute } from '@angular/router';
import { FormArray } from '@angular/forms';
import { MatListItem } from '@angular/material/list';
import { first, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-take-aways',
  imports: [CheckboxListComponent],
  templateUrl: './take-aways.component.html',
  styleUrl: './take-aways.component.css'
})
export class TakeAwaysComponent {
  readonly activityId = signal<number>(0);

  readonly takeAways = signal<ActivityItemWithTakeAways[]>([]);
  readonly userId = signal<number>(0);
  readonly checkboxItems = signal<CheckboxItem[]>([]);
  readonly unsubscribe$ = new Subject();

  #takeAwayService = inject(TakeAwayService);
  #authService = inject(AuthService);
  #activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activityId.set(Number(this.#activatedRoute.snapshot.paramMap.get('activityId')));
    this.userId.set(this.#authService.getStoredUser().id!);
    this.loadTakeAways();
  }

  /**
   * loads takeaways for the current activity and user from the backend by calling the getByUserId method of the TakeAwayService and sets the takeAways signal with the response, also transforms the response into CheckboxItem objects for use in the CheckboxListComponent
   */
  private loadTakeAways(): void {
    this.#takeAwayService.getByUserIdAndActivityId(this.userId(), this.activityId()).subscribe({
      next: (takeaways) => {
        this.takeAways.set(takeaways);
        this.checkboxItems.set(this.transformActivityItemWithTakeAwaysToCheckboxItems(takeaways));
      },
      error: (error) => {
        console.error('Error loading takeaways:', error);
      }
    });
  }

  /**
   * transforms TakeAway objects into CheckboxItem objects for use in the CheckboxListComponent
   * @param takeAways 
   * @returns CheckboxItem[]
   */
  private transformActivityItemWithTakeAwaysToCheckboxItems(takeAways: ActivityItemWithTakeAways[]): CheckboxItem[] {
    return takeAways.map(takeAway => ({
      id: takeAway.id!,
      label: takeAway.description,
      isChecked: takeAway.isChecked || false,
      isFavourite: takeAway.isFavourite || false,
      activityId: takeAway.activityId
    }));
  }

  /**
   * saves new takeaways created in the CheckboxListComponent by emitting the new entries as FormArray and calling the create method of the TakeAwayService for each new entry
   * @param newEntries 
   */
  save(newEntries: FormArray): void {
    newEntries.value.forEach((entry: any) => {
      // entry.newEntry = entry.newEntry.trim();
      console.log('entry.newEntry', entry.newEntry);
      const newTakeAway: ActivityItemWithTakeAways = {
        description: entry.newEntry,
        userId: this.userId(),
      };

      this.#takeAwayService.create(newTakeAway, this.activityId()).subscribe({
        next: (createdTakeAway) => {
          console.log('created Takeaway', createdTakeAway);
          this.loadTakeAways();
        },
        error: (error) => {
          console.error('Error creating takeaway:', error);
        }
      });
    });
  }

  /**
   * updates the checked status of takeaways in the backend by calling the check method of the TakeAwayService for each item in the list
   * @param items 
   */
  toggleChecked(items: CheckboxItem[]): void {
    this.takeAways.set(this.transformCheckboxItemToActivityItemWithTakeAways(items));
    this.takeAways().forEach((takeAway) => {
      this.#takeAwayService.check(takeAway).subscribe((item) => {
      });
    });
  }

  /**
   * transforms CheckboxItem objects back into ActivityItemWithTakeAways objects for use in the toggleChecked method to update the checked status of takeaways in the backend
   * @param items 
   * @returns ActivityItemWithTakeAways[]
   */
  private transformCheckboxItemToActivityItemWithTakeAways(items: CheckboxItem[]): ActivityItemWithTakeAways[] {
    return items.map(item => ({
      id: item.id,
      activityId: this.activityId(),
      description: item.label,
      userId: this.userId(),
      isChecked: item.isChecked,
      isFavourite: item.isFavourite,
    }));
  }

  protected deleteItem(item: CheckboxItem) {
    this.#takeAwayService.delete(item.id!).subscribe((message) => {
      this.loadTakeAways();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
