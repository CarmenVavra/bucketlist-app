import { Component, inject, input, signal } from '@angular/core';
import { CheckboxListComponent } from "../core/checkbox-list/checkbox-list.component";
import { ActivityItemWithTakeAways, TakeAway } from './models/take-aways.model';
import { TakeAwayService } from './services/take-away.service';
import { AuthService } from '../auth/services/auth-service.service';
import { CheckboxItem } from '../core/checkbox-list/models/checkbox-list.model';
import { ActivatedRoute } from '@angular/router';
import { FormArray } from '@angular/forms';

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

  #takeAwayService = inject(TakeAwayService);
  #authService = inject(AuthService);
  #activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    console.log('this.activityId', this.activityId());
    this.activityId.set(Number(this.#activatedRoute.snapshot.paramMap.get('activityId')));
    this.userId.set(this.#authService.getStoredUser().id!);
    this.loadTakeAways();
  }

  private loadTakeAways(): void {
    this.#takeAwayService.getByUserId(this.userId()).subscribe({
      next: (takeAways) => {
        this.takeAways.set(takeAways);
        this.checkboxItems.set(this.transformActivityItemWithTakeAwaysToCheckboxItems(takeAways));
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

  save(newEntries: FormArray): void {
    newEntries.value.forEach((entry: any) => {
      const newTakeAway: ActivityItemWithTakeAways = {
        description: entry,
        activityId: this.activityId(),
        userId: this.userId(),
        isChecked: false,
        isFavourite: false
      };

      this.#takeAwayService.create(newTakeAway).subscribe({
        next: (createdTakeAway) => {
          console.log('Created takeaway:', createdTakeAway);
          this.loadTakeAways();
        },
        error: (error) => {
          console.error('Error creating takeaway:', error);
        }
      });
    });
  }

  toggleChecked(items: CheckboxItem[]): void {
    this.takeAways.set(this.transformCheckboxItemToActivityItemWithTakeAways(items));
    console.log('this.takeAways', this.takeAways());
    this.takeAways().forEach((takeAway) => {
      this.#takeAwayService.check(takeAway).subscribe((item) => {
        console.log('updated item', item);
      });
    });
  }


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
}
