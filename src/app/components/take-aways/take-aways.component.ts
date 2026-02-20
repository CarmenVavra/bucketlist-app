import { Component, inject, signal } from '@angular/core';
import { CheckboxListComponent } from "../core/checkbox-list/checkbox-list.component";
import { TakeAway } from './models/take-aways.model';
import { TakeAwayService } from './services/take-away.service';
import { AuthService } from '../auth/services/auth-service.service';
import { CheckboxItem } from '../core/checkbox-list/models/checkbox-list.model';

@Component({
  selector: 'app-take-aways',
  imports: [CheckboxListComponent],
  templateUrl: './take-aways.component.html',
  styleUrl: './take-aways.component.css'
})
export class TakeAwaysComponent {
  readonly takeAways = signal<TakeAway[]>([]);
  readonly userId = signal<number>(0);
  readonly checkboxItems = signal<CheckboxItem[]>([]);

  #takeAwayService = inject(TakeAwayService);
  #authService = inject(AuthService);

  ngOnInit(): void {
    this.userId.set(this.#authService.getStoredUser().id!);
    this.loadTakeAways();
  }

  private loadTakeAways(): void {
    this.#takeAwayService.getByUserId(this.userId()).subscribe({
      next: (takeAways) => {
        this.takeAways.set(takeAways);
        this.checkboxItems.set(this.transformTakeAwaysToCheckboxItems(takeAways));
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
  private transformTakeAwaysToCheckboxItems(takeAways: TakeAway[]): CheckboxItem[] {
    return takeAways.map(takeAway => ({
      id: takeAway.id!,
      label: takeAway.description,
    }));
  }
}
